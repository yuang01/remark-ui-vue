<template>
  <div class="container-fluid">
    <div class="row title" style="height: 6vh;">
      <div class="col-md-6 offset-md-3 text-center"><h2 class="color-default">湖北进口产品质量数据大屏</h2></div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <div class="box bg-default horn" style="height: 29vh;">
          <div class="bg-color">
            <h6 class="color-default">进口风险变化趋势</h6>
            <div style="height: 200px;" class="echarts" id="line1">
              <!-- <IEcharts :option="line1" :loading="loading" theme="walden"></IEcharts> -->
            </div>
          </div>
        </div>
        <div class="box bg-default horn" style="height: 29vh;">
          <div class="bg-color">
            <h6 class="color-default">进口风险国家统计</h6>
            <div style="height: 200px;" class="echarts" id="bar1">
              <!-- <IEcharts :option="bar1" :loading="loading" theme="walden"></IEcharts> -->
            </div>
          </div>
        </div>
        <div class="box bg-default horn" style="height: 29vh;">
          <div class="bg-color">
            <h6 class="color-default">进口风险信息统计</h6>
            <div style="height: 200px;" class="echarts" id="pie1">
              <!-- <IEcharts :option="pie1" :loading="loading" theme="walden"></IEcharts> -->
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="box bg-default horn" style="height: 29vh;">
          <div class="bg-color">
            <h6 class="color-default">系统概览</h6>
            <div class="risk-overview">
              <table>
                <tr>
                  <th>监测风险信息总数</th>
                  <th>监测品牌总数</th>
                  <th>监测风险评论总数</th>
                  <th>覆盖产品类别</th>
                </tr>
                <tr>
                  <td>{{ dashboardsRo.risk_info_num }}</td>
                  <td>{{ dashboardsRo.brand_num }}</td>
                  <td>{{ dashboardsRo.risk_comment_num }}</td>
                  <td>{{ dashboardsRo.product_num }}</td>
                </tr>
                <tr>
                  <td><span class="number-bar"></span></td>
                  <td><span class="number-bar"></span></td>
                  <td><span class="number-bar"></span></td>
                  <td><span class="number-bar"></span></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="box bg-default horn" style="height: 60vh;">
          <div class="bg-color">
            <h6 class="color-default">全球概览</h6>
            <div class="risk-overview">
              <div style="height: 400px; width: 100%;" id="map1">
                <!-- <IEcharts :option="map1" :loading="loading" theme="walden"></IEcharts> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="box bg-default horn" style="height: 29vh;">
          <div class="bg-color">
            <h6 class="color-default">出口风险信息统计</h6>
            <div style="height: 200px;" class="echarts" id="pie4">
              <!-- <IEcharts :option="pie4" :loading="loading" theme="walden"></IEcharts> -->
            </div>
          </div>
        </div>
        <div class="box bg-default horn" style="height: 29vh;">
          <div class="bg-color">
            <h6 class="color-default">出口风险信息统计</h6>
            <div style="height: 200px;" class="echarts" id="bar2">
              <!-- <IEcharts :option="bar2" :loading="loading" theme="walden"></IEcharts> -->
            </div>
          </div>
        </div>
        <div class="box bg-default horn" style="height: 29vh;">
          <div class="bg-color">
            <h6 class="color-default">出口风险信息变化趋势</h6>
            <div style="height: 200px;" class="echarts" id="line2">
              <!-- <IEcharts :option="line2" :loading="loading" theme="walden"></IEcharts> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
/* eslint-disable */
import { getDashboards } from '@/api/ciq';

const BaseLayout = () => import('@/components/Layouts/Base');

