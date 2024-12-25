import {Bounce, toast} from 'react-toastify'

export const toastify = (type: "success" | "error" | "warning" | "info", message: string) => {
    switch (type) {
        case "success":
            toast.success(message, {
                position: "top-center",
                className: "!font-peyda-reqular",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
            break;
        case "error":
            toast.error(message, {
                position: "top-center",
                className: "!font-peyda-reqular",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
            break;
        case "warning":
            toast.warning(message, {
                position: "top-center",
                className: "!font-peyda-reqular",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
            break;
        case "info":
            toast.info(message, {
                position: "top-center",
                className: "!font-peyda-reqular",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
            break;
    
        default:
            break;
    }
}