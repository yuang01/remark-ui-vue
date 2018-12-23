<template>
  <base-layout>
    <div class="page-content" slot="content">
      <div class="row">
        <div class="col-md-12">
          <form>
            <div class="row">
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <float-input :placeholder="placeholder.title" v-model.trim="inputVal.title"></float-input>
              </div>
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <float-input :placeholder="placeholder.source" v-model.trim="inputVal.source"></float-input>
              </div>
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <select-2 :options="options" :placeholder="placeholder.keywords" :allowClear="true" :url="selectedUrl" v-model="inputVal.selected" :multiple="true">
                </select-2>
              </div>
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <date-picker @dates="dates"></date-picker>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="panel" :class="{ 'is-loading': fetchLoading }">
            <div class="panel-body">
              <table class="table table-hover table-striped table-custom">
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>标题</th>
                    <th>关键字</th>
                    <th>来源</th>
                    <th>发布时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in exportRecallInfo" :key="index">
                    <td>{{ index + 1 + (pagination.currentPage - 1) * 15 }}</td>
                    <td><a :href="item.url" :title="item.content" target="_blank">{{ item.title }}</a></td>
                    <td>
                      <span class="badge badge-primary badge-round m-3"
                        :class="{ 'badge-outline': inputVal.selected.indexOf(a.id) === -1}"
                        v-for="(a, aindex) in item.keywords"
                        :key="aindex">{{a.text}}</span>
                    </td>
                    <td>{{ item.source }}</td>
                    <td>{{ item.pubtime }}</td>
                  </tr>
                </tbody>
              </table>
              <turn-pages :pages="pagination.pages" v-on:url="url" :currentPage="pagination.currentPage"></turn-pages>
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
import { getExportRecallInfo } from '@/api/ciq';
import _ from 'lodash';

const Base = () => import('@/components/Layouts/Base');
const Select2 = () => import('@/components/Select2/Select2');
const DatePicker = () => import('@/components/DatePicker/DatePicker');
const Input = () => import('@/components/Input/Input');
const Pagination = () => import('@/components/Pagination/Pagination');

export default {
  components: {
    'base-layout': Base,
    'select-2': Select2,
    'date-picker': DatePicker,
    'float-input': Input,
    'turn-pages': Pagination,
  },
  data() {
    return {
      placeholder: {
        title: '标题',
        source: '来源',
        keywords: '关键字',
      },
      fetchLoading: false,
      category: 0,
      options: [],
      selectedUrl: '/api/select2/keywords',
      exportRecallInfo: [],
      inputVal: {
        title: '',
        source: '',
        selected: [],
        starttime: '',
        endtime: '',
      },
      pagination: {
        currentPage: 1, // 当前页
        pages: 0, // 总页数
      },
    };
  },

// 当搜索框的值发生变化的时候，重新请求数据
  watch: {
    inputVal: {
      handler() {
        this.getSearch();
      },
      deep: true,
    },
    $route() {
      this.switch();
    },
  },

  methods: {
    getSearch: _.debounce(function delay() {
      this.url(1);
    }, 500),

    async url(currentPage) {
      this.fetchLoading = true;
      let words = '';
      this.inputVal.selected.forEach((item) => {
        words += `${item},`;
      });
      words = words.substring(0, words.lastIndexOf(','));
      const result = await getExportRecallInfo({
        page: currentPage,
        title: this.inputVal.title,
        source: this.inputVal.source,
        pubtime: this.pubtime,
        keywords: words,
        starttime: this.inputVal.starttime,
        endtime: this.inputVal.endtime,
        length: 15,
        category: this.category,
      });
      this.pagination.currentPage = currentPage; // 用于计算表格中的序号
      this.exportRecallInfo.splice(0, this.exportRecallInfo.length); // 清空表格
      this.exportRecallInfo = result.data.list; // 将请求的数据放入数组中
      this.fetchLoading = false; // 此时隐藏翻页动画
      this.pagination.pages = Math.ceil(result.data.total / 15); // 将数据总数赋值给pages
    },

    dates(val) {
      this.inputVal.starttime = val.start;
      this.inputVal.endtime = val.end;
    },

    switch() {
      switch (this.$route.query.category) {
        case 'tbt':
          this.category = 1;
          break;
        case 'sps':
          this.category = 2;
          break;
        case 'recall':
          this.category = 3;
          break;
        case 'warning':
          this.category = 4;
          break;
        default:
          this.category = 1;
          break;
      }
      // 四页面中，切换页面的时候，重置select2的值。
      this.inputVal.selected = [];
      this.url(1);
    },
  },

  mounted() {
    this.switch();
  },
};
</script>
