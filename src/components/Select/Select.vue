<template>
  <div>
    <div class="form-group form-material floating" data-plugin="formMaterial" v-if="type === 'floating'">
      <select class="form-control"  @change="change($event)">
        <option> </option>
        <option v-for="item in myOptions" :value="typeof item === 'object'? item.id : item">
          {{typeof item === 'object'? item.val : item}}
        </option>
      </select>
      <label class="floating-label">{{placeholder}}</label>
    </div>
    <select class="form-control" @change="change($event)" v-if="type === 'Basic'">
      <option value="" selected class="bg-blue-grey-200">{{placeholder}}</option>
      <option v-for="item in myOptions" :value="typeof item === 'object'? item.id : item">
        {{typeof item === 'object'? item.val : item}}
      </option>
    </select>
  </div>
</template>

<script>
  export default {
    /* eslint-disable */
      // 父组件中，myOptions的格式为[{id: 'one', val: '一'}, {id: 'two', val: '二'}]
      // 如果option中value值和text(文本值)一致,例如<option value-"one">one</option>，就可以直接传一个简单的数组进来，如['one', 'two']。
      // 父组件引入方式：
        /* const Select = () => import('@/components/Select/Select');
           components: {
              Select,
            },
            页面：<Select :placeholder="`测试1`" :myOptions="[{id: 'one', val: '一'}, {id: 'two', val: '二'}]" v-model="myval"></Select>
         */
    /* eslint-enable */
    props: {
      placeholder: {
        default: '',
      },
      myOptions: {
        default: [],
      },
      type: {
        default: 'Basic',
      },
    },

    methods: {
      change(e) {
        const target = e.currentTarget;
        this.$emit('input', target.value);
      },
    },
  };
</script>