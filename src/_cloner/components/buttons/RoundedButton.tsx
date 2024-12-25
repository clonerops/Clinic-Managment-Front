import { Button } from "antd";
import { FC } from "react";
import { toAbsoulteUrl } from "../../utils/absoluteUrl";

interface IProps {
    disabled?: boolean;
    btnClassName?: string;
    btnTextClassName?: string;
    svgName?: string;
    onSubmit?: () => void;
}

const RoundedButton: FC<IProps> = ({
    btnClassName,
    btnTextClassName,
    svgName,
    onSubmit,
    ...rest
}) => {
    return (
        <Button
            {...rest}
            onClick={onSubmit}
            shape="circle"
            className={`${btnClassName} bg-secondary w-[36px] h-[36px] transition-all border-none duration-300 shadow-md hover:!bg-violtly`}
        >
            <span className={`${btnTextClassName} text-white font-peyda-bold`}>
                <img src={toAbsoulteUrl(`/pictures/icons/${svgName}.svg`)} width={18} height={18} className="" />
            </span>
        </Button>
    );
};

export default RoundedButton;
