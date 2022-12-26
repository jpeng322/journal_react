import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()


const AuthContextProvider = (props) => {

    const [hasUser, setHasUser] = useState(false)

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
            console.log(response)
           setHasUser(true)
            setLoginMessage("Successfully logged in!")
            localStorage.setItem("user", JSON.stringify(response))
        })
            .catch(
                error => {
                    console.log(error)
                    setLoginMessage(JSON.parse(error.request.response).msg)
                    console.log(JSON.parse(error.request.response).msg)
                }
            )
    }

    const Logout = () => {
        console.log("item removed!")
        setHasUser(false)
        localStorage.removeItem("user")
    }

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            setHasUser(true)
        }
    }, [])

    console.log(hasUser)
    return (
        <AuthContext.Provider value={{ Signup, signupMessage, Login, loginMessage, Logout,  hasUser }} >
            {props.children}
        </AuthContext.Provider>

    )
}

export default AuthContextProvider