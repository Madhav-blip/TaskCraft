import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { OverdueBadge, isOverdue } from '@/components/TaskBadges'
const STATUSES = ['To Do', 'In Progress', 'Done']
const PRIORITIES = ['High', 'Medium', 'Low']
function toDateInput(value) {
  return value ? new Date(value).toISOString().slice(0, 10) : ''
}
export default function TaskDrawer({ task, users, onClose, onSaved, onDeleted }) {
  const [form, setForm] = useState(null)
  const [tagInput, setTagInput] = useState('')
  const [subtaskInput, setSubtaskInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        dueDate: toDateInput(task.dueDate),
        tags: [...task.tags],
        assignedTo: task.assignedTo?._id || '',
        subtasks: task.subtasks.map((s) => ({ ...s })),
      })
      setError('')
    }
  }, [task])
  if (!task || !form) return null
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))
  const addTag = () => {
    const tag = tagInput.trim()
    if (tag && !form.tags.includes(tag)) set('tags', [...form.tags, tag])
    setTagInput('')
  }
  const addSubtask = () => {
    const text = subtaskInput.trim()
    if (text) {
      set('subtasks', [...form.subtasks, { id: `sub_${Date.now()}`, text, isCompleted: false }])
    }
    setSubtaskInput('')
  }
  const toggleSubtask = (id) => {
    set(
      'subtasks',
      form.subtasks.map((s) => (s.id === id ? { ...s, isCompleted: !s.isCompleted } : s))
    )
  }
  const handleSave = async () => {
    if (!form.title.trim()) {
      setError('Title is required')
      return
    }
    setSaving(true)
    setError('')
    try {
      const updated = await api.updateTask(task._id, {
        title: form.title.trim(),
        description: form.description,
        status: form.status,
        priority: form.priority,
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
        tags: form.tags,
        assignedTo: form.assignedTo || null,
        subtasks: form.subtasks,
      })
      onSaved(updated)
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }
  const handleDelete = async () => {
    setSaving(true)
    try {
      await api.deleteTask(task._id)
      onDeleted(task._id)
      onClose()
    } catch (err) {
      setError(err.message)
      setSaving(false)
    }
  }
  return (
    <Sheet open onOpenChange={(open) => !open && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Task Details</SheetTitle>
          <SheetDescription>
            Created {new Date(task.createdAt).toLocaleString()}
            {task.createdBy?.name && <> by {task.createdBy.name}</>} {isOverdue(task) && <OverdueBadge />}
          </SheetDescription>
        </SheetHeader>
        <div className="p-3 overflow-y-auto" style={{ flex: 1 }}>
          <h3 className="text-sm font-bold">Title:</h3>
          <Input id="title" value={form.title} onChange={(e) => set('title', e.target.value)} />
          <br />
          <h3 className="text-sm font-bold">Description:</h3>
          <Textarea
            id="description"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
          />
          <br />
          <div className="flex gap-4">
            <div className="w-[210px]">
              <h3 className="text-sm font-bold">Status:</h3>
              <Select value={form.status} onValueChange={(v) => set('status', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-[210px]">
              <h3 className="text-sm font-bold">Priority:</h3>
              <Select value={form.priority} onValueChange={(v) => set('priority', v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PRIORITIES.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <br />
          <div className="flex gap-4">
            <div className="w-[210px]">
              <h3 className="text-sm font-bold">Due Date:</h3>
              <Input
                id="dueDate"
                type="date"
                value={form.dueDate}
                onChange={(e) => set('dueDate', e.target.value)}
              />
            </div>
            <div className="w-[210px]">
              <h3 className="text-sm font-bold">Assignee:</h3>
              <Select value={form.assignedTo} onValueChange={(v) => set('assignedTo', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Unassigned" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((u) => (
                    <SelectItem key={u._id} value={u._id}>
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <br />
          <h3 className="text-sm font-bold">Tags:</h3>
          <div className="flex flex-wrap gap-1">
            {form.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}{' '}
                <button
                  type="button"
                  onClick={() => set('tags', form.tags.filter((t) => t !== tag))}
                  aria-label={`Remove tag ${tag}`}
                >
                  ✕
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2 mt-1">
            <Input
              id="tag-input"
              placeholder="Add a tag..."
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
            />
            <Button type="button" variant="outline" size="icon" onClick={addTag} aria-label="Add tag">
              +
            </Button>
          </div>
          <br />
          <h3 className="text-sm font-bold">Subtasks:</h3>
          <div>
            {form.subtasks.map((sub) => (
              <div key={sub.id} className="flex items-center gap-2 mb-1">
                <Checkbox
                  checked={sub.isCompleted}
                  onCheckedChange={() => toggleSubtask(sub.id)}
                  aria-label={sub.text}
                />
                <span className={'text-sm ' + (sub.isCompleted ? 'text-gray-500 line-through' : '')}>
                  {sub.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-1">
            <Input
              id="subtask-input"
              placeholder="Add a subtask..."
              value={subtaskInput}
              onChange={(e) => setSubtaskInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSubtask())}
            />
            <Button type="button" variant="outline" size="icon" onClick={addSubtask} aria-label="Add subtask">
              +
            </Button>
          </div>
          <br />
          {error && <div className="text-sm text-red-600">{error}</div>}
        </div>
        <div className="flex justify-between border-t border-gray-300 p-3">
          <Button variant="destructive" size="sm" onClick={handleDelete} disabled={saving}>
            Delete
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
