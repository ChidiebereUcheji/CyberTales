import { Link, useNavigate } from "react-router-dom"
import profile from '../assets/user-circle-gray.png'
import guest from '../assets/guest-user.png'
import welcomeImage from '../assets/Frame 28.png'
import mailImage from '../assets/mail-01.png'
import passImage from '../assets/square-lock-02.png'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import OtpInput from 'react-otp-input';


import './signup.css'
import { useState } from "react"
import Loader from "./Loader"

const SignupComponent = () => {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true)
    const [otp, setOtp] = useState('');
    const [showOTPModal, setShowOTPModal] = useState(false)
    const [fetchedOtp, setFetchedOtp] = useState(0);
    const [isValid, setIsValid] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

      // eslint-disable-next-line no-constant-binary-expression
   let API =  'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
   
 

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


    const signIN = async(e)=>{

        e.preventDefault()
      setIsLoading(true);
        console.log(name, username,password,email)

                const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          "name": name,
          "email": email,
          "password": password,
          "username": username
        });

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };

        fetch(`${API}/auth/register`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            setIsLoading(false);
            if(result.message === "Email created successfully"){

              setFetchedOtp(result.data.user.otp)
              setShowOTPModal(true);
              // console.log(result)
                // navigate('/home')
            } else if(result.message === "Email already exist"){
                setErrorMessages("Email Already Exist")
                return;
            }

            }
            )
          .catch((error) => {
            
            console.error(error)
        });



    }

    const verifyToken=async(otp)=>{
      setIsLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "otp": otp
      });

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch(`${API}/auth/verify-register/${email}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if(result.message === "Account successfully activated!"){
            setIsLoading(false);
              navigate('/home')

            // console.log(result);
          }
     
          }
          )
        .catch((error) => {
          
          console.error(error)
      });

    }



      const handleChangeOtp = (value) => {
    console.log(value);
    setOtp(value)
      // Ensure that the latest value is used
      if (value.length === 4) {
        console.log(value)
        if(Number(value) === fetchedOtp){
          verifyToken(Number(value))
        }else{
      // setShowOTPModal(false)
      console.log("Wrong OTP")
      return;
        }

      }
      return value;

  };


  return (
    <>
    {isLoading ? <Loader /> : null}
    <div className="signupComponentContainer">

   {window.innerWidth > 960 && <img style={{width:'80%', height:'40px', objectFit:'contain'}} src={welcomeImage} alt="Logo" />}

<form onSubmit={signIN}>

<div>
            <label className="text-gray-500" htmlFor="name">Name</label>
            <div style={{padding:'10px', width:window.innerWidth < 960 ? '300px' : '550px',  height:window.innerHeight < 650 ? '40px' : '40px'}} className="flex items-center gap-2 bg-white text-gray-600 outline-0">
            <img style={{width:'25px', height:'25px', objectFit:'contain'}} src={profile} alt="Profile" />
            <input style={{width:'100%'}} onFocus={()=>{setErrorMessages("")}} onChange={(e)=>setName(e.target.value)} className="outline-0" type="text" name="name" placeholder="Name" required/>

            </div>
       
        </div>

        <div>
            <label className="text-gray-500" htmlFor="username">Username</label>
            <div style={{padding:'10px', width:window.innerWidth < 960 ? '300px' : '550px', height:window.innerHeight < 650 ? '40px' : '40px'}} className="flex items-center gap-2 justify-center bg-white text-gray-600 outline-0">
            <img style={{width:'25px', height:'25px', objectFit:'contain'}} src={profile} alt="Profile" />
            <input onFocus={()=>{setErrorMessages("")}} onChange={(e)=>setUsername(e.target.value)} style={{width:'100%'}} className="outline-0" type="text" name="username" placeholder="Username" required/>
            </div>
           
        </div>

       

        <div>
            <label className="text-gray-500" htmlFor="email">Email</label>
            <div style={{padding:'10px', width:window.innerWidth < 960 ? '300px' : '550px',  height:window.innerHeight < 650 ? '40px' : '40px'}} className="flex items-center gap-2 bg-white text-gray-600 outline-0">
            <img style={{width:'25px', height:'25px', objectFit:'contain'}} src={mailImage} alt="Profile" />
            <input style={{width:'100%'}} onFocus={()=>{setErrorMessages("")}} onChange={(e)=>setEmail(e.target.value)} className="outline-0" type="email" name="email" placeholder="Email" required/>

            </div>
       
        </div>

        <div>
            <label className="text-gray-500" htmlFor="password">Password</label>
            <div style={{ height:window.innerHeight < 650 ? '40px' : '40px', padding:'10px', width:window.innerWidth < 960 ? '300px' : '550px', position:'relative', border:  isValid === true ? '2px solid green' : isValid === false ? '2px solid red': "0px solid white",}} className="flex items-center gap-2 bg-white text-gray-600 outline-0">
            <img style={{width:'25px', height:'25px', objectFit:'contain'}} src={passImage} alt="Profile" />
            <input style={{padding:'7px 2px',height: '100%',width:'85%', outline:'none'}} onFocus={()=>{setErrorMessages(""); setIsValid(false)}} onChange={handlePasswordChange} className="outline-0" type={isPasswordSecure ? "password" : 'name'} name="password" placeholder="Password" required/>

             {isPasswordSecure ? <FaRegEye
                        onClick={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
                                         style={{position:'absolute', right:10, bottom:7, zIndex:10,color:'lightgray',  fontSize:'20px', cursor:'pointer'}}/>  
                                           : <FaRegEyeSlash 
                                           onClick={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
                                         style={{position:'absolute', right:10, bottom:7, zIndex:10,color:'lightgray', fontSize:'20px', cursor:'pointer'}}/>
                         }
            </div>

          
       
        </div>

        {errorMessages && <div className="text-sm text-red-800 font-bold text-center">
                <p>{errorMessages}</p>
            </div>
            }

            {
            !isValid && password.length > 0 && (
              <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginLeft:'-30px'}}>
            <p style={{ color: 'red', fontSize:'12px' , width:'60%', margin:'auto', textAlign:'center' }}>Password must be at least 8 characters long, include a number, a special character, an uppercase and a lowercase letter.</p>
              </div>
         
         )}

            <div style={{margin:'auto', display:'grid', placeItems:'center'}}>

            <button  style={{width:'70%', padding:'10px', borderRadius:'5px', backgroundColor:"#004C85",color:'#FAFDFF', margin:'10px auto', cursor:'pointer'}}>
            Continue
           </button>

            </div>

      



</form>
  
       

        <Link style={{position:'fixed', right:'40px', bottom:'50px', marginTop:'30px' }} to='/login' className="flex gap-2 items-center justify-end">
        <p>Log in</p>
        <img style={{width:'20px', height:'20px', objectFit:'contain'}} src={guest} alt="Guest" />
    </Link>
    </div>


 {showOTPModal && <div className="modal">

<div style={{marginTop:200, paddingBottom:'100px'}} className='flex flex-col gap-3 my-11 bg-sky-100/50 mx-11 p-7 items-center backdrop-filter backdrop-blur-lg bg-opacity-30'>

    <div
    onClick={()=>setShowOTPModal(false)}
    style={{width:'30px', height:'30px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'100%', backgroundColor:'#004C85', color:'white', fontWeight:'bold', cursor:'pointer', marginTop:'20px'}} className="hover:bg-red-200" >X</div>

    <h2 style={{paddingTop:'100px'}} className='text-xl mb-7 text-center font-bold text-[#004C85]'>Enter Your provided Token</h2>
    <OtpInput
      containerStyle={{ margin: 20 }}
      inputStyle={{ width: 60, height: 60, borderRadius: 10, margin: 10, backgroundColor:'white' }}
      shouldAutoFocus
      value={otp}
      inputType="tel"
      onChange={handleChangeOtp}
      numInputs={4}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
     
    />

    </div>

</div> 
    }
   

    </>
  )
}

export default SignupComponent
