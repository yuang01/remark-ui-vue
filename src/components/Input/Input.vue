<template>
  <div class="form-group form-material floating" :class="hasColor">
    <input :type="type" :required="required" class="form-control empty"
    :value="value"
    @input="$emit('input', $event.target.value)"
    @blur="blurInput($event)"
    @keyup.tab="showClean()"
    @focus="showClean()">
    <label class="floating-label">{{placeholder}}</label>
    <span class="clean" v-if="show" @click="clean($event)"><b>×</b></span>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      default: {},
    },
    value: {
      default: '',
    },
    type: { // input 类型选择，例如'text','password'等
      default: 'text',
    },
    hasColor: { // 定义input颜色
      default: '',
    },
    required: { // 必填设置
      default: false,
    },
  },

  data() {
    return {
      show: false,
      val: this.value,
    };
  },

  watch: {
    hasColor(val) {
      this.hasColor = val;
    },
  },

  methods: {
    clean($event) {
      this.val = '';
      this.$emit('input', this.val);
      $event.currentTarget.parentNode.children[0].classList.add('empty');
      this.show = false;
    },
    showClean() {
      this.show = true;
    },
    blurInput($event) {
      if (this.value !== '') {
        $event.currentTarget.classList.remove('empty');
      } else {
        $event.currentTarget.classList.add('empty');
        this.show = false;
      }
    },
  },

};
</script>

<style scoped>
  .form-group {
    position: relative;
  }
  .clean {
    display: block;
    width: 15px;
    height: 15px;
    position: absolute;
    top: 10px;
    right: 0;
    z-index: 2;
  }
  .clean:hover {
    cursor: pointer;
  }
  .form-control {
    background-size: 0 2px,100% 1px;
    background-image: linear-gradient(#3e8ef7,#3e8ef7),linear-gradient(#CCD5DB,#CCD5DB);
  }
</style>

