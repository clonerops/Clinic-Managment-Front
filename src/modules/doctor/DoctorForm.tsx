import FormikInput from "../../_cloner/components/inputs/FormikInput"
import { Formik } from "formik"
import SimpleButton from "../../_cloner/components/buttons/SimpleButton"
import FormikDescription from "../../_cloner/components/inputs/FormikDescription"
import Typography from "../../_cloner/components/typography/Typography"
import { useCreateNewDoctor } from "./core/_hooks"
import { IDoctor } from "./core/_models"
import { toastify } from "../../_cloner/utils/toast"
import Backdrop from "../../_cloner/components/shared/Backdrop"
import CardWidget from "../../_cloner/components/shared/CardWidget"
import { UseMutationResult } from "@tanstack/react-query"
import { FC } from "react"

const initialValues: IDoctor = {
    firstName: "",
    lastName: "",
    nationalCode: "",
    mobile: "",
    description: "",
}

interface IProps {
    fetchDoctors: UseMutationResult<any, Error, void, unknown>
    onClose: () => void
}

const DoctorForm:FC<IProps> = ({fetchDoctors, onClose}) => {
    const createTools = useCreateNewDoctor()

    const onSubmit = (values: IDoctor) => {
        createTools.mutate(values, {
            onSuccess: (response) => {
                if (response.isSuccedded) {
                    toastify("success", response.message)
                } else {
                    toastify("error", response.message)
                }
                fetchDoctors.mutate()
                onClose()
            }
        })
    }

    return (
        <>
            {createTools.isPending && <Backdrop loading={createTools.isPending} />}
            <CardWidget>
                <Typography
                    type="h3"
                    text="ثبت پزشک جدید"
                    typographyTextClassName="text-secondary"
                />
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ handleSubmit }) => <form className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-16" onSubmit={handleSubmit}>
                        <FormikInput isRequired placeholder="" type="text" hasLabel={true} name="firstName" label="نام" />
                        <FormikInput isRequired placeholder="" type="text" hasLabel={true} name="lastName" label="نام خانوادگی" />
                        <FormikInput placeholder="" type="text" hasLabel={true} name="nationalCode" label="کدملی" />
                        <FormikInput isRequired placeholder="" type="text" hasLabel={true} name="mobile" label="موبایل" />
                        <div className="lg:col-span-2">
                            <FormikDescription placeholder="" type="text" hasLabel={true} name="description" label="توضیحات" />
                        </div>
                        <div className="flex justify-end items-end lg:col-span-3">
                            <SimpleButton onSubmit={() => handleSubmit()} text="ثبت نوع پزشک جدید" btnTextClassName="!py-4" />
                        </div>
                    </form>}
                </Formik>
            </CardWidget>
        </>
    )
}

export default DoctorForm