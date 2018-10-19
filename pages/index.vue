<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <nuxt-link to="weight">
          <div class="card shadow">
            <img class="card-img-top" src="/images/weight-chart.jpg" alt="weight chart">
            <div class="card-body">
              <h5 class="card-title">График веса</h5>
            </div>
          </div>
        </nuxt-link>
      </div>

      <div class="col-12 mt-3">
        <nuxt-link to="history">
          <div class="card shadow">
            <img class="card-img-top" src="/images/history.jpg" alt="workout history">
            <div class="card-body">
              <h5 class="card-title">Журнал тренировок</h5>
            </div>
          </div>
        </nuxt-link>
      </div>

      <div class="col-12 mt-3">
        <nuxt-link to="create">
          <div class="card shadow">
            <img class="card-img-top" src="/images/create.jpg" alt="workout history">
            <div class="card-body">
              <h5 class="card-title">Добавить тренировку</h5>
            </div>
          </div>
        </nuxt-link>
      </div>

      <!--<div class="col-12">-->
        <!--<div class="train train_last shadow">-->
          <!--Последняя тренировка-->
        <!--</div>-->

    </div>
  </div>
</template>

<script>
  export default {
    name: 'home'
  }
</script>

<style lang="scss" scoped>
  .weight,
  .weight-chart,
  .train {
    padding: 20px;
    border-radius: 0.5rem;
    background-color: $light;
    color: #1a1a1a;
    text-align: center;
    text-transform: uppercase;
    margin-top: 2rem;

    a {
      color: $font;
      font-weight: 700;
    }
  }

  .btn {
    margin-top: 2rem;
    width: 100%;
    text-transform: uppercase;
    padding: 1rem;
  }

  .card {
    &-body {
      text-align: center;
      text-transform: uppercase;
      align-self: center;

      a {
        &:hover, &.hover,
        &:focus, &.focus,
        &:active, &.active {
          text-decoration: none !important;
          color: #1a1a1a;
          outline: none !important;
        }
      }
    }

    &-title {
      margin-bottom: 0 !important;
      color: #1a1a1a;

      &:hover, &.hover,
      &:focus, &.focus,
      &:active, &.active {
        text-decoration: none !important;
        color: #1a1a1a;
        outline: none !important;
      }
    }
  }

  .mt-3 {
    margin-top: 16px !important;
  }
</style>
