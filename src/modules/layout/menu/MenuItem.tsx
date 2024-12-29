import { toAbsoulteUrl } from "../../../_cloner/utils/absoluteUrl";
import Typography from "../../../_cloner/components/typography/Typography";
import SubMenuItem from "./SubMenuItem";
import { FC, useContext, useState, useEffect } from "react";
import { SidebarContext } from "../../../_cloner/context/sidebarContext";
import { useLocation, useNavigate } from "react-router-dom";
import { IMenu } from "./_model";

interface IProps {
    key: number;
    title: string | undefined;
    url: string | undefined;
    icon: string | undefined;
    subMenus:
        | {
              title: string;
              url: string;
          }[]
        | undefined;
}

const MenuItem: FC<IProps> = ({ key, title, url, icon, subMenus = [] }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const { sideOpen } = useContext(SidebarContext);
    const [subMenuOpen, setSubMenuOpen] = useState<boolean>(false);
    const [activeMenuIndex, setActiveMenuIndex] = useState<number | null>(null);

    useEffect(() => {
        // بررسی وضعیت فعال بودن منو و زیرمنوها
        const isActiveSubMenu = subMenus?.some(subMenu => location.pathname === subMenu.url);
        if (location.pathname === url || isActiveSubMenu) {
            setActiveMenuIndex(key);
        } else if(activeMenuIndex === key) {
            setActiveMenuIndex(null);
        }
    }, [location, url, subMenus, key]);

    const handleToggleSubMenu = () => {
        if (subMenus.length > 0) {
            setSubMenuOpen((prev) => !prev);
        } else {
            navigate(url || "");
        }
    };

    const isActive = activeMenuIndex === key;

    return (
        <div key={key}>
            {sideOpen ? (
                <>
                    <div
                        onClick={handleToggleSubMenu}
                        className={`flex items-center justify-between cursor-pointer py-2 px-4 rounded-md ${
                            isActive ? "bg-blueLight" : ""
                        }`}
                    >
                        <section className="flex items-center gap-x-2">
                            <img
                                src={toAbsoulteUrl(`/pictures/icons/${icon}.svg`)}
                                width={18}
                                height={18}
                                alt="image"
                                className="text-gray"
                            />
                            <Typography
                                text={title || ""}
                                type="h6"
                                typographyTextClassName={`${isActive ? "text-secondary" : "text-grayLight"} hover:text-secondary`}
                            />
                        </section>
                        {subMenus?.length > 0 && (
                            <>
                                {subMenuOpen ? (
                                    <img
                                        src={toAbsoulteUrl(
                                            "/pictures/icons/arrow-up-svgrepo-com.svg"
                                        )}
                                        width={18}
                                        height={18}
                                        alt="image"
                                        className="text-grayLight"
                                    />
                                ) : (
                                    <img
                                        src={toAbsoulteUrl(
                                            "/pictures/icons/arrow-down-svgrepo-com.svg"
                                        )}
                                        width={18}
                                        height={18}
                                        alt="image"
                                        className="text-grayLight"
                                    />
                                )}
                            </>
                        )}
                    </div>
                    {subMenuOpen &&
                        subMenus?.length > 0 &&
                        subMenus.map((item: IMenu, index) => (
                            <SubMenuItem
                                key={index}
                                icon={item.icon}
                                title={item.title}
                                url={item.url}
                                parentActive={isActive} // پاس دادن وضعیت فعالیت والد به زیرمنو
                            />
                        ))}
                </>
            ) : (
                <>
                    <div
                        className={`${
                            !sideOpen && "flex items-center justify-center"
                        } cursor-pointer py-2 px-4`}
                    >
                        <img
                            src={toAbsoulteUrl(
                                "/pictures/icons/dashboard-svgrepo-com.svg"
                            )}
                            width={24}
                            height={24}
                            alt="image"
                            className="text-grayLight"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default MenuItem;
