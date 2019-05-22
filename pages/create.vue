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

        <v-flex xs12 my-4 v-if="circuit.length">
          <div v-for="(c, i) in circuit"
               :key="i"
               class="training__circuit"
               :class="{'mb-4': i !== c.length - 1}"
          >
            <circuit :circuit="c" :index="i" />
          </div>
        </v-flex>

        <v-flex xs12 my-4 v-if="training.length">
          <v-list two-line class="training__list">
            <v-list-tile v-for="(exercise, index) in training" :key="index" class="mb-4">
              <v-list-tile-content>
                <v-list-tile-title>{{ exercise.title }}</v-list-tile-title>

                <v-list-tile-sub-title>
                  {{ exercise.muscleGroup }}
                </v-list-tile-sub-title>

                <div class="exercise__sets">
                  <p v-for="(set, idx) in exercise.sets" :key="idx">
                    <span class="exercise__repeats">{{ set.repeats }}</span>
                    <span class="exercise__weight">{{ set.weight }}</span>
                  </p>
                </div>

                <v-btn
                  color="secondary"
                  class="exercise__add-set"
                  @click="dialogSets = !dialogSets"
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
                @click="saveTraining"
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
                    @addNewSuperSet="addNewSuperSet"
                  />
                </template>
              </v-card>
            </v-flex>
          </v-layout>
        </v-dialog>

        <set
          :is-open="dialogSets"
          :is-super-set="isSuperSet"
          :exercise-title="getCurrentExercise"
          @closeDialog="dialogSets = false"
          @addSet="addSet"
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
  import Circuit from '../components/trainingLayouts/Circuit';

  export default {
    name: 'Create',
    components: {
      DatePicker,
      Exercise,
      Set,
      Circuit
    },
    data: () => ({
      datepicker: false,
      trainingDate: null,
      startHH: null,
      startMM: null,
      endHH: null,
      endMM: null,
      dialog: false,
      dialogSets: false,
      exerciseTitle: null,
      weight: null,
      repeats: null,
      newExercise: {
        title: '',
        muscleGroup: '',
        sets: []
      },
      isSuperSet: false
    }),
    created() {
      if (!this.isAuth) {
        this.$router.push('/login');
      }
    },
    mounted() {
      // if (process.browser) {
      //   this.startHH = this.$moment(Date.now()).format('HH');
      //   this.startMM = this.$moment(Date.now()).format('mm');
      // }
    },
    computed: {
      ...mapGetters('user', ['isAuth']),
      ...mapGetters(['training', 'circuit', 'getExercise', 'getSuperSet']),
      getCurrentExercise() {
        if (!this.isSuperSet) {
          const exercise = this.$store.getters.getExercise;
          return exercise.title;
        } else {
          const superSet = this.$store.getters.getSuperSet;
          return superSet.map(s => s.title);
        }
      },
      computedDateFormatted() {
        return this.formatDate(this.date);
      }
    },
    methods: {
      ...mapActions([
        'addExercise',
        'saveExercise',
        'addSuperSet',
        'addSet',
        'saveTraining'
      ]),
      save() {
        if (this.weight && this.repeats) {
          this.addSet(this.weight, this.repeats);
        }

        this.saveExercise()
          .then(() => {
            this.clear();
            this.dialogSets = false;
          })
          .catch(error => console.log(error));
      },
      addNewExercise(exercise) {
        if (this.weight) this.weight = null;

        this.addExercise({...exercise, sets: []})
          .then(() => {
            this.exercise = null;
            this.muscleGroup = null;
            this.dialog = false;
          })
          .catch(error => console.log(error));
      },
      addNewSuperSet(superSet) {
        this.addSuperSet(superSet)
          .then(() => {
            // this.exercise = null;
            // this.muscleGroup = null;
            this.dialog = false;
          })
          .catch(error => console.log(error));
      },
      addSet(weight, repeats) {
        const set = {weight, repeats};
        this.newExercise.sets.push({weight, repeats});
        this.repeats = null;
        this.addSet(set)
          .then(() => this.dialogSets = false)
          .catch(error => console.log(error));
      },
      addCircuit(circuit) {
        this.$store.dispatch('addCircuit', circuit)
          .then(() => {
            this.dialog = false;
          })
      },
      clear() {
        this.weight = null;
        this.repeats = null;
        this.exercise = null;
        this.muscleGroup = null;
        this.newExercise = {
          title: '',
          muscleGroup: '',
          sets: []
        };
      },
      saveTraining() {
        const [year, month, day] = this.trainingDate.split('-');
        const newTraining = {
          day,
          month,
          year,
          date: this.trainingDate,
          startTime: `${this.startHH}:${this.startMM}`,
          endTime: `${this.endHH}:${this.endMM}`,
          exercises: this.training,
          createdBy: this.user._id
        };

        this.$store.dispatch('saveTraining', newTraining)
          .then(() => this.$router.push('/history'))
      },
      formatDate(date) {
        if (!date) return null;
        return this.$moment(date).format('D MMMM YYYY');
      },
      formatDateShort(date) {
        if (!date) return null;
        return this.$moment(date).format('D MMMM');
      },
      saveDate(date) {
        this.datepicker = false;

        if (date) {
          this.trainingDate = date;
        }
      }
    },
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
  }

  p {
    margin: 0;
  }
</style>
