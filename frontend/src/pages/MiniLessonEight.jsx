import { useState } from "react";
import Navbar from "../components/Navbar"
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import './miniLessonOne.css'
import squirelImage from "../assets/game8police.png"
import blueChatImage from "../assets/chatBlueEmpty.png"
import { useNavigate } from "react-router-dom";
// import successChatImage from '../assets/successChatImage8.png';
// import SuccessfulQuizModal from "../components/SuccessfulQuizModal";
import { useSelector } from "react-redux";
import { selectQuizInfo } from "../slices/quizSlice";
import { selectUserInfo } from "../slices/authSlice";
import GoodAnimation from "../components/GoodAnimation";

// const miniLessonQuestionsArrayTwo = [
//   {
//     id: 1,
//     question: "What is the safest way to use MFA?",
//     optionA: "A. Set up multiple MFA methods",
//     optionB: "B. Use SMS only",
//     optionC: "C. Skip MFA because it’s inconvenient",
//     answerCharacter: 'A',
//     correctAnswer: "✅ Correct Answer: A) Set up multiple MFA methods"

//   },
//   {
//     id: 2,
//     question: "If you receive an unexpected MFA request, what should you do?",
//     optionA: "A. Approve it to avoid being locked out",
//     optionB: "B. Deny it and report it to IT",
//     optionC: "C. Ignore it and continue working",
//     answerCharacter: 'B',
//      correctAnswer: "✅ Correct Answer: B) Deny it and report it to IT"

//   },
// ]

