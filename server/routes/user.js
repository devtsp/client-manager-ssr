const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.viewAll);
router.post('/', userController.find);
router.get('/adduser', userController.addForm);
router.post('/adduser', userController.add);
router.get('/edituser/:id', userController.editForm);
router.post('/edituser/:id', userController.update);
router.get('/deleteuser/:id', userController.remove);

module.exports = router;
