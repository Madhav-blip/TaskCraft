import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/lib/api'
import { validateSignUp } from '@/lib/validators'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setServerError('')
    const form = { name: name, email: email, password: password, confirmPassword: confirmPassword }
    const validationErrors = validateSignUp(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setLoading(true)
    try {
      const data = await api.register(form)
      console.log('registered user:', data.user)
      signIn(data)
      navigate('/dashboard')
    } catch (err) {
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <center>
      <fieldset className="w-[350px] border border-gray-500 p-4 mt-[60px] text-left">
        <legend className="font-bold text-lg">
          <center>TaskCraft - Sign Up</center>
        </legend>
        <form onSubmit={handleSubmit} noValidate>
          <h3 className="text-sm font-bold">Full Name:</h3>
          <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <div className="text-xs text-red-600">{errors.name}</div>}
          <br />
          <h3 className="text-sm font-bold">Email Address:</h3>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <div className="text-xs text-red-600">{errors.email}</div>}
          <br />
          <h3 className="text-sm font-bold">Password:</h3>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <div className="text-xs text-red-600">{errors.password}</div>}
          <br />
          <h3 className="text-sm font-bold">Confirm Password:</h3>
          <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {errors.confirmPassword && <div className="text-xs text-red-600">{errors.confirmPassword}</div>}
          <br />
          {serverError && (
            <div>
              <div className="text-sm text-red-600">{serverError}</div>
              <br />
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>
        <br />
        <center className="text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline hover:decoration-blue-700">
            Sign in
          </Link>
        </center>
      </fieldset>
    </center>
  )
}
