<template>
  <div class="example-wrap clear">
    <div class="example">
      <nav>
        <ul class="pagination pagination-no-border">
          <li class="page-item" @click="prev()" :class="{disabled : pstart}">
            <a class="page-link" href="javascript:void(0)" aria-label="Previous">
              <span aria-hidden="true">上一页</span>
            </a>
          </li>
          <li class="page-item" v-show="current_Page>5 && pages>7" @click="jumpPage(1)"><a class="page-link" href="javascript:void(0)">1</a></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0)" v-show="efont">...</a></li>
          <li class="page-item" v-for="(num,index) in indexs" :key="index" :class="{active:current_Page==num}" @click="jumpPage(num)"><a class="page-link" href="javascript:void(0)">{{num}}</a></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0)" v-show="ebehind">...</a></li>
          <li class="page-item" v-show="current_Page<pages-4 && pages>7" @click="jumpPage(pages)"><a class="page-link" href="javascript:void(0)">{{pages}}</a></li>
          <li class="page-item" :class="{disabled : pend}" @click="next()">
            <a class="page-link" href="javascript:void(0)" aria-label="Next">
              <span aria-hidden="true">下一页</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  props: ['pages', 'currentPage'],
  data() {
    return {
      current_Page: this.currentPage,
    };
  },
  watch: {
    currentPage(val) {
      this.current_Page = val;
    },
  },
  computed: {
    pstart() {
      return this.current_Page === 1;
    },
    pend() {
      return this.current_Page === this.pages;
    },
    efont() {
      if (this.pages <= 7) {
        return false;
      }
      return this.current_Page > 5;
    },
    ebehind() {
      if (this.pages <= 7) {
        return false;
      }
      const nowAy = this.indexs;
      return nowAy[nowAy.length - 1] !== this.pages;
    },
    indexs() {
      let left = 1;
      let right = this.pages;
      const ar = [];
      if (this.pages >= 7) { // 总数大于7的时候
        if (this.current_Page > 5 && this.current_Page < this.pages - 4) {
          left = Number(this.current_Page) - 3;
          right = Number(this.current_Page) + 3;
        } else if (this.current_Page <= 5) {
          left = 1;
          right = 7;
        } else {
          right = this.pages;
          left = this.pages - 6;
        }
      }
      while (left <= right) {
        ar.push(left);
        left += 1;
      }
      return ar;
    },
  },
  methods: {
    prev() {
      if (this.current_Page === 1) {
        return;
      }
      this.current_Page -= 1;
      this.$emit('url', this.current_Page);
    },
    jumpPage(id) {
      if (id === this.current_Page) {
        return;
      }
      this.current_Page = id;
      this.$emit('url', this.current_Page);
    },
    next() {
      if (this.current_Page === this.pages) {
        return;
      }
      this.current_Page += 1;
      this.$emit('url', this.current_Page);
    },
  },
};
</script>
