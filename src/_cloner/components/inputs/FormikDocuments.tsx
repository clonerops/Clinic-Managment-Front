import { useEffect } from 'react'
import { useFetchDocuments } from '../../../modules/document/core/_hooks'
import FormikSelect from '../selects/FormikSelect'
import { dropdownDocuments } from '../../utils/dropdownsConvert'

const FormikDocuments = (props: any) => {
  const fetchTools = useFetchDocuments()
  useEffect(() => {
    fetchTools.mutate()
  }, [])
  return (
    <FormikSelect
      options={dropdownDocuments(fetchTools.data) || []}
      {...props}
    />
  )
}

export default FormikDocuments