<template>
  <select class="form-control" :multiple="multiple !== undefined" style="width: 100%;">
    <slot></slot>
  </select>
</template>

<script>
import $ from 'jquery';
import 'select2/dist/js/select2';
import 'select2/dist/js/i18n/zh-CN';

export default {
  // 多选：请在父组件上加上 :multiple, 通过url搜索：请在父组件上加上:url
  props: ['options', 'value', 'placeholder', 'allowClear', 'multiple', 'url'],
  data() {
    return {
      ajaxOptions: {
        url: this.url,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        dataType: 'json',
        delay: 250,
        tags: true,
        data: function data(params) {
          return {
            text: params.term, // search term
            page: params.page,
          };
        },
        processResults: function processResults(data, params) {
          params.page = params.page || 1;
          return {
            results: data,
            pagination: {
              more: (params.page * 30) < data.total_count,
            },
          };
        },
        cache: true,
      },
    };
  },
  mounted() {
    const vm = this;
    $(this.$el)
      // init select2
      .select2({
        data: this.options,
        ajax: this.url === undefined ? null : this.ajaxOptions,
        placeholder: this.placeholder,
        allowClear: this.allowClear,
        language: 'zh-CN',
        minimumInputLength: 1,
      })
      .val(this.value)
      .trigger('change')
      // emit event on change.
      .on('change', function change() {
        vm.$emit('input', $(this).val());
      });
  },
  watch: {
    value(value) {
      // update value
      if ([...value].sort().join(',') !== [...$(this.$el).val()].sort().join(',')) {
        $(this.$el).val(value).trigger('change');
      }
    },
    options(options) {
      // update options
      $(this.$el).select2({ data: options });
    },
    url() {
      this.ajaxOptions.url = this.url;
      $(this.$el).select2({
        ajax: this.ajaxOptions,
      });
    },
  },
  destroyed() {
    $(this.$el).off().select2('destroy');
  },
};
</script>

<style lang="sass">
@import "./select2.css";
</style>
