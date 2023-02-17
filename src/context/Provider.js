import React, { createContext, useState } from "react";

const initialState = {
  users: [],
  setUsers: () => {},
  modal: {},
  setModal: () => {},
};

export const AppContext = createContext(initialState);

function Provider(props) {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState({});

  return (
    <div>
      <AppContext.Provider value={{ users, setUsers, modal, setModal }}>
        {props.children}
      </AppContext.Provider>
    </div>
  );
}
export default Provider;
