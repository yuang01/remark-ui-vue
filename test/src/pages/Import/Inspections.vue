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
                <float-input :placeholder="placeholder.originCountry" v-model.trim="inputVal.area"></float-input>
              </div>
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <float-input :placeholder="placeholder.nonconformity" v-model.trim="inputVal.cause"></float-input>
              </div>
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <float-input :placeholder="placeholder.producers" v-model.trim="inputVal.pNumber"></float-input>
              </div>
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <float-input :placeholder="placeholder.exporters" v-model.trim="inputVal.eNumber"></float-input>
              </div>
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <float-input :placeholder="placeholder.entryPort" v-model.trim="inputVal.port"></float-input>
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
              <Table :arr="inspections" :currentPage="pagination.currentPage" :columns="columns" :type="'fixed'"></Table>
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
import { getInspections } from '@/api/ciq';
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
        originCountry: '原产国',
        nonconformity: '不合格原因',
        producers: '生产商名称及注册编号',
        exporters: '境外出口商名称及注册编号',
        entryPort: '进境口岸',
      },
      columns: {
        th: ['HS编码', '报检单号', '产品名称', '原产国/地区', '数重量', '不合格原因', '判定依据', '处理措施', '处理依据', '生产商名称及注册编号', '境外出口商名称及注册编号', '进境口岸', '年份', '月份'],
        td: ['hscode', 'number', 'product', 'area', 'scale', 'cause', 'judgBasis', 'measure', 'processBasis', 'pNumber', 'eNumber', 'port', 'year', 'month'],
      },

      options: [],
      inspections: [],
      fetchLoading: false,
      inputVal: {
        hscode: '',
        number: '',
        product: '',
        cause: '',
        pNumber: '',
        eNumber: '',
        port: '',
        area: '',
        year: '',
        month: '',
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
      const result = await getInspections({
        page: currentPage,
        hscode: this.inputVal.hscode,
        number: this.inputVal.number,
        product: this.inputVal.product,
        cause: this.inputVal.cause,
        pNumber: this.inputVal.pNumber.toUpperCase(),
        eNumber: this.inputVal.eNumber.toUpperCase(),
        port: this.inputVal.port,
        area: this.inputVal.area,
        year: this.inputVal.year,
        month: this.inputVal.month,
        length: 15,
      });
      this.pagination.currentPage = currentPage;
      this.inspections.splice(0, this.inspections.length);
      this.inspections = result.data.list;
      this.fetchLoading = false;
      this.pagination.pages = Math.ceil(result.data.total / 15);
    },

  },

  mounted() {
    this.url(1);
  },
};
</script>

