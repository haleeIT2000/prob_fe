import { createContext, useEffect, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
  }, [])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export { UserContext };
