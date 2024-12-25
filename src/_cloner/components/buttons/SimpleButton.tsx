import { Button } from "antd";
import { FC } from "react";

interface IProps {
    disabled?: boolean;
    btnClassName?: string;
    btnTextClassName?: string;
    text: string;
    onSubmit?: () => void;
}

const SimpleButton: FC<IProps> = ({
    disabled = false,
    btnClassName,
    btnTextClassName,
    text,
    onSubmit,
}) => {
    return (
        <Button
            disabled={disabled}
            onClick={onSubmit}
            size="large"
            className={`${btnClassName} bg-secondary transition-all border-none duration-300 rounded-md px-16 py-2 shadow-md hover:!bg-violtly`}
        >
            <span className={`${btnTextClassName} text-white font-peyda-bold`}>
                {text}
            </span>
        </Button>
    );
};

export default SimpleButton;
