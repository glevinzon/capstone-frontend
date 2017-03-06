import { connect } from 'react-redux'
import Equation from 'components/Equation'
import { getEquations, createEquation, getEquationsBySearch, updateEquation, deleteEquation, uploadFile } from 'store/modules/equations'

const mapActionCreators = {
  getEquations,
  createEquation,
  getEquationsBySearch,
  updateEquation,
  deleteEquation,
  uploadFile
}

const mapStateToProps = (state) => ({
  equations: state.equations
})

export default connect(mapStateToProps, mapActionCreators)(Equation)
