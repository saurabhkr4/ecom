import React from 'react'
import {Link} from 'react-router-dom'


function Signup(){
    return(
        <div className='d-flex justify-content-center align-items-center bg-dark bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2 mb-5>Sign Up</h2>
                <form action ="">
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="text" placeholder='Enter your name'className='form-control rounded-0'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter email'className='form-control rounded-0'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter password' className='form-control rounded-0'/>
                    </div>
                    <button className='btn btn-success w-100'><strong>Sign In</strong></button>
                    


                    <div class="form-check mb-2 mt-2">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked/>
                        <label class="form-check-label" for="flexCheckChecked">
                        I agree to all the terms and conditions
                        </label>
                    </div>



                    <Link to="/" className = 'btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Log In</Link>

                </form>
            </div>
        </div>
    )
}

export default Signup