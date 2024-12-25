import React from 'react';
import { Checkbox } from 'antd';
import { useFormikContext } from 'formik';

interface Option {
    value: string;
    label: string;
}

interface CheckboxGroupProps {
    name: string;
    label: string;
    boxClassName?: string;
    options: Option[];
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ name, boxClassName, options }) => {
    const { setFieldValue, values }: any = useFormikContext();

    const handleCheckboxChange = (optionValue: string) => {
        const currentValues = values[name] || [];

        if (currentValues.includes(optionValue)) {
            const updatedValues = currentValues.filter((value: any) => value !== optionValue);
            setFieldValue(name, updatedValues);
        } else {
            const updatedValues = [...currentValues, optionValue];
            setFieldValue(name, updatedValues);
        }
    };

    console.log("opetions", options)

    return (
        <div className={boxClassName}>            
            {options?.map((option) => (
                <Checkbox
                    key={option.value}
                    checked={(values[name] || []).includes(option.value)}
                    onChange={() => handleCheckboxChange(option.value)}
                >
                    {option.label}
                </Checkbox>
            ))}
        </div>
    );
};

export default CheckboxGroup;
