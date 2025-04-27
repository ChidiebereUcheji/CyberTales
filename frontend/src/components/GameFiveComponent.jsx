import { IoArrowForwardCircleOutline } from "react-icons/io5"
import foxImage from "../assets/soldierGame5.png"
import blueChatImage from "../assets/chatBlueEmpty.png"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useState } from "react";
import humanImage from "../assets/game5Image.png"
import blueChatBox2Image from "../assets/game5bluechatbox2.png"
import { useNavigate } from "react-router-dom";
import SuccessfulQuizModal from "./SuccessfulQuizModal";
import successChatImage from '../assets/successChatImage5.png';
import GoodAnimation from "./GoodAnimation";
import ProgressBarDetailsComponent from "./ProgressBarDetailsComponent";
import { useSelector } from "react-redux";
import { selectQuizInfo } from "../slices/quizSlice";
import { selectUserInfo } from "../slices/authSlice";

const GameFiveComponent = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showSymbol, setShowSymbol] = useState(false);
  const [showFirstChat, setShowFirstChat] = useState(false);
  const [showSecondChat, setShowSecondChat] = useState(false);
  // const [showBlackChat, setShowBlackChat] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showGood, setShowGood] = useState(false);


    // eslint-disable-next-line no-constant-binary-expression
   let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'

  const quizes = useSelector(selectQuizInfo)

  const filteredCategoryOneMainQuiz = quizes.filter((data)=> data.category === 'categoryFive' && data.isMainQuestion);
 
const userInfo = useSelector(selectUserInfo);
 


//  console.log(userInfo.user.id)

