import Navbar from '../components/Navbar'
import GameFiveComponent from '../components/GameFiveComponent'
import './gameFive.css'

const GameFive = () => {
  return (
    <div className="gameTwoContainer">
    <Navbar />
    
    <div style={{border: window.innerWidth < 960 ?  'none'  :  '2px solid lightgray'}} className="gameTwoInnerContainer">

    <GameFiveComponent />
   

    </div>

   </div>
  )
}

export default GameFive
