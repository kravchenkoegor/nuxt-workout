import Vue from 'vue';
import Vuex from 'vuex';

import {user} from './user';
import {training} from './training';
import {history} from './history';

Vue.use(Vuex);

export default () => new Vuex.Store({
  modules: {
    user,
    training,
    history
  },
  state: {
    loading: true
  },
  mutations: {
    setLoading(state, loading) {
      state.loading = loading
    }
  },
  actions: {
    setLoading({commit}, loading) {
      commit('setLoading', loading);
    }
  },
  getters: {
    loading: state => state.loading
  }
});
