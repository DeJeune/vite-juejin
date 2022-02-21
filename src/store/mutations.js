import * as types from './mutation_types.js';
const mutations = {
  [types.SET_HOME_ROUTES](state, homeRoutes) {
    state.homeRoutes = homeRoutes;
  },
  [types.SET_ROUTE_INDEX](state, routeIndex) {
    state.routesIndex = routeIndex;
  },
  [types.COMMON_TOOLS](state, ary) {
    localStorage.setItem('commonTools', JSON.stringify(ary));
    state.commonTools = ary;
  }
};
export default mutations;
