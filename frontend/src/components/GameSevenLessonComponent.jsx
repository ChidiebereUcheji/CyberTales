import { IoArrowForwardCircleOutline } from "react-icons/io5"
import lessonTwoImage from '../assets/game7lesson.png'
import { Link } from "react-router-dom"

const GameSevenLessonComponent = () => {
  return (
    <div className="gameTwoLessonMainContainer">
       
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:window.innerHeight < 650 ? '-30px'  :'10px', marginBottom:'10px',  marginLeft: window.innerWidth < 450 ? '-40px' : ''}}>
      <h1 style={{fontWeight:700, fontSize: window.innerWidth < 960 ? '20px' : '28px'}} className=" text-[#004C85]">Mini-Lesson</h1>
      <p style={{fontWeight:600,fontSize: window.innerWidth < 960 ? '16px' : '20px' }} className=" text-[#004C85]">The Insider Threat</p>
    </div>

    <div className="gameTwoLessonMainImageContainer">
      <img  src={lessonTwoImage} alt="Lesson Image" />
      <div style={{display:'flex', flexDirection:'column', gap:'10px' }}>

          <div style={{width:window.innerWidth < 400 ? '120%' : window.innerWidth < 960 ? '100%'  :'430px', height:'max-content', position:'relative', backgroundColor:'#004C85', color:'white', padding:'10px'}}>

          <span style={{position:'absolute',top:'-12px', left:'48%'}}>💡</span>
          <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px'}}>
              When Employees Become Security Risks <br />
              An insider threat is when an employee, contractor, or trusted individual misuses access to harm the organization, whether intentionally or accidentally.
          </p>

          </div>

          <div style={{width:window.innerWidth < 400 ? '120%' : window.innerWidth < 960 ? '100%'  :'430px', height:'max-content',  backgroundColor:'#004C85', color:'white', padding:'10px'}}>
          <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px'}}>Types of Insider Threats: <br />
	1.	Negligent Employees – Careless mistakes like leaving a laptop unlocked. <br />
	2.	Malicious Insiders – Employees who steal data for revenge or profit. <br />
	3.	Unintentional Threats – Employees tricked into helping hackers (social engineering).
          
	</p>

          </div>
   
      </div>
    </div> 


    <div className="gameTwoLessonMainYellowContainer">
      <h3 style={{fontWeight:'bold', fontSize:'14px'}}>
      How to Stay Safe:

      </h3>
      <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px', }}>✅ Report suspicious behavior.</p>
      <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px'}}>✅ Follow company data-sharing policies.</p>
      <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px'}}>✅ Limit access to sensitive files.</p>

    </div>

    <Link to='/game-seven-mini-lesson' 
          style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom:window.innerWidth < 400 ? '-50px' : window.innerWidth < 600 ? '10px' : '-5px', zIndex:'1000', gap:'80%'}} className="flex items-center justify-end"
    //  style={{width:'50%', position:'fixed',right:'-55px',bottom:window.innerWidth < 960 ? '100px' : '50px', zIndex:'1000'}}
     >
    <IoArrowForwardCircleOutline size={33}/>
    </Link>

  </div>
  )
}

export default GameSevenLessonComponent
