import { Button } from "antd";
import { FC } from "react";

interface IProps {
    disabled?: boolean;
    btnClassName?: string;
    onSubmit?: () => void;
    children: React.ReactNode
}

const CustomButton: FC<IProps> = ({
    disabled = false,
    btnClassName,
    onSubmit,
    children
}) => {
    return (
        <Button
            disabled={disabled}
            onClick={onSubmit}
            size="large"
            className={`${btnClassName} bg-secondary transition-all border-none duration-300 rounded-md px-4 py-2 shadow-md hover:bg-violtly`}
        >
            {children}
        </Button>
    );
};

export default CustomButton;
