
import React, { useContext, createContext, useState } from 'react'

export const UserContext = createContext();

export const UserProvider = (props) => {

  const { children } = props;
  const [user, setUser] = useState(undefined); // chua login
  const [tintuc, settintuc] = useState([])
  return (
    <UserContext.Provider value={{ user, setUser, tintuc,settintuc }}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContext