export const mutations = {
  addExercise(state, exercise) {
    state.exercises.push(exercise);
  },
  addSet(state, {exerciseIndex, set}) {
    const exercise = state.exercises[exerciseIndex];
    if (Array.isArray(set)) {
      set.forEach((s, i) => exercise.superSet[i].sets.push(s));
    } else {
      exercise.sets.push(set);
    }
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
