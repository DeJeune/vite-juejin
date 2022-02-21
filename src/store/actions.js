import * as types from './mutation_types.js';
export const setRoutes = ({ commit }, routes) => {
  commit(types.SET_HOME_ROUTES, routes);
};

export const setHomeRouteIndex = ({ commit, state }, routeIndex) => {
  let { routesIndex } = state;
  routesIndex = Object.assign(routesIndex, routeIndex);
  commit(types.SET_ROUTE_INDEX, routesIndex);
};
