import GameFourComponent from "../components/GameFourComponent"
import Navbar from "../components/Navbar"
import './gameFour.css'

const GameFour = () => {
  return (
    <div className="gameTwoContainer">
    <Navbar />
    
    <div style={{border: window.innerWidth < 960 ?  'none'  :  '2px solid lightgray'}} className="gameTwoInnerContainer">

    <GameFourComponent />
   
   

    </div>

   </div>
  )
}

export default GameFour