export default {
  components: {
    'base-layout': BaseLayout,
  },

  data() {
    return {
      dashboardsItX: [],
      dashboardsIt: [],
      dashboardsICsX: [],
      dashboardsICs: [],
      dashboardsIc: [],
      dashboardsIcName: [],
      dashboardsRs: [],
      dashboardsRsName: [],
      dashboardsECsX: [],
      dashboardsECs: [],
      dashboardsRtX: [],
      dashboardsRt: [],
      dashboardsRo: [],
      dashboardsMap: [],
      loading: false,
    };
  },

  computed: {
    line1() {
      const line1 = {
        color: ['#1176e1', '#85ffd3'],
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          top: '3%',
          left: '0%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: ['#a9b3be'],
            },
          },
          boundaryGap: false,
          data: this.dashboardsItX,
        },
        yAxis: {
          type: 'value',
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: ['#a9b3be'],
            },
          },
        },
        series: [
          {
            type: 'line',
            stack: '总量',
            data: this.dashboardsIt,
          },
        ],
      };
      return line1;
    },
    bar1() {
      const bar1 = {
        color: ['#1176e1'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {          // 坐标轴指示器，坐标轴触发有效
            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: '3%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          splitLine: { show: false },
          data: this.dashboardsICsX,
          axisLabel: {
            interval: 0,
            rotate: 45,
          },
          axisLine: {
            lineStyle: {
              color: ['#a9b3be'],
            },
          },
        },
        yAxis: {
          type: 'value',
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: ['#a9b3be'],
            },
          },
        },
        series: [{
          type: 'bar',
          data: this.dashboardsICs,
        }],
      };
      return bar1;
    },
    pie1() {
      const pie1 = {
        color: ['#1176e1', '#85ffd3', '#08fcff'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 25,
          bottom: 20,
          textStyle: {    // 图例文字的样式
            color: '#a9b3be',
          },
          data: this.dashboardsIcName,
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: this.dashboardsIc,
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
      return pie1;
    },
    map1() {
      const nameMap = {
        'Korea': "韩国",
        'Côte d\'Ivoire': '科特迪瓦',
        'Dem. Rep. Korea': '朝鲜',
        'Afghanistan':'阿富汗',
        'Angola': '安哥拉',
        'Albania': '阿尔巴尼亚',
        'United Arab Emirates': '阿联酋',
        'Argentina': '阿根廷',
        'Armenia': '亚美尼亚',
        'French Southern and Antarctic Lands': '法属南半球和南极领地',
        'Australia': '澳大利亚',
        'Austria': '奥地利',
        'Azerbaijan': '阿塞拜疆',
        'Barbados' :  '巴巴多斯',
        'Burundi': '布隆迪',
        'Belgium': '比利时',
        'Benin': '贝宁',
        'Burkina Faso': '布基纳法索',
        'Bangladesh': '孟加拉国',
        'Bulgaria': '保加利亚',
        'Bahamas': '巴哈马',
        'Bosnia and Herz.': '波斯尼亚和黑塞哥维那',
        'Belarus': '白俄罗斯',
        'Belize': '伯利兹',
        'Bermuda': '百慕大',
        'Bolivia': '玻利维亚',
        'Brazil': '巴西',
        'Brunei': '文莱',
        'Bhutan': '不丹',
        'Botswana': '博茨瓦纳',
        'Central African Rep.': '中非共和国',
        'Canada': '加拿大',
        'Cape Verde': '佛得角共和国',
        'Switzerland': '瑞士',
        'Chile': '智利',
        'China': '中国',
        'Ivory Coast': '象牙海岸',
        'Cameroon': '喀麦隆',
        'Congo': '刚果共和国',
        'Colombia': '哥伦比亚',
        'Costa Rica': '哥斯达黎加',
        'Cuba': '古巴',
        'Northern Cyprus': '北塞浦路斯',
        'Cyprus': '塞浦路斯',
        'Czech Rep.': '捷克共和国',
        'Germany': '德国',
        'Djibouti': '吉布提',
        'Dem. Rep. Congo':  '刚果民主共和国',
        'Denmark': '丹麦',
        'Dominican Rep.': '多米尼加共和国',
        'Dominica': '多米尼克',
        'Algeria': '阿尔及利亚',
        'Ecuador': '厄瓜多尔',
        'Egypt': '埃及',
        'Eritrea': '厄立特里亚',
        'Spain': '西班牙',
        'Eq. Guinea': '赤道几内亚',
        'Estonia': '爱沙尼亚',
        'Ethiopia': '埃塞俄比亚',
        'Finland': '芬兰',
        'Fiji': '斐济',
        'Falkland Is.': '马尔维纳斯群岛',
        'France': '法国',
        'Gabon': '加蓬',
        'United Kingdom': '英国',
        'Georgia': '格鲁吉亚',
        'Ghana': '加纳',
        'Guinea': '几内亚',
        'Gambia': '冈比亚',
        'Guinea-Bissau': '几内亚比绍',
        'Greece': '希腊',
        'Greenland': '格陵兰',
        'Guatemala': '危地马拉',
        'French Guiana': '法属圭亚那',
        'Guyana': '圭亚那',
        'Honduras': '洪都拉斯',
        'Croatia': '克罗地亚',
        'Haiti': '海地',
        'Hungary': '匈牙利',
        'Indonesia': '印尼',
        'India': '印度',
        'Ireland': '爱尔兰',
        'Iran': '伊朗',
        'Iraq': '伊拉克',
        'Iceland': '冰岛',
        'Israel': '以色列',
        'Italy': '意大利',
        'Jamaica': '牙买加',
        'Jordan': '约旦',
        'Japan': '日本',
        'Kazakhstan': '哈萨克斯坦',
        'Kenya': '肯尼亚',
        'Kyrgyzstan': '吉尔吉斯斯坦',
        'Cambodia': '柬埔寨',
        'South Korea': '韩国',
        'Kosovo': '科索沃',
        'Kuwait': '科威特',
        'Lao PDR': '老挝',
        'Lebanon': '黎巴嫩',
        'Liberia': '利比里亚',
        'Libya': '利比亚',
        'Sri Lanka': '斯里兰卡',
        'Lesotho': '莱索托',
        'Lithuania': '立陶宛',
        'Luxembourg': '卢森堡',
        'Latvia': '拉脱维亚',
        'Morocco': '摩洛哥',
        'Moldova': '摩尔多瓦',
        'Madagascar': '马达加斯加',
        'Mexico': '墨西哥',
        'Macedonia': '马其顿',
        'Mali': '马里',
        'Myanmar': '缅甸',
        'Montenegro': '黑山',
        'Mongolia': '蒙古',
        'Mozambique': '莫桑比克',
        'Mauritania': '毛里塔尼亚',
        'Malawi': '马拉维',
        'Malaysia': '马来西亚',
        'Namibia': '纳米比亚',
        'New Caledonia': '新喀里多尼亚',
        'Niger': '尼日尔',
        'Nigeria': '尼日利亚',
        'Nicaragua': '尼加拉瓜',
        'Netherlands': '荷兰',
        'Norway': '挪威',
        'Nepal': '尼泊尔',
        'New Zealand': '新西兰',
        'Oman': '阿曼',
        'Pakistan': '巴基斯坦',
        'Panama': '巴拿马',
        'Peru': '秘鲁',
        'Philippines': '菲律宾',
        'Papua New Guinea': '巴布亚新几内亚',
        'Poland': '波兰',
        'Puerto Rico': '波多黎各',
        'North Korea': '北朝鲜',
        'Portugal': '葡萄牙',
        'Paraguay': '巴拉圭',
        'Qatar': '卡塔尔',
        'Romania': '罗马尼亚',
        'Russia': '俄罗斯',
        'Rwanda': '卢旺达',
        'W. Sahara': '西撒哈拉',
        'Saudi Arabia': '沙特阿拉伯',
        'Sudan': '苏丹',
        'S. Sudan': '南苏丹',
        'Senegal': '塞内加尔',
        'Solomon Is.': '所罗门群岛',
        'Sierra Leone': '塞拉利昂',
        'El Salvador': '萨尔瓦多',
        'Somaliland': '索马里兰',
        'Somalia': '索马里',
        'Serbia': '塞尔维亚共和国',
        'Suriname': '苏里南',
        'Slovakia': '斯洛伐克',
        'Slovenia': '斯洛文尼亚',
        'Sweden': '瑞典',
        'Swaziland': '斯威士兰',
        'Syria': '叙利亚',
        'Chad': '乍得',
        'Togo': '多哥',
        'Thailand': '泰国',
        'Tajikistan': '塔吉克斯坦',
        'Turkmenistan': '土库曼斯坦',
        'Tanzania':  '坦桑尼亚',
        'East Timor': '东帝汶',
        'Trinidad and Tobago': '特里尼达和多巴哥',
        'Tunisia': '突尼斯',
        'Turkey': '土耳其',
        'United Republic of Tanzania': '坦桑尼亚联合共和国',
        'Uganda': '乌干达',
        'Ukraine': '乌克兰',
        'Uruguay': '乌拉圭',
        'United States': '美国',
        'Uzbekistan': '乌兹别克斯坦',
        'Venezuela': '委内瑞拉',
        'Vietnam': '越南',
        'Vanuatu': '瓦努阿图',
        'West Bank': '西岸',
        'Yemen': '也门',
        'South Africa': '南非',
        'Zambia': '赞比亚',
        'Zimbabwe': '津巴布韦',
        'Comoros': '科摩罗伊斯兰联邦共和国',
      };
      const map1 = {
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            let res = `${params.name}<br/>`;
            const myseries = map1.series;
            for (let i = 0; i < myseries.length; i += 1) {
              for (let j = 0; j < myseries[i].data.length; j += 1) {
                if (myseries[i].data[j].name === params.name) {
                  for (let k = 0; k < myseries[i].data[j].key.length; k += 1) {
                    res = `${res}${myseries[i].data[j].key[k]} : ${myseries[i].data[j].value[k]}</br>`;
                  }
                }
              }
            }
            return res;
          },
        },
        grid: {
          top: '0%',
        },
        geo: {
          roam: false,
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
        },
        visualMap: {
          min: 0,
          max: 1000000,
          text: ['高', '低'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['#1176e1', '#08fcff', '#85ffd3'],
          },
          textStyle: {    // 图例文字的样式
            color: '#a9b3be',
          },
        },
        series: [
          {
            name: 'World Population (2010)',
            type: 'map',
            mapType: 'world',
            nameMap,
            itemStyle: {
              emphasis: { label: { show: true } },
            },
            data: this.dashboardsMap,
          },
        ],
      };
      return map1;
    },
    pie4() {
      const pie4 = {
        color: ['#1176e1', '#85ffd3', '#08fcff'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 25,
          bottom: 20,
          textStyle: {    // 图例文字的样式
            color: '#a9b3be',
          },
          data: this.dashboardsRsName,
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['40%', '50%'],
            data: this.dashboardsRs,
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
      return pie4;
    },
    bar2() {
      const bar2 = {
        color: ['#1176e1'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {          // 坐标轴指示器，坐标轴触发有效
            type: 'shadow',      // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: '3%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: ['#a9b3be'],
            },
          },
          data: this.dashboardsECsX,
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: ['#a9b3be'],
            },
          },
          splitLine: { show: false },
        },
        series: [{
          type: 'bar',
          data: this.dashboardsECs,
        }],
      };
      return bar2;
    },
    line2() {
      const line2 = {
        color: ['#1176e1', '#85ffd3'],
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          top: '3%',
          left: '0%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          splitLine: { show: false },
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: ['#a9b3be'],
            },
          },
          data: this.dashboardsRtX,
        },
        yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: ['#a9b3be'],
            },
          },
          splitLine: { show: false },
        },
        series: [
          {
            type: 'line',
            stack: '总量',
            data: this.dashboardsRt,
          },
        ],
      };
      return line2;
    },
  },

  methods: {
    async url() {
      const result = await getDashboards({
      });
      this.dashboardsItX = result.data.irit.xAxis_data;
      this.dashboardsIt = result.data.irit.series_data;
      this.dashboardsICsX = result.data.ircs.xAxis_data;
      this.dashboardsICs = result.data.ircs.series_data;
      this.dashboardsIc = result.data.poiric.series_data;
      this.dashboardsIcName = result.data.poiric.legend_data;
      this.dashboardsRs = result.data.ers.series_data;
      this.dashboardsRsName = result.data.ers.legend_data;
      this.dashboardsECsX = result.data.ercs.series_data;
      this.dashboardsECs = result.data.ercs.xAxis_data;
      this.dashboardsRtX = result.data.ert.xAxis_data;
      this.dashboardsRt = result.data.ert.series_data;
      this.dashboardsMap = result.data.map;
      this.dashboardsRo = result.data.ro;
      this.loading = false;
      this._vue_charts = echarts.init(document.getElementById('line1'));
      this._vue_charts.setOption(this.line1);
      this._vue_charts = echarts.init(document.getElementById('bar1'));
      this._vue_charts.setOption(this.bar1);
      this._vue_charts = echarts.init(document.getElementById('pie1'));
      this._vue_charts.setOption(this.pie1);
      require('echarts/map/js/world.js');
      this._vue_charts = echarts.init(document.getElementById('map1'));
      this._vue_charts.setOption(this.map1);
      this._vue_charts = echarts.init(document.getElementById('pie4'));
      this._vue_charts.setOption(this.pie4);
      this._vue_charts = echarts.init(document.getElementById('bar2'));
      this._vue_charts.setOption(this.bar2);
      this._vue_charts = echarts.init(document.getElementById('line2'));
      this._vue_charts.setOption(this.line2);
    },
  },

  mounted() {
    this.url();
  },

};
/* eslint-enable */
</script>

