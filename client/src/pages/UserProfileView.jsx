import { useAuth } from '@/context/AuthContext'
import { Avatar } from '@/components/ui/avatar'

export default function UserProfileView() {
  const { user } = useAuth()

  return (
    <fieldset className="w-[400px] border border-gray-500 p-4">
      <legend className="font-bold text-lg">Profile</legend>
      <div className="flex items-center gap-4">
        <Avatar src={user?.avatarUrl} name={user?.name} className="w-[56px] h-[56px] text-lg" />
        <div>
          <h3 className="font-bold">{user?.name}</h3>
          <div className="text-sm text-gray-600">{user?.email}</div>
        </div>
      </div>
      <br />
      <table border="2" className="w-full text-sm border-collapse [&_td]:border [&_td]:border-gray-500 [&_td]:p-1 [&_th]:border [&_th]:border-gray-500 [&_th]:p-1">
        <tbody>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
          <tr>
            <td>Name</td>
            <td>{user?.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user?.email}</td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  )
}
