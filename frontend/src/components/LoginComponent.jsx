import { Link, useNavigate } from "react-router-dom"
import profile from '../assets/user-circle-gray.png'
import guest from '../assets/guest-user.png'
import welcomeImage from '../assets/Frame 27.png'
import passImage from '../assets/square-lock-02.png'
import './signup.css'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUserInfo, setUserInfo } from "../slices/authSlice"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import OtpInput from 'react-otp-input';
import Loader from "./Loader"


const LoginComponent = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // const [showGood, setShowGood] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const userInfo = useSelector(selectUserInfo)
    const [isPasswordSecure, setIsPasswordSecure] = useState(true)
    const [otp, setOtp] = useState('');
    const [showOTPModal, setShowOTPModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

      // eslint-disable-next-line no-constant-binary-expression
   let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
  //  let API =  'http://localhost:5050/api'
   
 

  const dispatch = useDispatch()

    const login =async(e)=>{
        e.preventDefault()
      setIsLoading(true);
        console.log(username, password)

        const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "username":username,
  "password": password
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`${API}/auth/login`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    setIsLoading(false);
    if(result.errors.length === 0){
        dispatch(setUserInfo(result.data))
        setShowOTPModal(true);
        // navigate('/home')
        // console.log(result)
    }
    else{
        console.error("Error logging in")
        setErrorMessage(result.errors[0].msg)
    }
   
})
  .catch((error) => {
    
    console.error(error)
    setErrorMessage("Error Message")
});

    }



  const handleChangeOtp = (value) => {
    console.log(value);
    setOtp(value)
    
    
      if (value.length === 4) {
       
       
        // setLoading(true)
        console.log(value)
        if(Number(value) === userInfo?.user?.otp){
          navigate('/home')
          console.log(value)
        }else{
          // setPopUp(`${t('LoginResponse3A')}`)
          // setShowPopupModal(true)
          // setLoading(false)
          return
        }
        // setLoading(false)

      }
      return value;

  };

  return (
    <>
    {isLoading ? <Loader /> : null}
   {/* {showGood && <GoodAnimation showGood={showGood} setShowGood={setShowGood} />} */}
  
    <div className="signupComponentContainer">

   {window.innerWidth > 960 && <img style={{width:'280px', height:'40px', objectFit:'contain'}} src={welcomeImage} alt="Logo" />}

            <form onSubmit={login}>

<div>
            <label className="text-gray-500" htmlFor="username">Username or Email</label>
            <div style={{padding:'10px', width:window.innerWidth < 960 ? '250px' : '450px'}} className="flex items-center gap-2 justify-center bg-white text-gray-600 outline-0">
            <img style={{width:'25px', height:'25px', objectFit:'contain'}} src={profile} alt="Profile" />
            <input onFocus={()=>{setErrorMessage("")}}  onChange={(e)=>setUsername(e.target.value)} style={{width:'100%'}} className="outline-0" type="text" name="username" placeholder="Username"/>
            </div>
           
        </div>

        <div>
            <label className="text-gray-500" htmlFor="password">Password</label>
            <div style={{padding:'10px', width:window.innerWidth < 960 ? '250px' : '450px', position:'relative'}} className="flex items-center gap-2 bg-white text-gray-600 outline-0">
            <img style={{width:'25px', height:'25px', objectFit:'contain'}} src={passImage} alt="Profile" />
            <input onFocus={()=>{setErrorMessage("")}} onChange={(e)=>setPassword(e.target.value)} className="outline-0 w-[85%]" type={isPasswordSecure ? "password" : 'name'} name="password" placeholder="Password"/>

            {isPasswordSecure ? <FaRegEye
            onClick={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
                             style={{position:'absolute', right:10, bottom:10, zIndex:10,color:'lightgray',  fontSize:'20px', cursor:'pointer'}}/>  
                               : <FaRegEyeSlash 
                               onClick={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
                             style={{position:'absolute', right:10, bottom:10, zIndex:10,color:'lightgray', fontSize:'20px', cursor:'pointer'}}/>
             }
            </div>
            
       
        </div>

        {errorMessage && <div className="text-sm text-red-800 font-bold text-center">
                <p>{errorMessage}</p>
            </div>}

        <button  style={{width:'60%', padding:'10px', borderRadius:'5px', backgroundColor:"#004C85",color:'#FAFDFF', cursor:'pointer', margin:'auto', display:'flex', alignItems:'center', justifyContent:'center', marginTop: '10px'}}>
            Log in
        </button>

        </form>
      

        <div style={{width: window.innerWidth < 960 ? '280px': ''}} className="flex flex-col items-center justify-center gap-1">
            <p style={{fontSize:window.innerWidth < 960 ? '12px' :'20px', fontWeight:400, textAlign:'center'}}>Forgotten your password?</p>
            <Link to='/forgot-password' style={{fontSize: window.innerWidth < 960 ? '12px' :'18px', fontWeight:700}}>Click Here</Link>
        </div>

        <Link style={{position:'fixed', right:'40px', bottom:'50px', marginTop:'30px' }} to='/sign-up' className="flex gap-2 items-center justify-end">
        <p>Sign up</p>
        <img style={{width:'20px', height:'20px', objectFit:'contain'}} src={guest} alt="Guest" />
    </Link>
    </div>


    {showOTPModal && <div className="modal">

<div style={{marginTop:200, paddingBottom:100}} className='flex flex-col gap-3 my-11 bg-sky-100/50 mx-11 p-7 items-center backdrop-filter backdrop-blur-lg bg-opacity-30'>

<div
    onClick={()=>setShowOTPModal(false)}
    style={{width:'30px', height:'30px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'100%', backgroundColor:'#004C85', color:'white', fontWeight:'bold', cursor:'pointer', marginTop:'20px'}} className="hover:bg-red-200" >X</div>

    <h2 style={{marginTop:50, }}  className='text-2xl mb-7 text-center font-bold text-white'>Enter Your provided Token</h2>
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

export default LoginComponent
