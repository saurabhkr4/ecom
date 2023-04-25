import { useState, useEffect} from "react"
import  {useParams, Link} from "react-router-dom"
import axios from "axios"
import {toast} from "react-toastify"


const Product = (()=>{

    const [user, setUser] = useState({})

    const {customer_id, product_id} = useParams()
    const sellerid = user.seller_id

    const handleClick = () =>{
        axios.post("http://localhost:5000/addtocart/post", {
            customer_id,
            product_id,
            sellerid
            })
            .then(()=>{})
            .catch((err)=> toast.error(err.response.data));
            toast.success("Product added to cart successfully")
                
        console.log(customer_id)
    }

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${customer_id}/${product_id}`)
        .then((resp) => setUser({...resp.data[0] }))
    }, [product_id])

    return (

        <div>

                {/* <div>
                    <Link to="/">
                        <buttton className="btn btn-success justify-content-centre">Go Back</buttton>
                    </Link>
                </div> */}
            
                <div class="container py-5">
                    <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6 col-xl-4">
                        <div class="card text-black">
                        <i class="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                        <img src={user.product_img}
                            class="card-img-top" alt="Product Image" />
                        <div class="card-body">
                            <div class="text-center">
                                <h5 class="card-title">{user.product_name}</h5>
                                <p class="text-muted mb-4">{user.description}</p>
                            </div>

                            <div>
                                <div class="d-flex justify-content-between">
                                    <span>Price</span><span>₹{user.price}</span>
                                </div>
                                
                                <div class="d-flex justify-content-between">
                                    <span>Category</span><span>{user.category}</span>
                                </div>
                            
                                                                  

                                <div class="d-flex justify-content-center font-weight-bold mt-3">
                                   <button className="btn btn-success w-100" onClick={handleClick} >Add to cart</button>
                                </div>

                            </div>

                            
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                

        </div>

    )
})

export default Product