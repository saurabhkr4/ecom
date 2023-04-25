import { useState, useEffect} from "react"
import  {useParams, Link} from "react-router-dom"
import axios from "axios"


const View = (()=>{

    const [user, setUser] = useState({})

    const {product_id} = useParams()

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${product_id}`)
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
                            
                                <div class="d-flex justify-content-between">
                                    <span>Stock</span><span>{user.num_item}</span>
                                </div>

                                <div class="d-flex justify-content-between">
                                    <span>Product ID</span><span>{user.product_id}</span>
                                </div>
                                    

                                <div class="d-flex justify-content-between font-weight-bold">
                                    <span>Seller Id</span><span>{user.seller_id}</span>
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

export default View