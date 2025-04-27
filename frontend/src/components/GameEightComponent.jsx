import { IoArrowForwardCircleOutline } from "react-icons/io5"
import raccoonImage from "../assets/game8police.png"
// import squirelImageSmall from "../assets/gameTwoSquirelSmall.png"
import blueChatImage from "../assets/chatBlueEmpty.png"
import game7ChatImage from "../assets/game8chat.png"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useState } from "react";
import humanImage from "../assets/game8Image.png"
import { useNavigate } from "react-router-dom";
import successChatImage from '../assets/successChatImage8.png';
import SuccessfulQuizModal from "./SuccessfulQuizModal";
import GoodAnimation from "./GoodAnimation";
import ProgressBarDetailsComponent from "./ProgressBarDetailsComponent";
import { selectQuizInfo } from "../slices/quizSlice";
import { selectUserInfo } from "../slices/authSlice";
import { useSelector } from "react-redux";
 
const GameEightComponent = () => {

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

   const filteredCategoryOneMainQuiz = quizes.filter((data)=> data.category === 'categoryEight' && data.isMainQuestion);
  
 const userInfo = useSelector(selectUserInfo);

  // eslint-disable-next-line no-constant-binary-expression
  let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
 
  

 
  // console.log(userInfo.user.id)
 
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
  //  console.log(selectedValue);
 
   if (selectedValue === filteredCategoryOneMainQuiz[0]?.answerCharacter) {
     setShowGood(true);
     postQuizDataToUser();
   
   } else {
    setShowSuccessModal(true);
     postWrongAnswerQuizDataToUser();
    
   }
   selectedOption("")
 };
 


 
