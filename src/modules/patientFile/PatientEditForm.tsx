import { Card } from "antd"
import FormikInput from "../../_cloner/components/inputs/FormikInput"
import { Formik } from "formik"
import SimpleButton from "../../_cloner/components/buttons/SimpleButton"
import FormikDescription from "../../_cloner/components/inputs/FormikDescription"
import FormikDatepicker from "../../_cloner/components/inputs/FormikDatepicker"
import FormikSelect from "../../_cloner/components/selects/FormikSelect"
import Typography from "../../_cloner/components/typography/Typography"
import { useCreateNewPatient, useFetchPatient, useUpdatePatient } from "./core/_hooks"
import { IPatient } from "./core/_models"
import { toastify } from "../../_cloner/utils/toast"
import Backdrop from "../../_cloner/components/shared/Backdrop"
import CardWidget from "../../_cloner/components/shared/CardWidget"
import { FC, useEffect } from "react"
import { UseMutationResult } from "@tanstack/react-query"

const initialValues: IPatient = {
    firstName: "",
    lastName: "",
    nationalCode: "",
    mobile: "",
    whatsappNumber: "",
    homeNumber: "",
    birthDate: "",
    job: "",
    education: "",
    reagent: "",
    gender: 0,
    maritalStatus: 0,
    address: "",
    description: "",
}

const genderOptions = [
    { label: "مرد", value: 1 },
    { label: "زن", value: 2 },
]
const marridStatusOptions = [
    { label: "متاهل", value: 1 },
    { label: "مجرد", value: 2 },
]

interface IProps {
    id?: number
    onClose: () => void
    fetchPatients: UseMutationResult<any, Error, void, unknown>
}

const PatientEditForm: FC<IProps> = ({ id, onClose, fetchPatients }) => {
    const updateTools = useUpdatePatient()
    const fetchTools = useFetchPatient()

    useEffect(() => {
        fetchTools.mutate(id || 0)
    }, [id])

    const onSubmit = (values: IPatient) => {
        const formData = {
            ...values,
            id: id,
            gender: values.gender === 2 ? true : false,
            maritalStatus: values.maritalStatus === 2 ? true : false
        }
        updateTools.mutate(formData, {
            onSuccess: (response) => {
                if (response.isSuccedded) {
                    toastify("success", response.message)
                } else {
                    toastify("error", response.message)
                }
                fetchPatients.mutate()
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
                    text="ویرایش بیمار"
                    typographyTextClassName="text-secondary"
                />
                <Formik enableReinitialize initialValues={{
                    ...initialValues,
                    ...fetchTools.data,
                    gender: fetchTools.data?.gender === true ? 2 : 1,
                    maritalStatus: fetchTools.data?.maritalStatus === true ? 2 : 1,
                }} onSubmit={onSubmit}>
                    {({ handleSubmit }) => <form className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-16" onSubmit={handleSubmit}>
                        <FormikInput isRequired placeholder="نام" type="text" hasLabel={true} name="firstName" label="نام" />
                        <FormikInput isRequired placeholder="نام خانوادگی" type="text" hasLabel={true} name="lastName" label="نام خانوادگی" />
                        <FormikInput placeholder="کدملی" type="text" hasLabel={true} name="nationalCode" label="کدملی" />
                        <FormikInput isRequired placeholder="موبایل" type="text" hasLabel={true} name="mobile" label="موبایل" />
                        <FormikInput placeholder="شماره واتساپ" type="text" hasLabel={true} name="whatsappNumber" label="شماره واتساپ" />
                        <FormikInput placeholder="شماره منزل" type="text" hasLabel={true} name="homeNumber" label="شماره منزل" />
                        <FormikDatepicker placeholder="تاریخ تولد" isRequired={true} hasLabel={true} name="birthDate" label="تاریخ تولد" />
                        <FormikInput isRequired placeholder="شغل" type="text" hasLabel={true} name="job" label="شغل" />
                        <FormikInput isRequired placeholder="تحصیلات" type="text" hasLabel={true} name="education" label="تحصیلات" />
                        <FormikInput isRequired placeholder="معرف" type="text" hasLabel={true} name="reagent" label="معرف" />
                        <FormikSelect isRequired options={genderOptions} hasLabel={true} name="gender" label="جنسیت" />
                        <FormikSelect isRequired options={marridStatusOptions} hasLabel={true} name="maritalStatus" label="وضعیت تاهل" />
                        <FormikInput isRequired placeholder="آدرس" type="text" hasLabel={true} name="address" label="آدرس" />
                        <div className="lg:col-span-2">
                            <FormikDescription placeholder="توضیحات" type="text" hasLabel={true} name="description" label="توضیحات" />
                        </div>
                        <div className="flex justify-end items-end lg:col-span-3">
                            <SimpleButton onSubmit={() => handleSubmit()} text="ویرایش بیمار" btnTextClassName="!py-4" />
                        </div>
                    </form>}
                </Formik>
            </CardWidget>
        </>
    )
}

export default PatientEditForm