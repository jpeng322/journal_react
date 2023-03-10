import { useState, createContext, useEffect, useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import date from "date-and-time"
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const EntryContext = createContext()

const EntryContextProvider = (props) => {
    // const localData = JSON.parse(localStorage.getItem("entries"))

    // const [entries, setEntries] = useState(localData)
    const [entries, setEntries] = useState([])
    // const [entries, setEntries] = useState([{
    //     "date": "January",
    //     "topic": "It is jan",
    //     "details": "asdasdd",
    //     "id": 3
    // },
    // {
    //     "date": "February",
    //     "topic": "It is feb",
    //     "details": "asdasdd",
    //     "id": 3
    // }])

    const { user } = useContext(AuthContext)

    useEffect(() => {
            const fetchEntries = () => axios.get("http://localhost:3001/entries", { headers: { "Authorization": `Bearer ${user.data.token}` } })
                .then(response => {
                    console.log(response.data)
                    setEntries(response.data)
                })

            if (user) {
                fetchEntries()
                console.log("fetched stuff")
            }
        
    }, [user])


    const format = date.compile('MMMM DD, YYYY')
    const currentDate = date.format(new Date(), format)
    const addEntry = (topic, details, id) => {
        // setEntries([{ topic, date: currentDate, details, id: uuidv4() }, ...entries])
        axios.post("http://localhost:3001/entries", { topic, date: currentDate, details, favorite: false},{ headers: { "Authorization": `Bearer ${user.data.token}` } })
            .then(response => setEntries([response.data, ...entries]))
    }

    const deleteEntry = (id) => {
        console.log(id)
        // setEntries(entries.filter(entry => entry.id !== id))
        axios.delete(`http://localhost:3001/entries/${id}`, { headers: { "Authorization": `Bearer ${user.data.token}` } })
            .then(setEntries(entries.filter(entry => entry.id !== id)))
    }

    const editEntry = (id, topic, date, details, favorite) => {
        setChangeId("")
        console.log("changeId", changeId)
        // console.log(id)
        const index = entries.findIndex(entry => entry.id === id)
        // console.log(index)
        axios.put(`http://localhost:3001/entries/${id}`, {
            topic: topic,
            details: details,
            date: date,
            id: id,
            favorite: favorite
        }, { headers: { "Authorization": `Bearer ${user.data.token}` } }).then(response => {
            console.log(response)
            // const entryClone = entries
            // entryClone.splice(index, 1, response.data)
            entries.splice(index, 1, response.data)
            // console.log(newString)
            setEntries([...entries])
        })
    }


    const [changeId, setChangeId] = useState("")

    const cancelEdit = () => {
        setChangeId("")
    }


    const toggleEdit = (id) => {
        console.log("toggled edit")
        setChangeId(id)
    }


    const [active, setActive] = useState(false)

    const toggleForm = () => {
        setActive(!active)
        console.log("toggled")
    }

    const closeForm = () => {
        setActive(false)
    }


    const addFavorite = (id) => {
        axios.put(`http://localhost:3001/entries/${id}`, {
            favorite: true
        }, { headers: { "Authorization": `Bearer ${user.data.token}` } }).then(response => {
            const updatedEntries = entries.map(entry => {
                if (entry.id === id) {
                    return { ...entry, favorite: true }
                } else {
                    return entry
                }
            })
            setEntries(updatedEntries)
        })

    }

    const delFavorite = (id) => {
        axios.put(`http://localhost:3001/entries/${id}`, {
            favorite: false
        }, { headers: { "Authorization": `Bearer ${user.data.token}` } }).then(response => {
            const updatedEntries = entries.map(entry => {
                if (entry.id === id) {
                    return { ...entry, favorite: false }
                } else {
                    return entry
                }
            })
            // setFavorites(favorites.filter(entry => entry.id !== id))
            setEntries(updatedEntries)
        })
    }



    return (
        <EntryContext.Provider value={{
            entries, setEntries, addEntry, deleteEntry,
            editEntry, toggleEdit, changeId, setChangeId, cancelEdit,
            active, currentDate, toggleForm, closeForm, addFavorite,
            delFavorite
        }}>
            {props.children}
        </EntryContext.Provider>
    )
}

export default EntryContextProvider

