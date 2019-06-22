import {getters} from './getters';
import {actions} from './actions';
import {mutations} from './mutations';

export const state = () => ({
  muscleGroups: [],
  catalog: []
});

export const exercises = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
