'use client';

//MISSING: make main form unusable until a title is selected

import { useEffect, useState } from "react";

export default function ContactFormEdit() {
    //Main form
    const [eventTitle, setEventTitle] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [eventLocation, setEventLocation] = useState('')
    const [eventTimeStart, setEventStart] = useState('')
    const [eventTimeEnd, setEventEnd] = useState('')
    const [eventDescription, setEventDescription] = useState('')

    //set useState for titles
    const [ titles, setTitles ] = useState([])

    //selected title
    const [ selection, setSelection ] = useState('')

    //unique document id
    const [ id, setId ] = useState('')

    //set value
    function setForm(title="", date="", location="", start="", end="", description=""){
        setEventTitle(title)
        setEventLocation(location)
        setEventDate(date)
        setEventStart(start)
        setEventEnd(end)
        setEventDescription(description)
    }

    /** QUERY TITLES */
    async function getTitles(){
        const response = await fetch('/api/getTitles', {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json", 
        },
        })

        //get response json
        const resp = await response.json()
        
        //response handling
        if(!response.ok){
        alert(resp.msg)
        } else {
        
        //setting titles
        setTitles(resp.response);
        
        
        }
    
    }
    //run on page startup once
    useEffect(() => {
        getTitles()
    }, [])

    
    /**QUERY EVENT AND FILL FORM (queryDocument) */
    async function getDocument(e){
        e.preventDefault();

        //post selected title 
        const response = await fetch('/api/queryDocument', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                selection
            }),
        });

        //get response json
        const resp = await response.json()

        //response handling
        if(!response.ok){
            alert(resp.msg)
        } else {
            alert(resp.msg)

            //store document id for update
            setId(resp.response[0].title)

            //Fill form with query
            setForm(
                resp.response[0].title,
                resp.response[0].date,
                resp.response[0].location,
                resp.response[0].startTime,
                resp.response[0].endTime,
                resp.response[0].description
            )   
        }
    }

    /**SEND FORM DATA TO API (updateDocument)*/
    async function handleSubmit(e) {
        e.preventDefault();

        const response = await fetch('/api/updateDocument', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                eventTitle,
                eventDate,
                eventLocation,
                eventTimeStart,
                eventTimeEnd,
                eventDescription,
                id
            }),
        });

        //get response json
        const resp = await response.json()

        if (!response.ok) {
            alert(resp.msg)
            
        } else {
            alert(resp.msg)

            //reset the form
            setForm()
        }
    };

    /**HANDLE REMOVE (removeDocument)*/
    async function handleRemove(e){
        e.preventDefault()

        if(confirm("Are you sure you want to remove this event?")){
            const response = await fetch('/api/removeDocument', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    selection
                }),
            });
    
            //get response json
            const resp = await response.json()
    
            //handle response
            if(!response.ok){
                alert(resp.msg)
            } else {
                alert(resp.msg)
    
                //reset the form
                setForm()
    
                //refresh page
                window.location.reload()
            }
        } 
    }

    return (
        <>
        {/**form for title selection */}
        <div className='py-3'>
            {/**run function to query and fill text boxes */}
            <form onSubmit={getDocument}>
                <label 
                className='pr-1'
                htmlFor='titleSelct'
                >Select a title</label>

                <select required onChange={e => setSelection(e.target.value)} className="p-2 m-2" id="titleSelct">
                    <option value={selection}>- Choose an option -</option>
                    {
                    titles.map((e) => (
                        <option key={e.title} value={e.title}>{e.title}</option>
                    ))
                    }
                </select>

                <button
                type='submit'
                className='px-3 m-3 bg-blue-500 rounded-lg text-white font-bold transition delay-75 hover:scale-105 active:scale-95'
                >Go</button>
            </form>
        </div>

            <form onSubmit={handleSubmit} className="py-4 mt-4 border-t flex flex-col gap-5">
                <div>
                    <label htmlFor="eventTitle">Event Title</label>
                    
                    <input
                        required
                        onChange={e => setEventTitle(e.target.value)}
                        value={eventTitle}
                        type="text"
                        id="eventTitle"
                        placeholder="Event Title"
                    />
                </div>

                <div>
                    <label htmlFor="eventLocation">Event Location</label>
                    <input
                        required
                        onChange={e => setEventLocation(e.target.value)}
                        value={eventLocation}
                        type="text"
                        id="eventLocation"
                        placeholder="Event Location"
                    />
                </div>

                <div>
                    <label htmlFor="eventDate">Event Date</label>
                    <input
                        required
                        onChange={e => setEventDate(e.target.value)}
                        value={eventDate}
                        type="date"
                        id="eventDate"
                        placeholder="Event Date"
                    />
                </div>

                <div>
                    <label htmlFor="eventTime">Event Time</label>
                    <input
                        required
                        onChange={e => setEventStart(e.target.value)}
                        value={eventTimeStart}
                        type="time"
                        id="eventTimeStart"
                    /> 
                    
                    to 
                    
                    <input
                        required
                        onChange={e => setEventEnd(e.target.value)}
                        value={eventTimeEnd}
                        type="time"
                        id="eventTimeEnd"
                    />
                </div>

                <div>
                    <label htmlFor="eventDescription">Event Description</label>
                    <textarea
                        required
                        onChange={e => setEventDescription(e.target.value)}
                        value={eventDescription}
                        className="h-32 "
                        id="eventDescription"
                        placeholder="Event Description"
                    />
                </div>

                <button
                className="bg-green-700 p-3 rounded-lg transition delay-75 hover:scale-105 active:scale-95 text-white font-bold"
                    type="submit"
                    >Post Event</button>
            </form>

            <div className="pl-[20px] ">
                <form onSubmit={handleRemove}>
                    <button
                        type="submit"
                        className="m-2 p-2 border bg-red-600 text-white font-bold rounded-xl transition delay-75 hover:scale-105 active:scale-95"
                        >
                        Remove Event
                    </button>
                </form>
            </div>
        </>
    )
}
