export const dropdownApplicationMenu = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, description:string }): any => {
            const { description, id } = obj;
            return { value: id, label: description };
        })
    );
};


export const dropdownPermissionsByMenu = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, description:string }): any => {
            const { description, id } = obj;
            return { value: id, label: description };
        })
    );
};

export const dropdownCategories = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, description:string }): any => {
            const { description, id } = obj;
            return { value: id, label: description };
        })
    );
};

export const dropdownDocuments = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, name:string }): any => {
            const { name, id } = obj;
            return { value: id, label: name };
        })
    );
};

export const dropdownDoctors = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, firstName:string, lastName:string }): any => {
            const { firstName, lastName, id } = obj;
            return { value: id, label: `${firstName} ${lastName}` };
        })
    );
};

export const dropdownPatients = (data: any) => {
    return (
        data &&
        data?.map((obj: { id: number, firstName:string, lastName:string }): any => {
            const { firstName, lastName, id } = obj;
            return { value: id, label: `${firstName} ${lastName}` };
        })
    );
};
