import { Link } from "react-router-dom"
import profile from '../assets/user-circle-gray.png'
import guest from '../assets/guest-user.png'

import './onboardingComponent.css'

const OnboardingComponent = () => {
  return (
    <>  
  
    <div className="onboardingComponentContainer">
        <Link to='/login'
        style={{minWidth:window.innerWidth < 960 ?  '80%'  : '60%', borderRadius:'30px', border:'2px solid', backgroundColor:'#CDE9FF',borderColor:'#0A0D171A', padding:'7px'}}
        className="flex items-center justify-center gap-2 text-[#004C85]">
        <img style={{width:'25px', height:'25px', objectFit:'contain'}} src={profile} alt="Profile" />
        <p style={{fontSize: window.innerWidth < 960 ? '13px' :'17px'}}>Log in account</p>
        </Link>
        <Link to='/sign-up'
          style={{minWidth:'60%', borderRadius:'30px', border:'2px solid', backgroundColor:'#CDE9FF',borderColor:'#0A0D171A',  padding:'7px'}}
        className="flex items-center justify-center gap-2 text-[#004C85]"
        >
        <img style={{width:'25px', height:'25px', objectFit:'contain'}} src={profile} alt="Profile" />
        <p style={{fontSize: window.innerWidth < 960 ? '13px' :'17px'}}>Create a new account</p>
        </Link>

        <div style={{minWidth:'40%'}} className="flex flex-col items-center justify-center gap-1">
            <p style={{fontSize:window.innerWidth < 960 ? '13px' :'18px', fontWeight:400, textAlign:'center'}}>Not a member of company yet ?</p>
            <Link to='/game' style={{fontSize: window.innerWidth < 960 ? '12px' :'16px', fontWeight:700}}>Start free trial</Link>
        </div>

        <Link style={{position:'fixed', right:'30px', bottom:'40px', marginTop:'30px' }} to='/game' className="flex gap-2 items-center justify-end">
        <p>Guest</p>
        <img style={{width:'20px', height:'20px', objectFit:'contain'}} src={guest} alt="Guest" />
    </Link>
    </div>

   

    </>
  )
}

export default OnboardingComponent
