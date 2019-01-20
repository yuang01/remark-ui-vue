<template>
    <div>
        <keep-alive :include="['menu1-1']">
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
export default {
  name: 'menu1',
};
</script>

