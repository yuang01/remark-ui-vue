<template>
  <div class="input-daterange">
    <div class="input-group">
      <span class="input-group-addon" style="background: #e9eff6;">
        <i class="icon wb-calendar" aria-hidden="true"></i>
      </span>
      <input type="text" class="form-control bg-transparent" name="start" ref="start"/>
    </div>
    <div class="input-group">
      <span class="input-group-addon" style="background: #e9eff6;">到</span>
      <input type="text" class="form-control bg-transparent" name="end" ref="end"/>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker';
import 'bootstrap-datepicker/js/locales/bootstrap-datepicker.zh-CN';

export default {
  mounted() {
    const vm = this;
    $(this.$el)
      .datepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        startDate: '-3y',
        endDate: 'startDate-1d',
        clearBtn: true,
      })
      .on('changeDate', () => {
        const dates = { start: vm.$refs.start.value, end: vm.$refs.end.value };
        vm.$emit('dates', dates);
      });
  },
};
</script>

<style lang="sass">
@import "./bootstrap-datepicker.css";
</style>
