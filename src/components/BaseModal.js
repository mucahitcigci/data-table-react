import { Modal } from "antd";

const BaseModal = ({ children, visible, handleOk, handleCancel, title }) => {
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
