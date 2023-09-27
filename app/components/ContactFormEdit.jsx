'use client';

//MISSING: make main form unusable until a title is selected

import { useState } from "react";

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

    //run at start of page
    getTitles()

    async function getTitles(){
        const response = await fetch('/api/getTitles', {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json", 
        },
        })

        //extract response here
        if(!response.ok){
        alert("Error getting titles")
        } else {
        
        //extracting response
        const titles = await response.json()
        setTitles(titles.response)

        }
    }

    //given the title selection post request to api
    //fill in text boxes with response data
    async function getDocument(e){
        e.preventDefault();

        //post selected title 
        const res = await fetch('/api/queryDocument', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                selection
            }),
        });

        //response handling
        if(!res.ok){
            alert("Error!")
        } else {
            alert("loading data")

            const doc = await res.json()

            console.log("doc.response", doc.response)

            //store document id for update
            setId(doc.response[0].title)
            
            //set all form values 
            setEventTitle(doc.response[0].title)
            setEventLocation(doc.response[0].location)
            setEventDate(doc.response[0].date)
            setEventStart(doc.response[0].startTime)
            setEventEnd(doc.response[0].endTime)
            setEventDescription(doc.response[0].description)
            
        }
    }

    //sends data to api for document update
    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch('/api/updateDocument', {
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

        if (res.ok) {
            alert("Updated succesfully")
            //reset the form
            setEventTitle("")
            setEventLocation("")
            setEventDate("")
            setEventStart("")
            setEventEnd("")
            setEventDescription("")
            
        }
        if(!res.ok){
          alert("Error")
        }
    };

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

                <select onChange={e => setSelection(e.target.value)} className="p-2 m-2" id="titles">
                    {
                    titles.map((e)=>(
                        <option key={e.title} value={e.title}>{e.title}</option>
                    ))
                    }
                </select>

                <button
                type='submit'
                className='px-3 m-3 bg-blue-500 rounded-lg text-white font-bold'
                >Go</button>
            </form>
        </div>

            <form onSubmit={handleSubmit} className="py-4 mt-4 border-t flex flex-col gap-5">
                <div>
                    <label htmlFor="eventTitle">Event Title</label>
                    
                    <input
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
                        onChange={e => setEventStart(e.target.value)}
                        value={eventTimeStart}
                        type="time"
                        id="eventTimeStart"
                    /> 
                    
                    to 
                    
                    <input
                        onChange={e => setEventEnd(e.target.value)}
                        value={eventTimeEnd}
                        type="time"
                        id="eventTimeEnd"
                    />
                </div>

                <div>
                    <label htmlFor="eventDescription">Event Description</label>
                    <textarea
                        onChange={e => setEventDescription(e.target.value)}
                        value={eventDescription}
                        className="h-32 "
                        id="eventDescription"
                        placeholder="Event Description"
                    />
                </div>

                <button
                className="bg-green-700 p-3 text-white font-bold"
                    type="submit"
                    >Post Event</button>
            </form>
            <div className="pl-[20px] ">
                <button
                    className="m-2 p-2 border bg-red-600 text-white font-bold rounded-xl"
                    >
                    Remove
                </button>
            </div>
        </>
    )
}
