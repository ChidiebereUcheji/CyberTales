import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../slices/authSlice";
import { selectQuizInfo } from "../slices/quizSlice";
import ProgressBar from "@ramonak/react-progress-bar";
import './progressBar.css'


const ProgressBarDetailsComponent = () => {


       const [progressScore, setProgressScore] = useState(0);
       const [userQuizDetails, setUserQuizDetails] = useState({});
       const userInfo = useSelector(selectUserInfo)
       const quizes = useSelector(selectQuizInfo)
       const [pointsScoredUser, setPointsScoredUser] = useState(0);
       const [attemptedQuestionsUser, setAttemptedQuestionsUser] = useState(0);
      //  const [isLoading, setIsLoading] = useState(false);
     
     
     // eslint-disable-next-line no-constant-binary-expression
   let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
  //  let API =  'http://localhost:5050/api'
    
 
    
      //    useEffect(()=>{
    
      //      const fetchQuizItems =()=>{
    
      //       // setIsLoading(true)
      //  const myHeaders = new Headers();
      //  myHeaders.append("Authorization",`Bearer ${userInfo?.token}`);
      //  myHeaders.append("Content-Type", "application/json");
    
      //   const requestOptions = {
      //              method: "GET",
      //              headers: myHeaders,
      //              redirect: "follow"
      //            };
                 
      //            fetch(`${API}/quiz/get-quiz-item/${userInfo.user?.id}`, requestOptions)
      //              .then((response) => response.json())
      //              .then((result) => {
      //               console.log(result)
      //               setIsLoading(false);
      //                if(result.message === "All Quiz gotten successfully"){
      //                  console.log(result.quizItems.items)
    
      //                  // last item in the collection
      //                  const lastItem = Object.values(result.quizItems.items).pop(); // Get the last item
    
      //                  console.log(lastItem)
      //                  const lastItemDetails = {
      //                    pointsScored: lastItem?.pointsScored,
      //                    questionsAttempted: lastItem?.questionsAttempted,
      //                    questionsLength: lastItem.questions?.length
      //                  };
    
      //                  setUserQuizDetails(lastItemDetails)
                     
      //                  // getting average score for the progress bar
      //                  const averageScore = quizes.length > 0 
      //                  ? Math.floor((parseInt(lastItemDetails.pointsScored) / parseInt(quizes.length)) * 100)
      //                  : 0;
    
      //                  // console.log(userQuizDetails)
      //                  // console.log(parseInt(quizes.length))
      //                  console.log(averageScore)
      //                  setProgressScore(averageScore)   
                      
      //                }else{
      //                  console.log("Error fetching quizes")
      //                }
                    
      //              })
      //              .catch((error) => console.error(error));
    
      //      }
    
      //      fetchQuizItems();
    
      //    }, [])

      useEffect(() => {
        const fetchQuizItems = () => {
          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${userInfo?.token}`);
          myHeaders.append("Content-Type", "application/json");
      
          const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          };
      
          fetch(`${API}/quiz/get-quiz-item/${userInfo.user?.id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
              // setIsLoading(false);
              // console.log(result);
              if (result.message === "All Quiz gotten successfully") {


                const lastKey = Object.keys(result.quizItems.items).shift(); // Get the last key of the object
                const lastItem = result.quizItems.items[lastKey];


                // console.log(lastItem); 

                const lastItemDetails = {
                  pointsScored: lastItem?.pointsScored,
                  questionsAttempted: lastItem?.questionsAttempted,
                  questionsLength: lastItem.questions?.length,
                };
                setUserQuizDetails(lastItemDetails);

              } 
            })
            .catch((error) => console.error(error));
        };
      
        fetchQuizItems();
      }, [userInfo?.token, progressScore]); 



  useEffect(()=>{
    const fetchUser = async()=>{
      // setIsLoading(true);
          const myHeaders = new Headers();
            myHeaders.append("Authorization",`Bearer ${userInfo.token}`);

            const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
            };

            fetch(`${API}/auth/get-me`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
              // setIsLoading(false);
                // setFetchedUser(result.data.user)
                
               
                // console.log(result.data.user)
                setPointsScoredUser(result.data.user.pointsScored)
                setAttemptedQuestionsUser(result.data.user.attemptedQuestions)

                if (quizes?.length > 0) {
                  const averageScore = Math.floor(
                    (parseInt(result.data.user.pointsScored) / parseInt(quizes.length)) * 100
                  );
                  setProgressScore(averageScore);
                } else {
                  setProgressScore(0);
                }

              })
           
            .catch((error) => console.error(error));

    }

    fetchUser()
},[])


  return (
    <div className="progressBarContainer"  >
    <p className="text-[#004C85] text-[12px]">Scores</p>
    <ProgressBar isLabelVisible={false}  width="140px" bgColor='#004C85' height="8px" completed={progressScore || 0} />
    <p className="text-[#004C85] text-[12px]">{pointsScoredUser || 0}/{quizes?.length}</p>
  </div>
  )
}

export default ProgressBarDetailsComponent
