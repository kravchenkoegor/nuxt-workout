<template>
  <div id="addExercise">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-flex xs12 my-2>
            <template v-if="catalog">
              <v-list two-line dense>
                <v-list-group
                  v-for="(muscleGroup, index) in muscleGroups"
                  :key="index"
                >
                  <template v-slot:activator>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          <h4>{{ muscleGroup }}</h4>
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </template>

                  <v-list-tile
                    v-for="exercise in getExercisesByMuscleGroup(muscleGroup)"
                    :key="exercise.slug"
                    @click="addNewExercise(exercise)"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title>
                        {{ exercise.title }}
                      </v-list-tile-title>
                      <v-list-tile-sub-title>
                        {{ exercise.muscleGroup }}
                      </v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list-group>
              </v-list>
            </template>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'AddExercise',
    async fetch ({app, store}) {
      const result = await app.$axios.$get('/exercises');
      const {muscleGroups, exercises} = result;
      store.dispatch('exercises/setMuscleGroups', muscleGroups);
      store.dispatch('exercises/setExercises', exercises);
    },
    created() {
      this.setTitle('Добавить упражнение');
      this.setTargetComponent('create');
    },
    computed: {
      ...mapGetters('exercises', ['muscleGroups', 'catalog'])
    },
    methods: {
      ...mapActions('training', ['addExercise', 'setCurrentExercise']),
      ...mapActions('toolbar', ['setTitle', 'setTargetComponent']),
      getExercisesByMuscleGroup(muscleGroup) {
        return this.catalog.filter(ex => ex.muscleGroup === muscleGroup);
      },
      async addNewExercise(exercise) {
        await this.setCurrentExercise(exercise.slug);
        await this.addExercise({
          isSuperSet: false,
          ...exercise,
          sets: []
        });
        this.$router.push({name: 'create'});
      }
    }
  }
</script>

<style lang="scss">
  #addExercise {
    .v-list {
      background: #fbfef9;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 0;

      &__group {
        border-bottom: 1px solid #ddd;

        &:last-of-type {
          border-bottom: none;
        }

        &--active {
          border-bottom: none !important;

          &:before {
            display: none;
          }

          .v-list__group__header {
            border-bottom: 1px solid #ddd;
          }
        }
      }
    }
  }
</style>
