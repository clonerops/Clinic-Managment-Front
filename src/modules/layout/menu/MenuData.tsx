export const MenuData = [
    {
        title: "داشبورد",
        url: "/dashboard",
        icon: "dashboard-svgrepo-com",
    },
    {
        title: "مدیریت بیماران",
        url: "/patient-managment",
        icon: "dashboard-svgrepo-com",
        subMenu: [
            {
                title: "ثبت بیمار جدید",
                url: "/submit-patient",
                icon: "dot-small-svgrepo-com",
            },
            {
                title: "لیست بیماران",
                icon: "dot-small-svgrepo-com",
                url: "/patients",

            },
        ]
    },
    {
        title: "مدیریت پرونده ها",
        url: "/patient-files",
        icon: "dashboard-svgrepo-com",
    },
    {
        title: "مدیریت پزشکان",
        url: "/doctors",
        icon: "dashboard-svgrepo-com",
    },
    {
        title: "مدیریت مراجعات",
        url: "/referrals",
        icon: "dashboard-svgrepo-com",
    },
    {
        title: "مدیریت نوع پرونده",
        url: "/documents",
        icon: "dashboard-svgrepo-com",
    },
    {
        title: "گزارشات",
        url: "/report-managment",
        icon: "dashboard-svgrepo-com",
        subMenu: [
            {
                title: "گزارش بیماران",
                url: "/patient-report",
                icon: "dot-small-svgrepo-com",
            },
            {
                title: "گزارش تعداد مراجعات",
                icon: "dot-small-svgrepo-com",
                url: "/patient-report-referral",

            },
        ]
    },
]