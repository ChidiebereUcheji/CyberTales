import { useEffect, useState } from 'react'
import styles from './login.module.css'
import { FaRegTimesCircle } from 'react-icons/fa'
import logo from '../assets/Logo.png'
import {  setUserInfo } from '../slices/authSlice';
import { useDispatch } from 'react-redux'
import Loader from './Loader'
import {  useNavigate } from 'react-router-dom'

const Login = () => {
  const [showModal, setShowModal] = useState(false)
  const [popUp, setPopUp] = useState('')
  const [showPopupModal, setShowPopupModal] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  // const [clearInput, setClearInput] = useState('')
  const dispatch = useDispatch()

   // eslint-disable-next-line no-constant-binary-expression
   let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
  //  let API =  'http://localhost:5050/api'

  const handleShowPasswordForm =(e)=>{
    e.preventDefault()
    if(email === ''){
      setPopUp('Enter a registered Email Address')
      setShowPopupModal(true)
      return
    } else {
      setShowModal(true)
    }
   
  }

  const handleLogin =async(e)=>{
    e.preventDefault()
    if(!email && !password){
      setPopUp('Enter The correct password')
      setShowPopupModal(true)
    } 

    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

setLoading(true)

fetch(`${API}/admin/login`, requestOptions)
  .then(response => response.json())
  .then(result => {
    if(result.user){
      dispatch(setUserInfo(result))
       navigate('/dashboard')
    
      setLoading(false)
       console.log(result)
    } else {
      setPopUp('Enter a registered Email and a valid Password Address')
      setShowPopupModal(true)
      const form = e.target;
      form.reset()
      setLoading(false)
    }
    // console.log(result)
  })
  .catch(error => console.log('error', error));
  }

  const handleClosePopup =()=>{
    setShowPopupModal(false)
     setPopUp('')
    }
  
    useEffect(() => {
   
      setTimeout(() => {
        setLoading(false);
      }, 3000); 
    }, []);


  return (
    <div style={{width:'100%', height:'100vh'}} className='flex items-center justify-center'>
       {loading ? <Loader /> : null}
    {/* popup */}
    { showPopupModal && 
   <div className={styles.popContainer}>
       
        <div className={styles.innerPopContainer}>
            < FaRegTimesCircle onClick={()=>setShowPopupModal(false)} className={styles.popClose} />
             <p className={styles.popText}>{popUp}</p>
            <button className={styles.popButton} onClick={handleClosePopup}>Ok</button>
        </div>
      
    
    </div>
        }
   {/* popup ends */}

      <div style={{width:'80%', height:'80%'}} className='flex gap-3 bg-[#004b8544] mx-11 p-5 items-center'>
        <div>
        <img
        src={logo}
         style={{width: 300, height:200, objectFit:'contain'}}
        alt='welcome image'
        />
        </div>
        <form style={{width:'300px'}} className='flex flex-col gap-3 '>
          <h1 className='text-4xl font-bold pb-6 pt-2 text-center'>Login</h1>
          <label className={styles.emailText} htmlFor="email">Enter Email_</label>
          <input
            onChange={(e)=>setEmail(e.target.value)}
           style={{backgroundColor:'white', height:'40px', width:'100%', outline:'none', paddingLeft:10}}
            type="email" name='email' />
        <button onClick={handleShowPasswordForm} className={styles.loginButton} type="submit">Next</button>
        {/* <Link to='/signup' className='text-sm'>Dont have an account? <strong className=''>Sign up</strong></Link> */}
        </form>
      </div>

   { showModal &&  <div className={styles.modal}>
     < FaRegTimesCircle onClick={()=>setShowModal(false)} className={styles.close} />
      <div style={{width:'80%', height:'80%'}}   className={styles.modalInnerContainer}>
        <div>
        <img
           src={logo}
           style={{width: 300, height:200, objectFit:'contain'}}
          alt='welcome image'
       
        />
        </div>
        <form onSubmit={handleLogin} style={{width:'300px'}} className='flex flex-col gap-3 '>
          <h1 className='text-4xl font-bold pb-6 pt-2 text-center'>Login</h1>
          <label className={styles.emailText} htmlFor="password">Enter Password_</label>
          <input 
          // onFocus={()=>setClearInput('')}
          onChange={(e)=>setPassword(e.target.value)}
           style={{backgroundColor:'white', height:'40px', width:'100%', outline:'none', paddingLeft:10}} 
          type="password" name='password' />
          <div style={{width:'100%'}}>
          <button className={styles.loginButton} type="submit">Login</button>
          </div>
       
        {/* <Link href='signup' className='text-sm'>Dont have an account? <strong className=''>Sign up</strong></Link> */}
        </form>
      </div>

      </div> }


    </div>
  )
}

export default Login
