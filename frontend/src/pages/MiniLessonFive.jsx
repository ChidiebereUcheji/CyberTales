import { useState } from "react";
import Navbar from "../components/Navbar"
import {  IoArrowForwardCircleOutline } from "react-icons/io5";
import './miniLessonOne.css'
import squirelImage from "../assets/soldierGame5.png"
import blueChatImage from "../assets/chatBlueEmpty.png"
import { useNavigate } from "react-router-dom";
// import successChatImage from '../assets/successChatImage1.png';
// import SuccessfulQuizModal from "../components/SuccessfulQuizModal";
import { useSelector } from "react-redux";
import { selectQuizInfo } from "../slices/quizSlice";
import { selectUserInfo } from "../slices/authSlice";
import GoodAnimation from "../components/GoodAnimation";

 
// const miniLessonQuestionsArrayTwo = [
//   {
//     id: 1,
//     question: "What’s the first step if ransomware appears?",
//     optionA: "A. Pay the ransom",
//     optionB: "B. Disconnect & alert IT",
//     optionC: "C. Restart your computer",
//     answerCharacter: 'B',
//     correctAnswer: "✅ Correct Answer: B) Disconnect & alert IT"

//   }, 
  // { 
  //   id: 2,
  //   question: "Why are public Wi-Fi networks risky?",
  //   optionA: "A. They are slower than private networks",
  //   optionB: "B. Hackers can intercept unencrypted data",
  //   optionC: "C. They require a password to connect",
  //    correctAnswer: "✅ Correct Answer: B) Hackers can intercept unencrypted data"

  // },
// ]

