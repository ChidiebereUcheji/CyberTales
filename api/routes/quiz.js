const express = require("express");
const { createQuiz, getAllQuiz, updateQuiz, deleteById, updateQuizItem, getEachUsersQuizItems } = require("../controllers/quiz");
const { checkAuth } = require("../middlewares/checkAuth");

const router = express.Router();

router.post('/create', createQuiz);
router.get('/getall', getAllQuiz);
router.delete('/delete/:id', deleteById);
router.put('/update/:id', updateQuiz);

router.put('/submit-answer/:userId', checkAuth ,updateQuizItem)
router.get('/get-quiz-item/:userId', checkAuth ,getEachUsersQuizItems)

module.exports = router;