<template>
  <a @mouseover="showTooltip($event, content, title)" @mouseout="hideToolTip()">
    {{ content }}
    <div class="example example-popover" v-if="toolTip" :style="tipStyle">
      <div class="popover bs-popover">
        <div class="arrow"></div>
        <h3 class="popover-header">{{title}}</h3>
        <div class="popover-body">
          <p>{{content}}</p>
        </div>
      </div>
    </div>
  </a>
</template>
<script>
export default {
  // 传入title和content进来就行了
  props: {
    content: { default: '内容' },
    title: { default: '标题' },
  },

  data() {
    return {
      toolTip: false,
      tipStyle: {
        position: 'fixed',
        top: '0px',
        left: '0px',
      },
    };
  },

  methods: {
    showTooltip(e) {
      const X = e.clientX;
      const Y = e.clientY;
      this.tipStyle.top = `${Y}px`;
      this.tipStyle.left = `${X}px`;
      this.toolTip = true;
    },
    hideToolTip() {
      this.toolTip = false;
    },
  },
};
</script>