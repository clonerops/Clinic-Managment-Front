import { useContext, useState } from "react";
import Typography from "../../../_cloner/components/typography/Typography";
import { toAbsoulteUrl } from "../../../_cloner/utils/absoluteUrl";
import { SidebarContext } from "../../../_cloner/context/sidebarContext";
import Avatar from "../../../_cloner/components/shared/Avatar";

const AsideAction = () => {
    const { sideOpen } = useContext(SidebarContext)
    const [openAction, setOpenAction] = useState<boolean>(false);

    const toggleOpenAction = () => {
        setOpenAction((prev) => !prev);
    };

    return (
        <div>
            {sideOpen &&
                <div
                    className={`transition-all !duration-700 overflow-hidden whitespace-nowrap items-start justify-between py-4 px-2 bg-blueLight bg-opacity-50 rounded-lg border border-blackMedium border-opacity-15
                        ${openAction ? "h-[150px]" : ""} ${sideOpen ? 'w-auto' : 'w-0'}`}
                >
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row items-center gap-x-2" onClick={toggleOpenAction}>
                            <Avatar avatarDivClassName="bg-white w-[34px] h-[34px]" />
                            <div className="flex flex-col" >
                                <Typography
                                    text="ابوالفضل معصومی"
                                    type="bodyXs"
                                    typographyTextClassName="text-primary font-bold"
                                />
                                <Typography
                                    text="کاربر ناشناس"
                                    type="subtitleXs"
                                    typographyTextClassName="text-primary"
                                />
                            </div>
                        </div>
                        <img
                            src={toAbsoulteUrl(
                                "/pictures/icons/menu-strawberry-svgrepo-com.svg"
                            )}
                            width={16}
                            height={16}
                            className="cursor-pointer"
                            alt="image"
                            onClick={toggleOpenAction}
                        />
                    </div>
                    {openAction && (
                        <div className="flex flex-col">
                            <div className="flex flex-row mt-8 cursor-pointer">
                                <img
                                    src={toAbsoulteUrl(
                                        "/pictures/icons/dot-small-svgrepo-com.svg"
                                    )}
                                    width={16}
                                    height={16}
                                    alt="image"
                                />
                                <Typography
                                    text="پروفایل"
                                    type="bodySm"
                                    typographyTextClassName="text-primary font-bold text-opacity-50 hover:text-opacity-100 transition"
                                />
                            </div>
                            <div className="flex flex-row mt-2 cursor-pointer">
                                <img
                                    src={toAbsoulteUrl(
                                        "/pictures/icons/dot-small-svgrepo-com.svg"
                                    )}
                                    width={16}
                                    height={16}
                                    alt="image"
                                />
                                <Typography
                                    text="خروج از حساب کاربری"
                                    type="bodySm"
                                    typographyTextClassName="text-primary font-bold text-opacity-50 hover:text-opacity-100 transition"
                                />
                            </div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default AsideAction;
