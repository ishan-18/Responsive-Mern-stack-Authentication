import React, {useState} from 'react'

function Home() {

    const [data, setData] = useState("");

        fetch('http://localhost:5000/api/home', {
        method: "GET",
        headers:{
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
            }
        }).then(res=>res.json()).then(data=>{
            setData(data.msg);
        })

    return (
        <div>
            <h1 id="title-1">{data}</h1>
        </div>
    )
}

export default Home
