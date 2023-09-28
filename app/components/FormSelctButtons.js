import Link from "next/link";

export default function FormTypeButtons() {
    return (
        <>
            <ul className="flex flex-row p-3 m-2">
                <li><Link href="/add">Add New Event</Link></li>
                <li><Link href="/edit">Edit Event</Link></li>
            </ul>
        </>
    );
}