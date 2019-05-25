import {getters} from './getters';
import {actions} from './actions';
import {mutations} from './mutations';

export const state = () => ({
  trainings: [],
  trainingDetails: {
    date: null,
    startTime: null,
    endTime: null,
    exercises: []
  }
});

export const history = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
