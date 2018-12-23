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
          <li class="page-item" v-show="currentPage>5 && pages>7" @click="jumpPage(1)"><a class="page-link" href="javascript:void(0)">1</a></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0)" v-show="efont">...</a></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0)" v-show="pages === 0">0</a></li>
          <li class="page-item" v-for="(num,index) in indexs" :key="index" :class="{active:currentPage==num}" @click="jumpPage(num)"><a class="page-link" href="javascript:void(0)">{{num}}</a></li>
          <li class="page-item"><a class="page-link" href="javascript:void(0)" v-show="ebehind">...</a></li>
          <li class="page-item" v-show="currentPage<pages-4 && pages>7" @click="jumpPage(pages)"><a class="page-link" href="javascript:void(0)">{{pages}}</a></li>
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
  props: ['pages', 'value'],
  data() {
    return {
      currentPage: this.value,
    };
  },
  watch: {
    value(val) {
      this.currentPage = val;
    },
  },
  computed: {
    pstart() {
      return this.currentPage === 1 || this.pages === 0;
    },
    pend() {
      return this.currentPage === this.pages || this.pages === 0;
    },
    efont() {
      if (this.pages <= 7) {
        return false;
      }
      return this.currentPage > 5;
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
        if (this.currentPage > 5 && this.currentPage < this.pages - 4) {
          left = Number(this.currentPage) - 3;
          right = Number(this.currentPage) + 3;
        } else if (this.currentPage <= 5) {
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
      if (this.currentPage === 1 || this.pages === 0) {
        return;
      }
      this.currentPage -= 1;
      this.$emit('input', this.currentPage);
    },
    jumpPage(id) {
      if (id === this.currentPage) {
        return;
      }
      this.currentPage = id;
      this.$emit('input', this.currentPage);
    },
    next() {
      if (this.currentPage === this.pages || this.pages === 0) {
        return;
      }
      this.currentPage += 1;
      this.$emit('input', this.currentPage);
    },
  },
};
</script>

<style scoped>
  .example-wrap {
    margin-bottom: 0px !important;
  }
</style>
