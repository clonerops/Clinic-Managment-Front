import { Collapse, TableColumnsType, Tag } from "antd";
import GridEditButton from "../../_cloner/components/buttons/GridEditButton";
import CardWidget from "../../_cloner/components/shared/CardWidget"
import Typography from "../../_cloner/components/typography/Typography"
import SimpleTable from "../../_cloner/components/tables/SimpleTable";
import { useEffect, useState } from "react";
import Backdrop from "../../_cloner/components/shared/Backdrop";
import GridDeleteButton from "../../_cloner/components/buttons/GridDeleteButton";
import WidthModal from "../../_cloner/components/shared/WidthModal";
import { IPatientFile, IPatientFileFilter } from "./core/_models";
import GridSimpleButton from "../../_cloner/components/buttons/GridSimpleButton";
import { useFetchPatientFiles } from "./core/_hooks";
import PatientFileEditForm from "./PatientEditForm";
import PatientFileDeleteForm from "./PatientFileDeleteForm";
import { Link } from "react-router-dom";
import ReferralForm from "../referral/ReferralForm";
import { DocumentEnum } from "../../_cloner/utils/Enums";
import { Formik } from "formik";
import FormikInput from "../../_cloner/components/inputs/FormikInput";
import SimpleButton from "../../_cloner/components/buttons/SimpleButton";

const initialValues: IPatientFileFilter = {
    firstName: "",
    lastName: "",
    mobile: ""
}

const PatientFileList = () => {
    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    const [openReferralModal, setOpenReferralModal] = useState<boolean>(false)
    const [patientFileItem, setPatientFileItem] = useState<IPatientFile>()
    const [patientFileItemDelete, setPatientFileItemDelete] = useState<IPatientFile>()
    const [patientFileItemReferral, setPatientFileItemReferral] = useState<IPatientFile>()

    const fetchTools = useFetchPatientFiles()

    const handleSetPatientFileItem = (item: IPatientFile) => {
        setPatientFileItem(item)
        setOpenEditModal(true)
    }
    const handleSetPatientFileItemForDelete = (item: IPatientFile) => {
        setPatientFileItemDelete(item)
        setOpenDeleteModal(true)
    }
    const handleSetPatientFileItemForReferral = (item: IPatientFile) => {
        setPatientFileItemReferral(item)
        setOpenReferralModal(true)
    }

    useEffect(() => {
        fetchTools.mutate({})
    }, [])

    const onFilter = (values: IPatientFileFilter) => {
        fetchTools.mutate(values)
    }

    const columns: TableColumnsType = [
        {
            title: "شماره پرونده",
            dataIndex: "fileCode",
            key: "fileCode",
        },
        {
            title: "نام بیمار",
            dataIndex: "patientName",
            key: "patientName",
        },
        {
            title: "موبایل",
            dataIndex: "mobile",
            key: "mobile",
        },
        {
            title: "نوع پرونده",
            dataIndex: "documentName",
            key: "documentName",
            render: (item) => {
                return <Tag color="blue">
                    {item}
                </Tag>
            },

        },
        {
            title: "پزشک معالج",
            dataIndex: "doctorName",
            key: "doctorName",
        },
        {
            title: "عملیات",
            key: "operation",
            fixed: "left",
            width: 300,
            render: (item) => (
                <div className="flex items-center gap-x-4">
                    <Link target="_blank" to={`/${item?.documentId === DocumentEnum.Lazer ? "lazer-form-print" : item?.documentId === DocumentEnum.Midwifery ? "mid-wirfy-form-print" : item?.documentId === DocumentEnum.Facial ? "facial-form-print" : "skin-form-print"}/${item.id}/${item?.patientId}`} className=''>
                        <GridSimpleButton btnClassName="bg-green hover:bg-greenLight" icon="menu-strawberry-svgrepo-com" title={`پرینت فرم ${item.documentName}`} onClick={() => { }} />
                    </Link>
                    <GridSimpleButton btnClassName="bg-violtly hover:!bg-blueLight" icon="report-text-svgrepo-com" title={`ثبت مراجعه بیمار ${item.patientName}`} onClick={() => handleSetPatientFileItemForReferral(item)} />
                    <GridEditButton onClick={() => handleSetPatientFileItem(item)} />
                    <GridDeleteButton onClick={() => handleSetPatientFileItemForDelete(item)} />
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
                    text="مدیریت پرونده ها"
                    typographyTextClassName="text-secondary"
                />
                <div className="mb-4">
                    <Collapse
                        items={[{
                            key: '1', label: 'فیلترها', children:
                                <Formik initialValues={initialValues} onSubmit={onFilter}>
                                    {({ values }) => <form className="grid grid-cols-1 lg:grid-cols-4 lg:gap-4">
                                        <FormikInput type="text" name="firstName" label="نام" hasLabel={true} placeholder="" />
                                        <FormikInput type="text" name="lastName" label="نام خانوادگی" hasLabel={true} placeholder="" />
                                        <FormikInput type="text" name="mobile" label="موبایل" hasLabel={true} placeholder="" />
                                        <div className="lg:col-span-4 flex flex-end items-end justify-end w-full">
                                            <SimpleButton btnClassName="!bg-primary" text="جستجو" onSubmit={() => onFilter(values)} />
                                        </div>
                                    </form>}
                                </Formik>

                        }]}
                    />
                </div>

                <div className="mt-16">
                    <SimpleTable columns={columns} data={fetchTools?.data || []} />
                </div>
            </CardWidget>
            {/* Referral */}
            <WidthModal
                isOpen={openReferralModal}
                onCancel={() => setOpenReferralModal(false)}
                cancelText="انصراف"
                title=""
            >
                <ReferralForm fetchPatientFiles={fetchTools} onClose={() => setOpenReferralModal(false)} patientFile={patientFileItemReferral || {}} />
            </WidthModal>
            {/* Edit PatientFile */}
            <WidthModal
                isOpen={openEditModal}
                onCancel={() => setOpenEditModal(false)}
                cancelText="انصراف"
                title=""
            >
                <PatientFileEditForm fetchPatientFiles={fetchTools} onClose={() => setOpenEditModal(false)} id={patientFileItem?.id || 0} />
            </WidthModal>
            {/* Delete PatientFile */}
            <WidthModal
                isOpen={openDeleteModal}
                onCancel={() => setOpenDeleteModal(false)}
                cancelText="انصراف"
                title="حذف بیمار"
            >
                <PatientFileDeleteForm fetchPatientFiles={fetchTools} onClose={() => setOpenDeleteModal(false)} item={patientFileItemDelete} />
            </WidthModal>

        </>
    )
}

export default PatientFileList