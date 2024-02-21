import { createContext, useState } from "react";

const UserType = createContext();

const UserContext = ({children}) => {
    const [user, setUser] = useState();
    const [token, setToken] = useState(sessionStorage.getItem("authToken"))
 
    return (
        <UserType.Provider value={{user, setUser, token, setToken}}>
            {children}
        </UserType.Provider>
    )
}

export {UserType, UserContext};

