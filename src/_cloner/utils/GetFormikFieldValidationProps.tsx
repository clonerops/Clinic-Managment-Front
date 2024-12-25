import { FormikProps } from "formik";
import Typography from "../components/typography/Typography";

export const getFormikFieldValidationProps = (
  formikProps: FormikProps<any>,
  fieldName: string,
) => {
  const { touched, errors, getFieldProps } = formikProps;
  const error = touched?.[fieldName] && Boolean(errors?.[fieldName]);

  // const helpertext = <>{touched?.[fieldName] && errors?.[fieldName]}</>;
  const helpertext = touched?.[fieldName] && errors?.[fieldName] ? (
    <Typography type="bodyMd" text={errors[fieldName] as string} />
  ) : null;

  return { error: error, helpertext: helpertext, ...getFieldProps(fieldName) };
};
