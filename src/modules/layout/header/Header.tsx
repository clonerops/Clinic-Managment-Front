import { FC } from "react";
import { Formik } from "formik";
import Avatar from "../../../_cloner/components/shared/Avatar";
import { toAbsoulteUrl } from "../../../_cloner/utils/absoluteUrl";
import SimpleInput from "../../../_cloner/components/inputs/SimpleInput";
import type { MenuProps } from 'antd';
import Typography from "../../../_cloner/components/typography/Typography";
import DropdownComponent from "../../../_cloner/components/shared/Dropdown";
import Cookies from "js-cookie";

interface IProps {
    toggleSidebar: () => void
    hasSerachInput?: boolean
}

const Header: FC<IProps> = ({ toggleSidebar, hasSerachInput = true }) => {

    const handleLogOut = () => {
        Cookies.remove('token')
        window.location.reload();
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div className="" onClick={handleLogOut}>
                    <Typography text='خروج از حساب کاربری' type='h6' />
                </div>
            ),
        },
    ];

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-4">
                <img
                    onClick={toggleSidebar}
                    src="/pictures/icons/menu-alt-01-svgrepo-com.svg"
                    width={34}
                    height={34}
                    className="cursor-pointer"
                    alt="menu icon"
                />
                {hasSerachInput &&
                    <Formik onSubmit={() => { }} initialValues={{}}>
                        {() => <SimpleInput placeholder="جستجو..." />}
                    </Formik>
                }

            </div>
            <div className="flex items-center gap-x-4">
                <img src={toAbsoulteUrl('/pictures/icons/notification-svgrepo-com.svg')} alt="image" width={34} height={34} className="cursor-pointer" />
                <DropdownComponent items={items}>
                    <Avatar avatarDivClassName="bg-blueLight w-[48px] h-[48px]" />
                </DropdownComponent>
            </div>
        </div>
    );
};

export default Header;
