import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '@/lib/api'
import TaskTable from '@/components/TaskTable'
import TaskDrawer from '@/components/TaskDrawer'
import NewTaskSheet from '@/components/NewTaskSheet'
import { Button } from '@/components/ui/button'

export default function TaskListView() {
  // taskId comes from the url like /dashboard/abc123, if its there the drawer opens
  const { taskId } = useParams()
  const navigate = useNavigate()

  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [showNewTask, setShowNewTask] = useState(false)

  // load tasks and users when page opens
  useEffect(() => {
    api
      .getTasks()
      .then((data) => {
        setTasks(data)
      })
      .catch((err) => {
        setLoadError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })

    api
      .getUsers()
      .then((data) => {
        setUsers(data)
      })
      .catch(() => {})
  }, [])

  // find the task matching the url param
  let selectedTask = null
  if (taskId) {
    selectedTask = tasks.find((t) => t._id === taskId)
  }

  // clicking the checkbox switches between Done and To Do
  // update the screen first then send to server so it feels instant
  function handleToggleStatus(task) {
    let newStatus
    if (task.status === 'Done') {
      newStatus = 'To Do'
    } else {
      newStatus = 'Done'
    }
    setTasks(tasks.map((t) => (t._id === task._id ? { ...t, status: newStatus } : t)))
    api.updateTask(task._id, { status: newStatus })
  }

  function handleSaved(updated) {
    setTasks(tasks.map((t) => (t._id === updated._id ? updated : t)))
  }

  function handleDeleted(id) {
    setTasks(tasks.filter((t) => t._id !== id))
  }

  function closeDrawer() {
    navigate('/dashboard')
  }

  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={() => setShowNewTask(true)}>+ New Task</Button>
      </div>
      <br />

      {loadError && <div className="text-sm text-red-600">{loadError}</div>}

      {loading ? (
        <div className="border border-gray-500 p-8 text-center text-sm text-gray-600">Loading...</div>
      ) : (
        <TaskTable tasks={tasks} onToggleStatus={handleToggleStatus} />
      )}

      <TaskDrawer
        task={selectedTask}
        users={users}
        onClose={closeDrawer}
        onSaved={handleSaved}
        onDeleted={handleDeleted}
      />

      <NewTaskSheet
        open={showNewTask}
        onOpenChange={setShowNewTask}
        onCreated={(task) => setTasks([task, ...tasks])}
      />
    </div>
  )
}
