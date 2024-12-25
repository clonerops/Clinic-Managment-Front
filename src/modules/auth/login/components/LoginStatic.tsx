import { toAbsoulteUrl } from "../../../../_cloner/utils/absoluteUrl";
import { RenderImages } from "./RenderImages";
import { RenderTypography } from "./RenderTypography";

const LoginStatic = () => {
    return (
        <>
            <div className="flex flex-col justify-center space-y-16 m-16">
                <img
                    src={toAbsoulteUrl("/pictures/images/Group8.png")}
                    className="w-[40px]"
                />
                <div className="flex gap-x-12 mt-16">
                    <RenderImages url="/pictures/images/640-logowhite.png" />
                </div>
                <div className="flex flex-col space-y-6">
                    <RenderTypography
                        text="سامانه مدیریت کلینیک به تن رو، مدیریت بیماران پرونده ها و مراجعات بیمار"
                    />
                </div>
            </div>
        </>
    );
};

export default LoginStatic;
