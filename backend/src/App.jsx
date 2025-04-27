import  { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
// import Dashboard from './pages/Dashboard'
// import UsersAccount from './pages/UsersAccount'
// import Shipping from './pages/Shipping'
// import Orders from './pages/Orders'
// import NewsletterSub from './pages/NewsletterSub'
// import CreateProduct from './pages/CreateProduct'
// import UserWishlist from './pages/UserWishlist'
// import UserCartItems from './pages/UserCartItems'


import { selectUserInfo } from './slices/authSlice';
import { useSelector } from 'react-redux'
import Dashboard from './pages/Dashboard';
import AllUsers from './pages/AllUsers';
import AllQuizes from './pages/AllQuizes';
import CreateQuiz from './pages/CreateQuiz';
// import Loader from './components/Loader';
// import Products from './pages/Products';
// import EachProduct from './pages/EachProduct';
// import EachOrder from './pages/EachOrder';
// import PaymentHistory from './pages/PaymentHistory';
// import UpdateProduct from './pages/UpdateProduct';




function App() {

    const [isLoading, setIsLoading] = useState(true);
    const userInfo = useSelector(selectUserInfo)

    useEffect(() => {
     
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); 
    }, []);

 

   // eslint-disable-next-line react/prop-types
   const ProtectedRoute =({children})=>{
            
    if(!userInfo?.user){
     return <Navigate to='/' />
    }
    return children
 }

  return (
    <div style={{ overflow:'hidden',position:'inherit',height:'100%'}}>
     <BrowserRouter>
     {/* {isLoading ? <Loader /> : null} */}
   
     <Routes>
     <Route path='/'  element={<Home/>} />
     <Route path='/dashboard'  element={ <ProtectedRoute>
                                          <Dashboard/>
                                         </ProtectedRoute>
                                        } />
  
      <Route path='/usersAccount'  element={ <ProtectedRoute>
                                                <AllUsers />
                                                </ProtectedRoute>} />
                                                                                     
     <Route path='/all-quiz'  element={ <ProtectedRoute>
                                                <AllQuizes />
                                                </ProtectedRoute>} />

    <Route path='/create-quiz'  element={ <ProtectedRoute>
                                                <CreateQuiz />
                                                </ProtectedRoute>} />

  
      {/*
   <Route path='/all-products'  element={ <ProtectedRoute>
                                                        <Products />
                                                        </ProtectedRoute>
                                                        } />
   <Route path='/all-products/:id'  element={<ProtectedRoute>
                                                    <EachProduct />
                                                    </ProtectedRoute>} />
       <Route path='/shipping'  element={<ProtectedRoute>
                                                  <Shipping />
                                                  </ProtectedRoute>} />
      <Route path='/orders'  element={
                                                  <ProtectedRoute>
                                                    <Orders />
                                                  </ProtectedRoute>} />
       <Route path='/orders/:id'  element={<ProtectedRoute>
                                                  <EachOrder />
                                                  </ProtectedRoute>} />
        <Route path='/newsletter-sub'  element={ <ProtectedRoute>
                                                            <NewsletterSub  />
                                                            </ProtectedRoute>} />
      <Route path='/paymentHistory'  element={<ProtectedRoute>
                                                  <PaymentHistory />
                                                </ProtectedRoute>
                                                } />
    <Route path='/create-products'  element={<ProtectedRoute>
                                                  <CreateProduct />
                                                </ProtectedRoute>
                                                } />
        <Route path='/all-products/:id/update-product'  element={<ProtectedRoute>
                                                <UpdateProduct />
                                                </ProtectedRoute>} /> */}
 {/* <Route path='/createTransactions'  element={<ProtectedRoute>
                                                <CreateTransactions />
                                              </ProtectedRoute>
                                              } />
   <Route path='/messages'  element={<ProtectedRoute>
                                                <Messages />
                                              </ProtectedRoute>
                                              } />
 <Route path='/referralCommissions'  element={<ProtectedRoute>
                                                <ReferralCommisions />
                                                </ProtectedRoute>} />
      <Route path='/sendEmails'  element={<ProtectedRoute>
                                                <SendEmail />
                                                </ProtectedRoute>} /> */}
                                        
     </Routes>
    {/* <Footer /> */}
     </BrowserRouter>
      
    </div>
  )
}

export default App
