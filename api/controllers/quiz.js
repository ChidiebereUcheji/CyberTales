const Quiz = require("../models/Quiz");
const UserQuiz = require("../models/QuizItem");
const User = require("../models/User");


exports.createQuiz = async(req, res)=>{
    try {
        const {category, question, optionA, optionB, optionC, answer, answerCharacter} = req.body;

        const quiz = new Quiz({
            
            question,
            optionA,
            optionB,
            optionC,
            answer,
            category,
            answerCharacter
          });
      
         
          await quiz.save();
      
          res.status(201).json({
            message: 'Quiz created successfully',
            quiz,
          });
    } catch (error) {

        res.status(400).json({
            message: 'Error creating quiz',
            error: error.message,
          });
        
    } 
} 

exports.getAllQuiz = async (req, res) => {
    try {
      const allQuiz = await Quiz.find().lean();  // Use .lean() to return plain JavaScript objects
      if (!allQuiz || allQuiz.length === 0) {  // Check if no quizzes are found
        return res.status(200).json({
          message: 'No Quiz',
        });
      }
  
      return res.status(200).json({
        message: 'All Quiz gotten successfully',
        quizes: allQuiz
      });
    } catch (error) {
      res.status(400).json({
        message: 'Error getting quiz',
        error: error.message,
      });
    }
  };
  
exports.deleteById = async(req,res)=>{
    try {
        const {id} = req.params;
        const foundQuiz = Quiz.findById(id);
        if(!foundQuiz){
            return res.status(404).json({ message: 'Quiz not found' });
        }

       await Quiz.findByIdAndDelete(id)

       res.status(200).json({
        message: 'Quiz information deleted successfully'
      });
    } catch (error) {
        res.status(400).json({
            message: 'Error deleting Quiz',
            error: error.message,
          });
    }
}

exports.updateQuiz =async(req,res)=>{

try {
    const {id} = req.params;
    const updatedData = req.body;

    const foundQuiz = Quiz.findById(id)

    if(!foundQuiz){
        return res.status(404).json({ message: 'Quiz not found' });
    }
    const updatedQuiz = Quiz.findByIdAndUpdate(
        id,
        {$set: updatedData},
        { new: true, runValidators: true }
    )
    if(!updatedQuiz){
        return res.status(404).json({message: 'Quiz updating failed'})
    }

    return res.status(200).json({
        message:'Quiz updated successfully',
        quiz: updatedQuiz
    })
    
} catch (error) {
    res.status(404).json({
        message: "Error updating quiz",
        error: error.message
    })
}

}

exports.updateQuizItem = async (req, res) => {
  const { userId } = req.params;
  const { quizId, answer } = req.body;

  if (!quizId || !answer) {
    return res.status(400).json({ message: "quizId and answer are required" });
  }

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) throw new Error('Quiz not found');

    const points = answer === quiz.answerCharacter ? 1 : 0;

    let userQuiz = await UserQuiz.findOne({ user: userId });

    if (!userQuiz) {
      userQuiz = new UserQuiz({ user: userId, items: [] });
    }

    // Find the index of the quizItem
    let itemIndex = userQuiz.items.findIndex(
      (item) => item.quizId.toString() === quizId
    );

    let quizItem;

    if (itemIndex === -1) {
      // Use Mongoose subdocument creation
      quizItem = userQuiz.items.create({
        quizId,
        questions: [quizId],
        questionsAttempted: 1,
        pointsScored: points,
      });

      userQuiz.items.push(quizItem);
    } else {
      quizItem = userQuiz.items[itemIndex];

      // Avoid duplicate questions
      if (!quizItem.questions.some(q => q.toString() === quizId)) {
        quizItem.questions.push(quizId);
      }

      quizItem.questionsAttempted += 1;
      quizItem.pointsScored += points;

      userQuiz.items[itemIndex] = quizItem; // Reassign for safety
    }

    await userQuiz.save();

    // Update User stats
    const user = await User.findById(userId);
    if (user) {
      user.attemptedQuestions = (user.attemptedQuestions || 0) + 1;
      user.pointsScored = (user.pointsScored || 0) + points;
      await user.save();
    }

    // Confirm the items are still a true array
    console.log("✅ Array Check:", Array.isArray(userQuiz.items)); // should be true
    console.log("✅ Quiz Items Structure:", userQuiz.items);

    return res.status(200).json({
      success: true,
      message: "Quiz item updated successfully",
      items: userQuiz.items, // Return full array
    });

  } catch (error) {
    console.error("❌ Error updating quiz item:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};




exports.getEachUsersQuizItems = async(req, res) =>{

  try {
    const {userId} = req.params;

    const allUsersQuiz = await UserQuiz.findOne({ user: userId });

    console.log(userId, allUsersQuiz)

    if (!allUsersQuiz || allUsersQuiz.length === 0) {  // Check if no quizzes are found
      return res.status(200).json({
        message: 'No Quiz',
      });
    }

    return res.status(200).json({
      message: 'All Quiz gotten successfully',
      quizItems: allUsersQuiz
    });

  } catch (error) {
    console.error('Error getting quiz item:', error);
    return res.status(500).json({ success: false, message: error.message });
  }

}