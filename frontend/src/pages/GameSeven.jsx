import GameSevenComponent from "../components/GameSevenComponent"
import Navbar from "../components/Navbar"
import './gameSeven.css'


const GameSeven = () => {
  return (
    <div className="gameThreeContainer">
    <Navbar />
    
    <div style={{border: window.innerWidth < 960 ?  'none'  :  '2px solid lightgray'}} className="gameTwoInnerContainer">

 
    <GameSevenComponent />
   

    </div>

   </div>
  )
}

export default GameSeven
