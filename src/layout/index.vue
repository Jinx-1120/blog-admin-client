<!--
 * @Author: jhd
 * @Date: 2019-01-15 10:43:58
 * @Description: layout file
 -->

<template>
  <div :class="classObject" class="app-wrapper">
    <LeftMenu class="sidebar-container"></LeftMenu>
    <div class="main-container" >
      <NavBar></NavBar>
      <TagView></TagView>
      <div class="app-main" id="app-main">
        <transition name="fade-transform" mode="out-in">
          <keep-alive >
            <router-view ></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import NavBar from '../components/NavBar.vue'
import LeftMenu from '../components/leftMenu.vue'
import TagView from '../components/TagView.vue'

@Component({
  components: {
    NavBar,
    LeftMenu,
    TagView
  }
})
export default class Layout extends Vue {
  // private get sidebar (): any {
  //   return this.$store.state.app.sidebar
  // }
  private get classObject (): object {
    return {
      hideSidebar: !this.$store.state.app.sidebar.opend,
      openSidebar: this.$store.state.app.sidebar.opend,
      withoutAnimation: this.$store.state.app.sidebar.withoutAnimation
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar{
    position: fixed;
    top: 0;
  }
}
.app-main {
  overflow-y: auto;
  // min-height: calc(100vh - 86px);
}
</style>
 
