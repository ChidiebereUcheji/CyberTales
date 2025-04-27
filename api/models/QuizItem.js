const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizItemSchema = new Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  }],
  questionsAttempted: {
    type: Number,
    default: 0,
  },
  pointsScored: {
    type: Number,
    default: 0,
  },
});

const UserQuizSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [QuizItemSchema]
}, { timestamps: true });

const UserQuiz = mongoose.model('UserQuiz', UserQuizSchema);
module.exports = UserQuiz;