import { toAbsoulteUrl } from "../../../../_cloner/utils/absoluteUrl";
import { FC } from "react";

export const RenderSocialMedia: FC<{ url: string }> = ({ url }) => {
  return (
    <div className="w-[60px] h-[60px] cursor-pointer">
      <img
        src={toAbsoulteUrl(url)}
        className="hover:bg-white hover:shadow-md hover:rounded-md p-4"
      />
    </div>
  );
};
