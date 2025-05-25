import { Collapse, TableColumnsType, Tag } from "antd";
import GridEditButton from "../../_cloner/components/buttons/GridEditButton";
import CardWidget from "../../_cloner/components/shared/CardWidget"
import Typography from "../../_cloner/components/typography/Typography"
import SimpleTable from "../../_cloner/components/tables/SimpleTable";
import { useDownloadPatientExcel, useFetchPatiens } from "./core/_hooks";
import { useEffect, useState } from "react";
import Backdrop from "../../_cloner/components/shared/Backdrop";
import GridDeleteButton from "../../_cloner/components/buttons/GridDeleteButton";
import WidthModal from "../../_cloner/components/shared/WidthModal";
import { IPatient, IPatientFilter } from "./core/_models";
import PatientEditForm from "./PatientEditForm";
import PatientDeleteForm from "./PatientDeleteForm";
import GridSimpleButton from "../../_cloner/components/buttons/GridSimpleButton";
import PatientFileForm from "../patientFile/PatientFileForm";
import { Formik } from "formik";
import FormikInput from "../../_cloner/components/inputs/FormikInput";
import SimpleButton from "../../_cloner/components/buttons/SimpleButton";
import CustomButton from "../../_cloner/components/buttons/CustomButton";
import { toAbsoulteUrl } from "../../_cloner/utils/absoluteUrl";

const initialValues: IPatientFilter = {
    firstName: "",
    lastName: "",
    nationalCode: "",
    mobile: ""
}

const PatientList = () => {
    const [openPatientFileModal, setOpenPatientFileModal] = useState<boolean>(false)
    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    const [patientItem, setPatientItem] = useState<IPatient>()
    const [patientItemDelete, setPatientItemDelete] = useState<IPatient>()

    const fetchTools = useFetchPatiens()
    const downloadTools = useDownloadPatientExcel()

    const handleSetPatientItem = (item: IPatient) => {
        setPatientItem(item)
        setOpenEditModal(true)
    }
    const handleSetPatientItemForDelete = (item: IPatient) => {
        setPatientItemDelete(item)
        setOpenDeleteModal(true)
    }
    const handleSetPatientFileItem = (item: IPatient) => {
        setPatientItem(item)
        setOpenPatientFileModal(true)
    }

    useEffect(() => {
        fetchTools.mutate({})
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
                    <GridSimpleButton icon="marketing-svgrepo-com" onClick={() => handleSetPatientFileItem(item)} title="ثبت پرونده جدید" btnClassName="bg-green hobver:!bg-greenLight" />
                    <GridEditButton onClick={() => handleSetPatientItem(item)} />
                    <GridDeleteButton onClick={() => handleSetPatientItemForDelete(item)} />
                </div>
            ),
        },
    ];

    const onFilter = (values: IPatientFilter) => {
        fetchTools.mutate(values)
    }

    const handleDownloadExcel = () => {
        downloadTools.mutate({ fromDate: "1", toDate: "1" })
    }

    return (
        <>
            {fetchTools.isPending && <Backdrop loading={fetchTools.isPending} />}
            {downloadTools.isPending && <Backdrop loading={downloadTools.isPending} />}
            <CardWidget>
                <div className="mb-4">
                    <Collapse
                        items={[{
                            key: '1', label: 'فیلترها', children:
                                <Formik initialValues={initialValues} onSubmit={onFilter}>
                                    {({ values }) => <form className="grid grid-cols-1 lg:grid-cols-4 lg:gap-4">
                                        <FormikInput type="text" name="firstName" label="نام" hasLabel={true} placeholder="" />
                                        <FormikInput type="text" name="lastName" label="نام خانوادگی" hasLabel={true} placeholder="" />
                                        <FormikInput type="text" name="nationalCode" label="کدملی" hasLabel={true} placeholder="" />
                                        <FormikInput type="text" name="mobile" label="موبایل" hasLabel={true} placeholder="" />
                                        <div className="lg:col-span-4 flex flex-end items-end justify-end w-full">
                                            <SimpleButton btnClassName="!bg-primary" text="جستجو" onSubmit={() => onFilter(values)} />
                                        </div>
                                    </form>}
                                </Formik>

                        }]}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <Typography
                        type="h3"
                        text="لیست بیماران"
                        typographyTextClassName="text-secondary"
                    />
                    <CustomButton onSubmit={handleDownloadExcel} btnClassName="!bg-green">
                        <img src={toAbsoulteUrl('/pictures/images/excelLogo.png')} width={30} />
                    </CustomButton>
                </div>
                <div className="mt-16">
                    <SimpleTable columns={columns} data={fetchTools?.data || []} />
                </div>

            </CardWidget>
            {/* Edit Patient */}
            <WidthModal
                isOpen={openPatientFileModal}
                onCancel={() => setOpenPatientFileModal(false)}
                cancelText="انصراف"
                title=""
            >
                <PatientFileForm fetchPatients={fetchTools} onClose={() => setOpenEditModal(false)} patient={patientItem || {}} />
            </WidthModal>
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