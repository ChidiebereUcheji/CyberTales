import { IoArrowForwardCircleOutline } from "react-icons/io5"
import lessonTwoImage from '../assets/gameThreeLesson.png'
import { Link } from "react-router-dom"

const GameThreeLessonComponent = () => {
  return (
    <div style={{display:'flex', flexDirection:'column', gap:'10px'}} className="gameThreeLessonMainContainer">
      
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:window.innerHeight < 650 ? '-20px' :'10px', marginBottom:window.innerHeight < 650 ? '0px' : window.innerWidth < 960 ? '10px' :'-20px',  marginLeft:window.innerWidth < 400 ? '40px' :  window.innerWidth < 450 ? '-40px' : ''}}>
        <h1 style={{fontWeight:700, fontSize: window.innerWidth < 960 ? '23px' : '30px'}} className=" text-[#004C85]">Mini-Lesson</h1>
        <p style={{fontWeight:600,fontSize: window.innerWidth < 960 ? '16px' : '20px' }} className=" text-[#004C85]">The Public Wi-Fi Desert</p>
      </div>

      <div  className="gameThreeLessonMainImageContainer" >
        <img  src={lessonTwoImage} alt="Lesson Image" />
        <div >

            <div style={{width:window.innerWidth < 960 ? '100%'  :'500px', height:'max-content', position:'relative', backgroundColor:'#004C85', color:'white', padding:'10px'}}>

            <span style={{position:'absolute',top:'-12px', left:'48%'}}>💡</span>
            <p style={{fontSize:window.innerWidth < 960 ? '13px'  :'14px'}}>Public Wi-Fi in cafés, hotels, and airports can be dangerous. Cybercriminals often set up fake networks to intercept your data.</p>

            </div>

            <div style={{width:window.innerWidth < 960 ? '100%'  :'500px', height:'max-content',  backgroundColor:'#004C85', color:'white', padding:'10px'}}>
            <p style={{fontSize:window.innerWidth < 960 ? '13px'  :'14px'}}>Dangers of Public Wi-Fi: <br />
	        1.	Man-in-the-Middle Attacks: Hackers position themselves between you and the Wi-Fi network to steal data. <br />
	        2.	Unencrypted Networks: Many public Wi-Fi hotspots don’t encrypt traffic, making it easy for attackers to intercept messages. <br />
	        3.	Fake Hotspots: A hacker might create a Wi-Fi network called “Free Airport Wi-Fi” to trick you.</p>

            </div>
     
        </div>
      </div>


      <div className="gameThreeLessonMainYellowContainer">
        <h3 style={{fontWeight:'bold', fontSize:'14px'}}>
        How to Stay Safe:


 

        </h3>
        <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px', }}>✅ Use a VPN (Virtual Private Network) to encrypt data.</p>
        <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px'}}>✅ Use mobile data instead of public Wi-Fi for sensitive work.</p>
        <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px'}}>✅ Never log into banking, email, or work accounts on public Wi-Fi.</p>

      </div>

      <Link 
      to="/game-three-mini-lesson" 
        style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom:window.innerWidth < 600 ? '-70px' : '-5px', zIndex:'1000', gap:'80%'}} className="flex items-center justify-end"
      // style={{width:'50%', position:'fixed',right:'-55px',bottom:window.innerWidth < 600 ? '10%' : '6%', zIndex:'1000'}}
      >
      <IoArrowForwardCircleOutline size={33}/>
      </Link>

    </div>
  )
}

export default GameThreeLessonComponent
