export const mutations = {
  authUser: (state, user) => {
    state.isAuth = true;

    for (let [key, value] of Object.entries(user)) {
      state[key] = value;
    }
  },
  logoutUser: state => {
    state.isAuth = false;

    for (let key of Object.keys(state)) {
      key !== 'isAuth' ? key = null : key = false;
    }
  },
}
