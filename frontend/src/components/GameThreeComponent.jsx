import { IoArrowForwardCircleOutline } from "react-icons/io5"
import squirelImage from "../assets/donkeyImage.png"
import blueChatImage from "../assets/chatBlueEmpty.png"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import {  useState } from "react";
import humanImage from "../assets/gameThreeImage.png"
import { useNavigate } from "react-router-dom";
import SuccessfulQuizModal from "./SuccessfulQuizModal";
import successChatImage from '../assets/successChatImage3.png';
import GoodAnimation from "./GoodAnimation";
import ProgressBarDetailsComponent from "./ProgressBarDetailsComponent";
import { useSelector } from "react-redux";
import { selectQuizInfo } from "../slices/quizSlice";
import { selectUserInfo } from "../slices/authSlice";
 
const GameThreeComponent = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [showSymbol, setShowSymbol] = useState(false);
    // const [showFirstChat, setShowFirstChat] = useState(false);
    const [showSecondChat, setShowSecondChat] = useState(false);
    // const [showBlackChat, setShowBlackChat] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [count, setCount] = useState(0);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showGood, setShowGood] = useState(false);
    const navigate = useNavigate();

   

    const quizes = useSelector(selectQuizInfo)

    const filteredCategoryOneMainQuiz = quizes.filter((data)=> data.category === 'categoryThree' && data.isMainQuestion);
   
 const userInfo = useSelector(selectUserInfo);

  // eslint-disable-next-line no-constant-binary-expression
   let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
  //  let API =  'http://localhost:5050/api'
   
  

  
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
        setShowSymbol(true);
        setTimeout(()=> setShowSecondChat(true) ,1100)
      } else if (newCount === 2) {
        setShowSecondChat(false);
        setShowSymbol(false);
        setShowQuestion(true);
      } else if(newCount === 3){
        navigate('/game-three-mini-lesson')

      }
      
      return newCount;
    });
  };

  const goBackToTip=()=>{
    setCount(1)
    setShowQuestion(false);
    setShowSymbol(true);
    setTimeout(()=> setShowSecondChat(true) ,1100)
}
  
  return (
    <div style={{padding:'10px', margin:'auto', marginTop:window.innerWidth < 450 ? '-30px'  : window.innerWidth < 960 ? '-50px' : '30px', height:'100%'}}  className="flex flex-col gap-2 ">
              {showSuccessModal && <SuccessfulQuizModal showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} image1={squirelImage} image2={successChatImage} navigateTo={"game-three-lesson"} />}
              {showGood && <GoodAnimation showGood={showGood} setShowGood={setShowGood} navigateTo={"game-four"} text="Congratulations! you passed The Public Wi-Fi Desert"/>}
      {/* progressbar */}
      <ProgressBarDetailsComponent />

      <div className="gameThreeTitleContainer" >
        <h1 style={{fontWeight:700, fontSize: window.innerWidth < 960 ? '20px' : '28px'}} className=" text-[#004C85]">The Public Wi-Fi Desert</h1>
        <p style={{fontWeight:600,fontSize: window.innerWidth < 960 ? '18px' : '20px' }} className=" text-[#004C85]">Interactive Conversation:</p>
      </div>

      <div className="gameThreeImageContainer">

      <div style={{width: window.innerWidth < 460 ? '120%' : window.innerWidth < 960 ? '100%' :'439px', height:window.innerHeight < 650 ?  '100px'  : window.innerWidth < 960 ? 'fit-content' : '140px', backgroundColor:'#2E3346', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', marginBottom:'10px'}}>
        <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"#00F8D2", width:'30px', height:'30px', left:'45%', top:'-15px', border:'1px solid white'}}></div>
      <p style={{fontSize: window.innerWidth < 960 ? '15px' : '18px', lineHeight:'20px'}} className="text-white">You’re crossing the scorching Public Wi-Fi Desert when your device detects an open Wi-Fi network called &quot;Free Kingdom Wi-Fi.&quot; A camel approaches:</p>
      </div>

   

      <div style={{paddingTop:'60px', marginLeft :'-10px'}}>
        <img style={{width:window.innerHeight < 650 ?  '210px'  : window.innerWidth < 960 ? '250px' : '320px', height:window.innerHeight < 650 ?  '210px'  : window.innerWidth < 960 ? '250px' : '320px', objectFit:'contain', marginTop:'-50px'}} src={humanImage} alt="Home" />

       {showSecondChat && <div className="gameThreeBlueChatContainer">
           <img src={blueChatImage} alt="Blue Chat Box" />
           <p className="gameThreeBlueChatText">&quot;Careful, traveler! Public Wi-Fi can be treacherous. What will you do?&quot;</p>
        </div>}

      </div>

      </div>

      

        {/* Owl Image start */}

       {showSymbol && <div>

          <div className="symbolThreeImageContainer">
          <img style={{width:window.innerWidth < 960 ? '150px' : '200px', height:window.innerWidth < 960 ? '150px' :'200px', objectFit:'containe'}} src={squirelImage} alt="Owl Image" />
          </div>



        </div>}

      

        {/* Owl Image ends */}

       

        {/* Question column starts */}

      {showQuestion &&  <div style={{width: window.innerWidth < 460 ? '120%' : window.innerWidth < 960 ? '100%' :'400px', height:window.innerHeight < 680 ? '120px'  : window.innerWidth < 960 ? 'max-content' : '135px', backgroundColor:'#2E3346', position:'absolute', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', left:window.innerWidth < 460 ? '-10%' : window.innerWidth < 960 ?  '6%' :'16%',  bottom:window.innerHeight < 680 ?  '9%'  : window.innerWidth < 960 ? '5%'  :'11%',color:'white', fontSize:'15px'}}>
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

        <div style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom:window.innerWidth < 400 ? '-50px' : window.innerWidth < 600 ? '-5%' : '0px', zIndex:'1000',gap:'80%'}} className="flex items-center justify-end">
     {count === 2 && <IoArrowBackCircleOutline onClick={goBackToTip} size={25} className="cursor-pointer"/>}
      <IoArrowForwardCircleOutline size={25} onClick={clickNextAction} className="cursor-pointer"/>

      </div>

     

    </div>
  )
}

export default GameThreeComponent
