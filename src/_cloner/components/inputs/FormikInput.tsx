import { Input } from "antd";
import { useField, useFormikContext } from "formik";
import { FC } from "react";
import { getFormikFieldValidationProps } from "../../utils/GetFormikFieldValidationProps";

interface IProps {
    hasLabel?: boolean;
    label?: string;
    name: string;
    placeholder: string;
    type: string;
    inputClassName?: string;
    isRequired?: boolean;
}

const FormikInput: FC<IProps> = ({
    hasLabel = false,
    label,
    name,
    placeholder,
    type,
    inputClassName,
    isRequired,
    ...rest
}) => {
    const [field] = useField({ name });
    const formikProps = useFormikContext();

    return (
        <div className="flex flex-col w-full">
            {hasLabel && <label className="font-peyda-bold">{label} {isRequired ?<span className="text-secondary">*</span> : ""}</label>}
            <Input
                {...field}
                {...getFormikFieldValidationProps(formikProps, name)}
                {...rest}
                placeholder={placeholder}
                size="large"
                type={type}
                className={`font-peyda-reqular ${inputClassName}`}
            />
        </div>
    );
};

export default FormikInput;
