import React, { FC } from 'react'
import Spinner from './Spin'

interface IProps {
    loading: boolean
}

const Backdrop:FC<IProps> = () => {
    return (
        <section className='flex justify-center items-center fixed w-full h-full top-0 right-0 bg-white transition z-[9999] ease-out bg-opacity-70'>
            <div className='flex flex-col justify-center items-center'>
                <Spinner />
            </div>
        </section>
    )
}

export default React.memo(Backdrop)