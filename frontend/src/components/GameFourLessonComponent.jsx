import { IoArrowForwardCircleOutline } from "react-icons/io5"
import lessonTwoImage from '../assets/game4LessonImage.png'
import { Link } from "react-router-dom"
 
const GameFourLessonComponent = () => {
  return (
    <div className='gameOneLessonMainContainer'> 
      
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:'10px', marginBottom:'10px',  marginLeft: window.innerWidth < 400 ? '0px' : window.innerWidth < 450 ? '-40px' : ''}}>
        <h1 style={{fontWeight:700, fontSize: window.innerWidth < 960 ? '20px' : '28px'}} className=" text-[#004C85]">Mini-Lesson</h1>
        <p style={{fontWeight:600,fontSize: window.innerWidth < 960 ? '16px' : '20px' }} className=" text-[#004C85]">The Social Engineering Maze</p>
      </div>

      <div className='gameOneLessonMainImageContainer'>
        <img src={lessonTwoImage} alt="Lesson Image" />
        <div style={{display:'flex', flexDirection:'column', gap:'10px' }}>

            <div>

            <span style={{position:'absolute',top:'-12px', left:'48%'}}>💡</span>
            <p style={{fontSize:window.innerWidth < 960 ? '13px'  :'15px'}}>What is Social Engineering? <br />
                        Hackers manipulate people into giving up sensitive information by pretending to be someone trustworthy.</p>

            </div>

            {/* <div style={{width:window.innerWidth < 960 ? '420px'  :'614px', height:'150px',  backgroundColor:'#004C85', color:'white', padding:'10px'}}>
            <p style={{fontSize:window.innerWidth < 960 ? '13px'  :'15px'}}>Dangers of Public Wi-Fi: <br />
	        1.	Man-in-the-Middle Attacks: Hackers position themselves between you and the Wi-Fi network to steal data. <br />
	        2.	Unencrypted Networks: Many public Wi-Fi hotspots don’t encrypt traffic, making it easy for attackers to intercept messages. <br />
	        3.	Fake Hotspots: A hacker might create a Wi-Fi network called “Free Airport Wi-Fi” to trick you.</p>

            </div> */}
     
        </div>
      </div>


      <div className='gameOneLessonMainYellowContainer'>
        <h3 style={{fontWeight:'bold', fontSize:'14px'}}>
        Common Social Engineering Tactics:



        </h3>
        <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px', }}>✅ Impersonating IT or Management – “We need your login to fix an issue.”</p>
        <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px'}}>✅ Creating Urgency – “Send me that file NOW!”</p>
        <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px'}}>✅ Building Trust – Pretending to be a colleague.</p>

      </div>

      <Link 
      to='/game-four-mini-lesson' 
        style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom:window.innerWidth < 600 ? '-50px' : '-5px', zIndex:'1000', gap:'80%'}} className="flex items-center justify-end"
      // style={{display:'flex', alignItems:'center', justifyContent:'flex-end', marginTop:'20px'}}
      >
      <IoArrowForwardCircleOutline size={33}/>
      </Link>

    </div>
  )
}

export default GameFourLessonComponent
