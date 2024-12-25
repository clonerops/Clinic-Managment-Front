import { FC } from "react";
import Typography from "../../../_cloner/components/typography/Typography";
import { Link } from "react-router-dom";

interface IProps {
    key: number | undefined
    title: string | undefined
    url: string | undefined
}

const SubMenuItem:FC<IProps> = ({key, title, url}) => {
    return (
        <li key={key} className="flex items-center justify-between cursor-pointer py-2 px-4">
            <Link to={url || ""} className="flex items-center gap-x-2 pr-12">
                <Typography
                    text={title || ""}
                    type="bodySm"
                    typographyTextClassName="text-secondary"
                />
            </Link>
        </li>
    );
};

export default SubMenuItem;
