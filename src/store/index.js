import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	count: 0
};

const mutations = {
	countUp(state,payload) {
		state.count += 1;
	}
};

const actions = {
	addNumber({commit},payload) {
		commit('countUp',payload);
	}
};

export default new Vuex.Store({
	state: state,
	mutations: mutations,
	actions: actions
});