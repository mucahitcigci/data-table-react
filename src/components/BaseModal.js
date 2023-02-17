import { Button, Modal } from "antd";
const BaseModal = ({ children, visible, handleOk, handleCancel, title }) => {
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const showModal = () => {
  //     setIsModalOpen(true);
  //   };
  //   const handleOk = () => {
  //     setIsModalOpen(false);
  //   };
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };
  return (
    <>
      <Modal
        title={title}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {children}
      </Modal>
    </>
  );
};
export default BaseModal;
