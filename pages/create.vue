<template>
  <v-container id="create">
    <v-layout row wrap>
      <v-flex xs12>
        <v-flex xs12 my-3>
          <date-picker
            :isOpen="datepicker"
            @closeDialog="saveDate"
          />
        </v-flex>

        <template v-if="exercises.length">
          <v-flex xs12 my-4>
            <v-list two-line class="training__list">
              <v-list-tile
                v-for="exercise in exercises"
                :key="exercise.slug"
                class="mb-3"
                @click="addExercise(exercise.slug)"
              >
                <v-list-tile-content>
                  <template v-if="!exercise.isSuperSet">
                    <v-list-tile-title>
                      {{ exercise.title }}
                    </v-list-tile-title>

                    <v-list-tile-sub-title>
                      {{ exercise.muscleGroup }}
                    </v-list-tile-sub-title>

                    <!-- <div class="exercise__sets">
                      <p
                        v-for="(set, idx) in exercise.sets"
                        :key="idx"
                      >
                      <span class="exercise__repeats">
                        {{ set.repeats }}
                      </span>
                        <span class="exercise__weight">
                        {{ set.weight }}
                      </span>
                      </p>
                    </div> -->
                  </template>

                  <!-- <template v-else>
                    <div
                      v-for="(superset, idx) in exercise.superSet"
                      :key="idx"
                      class="superset"
                    >
                      <v-list-tile-title>
                        {{ superset.title }}
                      </v-list-tile-title>

                      <v-list-tile-sub-title>
                        {{ superset.muscleGroup }}
                      </v-list-tile-sub-title>

                      <div class="exercise__sets">
                        <p
                          v-for="(set, i) in superset.sets"
                          :key="i"
                        >
                      <span class="exercise__repeats">
                        {{ set.repeats }}
                      </span>
                          <span class="exercise__weight">
                        {{ set.weight }}
                      </span>
                        </p>
                      </div>
                    </div>
                  </template> -->
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-flex>
        </template>

        <template v-else>
          <v-flex xs12 my-4>
            <h4>Упражнений пока нет</h4>
          </v-flex>
        </template>

        <v-flex xs12 mt-4>
          <v-btn
            color="accent"
            dark
            absolute
            bottom
            left
            block
            @click="saveNewTraining"
            style="max-width: 180px; margin: 0 auto 10px;"
          >
            <v-icon left>check_circle</v-icon>
            Сохранить
          </v-btn>

          <v-btn
            color="primary"
            dark
            absolute
            bottom
            right
            fab
            nuxt
            to="/add/exercise"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import DatePicker from '../components/dialogLayouts/DatePicker';

  export default {
    name: 'Create',
    components: {
      DatePicker
    },
    data: () => ({
      datepicker: false,
      startTime: null,
      endTime: null
    }),
    created() {
      if (!this.isAuth) {
        this.$router.push('/login');
      }

      this.setTitle('Тренировка');
      this.setTargetComponent('index');
    },
    mounted() {
      this.startTime = this.$moment().format('HH:mm');
      this.setStartTime(this.startTime);
    },
    computed: {
      ...mapGetters('user', ['isAuth', 'userId']),
      ...mapGetters('training', ['exercises','date']),
      computedDateFormatted() {
        return this.formatDate(this.date);
      }
    },
    methods: {
      ...mapActions('training', [
        'setDate',
        'setStartTime',
        'setCurrentExercise',
        'saveTraining',
        'clearTraining'
      ]),
      ...mapActions('history', ['fetchTrainings']),
      ...mapActions('toolbar', ['setTitle', 'setTargetComponent']),
      async addExercise(slug) {
        await this.setCurrentExercise(slug);
        this.$router.push('/exercise');
      },
      saveNewTraining() {
        const [year, month, day] = this.date.split('-');
        const endTime = this.$moment().format('HH:mm');

        this.saveTraining({
          day,
          month,
          year,
          date: this.date,
          startTime: this.startTime,
          endTime,
          exercises: this.exercises,
          createdBy: this.userId
        })
          .then(() => this.clearTraining())
          .then(() => this.fetchTrainings(this.userId))
          .then(() => this.$router.push('/history'))
          .catch(error => console.error(error))
      },
      saveDate(date) {
        this.setDate(date);
        this.datepicker = false;
      }
    }
  }
</script>

<style lang="scss">
  #create {
    .training {
      &__input {
        margin: 0;
        padding: 0;
        height: 32px;

        .v-input__slot {
          margin: 0;
        }

        &_time {
          input {
            text-align: center;
          }
        }
      }

      &__checkbox {
        .v-input--selection-controls:not(.v-input--hide-details) .v-input__slot {
          margin: 0 !important;
        }
      }

      &__divider {
        padding: 0 .5rem;
        align-self: center;
      }

      &__list {
        padding: 0;

        .v-list__tile {
          box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
          padding: 1.5rem;
          text-align: center;
          height: auto;
          // background-color: #eee;
          border-radius: 0.5rem;
          margin-top: 1rem;

          &:first-child {
            margin-top: 0;
          }

          &__content {
            text-align: center;
            align-items: center;
          }

          &__title {
            text-align: center;
          }
        }
      }

      &__circuit {
        background: #eee;
        border-radius: .5rem;
        padding: 1rem;

        h4 {
          margin-bottom: 1rem;
          text-align: center;
        }

        .training__list {
          background: #eee;

          .v-list__tile {
            background: #fff;
            padding: .5rem;
          }
        }
      }
    }

    .v-dialog {
      .v-text-field {
        padding: 0;
        margin: 0;
      }

      .v-card {
        padding: 0 1rem;

        &__title {
          padding: 1rem 0;
          font-size: 20px !important;
          border-bottom: 1px solid #eee;
        }

        &__text {
          padding: 2rem 0 0;
          border-bottom: 1px solid #eee;
        }

        &__actions {
          padding: 1rem 0;
        }

        &__btn {
          display: inline-block;
          width: auto;
          padding-left: 1rem;
          padding-right: 1rem;
        }
      }

      .v-input--selection-controls:not(.v-input--hide-details) .v-input__slot {
        margin: 0 !important;
      }
    }

    .v-date-picker-title__year {
      font-size: 16px;
    }

    .exercise {
      &__sets {
        display: flex;

        p + p {
          margin-left: 1rem;
        }
      }

      &__repeats {
        display: block;
        padding: 0 4px 4px;
        border-bottom: 1px solid #1a1a1a;
        text-align: center;
      }

      &__weight {
        display: block;
        padding: 4px 4px 0;
        text-align: center;
      }

      &__add-set {
        display: inline-block;
        width: auto;
        padding-left: 1rem;
        padding-right: 1rem;
        margin: 1rem 0 0;
      }
    }

    .superset {
      align-items: center;
      border-bottom: 1px solid darken(#eee, 15%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-bottom: 16px;
      width: 100%;

      & + .superset {
        padding-top: 16px;
      }

      &:last-of-type {
        border-bottom: none;
      }
    }
  }

  p {
    margin: 0;
  }
</style>
