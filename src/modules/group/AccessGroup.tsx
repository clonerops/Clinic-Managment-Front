import { FC, useEffect, useState } from "react";
import { IGroup } from "./core/_models";
import Typography from "../../_cloner/components/typography/Typography";
import { useGetPermissionsByMenu } from "../permission/core/_hooks";
import { Formik } from "formik";
import { Collapse, Tabs } from "antd";
import { toastify } from "../../_cloner/utils/toast";
import { useGetApplicationRole, usePutApplicationRoles } from "./core/_hooks";
import SimpleButton from "../../_cloner/components/buttons/SimpleButton";
import CheckboxGroup from "../../_cloner/components/checkboxs/CheckboxGroup";
import { dropdownPermissionsByMenu } from "../../_cloner/utils/dropdownsConvert";
import RoleMenus from "../role-menus/RoleMenus";
import { QueryObserverResult } from "@tanstack/react-query";

const { Panel } = Collapse;

const initialValues = {
    name: "",
    description: "",
    rolePermissions: [],
};

interface IProps {
    item: IGroup | undefined;
    onClose: () => void;
    refetch: () => Promise<QueryObserverResult>;
}

const AccessGroup: FC<IProps> = ({ item, onClose,refetch }) => {
    // This is Refrenced From Permission module
    const getPermissionsByMenuTools = useGetPermissionsByMenu();
    const putApplicationRoles = usePutApplicationRoles();
    const detailApplicationRole = useGetApplicationRole();

    useEffect(() => {
        detailApplicationRole.mutate(item?.id || "");
        // eslint-disable-next-line
    }, [item]);

    const onSubmit = (values: any) => {
        const formData = {
            name: values.name,
            description: values.description,
            id: values.id,
            rolePermissions: values.rolePermissions.map(
                (itemResponse: string) => ({
                    permissionId: itemResponse,
                    roleId: item?.id,
                })
            ),
        };
        putApplicationRoles.mutate(formData, {
            onSuccess: (response: any) => {
                if (response.succeeded) {
                    toastify("info", "ویرایش گروه با موفقیت انجام شد");
                } else {
                    toastify("error", response?.data?.Message);
                }
                onClose()
                refetch()
            },
        });
    };

    if (detailApplicationRole.isPending) {
        return <div>Loading ...</div>;
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <Typography
                    text={`دسترسی های مجوز و منو به گروه ${item?.name}`}
                    type="h5"
                    typographyTextClassName="!text-primary"
                />
            </div>

            <Formik
                initialValues={{
                    ...initialValues,
                    ...detailApplicationRole?.data?.data,
                    rolePermissions:
                        detailApplicationRole?.data?.data.rolePermissions.map(
                            (item: { permissionId: string }) =>
                                item.permissionId
                        ),
                }}
                onSubmit={onSubmit}
            >
                {({ handleSubmit }) => {
                    return (
                        <>
                            <Tabs
                                defaultActiveKey="1"
                                className="!mx-8 font-peyda-reqular"
                                size="large"
                                tabBarStyle={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 14,
                                }}
                                
                                items={[
                                    {
                                        key: "1",
                                        label: "دسترسی مجوزها",
                                        children: (
                                            <>
                                                 <Collapse accordion className="font-peyda-reqular">
                                                    {getPermissionsByMenuTools?.data?.data?.map(
                                                        (item: {
                                                            applicationMenuId: string;
                                                            applicationMenuName: string;
                                                            description: string;
                                                            permissions: any[];
                                                        }) => (
                                                            <Panel
                                                                header={item.applicationMenuName}
                                                                key={item.applicationMenuId}
                                                            >
                                                                <CheckboxGroup
                                                                    options={dropdownPermissionsByMenu(item.permissions)}
                                                                    label=""
                                                                    name="rolePermissions"
                                                                     boxClassName="grid grid-cols-1 lg:grid-cols-4 gap-x-4"
                                                                />
                                                            </Panel>
                                                        )
                                                    )}
                                                </Collapse>
                                                <div className="flex flex-row justify-end items-center gap-x-4 mt-4">
                                                    <SimpleButton
                                                        onSubmit={() =>
                                                            handleSubmit()
                                                        }
                                                        text="ثبت مجوز"
                                                    />
                                                </div>
                                            </>
                                        ),
                                    },
                                    {
                                        key: "2",
                                        label: "دسترسی منوها",
                                        children: <RoleMenus id={item?.id || ""} />,
                                    },
                                ]}
                            />
                        </>
                    );
                }}
            </Formik>
        </>
    );
};

export default AccessGroup;
