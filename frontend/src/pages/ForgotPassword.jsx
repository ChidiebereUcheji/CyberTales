// import Navbar from "../components/Navbar"
import './home.css'
import forgotImage from '../assets/forgotImage.png'
import mailImage from '../assets/mail-01.png'
import { IoArrowBackCircleOutline } from "react-icons/io5"
import OtpInput from 'react-otp-input';

import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Loader from "../components/Loader"

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
      const navigate = useNavigate();
      const [otp, setOtp] = useState('');
      const [showOTPModal, setShowOTPModal] = useState(false)
      const [isLoading, setIsLoading] = useState(false);
      const [fetchedOtp, setFetchedOtp] = useState(0);
  
        // eslint-disable-next-line no-constant-binary-expression
   let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
    //  let API =  'http://localhost:5050/api'
   

    
     const submitEmail=(e)=>{

      e.preventDefault();
      if(email){
        // console.log(email);

        setIsLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };

        fetch(`${API}/auth/forgot-password/${email}`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            setIsLoading(false);
            // console.log(result.user.otp)
            if(result.message === "Update Password Initiated"){

              setFetchedOtp(result.user.otp)
              setShowOTPModal(true);
              // console.log(result)
            } else {
              setIsLoading(false);
                setErrorMessage("Email Does not Exist")
                return;
            }
     
       
            }
            )
          .catch((error) => {
            setErrorMessage("Error checking email")
            console.error(error)
        });

      }

      setIsLoading(false);
     }

  const handleChangeOtp = (value) => {
    // console.log(value);
    setOtp(value)
    
      if (value.length === 4) {
         
        // setLoading(true)
        // console.log(value)
        if(Number(value) === fetchedOtp){
          navigate('/edit-password', { state: { email } });
          console.log(value)
        }else{
          setErrorMessage("Token does not match")
          setIsLoading(false)
          return
        }

      }
      return value;

  };

  return (
    <div className="homeContainer">
       {isLoading ? <Loader /> : null}
        {/* <Navbar /> */}

        <div className="homeInnerContainer">


        <div className="flex flex-col items-center">

          <img style={{width:window.innerHeight < 650 ? '170px' : window.innerWidth < 960 ? '200px' :'250px', height:window.innerHeight < 650 ? '170px' : window.innerWidth < 960 ? '200px' :'250px', objectFit:'contain'}} src={forgotImage} alt="Forgot Image" />
          <h3 className="text-xl font-bold text-center">Forgot account or Password</h3>
          <p className="text-sm text-center">Please enter the email associated with your account</p>

          <form >
            <label className="text-gray-500"  htmlFor="email">Email</label>
            <div style={{padding:'10px', width:window.innerWidth < 960 ? '300px' : '450px'}} className="flex items-center gap-2 bg-white text-gray-600 outline-0 border-1 border-gray-300 rounded-sm">
            <img style={{width:'25px', height:'25px', objectFit:'contain'}} src={mailImage} alt="Profile" />
            <input onFocus={()=>setErrorMessage("")} onChange={(e)=>setEmail(e.target.value)} className="w-full h-full outline-0" type="email" name="email" placeholder="Email" required/>
            </div>

            {errorMessage && <div className="text-sm text-red-800 font-bold text-center">
                <p>{errorMessage}</p>
            </div>
            }

            
            <input onClick={submitEmail} style={{margin:'20px auto', width:'60%', border:'1px solid gray', borderRadius:'10px', display:'flex', justifyContent:'center', alignItems:'center', padding:'10px', cursor:'pointer'}} type="button" name="Send" value="Send" />

          </form>

        </div>

        <div onClick={()=>  navigate(-1)}  style={{display:'flex', alignSelf:'flex-start', justifyContent:'center', cursor:'pointer', position: 'fixed', left: '20%', bottom:'10%'}}>

        <IoArrowBackCircleOutline size={25}/>
        </div>



        </div>



         {showOTPModal && <div className="modal">
        
        <div style={{marginTop:200, paddingBottom:100}} className='flex flex-col gap-3 my-11 bg-sky-100/50 mx-11 p-7 items-center backdrop-filter backdrop-blur-lg bg-opacity-30'>
        
        <div
            onClick={()=>setShowOTPModal(false)}
            style={{width:'30px', height:'30px', display:'flex', alignItems:'center', justifyContent:'center', borderRadius:'100%', backgroundColor:'#004C85', color:'white', fontWeight:'bold', cursor:'pointer', marginTop:'20px'}} className="hover:bg-red-200" >X</div>
        
            <h2 style={{marginTop:50, }}  className='text-2xl mb-7 text-center font-bold text-white'>Enter Your provided Token</h2>
            {/* {errorMessage && <div className="text-sm text-red-800 font-bold text-center">
                <p>{errorMessage}</p>
            </div>
            } */}
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
    
    </div>
  )
}

export default ForgotPassword
