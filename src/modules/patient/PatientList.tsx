import { TableColumnsType, Tag } from "antd";
import GridEditButton from "../../_cloner/components/buttons/GridEditButton";
import CardWidget from "../../_cloner/components/shared/CardWidget"
import Typography from "../../_cloner/components/typography/Typography"
import SimpleTable from "../../_cloner/components/tables/SimpleTable";
import { useFetchPatiens } from "./core/_hooks";
import { useEffect, useState } from "react";
import Backdrop from "../../_cloner/components/shared/Backdrop";
import GridDeleteButton from "../../_cloner/components/buttons/GridDeleteButton";
import WidthModal from "../../_cloner/components/shared/WidthModal";
import { IPatient } from "./core/_models";
import PatientEditForm from "./PatientEditForm";
import PatientDeleteForm from "./PatientDeleteForm";

const PatientList = () => {
    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    const [patientItem, setPatientItem] = useState<IPatient>()
    const [patientItemDelete, setPatientItemDelete] = useState<IPatient>()

    const fetchTools = useFetchPatiens()

    const handleSetPatientItem = (item: IPatient) => {
        setPatientItem(item)
        setOpenEditModal(true)
    }
    const handleSetPatientItemForDelete = (item: IPatient) => {
        setPatientItemDelete(item)
        setOpenDeleteModal(true)
    }

    useEffect(() => {
        fetchTools.mutate()
    }, [])


    const columns: TableColumnsType = [
        {
            title: "نام",
            dataIndex: "firstName",
            key: "firstName",
        },
        {
            title: "نام خانوادگی",
            dataIndex: "lastName",
            key: "lastName",
        },
        {
            title: "کدملی",
            dataIndex: "nationalCode",
            key: "nationalCode",
            render: (item) => {
                return <Tag color="blue">
                    {item}
                </Tag>
            },

        },
        {
            title: "موبایل",
            dataIndex: "mobile",
            key: "mobile",
            render: (item) => {
                return <Tag color="pink">
                    {item}
                </Tag>
            },

        },
        {
            title: "عملیات",
            key: "operation",
            fixed: "left",
            width: 200,
            render: (item) => (
                <div className="flex items-center gap-x-4">
                    <GridEditButton onClick={() => handleSetPatientItem(item)} />
                    <GridDeleteButton onClick={() => handleSetPatientItemForDelete(item)} />
                </div>
            ),
        },
    ];

    return (
        <>
            {fetchTools.isPending && <Backdrop loading={fetchTools.isPending} />}
            <CardWidget>
                <Typography
                    type="h3"
                    text="لیست بیماران"
                    typographyTextClassName="text-secondary"
                />
                <div className="mt-16">
                    <SimpleTable columns={columns} data={fetchTools?.data || []} />
                </div>

            </CardWidget>
            {/* Edit Patient */}
            <WidthModal
                isOpen={openEditModal}
                onCancel={() => setOpenEditModal(false)}
                cancelText="انصراف"
                title=""
            >
                <PatientEditForm fetchPatients={fetchTools} onClose={() => setOpenEditModal(false)} id={patientItem?.id || 0} />
            </WidthModal>
            {/* Delete Patient */}
            <WidthModal
                isOpen={openDeleteModal}
                onCancel={() => setOpenDeleteModal(false)}
                cancelText="انصراف"
                title="حذف بیمار"
            >
                <PatientDeleteForm fetchPatients={fetchTools} onClose={() => setOpenDeleteModal(false)} item={patientItemDelete} />
            </WidthModal>

        </>
    )
}

export default PatientList