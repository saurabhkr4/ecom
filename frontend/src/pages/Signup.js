import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import {toast} from "react-toastify"

const initialState = {
    customer_id : "",
    c_name:"",
    email:"",
    password:"",
    mobile:"",
    address:"",
    account:""

}


const Signup = () => {

    const [state, setState] = useState(initialState)
    const {c_name, email, password, mobile, address, account} = state
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault();

        axios.post("http://localhost:5000/customer/register",{
            c_name, email, password, mobile, address, account
        }).then((res)=>{

            if(res.data.Status === "Success"){
            
            console.log("User registered")
            toast.success("User registered")
            setState({c_name:"", email: "", password: "", mobile: "", address: "", account:"" })
            navigate('/login')

            }else{
                console.log("Already an user, please Login")
                toast.success("Already an user, please Login")
            }
        })
        
        
        .catch((err) => toast.error(err))

    }

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setState({...state, [name]: value})
    }

    return(
        <div>
            
            <div>
                <nav class="navbar navbar-expand-lg bg-primary  mb-5" >
                <div class="container-fluid">
                    <a class="navbar-brand text-light" href="#">Name</a>
                    
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                        
                        <li class="nav-item">
                        <Link to={'/login'} class="nav-link active text-light" aria-current="page" href="#">Log In</Link>
                        </li>
                    
                    </ul>

                
                    
                    </div>
                </div>
                </nav>
            </div>



            <div className="d-flex mt-5 justify-content-center">
            <div className="w-50">
                <h4 className="display-5 mb-4 d-flex justify-content-center">Sign Up</h4>
                <form
                onSubmit={handleSubmit}
                >
                <div class="form-group">
                <label for="c_name" className="lead">Customer Name</label>
                <input
                type="text"
                id="c_name"
                name="c_name"
                className="form-control my-2"
                value={c_name}
                onChange={handleInputChange}
                />

                <label for="email" className="lead">email</label>
                <input
                type="email"
                id="email"
                name="email"
                className="form-control my-2"
                value={email}
                onChange={handleInputChange}
                />


                <label for="password" className="lead">Password</label>
                <input
                type="password"
                id="password"
                name="password"
                className="form-control my-2"
                value={password} 
                onChange={handleInputChange}
                />

                <label for="mobile" className="lead">Mobile</label>
                <input
                type="text"
                id="mobile"
                name="mobile"
                className="form-control my-2"
                value={mobile}
                onChange={handleInputChange}
                />

                <label for="address" className="lead">Address</label>
                <input
                type="text"
                id="address"
                name="address"
                className="form-control my-2"
                value={address}
                onChange={handleInputChange}
                />

                <label for="account" className="lead">Account</label>
                <input
                type="number"
                id="account"
                name="account"
                className="form-control my-2"
                value={account}
                onChange={handleInputChange}
                />

                <button type="submit" className="btn btn-success w-100">Register</button>
                

                </div>
                </form>



            </div>
            </div>
        </div>
                

           
        
    )



}

export default Signup