import GameEightLessonComponent from "../components/GameEightLessonComponent"
import Navbar from "../components/Navbar"
import './gameTwoLesson.css'

const GameEightLesson = () => {
  return (
    <div className="gameContainer">
    <Navbar />
    
    <div className="gameInnerContainer">

   <GameEightLessonComponent />

        </div>
      
    </div>
  )
}

export default GameEightLesson
