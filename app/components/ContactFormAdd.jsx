'use client';
//must include use client when using useState!
import { useState } from "react";

export default function ContactForm() {
    const [eventTitle, setEventTitle] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [eventLocation, setEventLocation] = useState('')
    const [eventTimeStart, setEventStart] = useState('')
    const [eventTimeEnd, setEventEnd] = useState('')
    const [eventDescription, setEventDescription] = useState('')
    const [error, setError] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        //showing data
        console.log(eventTitle);
        console.log(eventDate);
        console.log(eventLocation);
        console.log(eventTimeStart);
        console.log(eventTimeEnd);
        console.log(eventDescription);

        const res = await fetch('/api/contact', {
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

        if (res.ok) {
            alert("Message sent succesfully")
            //reset the form
            e.target.eventTitle.value = "";
            e.target.eventDate.value = "";
            e.target.eventLocation.value = "";
            e.target.eventTimeStart.value = "";
            e.target.eventTimeEnd.value = "";
            e.target.eventDescription.value = "";
            
        }
        if(!res.ok){
          alert("Error sending message")
        }

        const {msg} = await res.json();
        setError(msg);
        console.log(error);
    };

    return (
        <>
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
                    type="submit">Post Event</button>
            </form>

            <div className="bg-slate-100 flex flex-col">
                <div className="text-red-600 px-5 py-2">Error Message</div>
            </div>
        </>
    )
}
/**
onChange={e => setEventTitle(e.target.value)}
Explaination:
- will store value from input field to eventTitle defined in server side.
*/