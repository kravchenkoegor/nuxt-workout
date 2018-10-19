<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="workout">
          <div class="workout__header">
            <div class="workout__date">
              <i class="far fa-calendar-alt"></i>
              {{ training.date }}
            </div>
            <div class="workout__time">
              <i class="far fa-clock"></i>
              {{ training.startTime }} <span>&mdash;</span> {{ training.endTime }}
            </div>
            <div class="workout__btn">
              <router-link class="btn btn-success" :to="'/history'">
                <i class="fas fa-list-ul"></i>&nbsp;&nbsp;Журнал
              </router-link>
            </div>
          </div>

          <div class="workout__body">
            <div class="workout__exercise shadow" v-for="(exercise, index) in training.exercises" :key="index">
              <div class="workout__title">
                {{ exercise.title }}
                <span class="muscle-group">{{ exercise.muscleGroup }}</span>
              </div>
              <div v-if="exercise.sets.length" class="workout__sets">
                <p v-for="(set, idx) in exercise.sets" :key="idx">
                  <span class="exercise__repeats">{{ set.repeats }}{{ !set.weight ? '&nbsp;раз' : '' }}</span>
                  <template v-if="set.weight">
                    <span class="divider">&nbsp;/&nbsp;</span>
                    <span class="exercise__weight">{{ set.weight }}</span>
                  </template>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 px-0 d-flex text-center">
          <button class="btn btn-success" type="button" @click="$router.push({ name: 'history' })">
            <i class="fas fa-arrow-left"></i>&nbsp;Назад
          </button>

          <button class="btn btn-danger" type="button" @click="deleteTraining">
            <i class="fas fa-trash-alt"></i>&nbsp;Удалить
          </button>
        </div>
      </div>
    </div>
  </div>



</template>

<script>
  export default {
    name: 'Training',
    data: () => ({
      training: null
    }),
    created () {
      this.training = this.$store.getters.getTrainingDetails
    },
    async fetch ({ app, store, params }) {
      try {
        let result = await app.$axios.$get('/training/' + params.id)
        if (result) {
          store.dispatch('setTrainingDetails', result)
        }
      } catch (error) {
        console.log(error)
      }
    },
    methods: {
      async deleteTraining () {
        const result = await this.$axios.$get('/delete/' + this.$route.params.id)
        if (result) {
          this.$router.push({ name: 'history' })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .workout {
    &__header {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 1em;
      position: relative;
    }

    &__btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;

      a {
        text-transform: uppercase;
        padding: .5rem 1rem;
      }
    }

    &__exercise {
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: .5rem;

      & + & {
        margin-top: 1.5rem;
      }
    }

    &__title {
      display: block;
      width: 100%;
      font-size: 14px !important;
      font-weight: 700;
      line-height: 25px !important;
      position: relative;
      padding: .5rem 50px .75rem 0;

      span {
        &.muscle-group {
          position: absolute;
          top: 7px;
          right: 0;
          padding: .25rem .5rem;
          color: #ffffff;
          background-color: #192A51;
          border-radius: .25rem;
          font-size: 12px;
          line-height: 18px !important;
        }
      }
    }

    &__sets {
      display: flex;
      justify-content: space-between;
      border-top: 1px solid rgba(#1a1a1a, .4);
      padding-top: .75rem;

      p {
        margin-bottom: 0;
        position: relative;
        width: 100%;
        flex-grow: 1;
        text-align: center;

        & + p {

          &:before {
            content: '';
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 1px;
            background-color: #cccccc;
          }
        }
      }

      &__repeats {
        padding-right: .25rem;
      }

      &__weight {
        padding-left: .25rem;
      }
    }
  }

  button {
    &.btn {
      margin-top: 1.5rem;
      padding: .5rem 2rem;
      text-transform: uppercase;
      width: 100%;

      & + & {
        margin-left: 1rem;
      }
    }
  }
</style>
