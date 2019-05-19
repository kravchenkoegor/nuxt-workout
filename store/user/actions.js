export const actions = {
  registerUser({commit, dispatch}, credentials) {
    this.$axios.$post('/register', credentials)
      .then((result) => dispatch('setUser', (result)))
      .catch((error) => console.error(error));
  },
  loginUser({commit, dispatch}, credentials) {
    this.$axios.$post(`/login`, credentials)
      .then((result) => dispatch('setUser', (result)))
      .catch(error => console.error(error));
  },
  authUserById({commit, dispatch}, userId) {
    this.$axios.$post('/user', {userId})
      .then((result) => dispatch('setUser', (result)))
      .catch(error => console.error(error));
  },
  logoutUser({commit}) {
    commit('logoutUser');
    localStorage.removeItem('workout-token');
    localStorage.removeItem('workout-userId');
  },
  setUser({commit}, {user, token}) {
    const {username, email, createdDate} = user;
    commit('authUser', {
      userId: user._id,
      username,
      email,
      createdDate
    });
    localStorage.setItem('workout-token', token);
    localStorage.setItem('workout-userId', user._id);
    this.$router.push('/');
  }
}
