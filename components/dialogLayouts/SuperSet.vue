<template>
  <div class="superset">
    <p>Упражнение 1</p>
    <exercise
      @closeDialog="dialog1 = false"
      @addNewExercise="addNewExercise"
    />
    <p>Упражнение 2</p>
    <exercise />
  </div>
</template>

<script>
  import Exercise from './Exercise';

  export default {
    name: 'SuperSet',
    components: {
      Exercise
    },
    data: () => ({
      dialog1: true,

    }),
    methods: {
      addNewExercise() {

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
