import { FC } from "react"

interface IProps {
    type: "h1" | "h2" |"h3" |"h4" |"h5" |"h6" |"bodyLg" | "bodyMd" | "bodySm" | "bodyXs" | "subtitle" | "subtitleXs" , 
    text: string,
    typographyTextClassName?: string
}

const Typography:FC<IProps> = ({type, text, typographyTextClassName}) => {

    const renderTypography = () => {
        switch (type) {
            case "h1":
                return <span className={`${typographyTextClassName} font-peyda-bold text-4xl`}>{text}</span>
                break;
            case "h2":
                return <span className={`${typographyTextClassName} font-peyda-bold text-3xl`}>{text}</span>
                break;
            case "h3":
                return <span className={`${typographyTextClassName} font-peyda-bold text-2xl`}>{text}</span>
                break;
            case "h4":
                return <span className={`${typographyTextClassName} font-peyda-bold text-xl`}>{text}</span>
                break;
            case "h5":
                return <span className={`${typographyTextClassName} font-peyda-bold text-lg`}>{text}</span>
                break;
            case "h6":
                return <span className={`${typographyTextClassName} font-peyda-bold text-md`}>{text}</span>
                break;
            case "bodyLg":
                return <span className={`${typographyTextClassName} font-peyda-medium text-lg`}>{text}</span>
                break;
            case "bodyMd":
                return <span className={`${typographyTextClassName} font-peyda-medium text-md`}>{text}</span>
                break;
            case "bodySm":
                return <span className={`${typographyTextClassName} font-peyda-medium text-sm`}>{text}</span>
                break;
            case "bodyXs":
                return <span className={`${typographyTextClassName} font-peyda-medium text-xs`}>{text}</span>
                break;
            case "subtitle":
                return <span className={`${typographyTextClassName} font-peyda-thin text-sm`}>{text}</span>
                break;
            case "subtitleXs":
                return <span className={`${typographyTextClassName} font-peyda-thin text-xs`}>{text}</span>
                break;
        
            default:
                break;
        }
    }

  return (
    <>
        {renderTypography()}
    </>
  )
}

export default Typography