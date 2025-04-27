import GameThreeComponent from "../components/GameThreeComponent"
import Navbar from "../components/Navbar"
import './gameThree.css'


const GameThree = () => {
  return (
    <div className="gameTwoContainer">
    <Navbar />
    
    <div style={{border: window.innerWidth < 960 ?  'none'  :  '2px solid lightgray'}} className="gameTwoInnerContainer">

   
      <GameThreeComponent />
      
   

    </div>

   </div>
  )
}

export default GameThree
