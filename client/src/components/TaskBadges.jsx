import { Badge } from '@/components/ui/badge'

// colors are from the SRS: To Do = slate, In Progress = sky, Done = emerald
export function StatusBadge({ status }) {
  if (status === 'To Do') {
    return <Badge variant="slate">To Do</Badge>
  } else if (status === 'In Progress') {
    return <Badge variant="sky">In Progress</Badge>
  } else if (status === 'Done') {
    return <Badge variant="emerald">Done</Badge>
  }
  return <Badge variant="slate">{status}</Badge>
}

export function PriorityBadge({ priority }) {
  if (priority === 'High') {
    return <Badge variant="rose">High</Badge>
  } else if (priority === 'Medium') {
    return <Badge variant="amber">Medium</Badge>
  } else if (priority === 'Low') {
    return <Badge variant="emerald">Low</Badge>
  }
  return <Badge variant="secondary">{priority}</Badge>
}

export function OverdueBadge() {
  return <Badge variant="crimson">Overdue</Badge>
}

// task is overdue when due date already passed and its not done yet
export function isOverdue(task) {
  if (!task.dueDate) return false
  if (task.status === 'Done') return false
  return new Date(task.dueDate) < new Date()
}

export function formatDueDate(dueDate) {
  if (!dueDate) return '-'
  const d = new Date(dueDate)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}
