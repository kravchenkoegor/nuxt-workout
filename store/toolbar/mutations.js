export const mutations = {
  setTitle: (state, title) => {
    state.title = title;
  },
  setIcon: (state, icon) => {
    state.icon = icon;
  },
  setTargetComponent(state, component) {
    state.targetComponent = component;
  }
}
