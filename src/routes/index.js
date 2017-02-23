import EquationRoute from './Equation'

export const createRoutes = store => ({
  childRoutes: [
    EquationRoute(store)
  ]
})

export default createRoutes
