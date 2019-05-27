<template>
  <div class="exercise">
    <v-card-text>
      <template v-if="!isSuperSet">
        <v-select
          v-model="muscleGroup"
          :items="muscleGroups"
          label="Группа мышц"
          dense
          hide-details
          class="mb-3"
        ></v-select>

        <v-text-field
          v-model="exercise"
          label="Название упражнения"
        ></v-text-field>
      </template>

      <template v-else>
        <p>Упражнение #1</p>
        <v-select
          v-model="superSetMuscleGroupOne"
          :items="muscleGroups"
          label="Группа мышц"
          dense
          hide-details
        ></v-select>
        <v-text-field
          v-model="superSetExerciseOne"
          label="Название упражнения"
          hide-details
        ></v-text-field>

        <p style="margin-top: 20px;">Упражнение #2</p>
        <v-select
          v-model="superSetMuscleGroupTwo"
          :items="muscleGroups"
          label="Группа мышц"
          dense
          hide-details
        ></v-select>
        <v-text-field
          v-model="superSetExerciseTwo"
          label="Название упражнения"
          hide-details
        ></v-text-field>
      </template>
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
        @click="addExercise"
      >Добавить
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
  export default {
    name: 'Exercise',
    props: {
      isSuperSet: Boolean
    },
    data: () => ({
      muscleGroup: null,
      muscleGroups: ['Ноги', 'Спина', 'Грудь', 'Плечи', 'Трицепс', 'Бицепс', 'Пресс', 'Кардио'],
      exercise: null,
      superSetMuscleGroupOne: null,
      superSetExerciseOne: null,
      superSetMuscleGroupTwo: null,
      superSetExerciseTwo: null
    }),
    methods: {
      addExercise() {
        let payload;

        if (this.isSuperSet) {
          payload = [
            {
              muscleGroup: this.superSetMuscleGroupOne,
              title: this.superSetExerciseOne,
              sets: []
            },
            {
              muscleGroup: this.superSetMuscleGroupTwo,
              title: this.superSetExerciseTwo,
              sets: []
            }
          ];
        } else {
          payload = {
            title: this.exercise,
            muscleGroup: this.muscleGroup
          };
        }

        this.$emit('addNewExercise', payload);
        this.clear();
      },
      clear() {
        this.muscleGroup = null;
        this.exercise = null;
        this.superSetMuscleGroupOne = null;
        this.superSetExerciseOne = null;
        this.superSetMuscleGroupTwo = null;
        this.superSetExerciseTwo = null;
      }
    }
  }
</script>
