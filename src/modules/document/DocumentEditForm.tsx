import { Card } from "antd"
import FormikInput from "../../_cloner/components/inputs/FormikInput"
import { Formik } from "formik"
import SimpleButton from "../../_cloner/components/buttons/SimpleButton"
import FormikDescription from "../../_cloner/components/inputs/FormikDescription"
import FormikDatepicker from "../../_cloner/components/inputs/FormikDatepicker"
import FormikSelect from "../../_cloner/components/selects/FormikSelect"
import Typography from "../../_cloner/components/typography/Typography"
import { useCreateNewDocument, useFetchDocument, useUpdateDocument } from "./core/_hooks"
import { IDocument } from "./core/_models"
import { toastify } from "../../_cloner/utils/toast"
import Backdrop from "../../_cloner/components/shared/Backdrop"
import CardWidget from "../../_cloner/components/shared/CardWidget"
import { FC, useEffect } from "react"
import { UseMutationResult } from "@tanstack/react-query"

const initialValues: IDocument = {
    name: "",
    description: "",
}


interface IProps {
    id?: number
    onClose: () => void
    fetchDocuments: UseMutationResult<any, Error, void, unknown>
}

const DocumentEditForm: FC<IProps> = ({ id, onClose, fetchDocuments }) => {
    const updateTools = useUpdateDocument()
    const fetchTools = useFetchDocument()

    useEffect(() => {
        fetchTools.mutate(id || 0)
    }, [id])

    const onSubmit = (values: IDocument) => {
        const formData = {
            ...values,
            id: id
        }
        updateTools.mutate(formData, {
            onSuccess: (response) => {
                if (response.isSuccedded) {
                    toastify("success", response.message)
                } else {
                    toastify("error", response.message)
                }
                fetchDocuments.mutate()
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
                    text="ویرایش پرونده"
                    typographyTextClassName="text-secondary"
                />
                <Formik enableReinitialize initialValues={{
                    ...initialValues,
                    ...fetchTools.data,
                }} onSubmit={onSubmit}>
                    {({ handleSubmit }) => <form className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-16" onSubmit={handleSubmit}>
                        <FormikInput isRequired placeholder="نام" type="text" hasLabel={true} name="name" label="نام پرونده" />
                        <div className="lg:col-span-2">
                            <FormikDescription placeholder="توضیحات" type="text" hasLabel={true} name="description" label="توضیحات" />
                        </div>
                        <div className="flex justify-end items-end lg:col-span-3">
                            <SimpleButton onSubmit={() => handleSubmit()} text="ویرایش پرونده" btnTextClassName="!py-4" />
                        </div>
                    </form>}
                </Formik>
            </CardWidget>
        </>
    )
}

export default DocumentEditForm