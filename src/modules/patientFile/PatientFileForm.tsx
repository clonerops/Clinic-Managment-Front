import { Formik } from "formik"
import SimpleButton from "../../_cloner/components/buttons/SimpleButton"
import FormikDescription from "../../_cloner/components/inputs/FormikDescription"
import FormikSelect from "../../_cloner/components/selects/FormikSelect"
import Typography from "../../_cloner/components/typography/Typography"
import { useCreateNewPatientFile } from "./core/_hooks"
import { IPatientFile } from "./core/_models"
import { toastify } from "../../_cloner/utils/toast"
import Backdrop from "../../_cloner/components/shared/Backdrop"
import CardWidget from "../../_cloner/components/shared/CardWidget"
import FormikDocuments from "../../_cloner/components/inputs/FormikDocuments"
import { UseMutationResult } from "@tanstack/react-query"
import { FC } from "react"
import { IPatient, IPatientFilter } from "../patient/core/_models"
import FormikDoctors from "../../_cloner/components/inputs/FormikDoctors"
import FormikDatepicker from "../../_cloner/components/inputs/FormikDatepicker"
import moment from "moment-jalaali"

const initialValues: IPatientFile = {
    fileCode: "",
    patientId: null,
    documentId: null,
    doctorId: null,
    description: "",
}


interface IProps {
    fetchPatients: UseMutationResult<any, Error, IPatientFilter, unknown>
    onClose: () => void
    patient: IPatient
}


const PatientFileForm: FC<IProps> = ({ fetchPatients, onClose, patient }) => {
    const createTools = useCreateNewPatientFile()

    console.log("patient",patient)

    const onSubmit = (values: IPatientFile) => {
        const formData = {
            ...values,
            patientId: patient.id,
            
        }
        createTools.mutate(formData, {
            onSuccess: (response) => {
                if (response.isSuccedded) {
                    toastify("success", response.message)
                } else {
                    toastify("error", response.message)
                }
                fetchPatients.mutate({})
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
                    text={`ثبت پرونده برای بیمار ${patient.firstName} ${patient.lastName}`}
                    typographyTextClassName="text-secondary"
                />

                <Formik initialValues={{
                    ...initialValues,
                    registerDate: moment(new Date(Date.now())).format("jYYYY/jMM/jDD")
                }} onSubmit={onSubmit}>
                    {({ handleSubmit }) => <form className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-16" onSubmit={handleSubmit}>
                        <FormikDocuments isRequired hasLabel name="documentId" label="نوع پرونده" />
                        <FormikDoctors isRequired hasLabel name="doctorId" label="پزشک معالج" />
                        <FormikDatepicker placeholder="" hasLabel name="registerDate" label="تاریخ ثبت" />
                        <div className="lg:col-span-3">
                            <FormikDescription placeholder="" type="text" hasLabel={true} name="description" label="توضیحات" />
                        </div>
                        <div className="flex justify-end items-end lg:col-span-3">
                            <SimpleButton onSubmit={() => handleSubmit()} text="ثبت پرونده برای بیمار" btnTextClassName="!py-4" />
                        </div>
                    </form>}
                </Formik>
            </CardWidget>
        </>
    )
}

export default PatientFileForm