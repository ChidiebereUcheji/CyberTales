import { useSelector } from "react-redux";
import { selectUserInfo } from "../slices/authSlice";

const usePostQuiz = ({quizId, answer}) => {

                   const userInfo = useSelector(selectUserInfo)
          
                 let reqBody = {
                //   "quizId": filteredCategoryEightQuizes[currentQuestionIndex]._id,
                //    "answer" : filteredCategoryEightQuizes[currentQuestionIndex].answerCharacter 
                   "quizId": quizId,
                   "answer" : answer 
                 }
              
                 console.log(reqBody)
                 console.log(userInfo.user.id)
              
              
                  const myHeaders = new Headers();
                  myHeaders.append("Authorization",`Bearer ${userInfo.token}`);
                  myHeaders.append("Content-Type", "application/json");
              
                   const requestOptions = {
                              method: "PUT",
                              headers: myHeaders,
                              body: JSON.stringify(reqBody),
                              redirect: "follow"
                            };
                            
                            fetch(`http://localhost:5050/api/quiz/submit-answer/${userInfo.user.id}`, requestOptions)
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

export default usePostQuiz
