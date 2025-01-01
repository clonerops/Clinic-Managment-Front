import { Input } from "antd";
import { useField, useFormikContext } from "formik";
import { FC } from "react";
import { getFormikFieldValidationProps } from "../../utils/GetFormikFieldValidationProps";
import Typography from "../typography/Typography";

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
    const validationProps: any = getFormikFieldValidationProps(formikProps, name);

    return (
        <div className="flex flex-col w-full">
            {hasLabel && <label className="font-peyda-bold">{label} {isRequired ? <span className="text-secondary">*</span> : ""}</label>}
            <Input
                {...field}
                {...getFormikFieldValidationProps(formikProps, name)}
                {...rest}
                placeholder={placeholder}
                size="large"
                type={type}
                className={`font-peyda-reqular ${inputClassName}`}
            />
            {validationProps.error && (
                <Typography
                    type="bodySm"
                    text={validationProps.helpertext || ""}
                    typographyTextClassName="text-secondary"
                />

            )}

        </div>
    );
};

export default FormikInput;
