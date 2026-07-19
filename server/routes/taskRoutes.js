const router = require('express').Router();
const requireAuth = require('../middleware/requireAuth');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');

router.use(requireAuth);

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
