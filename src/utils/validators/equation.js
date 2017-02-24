import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateInput (data) {
  let errors = {}

  // Check for null
  if (Validator.isNull(data.name)) {
    errors.name = 'Name is required'
  }

  if (Validator.isNull(data.note)) {
    errors.note = 'Note is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
