import { TableColumnsType, Tag } from "antd";
import GridEditButton from "../../_cloner/components/buttons/GridEditButton";
import CardWidget from "../../_cloner/components/shared/CardWidget"
import Typography from "../../_cloner/components/typography/Typography"
import SimpleTable from "../../_cloner/components/tables/SimpleTable";
import { useEffect, useState } from "react";
import Backdrop from "../../_cloner/components/shared/Backdrop";
import GridDeleteButton from "../../_cloner/components/buttons/GridDeleteButton";
import WidthModal from "../../_cloner/components/shared/WidthModal";
import { IReferral } from "./core/_models";
import { useFetchReferrals } from "./core/_hooks";
import ReferralEditForm from "./ReferralEditForm";
import ReferralDeleteForm from "./ReferralDeleteForm";

const ReferralList = () => {
    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    const [ReferralItem, setReferralItem] = useState<IReferral>()
    const [ReferralItemDelete, setReferralItemDelete] = useState<IReferral>()

    const fetchTools = useFetchReferrals()
    console.log(fetchTools?.data)

    const handleSetReferralItem = (item: IReferral) => {
        setReferralItem(item)
        setOpenEditModal(true)
    }
    const handleSetReferralItemForDelete = (item: IReferral) => {
        setReferralItemDelete(item)
        setOpenDeleteModal(true)
    }

    useEffect(() => {
        fetchTools.mutate()
    }, [])


    const columns: TableColumnsType = [
        {
            title: "نام و نام خانوادگی",
            dataIndex: "patientFile",
            key: "patientFile",
            render: (item) => {
                return <div className="flex items-center gap-x-4">
                    <Typography text={item.patientName} type="bodyMd" />
                </div>

            }
        },
        {
            title: "نوع پرونده",
            dataIndex: "patientFile",
            key: "patientFile",
            render: (item) => (
                <div className="flex items-center gap-x-4">
                    <Typography text={item.documentName} type="bodyMd" />
                </div>
            ),
        },
        {
            title: "علت مراجعه",
            dataIndex: "referralReason",
            key: "referralReason",

        },
        {
            title: "تاریخ مراجعه",
            dataIndex: "referralDate",
            key: "referralDate",
        },
        {
            title: "عملیات",
            key: "operation",
            fixed: "left",
            width: 200,
            render: (item) => (
                <div className="flex items-center gap-x-4">
                    <GridEditButton onClick={() => handleSetReferralItem(item)} />
                    <GridDeleteButton onClick={() => handleSetReferralItemForDelete(item)} />
                </div>
            ),
        },
    ];

    console.log(fetchTools.data)

    return (
        <>
            {fetchTools.isPending && <Backdrop loading={fetchTools.isPending} />}
            <CardWidget>
                <Typography
                    type="h3"
                    text="مدیریت مراجعات"
                    typographyTextClassName="text-secondary"
                />
                <div className="mt-16">
                    <SimpleTable columns={columns} data={fetchTools?.data || []} />
                </div>
            </CardWidget>
            {/* Edit Referral */}
            <WidthModal
                isOpen={openEditModal}
                onCancel={() => setOpenEditModal(false)}
                cancelText="انصراف"
                title=""
            >
                <ReferralEditForm fetchReferrals={fetchTools} onClose={() => setOpenEditModal(false)} id={ReferralItem?.id || 0} />
            </WidthModal>
            {/* Delete Referral */}
            <WidthModal
                isOpen={openDeleteModal}
                onCancel={() => setOpenDeleteModal(false)}
                cancelText="انصراف"
                title="حذف مراجعه"
            >
                <ReferralDeleteForm fetchReferrals={fetchTools} onClose={() => setOpenDeleteModal(false)} item={ReferralItemDelete} />
            </WidthModal>

        </>
    )
}

export default ReferralList