const express = require("express");
const router = express.Router();

// const { authenticateUser } = require("../middlewares/authentication");
const {  register,login,getMe, updateMe, updateMyProfileImage, verificationOfSignup, forgottenPasswordVerificationEmail, forgotPasswordUpdate, getAllUsersFilteredByPointsScoredForLeaderboard, getAllUsers  } = require("../controllers/auth");
const { checkAuth } = require("../middlewares/checkAuth");

router.post("/register", register);
router.put("/verify-register/:email", verificationOfSignup);
router.get("/forgot-password/:email", forgottenPasswordVerificationEmail);
router.put("/update-password/:email", forgotPasswordUpdate);
router.get("/get-users-for-leaderboard", getAllUsersFilteredByPointsScoredForLeaderboard);
router.post("/login", login);
router.get("/get-me", checkAuth ,getMe);
router.get("/all-users" ,getAllUsers);
router.put("/update-me", checkAuth ,updateMe);
router.patch("/update-image", checkAuth ,updateMyProfileImage);




module.exports = router;