import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AdminActions from './pages/AdminActions';
import { ToastContainer } from 'react-toastify';
import AddEdit from './pages/AddEdit';
import View from './pages/View'
import Home from './pages/Home'
import Login from './pages/Login'
import Product from './pages/Product';
import Signup from './pages/Signup';
import Sellerlogin from './pages/SellerLogin';
import SellerHome from './pages/SellerHome';
import Cart from './pages/Cart';
import Sellerhistory from './pages/Sellerhistory';
import Orders from './pages/Orders'
import SellerBankAccount from './pages/SellerBankAccount';
import CustomerBankAccount from './pages/CustomerBankAccount'

function App() {
  return (



    <BrowserRouter>
      <div>
        <ToastContainer position='top-center'/>
          <Routes>

            <Route path="/" element={<Home/>}/>
            <Route path="/login" element = {<Login/>}/>
            <Route path="/selleraction" element={<AdminActions/>}/>
            <Route path="/addproduct" element={<AddEdit/>}/>
            <Route path="/update/:product_id" element={<AddEdit/>}/>
            <Route path="/view/:product_id" element={<View/>}/>
            <Route path="/product/:customer_id/:product_id" element={<Product/>}/>
            <Route path="/customer/register" element={<Signup />}/>
            <Route path="/seller/login" element={<Sellerlogin/>}/>
            <Route path="/seller/:seller_id" element={<SellerHome/>}/>
            <Route path="/cart/:customer_id" element={<Cart/>}/>
            <Route path="sellerhistory/:seller_id" element={<Sellerhistory/>}/>
            <Route path="/order/:customer_id" element={<Orders/>}/>
            <Route path="/seller/order/:seller_id" element={<Sellerhistory/>}/>
            <Route path="/bank/seller/:seller_id" element={<SellerBankAccount/>}/>
            <Route path="/bank/customer/:customer_id" element={<CustomerBankAccount/>}/>

          </Routes>
      </div>

    
    </BrowserRouter>
  );
}

export default App;
