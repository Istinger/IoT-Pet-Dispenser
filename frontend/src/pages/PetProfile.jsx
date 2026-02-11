import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import InsightsSection from "../components/petProfile/InsightsSection"
import PetHeader from "../components/petProfile/petHeader"
import PetProfileCard from "../components/petProfile/PetProfileCard"
import PetStats from "../components/petProfile/PetStats"
import { AuthContext } from "../context/AuthContext"

const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

const PetProfile = () => {
  const navigate = useNavigate()
  const { token } = useContext(AuthContext)
  const [pets, setPets] = useState([])
  const [error, setError] = useState("")
  const [progressByPet, setProgressByPet] = useState({})
  const [editingPet, setEditingPet] = useState(null)
  const [editForm, setEditForm] = useState({
    name: "",
    weight: "",
    profileImage: "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [editImageFile, setEditImageFile] = useState(null)
  const [editImagePreview, setEditImagePreview] = useState("")

  useEffect(() => {
    const fetchPetsAndProgress = async () => {
      setError("")
      const currentToken = token || localStorage.getItem("token")
      if (!currentToken) {
        setError("No hay sesion activa. Por favor inicia sesion.")
        return
      }

      const decoded = decodeToken(currentToken)
      if (!decoded || !decoded.id) {
        setError("No se pudo obtener el usuario. Inicia sesion nuevamente.")
        return
      }

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000"

      try {
        const activeResponse = await fetch(`${apiBaseUrl}/api/pets/active/${decoded.id}`)
        const activeData = await activeResponse.json()

        const listResponse = await fetch(`${apiBaseUrl}/api/pets/user/${decoded.id}`)
        const listData = await listResponse.json()

        let petList = []
        if (listResponse.ok && listData.success && Array.isArray(listData.pets)) {
          petList = listData.pets
        }

        if (activeResponse.ok && activeData.success && activeData.pet) {
          const activePet = activeData.pet
          const exists = petList.find((pet) => pet._id === activePet._id)
          if (!exists) {
            petList = [activePet, ...petList]
          }
        }

        if (petList.length === 0) {
          setError(activeData.message || listData.message || "No se encontraron mascotas.")
          setPets([])
          setProgressByPet({})
          return
        }

        setPets(petList)

        let sensors = []
        try {
          const sensorResponse = await fetch(`${apiBaseUrl}/api/sensors`)
          const sensorData = await sensorResponse.json()
          sensors = sensorResponse.ok && sensorData.success ? sensorData.data : []
        } catch (sensorError) {
          console.error("Error fetching sensor data:", sensorError)
        }

        const startOfDay = new Date()
        startOfDay.setHours(0, 0, 0, 0)

        const dayKeys = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
        const todayKey = dayKeys[new Date().getDay()]

        const computeNextSchedule = (activeSchedules) => {
          const now = new Date()

          const parseTime = (timeValue) => {
            const [hours, minutes] = String(timeValue || "00:00").split(":")
            return { hours: Number(hours), minutes: Number(minutes) }
          }

          const buildDate = (base, timeValue) => {
            const { hours, minutes } = parseTime(timeValue)
            const date = new Date(base)
            date.setHours(hours, minutes, 0, 0)
            return date
          }

          const getNextDate = (schedule) => {
            const days = Array.isArray(schedule.days) ? schedule.days : []
            if (days.length === 0) {
              const candidate = buildDate(now, schedule.time)
              if (candidate > now) return candidate
              const tomorrow = new Date(now)
              tomorrow.setDate(now.getDate() + 1)
              return buildDate(tomorrow, schedule.time)
            }

            for (let offset = 0; offset <= 7; offset += 1) {
              const checkDate = new Date(now)
              checkDate.setDate(now.getDate() + offset)
              const dayKey = dayKeys[checkDate.getDay()]
              if (!days.includes(dayKey)) continue
              const candidate = buildDate(checkDate, schedule.time)
              if (candidate > now) return candidate
            }

            return null
          }

          const scheduleWithDate = activeSchedules
            .map((schedule) => ({
              schedule,
              nextDate: getNextDate(schedule),
            }))
            .filter((entry) => entry.nextDate)
            .sort((a, b) => a.nextDate - b.nextDate)

          return scheduleWithDate.length > 0 ? scheduleWithDate[0] : null
        }

        const progressEntries = await Promise.all(
          petList.map(async (pet) => {
            try {
              const scheduleResponse = await fetch(`${apiBaseUrl}/api/schedules/pet/${pet._id}`)
              const scheduleData = await scheduleResponse.json()
              const schedules = scheduleResponse.ok && scheduleData.success ? scheduleData.schedules : []

              const activeSchedules = schedules.filter((schedule) => schedule.isActive)
              const todaySchedules = activeSchedules.filter((schedule) => {
                if (!Array.isArray(schedule.days) || schedule.days.length === 0) return true
                return schedule.days.includes(todayKey)
              })

              const goalGrams = todaySchedules.reduce(
                (total, schedule) => total + Number(schedule.portionGrams || 0),
                0
              )

              const nextSchedule = computeNextSchedule(activeSchedules)

              const deviceIds = new Set(
                activeSchedules.map((schedule) => schedule.deviceId).filter(Boolean)
              )

              const consumedGrams = sensors
                .filter((entry) => deviceIds.has(entry.deviceId))
                .filter((entry) => new Date(entry.createdAt) >= startOfDay)
                .reduce((total, entry) => total + Number(entry.portionDelivered || 0), 0)

              const percent = goalGrams > 0
                ? Math.min(100, Math.round((consumedGrams / goalGrams) * 100))
                : 0

              const nextText = nextSchedule
                ? `${nextSchedule.schedule.time} (${Number(nextSchedule.schedule.portionGrams || 0)}g)`
                : "-"

              return {
                petId: pet._id,
                progress: {
                  consumed: Math.round(consumedGrams),
                  percent,
                  next: nextText,
                  unit: "g",
                  goal: goalGrams,
                },
              }
            } catch (scheduleError) {
              console.error("Error fetching schedule data:", scheduleError)
              return {
                petId: pet._id,
                progress: {
                  consumed: 0,
                  percent: 0,
                  next: "-",
                  unit: "g",
                  goal: 0,
                },
              }
            }
          })
        )

        const nextProgressByPet = progressEntries.reduce((acc, entry) => {
          acc[entry.petId] = entry.progress
          return acc
        }, {})

        setProgressByPet(nextProgressByPet)
      } catch (fetchError) {
        console.error("Error fetching pet profile:", fetchError)
        setError("Error al conectar con el servidor.")
        setPets([])
        setProgressByPet({})
      }
    }

    fetchPetsAndProgress()
  }, [token])

  const handleOpenEdit = (pet) => {
    setEditingPet(pet)
    setEditForm({
      name: pet.name || "",
      weight: pet.weight !== undefined ? String(pet.weight) : "",
      profileImage: pet.profileImage || "",
    })
    setEditImageFile(null)
    setEditImagePreview("")
  }

  const handleCloseEdit = () => {
    setEditingPet(null)
    setEditForm({ name: "", weight: "", profileImage: "" })
    if (editImagePreview) {
      URL.revokeObjectURL(editImagePreview)
    }
    setEditImageFile(null)
    setEditImagePreview("")
  }

  const handleEditChange = (event) => {
    const { name, value } = event.target
    setEditForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageFile = (file) => {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      setError("Solo se permiten imagenes.")
      return
    }

    if (editImagePreview) {
      URL.revokeObjectURL(editImagePreview)
    }

    setEditImageFile(file)
    setEditImagePreview(URL.createObjectURL(file))
  }

  const handleDropImage = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files && event.dataTransfer.files[0]
    handleImageFile(file)
  }

  const uploadPetImage = async (petId, file) => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000"
    const formData = new FormData()
    formData.append("image", file)

    const response = await fetch(`${apiBaseUrl}/api/pets/${petId}/profile-image`, {
      method: "PATCH",
      body: formData,
    })

    const data = await response.json()
    if (!response.ok || !data.success) {
      throw new Error(data.message || "No se pudo subir la imagen.")
    }

    return data.imageUrl || data.pet?.profileImage || ""
  }

  const handleSaveEdit = async () => {
    if (!editingPet?._id) return

    const trimmedName = editForm.name.trim()
    const trimmedImage = editForm.profileImage.trim()
    const parsedWeight = editForm.weight !== "" ? Number(editForm.weight) : undefined

    if (!trimmedName) {
      setError("El nombre es obligatorio.")
      return
    }

    if (parsedWeight !== undefined && Number.isNaN(parsedWeight)) {
      setError("El peso debe ser un numero valido.")
      return
    }

    setIsSaving(true)
    setError("")

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000"

    try {
      let profileImageUrl = trimmedImage
      if (editImageFile) {
        profileImageUrl = await uploadPetImage(editingPet._id, editImageFile)
      }

      const response = await fetch(`${apiBaseUrl}/api/pets/${editingPet._id}/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          weight: parsedWeight,
          profileImage: profileImageUrl,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        setError(data.message || "No se pudo actualizar la mascota.")
        return
      }

      setPets((prev) =>
        prev.map((pet) => (pet._id === editingPet._id ? data.pet : pet))
      )
      handleCloseEdit()
    } catch (saveError) {
      console.error("Error updating pet profile:", saveError)
      setError(saveError.message || "Error al conectar con el servidor.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <PetHeader />

      <main className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="flex justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black">Pet Profiles</h1>
            <p className="text-slate-500 font-medium">
              Manage health metrics and feeding goals.
            </p>
          </div>

          <button onClick={() => navigate('/registerPet')} className="h-12 px-6 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700">
            + Add New Pet
          </button>
        </div>

        <PetStats />

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {pets.map((pet) => {
            const petProgress = progressByPet[pet._id] || {
              consumed: 0,
              percent: 0,
              next: "-",
              unit: "g",
              goal: 0,
            }

            const profileImage = pet.profileImage
              ? pet.profileImage
              : "https://lh3.googleusercontent.com/aida-public/AB6AXuDEa_fO9a21NKUH9Nm0SqFxSOj1XJ0Ge6FtDsq053Uu_WeCHaJeR7Wmn1-SxF14gAu2O-y2lQQWYUj17pIA2W6kH34BMLe2ltYkXsVjXoaKkvaYzyIVMY44OZYKJy9euE3BZ0DhcH7My_ekhVII80D_iKzxFuhdDrNYYlWK2u1N7l9vYm7HEmQpHuz2K5Ul0KgJXtxQnG8HxNUEDIc2Zop3yDvMH1aIOcibmU02Aggh7RrekLTYZLEEm5FP5SEJl1S7MwQkzFsP-HQz"

            const displayAge = pet.age !== undefined ? `${pet.age}y` : "-"
            const displayWeight = pet.weight !== undefined ? `${pet.weight} kg` : "-"

            return (
              <PetProfileCard
                key={pet._id}
                name={pet.name || "-"}
                breed={pet.breed || "-"}
                age={displayAge}
                weight={displayWeight}
                goal={petProgress.goal ? `${petProgress.goal} g` : "-"}
                progress={{
                  consumed: petProgress.consumed,
                  percent: petProgress.percent,
                  next: petProgress.next,
                  unit: petProgress.unit,
                }}
                img={profileImage}
                onEdit={() => handleOpenEdit(pet)}
              />
            )
          })}
        </div>

        {editingPet && (
          <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center px-4 z-50">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Editar mascota</h2>
                  <p className="text-sm text-slate-500">Actualiza nombre, peso y foto.</p>
                </div>
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500">Nombre</label>
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    placeholder="Nombre"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500">Peso (kg)</label>
                  <input
                    name="weight"
                    value={editForm.weight}
                    onChange={handleEditChange}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    placeholder="0.0"
                    type="number"
                    min="0"
                    step="0.1"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500">Foto</label>
                  <div
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={handleDropImage}
                    className="mt-1 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 px-4 py-6 text-sm text-slate-500"
                  >
                    {editImagePreview || editForm.profileImage ? (
                      <img
                        src={editImagePreview || editForm.profileImage}
                        alt="Preview"
                        className="h-28 w-28 rounded-full object-cover"
                      />
                    ) : (
                      <span>Arrastra una imagen aqui</span>
                    )}

                    <label className="text-xs font-bold text-blue-600 cursor-pointer">
                      Seleccionar archivo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleImageFile(event.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className="px-4 py-2 rounded-xl border text-sm font-bold text-slate-600"
                  disabled={isSaving}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold disabled:bg-blue-300"
                  disabled={isSaving}
                >
                  {isSaving ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </div>
          </div>
        )}

        <InsightsSection />
      </main>
    </div>
  )
}

export default PetProfile
