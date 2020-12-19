import React, {useState} from 'react'
import {Link} from 'react-router-dom';

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile_no, setMobileNo] = useState(""); 

    const onSubmit = ()=>{
        fetch('http://localhost:5000/user/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                mobile_no: mobile_no
            })
        }).then(res=>res.json()).then(data=>{
            if(data.msg){
                alert(data.msg);
            }else{
                alert(data.msg);
            }
        })
    }

    return (
        <div className="auth">
                <h1>Signup</h1>
                <input type="text" name="name" placeholder="Enter your name" value={name} onChange={(e)=> setName(e.target.value)} />
                <input type="email" name="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="number" name="mobile_no" placeholder="Enter your Mobile no." value={mobile_no} onChange={(e) => setMobileNo(e.target.value)} />
                <div className="row">
                    <button type="submit" value="submit" name="submit" onClick={() => onSubmit()}>Sign up</button>
                    <Link to="/signin">Already have an account?</Link>
                </div>
        </div>
    )
}

export default Register
