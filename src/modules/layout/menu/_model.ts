// export interface IMenu {
//     title?: string
//     description?: string
//     to?: string
//     icon?: string
//     children?: {
//         title: string
//         to: string
//     }[]
// }
export interface IMenu {
    title?: string
    description?: string
    url?: string
    icon?: string
    subMenu?: {
        title: string
        url: string
    }[]
}