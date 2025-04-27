
import humanImage from "../assets/Frame.png"
import q1chatImage from "../assets/q1chat.png"
import owlImage from "../assets/Owl 1.png"
import blueChatImage from "../assets/chatBlue.png"
import blueChatImage2 from "../assets/chatBlue2.png"
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SuccessfulQuizModal from "./SuccessfulQuizModal";
import successChatImage from '../assets/successChatImage1.png';
import { useDispatch, useSelector } from "react-redux";
import { selectQuizInfo, setQuizInfo } from "../slices/quizSlice";
import GoodAnimation from "./GoodAnimation";
import { selectUserInfo } from "../slices/authSlice";
import ProgressBarDetailsComponent from "./ProgressBarDetailsComponent";
import Loader from "./Loader"


const GameComponent = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [showSymbol, setShowSymbol] = useState(false);
  const [showFirstChat, setShowFirstChat] = useState(false);
  const [showSecondChat, setShowSecondChat] = useState(false);
  const [showBlackChat, setShowBlackChat] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const quizes = useSelector(selectQuizInfo)

  const filteredCategoryOneMainQuiz = quizes.filter((data)=> data.category === 'categoryOne' && data.isMainQuestion);


   // eslint-disable-next-line no-constant-binary-expression
   let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
  //  let API =   'http://localhost:5050/api'
 
 
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showGood, setShowGood] = useState(false);

  const userInfo = useSelector(selectUserInfo);
 
  
  //  console.log(filteredCategoryOneMainQuiz[0].answerCharacter)

  const postQuizDataToUser=()=>{

    const myHeaders = new Headers();
    myHeaders.append("Authorization",`Bearer ${userInfo.token}`);
    myHeaders.append("Content-Type", "application/json");

      
  let reqBody = {
    "quizId": filteredCategoryOneMainQuiz[0]._id,
     "answer" : filteredCategoryOneMainQuiz[0].answerCharacter
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
                    // console.log("updated successfully", result)
                  }
                  console.log(result)})
                .catch((error) => console.error(error));

  }




  const postWrongAnswerQuizDataToUser=()=>{

    const myHeaders = new Headers();
    myHeaders.append("Authorization",`Bearer ${userInfo.token}`);
    myHeaders.append("Content-Type", "application/json");

      
  let reqBody = {
    "quizId": filteredCategoryOneMainQuiz[0]._id,
     "answer" : selectedOption || "D"
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
    setSelectedOption('');
  };

   


 
  const clickNextAction = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      
      if (newCount === 1) {
        setShowFirstChat(true);
      } else if (newCount === 2) {
        setShowBlackChat(true);
       
      } else if (newCount === 3) {
        setShowSymbol(true);
        setTimeout(()=> setShowSecondChat(true) ,1200)
      } else if(newCount === 4){
        setShowSecondChat(false);
        setShowBlackChat(false);
        setShowSymbol(false);
        // setShowFirstChat(false);
        setShowQuestion(true);

      }else if(newCount === 5){
        navigate('/game-one-mini-lesson')
      }
      
      return newCount;
    });
  };

  const goBackToTip=()=>{
      setCount(3)
      setShowQuestion(false);
      setShowSymbol(true);
      setTimeout(()=> setShowSecondChat(true) ,1100)
  }


      useEffect(()=>{

        const fetchQuestions=()=>{

          setIsLoading(true);

          const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          
          fetch(`${API}/quiz/getall`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
              setIsLoading(false)
              if(result.message === "All Quiz gotten successfully"){
                dispatch(setQuizInfo(result.quizes))
              }
            
              })
            .catch((error) => console.error(error));
        }

        fetchQuestions()

      }, [])


      useEffect(()=>{

        const updateUserOnPageLoad =async()=>{
  
                  setIsLoading(false);
                    const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${userInfo.token}`);
            
            const raw = JSON.stringify({
          
              "pointsScored": 0,
              "attemptedQuestions": 0,
            });
            
            const requestOptions = {
              method: "PUT",
              headers: myHeaders,
              body: raw,
              redirect: "follow"
            };
            
            fetch(`${API}/auth/update-me`, requestOptions)
              .then((response) => response.json())
              .then((result) => {
                setIsLoading(false);
               
              }) 
              .catch((error) => console.error('Network Error:' + error));
            
                }


      updateUserOnPageLoad();

      }, [])
    

      const pixelRatio = window.devicePixelRatio;
      console.log('pixelRatio', pixelRatio);
     

  return (
    <div style={{padding:'10px', margin:'auto', marginTop:window.innerWidth < 450 ? '-35px'  : window.innerWidth < 960 ? '10px' : '30px'}} className="flex flex-col gap-2 justify-center">
      {/* { isLoading ? <Loader /> : null } */}
     {showSuccessModal && <SuccessfulQuizModal showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} image1={owlImage} image2={successChatImage} navigateTo={"game-one-lesson"} />}
      {showGood && <GoodAnimation showGood={showGood} setShowGood={setShowGood} navigateTo={"game-two"} text="Congratulations! You passed the Phishing Swamp"/>}
      {/* progressbar */}
      <ProgressBarDetailsComponent />

      <div className="gameOneTitleContainer">
        <h1 style={{fontWeight:700, fontSize: window.innerWidth < 960 ? '20px' : '28px', lineHeight:'20px'}} className=" text-[#004C85]">The Phishing Swamp</h1>
        <p style={{fontWeight:600,fontSize: window.innerWidth < 960 ? '14px' : '20px' }} className=" text-[#004C85]">Interactive Conversation:</p>
      </div>

      <div className="gameOneImageContainer">

      <div style={{width:window.innerWidth < 450 ? '100%' : window.innerWidth < 960 ? '290px' :'290px', height:window.innerHeight < 680 ? '100px' : window.innerWidth < 960 ? '110px' : '120px', backgroundColor:'#2E3346', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', marginBottom:window.innerWidth < 950 ? '-10px' :'20px', marginLeft:window.innerWidth < 450 ? '0px': '', marginTop: window.innerHeight < 650 ? '-90px'  :  window.innerHeight < 650 ? '-50px' : ''}}>
        <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"#00F8D2", width: window.innerWidth < 960 ? '20px' :'30px', height:  window.innerWidth < 960 ? '20px' :'30px', left:'45%', top: window.innerWidth < 960 ? '-10px' :'-15px', border:'1px solid white'}}></div>
      <p style={{fontSize: window.innerWidth < 960 ? '13px' : '15px', lineHeight: '16px'}} className="text-white">You’re walking through the Phishing Swamp when you receive an email on your kingdom-issued device. A message pops up:</p>
      </div>

   

      <div style={{paddingTop:'60px', marginLeft :'-30px', marginBottom : '-20px', zIndex:12, marginTop: window.innerHeight < 680 ? '-20px' : window.innerWidth < 960 ? '-10px' : '' }}>
        <img style={{width:window.innerHeight < 650 ?  '280px'  : window.innerWidth < 960 ? '280px' : '310px', height:window.innerHeight < 650 ?  '280px'  : window.innerWidth < 960 ? '280px' : '310px', objectFit:'contain'}} src={humanImage} alt="Home" />
      </div>

      </div>

         {/* chatvector start */}

      { showFirstChat && <div className="gameOnechatContainer">

        <div className="gameOnechatVector">
          <img src={q1chatImage} alt="Q1 Image" />
        <p className="gameOnechatText">&quot;URGENT: Your payroll details need updating. Click [here] to avoid payment delays.&quot;</p>
        </div>


        </div>}

        {/* chatvector ends */}

        <div style={{display:'flex', flexDirection:'column', }}>

        {/* bluechatbox starts */}

       {showSecondChat && <div className="gameOneblueChatContainer">
           <img  src={window.innerWidth < 960 ? blueChatImage : blueChatImage2} alt="Blue Chat Box" />
        </div>}

     {/* bluechatbox ends */}



            {/* blackChat starts */}

       {showBlackChat && <div className="blackChatContainer">
        <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"red", width:'25px', height:'25px', left:'40%', top:'-13px', border:'1px solid white', zIndex: 100}}></div>
      <p style={{fontSize: window.innerWidth < 960 ? '13px' : '15px'}} className="text-white">The email looks official, but something feels off. </p>
      </div>}

        {/* blackChat Ends */}

    

        </div>

      

        {/* Owl Image start */}

      {/* { showSymbol ?  <div className="owlImageContainerGameOne">

          <div style={{ width:window.innerWidth < 960 ? '100px' : '100px', height:window.innerWidth < 960 ? '100px' : '100px'}}>
          <img style={{width:window.innerWidth < 960 ? '100px' : '100px', height:window.innerWidth < 960 ? '100px' :'100px', objectFit:'contain'}} src={owlImage} alt="Owl Image" />
          </div>

         
        </div> 
        :
        null
        } */}

    { showSymbol ?    <div className="imageOneSymbol">

        <img  style={{width:window.innerWidth < 960 ? '100px' : '100px', height:window.innerWidth < 960 ? '100px' :'100px', objectFit:'contain'}} src={owlImage} alt="Owl Image" />
        </div> : null }

      

        {/* Owl Image ends */}

       

       

       

        {/* Question column starts */}
       {showQuestion && <div style={{width:window.innerWidth < 400 ? '130%' :  window.innerWidth < 960 ? '100%' :'420px', height:window.innerWidth < 960 ? 'max-content' : '125px', backgroundColor:'#2E3346', position:'absolute', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', left: window.innerWidth < 400 ? '-13%' : window.innerWidth < 960 ?  '0%' : '20%', bottom:window.innerHeight < 650 ? '10%' : window.innerWidth < 400 ? '-2%'  : window.innerWidth < 960 ? '5%'  :'13%',color:'white', fontSize:'15px', zIndex:100}}>
        <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"yellow", width:'30px', height:'30px', left:'45%', top:'-15px', border:'1px solid white'}}></div>


        <div>
      <h1>Question: <br />
      {filteredCategoryOneMainQuiz[0]?.question}</h1>
      <form 
      // onSubmit={handleSubmit}
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

      <div style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom:window.innerWidth < 600 ? '-80px' : '0px', zIndex:'1000', gap:'80%'}} className="flex items-center justify-end">
     {count === 4 && <IoArrowBackCircleOutline onClick={goBackToTip} size={25} className="cursor-pointer" />}
      <IoArrowForwardCircleOutline  onClick={clickNextAction} size={25} className="cursor-pointer"/>

      </div>

     

    </div>
  )
}

export default GameComponent
