import { useContext, useState } from "react"
import { EntryContext } from "../contexts/EntryContext"
import EntryDetails from "./EntryDetails"
import { v4 as uuidv4 } from "uuid"
import EditForm from "./EditForm"
import "../cssPages/EntryList.css"

const EntryList = () => {
    const { changeId, toggleEdit, entries } = useContext(EntryContext)

    return (
        <div className="entry-list">
            
            {entries? entries.map(entry => {
                return entry.id === changeId ? <EditForm entry={entry} /> : <EntryDetails key={uuidv4()} entry={entry} toggleEdit={toggleEdit} />
            }) : "No notes"}
            {/* {entries.map(entry => <EditForm entry={entry} />)} */}
        </div>
    )
}

export default EntryList

