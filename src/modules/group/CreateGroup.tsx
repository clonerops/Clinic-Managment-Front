import { Formik } from "formik"
import { usePostApplicationRoles } from "./core/_hooks";
import { toastify } from "../../_cloner/utils/toast";
import FormikInput from "../../_cloner/components/inputs/FormikInput";
import SimpleButton from "../../_cloner/components/buttons/SimpleButton";
import { FC, useEffect, useState } from "react";
import { QueryObserverResult } from "@tanstack/react-query";

interface IProps {
    onClose: () => void
    refetch: () => Promise<QueryObserverResult>;
}

const initialValues = {
    name: "",
    description: "",
    rolePermissions: []
}




const CreateGroup:FC<IProps> = ({onClose, refetch}) => {
    const postApplicationRoles = usePostApplicationRoles();
    
    const onSubmit = (values: any) => {
        const formData = {
            name: values.name,
            description: values.description,
            rolePermissions: values.rolePermissions.map((item: string) => (
                {
                    permissionId: item
                }
            ))
        }
        postApplicationRoles.mutate(formData, {
            onSuccess: (message: any) => {
                if (message.succeeded) {
                    toastify("success", "گروه با موفقیت ایجاد شد")
                } else {
                    toastify("error", message?.data?.Message )
                }
                onClose()
                refetch()
            },
        });
    }

    return (
        <>
            {postApplicationRoles.isPending && <div>درحال پردازش...</div>}
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ handleSubmit }) => {
                    return <>
                        <div className="flex flex-col gap-4 mt-4">
                            <FormikInput name="name" label="اسم گروه" placeholder="اسم گروه" type="text" />
                            <FormikInput  name="description" label="توضیحات" placeholder="توضیحات" type="text" />
                            <div className="flex justify-end items-end">
                                <SimpleButton text="ثبت و تایید گروه" onSubmit={handleSubmit} />
                            </div>

                        </div>
                    </>
                }}
            </Formik>
        </>
    )
}

export default CreateGroup