const MiniLessonEight = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [showAnswer, setShowAnswer] = useState(false);
    const navigate = useNavigate();
    // const [showSuccess, setShowSuccess] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showGood, setShowGood] = useState(false);
    const [disableOptions, setDisableOptions] = useState(false);

    const quizes = useSelector(selectQuizInfo)

    const filteredCategoryEightQuizes = quizes.filter((data)=> data.category === 'categoryEight' && !data.isMainQuestion);

          const userInfo = useSelector(selectUserInfo)

          
                   // eslint-disable-next-line no-constant-binary-expression
  let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
          
              
                //  console.log(userInfo.user.id)
              
                const postQuizDataToUser=()=>{
              

                 let reqBody = {
                  "quizId": filteredCategoryEightQuizes[currentQuestionIndex]._id,
                   "answer" : filteredCategoryEightQuizes[currentQuestionIndex].answerCharacter 
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
                  "quizId": filteredCategoryEightQuizes[currentQuestionIndex]._id,
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
  
    setShowAnswer(false);
  
  
    // Find the correct answer for the current question (assuming `item.id` is unique)
    const currentQuestion = filteredCategoryEightQuizes.find(
      (q) => q.id === item.id
    );
  
    // Compare the selected answer with the correct answer
    if (event.target.value === currentQuestion.answerCharacter) {
      // Show success if the answer is correct
      // setShowSuccess(true);
      console.log('Correct answer!');
      postQuizDataToUser()
      setTimeout(() => getAnotherQuestion(), 500);
    } else {
      
      setShowAnswer(true);
      postWrongAnswerQuizDataToUser()
      setDisableOptions(true)
      console.log('Wrong answer!');
    }
     
    };



  function getAnotherQuestion () {
    setShowAnswer(false);
    setDisableOptions(false)
    setSelectedOption("");
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < filteredCategoryEightQuizes.length - 1) {
        return prevIndex + 1; // Go to the next question
      } else {
        setShowSuccessModal(true)
      }
    });
  };


  function getAnotherQuestionNavigation () {
    setShowAnswer(false);
   setDisableOptions(false)
    setSelectedOption("");
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < filteredCategoryEightQuizes.length - 1) {
        return prevIndex + 1; // Go to the next question
      } else {
        navigate('/game-nine'); 
      }
    });
  };


  return (
    <div className="miniLessonContainer">
         {/* {showSuccessModal && <SuccessfulQuizModal showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} image1={squirelImage} image2={successChatImage} navigateTo={"game-nine"} />} */}
         {showSuccessModal && <GoodAnimation showGood={showGood} setShowGood={setShowGood} navigateTo={"game-nine"} text="Congratulations! you passed The Multi-Factor Authentication (MFA) Gate" />}
    <Navbar />
      
     
    {/* { miniLessonQuestionsArrayTwo
    .filter(item=> item.id === 2)
          .map(item=>( */}

<div
//  key={item.id}
 className="miniLessonInnerContainer">

<div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop:window.innerWidth < 960 ? '40px' : window.innerHeight < 650 ? '-40px' : '10px', marginBottom:'10px'}}>
<h1 style={{fontWeight:700, fontSize: window.innerWidth < 960 ? '23px' : '30px'}} className=" text-[#004C85]">MFA Setup Tutorial</h1>
</div>

  <div>

    {/* bluechatbox starts */}

    <div className="blueChatContainer">
       <img src={blueChatImage} alt="Blue Chat Box" />
       <p className="blueChatText">  MFA Setup Tutorial <br />
       •	Players must set up MFA by choosing the most secure authentication method.
	 </p>
    </div>

    {/* bluechatbox ends */}

    {/* Owl Image start */}

    <div>

      <div style={{left: window.innerWidth < 600 ?  '10px'  :  ''}} className="symbolImage">
      <img style={{width:window.innerWidth < 960 ? '150px' : '134px', height:window.innerWidth < 960 ? '160px' :'180px', objectFit:'contain'}} src={squirelImage} alt="Owl Image" />
      </div>



    </div>

  

    {/* Owl Image ends */}


     {/* Question column starts */}
     <div className="miniLessonOneQuestionOuterContainer">
      
     <div className="miniLessonQuestionContainer">
    <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"yellow", width:'30px', height:'30px', left:'45%', top:'-15px', border:'1px solid white'}}></div>


    <div>
  <h1>Question
     {/* {filteredCategoryEightQuizes[currentQuestionIndex].id}: */}
    
     <br />
 {filteredCategoryEightQuizes[currentQuestionIndex]?.question}</h1>
  <form >
    <div>
      <label>
        <input
        style={{marginRight:'10px'}}
          type="radio"
          value="A"
          checked={selectedOption === "A"}
          onChange={(e) => handleOptionChange(e, filteredCategoryEightQuizes[currentQuestionIndex])}
          disabled={disableOptions}
        />
       {filteredCategoryEightQuizes[currentQuestionIndex]?.optionA}
      </label>
    </div>
    <div>
      <label>
        <input
        style={{marginRight:'10px'}}
          type="radio"
          value="B"
          checked={selectedOption === "B"}
          onChange={(e) => handleOptionChange(e, filteredCategoryEightQuizes[currentQuestionIndex])}
          disabled={disableOptions}
        />
       {filteredCategoryEightQuizes[currentQuestionIndex]?.optionB}
      </label>
    </div>
    <div>
      <label>
        <input
        style={{marginRight:'10px'}}
          type="radio"
          value="C"
          checked={selectedOption === "C"}
          onChange={(e) => handleOptionChange(e, filteredCategoryEightQuizes[currentQuestionIndex])}
          disabled={disableOptions}
        />
       {filteredCategoryEightQuizes[currentQuestionIndex]?.optionC}
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
   <p style={{fontSize:'13px',}}> {filteredCategoryEightQuizes[currentQuestionIndex]?.answer}</p>
  </div>
  </div>
  }
{/* answer ends */}

  <div style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom:window.innerWidth < 600 ? '-80px' : '0px', zIndex:'1000', gap:'80%'}} className="flex items-center justify-end">
  {/* <IoArrowBackCircleOutline size={33} onClick={() => setCurrentQuestionIndex(prev => prev === 0 ? filteredCategoryEightQuizes?.length - 1 : prev - 1)} className="cursor-pointer" /> */}
 {selectedOption &&  <IoArrowForwardCircleOutline size={33} onClick={getAnotherQuestionNavigation} className="cursor-pointer" />}
  </div>

  </div>

    {/* )) } */}
    </div>
  )
}

export default MiniLessonEight
