import { IoArrowForwardCircleOutline } from "react-icons/io5"
import lessonTwoImage from '../assets/game8lesson.png'
import { Link } from "react-router-dom"

const GameEightLessonComponent = () => {
  return (
    <div className="gameTwoLessonMainContainer">
       
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:window.innerHeight < 650 ?  '-30px'  : '10px', marginBottom:'10px',  marginLeft: window.innerWidth < 450 ? '-40px' : ''}}>
      <h1 style={{fontWeight:700, fontSize: window.innerWidth < 960 ? '20px' : '28px'}} className=" text-[#004C85]">Mini-Lesson</h1>
      <p style={{fontWeight:600,fontSize: window.innerWidth < 960 ? '16px' : '20px' }} className=" text-[#004C85]">The Multi-Factor Authentication (MFA) Gate</p>
    </div>

    <div className="gameTwoLessonMainImageContainer">
      <img  src={lessonTwoImage} alt="Lesson Image" />
      <div style={{display:'flex', flexDirection:'column', gap:'10px' }}>

          <div style={{width:window.innerWidth < 400 ? '120%' : window.innerWidth < 960 ? '100%'  :'430px', height:'fit-content', position:'relative', backgroundColor:'#004C85', color:'white', padding:'10px'}}>

          <span style={{position:'absolute',top:'-12px', left:'48%'}}>💡</span>
          <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'13px'}}>
          Why MFA is a Must-Have <br />
          Multi-Factor Authentication (MFA) adds an extra security layer beyond just a password. Even if a hacker steals your password, they can’t access your account without the second factor.
          </p>

          </div>

          <div style={{width:window.innerWidth < 400 ? '120%' : window.innerWidth < 960 ? '100%'  :'430px', height:'fit-content',  backgroundColor:'#004C85', color:'white', padding:'10px'}}>
          <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'13px'}}>
          Types of MFA: <br />
	1.	SMS Codes – Least secure (SIM swapping risk). <br />
	2.	Authenticator Apps (Google Authenticator, Microsoft Authenticator) – More secure. <br />
	3.	Biometrics (Fingerprint, Face ID) – Hardest to fake.
          
	</p>

          </div>
   
      </div>
    </div>


    <div className="gameTwoLessonMainYellowContainer">
      <h3 style={{fontWeight:'bold', fontSize:'14px'}}>
      How to Stay Safe:

      </h3>
      <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px', }}>✅ Use multiple MFA methods (Authenticator App + Backup Codes).</p>
      <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px'}}>✅ Never approve an unexpected login request.</p>

    </div>

    <Link to='/game-eight-mini-lesson'
          style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom:window.innerWidth < 400 ? '-50px' : window.innerWidth < 600 ? '10px' : '-5px', zIndex:'1000', gap:'80%'}} className="flex items-center justify-end"
    //  style={{width:'50%', position:'fixed',right:'-55px',bottom:window.innerWidth < 960 ? '100px' : '20px', zIndex:'1000'}}
     >
    <IoArrowForwardCircleOutline size={33}/>
    </Link>

  </div>
  )
}

export default GameEightLessonComponent
