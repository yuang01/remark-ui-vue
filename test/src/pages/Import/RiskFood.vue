<template>
  <base-layout>
    <div class="page-content" slot="content">
      <div class="row">
        <div class="col-md-12">
          <form>
            <div class="row">
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <float-input :placeholder="placeholder.HSCode" v-model.trim="inputVal.hscode"></float-input>
              </div>
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <float-input :placeholder="placeholder.declaration" v-model.trim="inputVal.number"></float-input>
              </div>
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <float-input :placeholder="placeholder.productName" v-model.trim="inputVal.product"></float-input>
              </div>
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <float-input :placeholder="placeholder.origin" v-model.trim="inputVal.area"></float-input>
              </div>
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <float-input :placeholder="placeholder.proEnterprise" v-model.trim="inputVal.eInfo"></float-input>
              </div>
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <float-input :placeholder="placeholder.importer" v-model.trim="inputVal.iInfo"></float-input>
              </div>
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <float-input :placeholder="placeholder.importerNum" v-model.trim="inputVal.iNumber"></float-input>
              </div>
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <float-input :placeholder="placeholder.entryPort" v-model.trim="inputVal.port"></float-input>
              </div>
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <div class="form-group form-material floating" data-plugin="formMaterial">
                  <select class="form-control" v-model.trim="inputVal.category">
                    <option> </option>
                    <option value="1">食品</option>
                    <option value="2">化妆品</option>
                  </select>
                  <label class="floating-label">产品类别</label>
                </div>
              </div>
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <div class="form-group form-material floating" data-plugin="formMaterial">
                  <select class="form-control" v-model.trim="inputVal.year">
                    <option> </option>
                    <option>2015</option>
                    <option>2016</option>
                    <option>2017</option>
                    <option>2018</option>
                  </select>
                  <label class="floating-label">年份</label>
                </div>
              </div>
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <div class="form-group form-material floating" data-plugin="formMaterial">
                  <select class="form-control" v-model.trim="inputVal.month">
                    <option> </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </select>
                  <label class="floating-label">月份</label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="panel" :class="{ 'is-loading': fetchLoading }">
            <div class="panel-body">
              <Table :arr="riskFoods" :currentPage="pagination.currentPage" :columns="columns" :type="'fixed'"></Table>
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
import { getRiskFoods } from '@/api/ciq';
import _ from 'lodash';

const BaseLayout = () => import('@/components/Layouts/Base');
const DatePicker = () => import('@/components/DatePicker/DatePicker');
const Input = () => import('@/components/Input/Input');
const Pagination = () => import('@/components/Pagination/Pagination');
const Table = () => import('@/components/Table/Table');
const Select2 = () => import('@/components/Select2/Select2');

export default {
  components: {
    'base-layout': BaseLayout,
    'date-picker': DatePicker,
    'float-input': Input,
    'turn-pages': Pagination,
    'select-2': Select2,
    Table,
  },
  data() {
    return {
      placeholder: {
        HSCode: 'HS编码',
        declaration: '报检单号',
        productName: '产品名称',
        proEnterprise: '生产企业信息',
        importer: '进口商信息',
        importerNum: '进口商备案号',
        entryPort: '进境口岸',
        origin: '产地',
      },
      columns: {
        th: ['HS编码', '报检单号', '产品名称', '产地', '生产企业信息', '进口商信息', '进口商备案号', '重量（千克）', '未准入境的事实', '进境口岸', '年份', '月份'],
        td: ['hscode', 'number', 'product', 'area', 'eInfo', 'iInfo', 'iNumber', 'scale', 'cause', 'port', 'year', 'month'],
      },
      selected: [],
      options: [],
      riskFoods: [],
      fetchLoading: false,
      inputVal: {
        hscode: '',
        number: '',
        product: '',
        eInfo: '',
        iInfo: '',
        iNumber: '',
        port: '',
        area: '',
        year: '',
        month: '',
        category: '',
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
      const result = await getRiskFoods({
        page: currentPage,
        hscode: this.inputVal.hscode,
        number: this.inputVal.number,
        product: this.inputVal.product,
        eInfo: this.inputVal.eInfo.toUpperCase(),
        iInfo: this.inputVal.iInfo,
        iNumber: this.inputVal.iNumber,
        port: this.inputVal.port,
        area: this.inputVal.area,
        year: this.inputVal.year,
        month: this.inputVal.month,
        category: this.inputVal.category,
        length: 15,
      });
      this.pagination.currentPage = currentPage;
      this.riskFoods.splice(0, this.riskFoods.length);
      this.riskFoods = result.data.list;
      this.fetchLoading = false;
      this.pagination.pages = Math.ceil(result.data.total / 15);
    },

  },

  mounted() {
    this.url(1);
  },
};
</script>
