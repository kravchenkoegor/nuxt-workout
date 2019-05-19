<template>
  <v-dialog
    ref="dialog"
    v-model="showDialog"
    :return-value.sync="date"
    persistent
    lazy
    full-width
    width="290px"
  >
    <v-text-field
      slot="activator"
      v-model="computedDateFormatted"
      label="Дата тренировки"
      prepend-icon="far fa-calendar-alt"
      readonly
      class="training__input training__input_date"
      @change="$store.dispatch('setDate', computedDateFormatted)"
    ></v-text-field>

    <v-date-picker
      v-model="date"
      color="secondary"
      scrollable
      :first-day-of-week="'1'"
      :locale="'ru-ru'"
      :title-date-format="value => formatDateShort(value)"
    >

      <v-spacer></v-spacer>

      <v-btn
        flat
        color="'rgba(0,0,0,.87)'"
        @click="closeDialog"
      >Отмена
      </v-btn>

      <v-btn
        color="secondary"
        dark
        raised
        @click="closeDialog"
      >OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
  export default {
    name: 'DatePicker',
    props: {
      isOpen: Boolean,
    },
    data: () => ({
      isVisible: false,
      date: null,
    }),
    mounted() {
      this.date = this.$moment(Date.now()).format('YYYY-MM-DD');
    },
    computed: {
      showDialog() {
        this.isVisible = this.isOpen;
        return this.isVisible;
      },
      computedDateFormatted() {
        return this.formatDate(this.date)
      }
    },
    methods: {
      formatDate(date) {
        if (!date) return null;
        return this.$moment(date).format('D MMMM YYYY');
      },
      formatDateShort(date) {
        if (!date) return null;
        return this.$moment(date).format('D MMMM');
      },
      closeDialog() {
        this.isVisible = false;
        this.$refs.dialog.save(this.date);
        this.$emit('closeDialog', this.date);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
