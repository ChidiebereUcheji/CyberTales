import GameFiveLessonComponent from "../components/GameFiveLessonComponent"
import Navbar from "../components/Navbar"
import './gameOneLesson.css'

const GameFiveLesson = () => {
  return (
    <div className="gameContainer">
    <Navbar />
    
    <div className="gameInnerContainer">

      <GameFiveLessonComponent />

        </div>
      
    </div>
  )
}

export default GameFiveLesson
