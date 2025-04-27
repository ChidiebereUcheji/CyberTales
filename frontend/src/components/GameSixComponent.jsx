import { IoArrowForwardCircleOutline } from "react-icons/io5"
import raccoonImage from "../assets/raccoonGame6Image.png"
import blueChatImage from "../assets/chatBlueEmpty.png"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import {  useState } from "react";
import humanImage from "../assets/game6Image.png"
import { useNavigate } from "react-router-dom";
import successChatImage from '../assets/successChatImage6.png';
import SuccessfulQuizModal from "./SuccessfulQuizModal";
import GoodAnimation from "./GoodAnimation";
import ProgressBarDetailsComponent from "./ProgressBarDetailsComponent";
import { selectQuizInfo } from "../slices/quizSlice";
import { selectUserInfo } from "../slices/authSlice";
import { useSelector } from "react-redux";

 
const GameSixComponent = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const [showSymbol, setShowSymbol] = useState(false);
  const [showFirstChat, setShowFirstChat] = useState(false);
  const [showSecondChat, setShowSecondChat] = useState(false);
  // const [showBlackChat, setShowBlackChat] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [count, setCount] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showGood, setShowGood] = useState(false);

  const navigate = useNavigate();

 // eslint-disable-next-line no-constant-binary-expression
   let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'

  
  const quizes = useSelector(selectQuizInfo)

  const filteredCategoryOneMainQuiz = quizes.filter((data)=> data.category === 'categorySix' && data.isMainQuestion);
 
const userInfo = useSelector(selectUserInfo);
 

//  console.log(userInfo.user.id)

