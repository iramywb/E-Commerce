import { createContext, useState } from "react";

export const TokenContext = createContext()

export default function TokenProvider({children}) {
    const [token, setToken] = useState(localStorage.getItem('token'));

    return (
        <TokenContext.Provider value={{token, setToken}}>
            {children}
        </TokenContext.Provider>
    )
}