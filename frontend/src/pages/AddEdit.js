import { useState, useEffect } from "react"
import {useNavigate, useParams, Link} from "react-router-dom"
import axios from "axios"
import {toast} from "react-toastify"

const initialState = {
    product_name: "",
    product_img:"",
    category:"",
    num_item:"",
    price:"",
    description:"",
    seller_id:""
    
    

}


const AddEdit = () =>{

    const [state, setState] = useState(initialState)

    const{product_name, product_img, num_item, description, category, price, seller_id} = state;

    const navigate = useNavigate();

    const {product_id} = useParams();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${product_id}`)
        .then((resp) => setState({...resp.data[0] }))
    }, [product_id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!product_name || !num_item || !category || !price || !product_img || !seller_id){
            toast.error("Please fill each of the field ")
        }else{

            if(!product_id){
                    
                axios.post("http://localhost:5000/api/post", {
                    product_name,
                    product_img,
                    num_item,
                    description,
                    category,
                    price,
                    seller_id
                }).then(()=>{
                    setState({product_name:"", product_img:"", num_item:"", description:"", category: "", price:"", seller_id:""})
                }).catch((err)=> toast.error(err.response.data));
                toast.success("Product added successfully")
                setTimeout(() =>
                    navigate("/selleraction"), 500)
            }else{
                axios.put(`http://localhost:5000/api/update/${product_id}`, {
                    product_name,
                    product_img,
                    num_item,
                    description,
                    category,
                    price,
                    seller_id
                }).then(()=>{
                    setState({product_name:"", product_img:"", num_item:"", description:"", category: "", price:"", seller_id:""})
                }).catch((err)=> toast.error(err.response.data));
                toast.success("Product updated successfully")
                setTimeout(() =>
                    navigate("/selleraction"), 500)
            }

            
        }
    }

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setState({...state, [name]: value})
    }

    return(
        
        <div style={{marginTop: "100px"}}>
            <form
            onSubmit={handleSubmit}
            >
            <label for="product_name">Product Name</label>
            <input
            type="text"
            id="product_name"
            name="product_name"
            value={product_name || ""}
            onChange={handleInputChange}
            />

            <label for="product_img">Product Img</label>
            <input
            type="text"
            id="product_img"
            name="product_img"
            value={product_img || ""}
            onChange={handleInputChange}
            />


            <label for="category">Category</label>
            <input
            type="text"
            id="category"
            name="category"
            value={category || ""} 
            onChange={handleInputChange}
            />

            <label for="num_item">Quantity</label>
            <input
            type="text"
            id="num_item"
            name="num_item"
            value={num_item || ""}
            onChange={handleInputChange}
            />

            <label for="price">Price</label>
            <input
            type="number"
            id="price"
            name="price"
            value={price || ""}
            onChange={handleInputChange}
            />

            <label for="description">Description</label>
            <input
            type="text"
            id="description"
            name="description"
            value={description || ""}
            onChange={handleInputChange}
            />

            <label for="price">Seller Id</label>
            <input
            type="number"
            id="seller_id"
            name="seller_id"
            value={seller_id || ""}
            onChange={handleInputChange}
            />

            <button type="submit" value={product_id? "Update":"Save"} >Save</button>
            <Link to="/selleraction">
                <button>Go Back</button>
            </Link>


            </form>



        </div>
           

                

           
        
    )
}

export default AddEdit