const postQuizDataToUser=()=>{

  let reqBody = {
    "quizId": filteredCategoryOneMainQuiz[0]._id,
     "answer" : filteredCategoryOneMainQuiz[0].answerCharacter
   }
  
  //  console.log(reqBody)

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


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   alert(`You selected: ${selectedOption}`);
  // };
  
   
  const clickNextAction = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      
      if (newCount === 1) {
       
        setShowSecondChat(true);
      } else if (newCount === 2) {
        setShowSymbol(true);
        setTimeout(()=> setShowFirstChat(true) ,1100)
      }  else if (newCount === 3) {
        // setShowSecondChat(false);
        setShowSymbol(false);
        setShowQuestion(true);
        setShowFirstChat(false);
      } else if(newCount === 4){
        navigate('/game-six-mini-lesson')
  
      }
      
      return newCount;
    });
  };

  const goBackToTip=()=>{
    setCount(2)
    setShowQuestion(false);
    setShowSymbol(true);
    setTimeout(()=> setShowFirstChat(true) ,1100)
  }
  

  return (
    <div style={{padding:'10px', margin:'auto', marginTop:window.innerWidth < 380 ? '40px'  : window.innerWidth < 450 ? '40px'  : window.innerWidth < 960 ? '-10px' : '50px'}} className="flex flex-col gap-2 ">
       {showSuccessModal && <SuccessfulQuizModal showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} image1={raccoonImage} image2={successChatImage} navigateTo={"game-six-lesson"} />}
       {showGood && <GoodAnimation showGood={showGood} setShowGood={setShowGood} navigateTo={"game-seven"} text="Congratulations! you passed The USB Trap"/>}
      {/* progressbar */}
      <ProgressBarDetailsComponent />

      <div className="gameSixTitleContainer" >
        <h1 style={{fontWeight:700, fontSize: window.innerWidth < 960 ? '20px' : '28px'}} className=" text-[#004C85]">The USB Trap</h1>
        <p style={{fontWeight:600,fontSize: window.innerWidth < 960 ? '18px' : '20px' }} className=" text-[#004C85]">Interactive Conversation:</p>
      </div>

      <div style={{display:'flex', flexDirection: window.innerWidth < 960 ? 'column' : "row",  gap:'10px',marginLeft:'-20px', alignItems:"center", justifyContent:'center', marginTop:window.innerWidth < 400 ?  '30px'  : window.innerHeight < 650 ? '10px'  : window.innerWidth < 500 ? '-10px' :'-150px' }}>

      <div style={{width: window.innerHeight < 700 ? '430px' : window.innerWidth < 560 ? '120%' : window.innerWidth < 960 ? '100%' :'439px', height:window.innerHeight < 700 ? '120px' : window.innerWidth < 960 ? '110px' : '130px', backgroundColor:'#2E3346', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', marginBottom:window.innerWidth < 700 ? '-50px'  :'50px',  marginTop:window.innerWidth < 960 ? '30px' :'-60px'}}>
        <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"#00F8D2", width:'30px', height:'30px', left:'45%', top:'-15px', border:'1px solid white'}}></div>
      <p style={{fontSize: window.innerWidth < 960 ? '13px' : '15px'}} className="text-white">You find a USB drive labeled &ldquo;Confidential Payroll Data&ldquo; in the kingdom’s parking lot. A raccoon approaches:</p>
      </div>

   

      <div style={{paddingTop:'120px', marginLeft :'-10px', display:'flex', width:'100%', padding:'5px'}}>
        <div style={{position:'relative', marginTop: window.innerWidth < 960 ? "20px" : ""}}>
        <img style={{width:window.innerWidth < 960 ? '95%' : '300px', height:window.innerWidth < 960 ? '320px' : '360px', objectFit:'contain'}} src={humanImage} alt="Home" />
        {/* <img style={{width:window.innerWidth < 960 ? '120px' : '140px', height:window.innerWidth < 960 ? '120px' : '140px', objectFit:'contain', position:'absolute', top:'94px', left:'150px'}} src={blueChatBox2Image} alt="Home" /> */}
        </div>

      
      
      

       { showFirstChat && <div style={{left: window.innerWidth < 400 && '60px', bottom: window.innerWidth < 400 && '-40px' }} className="gameSixBlueChatContainer">
           <img src={blueChatImage} alt="Blue Chat Box" />
           <p className="gameSixBlueChatText">Ooh, shiny! But be careful—this could be a trap. What will you do?</p>
        </div>}

      </div>

      </div>

      

        {/* Owl Image start */}

       {showSymbol && <div>

          <div style={{left: window.innerWidth < 400 && '-40px', bottom: window.innerWidth < 400 && '-40px' }}  className="symbolSixImageContainer">
          <img style={{width:window.innerWidth < 960 ? '100px' : '110px', height:window.innerWidth < 960 ? '150px' :'160px', objectFit:'contain'}} src={raccoonImage} alt="Owl Image" />
          </div>

        </div>}

      

        {/* Owl Image ends */}


       {showSecondChat && <div style={{left: window.innerWidth < 400 && '40px', bottom: window.innerWidth < 400 && '200px' }} className="gameSixBlackChatContainer"> <div style={{width: window.innerWidth < 960 ? '200px' :'200px', height:window.innerWidth < 960 ? '80px' : '90px', backgroundColor:'#2E3346', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', }}>
        <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"red", width:'20px', height:'20px', left:'45%', top:'-10px', border:'1px solid white'}}></div>
      <p style={{fontSize: window.innerWidth < 960 ? '12px' : '15px'}} className="text-white">What’s your next step so the attackers won’t get access</p>
      </div>
      </div>}

       

        {/* Question column starts */}

        {showQuestion && <div style={{width: window.innerWidth < 560 ? '120%' : window.innerWidth < 960 ? '100%' :'380px', height:window.innerHeight < 650 ? '120px' : window.innerWidth < 960 ? 'max-content' : '140px', backgroundColor:'#2E3346', position:'absolute', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', left: window.innerWidth < 560 ? '-10%' : window.innerWidth < 600 ? '2%'  : window.innerWidth < 960 ?  '10%' :'20%', bottom: '10%',color:'white', fontSize:'15px'}}>
        <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"yellow", width:'30px', height:'30px', left:'45%', top:'-15px', border:'1px solid white'}}></div>


        <div>
      <h1>Question: <br />
      {filteredCategoryOneMainQuiz[0]?.question}</h1>
      <form 
      // onSubmit={handleSubmit}
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

        <div style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom: window.innerWidth < 380 ? '-50px'  : window.innerWidth < 600 ? '0px' : '0px', zIndex:'1000',gap:'80%'}} className="flex items-center justify-end">
    {count === 3 &&  <IoArrowBackCircleOutline onClick={goBackToTip} size={25} className="cursor-pointer"/>}
      <IoArrowForwardCircleOutline size={25} onClick={clickNextAction} className="cursor-pointer"/>

      </div>

     

    </div>
  )
}

export default GameSixComponent
