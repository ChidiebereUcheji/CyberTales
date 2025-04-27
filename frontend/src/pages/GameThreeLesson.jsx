import GameThreeLessonComponent from "../components/GameThreeLessonComponent"
import Navbar from "../components/Navbar"
import './gameThreeLesson.css'

const GameThreeLesson = () => {
  return (
    <div className="gameContainer">
    <Navbar />
    
    <div className="gameInnerContainer">

        <GameThreeLessonComponent />

        </div>
      
    </div>
  )
}

export default GameThreeLesson
