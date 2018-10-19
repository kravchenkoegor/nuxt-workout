import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    training: [],
    exercise: {
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
      state.exercise = exercise
      state.exerciseInProgress = exercise.title
      state.training.push(exercise)
    },
    addSet (state, set) {
      state.exercise.sets.push(set)
    },
    saveExercise (state) {
      const ex = state.training.find(el => el.title === state.exerciseInProgress)
      ex.sets = state.exercise.sets
      state.exercise = {
        title: '',
        muscleGroup: '',
        sets: []
      }
    },
    setTrainingsHistory (state, history) {
      state.history = history
    },
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
    saveExercise ({commit}) {
      commit('saveExercise')
    },
    setTrainingsHistory ({commit}, history) {
      commit('setTrainingsHistory', history)
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
    getTraining (state) {
      return state.training
    },
    getExercise (state) {
      return state.exercise
    },
    getTrainingsHistory (state) {
      return state.history
    },
    getTrainingDetails (state) {
      return state.trainingDetails
    },
    getWeightChart (state) {
      return state.weightChart
    }
  }
})

export default store
