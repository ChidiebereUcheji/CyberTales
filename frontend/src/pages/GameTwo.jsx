import GameTwoComponent from "../components/GameTwoComponent"
import Navbar from "../components/Navbar"
import './gameTwo.css'


const GameTwo = () => {
  return (
    <div className="gameTwoContainer">
    <Navbar />
    
    <div style={{border: window.innerWidth < 960 ?  'none'  :  '2px solid lightgray'}} className="gameTwoInnerContainer">

   
       <GameTwoComponent />
   

    </div>

   </div>
  )
}

export default GameTwo
