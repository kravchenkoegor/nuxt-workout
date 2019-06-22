import {getters} from './getters';
import {actions} from './actions';
import {mutations} from './mutations';

export const state = () => ({
  title: 'Nuxt Workout',
  icon: 'menu',
  targetComponent: null
});

export const toolbar = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
