import { http } from "../../../_cloner/utils/axiosConfig";

export const getMenuItems = async () => {
    try {
        const { data } = await http.get("/RoleMenu/GetApplicationMenus");
        return data;
    } catch (error: any) {
        return error.response;
    }
};
export const getAllMenuItems = async () => {
    try {
        const { data } = await http.get("/RoleMenu/GetAllApplicationMenus");
        return data;
    } catch (error: any) {
        return error.response;
    }
};
