import { IoArrowForwardCircleOutline } from "react-icons/io5"

import raccoonImage from "../assets/game7bee.png"
import blueChatImage from "../assets/chatBlueEmpty.png"
import game7ChatImage from "../assets/game7chat.png"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useState } from "react";
import humanImage from "../assets/game7Image.png"
import { useNavigate } from "react-router-dom";
import SuccessfulQuizModal from "./SuccessfulQuizModal";
import successChatImage from '../assets/successChatImage7.png';
import GoodAnimation from "./GoodAnimation";
import ProgressBarDetailsComponent from "./ProgressBarDetailsComponent";
import { selectQuizInfo } from "../slices/quizSlice";
import { selectUserInfo } from "../slices/authSlice";
import { useSelector } from "react-redux";
 
const GameSevenComponent = () => {

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

  
  const quizes = useSelector(selectQuizInfo)

  const filteredCategoryOneMainQuiz = quizes.filter((data)=> data.category === 'categorySeven' && data.isMainQuestion);
 
const userInfo = useSelector(selectUserInfo);

 // eslint-disable-next-line no-constant-binary-expression
   let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
 



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

//  console.log(reqBody)
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
    } else if(newCount === 3){
      setShowSecondChat(false);
      // setShowBlackChat(false);
      setShowSymbol(false);
      setShowQuestion(true);

    }else if(newCount === 4){
      navigate('/game-seven-mini-lesson')
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
    <div style={{padding:'10px', margin:'auto', marginTop:window.innerWidth < 380 ? '40px'  : window.innerWidth < 450 ? '0px'  : window.innerWidth < 960 ? '20px' : '30px'}} className="flex flex-col gap-2 ">
        {showSuccessModal && <SuccessfulQuizModal showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} image1={raccoonImage} image2={successChatImage} navigateTo={"game-seven-lesson"} />}
        {showGood && <GoodAnimation showGood={showGood} setShowGood={setShowGood} navigateTo={"game-eight"} text="Congratulations! you passed The Insider Threat"/>}
      {/* progressbar */}
      <ProgressBarDetailsComponent />

      <div className="gameSevenTitleContainer">
        <h1 style={{fontWeight:700, fontSize: window.innerWidth < 960 ? '20px' : '28px'}} className=" text-[#004C85]">The Insider Threat</h1>
        <p style={{fontWeight:600,fontSize: window.innerWidth < 960 ? '18px' : '20px' }} className=" text-[#004C85]">Interactive Conversation:</p>
      </div>

      <div style={{display:'flex', flexDirection: window.innerWidth < 960 ? 'column' : "row", marginBottom: window.innerWidth < 960 ? '-50px': '-150px', gap:'10px', marginTop:window.innerWidth < 400 ? '50px'  : window.innerHeight < 680 ? '100px' : window.innerWidth < 960 ? '10px'  :'-50px', marginLeft: window.innerWidth < 400 && '-30px' }}>

      <div style={{width: window.innerWidth < 960 ? '310px' :'339px', height:window.innerWidth < 960 ? '110px' : '100px', backgroundColor:'#2E3346', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', marginBottom:'100px', marginLeft: '-30px', marginTop: window.innerHeight < 680 ? '-70px' : ''}}>
        <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"#00F8D2", width:'30px', height:'30px', left:'45%', top:'-15px', border:'1px solid white'}}></div>
      <p style={{fontSize: window.innerWidth < 960 ? '15px' : '18px'}} className="text-white"> Colleague approaches you in the kingdom’s courtyard:</p>
      </div>

   

      <div style={{paddingTop:window.innerWidth < 960 ? '50px' : '120px', marginLeft :'-10px', display:'flex', width:'100%', marginTop:window.innerWidth < 460 ? '-70px'  : window.innerWidth < 960 ? '-30px' : '-130px'}}>
        <div style={{position:'relative', marginTop:window.innerWidth < 960 ?  '-60px'  : '0px'}}>
        <img style={{width:window.innerHeight < 680 ?  '240px'  : window.innerWidth < 960 ? '260px' : '320px', height:window.innerHeight < 680 ?  '240px'  : window.innerWidth < 960 ? '340px' : '340px', objectFit:'contain'}} src={humanImage} alt="Home" />
       {showFirstChat && <img style={{width:window.innerWidth < 960 ? '160px' : '170px', height:window.innerWidth < 960 ? '150px' : '150px', objectFit:'contain', position:'absolute', top:window.innerWidth < 460 ? '-55px'  :'-90px', left:window.innerHeight < 680 ? '60px' : window.innerWidth < 460 ? '50px'  :'100px'}} src={game7ChatImage} alt="Home" />}
        </div>

      
      
      

       {showSecondChat && <div style={{left: window.innerWidth < 400 && '60px', bottom: window.innerWidth < 400 && '-40px' }} className="gameSevenBlueChatContainer">
           <img src={blueChatImage} alt="Blue Chat Box" />
           <p style={{fontSize: '14px'}} className="gameSixBlueChatText">Hoot hoot! This could be an insider threat. What will you do?</p>
        </div>}

      </div>

      </div>

      

        {/* Owl Image start */}

    {showSymbol &&    <div>

          <div style={{left: window.innerWidth < 400 && '-40px', bottom: window.innerWidth < 400 && '-40px' }} className="symbolSevenImageContainer">
          <img style={{width:window.innerWidth < 960 ? '120px' : '110px', height:window.innerWidth < 960 ? '140px' :'160px', objectFit:'contain'}} src={raccoonImage} alt="Owl Image" />
          </div>



        </div>}

      

        {/* Owl Image ends */}


        {/* <div style={{width: window.innerWidth < 960 ? '200px' :'200px', height:window.innerWidth < 960 ? '80px' : '90px', backgroundColor:'#2E3346', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px',bottom:'80px', left:'200px' }}>
        <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"red", width:'20px', height:'20px', left:'45%', top:'-10px', border:'1px solid white'}}></div>
      <p style={{fontSize: window.innerWidth < 960 ? '12px' : '15px'}} className="text-white">What’s your next step so the attackers won’t get access</p>
      </div> */}

       

        {/* Question column starts */}

      {showQuestion &&  <div style={{width: window.innerHeight < 680 ? '400px'  : window.innerWidth < 460 ? '120%'  : window.innerWidth < 960 ? '100%' :'380px', height:window.innerHeight < 680 ? '135px' : window.innerWidth < 960 ? 'max-content' : '140px', backgroundColor:'#2E3346', position:'absolute', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', left: window.innerWidth < 460 ? '-10%'  : window.innerWidth < 600 ? '1%'  : window.innerWidth < 960 ? '10%' :'28%', bottom:window.innerWidth < 400 ? '-2%' : window.innerHeight < 700 ? '10%' : '12%',color:'white', fontSize:'15px'}}>
        <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"yellow", width:'30px', height:'30px', left:'45%', top:'-15px', border:'1px solid white'}}></div>


        <div>
      <h1>Question: <br />
      {filteredCategoryOneMainQuiz[0]?.question}</h1>
      <form>
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

        <div style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom:window.innerWidth < 460 ? '-60px'  : window.innerWidth < 600 ? '10px' : window.innerWidth < 960 ? '-40px' : '0px', zIndex:'1000',gap:'80%'}} className="flex items-center justify-end">
      {count === 3 && <IoArrowBackCircleOutline onClick={goBackToTip} size={25} className="cursor-pointer"/>}
      <IoArrowForwardCircleOutline size={25} onClick={clickNextAction} className="cursor-pointer"/>

      </div>

     

    </div>

  )
}

export default GameSevenComponent
