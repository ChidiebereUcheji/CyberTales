import { useEffect, useState } from "react";
import Navbar from "../components/Navbar"
import {  IoArrowForwardCircleOutline } from "react-icons/io5";
import './miniLessonTwo.css'
import squirelImage from "../assets/gameTwoSquirel.png"
import blueChatImage from "../assets/chatBlueEmpty.png"
import { useNavigate } from "react-router-dom";
// import SuccessfulQuizModal from "../components/SuccessfulQuizModal";
// import successChatImage from '../assets/successChatImage1.png';
import { useSelector } from "react-redux";
import { selectQuizInfo } from "../slices/quizSlice";
import { selectUserInfo } from "../slices/authSlice";
import GoodAnimation from "../components/GoodAnimation";

// const miniLessonQuestionsArrayTwo = [
//   {
//     id: 1,
//     question: "Which is the strongest password?",
//     optionA: "A. P@ssw0rd!",
//     optionB: "B. Tr33H0us3!99",
//     optionC: "C. MyName2022",
//     answerCharacter: 'B',
//     correctAnswer: "✅ Correct Answer: B) Tr33H0us3!99"

//   },
//   {
//     id: 2,
//     question: "Why should you never reuse passwords?",
//     optionA: "A. It makes logging in easier",
//     optionB: "B. If one gets leaked, all accounts are at risk",
//     optionC: "C. IT recommends it for security",
//     answerCharacter: 'B',
//      correctAnswer: "✅ Correct Answer: B) If one gets leaked, all accounts are at risk"

//   },
// ]

