export const actions = {
  addExercise({commit}, exercise) {
    commit('addExercise', exercise);
  },
  addSet({commit}, payload) {
    commit('addSet', payload);
  },
  setCurrentExercise({commit}, slug) {
    commit('setCurrentExercise', slug);
  },
  saveTraining({commit}, training) {
    this.$axios.post('/create', training)
      .catch(error => console.error(error));
  },
  setDate({commit}, date) {
    commit('setDate', date);
  },
  setStartTime({commit}, startTime) {
    commit('setStartTime', startTime);
  },
  clearTraining({commit}) {
    commit('clearTraining');
  }
}
