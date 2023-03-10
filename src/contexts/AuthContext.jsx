import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { EntryContext } from "./EntryContext";
export const AuthContext = createContext()


const AuthContextProvider = (props) => {
    // const {setEntries} = useContext(EntryContext)
    const [hasUser, setHasUser] = useState(false)
    const [accountName, setAccountName] = useState("")
    const [accountPw, setAccountPw] = useState("")
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const [user, setUser] = useState("")
    console.log(user)

    const [signupMessage, setSignupMessage] = useState("")
    const Signup = (username, password) => {
        setSignupMessage("")

        axios.post("http://localhost:3001/signup", { username, password }).then(response => {
            console.log(response)
            setSignupMessage("Successfully signed up!")
            localStorage.setItem("user", JSON.stringify(response))
        })
            .catch(
                error => {
                    console.log(error)
                    setSignupMessage(JSON.parse(error.request.response).msg)
                    console.log(JSON.parse(error.request.response).msg)
                }
            )
    }

    const [loginMessage, setLoginMessage] = useState("")

    const Login = (username, password) => {
        setLoginMessage("")

        axios.post("http://localhost:3001/login", { username, password }).then(response => {
            // console.log(response)
            setHasUser(true)
            setLoginMessage("Successfully logged in!")
            localStorage.setItem("user", JSON.stringify(response))
            const user = JSON.parse(localStorage.getItem("user"))
            setUser(user)
            console.log(user, hasUser, "rerender")
        })
            .catch(
                error => {
                    setLoginMessage(JSON.parse(error.request.response).msg)
                }
            )
    }

    const Logout = () => {
        console.log("item removed!")
        setHasUser(false)
        localStorage.removeItem("user")
        setUser("")
        // setEntries(null)
    }

    console.log(user)
    useEffect(() => {
        const userLocal = JSON.parse(localStorage.getItem('user'))
        console.log(userLocal)
        // const user = JSON.parse(localStorage.getItem("user"))
        if (userLocal) {
            setUser(userLocal)
            setHasUser(true)
            // setUser(user)
            // Login
            console.log(userLocal)
        }
    }, [])

    console.log(user)
    return (
        <AuthContext.Provider value={{ Signup, signupMessage, Login, loginMessage, accountName, setAccountName, accountPw, setAccountPw, Logout, user, setUser, hasUser }} >
            {props.children}
        </AuthContext.Provider>

    )
}

export default AuthContextProvider