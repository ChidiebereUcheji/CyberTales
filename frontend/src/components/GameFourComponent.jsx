import { IoArrowForwardCircleOutline } from "react-icons/io5"
import foxImage from "../assets/game4Fox.png"
import blueChatImage from "../assets/chatBlueEmpty.png"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useState } from "react";
import humanImage from "../assets/game4Image1.png"
import humanImage2 from "../assets/game4Image2.png"
import chatleft from "../assets/game4chatLeft.png"
import chatRight from "../assets/game4chatRight.png"
import { useNavigate } from "react-router-dom";
import successChatImage from '../assets/successChatImage4.png';
import SuccessfulQuizModal from "./SuccessfulQuizModal";
import GoodAnimation from "./GoodAnimation";
import ProgressBarDetailsComponent from "./ProgressBarDetailsComponent";
import { useSelector } from "react-redux";
import { selectQuizInfo } from "../slices/quizSlice";
import { selectUserInfo } from "../slices/authSlice";

const GameFourComponent = () => {

    const [selectedOption, setSelectedOption] = useState("");
    const [showSymbol, setShowSymbol] = useState(false);
    const [showFirstChat, setShowFirstChat] = useState(false);
    const [showSecondChat, setShowSecondChat] = useState(false);
    const [showBlackChat, setShowBlackChat] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showGood, setShowGood] = useState(false);


      // eslint-disable-next-line no-constant-binary-expression
   let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'

    
    const quizes = useSelector(selectQuizInfo)

    const filteredCategoryOneMainQuiz = quizes.filter((data)=> data.category === 'categoryFour' && data.isMainQuestion);
   
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
        setShowSecondChat(true);
      } else if (newCount === 3) {
      
        setShowSymbol(true);
        setTimeout(()=> setShowBlackChat(true) ,1100)
      } else if(newCount === 4){
        // setShowSecondChat(false);
        setShowBlackChat(false);
        setShowSymbol(false);
        // setShowFirstChat(false);
        setShowQuestion(true);

      }else if(newCount === 5){
        navigate('/game-four-mini-lesson')
      }
      
      return newCount;
    });
  };

  const goBackToTip=()=>{
    setCount(3)
    setShowQuestion(false);
    setShowSymbol(true);
    setTimeout(()=> setShowBlackChat(true) ,1100)
}
 
  return (
   <div style={{padding:'10px', margin:'auto', marginTop:window.innerWidth < 370 ? '-15px'  : window.innerWidth < 380 ? '20px'  : window.innerWidth < 450 ? '20px'  : window.innerWidth < 960 ? '-100px' : '30px'}} className="flex flex-col gap-2 ">
       {showSuccessModal && <SuccessfulQuizModal showSuccessModal={showSuccessModal} setShowSuccessModal={setShowSuccessModal} image1={foxImage} image2={successChatImage} navigateTo={"game-four-lesson"} />}
       {showGood && <GoodAnimation showGood={showGood} setShowGood={setShowGood} navigateTo={"game-five"} text="Congratulations! you passed The Social Engineering Maze"/>}
      {/* progressbar */}
      <ProgressBarDetailsComponent />

      <div style={{marginLeft:window.innerWidth < 400 ? '-60px' :'',}} className="gameFourTitleContainer">
        <h1 style={{fontWeight:700, fontSize: window.innerWidth < 960 ? '20px' : '26px', width:'120%',  marginLeft: window.innerWidth < 600 ? '-20px'  : ''}} className=" text-[#004C85]">The Social Engineering Maze</h1>
        <p style={{fontWeight:600,fontSize: window.innerWidth < 960 ? '18px' : '20px', width:'120%',  marginLeft: window.innerWidth < 600 ? '-20px'  : '' }} className=" text-[#004C85]">Interactive Conversation:</p>
      </div>

      <div style={{display:'flex', flexDirection: window.innerWidth < 960 ? 'column' : "row", marginBottom: window.innerWidth < 960 ? '-50px': '-100px', gap:'10px',alignItems:window.innerWidth < 960 ? 'center' :'flex-end', marginTop:window.innerWidth < 400 ? '30px'  : window.innerHeight < 700 ? '60px' : window.innerWidth < 460 ? '-20px' : window.innerWidth < 960 ? '0px'  :'-40px' }}>

      <div style={{width: window.innerHeight < 650 ? '500px'  : window.innerWidth < 460 ? '120%' : window.innerWidth < 960 ? '80%' :'429px', height:window.innerHeight <750 ? '100px' : window.innerWidth < 960 ? '100px' : '140px', backgroundColor:'#2E3346', position:'relative', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', marginBottom:'100px', marginTop: window.innerHeight < 650 ? '-20px' :  ''}}>
        <div style={{position:'absolute', borderRadius:'100%',backgroundColor:"#00F8D2", width:'30px', height:'30px', left:'45%', top:'-15px', border:'1px solid white'}}></div>
      <p style={{fontSize: window.innerWidth < 960 ? '13px' : '16px', lineHeight:'20px'}} className="text-white">You’re lost in the Social Engineering Maze when your kingdom-issued phone rings. The caller says</p>
      </div>

   

      <div style={{paddingTop:'120px', marginLeft :'-10px', display:'flex', width:'100%', padding:'5px', marginTop: window.innerWidth < 380 ? '-80px' :  window.innerWidth < 460 ? '-50px' : window.innerWidth < 960 ? '-20px' : '-90px', alignItems:'center', justifyContent:'center'}}>
        <div style={{position:'relative'}}>
        <img style={{width:window.innerHeight < 700 ? '160px' : window.innerWidth < 960 ? '220px' : '230px', height:window.innerHeight < 700 ? '160px' : window.innerWidth < 960 ? '220px' : '230px', objectFit:'contain'}} src={humanImage} alt="Home" />
   {showFirstChat &&     <img style={{width: window.innerHeight < 700 ? '125px' : window.innerWidth < 960 ? '140px' : '140px', height:window.innerHeight < 700 ? '125px' : window.innerWidth < 960 ? '140px' : '140px', objectFit:'contain', position:'absolute', top: window.innerWidth < 460 ? '-60px' : window.innerWidth < 960 ?  '-100px'  :'-80px', left:window.innerWidth < 960 ? '0px'  :'50px'}} src={chatRight} alt="Home" />}
        </div>

        <div style={{position:'relative'}}>

        <img style={{width:window.innerHeight < 700 ? '160px' : window.innerWidth < 960 ? '240px' : '240px', height:window.innerHeight < 700 ? '160px' : window.innerWidth < 960 ? '200px' : '230px', objectFit:'contain'}} src={humanImage2} alt="Home" />
       {showSecondChat && <img style={{width:window.innerHeight < 700 ? '130px' : window.innerWidth < 960 ? '140px' : '140px', height:window.innerHeight < 700 ? '130px' : window.innerWidth < 960 ? '140px' : '140px', objectFit:'contain', position:'absolute', top: window.innerWidth < 460 ? '-60px' : window.innerWidth < 960 ?  '-100px'  :'-80px', left:window.innerWidth < 960 ? '0px'  : '50px'}} src={chatleft} alt="Home" />}
      
        </div>
      
      

        {showBlackChat && <div className="gameFourBlueChatContainer">
           <img src={blueChatImage} alt="Blue Chat Box" />
           <p className="gameFourBlueChatText">&quot;Hmm, this sounds suspicious. What will you do?&quot;</p>
        </div>}

      </div>

      </div>

      

        {/* Owl Image start */}

    { showSymbol &&    <div>

          <div className="symbolFourImageContainer">
          <img style={{width:window.innerWidth < 960 ? '110px' : '140px', height:window.innerWidth < 960 ? '110px' :'140px', objectFit:'containe'}} src={foxImage} alt="Owl Image" />
          </div>



        </div>
}
      

        {/* Owl Image ends */}

       

        {/* Question column starts */}

        {showQuestion && <div style={{width: window.innerHeight < 650 ? '450px'  :  window.innerWidth < 460 ? '120%' : window.innerWidth < 960 ? '100%' :'400px', height:window.innerWidth < 960 ? 'max-content' : '130px', backgroundColor:'#2E3346', position:'absolute', display:'flex', alignItems:'center', justifyContent:'center', padding:'10px', left: window.innerWidth < 460 ? '-10%' : window.innerWidth < 960 ? '8%' : '22%', bottom:window.innerWidth < 400 ? '5%' : window.innerHeight <750 ? '9%' : window.innerWidth < 960 ? '10%'  :'11%',color:'white', fontSize:'15px',}}>
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

    
        <div style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom:window.innerWidth < 400  ?  '-50px'  : window.innerWidth < 600 ? '10px' : '0px', zIndex:'1000', gap:'80%'}} className="flex items-center justify-end">
     {count === 4 && <IoArrowBackCircleOutline onClick={goBackToTip} size={25} className="cursor-pointer"/>}
      <IoArrowForwardCircleOutline size={25} onClick={clickNextAction} className="cursor-pointer"/>

      </div>
     

    </div>
  )
}

export default GameFourComponent
