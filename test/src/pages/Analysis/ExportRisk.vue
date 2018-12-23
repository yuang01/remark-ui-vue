<template>
  <base-layout>
    <div class="page-content" slot="content">
      <div class="row">
        <div class="col-md-4">
          <div class="panel" :class="{ 'is-loading': fetchLoading }">
            <div class="panel-heading">
              <h4 class="panel-title">信息类别占比</h4>
            </div>
            <div class="panel-body">
              <div id="bar1" style="height: 230px;">
              </div>
            </div>
            <div class="panel-loading" v-show="fetchLoading">
              <div class="loader loader-default"></div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="panel" :class="{ 'is-loading': fetchLoading }">
            <div class="panel-heading">
              <h4 class="panel-title">出口国风险信息占比</h4>
            </div>
            <div class="panel-body">
              <div id="bar2" style="height: 230px;">
              </div>
            </div>
            <div class="panel-loading" v-show="fetchLoading">
              <div class="loader loader-default"></div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="panel" :class="{ 'is-loading': fetchLoading }">
            <div class="panel-heading">
              <h4 class="panel-title">事件动作占比</h4>
            </div>
            <div class="panel-body">
              <div id="bar3" style="height: 230px;">
              </div>
            </div>
            <div class="panel-loading" v-show="fetchLoading">
              <div class="loader loader-default"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="panel" :class="{ 'is-loading': fetchLoading }">
            <div class="panel-heading">
              <h4 class="panel-title">风险数目变化</h4>
            </div>
            <div class="panel-body">
              <div id="bar4" style="height: 230px;">
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
/* eslint-disable */
import { getExportRisks } from '@/api/ciq';

const BaseLayout = () => import('@/components/Layouts/Base');
const DatePicker = () => import('@/components/DatePicker/DatePicker');
const Input = () => import('@/components/Input/Input');
const Pagination = () => import('@/components/Pagination/Pagination');

export default {
  components: {
    'base-layout': BaseLayout,
    'date-picker': DatePicker,
    'float-input': Input,
    'turn-pages': Pagination,
  },
  data() {
    return {
      importRisksAP: [],
      importRisksAPName: [],
      importRisksFW: [],
      importRisksFWName: [],
      importRisksRI: [],
      importRisksRIName: [],
      importRisksRC: [],
      importRisksRCX: [],
      importRisksRCName: [],
      fetchLoading: true,
      pagination: {
        page: 1,
        currentPage: 1, // 当前页
        pages: 0, // 总页数
      },
    };
  },

  computed: {
    bar1() {
      const bar1 = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          data: this.importRisksAPName,
          selectedMode: false,
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.importRisksAP,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
      return bar1;
    },
    bar2() {
      const bar2 = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          data: this.importRisksFWName,
          selectedMode: false,
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.importRisksFW,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
      return bar2;
    },
    bar3() {
      const bar3 = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          data: this.importRisksRIName,
          selectedMode: false,
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.importRisksRI,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };
      return bar3;
    },
    bar4() {
      const bar4 = {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: this.importRisksRCName,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.importRisksRCX,
        },
        yAxis: {
          type: 'value',
        },
        series: this.importRisksRC,
      };
      return bar4;
    },
  },

  methods: {
    async url() {
      this.fetchLoading = true;
      const resultAP = await getExportRisks({
        type: 'icaf',
      });
      const resultFW = await getExportRisks({
        type: 'ecrip',
      });
      const resultRI = await getExportRisks({
        type: 'tpoea',
      });
      const resultRC = await getExportRisks({
        type: 'tnorc',
      });
      // 第一张图
      this.importRisksAP = resultAP.data.data;
      this.importRisksAP.forEach((element) => {
        this.importRisksAPName.push(element.name);
      });
      // 第二张图
      this.importRisksFW = resultFW.data.data;
      this.importRisksFW.forEach((element) => {
        this.importRisksFWName.push(element.name);
      });
      // 第三张图
      this.importRisksRI = resultRI.data.data;
      this.importRisksRI.forEach((element) => {
        this.importRisksRIName.push(element.name);
      });
      // 第四张图
      this.importRisksRC = resultRC.data.series;
      this.importRisksRCX = resultRC.data.data;
      resultRC.data.series.forEach((element) => {
        this.importRisksRCName.push(element.name);
      });
      this.fetchLoading = false;

      require('echarts/theme/walden');
      this._vue_charts = echarts.init(document.getElementById('bar1'), 'walden');
      this._vue_charts.setOption(this.bar1);
      this._vue_charts = echarts.init(document.getElementById('bar2'), 'walden');
      this._vue_charts.setOption(this.bar2);
      this._vue_charts = echarts.init(document.getElementById('bar3'), 'walden');
      this._vue_charts.setOption(this.bar3);
      this._vue_charts = echarts.init(document.getElementById('bar4'), 'walden');
      this._vue_charts.setOption(this.bar4);
    },
  },
  mounted() {
    this.url(1);
  },
};
</script>
