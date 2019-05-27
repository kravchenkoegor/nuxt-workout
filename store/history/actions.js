export const actions = {
  fetchTrainings({commit}, userId) {
    this.$axios.post('/history', {userId})
      .then(({data}) => commit('setHistory', data))
      .catch(error => console.error(error));
  },
  setHistory({commit}, history) {
    commit('setHistory', history);
  },
  // fetchTrainingsByMonth({commit}, date) {
  //   this.$axios.get(`/history/${date}`)
  //     .then(({data}) => commit('setHistory', data))
  //     .catch(error => console.error(error));
  // },
  setTrainingDetails({commit}, data) {
    commit('setTrainingDetails', data);
  }
}
