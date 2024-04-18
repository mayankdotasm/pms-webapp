import React, {useState} from 'react'


const handleClick=()=>{
    console.log('success');
}

export default function Header(){

    const [message, setMessage] = useState("");
    const handleClick_About = () => {
        setMessage(prevMessage => prevMessage === "Nishant, Mayank, Keshav" ? "" : "Nishant, Mayank, Keshav");
        
    }

    const [message1, setMessage1] = useState("");
    const handleClick_Register = () => {
        setMessage1(prevMessage => prevMessage === "Welcome" ? "" : "Welcome")
    }

    return (
        <div className ="pat">
        <div className='sidebar'>
            <ul className='ul1'>
                <li onClick={handleClick_Register}>Register</li>
                <div className='res'>{message1 && message1}</div>
                <li>View Record</li>
                <li>Sort</li>
                <li onClick={handleClick_About}>About us</li>
                <div className='mess'>{message && message}</div>
                
            </ul>
            

        </div>
        <div className='Main_area'>
            <h2>Welcome To the Portal, SIR !</h2>
            <div className='enter'>
                <h3><b>Enter Prisoner's Prison ID</b></h3>
                <input type='number'></input><br></br><br></br>
                <button onClick={handleClick}>View</button>
            </div>
        </div>
        </div>
    )
}