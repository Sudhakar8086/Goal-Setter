const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')


// @desc       Get Goals
// @route      GET /api/goals 
// @access     Private  
const getGoals = asyncHandler( async ( req, res ) => {
   const goals = await Goal.find({user: req.user.id})

    res.status(200).json(goals)
})




// @desc       Set/Create Goal
// @route      POST /api/goals 
// @access     Private  
const SetGoal = asyncHandler( async ( req, res ) => {
  if(!req.body.text){
    res.status(400)
    throw new Error('Please add a text field')
  }

  const goal = await Goal.create({
    text: req.body.text,
    user:req.user.id

  })


res.status(200).json(goal);
})



// @desc       Update Goal
// @route      PUT /api/goals/:id
// @access     Private  
const updateGoal =asyncHandler( async ( req, res ) => {

  const goal = await Goal.findById(req.params.id)

  if(!goal){
    res.status(400)
    throw new Error('Goal not found!!')
  }

const user = await User.findById(req.user.id)

//Check fror user
if(!user){
  res.status(401)
  throw new error('User not found!')
}

//Make sure the logged in user matches the goal user
if(goal.user.toString() !== user.id ){
res.status(401)
throw new Error('User not authorized!')
}

const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedGoal)
})



// @desc       Delete Goal
// @route      DELETE /api/goals/:id
// @access     Private  

const deleteGoal = asyncHandler(async (req, res) => {
  try {
    // Step 1: Find the goal by ID
    const goal = await Goal.findById(req.params.id);

    // Debugging: Log the goal ID and the found goal
    console.log('Goal ID:', req.params.id);
    console.log('Found Goal:', goal);

    // Step 2: Check if the goal exists
    if (!goal) {
      res.status(400);
      throw new Error('Goal not found!');
    }

    // Step 3: Find the user by ID
    const user = await User.findById(req.user.id);

    // Step 4: Check if the user exists
    if (!user) {
      res.status(401);
      throw new Error('User not found!');
    }

    // Step 5: Make sure the logged-in user matches the goal user
    if (goal.user.toString() !== user.id) {
      res.status(401);
      throw new Error('User not authorized!');
    }

    // Step 6: Delete the goal
    await goal.deleteOne();

    // Step 7: Respond with success
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    // Debugging: Log any errors that occurred
    console.error('Error:', error.message);
    
    // Respond with an error status and message
    res.status(500).json({ error: error.message });
  }
});




module.exports =  {
    getGoals,
    SetGoal,
    updateGoal,
    deleteGoal,
}