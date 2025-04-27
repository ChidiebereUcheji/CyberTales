// import Navbar from "../components/Navbar"
import './home.css'
import forgotImage from '../assets/forgotImage.png'
import { IoArrowBackCircleOutline } from "react-icons/io5"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import Loader from "../components/Loader"
import passImage from '../assets/square-lock-02.png'

const EditPassword = () => {

         const [password, setPassword] = useState('');
         const [errorMessage, setErrorMessage] = useState('');
         const navigate = useNavigate();
         const [isPasswordSecure, setIsPasswordSecure] = useState(true)
         const [isLoading, setIsLoading] = useState(false);
         const [isValid, setIsValid] = useState(null);
         const location = useLocation();
         const { email } = location.state || {};

        console.log(email)
  
        // eslint-disable-next-line no-constant-binary-expression
     let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api';
    //  let API =  'http://localhost:5050/api';

      // Function to validate password strength
  const validatePasswordStrength = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };


 
    const handlePasswordChange = (e) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
  
     
      if (validatePasswordStrength(newPassword)) {
        setIsValid(true); 
      } else {
        setIsValid(false); 
      }
    };


    
     const submitPassword=async(e)=>{

      e.preventDefault();
      if(email){
        // console.log(email);

        setIsLoading(true);
                const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "password": password,
          });
 

        const requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };

        fetch(`${API}/auth/update-password/${email}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            setIsLoading(false);
            // console.log(result)
            if(result.message === "Password updated successfully"){

              // console.log(result)
              navigate('/login')
            } else{
                setErrorMessage("Error updating Password")
                return;
            }

          
            }
            )
          .catch((error) => {
            
            console.error(error)
        });



      }

      setIsLoading(false);
     }

  return (
    <div className="homeContainer">
       {isLoading ? <Loader /> : null}
        {/* <Navbar /> */}

        <div className="homeInnerContainer">


        <div className="flex flex-col items-center">

          <img style={{width:window.innerHeight < 650 ? '170px' : window.innerWidth < 960 ? '200px' :'250px', height:window.innerHeight < 650 ? '170px' : window.innerWidth < 960 ? '200px' :'250px', objectFit:'contain'}} src={forgotImage} alt="Forgot Image" />
          <h3 className="text-xl font-bold text-center">Update Password</h3>
          <p className="text-sm text-center">Please enter your New Password</p>

          <form >

              <div>
                        <label className="text-gray-500" htmlFor="password">Enter New Password</label>
                        <div style={{padding:'10px', width:window.innerWidth < 960 ? '300px' : '550px', position:'relative',border: isValid === true ? '2px solid green' : isValid === false ? '2px solid red': "0px solid white",}} className="flex items-center gap-2 bg-white text-gray-600 outline-0">
                        <img style={{width:'25px', height:'25px', objectFit:'contain'}} src={passImage} alt="Profile" />
                        <input style={{padding:'7px 2px',height: '100%',width:'85%', outline:'none' }} onFocus={()=>{setErrorMessage(""); setIsValid(false)}} onChange={handlePasswordChange} className="outline-0" type={isPasswordSecure ? "password" : 'name'} name="password" placeholder="Password" required/>
            
                         {isPasswordSecure ? <FaRegEye
                                    onClick={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
                                                     style={{position:'absolute', right:10, bottom:15, zIndex:10,color:'lightgray',  fontSize:'20px', cursor:'pointer'}}/>  
                                                       : <FaRegEyeSlash 
                                                       onClick={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
                                                     style={{position:'absolute', right:10, bottom:15, zIndex:10,color:'lightgray', fontSize:'20px', cursor:'pointer'}}/>
                                     }
                        </div>
            
                      
                   
                    </div>

            {errorMessage && <div className="text-sm text-red-800 font-bold text-center">
                <p>{errorMessage}</p>
            </div>
            }

            
            <input onClick={submitPassword} style={{margin:'20px auto', width:'60%', border:'1px solid gray', borderRadius:'10px', display:'flex', justifyContent:'center', alignItems:'center', padding:'10px', cursor:'pointer'}} type="button" name="Send" value="Send" />

          </form>

        </div>

        <div style={{display:'flex', alignSelf:'flex-start', justifyContent:'center', cursor:'pointer', position: 'fixed', left: '20%', bottom:'10%'}}>

        <IoArrowBackCircleOutline size={25}/>
        </div>



        </div>

    
    </div>
  )
}

export default EditPassword
