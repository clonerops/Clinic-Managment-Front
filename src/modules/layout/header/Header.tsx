import { FC } from "react";
import { Formik } from "formik";
import Avatar from "../../../_cloner/components/shared/Avatar";
import { toAbsoulteUrl } from "../../../_cloner/utils/absoluteUrl";
import SimpleInput from "../../../_cloner/components/inputs/SimpleInput";

interface IProps {
    toggleSidebar: () => void
    hasSerachInput?: boolean
}

const Header:FC<IProps> = ({toggleSidebar, hasSerachInput = true}) => {
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
                    <Formik onSubmit={() => {}} initialValues={{}}>
                        {() => <SimpleInput placeholder="جستجو..." />}
                    </Formik>
                }
                
            </div>
            <div className="flex items-center gap-x-4">
                <img src={toAbsoulteUrl('/pictures/icons/notification-svgrepo-com.svg')} alt="image" width={34} height={34} className="cursor-pointer" /> 
                <Avatar avatarDivClassName="bg-blueLight w-[48px] h-[48px]" />
                
            </div>
        </div>
    );
};

export default Header;
