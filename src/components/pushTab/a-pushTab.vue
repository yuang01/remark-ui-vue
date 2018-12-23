<template>
  <a @click="pushBrandToTab(href, title, ohref)" href="javascript:;" style="text-decoration: none;">
    <slot name="content"></slot>
  </a>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    href: { default: '' }, // tab的href
    title: { default: '' }, // tab显示的名称
    to: { default: '' }, // 要跳转到哪里去
  },

  data() {
    return {
      one: 0,
      two: '',
      twoIndex: 0,
      ohref: '',
    };
  },

  computed: {
    ...mapGetters([
      'tab',
      'menus',
    ]),
  },

  methods: {
    ...mapActions([
      'pushTab',
      'activeTab',
    ]),
    pushBrandToTab(href, title, ohref) {
      if (this.href.includes('/')) {
        ohref = href.split('/')[0];
      } else {
        ohref = href;
      }
      this.menus.forEach((val, aindex) => {
        if (val.href === ohref) {
          this.one = aindex;
          this.two = undefined;
          this.twoIndex = undefined;
        } else if (val.children) {
          val.children.forEach((val2, bindex) => {
            if (val2.href === ohref) {
              this.one = aindex;
              this.two = undefined;
              this.twoIndex = bindex;
            } else if (val2.children) {
              val2.children.forEach((val3) => {
                if (val3.href === ohref) {
                  this.one = aindex;
                  this.two = val2.title;
                  this.twoIndex = bindex;
                }
              });
            }
          });
        }
      });
      const tab = {
        href,
        title,
        one: this.one,
        two: this.two,
        twoIndex: this.twoIndex,
      };
      if (this.tab.items.find(element => element.href === tab.href)) {
        this.activeTab({ href: tab.href });
      } else {
        this.pushTab({ tab });
        localStorage.setItem('tab', JSON.stringify(tab));
      }
      this.$router.push(this.to);
    },
  },
};
</script>



