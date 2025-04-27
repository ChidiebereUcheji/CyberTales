
import Navbar from '../components/Navbar'
import GameSixComponent from '../components/GameSixComponent'
import './gameSix.css'

const GameSix = () => {
  return (
    <div className="gameThreeContainer">
    <Navbar />
    
    <div style={{border: window.innerWidth < 960 ?  'none'  :  '2px solid lightgray'}} className="gameTwoInnerContainer">

 
    <GameSixComponent />
   

    </div>

   </div>
  )
}

export default GameSix