const MiniLessonFive = () => {

    const [selectedOption, setSelectedOption] = useState("");
    const [showAnswer, setShowAnswer] = useState(false);
    const navigate = useNavigate();
    // const [showSuccess, setShowSuccess] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showGood, setShowGood] = useState(false);
    const [disableOptions, setDisableOptions] = useState(false);

    const quizes = useSelector(selectQuizInfo)

    const filteredCategoryFiveQuizes = quizes.filter((data)=> data.category === 'categoryFive' && !data.isMainQuestion);

                  // eslint-disable-next-line no-constant-binary-expression
  let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
    
              const userInfo = useSelector(selectUserInfo)
        
            
             
              //  console.log(userInfo.user.id)
            
              const postQuizDataToUser=()=>{
            
                let reqBody = {
                  "quizId": filteredCategoryFiveQuizes[currentQuestionIndex]._id,
                   "answer" : filteredCategoryFiveQuizes[currentQuestionIndex].answerCharacter 
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
            
                            
                                // dispatch(setQuizInfo(result.quizes))
                              }else{
                                console.log("Error fetching quizes")
                              }
                              // update on redux with dispatch
                              console.log(result)})
                            .catch((error) => console.error(error));
            
              }



          const postWrongAnswerQuizDataToUser=()=>{

            const myHeaders = new Headers();
            myHeaders.append("Authorization",`Bearer ${userInfo.token}`);
            myHeaders.append("Content-Type", "application/json");
        
              
          let reqBody = {
            "quizId": filteredCategoryFiveQuizes[currentQuestionIndex]._id,
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
    
  

    const handleOptionChange = (event, item) => {
      setSelectedOption(event.target.value);
  
       // Reset the answer states before checking
    setShowAnswer(false);
    // setShowSuccess(false);
  
    const currentQuestion = filteredCategoryFiveQuizes.find(
      (q) => q._id === item._id
    );
  

    if (event.target.value === currentQuestion.answerCharacter) {
    
      postQuizDataToUser()
      console.log('Correct answer!');
      setTimeout(() => getAnotherQuestion(), 500);
    } else {
      // Show answer feedback if the answer is incorrect
      setShowAnswer(true);
      postWrongAnswerQuizDataToUser();
      setDisableOptions(true);
      console.log('Wrong answer!');
    }
     
    };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`You selected: ${selectedOption}`);
  };


  function getAnotherQuestion (){
    setShowAnswer(false);
    setDisableOptions(false);
    setSelectedOption("");
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < filteredCategoryFiveQuizes.length - 1) {
        return prevIndex + 1; // Go to the next question
      } else {
  
        setShowSuccessModal(true)
      }
    });
  };

  function getAnotherQuestionNavigation (){
    setShowAnswer(false);
    setDisableOptions(false);
    setSelectedOption("");
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < filteredCategoryFiveQuizes.length - 1) {
        return prevIndex + 1; // Go to the next question
      } else {
        navigate('/game-six'); 
     
      }
    });
  };

 

  return (
    <div className="miniLessonContainer">
       {/* {showSuccessModal && <SuccessfulQuizModal showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} image1={squirelImage} image2={successChatImage} navigateTo={"game-six"} />} */}
       {showSuccessModal && <GoodAnimation showGood={showGood} setShowGood={setShowGood} navigateTo={"game-six"} text="Congratulations! you passed The Ransomware Castle"/>}
    <Navbar />
      
     
    {/* { miniLessonQuestionsArrayTwo
    .filter(item=> item.id === 1)
          .map(item=>( */}

<div  className="miniLessonInnerContainer">

<div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:window.innerWidth < 960 ? '40px' : window.innerHeight < 650 ? '-40px' : '10px', marginBottom:'10px'}}>
<h1 style={{fontWeight:700, fontSize: window.innerWidth < 960 ? '20px' : '28px'}} className=" text-[#004C85]">Ransomware Response Drill</h1>
</div>

  <div>

    {/* bluechatbox starts */}

    <div className="blueChatContainer">
       <img src={blueChatImage} alt="Blue Chat Box" />
       <p className="blueChatText">  Ransomware Response Drill <br />
       •	Follow the correct steps to stop a ransomware attack.
	 </p>
    </div>

    {/* bluechatbox ends */}

    {/* Owl Image start */}

    <div>

      <div style={{left: window.innerWidth < 600 ?  '10px'  :  ''}} className="symbolImage">
      <img style={{width:window.innerWidth < 960 ? '150px' : '144px', height:window.innerWidth < 960 ? '130px' :'200px', objectFit:'contain'}} src={squirelImage} alt="Owl Image" />
      </div>



    </div>

  

    {/* Owl Image ends */}


     {/* Question column starts */}
     <div className="miniLessonOneQuestionOuterContainer">
     <div className="miniLessonQuestionContainer">
    <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"yellow", width:'30px', height:'30px', left:'45%', top:'-15px', border:'1px solid white'}}></div>


    <div>
  <h1>Question
     {/* {filteredCategoryFiveQuizes[currentQuestionIndex].id}: */}
     <br />
 {filteredCategoryFiveQuizes[currentQuestionIndex]?.question}</h1>
  <form onSubmit={handleSubmit}>
    <div>
      <label>
        <input
        style={{marginRight:'10px'}}
          type="radio"
          value="A"
          checked={selectedOption === "A"}
          onChange={(e) => handleOptionChange(e, filteredCategoryFiveQuizes[currentQuestionIndex])}
          disabled={disableOptions}
        />
       {filteredCategoryFiveQuizes[currentQuestionIndex]?.optionA}
      </label>
    </div>
    <div>
      <label>
        <input
        style={{marginRight:'10px'}}
          type="radio"
          value="B"
          checked={selectedOption === "B"}
          onChange={(e) => handleOptionChange(e, filteredCategoryFiveQuizes[currentQuestionIndex])}
          disabled={disableOptions}
        />
       {filteredCategoryFiveQuizes[currentQuestionIndex]?.optionB}
      </label>
    </div>
    <div>
      <label>
        <input
        style={{marginRight:'10px'}}
          type="radio"
          value="C"
          checked={selectedOption === "C"}
          onChange={(e) => handleOptionChange(e, filteredCategoryFiveQuizes[currentQuestionIndex])}
          disabled={disableOptions}
        />
       {filteredCategoryFiveQuizes[currentQuestionIndex]?.optionC}
      </label>
    </div>
   
  </form>
</div>

    </div>
    </div>
    {/* Question column ends */}

  </div>

{/* answer starts */}
 {showAnswer &&
 <div className="miniLessonOneOuterAnswrContainer">
 <div className="miniLessonAnswerContainer">
   <div style={{width:'30px', height:'30px', position:'absolute', top:'-15px', left:'45%', borderRadius:'100%', border:'1px solid white', backgroundColor:'#20F9D7'}}></div>
   
   <h3 style={{fontSize:'15px', fontWeight:'bold'}}>Wrong Answer</h3>
   <p style={{fontSize:'13px',}}> {filteredCategoryFiveQuizes[currentQuestionIndex]?.answer}</p>
  </div>
  </div>
  }
{/* answer ends */}

  <div style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom:window.innerWidth < 600 ? '-80px' : '0px', zIndex:'1000', gap:'80%'}} className="flex items-center justify-end">
  {/* <IoArrowBackCircleOutline size={33} onClick={() => setCurrentQuestionIndex(prev => prev === 0 ? filteredCategoryFiveQuizes.length - 1 : prev - 1)} className="cursor-pointer" /> */}
 {selectedOption &&  <IoArrowForwardCircleOutline size={33} onClick={getAnotherQuestionNavigation} className="cursor-pointer" />}
  </div>

  </div>

    {/* // )) } */}
    </div>
  )
}

export default MiniLessonFive
