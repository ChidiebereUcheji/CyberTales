import GameComponent from "../components/GameComponent"
import Navbar from "../components/Navbar"
import './game.css'


const Game = () => {
  return (
    <div className="gameContainer">
     <Navbar />
     
     <div style={{border: window.innerWidth < 960 ?  'none'  :  '2px solid lightgray'}} className="gameInnerContainer">

    
        <GameComponent />
    

     </div>

    </div>
  )
}

export default Game
