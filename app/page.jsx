import Link from "next/link"
import ContactFormAdd from "./components/ContactFormAdd"

export default function Home() {
  return (
    <div className='p-4 max-w-3xl mx-auto'>
      <h1 className='text-3xl font-bold'>Add Event Form </h1>
      <p>Please fill in the form below</p>

      <ContactFormAdd />
      <ul className="flex flex-row p-3 m-2">
        <li><Link href="/">Add New Event</Link></li>
        <li><Link href="/edit">Edit Event</Link></li>
        <li><Link href="/">Remove Event</Link></li>
      </ul>
    </div>
  )
}
