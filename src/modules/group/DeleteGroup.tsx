import { useDeleteApplicationRoles } from "./core/_hooks";
import { toastify } from "../../_cloner/utils/toast";
import SimpleButton from "../../_cloner/components/buttons/SimpleButton";
import { FC } from "react";
import { IGroup } from "./core/_models";
import Typography from "../../_cloner/components/typography/Typography";
import { QueryObserverResult } from "@tanstack/react-query";

interface IProps {
    item: IGroup | undefined
    onClose: () => void
    refetch: () => Promise<QueryObserverResult>;
}

const DeleteGroup:FC<IProps> = ({item, onClose,refetch}) => {
    const deleteGroup = useDeleteApplicationRoles();

    const onSubmit = () => {
        deleteGroup.mutate(item?.id || "", {
            onSuccess: (message: any) => {
              if (message.succeeded) {
                toastify("success", "گروه با موفقیت حذف شد")
                onClose()
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
            {deleteGroup.isPending && <div>درحال پردازش...</div>}
            <div className="flex flex-col justify-center items-center">
                <Typography text={`آیا از حذف گروه ${item?.name || ""} مطمئن هستید؟`} type="h5" typographyTextClassName="!text-secondary" />
                <div className="flex flex-row gap-x-4 mt-8">
                    <SimpleButton onSubmit={onSubmit} text="بله، حذف کن!" />
                    <SimpleButton onSubmit={onClose} text="انصراف" btnClassName="!bg-blueLight hover:!bg-green" btnTextClassName="!text-black" />
                </div>
            </div>
        </>
    )
}

export default DeleteGroup