import { createContext, useState, useEffect, useContext } from "react"

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('users');
        return savedUsers ? JSON.parse(savedUsers) : [];
    });
    const [currentUser, setCurrentUser] = useState(() => {
        const savedCurrent = localStorage.getItem('currentUser');
        return savedCurrent ? JSON.parse(savedCurrent) : null;
    });

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users])

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [currentUser]);

    return (
        <UsersContext.Provider value={{ users, setUsers, currentUser, setCurrentUser }}>
            {children}
        </UsersContext.Provider>
    )
}

export const useAuth = () => useContext(UsersContext);