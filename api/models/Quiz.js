const mongoose = require("mongoose");


const Schema = mongoose.Schema;



const QuizSchema = new Schema(
  {
    question: {
      type: String,
      default: "",
    },
    
    optionA: {
        type: String,
        default: "",
    },
    optionB: {
        type: String,
        default: "",
    },
    optionC: {
        type: String,
        default: "",
    },
    
    answer: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",

    },
    answerCharacter: {
      type: String,
      default: "",

    },
    isMainQuestion:{
      type: Boolean,
      default: false,
    }
   
   
  },
  { timestamps: true }
);

let Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;