export const actions = {
  setTitle({commit}, title) {
    commit('setTitle', title);
  },
  setIcon({commit}, icon) {
    commit('setIcon', icon);
  },
  setTargetComponent({commit}, component) {
    commit('setTargetComponent', component);
  }
}
