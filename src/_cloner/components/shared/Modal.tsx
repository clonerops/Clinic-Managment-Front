import React, { FC } from 'react';
import { Modal } from 'antd';

interface IProps {
    title: string
    isOpen: boolean
    onOk: () => void
    onCancel: () => void
    children: React.ReactNode
}

const SimpleModal:FC<IProps> = ({title, isOpen, onOk, onCancel, children}) => {
  return (
    <>
      <Modal title={title} open={isOpen} onOk={onOk} onCancel={onCancel}>
        {children}
      </Modal>
    </>
  );
};

export default SimpleModal;