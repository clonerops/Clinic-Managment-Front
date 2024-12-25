import { FC } from "react";
import { toAbsoulteUrl } from "../../../../_cloner/utils/absoluteUrl";

export const RenderImages: FC<{ url: string }> = ({ url }): JSX.Element => {
  return <img src={toAbsoulteUrl(url)} className="w-[180px]" />;
};
