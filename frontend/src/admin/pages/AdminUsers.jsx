import { useEffect, useState } from "react"
import AdminLayout from "../componentslayout/AdminLayout"
import UsersHeader from "../components/UsersHeader"
import UsersFilters from "../components/UsersFilter"
import UsersTable from "../components/UsersTable"
import UsersPagination from "../components/UsersPagination"
import { toast } from "react-toastify"

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ""
  const token = localStorage.getItem('token') || ''
  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  }

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${apiBaseUrl}/api/users`, {
        headers: authHeaders,
      })
      const data = await response.json()
      if (data.success && data.users) {
        setUsers(data.users)
      } else {
        toast.error(data.message || 'Failed to load users')
        setUsers([])
      }
    } catch (error) {
      console.error('Failed to load users:', error)
      toast.error('Network error. Please try again.')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteUser = async (userId) => {
    const confirmed = window.confirm('Delete this user? This cannot be undone.')
    if (!confirmed) return

    setLoading(true)
    try {
      const response = await fetch(`${apiBaseUrl}/api/users/${userId}`, {
        method: 'DELETE',
        headers: authHeaders,
      })
      const data = await response.json()
      if (data.success) {
        setUsers((prev) => prev.filter((user) => user._id !== userId))
        toast.success('User deleted')
      } else {
        toast.error(data.message || 'Failed to delete user')
      }
    } catch (error) {
      console.error('Failed to delete user:', error)
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateUser = async (user) => {
    const name = window.prompt('New name', user.name || '')
    if (name === null) return
    const email = window.prompt('New email', user.email || '')
    if (email === null) return

    const nextName = name.trim()
    const nextEmail = email.trim()

    if (!nextName || !nextEmail) {
      toast.error('Name and email are required')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${apiBaseUrl}/api/users/${user._id}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({ name: nextName, email: nextEmail }),
      })
      const data = await response.json()
      if (data.success) {
        setUsers((prev) => prev.map((item) => (
          item._id === user._id ? { ...item, name: nextName, email: nextEmail } : item
        )))
        toast.success('User updated')
      } else {
        toast.error(data.message || 'Failed to update user')
      }
    } catch (error) {
      console.error('Failed to update user:', error)
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handlePatchUser = async (user) => {
    const name = window.prompt('Update name (partial)', user.name || '')
    if (name === null) return
    const nextName = name.trim()

    if (!nextName || nextName === user.name) return

    setLoading(true)
    try {
      const response = await fetch(`${apiBaseUrl}/api/users/${user._id}`, {
        method: 'PATCH',
        headers: authHeaders,
        body: JSON.stringify({ name: nextName }),
      })
      const data = await response.json()
      if (data.success) {
        setUsers((prev) => prev.map((item) => (
          item._id === user._id ? { ...item, name: nextName } : item
        )))
        toast.success('User updated')
      } else {
        toast.error(data.message || 'Failed to update user')
      }
    } catch (error) {
      console.error('Failed to update user:', error)
      toast.error('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <AdminLayout active="users">
      <UsersHeader />
      <div className="rounded-xl border bg-white shadow-sm">
        <UsersFilters total={users.length} loading={loading} />
        <UsersTable
          users={users}
          onEdit={handleUpdateUser}
          onPatch={handlePatchUser}
          onDelete={handleDeleteUser}
        />
        <UsersPagination />
      </div>
    </AdminLayout>
  )
}

export default AdminUsers
