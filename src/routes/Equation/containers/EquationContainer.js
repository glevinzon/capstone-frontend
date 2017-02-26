import { connect } from 'react-redux'
import Equation from 'components/Equation'
import { getEquations, createEquation, getEquation, updateEquation, deleteEquation } from 'store/modules/equations'

const mapActionCreators = {
  getEquations,
  createEquation,
  getEquation,
  updateEquation,
  deleteEquation
}

const mapStateToProps = (state) => ({
  equations: state.equations
})

export default connect(mapStateToProps, mapActionCreators)(Equation)
