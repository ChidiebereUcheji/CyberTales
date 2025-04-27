import { IoArrowForwardCircleOutline } from "react-icons/io5"
import lessonTwoImage from '../assets/game9lesson.png'
import { Link } from "react-router-dom"

const GameNineLessonComponent = () => {
  return (
    <div className="gameTwoLessonMainContainer">
       
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:window.innerHeight < 650 ? '-30px' :'10px', marginBottom:'12px',  marginLeft: window.innerWidth < 450 ? '-40px' : ''}}>
      <h1 style={{fontWeight:700, fontSize: window.innerWidth < 960 ? '20px' : '28px'}} className=" text-[#004C85]">Mini-Lesson</h1>
      <p style={{fontWeight:600,fontSize: window.innerWidth < 960 ? '16px' : '20px' }} className=" text-[#004C85]">The Software Update Lagoon</p>
    </div>

    <div style={{marginLeft:"-10px"}} className="gameTwoLessonMainImageContainer" >
      <img src={lessonTwoImage} alt="Lesson Image" />
      <div>

          <div style={{width: window.innerWidth < 400 ? '120%' : window.innerWidth < 960 ? '100%'  :'430px', height:'fit-content', position:'relative', backgroundColor:'#004C85', color:'white', padding:'10px'}}>

          <span style={{position:'absolute',top:'-12px', left:'48%'}}>💡</span>
          <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'13px'}}>
          The Importance of Software Updates <br />
          Outdated software is one of the main ways hackers exploit vulnerabilities in systems.
          </p>

          </div>

          <div style={{width: window.innerWidth < 400 ? '120%' : window.innerWidth < 960 ? '100%'  :'430px', height:'fit-content',  backgroundColor:'#004C85', color:'white', padding:'10px'}}>
          <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'13px'}}>
          Why Updates Matter: <br />
    1.	Security Fixes – Patches close security holes. <br />
	2.	Performance Improvements – Faster, better, and safer software. <br />
	3.	Protection Against Zero-Day Attacks – Hackers target outdated systems.
          
	</p>

          </div>
   
      </div>
    </div>


    <div className="gameTwoLessonMainYellowContainer">
      <h3 style={{fontWeight:'bold', fontSize:'14px'}}>
      How to Stay Safe:

      </h3>
      <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px', }}>✅ Enable automatic updates.</p>
      <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px'}}>✅ Install security patches as soon as they are available.</p>

    </div>

    <Link to='/game-nine-mini-lesson' 
     style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom: window.innerWidth < 400 ? '-50px' : window.innerWidth < 600 ? '10px' : '-5px', zIndex:'1000', gap:'80%'}} className="flex items-center justify-end"
    // style={{display:'flex', alignItems:'center', justifyContent:'flex-end', marginTop:'20px'}}
    >
    <IoArrowForwardCircleOutline size={33}/>
    </Link>

  </div>
  )
}

export default GameNineLessonComponent
