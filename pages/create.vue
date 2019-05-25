<template>
  <v-container id="create">
    <v-layout row wrap>
      <v-flex xs12>
        <v-flex xs12 class="back">
          <v-btn icon nuxt to="/add" exact>
            <v-icon>fas fa-chevron-left</v-icon>
          </v-btn>
        </v-flex>

        <v-flex xs12 class="position-relative">
          <h2>Тренировка</h2>
        </v-flex>

        <v-flex xs12 my-4>
          <date-picker
            :isOpen="datepicker"
            @closeDialog="saveDate"
          />
        </v-flex>

        <v-layout row>
          <v-flex xs6 pr-2>
            <p>Начало тренировки</p>
            <v-layout row>
              <v-flex xs6 d-flex justify-content-start>
                <v-text-field
                  v-model="startHH"
                  placeholder="чч"
                  type="number"
                  class="training__input training__input_time"
                  mask="##"
                ></v-text-field>

                <span class="training__divider">:</span>
              </v-flex>

              <v-flex xs6>
                <v-text-field
                  v-model="startMM"
                  placeholder="мм"
                  type="number"
                  class="training__input training__input_time"
                  mask="##"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs6 pl-2>
            <p>Конец тренировки</p>
            <v-layout row>
              <v-flex xs6 d-flex justify-content-start>
                <v-text-field
                  v-model="endHH"
                  placeholder="чч"
                  type="number"
                  class="training__input training__input_time"
                  mask="##"
                ></v-text-field>

                <span class="training__divider">:</span>
              </v-flex>

              <v-flex xs6>
                <v-text-field
                  v-model="endMM"
                  placeholder="мм"
                  type="number"
                  class="training__input training__input_time"
                  mask="##"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>

<!--        <v-flex xs12 my-4 v-if="circuit.length">-->
<!--          <div v-for="(c, i) in circuit"-->
<!--               :key="i"-->
<!--               class="training__circuit"-->
<!--               :class="{'mb-4': i !== c.length - 1}"-->
<!--          >-->
<!--            <circuit :circuit="c" :index="i" />-->
<!--          </div>-->
<!--        </v-flex>-->

        <v-flex xs12 my-4 v-if="training.length">
          <v-list two-line class="training__list">
            <v-list-tile
              v-for="(exercise, index) in training"
              :key="index"
              class="mb-4"
            >
              <v-list-tile-content>
                <template v-if="!exercise.isSuperSet">
                  <v-list-tile-title>
                    {{ exercise.title }}
                  </v-list-tile-title>

                  <v-list-tile-sub-title>
                    {{ exercise.muscleGroup }}
                  </v-list-tile-sub-title>

                  <div class="exercise__sets">
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
                  </div>
                </template>

                <template v-else>
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
                </template>

                <v-btn
                  color="secondary"
                  class="exercise__add-set"
                  @click="openDialogSet(index)"
                >
                  <v-icon left small>fas fa-plus-circle</v-icon>
                  подход
                </v-btn>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>

        <v-flex xs12 mt-4>
          <v-layout row>
            <v-flex xs6>
              <v-btn
                color="primary"
                @click="dialog = !dialog"
                class="my-0 ml-0 mr-1"
              >
                <v-icon left small>fas fa-plus-circle</v-icon>
                упражнение
              </v-btn>
            </v-flex>

            <v-flex xs6>
              <v-btn
                color="accent"
                dark
                block
                @click="saveNewTraining"
                class="my-0 mr-0 ml-1"
              >
                <v-icon left small>fas fa-check-circle</v-icon>
                Сохранить
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-dialog v-model="dialog">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Добавить упражнение</v-toolbar-title>
          </v-toolbar>

          <v-layout align-center justify-center>
            <v-flex xs12>
              <v-card>
                <v-card-text class="pb-0">
                  <v-checkbox
                    v-model="isSuperSet"
                    color="primary"
                    label="Суперсет"
                    class="ma-0 pt-0 training__checkbox"
                    hide-details
                  ></v-checkbox>
                </v-card-text>

                <template v-if="!newExercise.title">
                  <exercise
                    :is-super-set="isSuperSet"
                    @closeDialog="dialog = false"
                    @addNewExercise="addNewExercise"
                  />
                </template>
              </v-card>
            </v-flex>
          </v-layout>
        </v-dialog>

        <set
          :is-open="dialogSets"
          :is-super-set="isSuperSet"
          :exercise-title="getCurrentExercise || ''"
          @addSet="addNewSet"
          @closeDialog="dialogSets = false"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import DatePicker from '../components/dialogLayouts/DatePicker';
  import Exercise from '../components/dialogLayouts/Exercise';
  import Set from '../components/dialogLayouts/Set';

  export default {
    name: 'Create',
    components: {
      DatePicker,
      Exercise,
      Set
    },
    data: () => ({
      datepicker: false,
      startHH: null,
      startMM: null,
      endHH: null,
      endMM: null,
      dialog: false,
      dialogSets: false,
      isSuperSet: false,
      exerciseIndex: 0,
      newExercise: {
        title: '',
        muscleGroup: '',
        sets: []
      }
    }),
    created() {
      if (!this.isAuth) {
        this.$router.push('/login');
      }
    },
    mounted() {
      // TODO время начала тренировки
    },
    computed: {
      ...mapGetters('user', ['isAuth', 'userId']),
      ...mapGetters(['training', 'date']),
      getCurrentExercise() {
        const exercise = this.training[this.exerciseIndex];
        if (exercise) {
          if (!exercise.isSuperSet) {
            return exercise.title;
          } else {
            const {superSet} = exercise;
            return superSet.map(s => s.title);
          }
        }
      },
      computedDateFormatted() {
        return this.formatDate(this.date);
      }
    },
    methods: {
      ...mapActions([
        'addExercise',
        'addSet',
        'saveTraining',
        'setDate'
      ]),
      openDialogSet(index) {
        this.dialogSets = !this.dialogSets;
        this.exerciseIndex = index;
      },
      addNewExercise(exercise) {
        let payload;
        if (!Array.isArray(exercise)) {
          payload = {
            isSuperSet: this.isSuperSet,
            ...exercise,
            sets: []
          }
        } else {
          payload = {
            isSuperSet: this.isSuperSet,
            superSet: [...exercise]
          }
        }

        this.addExercise(payload)
          .then(() => this.dialog = false)
          .catch(error => console.error(error));
      },
      addNewSet(set) {
        this.addSet({exerciseIndex: this.exerciseIndex, set})
          .then(() => this.dialogSets = false)
          .catch(error => console.error(error));
      },
      saveNewTraining() {
        const [year, month, day] = this.date.split('-');

        this.saveTraining({
          day,
          month,
          year,
          date: this.date,
          startTime: `${this.startHH}:${this.startMM}`,
          endTime: `${this.endHH}:${this.endMM}`,
          exercises: this.training,
          createdBy: this.userId
        })
          .then(() => this.$router.push('/history'))
          .catch(error => console.error(error))
      },
      saveDate(date) {
        this.setDate(date);
        this.datepicker = false;
      },
      clear() {
        this.newExercise = {
          title: '',
          muscleGroup: '',
          sets: []
        };
      },
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
          padding: 1.5rem;
          text-align: center;
          height: auto;
          background-color: #eee;
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
