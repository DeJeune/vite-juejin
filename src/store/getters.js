const getters = {
  commonTools: (state) => {
    let commonTools = localStorage.getItem('commonTools')
      ? JSON.parse(localStorage.getItem('commonTools'))
      : [];
    if (commonTools.length > 0) {
      state.commonTools = commonTools;
    }
    return state.commonTools;
  }
};

export default getters;
