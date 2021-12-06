import React, { useState } from "react";

export const UserContext = React.createContext();

export const UserProvider = (props) => {
  const [user, changeUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, changeUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
