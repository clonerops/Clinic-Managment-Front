import { Button, Tooltip } from "antd";
import { toAbsoulteUrl } from "../../utils/absoluteUrl";
import { FC } from "react";

interface IProps {
    onClick?: () => void
}

const GridDeleteButton:FC<IProps> = ({onClick}) => {
    return (
        <Tooltip placement="topLeft" title={"حذف"}>
            <Button onClick={onClick} className="border-none bg-secondary hover:!bg-violtly">
                <img
                    src={toAbsoulteUrl(
                        "/pictures/icons/delete-svgrepo-com.svg"
                    )}
                    width={16}
                    height={16}
                />
            </Button>
        </Tooltip>
    );
};

export default GridDeleteButton;
