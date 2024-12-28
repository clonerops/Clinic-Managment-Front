import { useDeletePatientFile } from "./core/_hooks";
import { IPatientFile } from "./core/_models";
import { FC } from "react";
import SimpleButton from "../../_cloner/components/buttons/SimpleButton";
import { toastify } from "../../_cloner/utils/toast";
import Typography from "../../_cloner/components/typography/Typography";
import { UseMutationResult } from "@tanstack/react-query";


interface IProps {
    item: IPatientFile | undefined;
    onClose: () => void
    fetchPatientFiles: UseMutationResult<any, Error, void, unknown>
}

const PatientFileDeleteForm: FC<IProps> = ({ item, onClose, fetchPatientFiles }) => {
    const deleteTools = useDeletePatientFile();

    const onSubmit = () => {
        deleteTools.mutate(item?.id || 0, {
            onSuccess: (response) => {
                if (response.isSuccedded) {
                    toastify("success", response.message);
                    onClose()
                } else {
                    toastify("error", response.message);
                }
                onClose()
                fetchPatientFiles.mutate()
            },
        });
    };

    return (
        <>
            {deleteTools.isPending && <div>درحال پردازش...</div>}
            <div className="flex flex-col justify-center items-center">
                <Typography
                    text={`آیا از حذف مجوز ${item?.fileCode || ""} مطمئن هستید؟`}
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

export default PatientFileDeleteForm;
