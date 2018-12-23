<template>
  <transition name="modal">
    <div class="modal">
      <div class="modal-dialog modal-center" :class="{'modal-lg': isLarge}">
        <div class="modal-content">
          <div class="modal-header">
            <button class="close" @click="$emit('close')">
              <span aria-hidden="true">×</span>
            </button>
            <slot name="title"></slot>
          </div>
          <slot name="body"></slot>
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isLarge: {
      default: false,
    },
  },
};
</script>


<style scoped>
.modal {
  background-color: rgba(0, 0, 0, .5);
  display: block;
  opacity: 1;
  transition: opacity .3s ease;
}
.modal-content {
  transition: all .3s ease;
  overflow: auto;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-content,
.modal-leave-active .modal-content {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
