import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom';
import {FaHamburger} from 'react-icons/fa'

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const onLogin = () =>{
        fetch('http://localhost:5000/user/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res=>res.json()).then(data=>{
            if(data.msg){
                alert(data.msg)   
            }else{
                localStorage.setItem('token', data.token);
                alert("User Signin Successfuly")
            }
            history.push('/')
        })
    }

    return (
        <div className="auth">
                <i><FaHamburger size="40px"/></i>
                <h1>Signin</h1>
                <input type="email" name="email" placeholder="Enter your Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" name="password" placeholder="Enter your Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                <div className="row">
                    <button type="submit" value="submit" name="submit" onClick={()=>onLogin()}>Sign in</button>
                    <Link to="/signup">Create an account?</Link>
                </div>
        </div>
    )
}

export default Login
