import { Button, Tooltip } from "antd";
import { toAbsoulteUrl } from "../../utils/absoluteUrl";
import { FC } from "react";

interface IProps {
    onClick: () => void
}

const GridEditButton:FC<IProps> = ({onClick}) => {
    return (
        <Tooltip placement="topLeft" title={"ویرایش"}>
            <Button onClick={onClick} className="border-none bg-yellow hover:!bg-yellow1">
                <img
                    src={toAbsoulteUrl(
                        "/pictures/icons/edit-cover-1481-svgrepo-com.svg"
                    )}
                    width={16}
                    height={16}
                />
            </Button>
        </Tooltip>
    );
};

export default GridEditButton;
