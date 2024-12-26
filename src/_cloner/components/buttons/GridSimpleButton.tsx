import { Button, Tooltip } from "antd";
import { toAbsoulteUrl } from "../../utils/absoluteUrl";
import { FC } from "react";

interface IProps {
    onClick: () => void
    icon: string
    title: string
    btnClassName: string
}

const GridSimpleButton: FC<IProps> = ({ onClick, icon, title, btnClassName }) => {
    return (
        <Tooltip placement="topLeft" title={title}>
            <Button onClick={onClick} className={`border-none ${btnClassName}`}>
                <img
                    src={toAbsoulteUrl(`/pictures/icons/${icon}.svg`)}
                    width={16}
                    height={16}
                />
            </Button>
        </Tooltip>
    );
};

export default GridSimpleButton;
