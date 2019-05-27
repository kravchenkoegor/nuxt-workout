<template>
  <v-dialog
    v-model="showDialog"
    class="training__dialog"
  >
    <v-toolbar color="primary" dark>
      <v-toolbar-title>{{ !isSuperSet ? exerciseTitle : 'Суперсет' }}</v-toolbar-title>
    </v-toolbar>

    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <template v-if="!isSuperSet">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="weight"
                    label="Вес"
                    type="number"
                    hide-details
                    class="mb-3"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    v-model="repeats"
                    label="Повторения"
                    type="number"
                    hide-details
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </template>

            <template v-else>
              <v-layout row wrap>
                <v-flex xs12>
                  <p>{{ exerciseTitle[0] }}</p>
                </v-flex>
                <v-flex xs6 class="pr-2">
                  <v-text-field
                    v-model="exerciseOneWeight"
                    label="Вес"
                    type="number"
                    hide-details
                  ></v-text-field>
                </v-flex>
                <v-flex xs6 class="pl-2">
                  <v-text-field
                    v-model="exerciseOneRepeats"
                    label="Повторения"
                    type="number"
                    hide-details
                  ></v-text-field>
                </v-flex>

                <v-flex xs12 class="mt-4">
                  <p>{{ exerciseTitle[1] }}</p>
                </v-flex>
                <v-flex xs6 class="pr-2">
                  <v-text-field
                    v-model="exerciseTwoWeight"
                    label="Вес"
                    type="number"
                    hide-details
                  ></v-text-field>
                </v-flex>
                <v-flex xs6 class="pl-2">
                  <v-text-field
                    v-model="exerciseTwoRepeats"
                    label="Повторения"
                    type="number"
                    hide-details
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </template>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              flat
              color="error"
              @click="closeDialog"
            >
              Отмена
            </v-btn>

            <v-btn
              color="primary"
              @click="addSet"
              class="v-card__btn"
            >
              Добавить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-dialog>
</template>

<script>
  export default {
    name: 'Set',
    props: {
      isOpen: Boolean,
      isSuperSet: Boolean,
      exerciseTitle: String | Array,
    },
    data: () => ({
      isVisible: false,
      weight: null,
      repeats: null,
      exerciseOneWeight: null,
      exerciseOneRepeats: null,
      exerciseTwoWeight: null,
      exerciseTwoRepeats: null,
    }),
    computed: {
      showDialog() {
        this.isVisible = this.isOpen;
        return this.isVisible;
      },
    },
    methods: {
      addSet() {
        const set = !this.isSuperSet
          ? {weight: this.weight, repeats: this.repeats}
          : [
              {
                weight: this.exerciseOneWeight,
                repeats: this.exerciseOneRepeats,
              },
              {
                weight: this.exerciseTwoWeight,
                repeats: this.exerciseTwoRepeats,
              }
          ];
        this.$emit('addSet', set);
      },
      closeDialog() {
        this.isVisible = false;
        this.$emit('closeDialog');
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
