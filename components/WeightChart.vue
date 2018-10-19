<script>
  import { Line } from 'vue-chartjs'

  export default {
    extends: Line,
    props: ['data'],
    mounted () {
      this.renderChart(this.data, {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              suggestedMin: 95,
              suggestedMax: 115
            }
          }],
          xAxes: [{
            ticks: {
              display: false
            }
          }]
        },
        legend: {
          display: false
        }
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>
