<template>
  <v-container id="currentExercise">
    <v-layout v-if="!currentExercise" row>
      <v-flex xs12 my-2>
        Loading...
      </v-flex>
    </v-layout>

    <v-layout v-else row wrap>
      <v-flex xs12>
        <h4>{{ currentExercise.title }}</h4>
      </v-flex>

      <v-flex xs12 mt-3>
        <template v-if="!currentExercise.sets.length">
          <p>Подходов пока нет</p>
        </template>

        <template v-else>
          <div class="table mt-3">
            <div class="table__row table__row_headers">
              <div class="table__col">#</div>
              <div class="table__col">Вес, кг</div>
              <div class="table__col">Повторения</div>
              <div class="table__col">&nbsp;</div>
            </div>

            <div
              v-for="(set, index) in currentExercise.sets"
              :key="index"
              class="table__row"
              :class="'stress-' + set.stress"
            >
              <div class="table__col">
                {{ index + 1 }}.
              </div>
              <div class="table__col">
                {{ set.weight }}
              </div>
              <div class="table__col">
                {{ set.repeats }}
              </div>
              <div class="table__col">
                <v-icon class="table__icon">edit</v-icon>
              </div>
            </div>
          </div>
        </template>
      </v-flex>

      <v-btn
        color="primary"
        dark
        absolute
        bottom
        right
        fab
        nuxt
        to="/add/set"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'Exercise',
    data: () => ({
      headers: [
        {
          text: '#',
          sortable: false,
          value: 'index'
        },
        { text: 'Вес, кг', value: 'weight' },
        { text: 'Повторения', value: 'repeats' },
        { text: ' ', value: '' }
      ]
    }),
    created() {
      this.setTitle('Упражнение');
      this.setTargetComponent('create');
    },
    computed: {
      ...mapGetters('training', ['currentExercise'])
    },
    methods: {
      ...mapActions('training', ['addExercise']),
      ...mapActions('toolbar', ['setTitle', 'setTargetComponent']),
      async addNewExercise(exercise) {
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

        await this.addExercise(payload);
        this.$router.push('/create');
      },
    }
  }
</script>

<style lang="scss" scoped>
  #currentExercise {
    .table {
      border: 1px solid #ddd;
      border-radius: .25rem;

      &__row {
        border-bottom: 1px solid #ddd;
        display: flex;

        &:last-of-type {
          border-bottom: none;
          border-radius: 0 0 0 .25rem;
        }

        &_headers {
          border-left: 8px solid transparent;

          .table__col {
            font-size: 14px;
            font-weight: 700;
            line-height: 20px;
            padding: 8px 0;
          }
        }

        &.stress-0 {
          border-left: 8px solid #757575;
        }

        &.stress-25 {
          border-left: 8px solid #43A047;
        }

        &.stress-50 {
          border-left: 8px solid #FFB300;
        }

        &.stress-75 {
          border-left: 8px solid #EF6C00;
        }

        &.stress-100 {
          border-left: 8px solid #E53935;
        }
      }

      &__col {
        flex: 1;
        padding: 16px 0;
        text-align: center;

        &:first-of-type,
        &:last-of-type {
          flex: 0.5;
        }
      }

      &__icon {
        font-size: 16px;
        line-height: 20px;
      }
    }
  }
</style>
