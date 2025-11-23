import { Collapse, TableColumnsType, Tag } from "antd";
import GridEditButton from "../../_cloner/components/buttons/GridEditButton";
import CardWidget from "../../_cloner/components/shared/CardWidget"
import Typography from "../../_cloner/components/typography/Typography"
import SimpleTable from "../../_cloner/components/tables/SimpleTable";
import { useEffect, useState } from "react";
import Backdrop from "../../_cloner/components/shared/Backdrop";
import GridDeleteButton from "../../_cloner/components/buttons/GridDeleteButton";
import WidthModal from "../../_cloner/components/shared/WidthModal";
import { IReferral, IReferralFilter } from "./core/_models";
import { useFetchReferrals } from "./core/_hooks";
import ReferralEditForm from "./ReferralEditForm";
import ReferralDeleteForm from "./ReferralDeleteForm";
import { Formik } from "formik";
import FormikInput from "../../_cloner/components/inputs/FormikInput";
import SimpleButton from "../../_cloner/components/buttons/SimpleButton";
import FormikPatients from "../../_cloner/components/inputs/FormikPatients";
import FormikDocuments from "../../_cloner/components/inputs/FormikDocuments";
import FormikDoctors from "../../_cloner/components/inputs/FormikDoctors";
import FormikDatepicker from "../../_cloner/components/inputs/FormikDatepicker";

const initialValues: IReferralFilter = {
    patientId: "",
    documentId: "",
    doctorId: "",
    fromDate: "",
    toDate: ""
}


const ReferralList = () => {
    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    const [ReferralItem, setReferralItem] = useState<IReferral>()
    const [ReferralItemDelete, setReferralItemDelete] = useState<IReferral>()

    const fetchTools = useFetchReferrals()

    const handleSetReferralItem = (item: IReferral) => {
        setReferralItem(item)
        setOpenEditModal(true)
    }
    const handleSetReferralItemForDelete = (item: IReferral) => {
        setReferralItemDelete(item)
        setOpenDeleteModal(true)
    }

    useEffect(() => {
        fetchTools.mutate({})
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

    const onFilter = (values: IReferralFilter) => {
        fetchTools.mutate(values)
    }


    return (
        <>
            {fetchTools.isPending && <Backdrop loading={fetchTools.isPending} />}
            <CardWidget>
                <div className="mb-4">
                    <Collapse
                        items={[{
                            key: '1', label: 'فیلترها', children:
                                <Formik initialValues={initialValues} onSubmit={onFilter}>
                                    {({ values }) => <form className="grid grid-cols-1 lg:grid-cols-4 lg:gap-4">
                                        <FormikPatients name="patientId" label="نام بیمار" hasLabel={true} placeholder="" />
                                        <FormikDocuments name="documentId" label="پرونده" hasLabel={true} placeholder="" />
                                        <FormikDoctors name="doctorId" label="پزشک" hasLabel={true} placeholder="" />
                                        {/* <FormikDatepicker placeholder="از تاریخ" isRequired={true} hasLabel={true} name="fromDate" label="از تاریخ" />
                                        <FormikDatepicker placeholder="تا تاریخ" isRequired={true} hasLabel={true} name="toDate" label="تا تاریخ" /> */}
                                        <div className="lg:col-span-4 flex flex-end items-end justify-end w-full">
                                            <SimpleButton btnClassName="!bg-primary" text="جستجو" onSubmit={() => onFilter(values)} />
                                        </div>
                                    </form>}
                                </Formik>

                        }]}
                    />
                </div>

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
            {/* <WidthModal
                isOpen={openEditModal}
                onCancel={() => setOpenEditModal(false)}
                cancelText="انصراف"
                title=""
            >
                <ReferralEditForm fetchReferrals={fetchTools} onClose={() => setOpenEditModal(false)} id={ReferralItem?.id || 0} />
            </WidthModal> */}
            {/* Delete Referral */}
            {/* <WidthModal
                isOpen={openDeleteModal}
                onCancel={() => setOpenDeleteModal(false)}
                cancelText="انصراف"
                title="حذف مراجعه"
            >
                <ReferralDeleteForm fetchReferrals={fetchTools} onClose={() => setOpenDeleteModal(false)} item={ReferralItemDelete} />
            </WidthModal> */}

        </>
    )
}

export default ReferralList