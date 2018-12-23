<template>
  <base-layout>
    <div class="page-content" slot="content">
      <div class="row">
        <div class="col-md-8">
          <div class="panel" :class="{ 'is-loading': fetchLoading }">
            <div class="row">
              <div class="col-md-6">
                <div class="panel-heading">
                  <h4 class="panel-title">进境食品/化妆品风险预警信息</h4>
                </div>
                <div class="panel-body">
                  <div id="bar2" style="height: 230px;">
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="panel-heading">
                  <h4 class="cosmetics"></h4>
                </div>
                <div class="panel-body">
                  <div id="bar3" style="height: 230px;">
                  </div>
                </div>
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
              <h4 class="panel-title">进口不合格农产品信息</h4>
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
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="panel" :class="{ 'is-loading': fetchLoading }">
            <div class="panel-heading">
              <h4 class="panel-title">缺陷产品召回信息数</h4>
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
        <div class="col-md-4">
          <div class="panel" :class="{ 'is-loading': fetchLoading }">
            <div class="panel-heading">
              <h4 class="panel-title">产品召回信息数</h4>
            </div>
            <div class="panel-body">
              <div id="bar5" style="height: 230px;">
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
import { getImportRisks } from '@/api/ciq';

const BaseLayout = () => import('@/components/Layouts/Base');
export default {
  components: {
    'base-layout': BaseLayout,
  },
  data() {
    return {
      importRisksAP: [],
      importRisksFW: [],
      importRisksRI: [],
      importRisksDPY: [],
      importRisksPRX: [],
      importRisksPRY: [],
      importRisksAPName: [],
      importRisksFWName: [],
      importRisksRIName: [],
      importRisksDPName: [],
      importRisksPRName: [],
      importRisksDPX: [],
      DpSeriesData: [],
      fetchLoading: false,
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
        xAxis: {
          type: 'category',
          data: this.importRisksDPX,
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          data: this.importRisksDPY,
          type: 'bar',
        }],
      };
      return bar4;
    },
    bar5() {
      const bar5 = {
        xAxis: {
          type: 'category',
          data: this.importRisksPRX,
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          data: this.importRisksPRY,
          type: 'bar',
        }],
      };
      return bar5;
    },
  },

  methods: {
    async url() {
      this.fetchLoading = true;
      const resultAP = await getImportRisks({
        type: 'isap',
      });
      const resultFW = await getImportRisks({
        type: 'ifrw',
      });
      const resultRI = await getImportRisks({
        type: 'icri',
      });
      const resultDP = await getImportRisks({
        type: 'nodp',
      });
      const resultPR = await getImportRisks({
        type: 'tnopr',
      });
      // 第一张图
      this.importRisksAP = resultAP.data;
      this.importRisksAP.forEach((element) => {
        this.importRisksAPName.push(element.name);
      });
      // 第二张图
      this.importRisksFW = resultFW.data;
      this.importRisksFW.forEach((element) => {
        this.importRisksFWName.push(element.name);
      });
      // 第三张图
      this.importRisksRI = resultRI.data;
      this.importRisksRI.forEach((element) => {
        this.importRisksRIName.push(element.name);
      });
      // 第四张图
      this.importRisksDPY = resultDP.data.data;
      this.importRisksDPX = resultDP.data.series[0].data;
      // 第五张图
      this.importRisksPRY = resultDP.data.data;
      this.importRisksPRX = resultPR.data.series[0].data;
      // 结束加载动画
      this.fetchLoading = false;

      require('echarts/theme/walden');
      this._vue_charts = echarts.init(document.getElementById('bar2'), 'walden');
      this._vue_charts.setOption(this.bar2);
      this._vue_charts = echarts.init(document.getElementById('bar3'), 'walden');
      this._vue_charts.setOption(this.bar3);
      this._vue_charts = echarts.init(document.getElementById('bar1'), 'walden');
      this._vue_charts.setOption(this.bar1);
      this._vue_charts = echarts.init(document.getElementById('bar4'), 'walden');
      this._vue_charts.setOption(this.bar4);
      this._vue_charts = echarts.init(document.getElementById('bar5'), 'walden');
      this._vue_charts.setOption(this.bar5);
    },
  },

  mounted() {
    this.url(1);
  },
};
</script>

<style scoped>
  .panel {
    overflow: visible !important;
  }
  .cosmetics {
    padding: 12px 20px !important;
  }
</style>
