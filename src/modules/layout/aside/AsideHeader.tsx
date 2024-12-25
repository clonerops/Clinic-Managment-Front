import { useContext } from "react";
import Typography from "../../../_cloner/components/typography/Typography";
import { toAbsoulteUrl } from "../../../_cloner/utils/absoluteUrl";
import { SidebarContext } from "../../../_cloner/context/sidebarContext";

const AsideHeader = () => {
    const {sideOpen} = useContext(SidebarContext)
    return (
        <>
            <section className="flex transition-all duration-700 flex-col justify-center items-center">
                <div className="relative">
                    {sideOpen &&
                        <div className="absolute top-0 left-16 flex justify-center items-center w-[48px] h-[28px] bg-greenLight rounded-full">
                            <Typography text="v1.1.1" type="subtitle" typographyTextClassName="text-green font-bold" />
                        </div>
                    }
                    <img
                        src={toAbsoulteUrl("/pictures/images/640-logowhite.png")}
                        width={48}
                        height={48}
                        alt="image"
                    />
                </div>
                <div className={`transition-all !duration-700 overflow-hidden whitespace-nowrap ${sideOpen ? 'w-auto' : 'w-0'}`}>
                    {sideOpen &&
                        <Typography
                            text="کلینیک زیبایی به تن رو"
                            type="h5"
                            typographyTextClassName="text-white"
                        />
                    }
                </div>
            </section>
        </>
    );
};

export default AsideHeader;
