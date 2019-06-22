export const mutations = {
  addExercise(state, exercise) {
    state.exercises.push(exercise);
  },
  addSet(state, {slug, set}) {
    const exercise = state.exercises.find(ex => ex.slug === slug);
    if (Array.isArray(set)) {
      set.forEach((s, i) => exercise.superSet[i].sets.push(s));
    } else {
      exercise.sets.push(set);
    }
  },
  setCurrentExercise(state, slug) {
    state.currentExercise = state.exercises.find(ex => ex.slug === slug);
  },
  setDate(state, date) {
    state.date = date;
  },
  setStartTime(state, startTime) {
    state.startTime = startTime;
  },
  setEndTime(state, endTime) {
    state.endTime = endTime;
  },
  clearTraining(state) {
    state.exercises.length = 0;
  }
}
