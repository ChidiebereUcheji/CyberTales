
import { DataGrid } from '@mui/x-data-grid';
import styles from './usersAccountColumn.module.css'
import { selectFetchedUsers } from '../slices/userSlice';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'email', headerName: 'Email', width: 250 },
    // { field: 'firstName', headerName: 'Firstname', width: 120 },
    { field: 'name', headerName: 'Name', width: 120 },
    { field: 'username', headerName: 'Username', width: 120 },
    { field: 'department', headerName: 'Department', width: 120 },
   
    { field: 'phoneNumber', headerName: 'Phone Number', width: 160 },
    { field: 'pointsScored', headerName: 'Points', width: 120 },
 
  ];
  
  // type MyDataGridProps = {
  //   pageSize: number;
  //   rowsPerPageOptions: number[];
  // };



const AllUsersComponent = () => {
    const fetchedUsers = useSelector(selectFetchedUsers)

    
    console.log(fetchedUsers)


    const actionColumn = [{
      field: "action",
       headerName: "Action",
        width: 100,
         renderCell:(params)=>{
          // console.log(params.row)
      return (
          <div className="flex gap-1 pr-2">

             {/* <Link to={`/usersAccount/cartItems/${params.row._id}`}    style={{textDecoration: 'none'}}>
             <div  style={{borderRadius:'10px', cursor:'pointer'}} className="p-2 bg-pink-200 hover:bg-green-300">Cart Items</div>
             </Link>

             <Link to={`/usersAccount/wishlist/${params.row._id}`}    style={{textDecoration: 'none'}}>
             <div  style={{borderRadius:'10px', cursor:'pointer'}} className="p-2 bg-green-200 hover:bg-pink-300">Wishlist</div>
             </Link> */}
            
          </div>
      )
  }}];

  
  return (
    <div className={styles.datatable}>
    <h1 className="m-4 text-2xl">
       USERS
    </h1>
    <DataGrid
      className={styles.datagrid}
      getRowId={(row) => row._id}
      rows={fetchedUsers} columns={columns.concat(actionColumn)}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      GridLinesVisibility="Vertical"
    />
    {/* {loading ? <h1>Loading...</h1> : null} */}
  </div>
  )
}

export default AllUsersComponent
