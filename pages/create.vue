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
          <h2>Записать тренировку</h2>
        </v-flex>

        <v-flex xs12 my-4>
          <v-dialog
            ref="dialog"
            v-model="datepicker"
            :return-value.sync="date"
            persistent
            lazy
            full-width
            width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="computedDateFormatted"
              label="Дата тренировки"
              prepend-icon="far fa-calendar-alt"
              readonly
              class="training__input training__input_date"
              @change="$store.dispatch('setDate', computedDateFormatted)"
            ></v-text-field>

            <v-date-picker
              v-model="date"
              color="secondary"
              scrollable
              :first-day-of-week="'1'"
              :locale="'ru-ru'"
              :title-date-format="value => formatDateShort(value)"
            >

              <v-spacer></v-spacer>

              <v-btn
                flat
                color="'rgba(0,0,0,.87)'"
                @click="datepicker = false"
              >Отмена
              </v-btn>

              <v-btn
                color="secondary"
                dark
                raised
                @click="$refs.dialog.save(date)"
              >OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
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
                color="#D4B483"
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
                <v-card-text>
                  <template v-if="!addExercise.title">
                    <v-select
                      v-model="muscleGroup"
                      :items="muscleGroups"
                      label="Группа мышц"
                    ></v-select>

                    <v-text-field
                      v-model="exercise"
                      label="Название упражнения"
                    ></v-text-field>
                  </template>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    flat
                    color="#ED1C24"
                    @click="dialog = false"
                  >Отмена
                  </v-btn>

                  <v-btn
                    color="primary"
                    dark
                    raised
                    @click="addNewExercise"
                  >Добавить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-dialog>

        <v-dialog v-model="dialogSets" class="training__dialog">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>{{ getExercise }}</v-toolbar-title>
          </v-toolbar>

          <v-layout align-center justify-center>
            <v-flex xs12>
              <v-card>
                <v-card-text>
                  <div class="row">
                    <div class="col-6">
                      <v-text-field
                        v-model="weight"
                        label="Вес"
                        type="number"
                      ></v-text-field>
                    </div>
                    <div class="col-6">
                      <v-text-field
                        v-model="repeats"
                        label="Повторения"
                        type="number"
                      ></v-text-field>
                    </div>
                  </div>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    flat
                    color="#ED1C24"
                    @click="dialogSets = false"
                  >Отмена
                  </v-btn>

                  <v-btn
                    color="primary"
                    @click="addSet(weight, repeats)"
                    class="v-card__btn"
                  >
                    Добавить
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'Create',
    data: () => ({
      datepicker: false,
      date: null,
      startHH: null,
      startMM: null,
      endHH: null,
      endMM: null,
      dialog: false,
      dialogSets: false,
      exercise: null,
      exerciseTitle: null,
      weight: null,
      repeats: null,
      muscleGroup: null,
      muscleGroups: ['Ноги', 'Спина', 'Грудь', 'Плечи', 'Трицепс', 'Бицепс', 'Пресс', 'Кардио'],
      addExercise: {
        title: '',
        muscleGroup: '',
        sets: []
      }
    }),
    computed: {
      ...mapGetters(['user', 'training']),
      getExercise() {
        const exercise = this.$store.getters.getExercise
        return exercise.title
      },
      computedDateFormatted() {
        return this.formatDate(this.date)
      }
    },
    created() {
      if (!this.user) {
        this.$router.push('/login');
      }
    },
    methods: {
      save() {
        if (this.weight && this.repeats) {
          this.addSet(this.weight, this.repeats);
        }

        this.$store.dispatch('saveExercise')
          .then(() => {
            this.clear();
            this.dialogSets = false;
          })
          .catch(error => console.log(error));
      },
      addNewExercise() {
        if (this.weight) this.weight = null;

        const exercise = {
          title: this.exercise,
          muscleGroup: this.muscleGroup,
          sets: []
        };

        this.$store.dispatch('addExercise', exercise)
          .then(() => {
            this.exercise = null;
            this.muscleGroup = null;
            this.dialog = false;
          })
          .catch(error => console.log(error));
      },
      addSet(weight, repeats) {
        const set = {weight, repeats};
        this.addExercise.sets.push({weight, repeats});
        this.repeats = null;
        this.$store.dispatch('addSet', set)
          .then(() => this.dialogSets = false)
          .catch(error => console.log(error));
      },
      clear() {
        this.weight = null;
        this.repeats = null;
        this.exercise = null;
        this.muscleGroup = null;
        this.addExercise = {
          title: '',
          muscleGroup: '',
          sets: []
        };
      },
      saveTraining() {
        const [year, month, day] = this.date.split('-');
        const newTraining = {
          day,
          month,
          year,
          date: this.date,
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
