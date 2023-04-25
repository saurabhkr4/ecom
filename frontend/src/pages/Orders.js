import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import "./AdminActions.css"
import axios from "axios"
import {Link, useParams} from "react-router-dom"


const Orders = () => {

    const [data, setData] = useState([])
    const {customer_id} = useParams()
    // const [subTotal, setSubtotal] = useState(0)

    

    
        // const placeOrder = async() =>{
        //     const response = await axios.get(`http://localhost:5000/placeorder/${subTotal}/${customer_id}`);
        //     console.log("Here")
        //     console.log(response.data)
            
        //     if(response.data=="success"){
        //         console.log("placed")
        //         axios.put(`http://localhost:5000/order/status/change/${customer_id}`).then(()=>{})
        //         .catch((err)=> toast.error(err.response.data));
        //         window.location.reload(false)
        //     }
    
        // }
        
        
    

    // function handleClick(order_id){
    //     if(window.confirm("Are you sure to remove this product from your cart?")){
    //         axios.delete(`http://localhost:5000/cart/remove/${order_id}`)
    //         toast.success("Product removed from cart successfully", {autoClose:500})
    //         setTimeout(()=> loadData(), 100)
    //         window.location.reload(false)       //to refresh the page as we need to show the updated page
    //     }
    // }

    const loadData = async() =>{
        const response = await axios.get(`http://localhost:5000/getorder/item/${customer_id}`);
        setData(response.data);

        // var total = 0
        // for(var i=0; i<response.data.length; i++){
        //     var obj = response.data[i]
        //     console.log(obj["price"])
        //     total = total + obj["price"]
        // }
        // console.log(total)
        // setSubtotal(total)
        

    }

    // const deleteProduct = (id) =>{
    //     if(window.confirm("Are you sure to delete this product?")){
    //         axios.delete(`http://localhost:5000/api/remove/${id}`)
    //         toast.success("Product deleted successfully")
    //         setTimeout(()=> loadData(), 250)
    //     }
    // }

    useEffect(()=>{

       loadData();

    }, [])

    return(

        <div>

            <div>
                <nav class="navbar navbar-expand-lg bg-primary mb-5" >
                    <div class="container-fluid">
                        <ul class="navbar-nav mr-auto">
                            
                            <li class="nav-item active">
                                <a class="nav-link" href="#">My Cart</a>
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
                            <th>Name</th>
                            <th>Image</th>
                            <th>Product Id</th>
                            <th>Price</th>  
                            <th>Status</th>
                                                
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index)=>
                        {
                            return(
                                <tr key={item.order_id}>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.product_name}</td>
                                    <td><img src= {item.product_img} width="45" height= "45" alt="img_pic"/></td>
                                    <td>{item.product_id}</td>
                                    <td>{item.price}</td>
                                    <td>{item.status}</td>
                                    
                                    
                                </tr>
                            )
                        }
                        
                        )}
                    </tbody>
                </table>
                {/* <h3>{subTotal}</h3>
                <button className='btn btn-success' onClick= {() =>placeOrder()}>Place Order</button> */}
                
            </div>

        </div>
    )
}

export default Orders;