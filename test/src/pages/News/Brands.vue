<template>
  <base-layout>
    <div class="page-content" slot="content">
      <div class="row">
        <div class="col-md-12">
          <form>
            <div class="row">
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <float-input :placeholder="placeholder.brand" v-model.trim="inputVal.name"></float-input>
              </div>
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <div class="form-group form-material floating">
                  <select-2 :options="optionsC" :placeholder="placeholder.country" :allowClear="true" :url="selectedUrlC" v-model="inputVal.countries" :multiple="false">
                </select-2>
                </div>
              </div>
              <div class="col-xxl-2 col-md-3 col-sm-6">
                <div class="form-group form-material floating">
                  <select-2 :options="optionsI" :placeholder="placeholder.industry" :allowClear="true" :url="selectedUrlI" v-model="inputVal.industries" :multiple="false">
                </select-2>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-xxl-2 col-lg-3 col-md-4 col-sm-6" v-for="(item, index) in riskBrands" :key="index">
          <div class="card">
            <a @click="pushBrandToTab(item.guid, item.name)">
              <div class="counter">
                <img :src= "item.logo">
                <p>{{ item.name }}</p>
                <span class="country">
                  <i v-if="item.areaLabel === 'global'" class="fa-globe font-size-18 blue-600"></i>
                  <i v-else :class="'flag-icon flag-icon-' + item.areaLabel"></i>
                </span>
              </div>
            </a>
          </div>
        </div>
        <div class="example-loading example-well vertical-align text-center m-0 p-0 page-animation" v-if="fetchLoading">
          <div class="loader vertical-align-middle loader-default"></div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <turn-pages :pages="pagination.pages" v-on:url="url" :currentPage="pagination.currentPage"></turn-pages>
        </div>
      </div>
    </div>
  </base-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { getRiskBrands } from '@/api/ciq';
import _ from 'lodash';

const Base = () => import('@/components/Layouts/Base');
const Select2 = () => import('@/components/Select2/Select2');
const Input = () => import('@/components/Input/Input');
const DatePicker = () => import('@/components/DatePicker/DatePicker');
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
        brand: '品牌',
        country: '国家',
        industry: '行业',

      },
      riskBrands: [],
      fetchLoading: false,
      optionsC: [],
      optionsI: [],
      selectedUrlC: '/api/select2/area',
      selectedUrlI: '/api/select2/industries',
      inputVal: {
        name: '',
        countries: [],
        industries: [],
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

  computed: {
    ...mapGetters([
      'tab',
    ]),
  },

  methods: {
    ...mapActions([
      'pushTab',
      'activeTab',
    ]),

    getSearch: _.debounce(function delay() {
      this.url(1);
    }, 500),

    async url(currentPage) {
      this.fetchLoading = true;
      let categortArea = '';
      this.inputVal.countries.forEach((item) => {
        categortArea += `${item}`;
      });
      let categoryIndu = '';
      this.inputVal.industries.forEach((item) => {
        categoryIndu += `${item}`;
      });
      const result = await getRiskBrands({
        page: currentPage,
        name: this.inputVal.name,
        area: categortArea,
        industry: categoryIndu,
        length: 18,
      });
      this.pagination.currentPage = currentPage;
      this.riskBrands = result.data.list;
      this.fetchLoading = false;
      this.pagination.pages = Math.ceil(result.data.total / 18);
    },

    pushBrandToTab(guid, name) {
      const tab = {
        href: `brands/${guid}`,
        title: `${name}品牌`,
        one: 3,
        two: undefined,
        twoIndex: undefined,
      };
      if (this.tab.items.find(element => element.href === tab.href)) {
        this.activeTab({ href: tab.href });
      } else {
        this.pushTab({ tab });
      }
      this.$router.push(`brands/${guid}`);
    },

  },

  created() {
    const guid = this.$route.query.id;
    const name = this.$route.query.text;
    if (typeof guid === 'undefined') {
      this.url(1);
    } else {
      this.optionsI.push({ id: guid, text: name });
      this.inputVal.industries.push(guid);
    }
  },

};
</script>

<style scoped>
  @media (min-width: 992px) and (max-width: 1200px) {
    .counter {
      height: 220px !important;
    }
   }
  @media (max-width: 576px) {
    .counter img {
      margin-top: 15% !important;
    }
   }
  @media (min-width: 1200px) and (max-width: 1600px) {
    .hide {
      display: none;
    }
   }
  .card:hover .counter img{
     transform: scale(1.3);
   }
  .card:hover {
    cursor: pointer;
  }
  .page-content {
    overflow-x: hidden;
  }
  .counter {
    position: relative;
    height: 240px;
    box-sizing: border-box;
  }
  .counter img {
    width: 50%;
    height: 30%;
    margin-top: 30%;
    transition: transform 0.3s;
  }
  .counter p {
    font-size: 1.5em;
    margin-top: 5px;
    color: darkgray;
  }
  .card a {
    text-decoration: none;
  }
  .card {
    margin-bottom: 0 !important;
  }
  .country {
    position: absolute;
    bottom: 3px;
    right: 8px;
    display: block;
    font-size: 16px;
    color: rgb(73, 78, 80);
  }

</style>

