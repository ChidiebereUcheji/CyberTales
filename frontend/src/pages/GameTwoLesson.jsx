import './gameTwoLesson.css'
import Navbar from '../components/Navbar'
import GameTwoLessonComponent from '../components/GameTwoLessonComponent'

const GameTwoLesson = () => {
  return (
    <div className="gameContainer">
    <Navbar />
    
    <div style={{border: window.innerWidth < 960 ?  'none'  :  '2px solid lightgray'}} className="gameInnerContainer">

       <GameTwoLessonComponent />
        </div>
      
    </div>
  )
}

export default GameTwoLesson
