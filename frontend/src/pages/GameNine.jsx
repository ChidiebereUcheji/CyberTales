import GameNineComponent from "../components/GameNineComponent"
import Navbar from "../components/Navbar"
import './gameNine.css'


const GameNine = () => {
  return (
    <div className="gameThreeContainer">
    <Navbar />
    
    <div style={{border: window.innerWidth < 960 ?  'none'  :  '2px solid lightgray'}} className="gameTwoInnerContainer">

    <GameNineComponent />
   

    </div>

   </div>
  )
}

export default GameNine
