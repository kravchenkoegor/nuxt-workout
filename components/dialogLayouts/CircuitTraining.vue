<template>
  <div class="circuit">
    <v-card-text class="pt-0">
      <v-layout row wrap>
        <v-flex
          xs12
          v-for="(exercise, idx) in exercises"
          :key="idx"
        >
          <v-layout row>
            <v-flex xs9>
              <v-text-field
                :label="exercise.title"
                readonly
                disabled
                :suffix="String(exercise.required)"
              ></v-text-field>
            </v-flex>
            <v-flex xs3 ml-3>
              <v-text-field
                v-model="exercise.number"
                label="Кол-во"
                type="number"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        flat
        color="error"
        @click="$emit('closeDialog')"
      >Отмена
      </v-btn>
      <v-btn
        color="primary"
        dark
        raised
        @click="addCircuit"
      >Добавить круг
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
  export default {
    name: 'CircuitTraining',
    data: () => ({
      exercises: [
        {
          title: 'Жим штанги стоя',
          required: 6,
          number: null
        },
        {
          title: 'Фронтальные приседания',
          required: 7,
          number: null
        },
        {
          title: 'Тяга в наклоне',
          required: 8,
          number: null
        },
        {
          title: 'Становая тяга',
          required: 9,
          number: null
        },
        {
          title: 'Приседания',
          required: 10,
          number: null
        }
      ]
    }),
    methods: {
      addCircuit() {
        this.$store.dispatch('addCircuit', this.exercises)
          .then(() => {
            this.$emit('closeDialog');
            // this.exercises.forEach(ex => ex.number = null);
          })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
