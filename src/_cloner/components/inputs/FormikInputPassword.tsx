import { Input } from "antd";
import { useField, useFormikContext } from "formik";
import { FC, useState } from "react";
import { getFormikFieldValidationProps } from "../../utils/GetFormikFieldValidationProps";
import { toAbsoulteUrl } from "../../utils/absoluteUrl";

interface IProps {
    name: string;
    placeholder: string;
    inputClassName?: string;
}

const FormikInputPassword: FC<IProps> = ({ name, placeholder,inputClassName, ...rest }) => {
    const [field] = useField({ name });
    const formikProps = useFormikContext();

    const [showPassword, setShowPassword] = useState<string>("password");

    const changeStateShowPassword = () => {
        setShowPassword(showPassword === "text" ? "password" : "text");
    };


    return (
        <div className="relative grid">
            <Input
                {...field}
                {...getFormikFieldValidationProps(formikProps, name)}
                {...rest}
                placeholder={placeholder}
                type={showPassword}
                className={`font-peyda-reqular ${inputClassName}`}
            />
            {showPassword === "password" ? (
                <img
                    onClick={changeStateShowPassword}
                    src={toAbsoulteUrl("/pictures/icons/eye.svg")}
                    width={20}
                    height={20}
                    className="cursor-pointer absolute top-4 left-4 "
                />
            ) : (
                <img
                    onClick={changeStateShowPassword}
                    src={toAbsoulteUrl("/pictures/icons/eye-off.svg")}
                    width={20}
                    height={20}
                    className="cursor-pointer absolute top-4 left-4 "
                />
            )}
        </div>
    );
};

export default FormikInputPassword;