const MiniLessonTwo = () => {
    const [selectedOption, setSelectedOption] = useState("");

    const [showAnswer, setShowAnswer] = useState(false);
    const navigate = useNavigate();
    // const [showSuccess, setShowSuccess] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showGood, setShowGood] = useState(false);
    const [disableOptions, setDisableOptions] = useState(false);

    const userInfo = useSelector(selectUserInfo)

    const quizes = useSelector(selectQuizInfo)

    const filteredCategoryTwoQuizes = quizes.filter((data)=> data.category === 'categoryTwo' && !data.isMainQuestion);

      // eslint-disable-next-line no-constant-binary-expression
  let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
  // let API =  'http://localhost:5050/api'

 
  //  console.log(userInfo.user.id)

      useEffect(()=>{

        const fetchQuizItems =()=>{


    const myHeaders = new Headers();
    myHeaders.append("Authorization",`Bearer ${userInfo.token}`);
    myHeaders.append("Content-Type", "application/json");

     const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
              };
              
              fetch(`${API}/quiz/get-quiz-item/${userInfo?.user?.id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                  if(result.message === "All Quiz gotten successfully"){
                    console.log(result)
                  }
                })
                .catch((error) => console.error(error));

        }

        fetchQuizItems();

      }, [])

  const postQuizDataToUser=()=>{

    let reqBody = {
      "quizId": filteredCategoryTwoQuizes[currentQuestionIndex]?._id,
       "answer" : filteredCategoryTwoQuizes[currentQuestionIndex]?.answerCharacter 
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
    "quizId": filteredCategoryTwoQuizes[currentQuestionIndex]._id,
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
  
  


    const handleOptionChange = (event, item) => {
      setSelectedOption(event.target.value);
  
       // Reset the answer states before checking
    setShowAnswer(false);
    // setShowSuccess(false);
  
    // Find the correct answer for the current question (assuming `item.id` is unique)
    const currentQuestion = filteredCategoryTwoQuizes.find(
      (q) => q._id === item._id
    );
  
    // Compare the selected answer with the correct answer
    if (event.target.value === currentQuestion.answerCharacter) {

      postQuizDataToUser();

      // Show success if the answer is correct
      // setShowSuccess(true);
      console.log('Correct answer!');
      
      setTimeout(() => getAnotherQuestion(), 500);
    } else {

       // Show answer feedback if the answer is incorrect
       setShowAnswer(true);
       setDisableOptions(true); 

      postWrongAnswerQuizDataToUser();
     
      console.log('Wrong answer!');
    }
     
    };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`You selected: ${selectedOption}`);
  };

  function getAnotherQuestion() {
    setShowAnswer(false);
    setDisableOptions(false);
    setSelectedOption("");
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < filteredCategoryTwoQuizes.length - 1) {
        return prevIndex + 1; // Go to the next question
      } else {
        setShowSuccessModal(true);
      
        // return prevIndex;
      }
    });
  };

  function getAnotherQuestionNavigation() {
    setShowAnswer(false);
    setDisableOptions(false); 
    setSelectedOption("");

    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < filteredCategoryTwoQuizes.length - 1) {
        return prevIndex + 1; // Go to the next question
      } else {
        setShowSuccessModal(true);
        navigate('/game-three'); 
        // return prevIndex;
      }
    });
  };

 

 
  return (
    <div className="miniLessonContainer">
         {/* {showSuccessModal && <SuccessfulQuizModal showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} image1={squirelImage} image2={successChatImage} navigateTo={"game-three"} />} */}
         {showSuccessModal && <GoodAnimation showGood={showGood} setShowGood={setShowGood} navigateTo={"game-three"} text="Congratulations! you passed The Password Forest"/>}
    <Navbar />
      
     
    {/* { miniLessonQuestionsArrayTwo
    .filter(item=> item.id === 1)
          .map(item=>( */}

<div  className="miniLessonInnerContainer">

<div style={{display:'flex', flexDirection:'column', alignItems:'center', marginTop: window.innerWidth < 960 ? '40px' : window.innerHeight < 650 ? '-40px' : '10px', marginBottom:'10px'}}>
<h1 style={{fontWeight:700, fontSize: window.innerWidth < 960 ? '20px' : '28px'}} className=" text-[#004C85]">Password Strength Test</h1>
</div>

  <div>

    {/* bluechatbox starts */}

    <div className="blueChatTwoContainer">
       <img src={blueChatImage} alt="Blue Chat Box" />
       <p className="blueChatTwoText"> Password Strength Test <br />
	•	Drag weak passwords to the trash. <br />
	 </p>
    </div>

    {/* bluechatbox ends */}

    {/* Owl Image start */}

    <div>

      <div style={{left: window.innerWidth < 600 ?  '10px'  :  ''}} className="symbolImage">
      <img style={{width:window.innerHeight < 650 ? '120px' : window.innerWidth < 960 ? '100px' : '144px', height:window.innerHeight < 650 ? '120px' : window.innerWidth < 960 ? '100px' :'147px', objectFit:'containe'}} src={squirelImage} alt="Owl Image" />
      </div>



    </div>

  

    {/* Owl Image ends */}


     {/* Question column starts */}
     <div className="miniLessonQuestionOuterContainer">
     <div className="miniLessonTwoQuestionContainer">
    <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"yellow", width:'30px', height:'30px', left:'45%', top:'-15px', border:'1px solid white'}}></div>


    <div>
    {/* Question {filteredCategoryTwoQuizes[currentQuestionIndex].id}: */}
     <br />
    {filteredCategoryTwoQuizes[currentQuestionIndex]?.question}
  <form onSubmit={handleSubmit}>
    <div>
      <label>
        <input
        style={{marginRight:'10px'}}
          type="radio"
          value="A"
          checked={selectedOption === "A"}
          onChange={(e) => handleOptionChange(e, filteredCategoryTwoQuizes[currentQuestionIndex])}
          disabled={disableOptions}
        />
             {filteredCategoryTwoQuizes[currentQuestionIndex]?.optionA}
      </label>
    </div>
    <div>
      <label>
        <input
        style={{marginRight:'10px'}}
          type="radio"
          value="B"
          checked={selectedOption === "B"}
          onChange={(e) => handleOptionChange(e, filteredCategoryTwoQuizes[currentQuestionIndex])}
          disabled={disableOptions}
        />
       {filteredCategoryTwoQuizes[currentQuestionIndex]?.optionB}
      </label>
    </div>
    <div>
      <label>
        <input
        style={{marginRight:'10px'}}
          type="radio"
          value="C"
          checked={selectedOption === "C"}
          onChange={(e) => handleOptionChange(e, filteredCategoryTwoQuizes[currentQuestionIndex])}
          disabled={disableOptions}
        />
       {filteredCategoryTwoQuizes[currentQuestionIndex]?.optionC}
      </label>
    </div>
   
  </form>
</div>

    </div>
     </div>
   
    {/* Question column ends */}

  </div>

{/* answer starts */}
 {showAnswer && <div className="miniLessonOuterAnswrContainer">
  <div className="miniLessonTwoAnswerContainer">
   <div style={{width:'30px', height:'30px', position:'absolute', top:'-15px', left:'45%', borderRadius:'100%', border:'1px solid white', backgroundColor:'#20F9D7'}}></div>
   
   <h3 style={{fontSize:'15px', fontWeight:'bold'}}>Wrong Answer</h3>
   <p style={{fontSize:'13px',}}> {filteredCategoryTwoQuizes[currentQuestionIndex]?.answer}</p>
  </div>
  </div>
  }
{/* answer ends */}

  <div style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom:window.innerWidth < 600 ? '-80px' : '0px', zIndex:'1000', gap:'80%'}} className="flex items-center justify-end">
  {/* <IoArrowBackCircleOutline size={33} onClick={() => setCurrentQuestionIndex(prev => prev === 0 ? filteredCategoryTwoQuizes.length - 1 : prev - 1)} /> */}
 {selectedOption &&  <IoArrowForwardCircleOutline size={33} onClick={getAnotherQuestionNavigation} />}
  </div>

  </div>

    {/* // )) } */}
    </div>
  )
}

export default MiniLessonTwo
