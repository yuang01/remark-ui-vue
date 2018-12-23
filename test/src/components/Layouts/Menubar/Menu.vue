<template>
  <ul class="site-menu onlyone">
    <li class="site-menu-category">功能</li>
    <li class="site-menu-item one" :class="{ 'has-sub': item.children, 'open': bindex === side.subActive, 'active': item.href === side.menuActive }" v-for="(item, bindex) in menus" :key="bindex">
      <!-- 一级 -->
      <a :href="item.href"  @click.stop.prevent="clickMenu($event, bindex, cindex = undefined, item.index.one, item.index.two, item.index.twoIndex)">
        <i :class="'site-menu-icon font-size-16 fa-' + item.icon"></i>
        <span class="site-menu-title">{{ item.title }}</span>
        <span class="site-menu-arrow" v-if="item.children"></span>
      </a>
      <!-- 二级 -->
      <transition name="sub-menu">
        <ul class="site-menu-sub" v-if="side.children && side.children.length && bindex === side.subActive">
          <li class="site-menu-item" :class="{ 'has-sub': child.children, 'open': child.title === side.desActive, 'active': child.href === menuactive }" v-for="(child, index) in side.children" :key="index">
            <a class="animsition-link" :href="child.href" :title="child.title" @click.stop.prevent="clickMenu($event, side.subActive, index, child.index.one, child.index.two, child.index.twoIndex)">
              <span class="site-menu-title">{{ child.title }}</span>
              <span class="site-menu-arrow" v-if="child.children"></span>
            </a>
            <!-- 三级 -->
            <transition name="sub-menu">
              <ul class="site-menu-sub" v-if="child.title === side.desActive && side.descendant && side.descendant.length">
                <li class="site-menu-item" :class="{ 'has-sub': des.descendant, 'active': des.href === side.menuActive }" v-for="(des, cindex) in side.descendant" :key="cindex">
                  <a class="animsition-link" :href="des.href" @click.stop.prevent="clickMenu($event, side.subActive, cindex = undefined, des.index.one, des.index.two, des.index.twoIndex)">
                    <span class="site-menu-title">{{ des.title }}</span>
                    <span class="site-menu-arrow" v-if="des.descendant"></span>
                  </a>
                  <slot name="sub"></slot>
                </li>
              </ul>
            </transition>
          </li>
        </ul>
      </transition>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {

  computed: {
    ...mapGetters([
      'menus',
      'tab',
      'side',
    ]),

    menuactive() {
      if (this.side.menuActive.indexOf('/') >= 0) {
        return this.side.menuActive.split('/')[0];
      }
      return this.side.menuActive;
    },
  },

  methods: {
    ...mapActions([
      'pushTab',
      'activeTab',
      'keepSubActive',
      'swichSubActive',
      'keepChildren',
      'keepDescendant',
      'addActiveClass',
      'swichDesActive',
    ]),
    clickMenu(e, bindex, cindex, one, two, twoIndex) {
      const target = e.currentTarget;
      const title = target.getAttribute('title');
      this.keepSubActive({ index: bindex }); // 保存当前点击的栏目，假如点击第二个栏目，就让第二个栏目展开

      if (target.parentNode.getAttribute('class').indexOf('open') > 0) {
        if (typeof cindex !== 'undefined') { // 点击二级栏目，并且含有三级内容，也就是含有类has-sub
          this.swichDesActive(); // 当点击二级栏目，并且含有类has-sub，呈现展开状态的时候，就将desactive变为''，将其关闭
          return;
        }

        this.swichSubActive(); // 当栏目已经展开的状态，就让subActive等于 -1 ，将其关闭
        return;
      }

      if (target.parentNode.getAttribute('class').indexOf('has-sub') > 0) {
        // 如果有栏目是多级的，就将children保存在vuex里面，防止刷新页面children消失
        this.keepChildren({ children: this.menus[bindex].children });

        if (typeof cindex !== 'undefined') {
          // 保存三级内容，并且保存三级active，三级active为字符串，通过上一级的title，可能不够唯一性
          this.keepDescendant({
            descendant: this.side.children[cindex].children, desActive: title });
        }
      } else {
        const tab = {
          href: target.getAttribute('href'),
          title: target.getElementsByClassName('site-menu-title')[0].innerText,
          one,
          two,
          twoIndex,
        };

        if (typeof cindex !== 'undefined') {
          this.swichDesActive();
        }

        if (target.parentNode.parentNode.getAttribute('class').indexOf('onlyone') > 0) {
          this.keepChildren({ children: [] }); // 点击栏目，如果栏目只有一级，就将children变为空
        }
        this.addActiveClass({ href: tab.href }); // 当点击栏目的时候，给当前栏目（只有一级，或者是二三级栏目）加上active

        if (this.tab.items.find(element => element.href === tab.href)) {
          this.activeTab({ href: tab.href });
        } else {
          this.pushTab({ tab });
        }
        this.$router.push(`/${tab.href}`);
      }
    },
  },
};
</script>

<style scoped>
.site-menu-sub {
  transition: all .3s ease;
}
.sub-menu-enter-active,
.sub-menu-leave-active {
  transition: all .3s ease;
  max-height: 230px;
}
.sub-menu-enter,
.sub-menu-leave-to
{
  opacity: 0;
  max-height: 0px;
}
</style>
