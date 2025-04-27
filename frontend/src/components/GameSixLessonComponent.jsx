import { IoArrowForwardCircleOutline } from "react-icons/io5"
import lessonTwoImage from '../assets/game6LessonImage.png'
import { Link } from "react-router-dom"

const GameSixLessonComponent = () => {
  return (
    <div className="gameTwoLessonMainContainer"> 
      
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:window.innerHeight < 650 ?  '-30px'  : window.innerWidth < 960 ? '50px':'-50px', marginBottom:'10px',  marginLeft: window.innerWidth < 450 ? '-40px' : ''}}>
      <h1 style={{fontWeight:700, fontSize: window.innerHeight < 680 ?  '26px'  : window.innerWidth < 960 ? '20px' : '28px'}} className=" text-[#004C85]">Mini-Lesson</h1>
      <p style={{fontWeight:600,fontSize: window.innerWidth < 960 ? '16px' : '20px' }} className=" text-[#004C85]">The Ransomware Castle</p>
    </div>

    <div className="gameTwoLessonMainImageContainer">
      <img src={lessonTwoImage} alt="Lesson Image" />

      <div >

          <div style={{width:window.innerWidth < 400 ? '120%' : window.innerHeight < 680 ?  '520px'  : window.innerWidth < 960 ? '100%'  :'480px', height:'max-content', position:'relative', backgroundColor:'#004C85', color:'white', padding:'10px'}}>

          <span style={{position:'absolute',top:'-12px', left:'48%'}}>💡</span>
          <p style={{fontSize: window.innerHeight < 680 ?  '10px'  : window.innerWidth < 960 ? '11px'  :'12px'}}>The Danger of Unknown USBs <br />
          Cybercriminals use “USB baiting” to trick employees into plugging infected USB devices into their work computers. This can install malware, steal data, or take control of systems.</p>

          </div>

          <div style={{width: window.innerWidth < 400 ? '120%' : window.innerHeight < 680 ?  '520px'  : window.innerWidth < 960 ? '100%'  :'480px', height:'max-content',  backgroundColor:'#004C85', color:'white', padding:'10px'}}>
          <p style={{fontSize:window.innerHeight < 680 ?  '10px'  : window.innerWidth < 960 ? '11px'  :'12px'}}>Common USB Threats: <br />
          1.	Malware-loaded USBs – Attackers drop USBs labeled “Payroll Data” or “Confidential Files” to tempt employees into plugging them in. <br />
          2.	Bad USB Attacks – A malicious USB device may look normal but acts like a keyboard, executing commands to install malware.<br />
          3.	Data Theft – Plugging in a compromised USB could allow hackers to extract company data.
          
	</p>

          </div>
   
      </div>
    </div>


    <div   className="gameTwoLessonMainYellowContainer">
      <h3 style={{fontWeight:'bold', fontSize:'14px'}}>
      How to Stay Safe:

      </h3>
      <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px', }}>✅ Never use unverified USBs.</p>
      <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px'}}>✅ Hand unknown USBs to IT/security.</p>
      <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px'}}>✅ Disable auto-run features on work devices.</p>

    </div>

    <Link
     to='/game-six-mini-lesson' 
      style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom:window.innerWidth < 600 ? '-70px' : '-5px', zIndex:'1000', gap:'80%'}} className="flex items-center justify-end"
    //  style={{width:'50%', position:'fixed',right:'-55px',bottom:window.innerWidth < 960 ? '100px' : '50px', zIndex:'1000'}}
     >
    <IoArrowForwardCircleOutline size={33}/>
    </Link>

  </div>
  )
}

export default GameSixLessonComponent
