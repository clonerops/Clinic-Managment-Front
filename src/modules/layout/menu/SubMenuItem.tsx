import { FC } from "react";
import Typography from "../../../_cloner/components/typography/Typography";
import { Link } from "react-router-dom";
import { toAbsoulteUrl } from "../../../_cloner/utils/absoluteUrl";

interface IProps {
    key: number | undefined
    title: string | undefined
    icon: string | undefined
    url: string | undefined
    parentActive: boolean
}

const SubMenuItem: FC<IProps> = ({ key, title, url, parentActive, icon }) => {
    return (
        <li key={key} className={`flex items-center justify-between cursor-pointer py-2`}>
            <Link to={url || ""} className="flex items-center gap-x-0 pr-10">
                <img
                    src={toAbsoulteUrl(`/pictures/icons/${icon}.svg`)}
                    width={18}
                    height={18}
                    alt="image"
                    className="text-gray"
                />

                <Typography
                    text={title || ""}
                    type="bodySm"
                    typographyTextClassName={`text-green font-bold ${parentActive ? "text-green" : ""}`}
                />
            </Link>
        </li>
    );
};

export default SubMenuItem;
