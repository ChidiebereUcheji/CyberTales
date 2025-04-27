
import GameFourLessonComponent from '../components/GameFourLessonComponent'
import Navbar from '../components/Navbar'
import './gameOneLesson.css'

const GameFourLesson = () => {
  return (
    <div className="gameContainer">
    <Navbar />
    
    <div className="gameInnerContainer">

       <GameFourLessonComponent />

        </div>
      
    </div>
  )
}

export default GameFourLesson
