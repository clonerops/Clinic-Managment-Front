import { http } from "../../_cloner/utils/axiosConfig";
import { IRoleMenu } from "./_models";

const getRoleMenus = async () => {
    try {
        const { data } = await http.get("/RoleMenu");
        return data;    
    } catch (error: any) {
        return error.response
    }
};
const getRoleMenusById = async (roleId: string) => {
    try {
        const { data } = await http.get(`/RoleMenu?roleId=${roleId}`);
        return data;    
    } catch (error: any) {
        return error.response
    }
};

const postRoleMenus = async (formData: IRoleMenu) => {
    try {
        const { data } = await http.post(
            "/RoleMenu",
            JSON.stringify(formData)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const getApplicationMenus = async () => {
    try {
        const { data } = await http.get("/RoleMenu/GetApplicationMenus");
        return data;    
    } catch (error: any) {
        return error.response
    }
};
const getAllApplicationMenus = async () => {
    try {
        const { data } = await http.get("/RoleMenu/GetALlApplicationMenus");
        return data;    
    } catch (error: any) {
        return error.response
    }
};

const deleteRoleMenu = async (id: string) => {
    try {
        return await http.delete(`/RoleMenu/${id}`).then((res) => res?.data);
    } catch (error: any) {
        return error.response;
    }
};


export {
    getRoleMenus,
    getRoleMenusById,
    postRoleMenus,
    getApplicationMenus,
    deleteRoleMenu,
    getAllApplicationMenus
}