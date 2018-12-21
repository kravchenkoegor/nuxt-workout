<template>
  <div class="history">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="mb-0">Get Ripped in 8 Weeks!</h2>
        </div>

        <div class="col-12 my-4">

        </div>

        <div class="col-12">
          <nuxt-link class="history__btn btn btn-success" :to="'/'">
            <i class="fas fa-undo-alt"></i>&nbsp;&nbsp;На главную
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Routine',
    // async fetch ({ app, store }) {
    //   let trainings = await app.$axios.$get('/history')
    //   if (trainings) {
    //     store.dispatch('setTrainingsHistory', trainings)
    //   }
    // },
    data: () => ({

    }),
    mounted () {

    },
    computed: {
      // getFormattedMonths () {
      //   return this.dates.map(item => {
      //     return {
      //       month: this.$moment().month(Number(item.month) - 1).format('MMMM'),
      //       year: item.year
      //     }
      //   })
      // }
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  .container {
    padding-top: 20px;
    padding-bottom: 20px;
  }
</style>
