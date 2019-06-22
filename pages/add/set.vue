<template>
  <div id="addSet">
    <v-container>
      <v-layout row>
        <v-flex xs12 class="back">
          <v-btn icon nuxt to="/create" exact>
            <v-icon>fas fa-chevron-left</v-icon>
          </v-btn>
        </v-flex>

        <v-flex xs12 class="position-relative">
          <h2>Добавить подход</h2>
        </v-flex>
      </v-layout>

      <v-layout row mt-4>
        <v-flex xs12>
          <v-text-field
            v-model="weight"
            label="Вес"
            type="number"
            hide-details
            prepend-inner-icon="fas fa-minus"
            append-icon="fas fa-plus"
            @click:prepend-inner="changeWeight('remove')"
            @click:append="changeWeight('add')"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row mt-3>
        <v-flex xs12>
          <v-text-field
            v-model="repeats"
            label="Повторения"
            type="number"
            hide-details
            prepend-inner-icon="fas fa-minus"
            append-icon="fas fa-plus"
            @click:prepend-inner="changeRepeats('remove')"
            @click:append="changeRepeats('add')"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row mt-3>
        <v-flex xs12>
          <h4>Усилие</h4>
          <div class="stress">
            <div
              v-model="stressValue"
              v-for="item in stress"
              :key="item.value"
              class="stress__item"
              :class="{'checked': stressValue === item.value}"
              @click="setStress(item.value)"
            >
              {{ item.label }}
            </div>
          </div>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs12>
          <v-btn
            color="#18ba60"
            dark
            absolute
            bottom
            right
            fab
            @click="addNewSet"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'AddSet',
    data: () => ({
      weight: null,
      repeats: null,
      stress: [
        {
          label:'Размин.',
          value: 0
        },
        {
          label: 'Низкое',
          value: 25
        },
        {
          label: 'Среднее',
          value: 50
        },
        {
          label: 'Высокое',
          value: 75
        },
        {
          label: 'Макс.',
          value: 100
        }
      ],
      stressValue: null
    }),
    computed: {
      ...mapGetters('training', ['currentExercise'])
    },
    methods: {
      ...mapActions('training', ['addSet']),
      changeWeight(operator) {
        if (!this.weight) {
          this.weight = 0;
        }

        this.weight = Number(this.weight);
        operator === 'add'
          ? this.weight += 2.5
          : this.weight -= 2.5;
      },
      changeRepeats(operator) {
        if (!this.repeats) {
          this.repeats = 0;
        }

        this.repeats = Number(this.repeats);
        operator === 'add'
          ? this.repeats += 1
          : this.repeats -= 1;
      },
      setStress(value) {
        this.stressValue = value;
      },
      async addNewSet() {
        await this.addSet({
          slug: this.currentExercise.slug,
          set: {
            weight: this.weight,
            repeats: this.repeats,
            stress: this.stressValue
          }
        });
        this.$router.push('/exercise');
      }
    }
  }
</script>

<style lang="scss">
  #addSet {
    .v-btn.control {
      height: 32px;
      margin-top: 16px;
      width: 32px;

      i.v-icon {
        font-size: 16px;
      }
    }

    .v-input__icon {
      i.v-icon--link {
        font-size: 16px;
      }
    }

    .stress {
      display: flex;
      margin-top: 8px;
      position: relative;

      &__item {
        flex-grow: 1;
        width: 100%;
        border: 1px solid #ddd;
        border-left: none;
        color: darken(#ddd, 25%);
        text-align: center;
        padding: 5px 0;
        font-size: 12px;

        &:first-of-type {
          border-left: 1px solid #ddd;
          border-radius: 3px 0 0 3px;
        }

        &:last-of-type {
          border-radius: 0 3px 3px 0;
        }

        &.checked {
          color: rgba(#fff,.87);

          &:nth-child(1) {
            background: #757575;
            border-color: #757575;
          }

          &:nth-child(2) {
            background: #43A047;
            border-color: #43A047;
          }

          &:nth-child(3) {
            background: #FFB300;
            border-color: #FFB300;
          }

          &:nth-child(4) {
            background: #EF6C00;
            border-color: #EF6C00;
          }

          &:nth-child(5) {
            background: #E53935;
            border-color: #E53935;
          }
        }
      }
    }
  }
</style>
