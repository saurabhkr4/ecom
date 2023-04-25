import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import "./AdminActions.css"
import axios from "axios"
import {Link, useParams} from "react-router-dom"


const SellerHome = () => {

    const [data, setData] = useState([])
    const {seller_id} = useParams()

    const loadData = async() =>{
        const response = await axios.get(`http://localhost:5000/seller/${seller_id}`);
        setData(response.data);

    }

    const deleteProduct = (id) =>{
        if(window.confirm("Are you sure to delete this product?")){
            axios.delete(`http://localhost:5000/api/remove/${id}`)
            toast.success("Product deleted successfully")
            setTimeout(()=> loadData(), 250)
        }
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
                            <a class="nav-link" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <Link to={`/sellerhistory/${seller_id}`} class="nav-link" href="#">Order Recieved</Link>
                        </li>
                        <li class="nav-item">
                            <Link to={`/bank/seller/${seller_id}`} class="nav-link" href="#">Account</Link>
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
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Category</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index)=>
                        {
                            return(
                                <tr key={item.product_id}>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.product_name}</td>
                                    <td><img src= {item.product_img} width="45" height= "45" alt="img_pic"/></td>
                                    <td>{item.description}</td>
                                    <td>{item.num_item}</td>
                                    <td>{item.category}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <Link to={`/update/${item.product_id}`}>
                                        <button className='btn btn-success mx-1'>Edit</button>
                                        </Link>
                                        <button className='btn btn-danger mx-1' onClick={()=>deleteProduct(item.product_id)}>Delete</button>
                                        
                                        <Link to={`/view/${item.product_id}`}>
                                            <button className='btn btn-info mx-1'>View</button>
        
                                        </Link>
                                    </td>
                                </tr>
                            )
                        }
                        
                        )}
                    </tbody>
                </table>
                <Link to="/addproduct">
                    <button className='btn btn-success'>Add Product</button>
                </Link>
            </div>

        </div>
    )
}

export default SellerHome;