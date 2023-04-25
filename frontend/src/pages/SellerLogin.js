import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Sellerlogin(){
    
    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    axios.defaults.withCredentials = false

    const handleSubmit = (e) =>{
        console.log("clicked")
        e.preventDefault();
        
        axios.post("http://localhost:5000/seller/login", values)
        .then(res => {
            if(res.data.Status === "Success"){
                console.log("ok")
                // const customer = res.data.Customer
                // console.log(customer)
                const Seller =res.data.Seller
                navigate(`/seller/${Seller.seller_id}`)
            }else{
                console.log("error")
                alert(res.data.Message)
            }
        })
        .catch((err) => console.log(err))
    }
    
    return(
    <div>

        <div>
            <div>

                <nav class="navbar navbar-expand-lg bg-dark navbar-dark mb-5" >
                    <div class="container-fluid">
                        
                        <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Name</a>
                        </li>
                        <li class="nav-item">
                            <Link to={''} class="nav-link" href="#">Sign Up</Link>
                        </li>
                        
                
                        </ul>
                            
                            
                    </div>
                </nav>

            </div>
        </div>



        <div className="d-flex mt-5 justify-content-center">
            <div className="w-25 ">
            <h4 className="display-5 mb-4 d-flex justify-content-center">Seller Login</h4>
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <input type="email" className="form-control my-3" placeholder="Enter email" name='email' onChange={e=> setValues({...values, email: e.target.value})}/>
                        <input type="password" className="form-control my-3" placeholder="Enter password" name='email' onChange={e=> setValues({...values, password: e.target.value})}/>
                        <button type="submit" className="btn btn-success w-100">Log in</button>
                    </div>
                </form>
            </div>

        </div>   
    </div>
    )
}