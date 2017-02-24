import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateInput (data) {
  let errors = {}

  // Check for null
  if (Validator.isNull(data.username)) {
    errors.username = 'Username is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
