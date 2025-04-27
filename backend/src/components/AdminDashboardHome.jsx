import {useEffect, useState} from 'react'
import styles from './adminDashboardHome.module.css'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { FaUsers } from 'react-icons/fa'
import { BsBarChartSteps } from 'react-icons/bs'
import { BsCurrencyDollar } from 'react-icons/bs'
import { BiBarChart } from 'react-icons/bi'
import { PiArrowElbowRightBold } from 'react-icons/pi'
import { selectFetchedUsers } from '../slices/userSlice';
import { useSelector } from 'react-redux'
import Loader from './Loader'

const AdminDashboardHome = () => {
    const [loading, setLoading] = useState(false);
    const fetchedUsers = useSelector(selectFetchedUsers)

   

    // eslint-disable-next-line no-constant-binary-expression
   let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
// let API =  'http://localhost:5050/api'

   

    const [products, setProducts] = useState([])

    // useEffect(() => {

     

    //   const fetchProducts =async()=>{
  
    //     var myHeaders = new Headers();
    //     myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNyb3duIEFkbWluIiwidXNlcklkIjoiNjVjNjZlZDIxMGYzZTE0YTQ1YTliYWEzIiwiZW1haWwiOiJhbmR5aGF5bGVAbWFpbC5jb20iLCJpYXQiOjE3MDc1MDMzMTR9.a_0wxQhQw21tV7M1zYbQAyvuy_OeuycnOZGIl9qIU1k");
  
    //     var requestOptions = {
    //       method: 'GET',
    //       headers: myHeaders,
    //       redirect: 'follow'
    //     };
    //     setLoading(true)
    //     fetch(`${API}/api/product/products`, requestOptions)
    //       .then(response => response.json())
    //       .then(result => {
    //         console.log(result)
    //         setProducts(result)
          
    //         setLoading(false)
    //       })
    //       .catch(error => console.log('error', error));
    //         }
  
    //   fetchProducts()
    
     
    // }, [])

    useEffect(() => {

     

      const fetchProducts =async()=>{
  
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNyb3duIEFkbWluIiwidXNlcklkIjoiNjVjNjZlZDIxMGYzZTE0YTQ1YTliYWEzIiwiZW1haWwiOiJhbmR5aGF5bGVAbWFpbC5jb20iLCJpYXQiOjE3MDc1MDMzMTR9.a_0wxQhQw21tV7M1zYbQAyvuy_OeuycnOZGIl9qIU1k");
  
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        setLoading(true)
        fetch(`${API}/quiz/getall`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result.quizes)
            setProducts(result.quizes)
          
            setLoading(false)
          })
          .catch(error => console.log('error', error));
            }
  
      fetchProducts()
    
     
    }, [])

 
  return (
    <div>
    <div className={styles.container}>

        {/* {loading ? <Loader /> : null} */}

      <div className={styles.left}>

        <div style={{width:'100%', borderRadius:'10px', padding:'10px'}}  className='flex justify-between bg-[#6ca4e5b6] shadow-md gap-8 items-center'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-sm font-bold'>Total Users</h1>
                <p className='font-bold text-2xl'>{fetchedUsers.length}</p>
                <AiOutlineArrowUp style={{fontSize:'20px',borderRadius:'100%'}}  className='bg-green-700 text-white p-1' />
            </div>
            <FaUsers style={{fontSize:'50px',borderRadius:'100%'}} className='bg-green-200 text-green-800 p-2' />
        </div>

    

        <div style={{width:'100%', borderRadius:'10px', padding:'10px'}}  className='flex justify-between bg-[#6ca4e5b6] shadow-md gap-8 items-center'>
            <div className='flex flex-col gap-3'>
                <h1 className='text-sm font-bold'>Total Number Quizes</h1>
                <p className='font-bold text-2xl'>{products?.length}</p>
                <AiOutlineArrowUp style={{fontSize:'20px',borderRadius:'100%'}}  className='bg-green-700 text-white p-1' />
            </div>
            <BsCurrencyDollar style={{fontSize:'50px',borderRadius:'100%'}} className='bg-green-200 text-green-800 p-2' />
        </div>

      </div>


      <div className={styles.right}>

      <div style={{height:'280px',width:'100%', borderRadius:'10px', padding:'5px'}}  className='flex flex-col justify-center bg-[#6ca4e5b6] shadow-md gap-8 items-center'>
            <div className='flex flex-col gap-1 items-center justify-center'>
                <h1 className='text-sm font-bold'>All GAME LEVELS</h1>
                <p className='font-bold text-[10px]'>LEVEL ONE</p>
                <p className='font-bold text-[10px]'>LEVEL TWO</p>
                <p className='font-bold text-[10px]'>LEVEL THREE</p>
                <p className='font-bold text-[10px]'>LEVEL FOUR</p>
                <p className='font-bold text-[10px]'>LEVEL FIVE</p>
                <p className='font-bold text-[10px]'>LEVEL SIX</p>
                <p className='font-bold text-[10px]'>LEVEL SEVEN</p>
                <p className='font-bold text-[10px]'>LEVEL EIGHT</p>
                <p className='font-bold text-[10px]'>LEVEL NINE</p>
              
                <AiOutlineArrowUp style={{fontSize:'20px',borderRadius:'100%'}}  className='bg-green-700 text-white p-1' />
            </div>
            <BsCurrencyDollar style={{fontSize:'50px',borderRadius:'100%'}} className='bg-green-200 text-green-800 p-2' />
        </div>

        <div style={{height:'280px',width:'100%', borderRadius:'10px'}}  className='p-3 flex flex-col justify-center bg-[#fae0df] shadow-md gap-8 items-center'>
            <div className='flex flex-col gap-3 items-center justify-center'>
                <h1>Another List</h1>
                <p className='font-bold text-2xl'>-----------</p>
                <AiOutlineArrowUp style={{fontSize:'20px',borderRadius:'100%'}}  className='bg-green-700 text-white p-1' />
            </div>
            <BsCurrencyDollar style={{fontSize:'50px',borderRadius:'100%'}} className='bg-sky-200 text-green-800 p-2' />
        </div>

      </div>

    </div>


<div  className={styles.bottom}>

<div className='p-3'>
    <div className='flex gap-0 items-center'>
    <BiBarChart className='text-sky-50 text-3xl'/>
    <PiArrowElbowRightBold className='text-green-500' />
    </div>
    <h1 className='text-4xl'>{products?.length}</h1>
    <p className='pt-4'>Total Number of Quizes</p>
   
</div>



<div className='p-3'>
    <div className='flex gap-0 items-center'>
    <BiBarChart className='text-sky-50 text-3xl'/>
    <PiArrowElbowRightBold className='text-green-500' />
    </div>
    <h1 className='text-4xl'>---</h1>
    <p className='pt-4'>Another display</p>
   
</div>

</div>

</div>
  )
}

export default AdminDashboardHome
