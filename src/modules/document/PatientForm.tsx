import FormikInput from "../../_cloner/components/inputs/FormikInput"
import { Formik } from "formik"
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

const PatientForm = () => {
    const createTools = useCreateNewPatient()

    const onSubmit = (values: IPatient) => {
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
                        <FormikInput isRequired placeholder="" type="text" hasLabel={true} name="firstName" label="نام" />
                        <FormikInput isRequired placeholder="" type="text" hasLabel={true} name="lastName" label="نام خانوادگی" />
                        <FormikInput placeholder="" type="text" hasLabel={true} name="nationalCode" label="کدملی" />
                        <FormikInput isRequired placeholder="" type="text" hasLabel={true} name="mobile" label="موبایل" />
                        <FormikInput placeholder="" type="text" hasLabel={true} name="whatsappNumber" label="شماره واتساپ" />
                        <FormikInput placeholder="" type="text" hasLabel={true} name="homeNumber" label="شماره منزل" />
                        <FormikDatepicker placeholder="" isRequired={true} hasLabel={true} name="birthDate" label="تاریخ تولد" />
                        <FormikInput isRequired placeholder="" type="text" hasLabel={true} name="job" label="شغل" />
                        <FormikInput isRequired placeholder="" type="text" hasLabel={true} name="education" label="تحصیلات" />
                        <FormikInput isRequired placeholder="" type="text" hasLabel={true} name="reagent" label="معرف" />
                        <FormikSelect isRequired options={genderOptions} hasLabel={true} name="gender" label="جنسیت" />
                        <FormikSelect isRequired options={marridStatusOptions} hasLabel={true} name="maritalStatus" label="وضعیت تاهل" />
                        <FormikInput isRequired placeholder="" type="text" hasLabel={true} name="address" label="آدرس" />
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

export default PatientForm