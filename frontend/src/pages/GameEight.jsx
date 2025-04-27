import GameEightComponent from "../components/GameEightComponent"
import Navbar from "../components/Navbar"
import './gameEight.css'

const GameEight = () => {
  return (
    <div className="gameTwoContainer">
    <Navbar />
    
    <div style={{border: window.innerWidth < 960 ?  'none'  :  '2px solid lightgray'}} className="gameTwoInnerContainer">

 
        <GameEightComponent />
   

    </div>

   </div>
  )
}

export default GameEight
