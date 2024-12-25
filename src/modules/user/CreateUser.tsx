import { Formik } from "formik"
import FormikInput from "../../_cloner/components/inputs/FormikInput"
import SimpleButton from "../../_cloner/components/buttons/SimpleButton"
import { useCreateUser } from "./core/_hooks"
import { IUser } from "./core/_models"
import { toastify } from "../../_cloner/utils/toast"
import { QueryObserverResult } from "@tanstack/react-query"
import { FC } from "react"

const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: ""
}

interface IProps {
    onClose: () => void
    refetch: () => Promise<QueryObserverResult>;
}

const CreateUser:FC<IProps> = ({onClose, refetch}) => {
    
    const userTools = useCreateUser()

    const onSubmit = (values: IUser) => {
        const formData = {
            ...values,
            userRoles: []
        }
        userTools.mutate(formData, {
            onSuccess: (response) => {
                if(response.succeeded) {
                    toastify("success", response.message)
                } else {
                    toastify("error", response.data.Message)
                }
                onClose()
                refetch()
            }
        })
    }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({handleSubmit, values}) => (
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormikInput name="firstName" placeholder="نام" type="text" hasLabel={true} label="نام" />
                    <FormikInput name="lastName" placeholder="نام خانوادگی" type="text" hasLabel={true} label="نام خانوادگی"  />
                    <FormikInput name="userName" placeholder="نام کاربری" type="text" hasLabel={true} label="نام کاربری" />
                    <FormikInput name="mobile" placeholder="موبایل" type="text" hasLabel={true} label="موبایل" />
                    <FormikInput name="email" placeholder="ایمیل" type="text" hasLabel={true} label="ایمیل" />
                    <FormikInput name="password" placeholder="رمز عبور" type="text" hasLabel={true} label="رمز عبور" />
                    <FormikInput name="confirmPassword" placeholder="تکرار رمز عبور" type="text" hasLabel={true} label="تکرار رمز عبور" />
                </div>
                <div className="flex justify-end items-end mt-4">
                    <SimpleButton onSubmit={() => onSubmit(values)} text={userTools.isPending ? "درحال پردازش ..." : "ثبت و تایید عملیات"} />
                </div>
            </form>
        )}
    </Formik>
  )
}

export default CreateUser