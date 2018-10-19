<template>
  <div id="create">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2>Записать тренировку</h2>
        </div>

        <div class="col-12 my-4">
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
                scrollable
                :first-day-of-week="'1'"
                :locale="'ru-ru'"
            >
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="datepicker = false">Отмена</v-btn>
              <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </div>

        <div class="col-12 mb-4">
          <div class="row">
            <div class="col-6">
              <p>Начало тренировки</p>
              <div class="row">
                <div class="col-12 d-flex justify-content-start">
                  <v-text-field
                      v-model="startHH"
                      placeholder="чч"
                      type="number"
                      class="training__input training__input_time"
                      mask="##"
                  ></v-text-field>
                  <span class="training__divider">:</span>
                  <v-text-field
                      v-model="startMM"
                      placeholder="мм"
                      type="number"
                      class="training__input training__input_time"
                      mask="##"
                  ></v-text-field>
                </div>
              </div>
            </div>

            <div class="col-6">
              <p>Конец тренировки</p>
              <div class="row">
                <div class="col-12 d-flex justify-content-start">
                  <v-text-field
                      v-model="endHH"
                      placeholder="чч"
                      type="number"
                      class="training__input training__input_time"
                      mask="##"
                  ></v-text-field>
                  <span class="training__divider">:</span>
                  <v-text-field
                      v-model="endMM"
                      placeholder="мм"
                      type="number"
                      class="training__input training__input_time"
                      mask="##"
                  ></v-text-field>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12" v-if="training.length">
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

                <button class="btn btn-primary exercise__add-set" type="button" @click="dialogSets = !dialogSets">
                  <i class="fas fa-plus-circle"></i>&nbsp;&nbsp;подход
                </button>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </div>

        <div class="col-6">
          <button class="btn btn-success" type="button" @click="dialog = !dialog">
            <i class="fas fa-plus-circle"></i>&nbsp;&nbsp;упражнение</button>
        </div>

        <div class="col-6">
          <button class="btn btn-success" type="button" @click="saveTraining">
            <i class="fas fa-check-circle"></i>&nbsp;&nbsp;Сохранить
          </button>
        </div>

        <div class="col-12 mt-3">
          <nuxt-link class="btn btn-success" :to="'/'">
            <i class="fas fa-undo-alt"></i>&nbsp;&nbsp;На главную
          </nuxt-link>
        </div>

        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="headline" primary-title>
              Добавить упражнение
            </v-card-title>

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
              <button class="btn btn-success" type="button" @click="addNewExercise">Добавить</button>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogSets" class="training__dialog">
          <v-card>
            <v-card-title class="headline" primary-title>{{ getExercise }}</v-card-title>

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
              <button class="btn btn-primary v-card__btn" type="button" @click="addSet(weight, repeats)">Добавить</button>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </div>
</template>

<script>
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
      training: [],
      addExercise: {
        title: '',
        muscleGroup: '',
        sets: []
      }
    }),
    methods: {
      save () {
        if (this.weight && this.repeats) {
          this.addSet(this.weight, this.repeats)
        }

        this.$store.dispatch('saveExercise')
          .then(() => {
            this.clear()
            this.dialogSets = false
          })
          .catch(error => console.log(error))
      },
      addNewExercise () {
        if (this.weight) this.weight = null

        const exercise = {
          title: this.exercise,
          muscleGroup: this.muscleGroup,
          sets: []
        }

        this.$store.dispatch('addExercise', exercise)
          .then(() => {
            this.exercise = null
            this.muscleGroup = null
            this.dialog = false
          })
          .catch(error => console.log(error))
      },
      addSet (weight, repeats) {
        const set = {weight, repeats}
        this.addExercise.sets.push({ weight, repeats })
        this.repeats = null
        this.$store.dispatch('addSet', set)
          .then(() => {
            this.dialogSets = false
          })
          .catch(error => console.log(error))
      },
      clear () {
        this.weight = null
        this.repeats = null
        this.exercise = null
        this.muscleGroup = null
        this.addExercise = {
          title: '',
          muscleGroup: '',
          sets: []
        }
      },
      async saveTraining () {
        try {
          const result = await this.$axios.post('/create', {
            date: this.date,
            startTime: `${this.startHH}:${this.startMM}`,
            endTime: `${this.endHH}:${this.endMM}`,
            exercises: this.training
          })
          if (result) {
            this.$router.push('/history')
          }
        } catch (error) {
          console.log(error)
        }
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        const MMMM = new Date(`${month}/${day}/${year}`).toLocaleString('ru-RU', { month: 'long' })

        return `${day} ${MMMM.replace('ь', 'я')} ${year}`
      }
    },
    computed: {
      hasTraining () {
        return this.$store.getters.getTraining
      },
      getExercise () {
        const exercise = this.$store.getters.getExercise
        return exercise.title
      },
      computedDateFormatted () {
        return this.formatDate(this.date)
      }
    },
    mounted () {
      this.training = this.$store.getters.getTraining
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

  .btn {
    line-height: 24px;
    width: 100%;
    margin: 0 auto;
    text-transform: uppercase;
  }
</style>
