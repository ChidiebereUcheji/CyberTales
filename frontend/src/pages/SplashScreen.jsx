import logo from '../assets/Logo2.png'
// import cyberTales from '../assets/Cybertales.png'
import cyber from '../assets/cyber.png'
import tales from '../assets/tales.png'
import './splashScreen.css';
import { useEffect, useState } from 'react';


const SplashScreen = () => {

  const [showCyber, setShowCyber] = useState(false);
  const [showTales, setShowTales] = useState(false);

        useEffect(()=>{
          
          setTimeout(()=>setShowCyber(true), 1000)
          setTimeout(()=>setShowTales(true), 1500)

        }, [])
  
    console.log(logo)
  return (
    <div style={{width:'100%', height:'100vh'}} className="w-full h-[100%] bg-[#004C85] flex items-center justify-center flex-col gap-1">
      <div style={{width:window.innerWidth < 960 ? "100px" : '150px', height:window.innerWidth < 960 ? "100px" :'150px',}}>
        <img className="bouncing-image" src={logo} alt="Logo" style={{width:'100%', height:'100%', objectFit:"contain"}} />
      </div>
      <div className='flex items-center justify-center gap-2 mt-4'>
        <img
          src={cyber}
          alt="Cyber"
          className={`transition-image ${showCyber ? 'fade-in' : 'hidden'}`}
          style={{ width: 90, height: 48, objectFit: 'contain' }}
        />
        <img
          src={tales}
          alt="Tales"
          className={`transition-image ${showTales ? 'fade-in' : 'hidden'}`}
          style={{ width: 90, height: 44, objectFit: 'contain',marginLeft:'-5px' }}
        />
      </div>
     {/* {window.innerWidth < 960 ?
      <div style={{width: '178px', height:'178px', marginTop:'-50px'}}>
        <img  className="bouncing-image"  src={cyberTales} alt="Logo" style={{width:'100%', height:'100%', objectFit:"contain"}} />
        
      </div>
      :
      null } */}
    </div>
  )
}

export default SplashScreen
