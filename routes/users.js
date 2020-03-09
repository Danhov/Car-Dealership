const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();

const UsersController = require('../controllers/usersController');

router.route('/').get(UsersController.index).post(UsersController.newUser);

//  /users/:id
router
	.route('/:userId')
	.get(UsersController.getUser)
	.put(UsersController.replaceUser)
	.patch(UsersController.updateUser);

router.route('/:userId/cars').get(UsersController.getUserCars).post(UsersController.newUserCar);

module.exports = router;
