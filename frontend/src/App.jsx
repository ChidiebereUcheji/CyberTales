
import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Game from './pages/Game';
import GameOneLesson from './pages/GameOneLesson';
import MiniLessonOne from './pages/MiniLessonOne';
import GameTwo from './pages/GameTwo';
import MiniLessonTwo from './pages/MiniLessonTwo';
import GameTwoLesson from './pages/GameTwoLesson';
import GameThree from './pages/GameThree';
import GameThreeLesson from './pages/GameThreeLesson';
import MiniLessonThree from './pages/MiniLessonThree';
import GameFour from './pages/GameFour';
import GameFourLesson from './pages/GameFourLesson';
import MiniLessonFour from './pages/MiniLessonFour';
import GameFive from './pages/GameFive';
import GameFiveLesson from './pages/GameFiveLesson';
import MiniLessonFive from './pages/MiniLessonFive';
import GameSix from './pages/GameSix';
import GameSixLesson from './pages/GameSixLesson';
import MiniLessonSix from './pages/MiniLessonSix';
import GameSeven from './pages/GameSeven';
import GameSevenLesson from './pages/GameSevenLesson';
import MiniLessonSeven from './pages/MiniLessonSeven';
import GameEight from './pages/GameEight';
import GameEightLesson from './pages/GameEightLesson';
import MiniLessonEight from './pages/MiniLessonEight';
import GameNine from './pages/GameNine';
import GameNineLesson from './pages/Game9Lesson';
import MiniLessonNine from './pages/MiniLessonNine';
import ForgotPassword from './pages/ForgotPassword';
import ProfilePage from './pages/ProfilePage';
import ProfileUpdateForm from './pages/ProfileUpdateForm';
import EditPassword from './pages/EditPassword';
import LeaderBoard from './pages/LeaderBoard';
import Certification from './pages/Certification';


function App() {

  return (
    <Router>
      <Routes>

      <Route path="/splash-screen" element={<SplashScreen />} />
     
      <Route path="/home" element={<Home />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/edit-password" element={<EditPassword />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile-update" element={<ProfileUpdateForm />} />
      <Route path="/leaderboard" element={<LeaderBoard />} />
      <Route path="/certification" element={<Certification />} />
      {/* <Route path="/onboarding" element={<Onboarding />} /> */}
      <Route path="/" element={<Onboarding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="/game" element={<Game />} />
      <Route path="/game-one-lesson" element={<GameOneLesson />} />
      <Route path="/game-one-mini-lesson" element={<MiniLessonOne />} />
      <Route path="/game-two" element={<GameTwo />} />
      <Route path="/game-two-lesson" element={<GameTwoLesson />} />
      <Route path="/game-two-mini-lesson" element={<MiniLessonTwo />} />
      <Route path="/game-three" element={<GameThree />} />
      <Route path="/game-three-lesson" element={<GameThreeLesson />} />
      <Route path="/game-three-mini-lesson" element={<MiniLessonThree />} />
      <Route path="/game-four" element={<GameFour />} />
      <Route path="/game-four-lesson" element={<GameFourLesson />} />
      <Route path="/game-four-mini-lesson" element={<MiniLessonFour />} />
      <Route path="/game-five" element={<GameFive />} />
      <Route path="/game-five-lesson" element={<GameFiveLesson />} />
      <Route path="/game-five-mini-lesson" element={<MiniLessonFive />} />
      <Route path="/game-six" element={<GameSix />} />
      <Route path="/game-six-lesson" element={<GameSixLesson />} />
      <Route path="/game-six-mini-lesson" element={<MiniLessonSix />} />
      <Route path="/game-seven" element={<GameSeven />} />
      <Route path="/game-seven-lesson" element={<GameSevenLesson />} />
      <Route path="/game-seven-mini-lesson" element={<MiniLessonSeven />} />
      <Route path="/game-eight" element={<GameEight />} />
      <Route path="/game-eight-lesson" element={<GameEightLesson />} />
      <Route path="/game-eight-mini-lesson" element={<MiniLessonEight />} />
      <Route path="/game-nine" element={<GameNine />} />
      <Route path="/game-nine-lesson" element={<GameNineLesson />} />
      <Route path="/game-nine-mini-lesson" element={<MiniLessonNine />} />
  

      </Routes>
   
    </Router>
  )
}

export default App
