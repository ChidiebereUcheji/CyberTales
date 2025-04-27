import { IoArrowForwardCircleOutline } from "react-icons/io5"
import lessonTwoImage from '../assets/gameTwoMiniLesson.png'
import { Link } from "react-router-dom"

 
const GameTwoLessonComponent = () => {
  return (
    <div className="gameTwoLessonMainContainer">
      
      <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:window.innerHeight < 650 ?  '-20px' : window.innerWidth < 400 ? '30px' : '-10px', marginBottom:window.innerHeight < 650 ? '10px' : '10px',  marginLeft: window.innerWidth < 450 ? '-40px' : ''}}>
        <h1 style={{fontWeight:700, fontSize: window.innerWidth < 960 ? '20px' : '28px'}} className=" text-[#004C85]">Mini-Lesson</h1>
        <p style={{fontWeight:600,fontSize: window.innerWidth < 960 ? '16px' : '20px' }} className=" text-[#004C85]">The Password Forest</p>
      </div>

      <div className="gameTwoLessonMainImageContainer" >
        {/* <img style={{width:window.innerWidth < 960 ? '180px'  :'353px', height:window.innerWidth < 960 ? '180px'  :'353px', objectFit:'contain'}} src={lessonTwoImage} alt="Lesson Image" /> */}
        <img src={lessonTwoImage} alt="Lesson Image" />
        <div >

            <div style={{width:window.innerWidth < 400 ? '330px' : window.innerWidth < 960 ? '100%'  :'500px', height:'max-content', position:'relative', backgroundColor:'#004C85', color:'white', padding:'10px'}}>

            <span style={{position:'absolute',top:'-12px', left:'48%'}}>💡</span>
            <p style={{fontSize:window.innerWidth < 960 ? '12px'  :'14px'}}>Passwords are your first line of defense against hackers. Weak passwords are easy to guess and can be cracked within seconds.</p>

            </div>

            <div style={{width:window.innerWidth < 400 ? '330px' : window.innerWidth < 960 ? '100%'  :'500px', height:'max-content',  backgroundColor:'#004C85', color:'white', padding:'10px'}}>
            <p style={{fontSize:window.innerWidth < 960 ? '12px'  :'14px'}}>How Hackers Crack Weak Passwords: <br />
	                                                        1.	Brute Force Attacks: Trying thousands of combinations rapidly. <br />
	                                                        2.	Dictionary Attacks: Testing common words like password123 or letmein. <br />
	                                                        3.	Credential Stuffing: If you reuse passwords, hackers use stolen ones to access multiple accounts.</p>

            </div>
     
        </div>
      </div>


      <div className="gameTwoLessonMainYellowContainer">
        <h3 style={{fontWeight:'bold', fontSize:'14px'}}>
        Key Signs of Phishing Emails:

        </h3>
        <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px', }}>✅ Use at least 12 characters with a mix of letters, numbers, and symbols.</p>
        <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px'}}>✅ Avoid personal information (birthdays, pet names, or “123456”).</p>
        <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px'}}>✅ Consider using passphrases like “SunSh1ne-Is-Aw3some!” instead of simple words.</p>
        <p style={{fontSize:window.innerWidth < 960 ? '11px'  :'12px'}}>✅ Use a password manager to store complex passwords safely.</p>

      </div>

      <Link 
      to="/game-two-mini-lesson" 
       style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom:window.innerWidth < 600 ? '-70px' : '-5px', zIndex:'1000', gap:'80%'}} className="flex items-center justify-end"
      // style={{width:'50%', position:'fixed',right:'-55px',bottom:window.innerWidth < 600 ? '10%' : '7%', zIndex:'1000'}}
       >
      <IoArrowForwardCircleOutline size={33}/>
      </Link>

    </div>
  )
}

export default GameTwoLessonComponent
