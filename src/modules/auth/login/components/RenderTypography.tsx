import { FC } from "react";
import Typography from "../../../../_cloner/components/typography/Typography";

export const RenderTypography: FC<{ text: string }> = ({ text }) => {
  return (
    <Typography
      text={text}
      type="h5"
      typographyTextClassName="!text-white !leading-10"
    />
  );
};
