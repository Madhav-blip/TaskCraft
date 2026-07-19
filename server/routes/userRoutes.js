const router = require('express').Router();
const requireAuth = require('../middleware/requireAuth');
const { getUsers } = require('../controllers/userController');

router.use(requireAuth);

router.get('/', getUsers);

module.exports = router;
