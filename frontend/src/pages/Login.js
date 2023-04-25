import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login(){
    
    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()

    axios.defaults.withCredentials = false

    const handleSubmit = (e) =>{
        console.log("clicked")
        e.preventDefault();
        
        axios.post("http://localhost:5000/login", values)
        .then(res => {
            if(res.data.Status === "Success"){
                console.log("ok")
                const customer = res.data.Customer
                console.log(customer)
                navigate('/', {state: {customer: customer}})
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
            <nav class="navbar navbar-expand-lg bg-primary  mb-5" >
            <div class="container-fluid">
                <a class="navbar-brand text-light" href="#">Name</a>
                
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                    
                    <li class="nav-item">
                      <Link to={'/customer/register'} class="nav-link active text-light" aria-current="page" href="#">Sign Up</Link>
                    </li>
                  
                  </ul>

                  <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <Link to={'/seller/login'} class="nav-link active text-light" aria-current="page" href="#">Seller Login</Link>
                    </li>
                    <li class="nav-item">
                      <Link to={'/seller/login'} class="nav-link active text-light" aria-current="page" href="#">Advertiser Login</Link>
                    </li>
                  </ul>
                  
                </div>
              </div>
            </nav>

            </div>
        

            <div className="d-flex mt-5 justify-content-center">
            <div className="w-25 ">
                    <h4 className="display-5 mb-4 d-flex justify-content-center">Login</h4>
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