import { Formik } from "formik"
import SimpleButton from "../../_cloner/components/buttons/SimpleButton"
import FormikDescription from "../../_cloner/components/inputs/FormikDescription"
import Typography from "../../_cloner/components/typography/Typography"
import { useFetchReferral, useUpdateReferral } from "./core/_hooks"
import { IReferral } from "./core/_models"
import { toastify } from "../../_cloner/utils/toast"
import Backdrop from "../../_cloner/components/shared/Backdrop"
import CardWidget from "../../_cloner/components/shared/CardWidget"
import { FC, useEffect } from "react"
import { UseMutationResult } from "@tanstack/react-query"
import FormikInput from "../../_cloner/components/inputs/FormikInput"
import FormikDatepicker from "../../_cloner/components/inputs/FormikDatepicker"

const initialValues: IReferral = {
    referralReason: "",
    referralDescription: "",
    referralDate: "",
    patientFileId: 0,
}

interface IProps {
    id?: number
    onClose: () => void
    fetchReferrals: UseMutationResult<any, Error, void, unknown>
}

const ReferralEditForm: FC<IProps> = ({ id, onClose, fetchReferrals }) => {
    const updateTools = useUpdateReferral()
    const fetchTools = useFetchReferral()

    useEffect(() => {
        fetchTools.mutate(id || 0)
    }, [id])

    console.log(fetchReferrals)
    console.log(fetchTools.data)

    const onSubmit = (values: IReferral) => {
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
                fetchReferrals.mutate()
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
                    text="ویرایش مراجعه بیمار"
                    typographyTextClassName="text-secondary"
                />
                <Formik enableReinitialize initialValues={{
                    ...initialValues,
                    ...fetchTools.data,
                }} onSubmit={onSubmit}>
                    {({ handleSubmit }) => <form className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-16" onSubmit={handleSubmit}>
                        <FormikInput placeholder="" type="text" hasLabel={true} name="referralReason" label="علت مراجعه" />
                        <FormikDatepicker placeholder="" hasLabel={true} name="referralDate" label="تاریخ مراجعه" />
                        <div className="lg:col-span-2">
                            <FormikDescription placeholder="" type="text" hasLabel={true} name="referralDescription" label="توضیحات پزشک" />
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

export default ReferralEditForm