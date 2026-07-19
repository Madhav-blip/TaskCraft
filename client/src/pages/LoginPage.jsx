import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { api } from '@/lib/api'
import { validateSignIn } from '@/lib/validators'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setServerError('')
    const form = { email: email, password: password }
    const validationErrors = validateSignIn(form)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setLoading(true)
    try {
      const data = await api.login(form)
      signIn(data)
      navigate('/dashboard')
    } catch {
      // dont tell the user which one was wrong (from the srs)
      setServerError('Invalid email or password credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <center>
      <fieldset className="w-[350px] border border-gray-500 p-4 mt-[100px] text-left">
        <legend className="font-bold text-lg">
          <center>TaskCraft - Sign In</center>
        </legend>
        <form onSubmit={handleSubmit} noValidate>
          <h3 className="text-sm font-bold">Email Address:</h3>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <div className="text-xs text-red-600">{errors.email}</div>}
          <br />
          <h3 className="text-sm font-bold">Password:</h3>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <div className="text-xs text-red-600">{errors.password}</div>}
          <br />
          {serverError && (
            <div>
              <div className="text-sm text-red-600">{serverError}</div>
              <br />
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        <br />
        <center className="text-sm">
          No account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline hover:decoration-blue-700">
            Register
          </Link>
        </center>
      </fieldset>
    </center>
  )
}
