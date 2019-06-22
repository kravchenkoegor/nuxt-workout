import {getters} from './getters';
import {actions} from './actions';
import {mutations} from './mutations';

export const state = () => ({
  currentExercise: null,
  exercises: [],
  date: null,
  startTime: null,
  endTime: null
});

export const training = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
