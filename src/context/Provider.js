import React, { createContext, useState } from "react";

const initialState = {
  users: [],
  setUsers: () => {},
  modal: {},
  setModal: () => {},
  image: "",
  setImage: () => {},
  name: "",
  setName: () => {},
  outOfUse: null,
  setOutOfUse: () => {},
  gender: "",
  setGender: () => {},
  startDate: [],
  setStartDate: () => {},
  minSalary: "",
  setMinSalary: () => {},
  maxsalary: "",
  setMaxSalary: () => {},
};

export const AppContext = createContext(initialState);

function Provider(props) {
  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState({});
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [outOfUse, setOutOfUse] = useState("");
  const [gender, setGender] = useState("");
  const [startDate, setStartDate] = useState([]);
  const [minSalary, setMinSalary] = useState([]);
  const [maxsalary, setMaxSalary] = useState([]);

  return (
    <div>
      <AppContext.Provider
        value={{
          maxsalary,
          setMaxSalary,
          outOfUse,
          setOutOfUse,
          gender,
          setGender,
          startDate,
          setStartDate,
          minSalary,
          setMinSalary,
          users,
          setUsers,
          modal,
          setModal,
          setImage,
          image,
          name,
          setName,
        }}
      >
        {props.children}
      </AppContext.Provider>
    </div>
  );
}
export default Provider;
