import React, { FC } from "react";
import { Modal } from "antd";

interface IProps {
    title: string;
    isOpen: boolean;
    onCancel: () => void;
    cancelText: string;
    children: React.ReactNode;
}

const WidthModal: FC<IProps> = ({
    title,
    isOpen,
    onCancel,
    cancelText,
    children,
}) => {
    return (
        <>
            <Modal
                centered
                width={1000}
                title={title}
                open={isOpen}
                onCancel={onCancel}
                cancelText={cancelText}
                footer={null}
                className="font-peyda-reqular"
            >
                {children}
            </Modal>
        </>
    );
};

export default WidthModal;
