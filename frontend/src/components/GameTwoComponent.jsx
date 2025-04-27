import humanImage from "../assets/GameTwoImage.png"
import squirelImage from "../assets/gameTwoSquirel.png"
import blueChatImage from "../assets/chatBlueEmpty.png"
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessfulQuizModal from "./SuccessfulQuizModal";
import successChatImage from '../assets/successChatImage2.png';
import GoodAnimation from "./GoodAnimation";
import ProgressBarDetailsComponent from "./ProgressBarDetailsComponent";
import { selectQuizInfo } from "../slices/quizSlice";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../slices/authSlice";


const GameTwoComponent = () => {
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

    // const [isLoading, setIsLoading] = useState(false);

    const quizes = useSelector(selectQuizInfo)
 
    const filteredCategoryOneMainQuiz = quizes.filter((data)=> data.category === 'categoryTwo' && data.isMainQuestion);
   
 const userInfo = useSelector(selectUserInfo);
  // eslint-disable-next-line no-constant-binary-expression
   let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
  //  let API =   'http://localhost:5050/api'
   
 
  //  console.log(filteredCategoryOneMainQuiz)
  
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
                    console.log("updated successfully", result)
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
    // selectedOption("");
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
        // setShowBlackChat(false);
        setShowSymbol(false);
        setShowQuestion(true);

      }else if(newCount === 4){
        navigate('/game-two-mini-lesson')
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

// return pointsScored and attemptedQuestions to 0

  return (
    <div style={{padding:'10px', margin:'auto', marginTop:window.innerWidth < 450 ? '-80px'  : window.innerWidth < 960 ? '-100px' : '30px'}} className="flex flex-col gap-2 ">
        {showSuccessModal && <SuccessfulQuizModal showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} image1={squirelImage} image2={successChatImage} navigateTo={"game-two-lesson"} />}
        {showGood && <GoodAnimation showGood={showGood} setShowGood={setShowGood} navigateTo={"game-three"} text="Congratulations! you passed The Password Forest"/>}
      {/* progressbar */}
      <ProgressBarDetailsComponent />

      <div className="gameTwoTitleContainer" >
        <h1 style={{fontWeight:700, fontSize: window.innerWidth < 960 ? '20px' : '28px', width:'120%',  marginLeft: window.innerWidth < 600 ? '-20px'  : ''}} className=" text-[#004C85]">The Password Forest</h1>
        <p style={{fontWeight:600,fontSize: window.innerWidth < 960 ? '18px' : '20px', width:'120%',  marginLeft: window.innerWidth < 600 ? '-20px'  : '' }} className=" text-[#004C85]">Interactive Conversation:</p>
      </div> 

      <div className="gameTwoImageContainer"> 

      <div style={{width:window.innerWidth < 450 ? '140%' : window.innerWidth < 960 ? '100%' :'290px', height:window.innerHeight < 650 ? '100px'  : window.innerWidth < 960 ? 'max-content' : '130px', backgroundColor:'#2E3346', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', marginBottom:window.innerWidth < 960 ? '20px' : '80px', marginLeft:'10px'}}>
        <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"#00F8D2", width:'30px', height:'30px', left:'45%', top:'-15px', border:'1px solid white'}}></div>
      <p style={{fontSize: window.innerWidth < 960 ? '14px' : '16px', lineHeight: '16px'}} className="text-white">You enter the Password Forest, where the trees are made of weak and strong passwords. A squirrel scurries up to you:</p>
      </div>

   

      <div style={{paddingTop:window.innerWidth < 960 ? '0px' : '60px', marginLeft :'-10px',  marginTop: window.innerWidth < 960 ? '-20px' : '' }}>
        <img style={{width:window.innerHeight < 650 ?  '230px'  :  window.innerWidth < 960 ? '280px' : '310px', height:window.innerHeight < 650 ?  '230px'  :  window.innerWidth < 960 ? '280px' : '350px', objectFit:'contain'}} src={humanImage} alt="Home" />

       {showFirstChat && <div className="gameTwoBlueChatContainer">
           <img src={blueChatImage} alt="Blue Chat Box" />
           <p className="gameTwoBlueChatText">&quot;Quick! MalBot is trying to crack our kingdom’s passwords. Help me choose the strongest one!&quot;</p>
        </div> }

      </div>

      </div>

      

        {/* blackChat starts */}

      {showSecondChat &&  <div className="blackTwoChatContainer">
        <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"red", width:'20px', height:'20px', left:'40%', top:'-10px', border:'1px solid white'}}></div>
      <p style={{fontSize: window.innerWidth < 960 ? '10px' : '11px'}} className="text-white">The squirrel shows you three options: <br/>
      1.Password123 <br />
      2.P@ssw0rd! <br />
      3.Il0v3MyD0g! </p>
      </div>}

        {/* blackChat Ends */}

        {/* Owl Image start */}

    {showSymbol &&    <div>

          <div className="gameTwoSymbolImage">
          <img style={{width:window.innerWidth < 960 ? '90px' : '100px', height:window.innerWidth < 960 ? '90px' :'100px', objectFit:'contain'}} src={squirelImage} alt="Owl Image" />
          </div>



        </div>}

      

        {/* Owl Image ends */}

       

        {/* Question column starts */}

       {showQuestion && <div style={{width:window.innerWidth < 415 ?  '120%'  : window.innerWidth < 960 ? '100%' :'400px', height:window.innerHeight < 680 ? '120px'  : window.innerWidth < 960 ? 'max-content' : '130px', backgroundColor:'#2E3346', position:'absolute', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', left:window.innerWidth < 415 ?  '-10%'  : window.innerWidth < 960 ? '0%' : '18%', bottom:window.innerWidth < 400 ?  '2%'  : window.innerHeight < 650 ? '9%' : window.innerWidth < 960 ? '10%'  :'11%',color:'white', fontSize:'15px'}}>
        <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"yellow", width:'30px', height:'30px', left:'45%', top:'-15px', border:'1px solid white'}}></div>


        <div>
      <h1>Question: <br />
      {filteredCategoryOneMainQuiz[0]?.question}</h1>
      <form
      //  onSubmit={handleSubmit}
      >
        <div>
          <label>
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
          <label>
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
          <label>
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

      <div style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom:window.innerWidth < 415 ? '-50px'  : window.innerWidth < 600 ? '-50px' : '0px', zIndex:'1000',gap:'80%'}} className="flex items-center justify-end">
     {count === 3 && <IoArrowBackCircleOutline onClick={goBackToTip} size={25} className="cursor-pointer"/>}
      <IoArrowForwardCircleOutline size={25} onClick={clickNextAction} className="cursor-pointer"/>

      </div>

     

    </div>
  )
}

export default GameTwoComponent
