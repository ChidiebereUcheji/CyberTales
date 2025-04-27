
import Navbar from '../components/Navbar'
import OnboardingComponent from '../components/OnboardingComponent'
import './home.css'
import cybertales from '../assets/Frame 32.png'
import SplashScreen from './SplashScreen'
import { useEffect, useState } from 'react'
// import logo from '../assets/Logo2.png'

const Onboarding = () => {

  const [showSplash, setShowSplash] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setShowSplash(false);
    },3000)
  }, [])

  return (
    <>

{showSplash ? <SplashScreen />
:

<div className="homeContainer">

    
{/* <Navbar /> */}

<div className="homeInnerContainer">

{window.innerWidth < 960 && <div style={{marginBottom:'-120px'}} className='flex flex-col gap-2 items-center justify-center'>
    {/* <img style={{width:'40px', height:'40px', objectFit:'contain'}} src={logo} alt="Logo" /> */}
    <img style={{width:window.innerWidth < 360 ? '200px' : '250px', height:window.innerWidth < 360 ? '200px' : '250px', objectFit:'contain'}} src={cybertales} alt="Logo" />
    </div>}

<OnboardingComponent />

</div>
</div>

} 

    </>
   
  )
}

export default Onboarding
