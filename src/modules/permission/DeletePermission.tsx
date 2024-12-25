import { useDeletePermission, useGetPermission } from "./core/_hooks";
import { IPermission } from "./core/_models";
import { FC, useEffect } from "react";
import SimpleButton from "../../_cloner/components/buttons/SimpleButton";
import { toastify } from "../../_cloner/utils/toast";
import Typography from "../../_cloner/components/typography/Typography";
import { QueryObserverResult } from "@tanstack/react-query";


interface IProps {
    item: IPermission | undefined;
    onClose: () => void
    refetch: () => Promise<QueryObserverResult>;
}

const DeletePermission: FC<IProps> = ({ item, onClose, refetch }) => {
    const PermissionTools = useGetPermission();
    const deleteTools = useDeletePermission();

    useEffect(() => {
        PermissionTools.mutate(item?.id || "");
    }, [item]);

    const onSubmit = () => {
        deleteTools.mutate(item?.id || "", {
            onSuccess: (response) => {
                if (response.succeeded) {
                    toastify("success", "مجوز با موفقیت حذف گردید");
                    onClose()
                } else {
                    toastify("error", response.data.Message);
                }
                onClose()
                refetch()
            },
        });
    };

    if (PermissionTools.isPending) {
        return <div>درحال بارگزاری...</div>;
    }

    return (
        <>
            {deleteTools.isPending && <div>درحال پردازش...</div>}
            <div className="flex flex-col justify-center items-center">
                <Typography
                    text={`آیا از حذف مجوز ${item?.name || ""} مطمئن هستید؟`}
                    type="h5"
                    typographyTextClassName="!text-secondary"
                />
                <div className="flex flex-row gap-x-4 mt-8">
                    <SimpleButton onSubmit={onSubmit} text="بله، حذف کن!" />
                    <SimpleButton
                        text="انصراف"
                        onSubmit={onClose}
                        btnClassName="!bg-blueLight hover:!bg-green"
                        btnTextClassName="!text-black"
                    />
                </div>
            </div>
        </>
    );
};

export default DeletePermission;
