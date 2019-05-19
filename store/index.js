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
    circuit: [],
    exercise: {
      isSuperSet: false,
      title: '',
      muscleGroup: '',
      sets: []
    },
    exerciseInProgress: '',
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
      state.exercise = exercise;
      state.exerciseInProgress = exercise.title;
      state.training.push(exercise);
    },
    addSet: (state, set) => state.exercise.sets.push(set),
    addCircuit: (state, circuit) => state.circuit.push(circuit),
    saveExercise (state) {
      const ex = state.training.find(el => el.title === state.exerciseInProgress);
      ex.sets = state.exercise.sets
      state.exercise = {
        title: '',
        muscleGroup: '',
        sets: []
      };
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
    addSet ({commit}, sets) {
      commit('addSet', sets)
    },
    addCircuit: ({commit}, circuit) => commit('addCircuit', circuit),
    saveExercise ({commit}) {
      commit('saveExercise')
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
    training: (state) => state.training,
    circuit: (state) => state.circuit,
    history: (state) => state.history,
    getExercise (state) {
      return state.exercise
    },
    getTrainingDetails (state) {
      return state.trainingDetails
    },
    getWeightChart (state) {
      return state.weightChart
    },
  }
});
