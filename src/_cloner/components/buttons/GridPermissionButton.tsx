import { Button, Tooltip } from "antd";
import { toAbsoulteUrl } from "../../utils/absoluteUrl";

const GridPermissionButton = () => {
    return (
        <Tooltip placement="topLeft" title={"دسترسی به کاربر"}>
            <Button type="primary">
                <img
                    src={toAbsoulteUrl(
                        "/pictures/icons/permission-svgrepo-com.svg"
                    )}
                    width={16}
                    height={16}
                />
            </Button>
        </Tooltip>
    );
};

export default GridPermissionButton;
