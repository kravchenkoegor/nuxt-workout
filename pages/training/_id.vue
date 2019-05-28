<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <div class="workout">
          <div class="workout__header">
            <div class="back back-0">
              <v-btn icon @click="$router.go(-1)">
                <v-icon>fas fa-chevron-left</v-icon>
              </v-btn>
            </div>

            <div class="workout__date">
              <i class="far fa-calendar-alt"></i>
              {{ getFormattedTrainingDate(training.date) }}
            </div>
            <div class="workout__time">
              <i class="far fa-clock"></i>
              {{ training.startTime }} <span>&mdash;</span> {{ training.endTime }}
            </div>
          </div>

          <div class="workout__body">
            <div
              v-for="(exercise, index) in training.exercises"
              :key="index"
              class="workout__exercise shadow"
            >
              <template v-if="isSuperSet(exercise)">
                <span class="workout__badge">
                  Суперсет
                </span>

                <div
                  v-for="(ex, idx) in exercise.superSet"
                  :key="idx"
                  class="workout__superset"
                >
                  <div class="workout__title">
                    {{ ex.title }}
                    <span class="muscle-group">
                      {{ ex.muscleGroup }}
                    </span>
                  </div>

                  <div
                    v-if="ex.sets && ex.sets.length"
                    class="workout__sets"
                  >
                    <p
                      v-for="(s, i) in ex.sets"
                      :key="i"
                    >
                      <template v-if="s.weight">
                        <span class="exercise__weight">
                          {{ s.weight }}
                        </span>
                      </template>
                      <span class="exercise__repeats">
                        {{ s.repeats }}
                        {{ !s.weight ? '&nbsp;раз' : '' }}
                      </span>
                    </p>
                  </div>
                </div>
              </template>

              <template v-else>
                <div class="workout__title">
                  {{ exercise.title }}
                  <span class="muscle-group">
                    {{ exercise.muscleGroup }}
                  </span>
                </div>

                <div
                  v-if="exercise.sets && exercise.sets.length"
                  class="workout__sets"
                >
                  <p
                    v-for="(set, idx) in exercise.sets"
                    :key="idx"
                  >
                    <template v-if="set.weight">
                      <span class="exercise__weight">
                        {{ set.weight }}
                      </span>
                    </template>
                    <span class="exercise__repeats">
                      {{ set.repeats }}
                      {{ !set.weight ? '&nbsp;раз' : '' }}
                    </span>
                  </p>
                </div>
              </template>
            </div>
          </div>

          <v-flex xs12 mt-4>
            <v-btn
              color="error"
              dark
              absolute
              bottom
              right
              fab
              small
              @click="deleteTraining"
            >
              <v-icon>fas fa-trash-alt</v-icon>
            </v-btn>
          </v-flex>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'Training',
    data: () => ({
      training: null
    }),
    created() {
      this.training = this.details;
    },
    async fetch({app, store, params}) {
      try {
        const result = await app.$axios.$get('/training/' + params.id);
        if (result) {
          store.dispatch('history/setTrainingDetails', result);
        }
      } catch (error) {
        console.error(error);
      }
    },
    computed: {
      ...mapGetters('history', ['details']),
      ...mapGetters('user', ['userId'])
    },
    methods: {
      ...mapActions('history', ['fetchTrainings']),
      async deleteTraining() {
        try {
          await this.$axios.$get('/delete/' + this.$route.params.id);
          await this.fetchTrainings(this.userId);
          this.$router.push({name: 'history'});
        } catch (error) {
          console.error(error);
        }
      },
      getFormattedTrainingDate(date) {
        return this.$moment(date).format('DD MMMM');
      },
      isSuperSet(exercise) {
        return exercise.isSuperSet
      }
    }
  }
</script>

<style lang="scss" scoped>
  .workout {
    &__header {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 1em;
      position: relative;
      text-align: center;
    }

    &__exercise {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: .5rem;

      & + & {
        margin-top: 1.5rem;
      }
    }

    &__badge {
      padding: .25rem .5rem;
      color: #ffffff;
      background-color: #30c670;
      border-radius: .25rem;
      font-size: 14px;
      line-height: 20px;
    }

    &__title {
      display: block;
      width: 100%;
      font-size: 14px !important;
      font-weight: 700;
      line-height: 25px !important;
      position: relative;
      padding: .5rem 75px .5rem 0;

      span {
        &.muscle-group {
          position: absolute;
          top: 7px;
          right: 0;
          padding: .25rem .5rem;
          color: #ffffff;
          background-color: #192A51;
          border-radius: .25rem;
          font-size: 12px;
          line-height: 18px !important;
        }
      }
    }

    &__sets {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid #ddd;
      padding-top: .75rem;

      p {
        flex-grow: 1;
        font-size: 14px;
        margin-bottom: 0;
        padding: 0 10px;
        position: relative;
        text-align: center;
        width: 100%;

        & + p {

          &:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 1px;
            background-color: #ddd;
          }
        }

        span {
          display: block;
          position: relative;

          &.exercise__weight,
          &.exercise__repeats {
            margin: 0 auto;
            max-width: 40px;
          }

          &.exercise__weight {
            text-align: left;
          }

          &.exercise__repeats {
            text-align: right;

            &:after {
              content: '';
              background: #888888;
              display: block;
              height: 1px;
              left: 0;
              top: 0;
              position: absolute;
              transform: rotate(-45deg);
              width: 100%;
            }

            &:only-child {
              line-height: 42px;
              margin: 0;
              max-width: none;
              text-align: center;

              &:after {
                display: none;
              }
            }
          }

          /*&:only-child {*/
          /*  text-align: center;*/

          /*  &:after {*/
          /*    display: none;*/
          /*  }*/
          /*}*/
        }
      }

      &__repeats {
        padding-right: .25rem;
      }

      &__weight {
        padding-left: .25rem;
      }
    }

    &__superset {
      & + & {
        margin-top: 16px;
      }
    }
  }

  button {
    &.btn {
      margin-top: 1.5rem;
      padding: .5rem 2rem;
      text-transform: uppercase;
      width: 100%;

      & + & {
        margin-left: 1rem;
      }
    }
  }
</style>
