import { useDeleteRoleMenu, useGetAllApplicationMenus, useGetRoleMenusById, usePostRoleMenus } from "./_hooks";
import { Collapse, Switch } from 'antd';
import { Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { IRoleMenu } from "./_models";
import { toastify } from "../../_cloner/utils/toast";
import Typography from "../../_cloner/components/typography/Typography";
import Backdrop from "../../_cloner/components/shared/Backdrop";

const { Panel } = Collapse;

const initialValues: IRoleMenu = {
  roleId: "",
  applicationMenuId: [],
};

interface IProps {
  id: string
}

interface IRoleMenuTools {
    id: string, 
    description: string, 
    children: any[]
}

const RoleMenus:FC<IProps> = ({id}) => {

  const roleMenusTools =  useGetAllApplicationMenus() 

  const postMenu = usePostRoleMenus();
  const deleteMenu = useDeleteRoleMenu();
  const roleMenuTools = useGetRoleMenusById(id);

  const [roleIds, setRoleIds] = useState<string[]>([]);



  useEffect(() => {
    let roleId = roleMenuTools?.data?.data.map((item: {applicationMenuId: string}) => item.applicationMenuId)
    setRoleIds(roleId)
  }, [id, roleMenuTools?.data])


  const handleCheckboxChange = (subId: string, checked: boolean) => {
    
    if (checked) {
      setRoleIds((prevIds) => [...prevIds, subId]);
      const formData = {
        roleId: id,
        applicationMenuId: [...roleIds, subId],
      };

      postMenu.mutate(formData, {
        onSuccess: (res) => {
          if (res.succeeded) {
            toastify("success", "دسترسی منو با موفقیت انجام شد")
          } else {
            toastify("error", res?.data.Message)
          }
          roleMenuTools.refetch()
        }
      })
  } else {
      setRoleIds((prevIds) => prevIds.filter((id) => id !== subId));
      const filterRoleMenuId = roleMenuTools?.data?.data?.find((i: any) => i.applicationMenuId === subId)
      console.log(filterRoleMenuId)
      deleteMenu.mutate(filterRoleMenuId?.id, {
        onSuccess: (message) => {
          if (message.succeeded) {
            toastify("info", "عدم دسترسی منو با موفقیت انجام شد")
          } else {
            toastify("error", message?.data.Message)
          }
          roleMenuTools.refetch()
        }
      })
  }
  };


  if(roleMenusTools.isLoading) {
    return <Backdrop loading={roleMenusTools.isLoading} />
  }

  return (
    <>
    {postMenu.isPending && <Backdrop loading={postMenu.isPending} />}
    {deleteMenu.isPending && <Backdrop loading={deleteMenu.isPending} />}
      <div>
        <Collapse>
          {roleMenusTools?.data?.data?.map((item: IRoleMenuTools) => (

            <Panel key={item.id} header={`${item.description}`}>
              <div>
                <Formik initialValues={initialValues} onSubmit={() => { }}>
                  {() => {
                    return (
                        <div className="grid grid-cols-2 md:grid-cols-4 p-8">
                          {item?.children?.map((sub: any) => {
                            return (
                              <div className="flex items-center" key={sub.id}>
                                    <Switch
                                      onChange={(checked) => handleCheckboxChange(sub.id, checked)}
                                      checked={roleIds?.includes(sub.id)}
                                    />
                                    <Typography text={sub.description} type="h6" />
                              </div>
                            );
                          })}
                        </div>
                    );
                  }}
                </Formik>
              </div>
            </Panel>
          ))}
        </Collapse>
      </div>
    </>
  )
}

export default RoleMenus;
