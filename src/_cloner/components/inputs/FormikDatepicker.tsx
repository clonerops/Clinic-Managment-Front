import { forwardRef } from "react";
import { FormikErrors, useField, useFormikContext } from "formik";
import MultiDatepicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import cx from "classnames";
import moment from "moment-jalaali";
import { Input } from "antd";
import Typography from "../typography/Typography";
import { getFormikFieldValidationProps } from "../../utils/GetFormikFieldValidationProps";


type Props = {
    boxClassName?: string;
    name: string;
    label: string;
    value?: string;
    placeholder: string;
    inputClassName?: string;
    disabled?: boolean;
    hasLabel?: boolean;
    isRequired?: boolean;
    setFieldValue?: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<{}>>;
};

const FormikDatepicker = forwardRef((props: Props, ref) => {
    const { boxClassName, name, label, value, disabled, placeholder, inputClassName,hasLabel ,isRequired, ...rest } = props;

    const [field, , helpers] = useField({ name, value });
    const formikProps = useFormikContext();
    const validationProps: any = getFormikFieldValidationProps(formikProps, name);

    const handleChange = (date: any) => {
        if (date !== null) {
            // If no date is selected, set the date as usual
            const formattedDate = moment(new Date(date)).format("jYYYY/jMM/jDD");
            helpers.setValue(formattedDate);
        } else {
            helpers.setValue("");
        }
    };

    // const minDate = moment(new Date()).format("jYYYY/jMM/jDD");

    return (
        <>
            <div className={cx("flex flex-col w-full", boxClassName)}>
                {hasLabel && <label className="font-peyda-bold">{label} {isRequired ? <span className="text-secondary">*</span> : ""}</label>}
                <MultiDatepicker
                    {...field}
                    {...rest}
                    {...validationProps}
                    value={field.value || ""}
                    onChange={handleChange}
                    highlightToday={false}
                    locale={persian_fa}
                    disabled={disabled}
                    onOpenPickNewDate={false}
                    calendar={persian}
                    // minDate={minDate} 
                    className={cx("w-full")}
                    id={name}
                    render={
                        <Input
                            color="primary"
                            placeholder={placeholder}
                            size="large"
                            className={`font-peyda-reqular ${inputClassName}`}
                            disabled={disabled}
                            id={name}
                        />
                    }
                />
                {validationProps.error && (
                    <Typography
                        type="bodySm"
                        text={validationProps.helpertext || ""}
                        typographyTextClassName="text-secondary"
                    />

                )}
            </div >
        </>
    );
});

export default FormikDatepicker;
