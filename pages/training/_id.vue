<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <div class="workout">
          <div class="workout__header">
            <div class="back back-0">
              <v-btn icon nuxt to="/add" exact>
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

          <template v-if="!training.isSuperSet">
            <div class="workout__body">
              <div
                v-for="(exercise, index) in training.exercises"
                :key="index"
                class="workout__exercise shadow"
              >
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
                    <span class="exercise__repeats">
                      {{ set.repeats }}{{ !set.weight ? '&nbsp;раз' : '' }}
                    </span>
                    <template v-if="set.weight">
                      <span class="divider">&nbsp;/&nbsp;</span>
                      <span class="exercise__weight">{{ set.weight }}</span>
                    </template>
                  </p>
                </div>
              </div>
            </div>
          </template>

          <v-flex xs12 mt-4>
            <v-layout row>
              <v-flex xs6 mr-1>
                <v-btn
                  nuxt
                  block
                  color="primary"
                  to="/history"
                  class="ma-0"
                >
                  <v-icon left small>fas fa-list-ul</v-icon>
                  Журнал
                </v-btn>
              </v-flex>

              <v-flex xs6 ml-1>
                <v-btn
                  color="error"
                  dark
                  block
                  @click="deleteTraining"
                  class="ma-0"
                >
                  <v-icon left small>fas fa-trash-alt</v-icon>
                  Удалить
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'Training',
    data: () => ({
      training: null
    }),
    created () {
      this.training = this.trainingDetails;
    },
    async fetch ({ app, store, params }) {
      try {
        let result = await app.$axios.$get('/training/' + params.id)
        if (result) {
          store.dispatch('setTrainingDetails', result)
        }
      } catch (error) {
        console.error(error);
      }
    },
    computed: {
      ...mapGetters(['trainingDetails'])
    },
    methods: {
      async deleteTraining () {
        const result = await this.$axios.$get('/delete/' + this.$route.params.id)
        if (result) {
          this.$router.push({ name: 'history' })
        }
      },
      getFormattedTrainingDate(date) {
        return this.$moment(date).format('DD MMMM');
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

    &__title {
      display: block;
      width: 100%;
      font-size: 14px !important;
      font-weight: 700;
      line-height: 25px !important;
      position: relative;
      padding: .5rem 50px .75rem 0;

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
      border-top: 1px solid rgba(#1a1a1a, .4);
      padding-top: .75rem;

      p {
        margin-bottom: 0;
        position: relative;
        width: 100%;
        flex-grow: 1;
        text-align: center;

        & + p {

          &:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 1px;
            background-color: #cccccc;
          }
        }
      }

      &__repeats {
        padding-right: .25rem;
      }

      &__weight {
        padding-left: .25rem;
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
