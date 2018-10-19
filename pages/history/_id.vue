<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        {{ $route.params.id }}

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
