import { IoArrowForwardCircleOutline } from 'react-icons/io5'
import lessonOneImage from '../assets/FrameLesson.png'
import { Link } from 'react-router-dom'
 
const GameOneLessonComponent = () => {
  
  return (
    <div className='gameOneLessonMainContainer' >
      
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'10px', marginBottom:'30px', margin:'auto', justifyContent:'center'}}>
        <h1 style={{fontWeight:700, fontSize: window.innerWidth < 960 ? '20px' : '28px'}} className=" text-[#004C85]">Mini-Lesson</h1>
        <p style={{fontWeight:600,fontSize: window.innerWidth < 960 ? '16px' : '20px' }} className=" text-[#004C85]">The Phishing Swamp</p>
      </div>

      <div className='gameOneLessonMainImageContainer' >
        <img  src={lessonOneImage} alt="Lesson Image" />
        <div >
            <span style={{position:'absolute',top:'-12px', left:'48%'}}>💡</span>
            <p style={{fontSize:window.innerWidth < 960 ? '12px'  :'14px'}}>Phishing attacks are one of the most common and dangerous cyber threats. Attackers send fake emails, pretending to be from trusted sources (banks, employers, or government agencies) to trick you into revealing sensitive information.</p>
        </div>
      </div>


      <div className='gameOneLessonMainYellowContainer'>
        <h3 style={{fontWeight:'bold', fontSize:'14px'}}>Key Signs of Phishing Emails:</h3>
        <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px', }}>✅ Urgency & Fear: Messages that claim “Your account will be locked!” or “URGENT: Update your details now!”</p>
        <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px'}}>✅ Suspicious Links & Attachments: Hover over links without clicking—if they look strange, don’t trust them.</p>
        <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px'}}>✅ Generic Greetings: Real companies address you by name, not “Dear Customer.”</p>
        <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px'}}>✅ Unusual Sender Address: Example: support@payr0ll-updates.com (notice the ‘0’ replacing ‘o’).</p>
         <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px'}}>✅ Requests for Sensitive Info: No legitimate company will ask for passwords or banking details via email.</p>

      </div>

      <Link to="/game-one-mini-lesson"
       style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom:window.innerWidth < 600 ? '-50px' : '-5px', zIndex:'1000', gap:'80%'}} className="flex items-center justify-end"
      // style={{width:'50%', position:'fixed',right:'-55px',bottom:window.innerWidth < 600 ? '10%' : '10%', zIndex:'1000'}} 
      >
      <IoArrowForwardCircleOutline size={33}/>
      </Link>

    </div> 
  )
}

export default GameOneLessonComponent
