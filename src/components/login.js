import React, { useState } from "react";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [pwdError, setPwdError] = useState('');
    const [apiresponse,setApiresponse]=useState('')

    const handleEmailChange = (e) => {
        const inputEmailValue = e.target.value;
        setEmail(inputEmailValue);
        const isValidEmail = emailValidator(inputEmailValue);
        setEmailError(isValidEmail ? '' : 'Invalid email format');
    }

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setPassword(value);
        const isValidPassword = passwordValidator(value);
        setPwdError(isValidPassword ? '' : 'Password is not strong');
    }

    const emailValidator = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    const passwordValidator = (pass) => {
        const passwordRegex = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/;
        return passwordRegex.test(pass);
    }

    // const handleSubmit = async () => {
    //     // Your form submission logic here
    //     const apiresponse= await fetch('http://localhost:4000/login',{name:email,password:password})
    //     console.log("apiresponse",apiresponse);
    // }

    const handleSubmit = async () => {
        const requestOptions = {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ 
                name: email,
                password: password
            })
        };
    
        try {
            const apiResponse = await fetch('http://localhost:4000/login', requestOptions);
            console.log("apiResponse", apiResponse);
            if(!apiResponse.ok== true)
            {
               const response=await apiResponse.json()
               console.log("response",response);
                setApiresponse('invalid credentials')
            }
            else{
                const response=await apiResponse.json()
                console.log("response111",response);
                const token=response.token;
                console.log("token",token);
                localStorage.setItem("token",response.token)
                setApiresponse('')
            }
            
        } catch (error) {
            console.error('Error:', error);
            
        }
    }
    

    return (
        <div>
            <h2>Login Component</h2>

            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <div>
                            <label>Email</label>
                            <input type='text' className="form-control" onChange={handleEmailChange} />
                            <span className="text-danger">{emailError}</span>
                        </div>
                        <div>
                            <label>Password</label>
                            <input type='password' className="form-control" onChange={handlePasswordChange} />
                            <span className="text-danger">{pwdError}</span>
                        </div>
                        <div className="mt-3">
                            <button className="form-control btn btn-primary" onClick={handleSubmit}>Login</button>
                            <span className="text-danger">{apiresponse}</span>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
            <div>{email}</div>
        </div>
    )
}
