import React, { useState } from 'react'

interface AuthContextData {
    user: {} | null
    setUser: React.Dispatch<React.SetStateAction<null>>
}

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState(null)

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
