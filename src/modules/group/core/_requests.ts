import { http } from "../../../_cloner/utils/axiosConfig";
import { IGroup } from "./_models";

const postApplicationRoles = async (formdata: IGroup) => {
    try {
        const { data } = await http.post(
            "/ApplicationRole",
            JSON.stringify(formdata)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
};
const putApplicationRoles = async (formdata: IGroup) => {
    try {
        const { data } = await http.put(
            `/ApplicationRole/${formdata.id}`,
            JSON.stringify(formdata)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
};
const getApplicationRoles = async () => {
    try {
        const { data } = await http.get("/ApplicationRole");
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const getApplicationRole = async (id: string) => {
    try {
        const { data } = await http.get(`/ApplicationRole/${id}`);
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const deleteApplicationRoles = async (id: string) => {
    try {
        const { data } = await http.delete(`/ApplicationRole/${id}`);
        return data;
    } catch (error: any) {
        return error.response;
    }
};


export {
    postApplicationRoles,
    getApplicationRoles,
    getApplicationRole,
    deleteApplicationRoles,
    putApplicationRoles
}