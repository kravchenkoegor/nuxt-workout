export const mutations = {
  setHistory (state, history) {
    state.trainings = history;
  },
  setTrainingDetails(state, data) {
    state.details = data;
  }
}
