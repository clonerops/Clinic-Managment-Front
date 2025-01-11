import { Formik, FormikProps } from "formik"
import SimpleButton from "../../_cloner/components/buttons/SimpleButton"
import FormikDescription from "../../_cloner/components/inputs/FormikDescription"
import Typography from "../../_cloner/components/typography/Typography"
import { useCreateNewReferral } from "./core/_hooks"
import { IReferral } from "./core/_models"
import { toastify } from "../../_cloner/utils/toast"
import Backdrop from "../../_cloner/components/shared/Backdrop"
import CardWidget from "../../_cloner/components/shared/CardWidget"
import { UseMutationResult } from "@tanstack/react-query"
import { FC, useRef } from "react"
import FormikDatepicker from "../../_cloner/components/inputs/FormikDatepicker"
import moment from "moment-jalaali"
import { IPatientFile } from "../patientFile/core/_models"
import FormikInput from "../../_cloner/components/inputs/FormikInput"

const initialValues: IReferral = {
    referralReason: "",
    referralDescription: "",
    referralDate: "",
    patientFileId: 0,
}


interface IProps {
    fetchPatientFiles: UseMutationResult<any, Error, void, unknown>
    onClose: () => void
    patientFile: IPatientFile
}


const ReferralForm: FC<IProps> = ({ fetchPatientFiles, onClose, patientFile }) => {
    const formikRef: any = useRef<FormikProps<any>>()

    const createTools = useCreateNewReferral()

    const onSubmit = (values: IReferral) => {
        const formData = {
            ...values,
            patientFileId: patientFile.id,

        }
        createTools.mutate(formData, {
            onSuccess: (response) => {
                if (response.isSuccedded) {
                    toastify("success", response.message)
                } else {
                    toastify("error", response.message)
                }
                fetchPatientFiles.mutate()
                onClose()
                formikRef.current?.resetForm()
            }
        })
    }

    return (
        <>
            {createTools.isPending && <Backdrop loading={createTools.isPending} />}
            <CardWidget>
                <Typography
                    type="h3"
                    text={`ثبت مراجعه برای بیمار ${patientFile.patientName}`}
                    typographyTextClassName="text-secondary"
                />

                <Formik innerRef={formikRef} initialValues={{
                    ...initialValues,
                    referralDate: moment(new Date(Date.now())).format("jYYYY/jMM/jDD")
                }} onSubmit={onSubmit}>
                    {({ handleSubmit }) => <form className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-16" onSubmit={handleSubmit}>
                        <FormikInput placeholder="" type="text" hasLabel={true} name="referralReason" label="علت مراجعه" />
                        <FormikDatepicker placeholder="" hasLabel={true} name="referralDate" label="تاریخ مراجعه" />
                        <div className="lg:col-span-2">
                            <FormikDescription placeholder="" type="text" hasLabel={true} name="referralDescription" label="توضیحات پزشک" />
                        </div>
                        <div className="flex justify-end items-end lg:col-span-3">
                            <SimpleButton onSubmit={() => handleSubmit()} text="ثبت مراجعه برای بیمار" btnTextClassName="!py-4" />
                        </div>
                    </form>}
                </Formik>
            </CardWidget>
        </>
    )
}

export default ReferralForm