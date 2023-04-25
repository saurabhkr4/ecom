import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import "./AdminActions.css"
import axios from "axios"
import {Link, useParams} from "react-router-dom"


const Sellerhistory = () => {

    const [data, setData] = useState([])
    const {seller_id} = useParams()
    const [text, setText] = useState("Deliever")

    const loadData = async() =>{
        const response = await axios.get(`http://localhost:5000/seller/order/${seller_id}`);
        setData(response.data);

    }

    const handleDeliver = (seller_id, amount, order_id) =>{
        console.log("item delievered")
        axios.put(`http://localhost:5000/seller/account/change/${seller_id}/${amount}`).then(()=>{})
        .catch((err)=> toast.error(err.response.data));
       // window.location.reload(false)

       axios.put(`http://localhost:5000/order/deliever/${order_id}`).then(()=>{})
       .catch((err)=> toast.error(err.response.data));
       window.location.reload(false)
        

    }


    useEffect(()=>{

       loadData();

    }, [])

    return(


        <div>

            <div>

                <nav class="navbar navbar-expand-lg bg-dark navbar-dark mb-5" >
                    <div class="container-fluid">
                        
                        <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Ordered Recieved</a>
                        </li>
                        
                        
                        </ul>
                            
                            
                    </div>
                </nav>

            </div>


            <div style={{marginTop:"150px", textAlign: "center"}} className='m-5'>
                <table className='table table-striped table-bordered' >
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Product ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Customer ID</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Seller_id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index)=>
                        {
                            return(
                                <tr key={item.order_id}>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.product_id}</td>
                                    <td>{item.product_name}</td>
                                    <td><img src= {item.product_img} width="45" height= "45" alt="img_pic"/></td>
                                    <td>{item.customer_id}</td>
                                    <td>{item.price}</td>
                                    <td>{item.status}</td> 
                                    
                                    <td>
                                        
                                        <button className='btn btn-success mx-1' onClick={()=> handleDeliver(seller_id, item.price, item.order_id)}>Deliever</button>
                                        
                                    </td>                        
                                </tr>
                            )
                        }
                        
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Sellerhistory;