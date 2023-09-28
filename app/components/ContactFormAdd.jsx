'use client'

//must include use client when using useState!
import { useState } from "react";

export default function ContactForm() {
    const [eventTitle, setEventTitle] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [eventLocation, setEventLocation] = useState('')
    const [eventTimeStart, setEventStart] = useState('')
    const [eventTimeEnd, setEventEnd] = useState('')
    const [eventDescription, setEventDescription] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        //sending data to /pages/api/contact.ts
        const res = await fetch('/api/addDocument', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                eventTitle,
                eventDate,
                eventLocation,
                eventTimeStart,
                eventTimeEnd,
                eventDescription,
            }),
        });

        //getting response from api
        const msg = await res.json()

        //response handling
        if (res.ok) {
            alert(msg.response)
            
            //reset the form
            setEventTitle("")
            setEventLocation("")
            setEventDate("")
            setEventStart("")
            setEventEnd("")
            setEventDescription("")
            
        }
        if(!res.ok){
            alert(msg.response)
        }

    };

    return (
        <>
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
                    type="submit">Post Event</button>
            </form>
        </>
    )
}
/**
onChange={e => setEventTitle(e.target.value)}
Explaination:
- will store value from input field to eventTitle defined in server side.
*/