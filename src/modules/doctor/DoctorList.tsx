import { TableColumnsType } from "antd";
import GridEditButton from "../../_cloner/components/buttons/GridEditButton";
import CardWidget from "../../_cloner/components/shared/CardWidget"
import Typography from "../../_cloner/components/typography/Typography"
import SimpleTable from "../../_cloner/components/tables/SimpleTable";
import { useFetchDoctors } from "./core/_hooks";
import { useEffect, useState } from "react";
import Backdrop from "../../_cloner/components/shared/Backdrop";
import GridDeleteButton from "../../_cloner/components/buttons/GridDeleteButton";
import WidthModal from "../../_cloner/components/shared/WidthModal";
import { IDoctor } from "./core/_models";
import DoctorEditForm from "./DoctorEditForm";
import DoctorDeleteForm from "./DoctorDeleteForm";
import DoctorForm from "./DoctorForm";
import SimpleButton from "../../_cloner/components/buttons/SimpleButton";

const DoctorList = () => {
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    const [DoctorItem, setDoctorItem] = useState<IDoctor>()
    const [DoctorItemDelete, setDoctorItemDelete] = useState<IDoctor>()

    const fetchTools = useFetchDoctors()

    const handleSetDoctorItem = (item: IDoctor) => {
        setDoctorItem(item)
        setOpenEditModal(true)
    }
    const handleSetDoctorItemForDelete = (item: IDoctor) => {
        setDoctorItemDelete(item)
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
        },
        {
            title: "موبایل",
            dataIndex: "mobile",
            key: "mobile",
        },
        {
            title: "توضیحات",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "عملیات",
            key: "operation",
            fixed: "left",
            width: 200,
            render: (item) => (
                <div className="flex items-center gap-x-4">
                    <GridEditButton onClick={() => handleSetDoctorItem(item)} />
                    <GridDeleteButton onClick={() => handleSetDoctorItemForDelete(item)} />
                </div>
            ),
        },
    ];

    return (
        <>
            {fetchTools.isPending && <Backdrop loading={fetchTools.isPending} />}
            <CardWidget>
                <div className="flex flex-end justify-end">
                    <SimpleButton text="ایجاد پزشک جدید"  onSubmit={() => setOpenCreateModal(true)} />
                </div>
                <Typography
                    type="h3"
                    text="لیست پزشک"
                    typographyTextClassName="text-secondary"
                />
                <div className="mt-16">
                    <SimpleTable columns={columns} data={fetchTools?.data || []} />
                </div>

            </CardWidget>
            {/* Edit Doctor */}
            <WidthModal
                isOpen={openCreateModal}
                onCancel={() => setOpenCreateModal(false)}
                cancelText="انصراف"
                title=""
            >
                <DoctorForm fetchDoctors={fetchTools} onClose={() => setOpenCreateModal(false)} />
            </WidthModal>
            <WidthModal
                isOpen={openEditModal}
                onCancel={() => setOpenEditModal(false)}
                cancelText="انصراف"
                title=""
            >
                <DoctorEditForm fetchDoctors={fetchTools} onClose={() => setOpenEditModal(false)} id={DoctorItem?.id || 0} />
            </WidthModal>
            {/* Delete Doctor */}
            <WidthModal
                isOpen={openDeleteModal}
                onCancel={() => setOpenDeleteModal(false)}
                cancelText="انصراف"
                title="حذف پزشک"
            >
                <DoctorDeleteForm fetchDoctors={fetchTools} onClose={() => setOpenDeleteModal(false)} item={DoctorItemDelete} />
            </WidthModal>

        </>
    )
}

export default DoctorList