const postQuizDataToUser=()=>{

  let reqBody = {
    "quizId": filteredCategoryOneMainQuiz[0]._id,
     "answer" : filteredCategoryOneMainQuiz[0].answerCharacter
   }
  

  const myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${userInfo.token}`);
  myHeaders.append("Content-Type", "application/json");

   const requestOptions = {
              method: "PUT",
              headers: myHeaders,
              body: JSON.stringify(reqBody),
              redirect: "follow"
            };
            
            fetch(`${API}/quiz/submit-answer/${userInfo.user.id}`, requestOptions)
              .then((response) => response.json())
              .then((result) => {
                if(result.message === "Quiz item updated successfully"){
                  console.log("updated successfully")
                }
              
              })
              .catch((error) => console.error(error));

}

const postWrongAnswerQuizDataToUser=()=>{

  const myHeaders = new Headers();
  myHeaders.append("Authorization",`Bearer ${userInfo.token}`);
  myHeaders.append("Content-Type", "application/json");

    
let reqBody = {
  "quizId": filteredCategoryOneMainQuiz[0]._id,
   "answer" : selectedOption
 }

 console.log(reqBody)
   const requestOptions = {
              method: "PUT",
              headers: myHeaders,
              body: JSON.stringify(reqBody),
              redirect: "follow"
            };
            
            fetch(`${API}/quiz/submit-answer/${userInfo.user.id}`, requestOptions)
              .then((response) => response.json())
              .then((result) => {
                if(result.message === "Quiz item updated successfully"){
                  console.log("updated successfully")
                }
              })
              .catch((error) => console.error(error));

}




const handleOptionChange = (event) => {
  const selectedValue = event.target.value;
  setSelectedOption(selectedValue);
  // console.log(selectedValue);

  if (selectedValue === filteredCategoryOneMainQuiz[0]?.answerCharacter) {
    setShowGood(true);
    postQuizDataToUser();
  
  } else {
    setShowSuccessModal(true);
    postWrongAnswerQuizDataToUser();
   
   
  }
  selectedOption("");
};

 
const clickNextAction = () => {
  setCount((prevCount) => {
    const newCount = prevCount + 1;
    
    if (newCount === 1) {
      setShowFirstChat(true);
    } else if (newCount === 2) {
      setShowSymbol(true);
      setTimeout(()=> setShowSecondChat(true) ,1100)
    } else if (newCount === 3) {
      setShowSecondChat(false);
      setShowSymbol(false);
      setShowQuestion(true);
    } else if(newCount === 4){
      navigate('/game-five-mini-lesson')

    }
    
    return newCount;
  });
};

const goBackToTip=()=>{
  setCount(2)
  setShowQuestion(false);
  setShowSymbol(true);
  setTimeout(()=> setShowSecondChat(true) ,1100)
}

 
  return (
    <div style={{padding:'10px', margin:'auto', marginTop:window.innerWidth < 400 ? '70px'  : window.innerWidth < 450 ? '-100px'  : window.innerWidth < 960 ? '-100px' : '30px'}} className="flex flex-col gap-2 ">
             {showSuccessModal && <SuccessfulQuizModal showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} image1={foxImage} image2={successChatImage} navigateTo={"game-five-lesson"} />}
             {showGood && <GoodAnimation showGood={showGood} setShowGood={setShowGood} navigateTo={"game-six"} text="Congratulations! you passed The Ransomware Castle"/>}
      {/* progressbar */}
      <ProgressBarDetailsComponent />

      <div className="gameFiveTitleContainer" >
        <h1 style={{fontWeight:700, fontSize: window.innerWidth < 960 ? '20px' : '28px'}} className=" text-[#004C85]">The Ransomware Castle</h1>
        <p style={{fontWeight:600,fontSize: window.innerWidth < 960 ? '18px' : '20px' }} className=" text-[#004C85]">Interactive Conversation:</p>
      </div>

      <div style={{display:'flex', flexDirection: window.innerWidth < 960 ? 'column' : "row", marginBottom: window.innerWidth < 960 ? '-50px': '0px', gap:'10px', alignItems:window.innerWidth < 960 ? 'center' :'flex-start',marginLeft:'-20px', margin:'auto', marginTop:window.innerWidth <400 ?  '50px' : window.innerHeight < 700 ? '-40px' : '-20px' }}>

      <div style={{width:window.innerWidth < 460 ? '120%' : window.innerWidth < 960 ? '100%' :'460px', height:window.innerHeight < 650 ? '100px' : window.innerWidth < 960 ? '110px' : '120px', backgroundColor:'#2E3346', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', marginBottom:'100px', marginTop:window.innerWidth < 960 ? '30px' :'-60px'}}>
        <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"#00F8D2", width:'30px', height:'30px', left:'45%', top:'-15px', border:'1px solid white'}}></div>
      <p style={{fontSize: window.innerWidth < 960 ? '13px' : '16px', padding:'10px'}} className="text-white">You arrive at the Ransomware Castle, where a pop-up appears on your screen:</p>
      </div>

   

      <div style={{paddingTop:'120px', marginLeft :'100px', display:'flex', width:'100%', padding:'5px', marginTop : window.innerWidth < 960 ? '-140px' : '-180px', alignItems:'center', justifyContent:'center'}}>
        <div style={{position:'relative', marginTop: window.innerWidth < 960 ? '-40px' : ''}}>
        <img style={{width:window.innerWidth < 960 ? '100%' : '300px', height:window.innerWidth < 960 ? '380px' : '400px', objectFit:'contain'}} src={humanImage} alt="Home" />
      { showFirstChat &&  <img style={{width: window.innerWidth < 960 ? '200px' : '200px', height:window.innerWidth < 960 ? '150px' : '150px', objectFit:'contain', position:'absolute', top:'84px', left:window.innerWidth < 460 ? '0px'  : window.innerWidth < 700 ?'100px' : '50px'}} src={blueChatBox2Image} alt="Home" />}
        </div>

      
      
      

       {showSecondChat && <div className="gameFiveBlueChatContainer">
           <img src={blueChatImage} alt="Blue Chat Box" />
           <p className="gameFiveBlueChatText">&quot;This is an attack! What’s your next move?&quot;</p>
        </div> }

      </div>

      </div>

      

        {/* Owl Image start */}

       {showSymbol && <div>

          <div className="symbolFiveImageContainer">
          <img style={{width:window.innerWidth < 960 ? '110px' : '110px', height:window.innerWidth < 960 ? '160px' :'160px', objectFit:'contain'}} src={foxImage} alt="Owl Image" />
          </div>



        </div>}

      

        {/* Owl Image ends */}


        {/* <div style={{width: window.innerWidth < 960 ? '200px' :'200px', height:window.innerWidth < 960 ? '80px' : '90px', backgroundColor:'#2E3346', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px',bottom:'80px', left:'200px' }}>
        <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"red", width:'20px', height:'20px', left:'45%', top:'-10px', border:'1px solid white'}}></div>
      <p style={{fontSize: window.innerWidth < 960 ? '12px' : '15px'}} className="text-white">What’s your next step so the attackers won’t get access</p>
      </div> */}

       

        {/* Question column starts */}

       {showQuestion && <div style={{width: window.innerHeight < 700 ? '450px' :  window.innerWidth < 460 ? '120%' :  window.innerWidth < 960 ? '100%' :'390px', height:window.innerHeight < 650 ? '120px' : window.innerWidth < 960 ? '140px' : '140px', backgroundColor:'#2E3346', position:'absolute', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', left: window.innerWidth < 460 ? '-10%' : window.innerWidth < 600 ? '2%'  : window.innerWidth < 960 ?  '10%' :'20%', bottom:window.innerWidth < 400 ? '3%' :'11%',color:'white', fontSize:'15px'}}>
        <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"yellow", width:'30px', height:'30px', left:'45%', top:'-15px', border:'1px solid white'}}></div>


        <div>
      <h1>Question: <br />
      {filteredCategoryOneMainQuiz[0]?.question}</h1>
      <form
      //  onSubmit={handleSubmit}
      >
        <div>
          <label  style={{fontSize:'15px'}}>
            <input
            style={{marginRight:'10px'}}
              type="radio"
              value="A"
              checked={selectedOption === "A"}
              onChange={handleOptionChange}
            />
           {filteredCategoryOneMainQuiz[0]?.optionA}
          </label>
        </div>
        <div>
          <label style={{fontSize:'15px'}}>
            <input
            style={{marginRight:'10px'}}
              type="radio"
              value="B"
              checked={selectedOption === "B"}
              onChange={handleOptionChange}
            />
          {filteredCategoryOneMainQuiz[0]?.optionB}
          </label>
        </div>
        <div>
          <label style={{fontSize:'15px'}}>
            <input
            style={{marginRight:'10px'}}
              type="radio"
              value="C"
              checked={selectedOption === "C"}
              onChange={handleOptionChange}
            />
            {filteredCategoryOneMainQuiz[0]?.optionC}
          </label>
        </div>
       
      </form>
    </div>

        </div>}

        {/* Question column ends */}

        <div style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom:window.innerWidth < 400 ? '-50px'  : window.innerWidth < 600 ? '10px' : '0px', zIndex:'1000',gap:'80%'}} className="flex items-center justify-end">
     {count === 3 && <IoArrowBackCircleOutline onClick={goBackToTip} size={25} className="cursor-pointer"/>}
      <IoArrowForwardCircleOutline size={25} onClick={clickNextAction} className="cursor-pointer"/>

      </div>

     

    </div>
  )
}

export default GameFiveComponent
