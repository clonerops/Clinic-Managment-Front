import { Alert, Card } from "antd"
import FormikInput from "../../_cloner/components/inputs/FormikInput"
import { Formik, FormikState } from "formik"
import SimpleButton from "../../_cloner/components/buttons/SimpleButton"
import FormikDescription from "../../_cloner/components/inputs/FormikDescription"
import FormikDatepicker from "../../_cloner/components/inputs/FormikDatepicker"
import FormikSelect from "../../_cloner/components/selects/FormikSelect"
import Typography from "../../_cloner/components/typography/Typography"
import { useCreateNewPatient } from "./core/_hooks"
import { IPatient } from "./core/_models"
import { toastify } from "../../_cloner/utils/toast"
import Backdrop from "../../_cloner/components/shared/Backdrop"
import CardWidget from "../../_cloner/components/shared/CardWidget"
import WidthModal from "../../_cloner/components/shared/WidthModal"
import { useState } from "react"
import PatientFileForm from "../patientFile/PatientFileForm"
import { createPatientValidations } from "./core/_validation"

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
    gender: 2,
    maritalStatus: 2,
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

const PatientForm = () => {
    const createTools = useCreateNewPatient()
    const [openPatientFileModal, setOpenPatientFileModal] = useState<boolean>(false)
    const [isShowPatientDetail, setIsShowPatientDetail] = useState<boolean>(false)
    const [patientItem, setPatientItem] = useState<IPatient>({})

    const handleSetPatientItem = (item: IPatient) => {
        const itemData = {
            ...item,
            id: createTools.data?.data?.id
        }
        setPatientItem(itemData)
        setOpenPatientFileModal(true)
    }

    const onSubmit = (values: IPatient) => {
        const formData = {
            ...values,
            gender: values.gender === 2 ? true : false,
            maritalStatus: values.maritalStatus === 2 ? true : false
        }
        createTools.mutate(formData, {
            onSuccess: (response) => {
                if (response.isSuccedded) {
                    toastify("success", response.message)
                    setIsShowPatientDetail(true)
                } else {
                    toastify("error", response.message)
                }
            }
        })
    }

    const handleReset = (resetForm: (nextState?: Partial<FormikState<IPatient>> | undefined) => void) => {
        resetForm()
        setIsShowPatientDetail(false)
    }

    return (
        <>
            {createTools.isPending && <Backdrop loading={createTools.isPending} />}
            <CardWidget>
                <Typography
                    type="h3"
                    text="ثبت بیمار جدید"
                    typographyTextClassName="text-secondary"
                />
                {isShowPatientDetail &&
                    <Alert className="mt-4" message={
                        <div className="flex items-center justify-center gap-x-4">
                            <Typography text="کد بیمار" type="bodyMd" />
                            <Typography text={createTools.data.data.code} type="h2" typographyTextClassName="!text-secondary" />
                        </div>
                    } type="info" />
                }
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={createPatientValidations}>
                    {({ handleSubmit, values, resetForm }) => <form className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-8" onSubmit={handleSubmit}>
                        <FormikInput isRequired placeholder="" type="text" hasLabel={true} name="firstName" label="نام" />
                        <FormikInput isRequired placeholder="" type="text" hasLabel={true} name="lastName" label="نام خانوادگی" />
                        <FormikInput placeholder="" type="text" hasLabel={true} name="nationalCode" label="کدملی" />
                        <FormikInput isRequired placeholder="" type="text" hasLabel={true} name="mobile" label="موبایل" />
                        <FormikInput placeholder="" type="text" hasLabel={true} name="whatsappNumber" label="شماره واتساپ" />
                        <FormikInput placeholder="" type="text" hasLabel={true} name="homeNumber" label="شماره منزل" />
                        <FormikDatepicker placeholder="" isRequired={true} hasLabel={true} name="birthDate" label="تاریخ تولد" />
                        <FormikInput placeholder="" type="text" hasLabel={true} name="job" label="شغل" />
                        <FormikInput placeholder="" type="text" hasLabel={true} name="education" label="تحصیلات" />
                        <FormikInput placeholder="" type="text" hasLabel={true} name="reagent" label="معرف" />
                        <FormikSelect options={genderOptions} hasLabel={true} name="gender" label="جنسیت" />
                        <FormikSelect options={marridStatusOptions} hasLabel={true} name="maritalStatus" label="وضعیت تاهل" />
                        <FormikInput isRequired placeholder="" type="text" hasLabel={true} name="address" label="آدرس" />
                        <div className="lg:col-span-2">
                            <FormikDescription placeholder="" type="text" hasLabel={true} name="description" label="توضیحات" />
                        </div>
                        <div className="flex justify-between items-between gap-x-4 lg:col-span-3">
                            {isShowPatientDetail &&
                                <SimpleButton onSubmit={() => handleSetPatientItem(values)} text={`ثبت پرونده برای${createTools.data?.data?.firstName} ${createTools.data?.data?.lastName}`} btnClassName="!py-4 !bg-primary" />
                            }
                            <SimpleButton onSubmit={() => handleReset(resetForm)} text="خالی کردن فرم" btnTextClassName="" btnClassName="!bg-yellow" />
                            <SimpleButton onSubmit={() => handleSubmit()} text="ثبت بیمار جدید" btnTextClassName="!py-4" />
                        </div>
                    </form>}
                </Formik>
            </CardWidget>
            {/* PatientF File */}
            <WidthModal
                isOpen={openPatientFileModal}
                onCancel={() => setOpenPatientFileModal(false)}
                cancelText="انصراف"
                title=""
            >
                <PatientFileForm onClose={() => setOpenPatientFileModal(false)} patient={patientItem || {}} />
            </WidthModal>

        </>
    )
}

export default PatientForm