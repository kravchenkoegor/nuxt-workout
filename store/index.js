import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = () => new Vuex.Store({
  state: {
    user: null,
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
    authUser: (state, user) => state.user = user,
    logoutUser: (state) => state.user = null,
    addExercise (state, exercise) {
      state.exercise = exercise;
      state.exerciseInProgress = exercise.title;
      state.training.push(exercise);
    },
    addSet: (state, set) => state.exercise.sets.push(set),
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
    registerUser({commit}, credentials) {
      this.$axios.$post('/register', credentials)
        .then((result) => {
          const {user, token} = result;
          commit('authUser', user);
          localStorage.setItem('workout-token', token);
          localStorage.setItem('workout-userId', user._id);
          this.$router.push('/');
        })
        .catch((error) => console.error(error));
    },
    loginUser({commit}, credentials) {
      this.$axios.$post('/login', credentials)
        .then((result) => {
          const {user, token} = result;
          commit('authUser', user);
          localStorage.setItem('workout-token', token);
          localStorage.setItem('workout-userId', user._id);
          this.$router.push('/');
        })
        .catch(error => console.error(error));
    },
    authUserById({commit}, userId) {
      this.$axios.$post('/user', {userId})
        .then((result) => {
          const {user, token} = result;
          commit('authUser', user);
          localStorage.setItem('workout-token', token);
          localStorage.setItem('workout-userId', user._id);
          this.$router.push('/');
      })
        .catch(error => console.error(error));
    },
    logoutUser({commit}) {
      commit('logoutUser');
      localStorage.removeItem('workout-token');
      localStorage.removeItem('workout-userId');
    },
    addExercise ({commit}, exercise) {
      commit('addExercise', exercise)
    },
    addSet ({commit}, sets) {
      commit('addSet', sets)
    },
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
    user: (state) => state.user,
    training: (state) => state.training,
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
})

export default store
