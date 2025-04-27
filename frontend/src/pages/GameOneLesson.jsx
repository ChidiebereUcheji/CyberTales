import GameOneLessonComponent from '../components/GameOneLessonComponent'
import Navbar from '../components/Navbar'
import './gameOneLesson.css'

const GameOneLesson = () => {
  return (
    <div className="gameContainer">
    <Navbar />
    
    <div style={{border: window.innerWidth < 960 ?  'none'  :  '2px solid lightgray'}} className="gameInnerContainer">

        <GameOneLessonComponent />
        </div>
      
    </div>
  )
}

export default GameOneLesson
 