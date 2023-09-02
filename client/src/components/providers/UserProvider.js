import React, {useState, useEffect, createContext} from "react";

const UserContext = createContext();

function UserProvider({ children }){
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
          user ? setIsAdmin(user.isAdmin) : setIsAdmin(false);
        });
      }
    });
  }, []);


  return <UserContext.Provider value={{user, setUser, isAdmin, setIsAdmin}}> {children} </UserContext.Provider>;
}

export {UserContext, UserProvider };