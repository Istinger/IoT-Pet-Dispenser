import { useNavigate } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import PetInput from "./PetInput"
import ActivitySelector from "./ActivitySelector"
import { ArrowRight } from "lucide-react"
import { AuthContext } from "../../context/AuthContext"

// Función helper para decodificar JWT
const decodeToken = (token) => {
    try {
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        )
        return JSON.parse(jsonPayload)
    } catch (error) {
        console.error('Error decoding token:', error)
        return null
    }
}

const dogBreedRegex = /^(?:Chihuahua|Pomerania|Shih Tzu|Yorkshire Terrier|Malt[eé]s|Bich[oó]n Fris[eé]|Bich[oó]n Frise|Pekin[eé]s|Beagle|Cocker Spaniel|Bulldog Franc[eé]s|Schnauzer Miniatura|Boston Terrier|Pug|Labrador Retriever|Golden Retriever|Pastor Alem[aá]n|Rottweiler|Doberman|Boxer|D[aá]lmat[aá]|Border Collie|Pastor Australiano|Husky Siberiano|Akita Inu|San Bernardo|Mast[ií]n Espa[nñ]ol|Alaskan Malamute)$/i

const PetForm = () => {
    const navigate = useNavigate()
    const { token } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [tokenReady, setTokenReady] = useState(false)
    
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        weight: '',
        activity: 'moderate'
    })

    // Verificar que el token esté disponible al cargar el componente
    useEffect(() => {
        const checkToken = () => {
            // Intentar obtener del contexto primero, luego de localStorage
            const contextToken = token
            const storageToken = localStorage.getItem('token')
            
            if (contextToken || storageToken) {
                setTokenReady(true)
            } else {
                console.warn('No token found, redirecting...')
                setTimeout(() => {
                    setError('No hay sesión activa. Redirigiendo...')
                    navigate('/login')
                }, 1000)
            }
        }
        
        checkToken()
    }, [token, navigate])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleNextStep = async (e) => {
        e.preventDefault()
        setError('')
        
        // Validar campos requeridos
        if (!formData.name || !formData.breed || !formData.age || !formData.weight) {
            setError('Por favor completa todos los campos')
            return
        }

        const trimmedBreed = formData.breed.trim()
        if (!dogBreedRegex.test(trimmedBreed)) {
            setError('Raza no válida. Usa una de las razas disponibles.')
            return
        }

        try {
            setLoading(true)
            
            // Obtener token del contexto o localStorage como fallback
            const currentToken = token || localStorage.getItem('token')
            
            if (!currentToken) {
                setError('No hay sesión activa. Por favor inicia sesión.')
                navigate('/login')
                return
            }
            
            // Decodificar token para obtener userId
            const decoded = decodeToken(currentToken)
            
            if (!decoded || !decoded.id) {
                setError('Error al obtener información del usuario. Por favor inicia sesión nuevamente.')
                navigate('/login')
                return
            }

            const userId = decoded.id
            console.log('User ID extraído del token:', userId)
            console.log('Datos a enviar:', {
                userId,
                name: formData.name,
                breed: formData.breed,
                age: parseFloat(formData.age),
                weight: parseFloat(formData.weight),
                activityLevel: formData.activity
            })

            // Enviar datos al backend usando variable de entorno
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'
            const response = await fetch(`${apiBaseUrl}/api/pets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    name: formData.name,
                    breed: formData.breed,
                    age: parseFloat(formData.age),
                    weight: parseFloat(formData.weight),
                    activityLevel: formData.activity,
                    isActive: true
                })
            })

            const data = await response.json()
            console.log('Respuesta del servidor:', data)

            if (!response.ok) {
                console.error('Error de respuesta:', response.status, data)
                setError(data.message || data.error || `Error ${response.status}: No se pudo guardar la mascota`)
                return
            }

            if (data.success) {
                console.log('✅ Mascota guardada exitosamente:', data.pet)
                navigate('/menu')
            } else {
                setError(data.message || 'Error al guardar la mascota')
            }
        } catch (error) {
            console.error('Error completo:', error)
            setError('Error al conectar con el servidor')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 lg:p-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Cuéntanos sobre tu mascota
            </h3>
            <p className="text-slate-500 text-sm mb-8">
                Proporciona detalles precisos para asegurar el mejor plan de alimentación.
            </p>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                </div>
            )}

            <form className="space-y-6" onSubmit={handleNextStep}>
                <PetInput 
                    label="Nombre de la mascota" 
                    placeholder="Ingresa el nombre" 
                    icon="dog"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <PetInput 
                    label="Raza" 
                    placeholder="Raza" 
                    icon="search"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                />

                <PetInput 
                    label="Edad (Años)"
                    type="number"
                    placeholder="0"
                    min={0}
                    max={25}
                    step={0.5}
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                />

                <PetInput 
                    label="Peso (kg)"
                    type="number"
                    placeholder="0.0"
                    icon="scale"
                    min={0.5}
                    max={100}
                    step={0.1}
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                />

                <ActivitySelector 
                    value={formData.activity}
                    onChange={handleInputChange}
                />

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-md shadow-blue-200 transition-all flex justify-center gap-2 group"
                >
                    {loading ? 'Guardando...' : 'Siguiente'}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-center">
                    <button 
                        type="button" 
                        onClick={() => navigate('/register')} 
                        className="text-sm font-bold text-slate-500 hover:text-blue-500 transition-colors"
                        disabled={loading}
                    >
                        Volver a los detalles de la cuenta
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PetForm
