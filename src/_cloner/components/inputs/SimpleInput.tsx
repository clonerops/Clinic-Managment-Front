import { Input } from 'antd'
import { FC } from 'react'

interface IProps {
    placeholder: string
}

const SimpleInput:FC<IProps> = ({placeholder}) => {
  return (
    <>
        <Input placeholder={placeholder} className='font-peyda-reqular' />
    </>
  )
}

export default SimpleInput