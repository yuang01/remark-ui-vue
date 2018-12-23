<template>
  <div class="page-aside">
    <div class="page-aside-switch">
      <i class="icon wb-chevron-left" aria-hidden="true"></i>
      <i class="icon wb-chevron-right" aria-hidden="true"></i>
    </div>
    <div class="page-aside-inner">
      <div data-role="container">
        <div data-role="content">
          <section class="page-aside-section">
            <h5 class="page-aside-title">产品分类</h5>
            <div class="list-group">
              <a :class="{ 'list-group-item': true, 'list-group-item-action': true, 'active':  index === 0 }" v-for="(category, index) in categories" :key="index">
                <i class="icon wb-dashboard" aria-hidden="true"></i> {{ category }}
              </a>
            </div>
            <button class="btn btn-block btn-default" @click="$emit('show')" v-if="show === true">
              <i class="icon wb-plus"></i> 添加产品分类
            </button>
          </section>
        </div>
      </div>
    </div>
    <!---page-aside-inner-->
  </div>
</template>

<script>
export default {
  props: ['categories', 'show'],
};
</script>
