import { memo } from "react";
import { useField, useFormikContext } from "formik";
import { Select, Form, Typography, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import cx from "classnames";
import { getFormikFieldValidationProps } from "../../utils/GetFormikFieldValidationProps";

const { Option } = Select;

export type FormikSelectPropsType<Value> = {
    name: string;
    label: string;
    hasLabel?: boolean | string;
    isRequired?: boolean | string;
    value?: any;
    boxClassName?: string;
    disabled?: boolean;
    onChange?: (selectedValue: any) => void;
    options: {
        label: string;
        value: any;
    }[];
};

const FormikSelect = <Value,>(props: FormikSelectPropsType<Value>) => {
    const { boxClassName, name, label, hasLabel, disabled, options, isRequired, onChange, ...rest } =
        props;

    const [field] = useField({ name });
    const formikProps = useFormikContext();

    const handleSelectChange = (value: any) => {
        if (onChange) {
            onChange(value);
        }
        formikProps.setFieldValue(name, value);
    };

    const handleClear = () => {
        formikProps.setFieldValue(name, ""); // Clear the field value
    };

    const formikValidationProps = getFormikFieldValidationProps(
        formikProps,
        name
    );

    return (
        <div className={cx("w-full", boxClassName)}>
            {hasLabel && <label className="font-peyda-bold">{label} {isRequired ? <span className="text-secondary">*</span> : ""}</label>}
            <Form.Item
                // label={label}
                validateStatus={formikValidationProps.error ? "error" : ""}
                help={formikValidationProps.helpertext}
            >
                <Select
                    {...field}
                    {...rest}
                    value={field.value || ""}
                    onChange={handleSelectChange}
                    size="large"
                    disabled={disabled}
                    suffixIcon={
                        field.value ? (
                            <Button
                                type="text"
                                icon={<CloseCircleOutlined />}
                                onClick={handleClear}
                            />
                        ) : undefined
                    }
                >
                    {options.map((option, index) => (
                        <Option key={index} value={option.value}>
                            {option.label}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            {formikValidationProps.error && (
                <Typography.Text type="danger">
                    {formikValidationProps.helpertext}
                </Typography.Text>
            )}
        </div>
    );
};

export default memo(FormikSelect);
