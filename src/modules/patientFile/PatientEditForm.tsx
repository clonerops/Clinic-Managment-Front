import { Formik } from "formik"
import SimpleButton from "../../_cloner/components/buttons/SimpleButton"
import FormikDescription from "../../_cloner/components/inputs/FormikDescription"
import Typography from "../../_cloner/components/typography/Typography"
import { useFetchPatientFile, useUpdatePatientFile } from "./core/_hooks"
import { IPatientFile } from "./core/_models"
import { toastify } from "../../_cloner/utils/toast"
import Backdrop from "../../_cloner/components/shared/Backdrop"
import CardWidget from "../../_cloner/components/shared/CardWidget"
import { FC, useEffect } from "react"
import { UseMutationResult } from "@tanstack/react-query"
import FormikDoctors from "../../_cloner/components/inputs/FormikDoctors"
import FormikDocuments from "../../_cloner/components/inputs/FormikDocuments"

const initialValues: IPatientFile = {
    fileCode: "",
    patientId: null,
    documentId: null,
    doctorId: null,
    description: "",
}

interface IProps {
    id?: number
    onClose: () => void
    fetchPatientFiles: UseMutationResult<any, Error, void, unknown>
}

const PatientFileEditForm: FC<IProps> = ({ id, onClose, fetchPatientFiles }) => {
    const updateTools = useUpdatePatientFile()
    const fetchTools = useFetchPatientFile()

    useEffect(() => {
        fetchTools.mutate(id || 0)
    }, [id])

    const onSubmit = (values: IPatientFile) => {
        const formData = {
            ...values,
            id: id,
        }
        updateTools.mutate(formData, {
            onSuccess: (response) => {
                if (response.isSuccedded) {
                    toastify("success", response.message)
                } else {
                    toastify("error", response.message)
                }
                fetchPatientFiles.mutate()
                onClose()
            }
        })
    }

    console.log(fetchTools.data)


    if (fetchTools.isPending) {
        return <Backdrop loading={fetchTools.isPending} />
    }
    return (
        <>
            {updateTools.isPending && <Backdrop loading={updateTools.isPending} />}
            <CardWidget>
                <Typography
                    type="h3"
                    text={`ویرایش پرونده بیمار ${fetchTools.data?.patientName}`}
                    typographyTextClassName="text-secondary"
                />
                <Formik enableReinitialize initialValues={{
                    ...initialValues,
                    ...fetchTools.data,
                    gender: fetchTools.data?.gender === true ? 2 : 1,
                    maritalStatus: fetchTools.data?.maritalStatus === true ? 2 : 1,
                }} onSubmit={onSubmit}>
                    {({ handleSubmit }) => <form className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-16" onSubmit={handleSubmit}>
                        <FormikDoctors placeholder="پزشک" hasLabel={true} name="doctorId" label="پزشک" />
                        <FormikDocuments placeholder="پرونده" hasLabel={true} name="documentId" label="پرونده" />
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

export default PatientFileEditForm