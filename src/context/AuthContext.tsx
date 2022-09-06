import React, { useState } from "react";

interface User {
  user: {
    username: string;
    id: string;
    accessToken: string;
    refreshToken: string;
  };

  storeUser: (user: any) => void;
  removeUserFromStore: () => void;
}

export const AuthContext = React.createContext({} as User);

const AuthContextProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const storeUser = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };
  const removeUserFromStore = () => {
    localStorage.removeItem("user");
    setUser({});
  };
  return (
    <AuthContext.Provider value={{ user, storeUser, removeUserFromStore }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
