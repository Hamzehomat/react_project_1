import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();
const UserContextProvider = ({children})=>{
    const [userToken,setUserToken] = useState(localStorage.getItem('usertoken'))
    const [ Auth , setAuth] = useState(null);
    const getUserdata =()=>{
        if (userToken!=null){
            console.log(userToken)
            const decoded = jwtDecode(userToken);
            setAuth(decoded);
            console.log(decoded)
        }
    }
    useEffect (()=>{
        getUserdata();
    },[userToken])
    return <UserContext.Provider value={{setUserToken , setAuth}} >
    {children}
    </UserContext.Provider>
}
export default UserContextProvider