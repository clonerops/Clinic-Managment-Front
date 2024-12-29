import { useEffect } from 'react'
import FormikSelect from '../selects/FormikSelect'
import { dropdownDoctors } from '../../utils/dropdownsConvert'
import { useFetchDoctors } from '../../../modules/doctor/core/_hooks'

const FormikDoctors = (props: any) => {
  const fetchTools = useFetchDoctors()
  useEffect(() => {
    fetchTools.mutate({})
  }, [])
  return (
    <FormikSelect
      options={dropdownDoctors(fetchTools.data) || []}
      {...props}
    />
  )
}

export default FormikDoctors