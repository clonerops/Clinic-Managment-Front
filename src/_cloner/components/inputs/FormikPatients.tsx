import { useEffect } from 'react'
import FormikSelect from '../selects/FormikSelect'
import {  dropdownPatients } from '../../utils/dropdownsConvert'
import { useFetchPatiens } from '../../../modules/patient/core/_hooks'

const FormikPatients = (props: any) => {
  const fetchTools = useFetchPatiens()
  
  useEffect(() => {
    fetchTools.mutate({})
  }, [])
  return (
    <FormikSelect
      options={dropdownPatients(fetchTools.data) || []}
      {...props}
    />
  )
}

export default FormikPatients