'use client'

import { useState } from "react"
require('dotenv').config()

export default function Login(){
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    //validate login & redirect to add
    function validate(e){
        e.preventDefault()

        //fix 
        if ( password == process.env.PASSWORD ){
            //REDIRECT
            window.location = '/add'
        } else {
            alert("Incorrect credentials")
        }
    }
    
    return(
        <>
            <div className="flex justify-center text-2xl">
                LOGIN - EVENTS FORM
            </div>

            <div className="flex justify-center">
                <form onSubmit={validate} className="m-5 p-4 flex justify-center flex-col w-fit">
                    <label className="py-4" htmlFor="username">Username</label>
                    <input
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        className="m-2 p-2"
                        id="username"
                        type="text"
                    />

                    <label className="py-4" htmlFor="password">Password</label>
                    <input
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="m-2 p-2"
                        id="password"
                        type="password"
                    />

                    <button
                        type="submit"
                        className="border border-black m-1 p-1 transition delay-75 hover:scale-105 active:scale-95"
                        >Login</button>
                </form>
            </div>
        </>
    )
}