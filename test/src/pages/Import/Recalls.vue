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
              <Table :arr="recalls" :currentPage="pagination.currentPage" :columns="columns"></Table>
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
import { getRecalls } from '@/api/ciq';
import _ from 'lodash';

const BaseLayout = () => import('@/components/Layouts/Base');
const DatePicker = () => import('@/components/DatePicker/DatePicker');
const Input = () => import('@/components/Input/Input');
const Pagination = () => import('@/components/Pagination/Pagination');
const Table = () => import('@/components/Table/Table');

export default {
  components: {
    'base-layout': BaseLayout,
    'date-picker': DatePicker,
    'float-input': Input,
    'turn-pages': Pagination,
    Table,
  },
  data() {
    return {
      placeholder: {
        title: '标题',
      },
      columns: {
        th: ['标题', '发布时间'],
        td: ['title', 'pubtime'],
      },
      selected: [],
      options: [],
      recalls: [],
      fetchLoading: false,
      inputVal: {
        title: '',
        starttime: '',
        endtime: '',
      },
      pagination: {
        page: 1,
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
  },

  methods: {
    getSearch: _.debounce(function delay() {
      this.url(1);
    }, 500),
    async url(currentPage) {
      this.fetchLoading = true;
      const result = await getRecalls({
        page: currentPage,
        title: this.inputVal.title,
        starttime: this.inputVal.starttime,
        endtime: this.inputVal.endtime,
        length: 15,
      });
      this.pagination.currentPage = currentPage;
      this.recalls.splice(0, this.recalls.length);
      this.recalls = result.data.list;
      this.fetchLoading = false;
      this.pagination.pages = Math.ceil(result.data.total / 15);
    },

    dates(val) {
      this.inputVal.starttime = val.start;
      this.inputVal.endtime = val.end;
    },

  },

  mounted() {
    this.url(1);
  },
};
</script>
