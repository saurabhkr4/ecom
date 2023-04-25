import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const CustomerBankAccount = () =>{

    const {customer_id} = useParams();
    const [data, setData] = useState([])

    const loadData = async() =>{
        const response = await axios.get(`http://localhost:5000/bank/customer/${customer_id}`);
        setData(response.data);
        console.log(response.data)

    }    

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
                            <a class="nav-link text-light" href="#">Account </a>
                        </li>
                        
                
                        </ul>
                            
                            
                    </div>
                </nav>
            </div>            


            <div>
                 <h1 class="display-6 d-flex justify-content-center">Account Balance: ₹ {data.map(home => <div>{data[0].account}</div>)} </h1>
            </div>


        </div>



       
    )



}


export default CustomerBankAccount