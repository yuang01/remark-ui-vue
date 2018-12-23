<template>
<transition>
  <!-- 两边固定的表格 -->
  <div v-if="type === 'fixed'">
    <div class="tab1">
      <table class="table table-hover table-striped table-custom">
        <thead>
          <tr>
            <th>序号</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in arr.length" :key="item" :class="{'bg-default': index === bgDefault}" @mouseover="addBgColor(index)" @mouseout="bgDefault = -1">
            <td>{{ index + 1 + (currentPage - 1) * 15}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="tab2">
      <table class="table table-hover table-striped table-custom">
        <thead>
          <tr>
            <th v-for="(item, colindex) in Th" :key="colindex">{{item}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in arr" :key="index" :class="{'bg-default': index === bgDefault}" @mouseover="addBgColor(index)" @mouseout="bgDefault = -1">
            <td v-for="(eq, tdindex) in Td" :key="tdindex">
              <!-- 表格中的url只支持一行中的一个字段拥有超链接，urlIndex自定义第几个字段拥有超链接，默认为0 -->
              <a :href="item.url || item.link" target="_blank" v-if="typeof item.url !== 'undefined' && tdindex === urlIndex || typeof item.link !== 'undefined' && tdindex === urlIndex"> {{item[eq]}}</a>
              <a href="javascript:" class="mr-5" v-for="(aitem, aindex) in item[eq]" :key="aindex" v-else-if="item[eq] instanceof Array">
                <span class="badge badge-round badge-dark badge-outline">{{ aitem }}</span>
              </a>
              <span v-else>{{item[eq]}}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="tab3">
      <table class="table table-hover table-striped table-custom">
        <thead>
          <tr>
            <th v-for="(item, index) in lastTh" :key="index">
              {{item}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in arr" :key="index" :class="{'bg-default': index === bgDefault}" @mouseover="addBgColor(index)" @mouseout="bgDefault = -1">
            <td v-for="(eq, aindex) in lastTd" :key="aindex">{{item[eq]}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- 基本表格 -->
  <div v-if="type === 'basic'">
    <table class="table table-hover table-striped table-custom">
      <thead class="bg-blue-grey-100">
        <tr>
          <th>序号</th>
          <th v-for="(item, index) in Th" :key="index">{{item}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in arr" :key="index">
          <td>{{ index + 1 + (currentPage - 1) * 15}}</td>
          <td v-for="(eq, tdindex) in Td" :key="tdindex">
            <!-- 表格中的url只支持一行中的一个字段拥有超链接，urlIndex自定义第几个字段拥有超链接，默认为0 -->
            <a :href="item.url || item.link" target="_blank" v-if="typeof item.url !== 'undefined' && tdindex === urlIndex || typeof item.link !== 'undefined' && tdindex === urlIndex">{{item[eq]}}</a>
            <a href="javascript:" class="mr-5" v-for="(aitem, aindex) in item[eq]" :key="aindex" v-else-if="item[eq] instanceof Array">
              <span class="badge badge-round badge-dark badge-outline">{{ aitem.text }}</span>
              <!-- ‘text’ 是写死的值,应修改为一个随api字段改动而随动的值 -->
            </a>
            <span v-else>{{item[eq]}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</transition>
</template>

<script>
// arr 从后台请求得到的数据。
// columns 的格式为 columns: {th:[表格头部], td: [字段名，如title]}
// currentPage 当前的页数
// type为表格的类型，目前支持fixed（表格前后固定），和basic（基本表格）
// urlIndex为从后台接收的url，如果urlIndex为0，说明第一列是a链接，链接地址为url, 注：后台传过来的超链接字段名只能是url或者link。
export default {
  props: {
    arr: {
      type: Array,
      default: () => [],
    },
    currentPage: {
      default: 1,
    },
    columns: {
      type: Object,
      default: () => {},
    },
    type: {
      default: 'basic',
    },
    // 指定一行中的第几个字段拥有url，从0开始
    urlIndex: {
      default: 0,
    },
  },

  data() {
    return {
      Th: [],
      lastTh: [],
      Td: [],
      lastTd: [],
      bgDefault: -1,
    };
  },

  methods: {
    addBgColor(index) {
      this.bgDefault = index;
    },
  },

  mounted() {
    if (this.type === 'fixed') {
      this.Th = this.columns.th.splice(0, this.columns.th.length - 2);
      this.lastTh = this.columns.th.splice(this.columns.th.length - 2, this.columns.th.length);
      this.Td = this.columns.td.splice(0, this.columns.td.length - 2);
      this.lastTd = this.columns.td.splice(this.columns.td.length - 2, this.columns.td.length);
    } else if (this.type === 'basic') {
      this.Th = this.columns.th;
      this.Td = this.columns.td;
    }
  },
};
</script>

<style scoped>
  .tab1 {
    width: 5%;
    max-width: 5%;
    float: left;
    overflow: hidden;
    box-shadow: 2px 1px 2px 0px #eee;
  }
  .tab2 {
    width: 85%;
    max-width: 85%!important;
    float: left;
    overflow: hidden;
    overflow-x: scroll;
  }
  .tab3 {
    width: 10%;
    max-width: 10%;
    float: right;
    overflow: hidden;
    box-shadow: -2px 1px 2px 0px #eee;
  }
  .bg-default {
    background: #f3f7fa!important;
  }
  .table-custom th,
  .table-custom td {
    max-width: 500px;
    min-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .table-custom a {
    text-decoration: none;
  }
  tbody td a {
    padding: 3px;
  }
  tbody td a:hover {
    color: #11c26d;
  }
  tbody a {
    color: grey;
    font-weight: 500;
  }
</style>



