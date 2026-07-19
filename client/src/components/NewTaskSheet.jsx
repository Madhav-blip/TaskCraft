import { useState } from 'react'
import { api } from '@/lib/api'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
const EMPTY = { title: '', description: '', status: 'To Do', priority: 'Medium', dueDate: '', tags: '' }
export default function NewTaskSheet({ open, onOpenChange, onCreated }) {
  const [form, setForm] = useState(EMPTY)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }))
  const close = () => {
    setForm(EMPTY)
    setError('')
    onOpenChange(false)
  }
  const handleCreate = async () => {
    if (!form.title.trim()) {
      setError('Title is required')
      return
    }
    setSaving(true)
    setError('')
    try {
      const task = await api.createTask({
        title: form.title.trim(),
        description: form.description,
        status: form.status,
        priority: form.priority,
        dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : undefined,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      })
      onCreated(task)
      close()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }
  return (
    <Sheet open={open} onOpenChange={(o) => !o && close()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Task</SheetTitle>
          <SheetDescription>Add a task to your board</SheetDescription>
        </SheetHeader>
        <div className="p-3 overflow-y-auto" style={{ flex: 1 }}>
          <h3 className="text-sm font-bold">Title:</h3>
          <Input id="new-title" value={form.title} onChange={(e) => set('title', e.target.value)} />
          <br />
          <h3 className="text-sm font-bold">Description:</h3>
          <Textarea
            id="new-description"
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
                  {['To Do', 'In Progress', 'Done'].map((s) => (
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
                  {['High', 'Medium', 'Low'].map((p) => (
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
                id="new-dueDate"
                type="date"
                value={form.dueDate}
                onChange={(e) => set('dueDate', e.target.value)}
              />
            </div>
            <div className="w-[210px]">
              <h3 className="text-sm font-bold">Tags (comma-separated):</h3>
              <Input
                id="new-tags"
                placeholder="Frontend, Bug"
                value={form.tags}
                onChange={(e) => set('tags', e.target.value)}
              />
            </div>
          </div>
          <br />
          {error && <div className="text-sm text-red-600">{error}</div>}
        </div>
        <div className="flex justify-end gap-2 border-t border-gray-300 p-3">
          <Button variant="outline" onClick={close} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={saving}>
            {saving ? 'Creating...' : 'Create Task'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
