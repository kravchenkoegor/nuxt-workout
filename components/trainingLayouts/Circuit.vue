<template>
  <div>
    <h4>Круг {{ index + 1 }}</h4>
    <v-list two-line class="training__list">
      <v-list-tile
        v-for="(exercise, index) in circuit"
        :key="index"
        :class="{'mb-2': index !== circuit.length - 1}"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ exercise.title }}</v-list-tile-title>
          <v-list-tile-sub-title>
            {{ exercise.required }} |
            {{ exercise.number }}
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
  export default {
    name: 'Circuit',
    props: {
      circuit: Object,
      index: Number
    }
  }
</script>
