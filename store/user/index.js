import {getters} from './getters';
import {actions} from './actions';
import {mutations} from './mutations';

export const state = {
  isAuth: false,
  username: null,
  email: null,
  createdDate: null,
  userId: null
};

export const user = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
