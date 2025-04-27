import { Player } from '@lottiefiles/react-lottie-player';
import loaderSRC from '../assets/shoppingAnimation2.json'

const Loader = () => {
  return (
    <div style={{
        position: 'fixed', 
        top: 0,
        left: 0,
        zIndex:1100,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(250, 250, 250, 0.8)', 
      }}>

            <Player
            src={loaderSRC}
            className="player"
            loop
            autoplay
             style={{ height: '300px', width: '300px' }}
            />
      
    </div>
  )
}

export default Loader
