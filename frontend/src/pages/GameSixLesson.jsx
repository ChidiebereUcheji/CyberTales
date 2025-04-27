import GameSixLessonComponent from "../components/GameSixLessonComponent"
import Navbar from "../components/Navbar"
import './gameTwoLesson.css'

const GameSixLesson = () => {
  return (
    <div className="gameContainer">
    <Navbar />
    
    <div className="gameInnerContainer">

      <GameSixLessonComponent />

        </div>
      
    </div>
  )
}

export default GameSixLesson
