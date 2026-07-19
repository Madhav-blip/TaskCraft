import { useNavigate } from 'react-router-dom'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { StatusBadge, PriorityBadge, OverdueBadge, isOverdue, formatDueDate } from '@/components/TaskBadges'

export default function TaskTable({ tasks, onToggleStatus }) {
  const navigate = useNavigate()

  if (!tasks.length) {
    return (
      <div className="border border-gray-500 p-8 text-center text-sm text-gray-600">
        No tasks found. Create your first task to get started.
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]"></TableHead>
          <TableHead>Task</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">Priority</TableHead>
          <TableHead className="hidden sm:table-cell">Due Date</TableHead>
          <TableHead className="hidden lg:table-cell">Assignee</TableHead>
          <TableHead className="hidden lg:table-cell">Tags</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow
            key={task._id}
            className="cursor-pointer"
            onClick={() => navigate(`/dashboard/${task._id}`)}
          >
            <TableCell onClick={(e) => e.stopPropagation()}>
              <Checkbox
                checked={task.status === 'Done'}
                onCheckedChange={() => onToggleStatus(task)}
                aria-label={`Mark "${task.title}" as ${task.status === 'Done' ? 'To Do' : 'Done'}`}
              />
            </TableCell>
            <TableCell className="max-w-[260px]">
              <div className={'truncate font-bold ' + (task.status === 'Done' ? 'text-gray-500 line-through' : '')}>
                {task.title}
              </div>
              {task.description && (
                <div className="truncate text-xs text-gray-600">{task.description}</div>
              )}
            </TableCell>
            <TableCell>
              <StatusBadge status={task.status} />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <PriorityBadge priority={task.priority} />
            </TableCell>
            <TableCell className="hidden whitespace-nowrap sm:table-cell">
              {formatDueDate(task.dueDate)} {isOverdue(task) && <OverdueBadge />}
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              {task.assignedTo ? (
                <span className="flex items-center gap-2">
                  <Avatar src={task.assignedTo.avatarUrl} name={task.assignedTo.name} />
                  <span className="whitespace-nowrap">{task.assignedTo.name}</span>
                </span>
              ) : (
                <span className="text-gray-500">-</span>
              )}
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              <span className="flex flex-wrap gap-1">
                {task.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
