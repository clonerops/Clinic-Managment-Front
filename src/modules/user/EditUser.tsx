import { Formik } from "formik"
import FormikInput from "../../_cloner/components/inputs/FormikInput"
import { useEditUser, useGetUser } from "./core/_hooks"
import { IUser } from "./core/_models"
import { FC, useEffect } from "react"
import SimpleButton from "../../_cloner/components/buttons/SimpleButton"
import { toastify } from "../../_cloner/utils/toast"
import { QueryObserverResult } from "@tanstack/react-query"

const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: ""
}

interface IProps {
    item: IUser | undefined
    onClose: () => void
    refetch: () => Promise<QueryObserverResult>;
}

const EditUser:FC<IProps> = ({item, onClose, refetch}) => {
    
    const userTools = useGetUser()
    const editTools = useEditUser()

    useEffect(() =>{
        userTools.mutate(item?.id || "")
    }, [item])

    const onSubmit = (values: IUser) => {
        const formData = {
            ...values,
        }
        editTools.mutate(formData, {
            onSuccess: (response) => {
                if(response.succeeded) {
                    toastify("success", "کاربر با موفقیت ویرایش شد")
                } else {
                    toastify("error", response.data.Message)
                }
                onClose()
                refetch()
            }
        })

    }

    if(userTools.isPending) {
        return <div>درحال بارگزاری...</div>
    }

  return (
    <Formik initialValues={{
        ...initialValues,
        ...userTools?.data?.data
    }} onSubmit={onSubmit}>
        {({handleSubmit, values}) => (
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FormikInput name="firstName" placeholder="نام" type="text" hasLabel={true} label="نام" />
                    <FormikInput name="lastName" placeholder="نام خانوادگی" type="text" hasLabel={true} label="نام خانوادگی"  />
                    <FormikInput name="userName" placeholder="نام کاربری" type="text" hasLabel={true} label="نام کاربری" />
                    <FormikInput name="email" placeholder="ایمیل" type="text" hasLabel={true} label="ایمیل" />
                </div>
                <div className="flex justify-end items-end mt-4">
                    <SimpleButton onSubmit={() => onSubmit(values)} text={userTools.isPending ? "درحال پردازش ..." : "ثبت و تایید عملیات"} />
                </div>
            </form>
        )}
    </Formik>
  )
}

export default EditUser