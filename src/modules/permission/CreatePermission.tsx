import { Formik } from "formik"
import FormikInput from "../../_cloner/components/inputs/FormikInput"
import SimpleButton from "../../_cloner/components/buttons/SimpleButton"
import { useCreatePermission } from "./core/_hooks"
import { IPermission } from "./core/_models"
import { toastify } from "../../_cloner/utils/toast"
import FormikSelect from "../../_cloner/components/selects/FormikSelect"
import { useAllMenuItems } from "../layout/core/_hooks"
import { dropdownApplicationMenu } from "../../_cloner/utils/dropdownsConvert"
import { QueryObserverResult } from "@tanstack/react-query"
import { FC } from "react"

const initialValues = {
    name: "",
    applicationMenuId: "",
    description: ""
}

interface IProps {
    onClose: () => void
    refetch: () => Promise<QueryObserverResult>;
}

const CreatePermission:FC<IProps> = ({onClose, refetch}) => {
    const menusTools = useAllMenuItems();
    const PermissionTools = useCreatePermission()

    const combinedArray = [].concat(...(menusTools?.data?.data?.map((item: any) => item?.children || []) || []));

    const onSubmit = (values: IPermission) => {
        const formData = {
            ...values,
            PermissionRoles: []
        }
        PermissionTools.mutate(formData, {
            onSuccess: (response) => {
                if(response.succeeded) {
                    toastify("success", response.message)
                } else {
                    toastify("error", response.data.Message)
                }
                onClose()
                refetch()
            }
        })
    }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                    <SimpleButton onSubmit={() => onSubmit(values)} text={PermissionTools.isPending ? "درحال پردازش ..." : "ثبت و تایید عملیات"} />
                </div>
            </form>
        )}
    </Formik>
  )
}

export default CreatePermission