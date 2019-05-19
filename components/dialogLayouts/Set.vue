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
              <div class="row">
                <div class="col-6">
                  <v-text-field
                    v-model="weight"
                    label="Вес"
                    type="number"
                    hide-details
                  ></v-text-field>
                </div>
                <div class="col-6">
                  <v-text-field
                    v-model="repeats"
                    label="Повторения"
                    type="number"
                    hide-details
                  ></v-text-field>
                </div>
              </div>
            </template>

            <template v-else>
              <div class="row">
                <div class="col-12">
                  <p>{{ exerciseOne }}</p>
                </div>
                <div class="col-6">
                  <v-text-field
                    v-model="exerciseOneWeight"
                    label="Вес"
                    type="number"
                    hide-details
                  ></v-text-field>
                </div>
                <div class="col-6">
                  <v-text-field
                    v-model="exerciseOneRepeats"
                    label="Повторения"
                    type="number"
                    hide-details
                  ></v-text-field>
                </div>
              </div>

              <div class="row">
                <div class="col-12">
                  <p>{{ exerciseTwo }}</p>
                </div>
                <div class="col-6">
                  <v-text-field
                    v-model="exerciseTwoWeight"
                    label="Вес"
                    type="number"
                    hide-details
                  ></v-text-field>
                </div>
                <div class="col-6">
                  <v-text-field
                    v-model="exerciseTwoRepeats"
                    label="Повторения"
                    type="number"
                    hide-details
                  ></v-text-field>
                </div>
              </div>
            </template>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              flat
              color="error"
              @click="closeDialog"
            >Отмена
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
      exerciseTitle: String,
      exerciseOne: String,
      exerciseTwo: String
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

      },
      closeDialog() {
        this.isVisible = false;
        // this.$refs.dialog.save(this.date);
        this.$emit('closeDialog');
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
