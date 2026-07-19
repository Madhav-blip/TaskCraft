const Task = require('../models/Task');

// populate fills in the user info instead of just the id
const POPULATE = [
  { path: 'assignedTo', select: 'name avatarUrl' },
  { path: 'createdBy', select: 'name avatarUrl' },
];

// GET /tasks - can filter with ?status= &tags= &search=
async function getTasks(req, res, next) {
  try {
    const { status, tags, search } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }
    if (tags) {
      filter.tags = { $in: tags.split(',') };
    }
    if (search) {
      // escape special regex characters so the search doesnt break
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(escaped, 'i');
      filter.$or = [{ title: pattern }, { description: pattern }];
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 }).populate(POPULATE);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

// POST /tasks
async function createTask(req, res, next) {
  try {
    const { title, description, status, priority, dueDate, tags, assignedTo, subtasks } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description,
      status: status,
      priority: priority,
      dueDate: dueDate,
      tags: tags,
      subtasks: subtasks,
      // if no assignee given just assign it to whoever created it
      assignedTo: assignedTo || req.user.userId,
      createdBy: req.user.userId,
    });

    res.status(201).json(await task.populate(POPULATE));
  } catch (err) {
    next(err);
  }
}

// PUT /tasks/:id
async function updateTask(req, res, next) {
  try {
    const { title, description, status, priority, dueDate, tags, assignedTo, subtasks } = req.body;

    // only update the fields that were actually sent
    const updates = { title, description, status, priority, dueDate, tags, assignedTo, subtasks };
    for (const key of Object.keys(updates)) {
      if (updates[key] === undefined) {
        delete updates[key];
      }
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).populate(POPULATE);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
}

// DELETE /tasks/:id
async function deleteTask(req, res, next) {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getTasks, createTask, updateTask, deleteTask };