<style src="@/assets/remark/global/css/bootstrap.css"></style>
<style>
html,body {
  background: url('~@/assets/images/start.jpg');
}
.color-default {
  color: #54c4f9;
}
.bg-default {
  background-color: rgba(33, 81, 158, 0.9);
}
.box {
  overflow: hidden;
  position: relative;
}
.bg-color {
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: rgba(20, 81, 158, 0.2);
}
.horn {
  margin-bottom: 2vh;
  box-sizing: border-box;
  background: linear-gradient(to left, #54c4f9, #54c4f9) left top no-repeat,
              linear-gradient(to bottom, #54c4f9, #54c4f9) left top no-repeat,
              linear-gradient(to left, #54c4f9, #54c4f9) right top no-repeat,
              linear-gradient(to bottom, #54c4f9, #54c4f9) right top no-repeat,
              linear-gradient(to left, #54c4f9, #54c4f9) left bottom no-repeat,
              linear-gradient(to bottom, #54c4f9, #54c4f9) left bottom no-repeat,
              linear-gradient(to left, #54c4f9, #54c4f9) right bottom no-repeat,
              linear-gradient(to left, #54c4f9, #54c4f9) right bottom no-repeat;
  background-size: 2px 20px, 20px 2px, 2px 20px, 20px 2px;
}
.container-fluid {
  padding: 20px;
  padding-top: 5px;
  box-sizing: border-box;
  height: 100vh;
}
.title {
  background: url('~@/assets/images/title.png');
  background-position: center 80%;
}
.title h2 {
  font-size: 4vh;
}
.echarts {
  position: relative;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.risk-overview {
  width: 100%;
  height: calc(100% - 16px);
  display:flex;/*Flex布局*/
  display: -webkit-flex; /* Safari */
  align-items:center;/*指定垂直居中*/
}
.risk-overview table {
  width: 100%;
  height: 150px;
}
.risk-overview tr th {
  width: 25%;
  color: #eee;
}
.risk-overview tr td {
  padding-right: 20px;
  color: #5bcafd;
}
.number-bar {
  display: block;
  width: 100%;
  height: 20px;
  background: linear-gradient(left, #5bcafd, #4cb1e4);
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.number-bar:hover {
  -webkit-transform: scale(1.2);
  -moz-transform: scale(1.2);
  -o-transform: scale(1.2);
  transform: scale(1.2);
}
</style>
