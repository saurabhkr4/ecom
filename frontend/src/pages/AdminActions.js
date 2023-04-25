import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import "./AdminActions.css"
import axios from "axios"
import {Link} from "react-router-dom"


const AdminActions = () => {

    const [data, setData] = useState([])

    const loadData = async() =>{
        const response = await axios.get("http://localhost:5000/api/get");
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
    )
}

export default AdminActions;