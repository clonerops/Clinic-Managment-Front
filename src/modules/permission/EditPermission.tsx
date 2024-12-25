import { Formik } from "formik"
import FormikInput from "../../_cloner/components/inputs/FormikInput"
import SimpleButton from "../../_cloner/components/buttons/SimpleButton"
import { useEditPermission, useGetPermission } from "./core/_hooks"
import { IPermission } from "./core/_models"
import { toastify } from "../../_cloner/utils/toast"
import FormikSelect from "../../_cloner/components/selects/FormikSelect"
import { useAllMenuItems } from "../layout/core/_hooks"
import { dropdownApplicationMenu } from "../../_cloner/utils/dropdownsConvert"
import { FC, useEffect } from "react"
import { QueryObserverResult } from "@tanstack/react-query"

const initialValues = {
    name: "",
    applicationMenuId: "",
    description: ""
}

interface IProps {
    item: IPermission | undefined
    onClose: () => void
    refetch: () => Promise<QueryObserverResult>;

}

const EditPermission:FC<IProps> = ({item, onClose, refetch}) => {

    const permissionFetchTools = useGetPermission()
    const menusTools = useAllMenuItems();
    const permissionTools = useEditPermission()

    const combinedArray = [].concat(...(menusTools?.data?.data?.map((item: any) => item?.children || []) || []));    

    useEffect(() => {
        permissionFetchTools.mutate(item?.id || "")
    }, [item])

    const onSubmit = (values: IPermission) => {
        const formData = {
            id: item?.id,
            ...values
        }
        permissionTools.mutate(formData, {
            onSuccess: (response) => {
                if(response.succeeded) {
                    toastify("success", "ویرایش مجوز با موفقیت انجام شد")
                } else {
                    toastify("error", response.data.Message)
                }
                onClose()
                refetch()
            }
        })
    }


    if(permissionFetchTools.isPending) {
        return <div>Loading ...</div>
    }

  return (
    <Formik enableReinitialize initialValues={{
        ...initialValues,
        name: permissionFetchTools?.data?.data?.permissionName,
        applicationMenuId: permissionFetchTools?.data?.data?.applicationMenuId,
        description: permissionFetchTools?.data?.data?.description

    }} onSubmit={onSubmit}>
        {({handleSubmit, values}) => (
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-row gap-x-4">
                        <FormikInput name="name" placeholder="نام مجوز" type="text" hasLabel={true} label="نام مجوز" />
                        <FormikInput name="description" placeholder="توضیحات" type="text" hasLabel={true} label="توضیحات"  />
                    </div>
                    <FormikSelect options={dropdownApplicationMenu(combinedArray)} name="applicationMenuId" hasLabel={true}  label="منو"  />
                </div>
                <div className="flex justify-end items-end mt-4">
                    <SimpleButton onSubmit={() => onSubmit(values)} text={permissionTools.isPending ? "درحال پردازش ..." : "ثبت و تایید عملیات"} />
                </div>
            </form>
        )}
    </Formik>
  )
}

export default EditPermission