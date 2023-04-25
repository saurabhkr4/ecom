import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const Home  = () => {

  const [search, setSearch] = useState('')
  console.log(search)

    const location = useLocation()
    const [data, setData] = useState([])

    const loadData = async() =>{
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);

    }    

    useEffect(()=>{
        loadData();
 
     }, [])

    const navigate = useNavigate()
    const handleClick = (() =>{
      console.log("Hello")
    })

    const customer_detail = location.state.customer



    return(
        <div>
            <div>
            <nav class="navbar navbar-expand-lg bg-primary mb-5" >
              <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="#">Hello {location.state.customer.name}</a>
                    </li>
                    <li class="nav-item">
                      <Link to={`/cart/${customer_detail.customer_id}`} class="nav-link active" aria-current="page" style={{textDecoration:" none", color:"#000000"}}>Cart</Link>
                    </li>
                    <li class="nav-item">
                      <Link to={`/order/${customer_detail.customer_id}`} class="nav-link active" aria-current="page" style={{textDecoration:" none", color:"#000000"}}>Orders</Link>
                    </li>
                    <li class="nav-item">
                      <Link to={`/bank/customer/${customer_detail.customer_id}`} class="nav-link active" aria-current="page" style={{textDecoration:" none", color:"#000000"}}>Account</Link>
                    </li>
                  
                  </ul>
                  <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange = {(e) => setSearch(e.target.value)}/>
                    <button class="btn btn-outline-success" type="submit">Search</button>
                  </form>
                </div>
              </div>
            </nav>
            </div>



            {/* <div>
            <h2> you are authorized {location.state.customer}</h2>
            <button> logout</button>
            </div> */}

            <div style={{ display: "flex", flexWrap: "wrap" }} className="row justify-content-center">
                {data.filter((item)=> {
                  return search.toLowerCase()==='' ? item: item.product_name.toLowerCase().includes(search)
                }).map((item, index) =>
                
                {
                    
                    return(

                        <div className="card m-3 mb-4 p-2 shadow-sm bg-white rounded hover-overlay ripple " style={{width: "16rem"}}  >
                            <Link to={`/product/${customer_detail.customer_id}/${item.product_id}` } style={{textDecoration:" none", color:"#000000"}}>
                            <div >
                            <img class="card-img-top pt-3 " src={item.product_img} alt="Card image cap" style={{ alignSelf: 'center', width: "100%", height: "15vw" , color: "hsla(0, 0%, 98%, 0.2)"}}/>
                            
                            </div>
                            <div class="card-body bg-light">
                              
                              <h3 class="card-title" >{item.product_name}</h3>
                              <h5>Rs. {item.price}</h5>
                              <p class="card-text">{item.description}</p>
                              
                            {/* <button onClick={navigate(`/product/${item.product_id}`)}></button> */}
                            </div>
                            </Link>
                        </div>
                    )

                }
                 )}
            </div>
           
        </div>
    )
}

export default Home