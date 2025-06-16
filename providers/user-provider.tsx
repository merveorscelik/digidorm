import React, { createContext, useContext, useState } from "react"

export interface User {
    name: String
    email: String
}

interface UserContext {
    user: User | undefined | null
    setUser: (user: User) => void
}

const UserContext = createContext<UserContext | undefined>({
    user: {
        email: 'unauthenticated@gmail.com',
        name: 'unauthenticated'
    },
    setUser: () => null,
})

export function UserProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null> ()

    return (
        <UserContext.Provider value={{
            user,
            setUser
        }}>
            {children}
        </UserContext.Provider>

    )

}

export const useUser = () => {
    const context = useContext(UserContext)

    if (context === undefined) {
        throw new Error("This context must be used inside the UserProvider, sir")
    }

    return context
}