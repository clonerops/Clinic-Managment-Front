import FormikInput from "../../_cloner/components/inputs/FormikInput"
import { Formik } from "formik"
import SimpleButton from "../../_cloner/components/buttons/SimpleButton"
import FormikDescription from "../../_cloner/components/inputs/FormikDescription"
import Typography from "../../_cloner/components/typography/Typography"
import { useFetchDoctor, useUpdateDoctor } from "./core/_hooks"
import { IDoctor, IDoctorFilter } from "./core/_models"
import { toastify } from "../../_cloner/utils/toast"
import Backdrop from "../../_cloner/components/shared/Backdrop"
import CardWidget from "../../_cloner/components/shared/CardWidget"
import { FC, useEffect } from "react"
import { UseMutationResult } from "@tanstack/react-query"

const initialValues: IDoctor = {
    firstName: "",
    lastName: "",
    nationalCode: "",
    mobile: "",
    description: "",
}


interface IProps {
    id?: number
    onClose: () => void
    fetchDoctors: UseMutationResult<any, Error, IDoctorFilter, unknown>
}

const DoctorEditForm: FC<IProps> = ({ id, onClose, fetchDoctors }) => {
    const updateTools = useUpdateDoctor()
    const fetchTools = useFetchDoctor()

    useEffect(() => {
        fetchTools.mutate(id || 0)
    }, [id])

    const onSubmit = (values: IDoctor) => {
        const formData = {
            ...values,
            id: id
        }
        console.log(formData)
        updateTools.mutate(formData, {
            onSuccess: (response) => {
                if (response.isSuccedded) {
                    toastify("success", response.message)
                } else {
                    toastify("error", response.message)
                }
                fetchDoctors.mutate({})
                onClose()
            }
        })
    }

    if (fetchTools.isPending) {
        return <Backdrop loading={fetchTools.isPending} />
    }
    return (
        <>
            {updateTools.isPending && <Backdrop loading={updateTools.isPending} />}
            <CardWidget>
                <Typography
                    type="h3"
                    text="ویرایش پزشک"
                    typographyTextClassName="text-secondary"
                />
                <Formik enableReinitialize initialValues={{
                    ...initialValues,
                    ...fetchTools.data,
                }} onSubmit={onSubmit}>
                    {({ handleSubmit }) => <form className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-16" onSubmit={handleSubmit}>
                        <FormikInput isRequired placeholder="" type="text" hasLabel={true} name="firstName" label="نام" />
                        <FormikInput isRequired placeholder="" type="text" hasLabel={true} name="lastName" label="نام خانوادگی" />
                        <FormikInput placeholder="" type="text" hasLabel={true} name="nationalCode" label="کدملی" />
                        <FormikInput isRequired placeholder="" type="text" hasLabel={true} name="mobile" label="موبایل" />
                        <div className="lg:col-span-2">
                            <FormikDescription placeholder="توضیحات" type="text" hasLabel={true} name="description" label="توضیحات" />
                        </div>
                        <div className="flex justify-end items-end lg:col-span-3">
                            <SimpleButton onSubmit={() => handleSubmit()} text="ویرایش پزشک" btnTextClassName="!py-4" />
                        </div>
                    </form>}
                </Formik>
            </CardWidget>
        </>
    )
}

export default DoctorEditForm