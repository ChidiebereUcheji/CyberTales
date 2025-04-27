


import { useEffect, useState } from 'react'
import styles from './usersAccountColumn.module.css'
// import {  useDispatch } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'question', headerName: 'Question', width: 170 },
    { field: 'optionA', headerName: 'Option A', width: 170 },
    { field: 'optionB', headerName: 'Option B', width: 170 },
    { field: 'optionC', headerName: 'Option C', width: 170 },
    { field: 'answer', headerName: 'Answer', width: 170 },
    { field: 'answerCharacter', headerName: 'Answer Character', width: 90 },
    { field: 'category', headerName: 'Category', width: 160 },
   
  ];

const AllQuizesComponent = () => {
    // const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    // eslint-disable-next-line no-constant-binary-expression
   let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
// let API =  'http://localhost:5050/api'

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


    const actionColumn = [{
        field: "action",
         headerName: "Action",
          width: 100,
           renderCell:(params)=>{
            // console.log(params.row)
        return (
            <div className="flex gap-1 pr-2">
  
               {/* <Link to={`/all-products/${params.row._id}`}    style={{textDecoration: 'none'}}>
                
            
               <div  style={{borderRadius:'10px', cursor:'pointer'}} className="p-2 bg-pink-200 hover:bg-pink-300">View</div>

            
               </Link> */}
              
            </div>
        )
    }}];

    
  return (
    <div className={styles.datatable}>
      {loading ? <Loader /> : null}
    <h1 className="m-4 text-2xl">
       PRODUCTS
    </h1>
    <DataGrid
      className={styles.datagrid}
      getRowId={(row) => row._id}
      rows={products} columns={columns.concat(actionColumn)}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      GridLinesVisibility="Vertical"
    />
    </div>
  )
}

export default AllQuizesComponent

