<template>
  <base-layout>
    <div class="page-content" slot="content">
      <div class="row">
        <div class="col-md-6" v-for="(item, index) in productViewsFood" :key="index">
          <div class="panel" :class="{ 'is-loading': fetchLoading }">
            <div class="panel-heading">
              <h5 class="panel-title">{{ item.name }}</h5>
            </div>
            <div class="panel-body">
              <table class="table table-hover table-striped table-custom">
                <tbody>
                  <tr>
                    <th>序号</th>
                    <th>产品</th>
                    <th>品牌总数</th>
                    <th>风险商品总数</th>
                    <th>差评总数</th>
                  </tr>
                </tbody>
              </table>
              <div class="tab2">
                <table class="table table-hover table-striped table-custom">
                  <tbody>
                    <tr v-for="(aitem, aindex) in item.list" :key="aindex">
                      <td>{{ aindex + 1 + (pagination.page - 1) * 15 }}</td>
                      <td>
                        <a href="javascript:;" @click="toBrandsPage(aitem.guid, aitem.name)">{{ aitem.name }}</a>
                      </td>
                      <td>{{ aitem.brand_num }}</td>
                      <td>{{ aitem.risk_goods_num }}</td>
                      <td>{{ aitem.risk_comment_num }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="panel-loading" v-show="fetchLoading">
              <div class="loader loader-default"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </base-layout>
</template>

<script>
import { getProductViews } from '@/api/ciq';
import { mapActions, mapGetters } from 'vuex';

const BaseLayout = () => import('@/components/Layouts/Base');

export default {
  components: {
    'base-layout': BaseLayout,
  },
  data() {
    return {
      productViewsFood: [],
      fetchLoading: false,
      pagination: {
        page: 1,
        pages: 0, // 总页数
      },
    };
  },

  computed: {
    ...mapGetters([
      'tab',
    ]),
  },

  methods: {
    ...mapActions([
      'addActiveClass',
      'pushTab',
    ]),
    async url() {
      this.fetchLoading = true;
      const result = await getProductViews({
      });
      this.productViewsFood = result.data;
      this.fetchLoading = false;
    },

    toBrandsPage(id, text) {
      this.$router.replace(`brands?id=${id}&text=${text}`);
      this.addActiveClass({ href: 'brands' }); // 让tab栏的tactive变为brands
      const obj = this.tab.items.find(element => element.href === 'brands'); // 检查tab栏是否存在brands(品牌列表)，如果没有，就push品牌列表
      if (typeof obj === 'undefined') {
        const tab = {
          href: 'brands',
          title: '品牌列表',
          one: 3,
          two: undefined,
          twoIndex: undefined,
        };
        this.pushTab({ tab });
      }
    },

  },

  mounted() {
    this.url();
  },

};
</script>

<style scoped>
  .tab2 {
    height: 240px;
    overflow: auto;
  }
  .tab2::-webkit-scrollbar {
    display:none;
  }
  .tab2 {
   -ms-overflow-style: none;
  }
</style>
