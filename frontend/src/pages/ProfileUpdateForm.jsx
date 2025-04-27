import  { useState } from 'react'
import './profileUpdateForm.css'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../slices/authSlice';
import profile from '../assets/user-circle-gray.png'
// import guest from '../assets/guest-user.png'
// import welcomeImage from '../assets/Frame 27.png'
import passImage from '../assets/square-lock-02.png'
import GoodAnimation from '../components/GoodAnimation';
import Loader from '../components/Loader';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

const ProfileUpdateForm = () => {
    const [nName, setnName] = useState('');
    const [department, setDepartment] = useState('');
    const [about, setAbout] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState("")
    const [showGood, setShowGood] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
 
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const userInfo = useSelector(selectUserInfo)

 

      // eslint-disable-next-line no-constant-binary-expression
   let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
   
 


    const onUpdate =async(e)=>{
        e.preventDefault();

      setIsLoading(true);
        const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${userInfo.token}`);

const raw = JSON.stringify({
//   "username": "Johncluu",
  "name": nName,
  "department": department,
  "about": about,
  "phoneNumber": phoneNumber,
//   "leaderBoard": 1,
//   "points": 52,
  "experience": yearsOfExperience
});

const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`${API}/auth/update-me`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    setIsLoading(false);
    if(result.message === "User updated successfully"){
            setShowGood(true);
    setTimeout(()=>{
        navigate("/profile")
    }, 1000)
    // console.log(result)
    }
})

  .catch((error) => console.error(error));

    }


  return (
    <div className='profileUpdateContainer'>
        {isLoading ? <Loader /> : null}
          {showGood && <GoodAnimation showGood={showGood} setShowGood={setShowGood} />}
        <Navbar />

        <div className='profileUpdateFormContainer'>

        <form onSubmit={onUpdate}>

<div>
            <label className="text-gray-500" htmlFor="name">Name</label>
            <div style={{padding:'10px', width:window.innerWidth < 960 ? '250px' : '450px'}} className="flex items-center gap-2 justify-center bg-white text-gray-600 outline-0">
            <img style={{width:'25px', height:'25px', objectFit:'contain'}} src={profile} alt="Profile" />
            <input onFocus={()=>{setErrorMessage("")}}  onChange={(e)=>setnName(e.target.value)} style={{width:'100%'}} className="outline-0" type="text" name="name" placeholder="Name" required/>
            </div>
           
        </div>

        <div>
            <label className="text-gray-500" htmlFor="department">Department</label>
            <div style={{padding:'10px', width:window.innerWidth < 960 ? '250px' : '450px'}} className="flex items-center gap-2 bg-white text-gray-600 outline-0">
            <img style={{width:'25px', height:'25px', objectFit:'contain'}} src={passImage} alt="Profile" />
            <input onFocus={()=>{setErrorMessage("")}} onChange={(e)=>setDepartment(e.target.value)} className="outline-0" type="text" name="department" placeholder="Department" required/>

            </div>
       
        </div>

        <div>
            <label className="text-gray-500" htmlFor="about">About</label>
            <div style={{padding:'10px', width:window.innerWidth < 960 ? '250px' : '450px'}} className="flex items-center gap-2 bg-white text-gray-600 outline-0">
            <img style={{width:'25px', height:'25px', objectFit:'contain'}} src={passImage} alt="Profile" />
            <input onFocus={()=>{setErrorMessage("")}} onChange={(e)=>setAbout(e.target.value)} className="outline-0" type="text" name="about" placeholder="About" required/>

            </div>
       
        </div>
        <div>
            <label className="text-gray-500" htmlFor="phoneNumber">Phone Number</label>
            <div style={{padding:'10px', width:window.innerWidth < 960 ? '250px' : '450px'}} className="flex items-center gap-2 bg-white text-gray-600 outline-0">
            <img style={{width:'25px', height:'25px', objectFit:'contain'}} src={passImage} alt="Profile" />
            <input onFocus={()=>{setErrorMessage("")}} onChange={(e)=>setPhoneNumber(e.target.value)} className="outline-0" type="text" name="phoneNumber" placeholder="phone Number" required/>

            </div>
       
        </div>

        <div>
            <label className="text-gray-500" htmlFor="yearsOfExperience">Years of experience</label>
            <div style={{padding:'10px', width:window.innerWidth < 960 ? '250px' : '450px'}} className="flex items-center gap-2 bg-white text-gray-600 outline-0">
            <img style={{width:'25px', height:'25px', objectFit:'contain'}} src={passImage} alt="Profile" />
            <input onFocus={()=>{setErrorMessage("")}} onChange={(e)=>setYearsOfExperience(e.target.value)} className="outline-0" type="text" name="yearsOfExperience" placeholder="Years Of Experience" required/>

            </div>
       
        </div>


        {/* {errorMessage && <div className="text-sm text-red-800 font-bold text-center">
                <p>{errorMessage}</p>
            </div>} */}

        <button  style={{width:'60%', padding:'20px', borderRadius:'5px', backgroundColor:"#004C85",color:'#FAFDFF', cursor:'pointer', margin:'10px auto', display:'flex', alignItems:'center', justifyContent:'center'}}>
            Update
        </button>

        </form>
            
        </div>


         <div onClick={()=>navigate(-1)} style={{margin:'30px', position:'fixed', bottom:'50px', left:'50px'}}>
                <IoArrowBackCircleOutline size={25}/>
                </div>
      
    </div>
  )
}

export default ProfileUpdateForm
