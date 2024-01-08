const express = require('express');
const { getGoals, SetGoal,deleteGoal,updateGoal } = require('../controllers/goalControllers');
const {protect} = require('../middleware/authMiddleWare')
const router = express.Router();


router.route('/').get(protect, getGoals).post(protect, SetGoal);

router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal);




module.exports = router;