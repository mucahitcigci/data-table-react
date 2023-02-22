import { useContext, useLayoutEffect, useState } from "react";
import { AppContext } from "../context/Provider";
import { addUser, updateUser } from "../helpers/globalFunctions";
import useStoreData from "../hooks/useStoreData";
import BaseModal from "./BaseModal";
import UserForm from "./UserForm";

export default function AddNewUserModal({ visible, title }) {
  const { setModal, modal, users, setUsers, image, setImage } =
    useContext(AppContext);
  const [user, setUser] = useState();
  const { setData } = useStoreData();

  const handleOk = () => {
    console.log(user.outOfUse === true);
    let updatedArr =
      title === "Düzenle"
        ? updateUser([...users], modal, { ...user, image })
        : addUser([...users], {
            ...user,
            image,
            outOfUse: user.outOfUse ? true : false,
          });
    setData(updatedArr, "users");
    setUsers(updatedArr);
    setModal((prev) => ({ ...prev, visible: false }));
    setTimeout(() => {
      setImage("");
    }, 1000);
  };
  const handleCancel = () => {
    setModal((prev) => ({ ...prev, visible: false }));
    setTimeout(() => {
      setImage("");
    }, 1000);
  };
  useLayoutEffect(() => {
    setUser(modal);
  }, [modal]);

  return (
    <>
      <BaseModal
        title={modal.title}
        visible={modal.visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      >
        <UserForm
          setUser={setUser}
          user={user ?? modal}
          updateImage={modal.title === "Düzenle"}
        />
      </BaseModal>
    </>
  );
}
