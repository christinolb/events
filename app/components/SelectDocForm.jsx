'use client'

import AvailableDocQuery from "./AvailableDocQuery"

export default function SelectDocForm() {
    const eTitle = <AvailableDocQuery />
    return (
        <div>
            <h1>{eTitle}</h1>
        </div>
    )
}