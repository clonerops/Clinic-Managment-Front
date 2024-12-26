import { Card } from "antd"
import FormikInput from "../../_cloner/components/inputs/FormikInput"
import { Formik } from "formik"
import SimpleButton from "../../_cloner/components/buttons/SimpleButton"
import FormikDescription from "../../_cloner/components/inputs/FormikDescription"
import FormikDatepicker from "../../_cloner/components/inputs/FormikDatepicker"
import FormikSelect from "../../_cloner/components/selects/FormikSelect"
import Typography from "../../_cloner/components/typography/Typography"
import { useCreateNewPatientFile } from "./core/_hooks"
import { IPatientFile } from "./core/_models"
import { toastify } from "../../_cloner/utils/toast"
import Backdrop from "../../_cloner/components/shared/Backdrop"
import CardWidget from "../../_cloner/components/shared/CardWidget"

const initialValues: IPatientFile = {
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

const PatientFileForm = () => {
    const createTools = useCreateNewPatientFile()

    const onSubmit = (values: IPatientFile) => {
        console.log(values)
        const formData = {
            ...values,
            gender: values.gender === 2 ? true : false,
            maritalStatus: values.maritalStatus === 2 ? true : false
        }
        createTools.mutate(formData, {
            onSuccess: (response) => {
                if (response.isSuccedded) {
                    toastify("success", response.message)
                } else {
                    toastify("error", response.message)
                }
            }
        })
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
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ handleSubmit }) => <form className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-16" onSubmit={handleSubmit}>
                        <FormikSelect isRequired options={genderOptions} hasLabel={true} name="gender" label="جنسیت" />
                        <FormikSelect isRequired options={marridStatusOptions} hasLabel={true} name="maritalStatus" label="وضعیت تاهل" />
                        <div className="lg:col-span-2">
                            <FormikDescription placeholder="" type="text" hasLabel={true} name="description" label="توضیحات" />
                        </div>
                        <div className="flex justify-end items-end lg:col-span-3">
                            <SimpleButton onSubmit={() => handleSubmit()} text="ثبت بیمار جدید" btnTextClassName="!py-4" />
                        </div>
                    </form>}
                </Formik>
            </CardWidget>
        </>
    )
}

export default PatientFileForm