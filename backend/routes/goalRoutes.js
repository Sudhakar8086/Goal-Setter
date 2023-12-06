const express = require('express');
const { getGoals, SetGoal,deleteGoal,updateGoal } = require('../controllers/goalControllers');

const router = express.Router();


router.route('/').get(getGoals).post(SetGoal);

router.route('/:id').delete(deleteGoal).put(updateGoal);




module.exports = router;