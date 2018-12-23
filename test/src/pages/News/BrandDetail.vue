<template>
  <base-layout>
    <div class="page-content" slot="content">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-block box p-0">
              <div class="img" :style="'backgroundImage:url('+ brandDetailsDes.img + ');'">
              </div>
              <div class="brand-info-right pl-10">
                <div class="logo mt-10">
                  <img :src="brandDetailsDes.logo">
                </div>
                <div class="brand-name"><h3>{{ brandDetailsDes.name }}</h3><span :class="'flag-icon flag-icon-' + brandDetailsDes.label "></span> {{ brandDetailsDes.area }}</div>
                <div class="clear"></div>
                <div class="introduction">
                  <p>{{ brandDetailsDes.content }}</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 加载动画 -->
          <div class="example-loading example-well vertical-align text-center m-0 p-0 page-animation" v-if="fetchLoading.desc">
            <div class="loader vertical-align-middle loader-default"></div>
          </div>
          <!-- end -->
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="panel" :class="{ 'is-loading': fetchLoading.goods }">
            <div class="panel-heading">
              <h4 class="panel-title">商品列表 <small>风险商品数：{{riskProductNum}}</small></h4>
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="col-md-2" v-for="(item, index) in riskProductList" :key="index">
                  <div class="item card">
                    <div class="card-img-top" :style="'backgroundImage:url('+ (item.img === '' ? brandDetailsDes.img : item.img) + ');'">
                    </div>
                    <div class="card-block bg-default">
                      <h5 class="card-title" :title="item.name">{{item.name}}</h5>
                      <p class="card-text">风险商品来源：{{item.ecommerce}}</p>
                      <div>
                        <span :class="'flag-icon flag-icon-' + brandDetailsDes.label "></span>
                        <span class="price">¥ {{item.price}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <turn-pages :pages="pagination1.pages" v-on:url="goods" :currentPage="pagination1.currentPage"></turn-pages>
            </div>
            <div class="panel-loading" v-if="fetchLoading.goods">
              <div class="loader loader-default"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="panel" :class="{ 'is-loading': fetchLoading.comments }">
            <div class="panel-heading">
              <h4 class="panel-title">差评信息 <small>差评总数：{{poorNum}}</small></h4>
            </div>
            <div class="panel-body">
              <table class="table table-hover table-striped table-custom">
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>商品</th>
                    <th>用户名</th>
                    <th>内容</th>
                    <th>时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in poorList" :key="index">
                    <td>{{ index + 1 + (pagination2.currentPage - 1) * 15}}</td>
                    <td>{{item.goods_name}}</td>
                    <td>{{item.user_name}}</td>
                    <td @mouseover="showTooltip($event, item.content, item.goods_name)" @mouseout="hideToolTip()">{{item.content}}</td>
                    <td>{{item.comment_time}}</td>
                  </tr>
                </tbody>
              </table>
              <turn-pages :pages="pagination2.pages" v-on:url="url" :currentPage="pagination2.currentPage"></turn-pages>
            </div>
            <div class="panel-loading" v-if="fetchLoading.comments">
              <div class="loader loader-default"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="example example-popover" v-if="toolTip" :style="tipStyle">
        <div class="popover bs-popover">
          <div class="arrow"></div>
          <h3 class="popover-header">{{tipGoodName}}</h3>
          <div class="popover-body">
            <p>{{tipContent}}</p>
          </div>
        </div>
      </div>
    </div>
  </base-layout>
</template>

<script>
import { getBrandDetails, getBrandDetailsGoods, getBrandDetailsComments } from '@/api/ciq';

const Base = () => import('@/components/Layouts/Base');
const Modal = () => import('@/components/Modal/Modal');
const Select2 = () => import('@/components/Select2/Select2');
const IEcharts = () => import('vue-echarts-v3/src/full');
const DatePicker = () => import('@/components/DatePicker/DatePicker');
const Pagination = () => import('@/components/Pagination/Pagination');

export default {
  components: {
    'base-layout': Base,
    'select-2': Select2,
    'date-picker': DatePicker,
    modal: Modal,
    IEcharts,
    'turn-pages': Pagination,
  },
  data: () => ({
    selected: 2,
    fetchLoading: {
      desc: false,
      goods: false,
      comments: false,
    },
    brandDetailsDes: [],
    riskProductList: [],
    poorList: [],
    riskProductNum: 0,
    poorNum: 0,
    toolTip: false,
    tipContent: '',
    tipGoodName: '',
    tipStyle: {
      position: 'fixed',
      top: '0px',
      left: '0px',
    },
    pagination1: {
      currentPage: 1, // 当前页
      pages: 0, // 总页数
    },
    pagination2: {
      currentPage: 1, // 当前页
      pages: 0, // 总页数
    },
    guid: '',
    options: [
      { id: 1, text: '风险' },
      { id: 2, text: '品牌' },
    ],
  }),

  watch: {
    $route() {
      this.desc();
    },
  },

  methods: {
    async desc() {
      this.fetchLoading.desc = true; // 商品简介加载动画
      this.fetchLoading.goods = true; // 商品列表加载动画
      this.fetchLoading.comments = true; // 差评信息加载动画
      const id = this.$route.path.split('/')[this.$route.path.split('/').length - 1];
      const result = await getBrandDetails({
      }, id);
      this.brandDetailsDes = result.data.desc; // 品牌描述
      this.riskProductNum = result.data.dimension.riskGoodsNum; // 风险商品数
      this.riskProductList = result.data.dimension.riskGoodsList; // 风险商品列表
      this.poorNum = result.data.dimension.riskCommentNum; // 差评数
      this.poorList = result.data.dimension.riskCommentList; // 差评列表
      this.pagination1.pages = Math.ceil(this.riskProductNum / 6); // 风险商品翻页总数
      this.pagination2.pages = Math.ceil(this.poorNum / 15); // 差评翻页总数
      this.fetchLoading.desc = false;
      this.fetchLoading.goods = false; // 此时隐藏翻页动画
      this.fetchLoading.comments = false; // 此时隐藏翻页动画
    },

    async goods(currentPage) {
      this.fetchLoading.goods = true;
      const id = this.$route.path.split('/')[this.$route.path.split('/').length - 1];
      const resultGoods = await getBrandDetailsGoods({
        page: currentPage,
        length: 6,
      }, id);
      this.riskProductNum = resultGoods.data.total; // 风险商品数
      this.pagination1.pages = Math.ceil(this.riskProductNum / 6);
      this.pagination1.currentPage = currentPage; // 用于计算表格中的序号
      this.riskProductList = resultGoods.data.list; // 风险商品列表
      this.fetchLoading.goods = false; // 此时隐藏翻页动画
    },

    async url(currentPage) {
      this.fetchLoading.comments = true; // 差评信息加载动画
      const id = this.$route.path.split('/')[this.$route.path.split('/').length - 1];
      const resultComments = await getBrandDetailsComments({
        page: currentPage,
        length: 15,
      }, id);
      this.poorNum = resultComments.data.total;
      this.poorList = resultComments.data.list;
      this.pagination2.pages = Math.ceil(this.poorNum / 15);
      this.pagination2.currentPage = currentPage; // 用于计算表格中的序号
      this.fetchLoading.comments = false; // 此时隐藏翻页动画
    },

    showTooltip($event, content, goodsName) {
      const X = $event.clientX;
      const Y = $event.clientY;
      this.tipStyle.top = `${Y}px`;
      this.tipStyle.left = `${X}px`;
      this.toolTip = true;
      this.tipContent = content;
      this.tipGoodName = goodsName;
    },
    hideToolTip() {
      this.toolTip = false;
    },
  },

  mounted() {
    this.desc();
  },

};
</script>

<style scoped>
.box {
  height: 220px;
}
.clear {
  clear: both;
}
.card-block {
  overflow: hidden;
}
.panel {
  overflow-x: auto;
}
.img {
  position: relative;
  width: 25%;
  float: left;
  height: 100%;
  min-height: 240px;
  padding: 0;
  background-size: cover;
  background-position: center center;
}
.brand-info-right {
  width: 75%;
  float: left;
}
.logo {
  width: 82px;
  height: 82px;
  float: left;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
.logo img {
  width: 80px;
  height: 80px;
}
.brand-name {
  width: 80%;
  height: 102px;
  padding: 0 .8em;
  float: left;
}
.brand-name h3 {
  font-size: 18px;
  font-weight: 800px;
  color: black;
}
.introduction {
  margin-top: 10px;
}
.introduction p {
  color: #000;
  font-size: 16px;
}
.price {
  float: right;
}
.bg-default{
  background-color: #f3f7fa;
  border: 1px solid #eee;
}
.card-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.card-img-top,
.card-title {
  -moz-transition: all 0.2s;
  -o-transition: all 0.2s;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}
.card-img-top {
  height: 180px;
  opacity: 1;
  border: 1px solid #eee;
  overflow: hidden;
  background-size: cover;
  background-position: center center;
}
.item:hover .card-title {
  color: #3E8EF7;
}
.item:hover .card-img-top {
  opacity: 0.9;
}
</style>
