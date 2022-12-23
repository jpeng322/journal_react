import { useContext, useState } from "react"
import { EntryContext } from "../contexts/EntryContext"
import EntryDetails from "./EntryDetails"
import { v4 as uuidv4 } from "uuid"
import EditForm from "./EditForm"

const EntryList = () => {
    const { changeId, handleEdit, entries, editEntry } = useContext(EntryContext)
    console.log(entries)
    // const [changeId, setChangeId] = useState("")

    // const handleEdit = (id) => {
    //     console.log(id)
    //     console.log(entries)
    //     editEntry(id)
    //     setChangeId(id)
    // }
    // console.log(changeId)

    return (
        <div className="entry-list">
            {entries.map(entry => {
                return entry.id === changeId ? <EditForm entry={entry} /> : <EntryDetails key={uuidv4()} entry={entry} handleEdit={handleEdit} />
            })}
            {/* {entries.map(entry => <EditForm entry={entry} />)} */}
        </div>
    )
}

export default EntryList

