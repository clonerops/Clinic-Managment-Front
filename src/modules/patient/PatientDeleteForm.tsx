import { useDeletePatient } from "./core/_hooks";
import { IPatient, IPatientFilter } from "./core/_models";
import { FC } from "react";
import SimpleButton from "../../_cloner/components/buttons/SimpleButton";
import { toastify } from "../../_cloner/utils/toast";
import Typography from "../../_cloner/components/typography/Typography";
import { UseMutationResult } from "@tanstack/react-query";


interface IProps {
    item: IPatient | undefined;
    onClose: () => void
    fetchPatients: UseMutationResult<any, Error, IPatientFilter, unknown>
}

const PatientDeleteForm: FC<IProps> = ({ item, onClose, fetchPatients }) => {
    const deleteTools = useDeletePatient();

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
                fetchPatients.mutate({})
            },
        });
    };

    return (
        <>
            {deleteTools.isPending && <div>درحال پردازش...</div>}
            <div className="flex flex-col justify-center items-center">
                <Typography
                    text={`آیا از حذف مجوز ${item?.firstName + " " + item?.lastName || ""} مطمئن هستید؟`}
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

export default PatientDeleteForm;
