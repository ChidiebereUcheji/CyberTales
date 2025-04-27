
import GameSevenLessonComponent from '../components/GameSevenLessonComponent'
import Navbar from '../components/Navbar'
import './gameTwoLesson.css'

const GameSevenLesson = () => {
  return (
    <div className="gameContainer">
    <Navbar />
    
    <div className="gameInnerContainer">

    <GameSevenLessonComponent />

        </div>
      
    </div>
  )
}

export default GameSevenLesson