const clickNextAction = () => {

  console.log("clicked")
  setCount((prevCount) => {
    const newCount = prevCount + 1;
    
    if (newCount === 1) {
      setShowFirstChat(true);
    } else if (newCount === 2) {
      setShowSymbol(true);  
      setTimeout(()=> setShowSecondChat(true) ,1100)
    }  else if(newCount === 3){
      setShowSecondChat(false);
      // setShowBlackChat(false);
      setShowSymbol(false);
      // setShowFirstChat(false);
      setShowQuestion(true);

    }else if(newCount === 4){
      navigate('/game-eight-mini-lesson')
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
    <div style={{padding:'10px', margin:'auto', marginTop:window.innerWidth < 450 ? '-50px'  : window.innerWidth < 960 ? '10px' : '30px'}} className="flex flex-col gap-2 ">
         {showSuccessModal && <SuccessfulQuizModal showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} image1={raccoonImage} image2={successChatImage} navigateTo={"game-eight-lesson"} />}
         {showGood && <GoodAnimation showGood={showGood} setShowGood={setShowGood} navigateTo={"game-nine"} text="Congratulations! you passed The Multi-Factor Authentication (MFA) Gate" />}
    {/* progressbar */}
    <ProgressBarDetailsComponent />

    <div className="gameEightTitleContainer">
      <h1 style={{fontWeight:700, fontSize: window.innerWidth < 960 ? '20px' : '28px'}} className=" text-[#004C85]">The Multi-Factor Authentication (MFA) Gate</h1>
      <p style={{fontWeight:600,fontSize: window.innerWidth < 960 ? '18px' : '20px' }} className=" text-[#004C85]">Interactive Conversation:</p>
    </div>

    <div style={{display:'flex', flexDirection: window.innerWidth < 960 ? 'column' : "row", marginBottom: window.innerWidth < 960 ? '-50px': '-100px', gap:'10px', marginTop:window.innerWidth < 400 ? '170px'  : window.innerHeight < 680 ?  '30px'  : window.innerWidth < 960 ? '-70px'  :'-80px', alignItems:window.innerWidth < 960 ? 'center' :'flex-start', }}>

    <div style={{width:window.innerHeight < 680 ? '110%'  : window.innerWidth < 960 ? '100%' :'339px', height:window.innerHeight < 680 ? '80px' : window.innerWidth < 960 ? '110px' : '120px', backgroundColor:'#2E3346', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', marginBottom:window.innerWidth < 960 ? '10px' : '100px', marginLeft:window.innerWidth < 960 ?'-20px'  :'0px'}}>
      <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"#00F8D2", width:'30px', height:'30px', left:'45%', top:'-15px', border:'1px solid white'}}></div>
    <p style={{fontSize: window.innerHeight < 680 ? '16px'  :  window.innerWidth < 960 ? '15px' : '18px'}} className="text-white"> You reach the MFA Gate, where a guard asks:</p>
    </div>

 

    <div style={{ marginLeft :'-10px', display:'flex', width:'100%', padding:'5px',}}>
      <div style={{position:'relative',marginTop: window.innerWidth < 960 ? '-30px' : ''}}>
      <img style={{width:window.innerHeight < 680 ? '260px' : window.innerWidth < 960 ? '300px' : '310px', height:window.innerHeight < 680 ? '260px' : window.innerWidth < 960 ? '300px' : '350px', objectFit:'contain', display:'flex', alignItems:'center', justifyContent:'center', margin:'auto'}} src={humanImage} alt="Home" />
     {showFirstChat && <img style={{width:window.innerWidth < 960 ? '180px' : '180px', height:window.innerWidth < 960 ? '180px' : '180px', objectFit:'contain', position:'absolute', top:'-34px', left:window.innerWidth < 400 ?  '40%'  : window.innerWidth < 960 ? '60%' : '60%'}} src={game7ChatImage} alt="Home" />}
      </div>

    
    
    

     {showSecondChat && <div className="gameEightBlueChatContainer">
         <img src={blueChatImage} alt="Blue Chat Box" />
         <p className="gameEightBlueChatText">Update now or risk sinking the ship! What will you do?</p>
      </div>}

    </div>

    </div>

    

      {/* Owl Image start */}

    {showSymbol &&  <div>

        <div className="symbolEightImageContainer">
        <img style={{width: window.innerHeight < 700 ? '120px' : window.innerWidth < 960 ? '120px' : '140px', height:window.innerHeight < 700 ? '160px' : window.innerWidth < 960 ? '160px' :'170px', objectFit:'contain'}} src={raccoonImage} alt="Owl Image" />
        </div>



      </div>}

    

      {/* Owl Image ends */}


      {/* <div style={{width: window.innerWidth < 960 ? '200px' :'200px', height:window.innerWidth < 960 ? '80px' : '90px', backgroundColor:'#2E3346', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px',bottom:'80px', left:'200px' }}>
      <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"red", width:'20px', height:'20px', left:'45%', top:'-10px', border:'1px solid white'}}></div>
    <p style={{fontSize: window.innerWidth < 960 ? '12px' : '15px'}} className="text-white">What’s your next step so the attackers won’t get access</p>
    </div> */}

     

      {/* Question column starts */}

     {showQuestion && <div style={{width:window.innerHeight < 680 ?  '420px'  : window.innerWidth < 460 ? '120%'  : window.innerWidth < 960 ? '100%' :'380px', height: window.innerHeight < 680 ?  '129px'  : window.innerWidth < 960 ? '160px' : '140px', backgroundColor:'#2E3346', position:'absolute', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', left:window.innerWidth < 460 ? '-10%'  : window.innerWidth < 600 ? '2%' : window.innerWidth < 960 ? '7%' :'25%', bottom:window.innerWidth < 460 ? '-2%'  : window.innerWidth  < 960 ?  '0%'  :  '10%',color:'white', fontSize:'15px'}}>
      <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"yellow", width:'30px', height:'30px', left:'45%', top:'-15px', border:'1px solid white'}}></div>


      <div>
    <h1>Question: <br />
    {filteredCategoryOneMainQuiz[0]?.question}</h1>
    <form >
      <div>
        <label  style={{fontSize: window.innerWidth < 960 ? '13px' :'15px'}}>
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
        <label style={{fontSize:  window.innerWidth < 960 ? '13px' : '15px'}}>
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
        <label style={{fontSize:  window.innerWidth < 960 ? '13px' : '15px'}}>
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

      <div style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom:window.innerWidth < 600 ? '-60px' : window.innerWidth < 960 ? '-60px' : '0px', zIndex:'1000', gap:'80%'}} className="flex items-center justify-end">
      {count === 3 && <IoArrowBackCircleOutline onClick={goBackToTip} size={25} className="cursor-pointer"/>}
      <IoArrowForwardCircleOutline size={25} onClick={clickNextAction} className="cursor-pointer"/>

      </div>

   

  </div>
  )
}

export default GameEightComponent
