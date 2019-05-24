import Vue from 'vue';
import Vuex from 'vuex';

import {user} from './user';

Vue.use(Vuex);

export default () => new Vuex.Store({
  modules: {
    user,
  },
  state: {
    training: [],
    date: '',
    startTime: '',
    endTime: '',
    history: [],
    trainingDetails: {
      date: '',
      startTime: '',
      endTime: '',
      exercises: []
    },
    weightChart: []
  },
  mutations: {
    addExercise (state, exercise) {
      state.training.push(exercise);
    },
    addSet: (state, {exerciseIndex, set}) => {
      const exercise = state.training[exerciseIndex];

      if (Array.isArray(set)) {
        set.forEach((s, i) => {
          console.log({s, i, exercise})
          exercise.superSet[i].sets.push(s)
        })
      } else {
        exercise.sets.push(set);
      }
    },
    setTrainingsHistory: (state, history) => state.history = history,
    setDate (state, date) {
      state.date = date
    },
    setStartTime (state, startTime) {
      state.startTime = startTime
    },
    setEndTime (state, endTime) {
      state.endTime = endTime
    },
    setTrainingDetails (state, data) {
      state.trainingDetails = data
    },
    setWeightChart (state, data) {
      state.weightChart = data
    }
  },
  actions: {
    addExercise ({commit}, exercise) {
      commit('addExercise', exercise)
    },
    addSet ({commit}, payload) {
      commit('addSet', payload);
    },
    saveTraining({commit}, training) {
      this.$axios.post('/create', training)
        .catch((error) => console.error(error));
    },
    fetchTrainingsHistory({commit}, userId) {
      this.$axios.post('/history', {userId})
        .then(({data}) => commit('setTrainingsHistory', data))
        .catch((error) => console.error(error));
    },
    setTrainingsHistory ({commit}, history) {
      commit('setTrainingsHistory', history)
    },
    fetchTrainingsByDate({commit}, date) {
      this.$axios.get(`/history/${date}`)
        .then(({data}) => commit('setTrainingsHistory', data))
        .catch((error) => console.error(error));
    },
    setDate ({commit}, date) {
      commit('setDate', date)
    },
    setStartTime ({commit}, startTime) {
      commit('setStartTime', startTime)
    },
    setEndTime ({commit}, endTime) {
      commit('setEndTime', endTime)
    },
    setTrainingDetails ({commit}, data) {
      commit('setTrainingDetails', data)
    },
    setWeightChart ({commit}, data) {
      commit('setWeightChart', data)
    }
  },
  getters: {
    training: state => state.training,
    history: state => state.history,
    date: state => state.date,
    trainingDetails: state => state.trainingDetails,
    getWeightChart (state) {
      return state.weightChart
    },
  }
});
