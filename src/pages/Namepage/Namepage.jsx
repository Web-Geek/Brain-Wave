import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import NamepageCSS from './NamepageCSS.module.css'

const Namepage = () => {
    const [name,setName] = useState('')

    function inputChange(e){
        setName(e.target.value);

    }
    function onClickHandler(){
        localStorage.setItem('username',name)
    }

    return (
        <div className={`container ${NamepageCSS.container}`}>
            <div className={`card ${NamepageCSS.card}`}>
                <h1 className={NamepageCSS.h1}>What's Your Name?</h1>
                <form>
                    <input type="text" onChange={inputChange} value={name} className={`form-control mt-2 mb-3 ${NamepageCSS.input}`} placeholder="Enter your name" spellCheck="false" required />
                    <Link to='/main'>
                        <button type="submit" onClick={onClickHandler} className={`btn btn-primary ${NamepageCSS.btn}`}>Remember Me</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Namepage
