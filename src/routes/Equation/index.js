import EquationLayout from 'containers/EquationLayout/EquationLayoutContainer'
import Equation from './containers/EquationContainer'

export default(store) => ({
  getComponent (nextState, cb) {
    require.ensure([], require => {
      cb(null, EquationLayout)
    })
  },

  childRoutes: [
    {
      path: '/',
      component: Equation
    }
  ]
})
