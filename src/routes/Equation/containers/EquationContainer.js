import { connect } from 'react-redux'
import Equation from 'components/Equation'
import { getEquations, createEquation, getEquation, updateEquation } from 'store/modules/equations'

const mapActionCreators = {
  getEquations,
  createEquation,
  getEquation,
  updateEquation
}

const mapStateToProps = (state) => ({
  equations: state.equations
})

export default connect(mapStateToProps, mapActionCreators)(Equation)
