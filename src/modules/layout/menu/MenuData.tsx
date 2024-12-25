export const MenuData = [
    {
        title: "داشبورد",
        url: "/dashboard",
        icon: "dashboard-svgrepo-com",
    },
    // {
    //     title: "ثبت اطلاعات بیمار",
    //     url: "/submit-patient",
    //     icon: "dashboard-svgrepo-com",
    // },

    {
        title: "مدیریت بیماران",
        url: "/patient-managment",
        icon: "help-circle-svgrepo-com",
        subMenu: [
            {
                title: "ثبت بیمار جدید",
                url: "/submit-patient",
                icon: "dashboard-svgrepo-com",
            },
            {
                title: "لیست بیماران",
                url: "/patients",

            },
        ]
    }

]