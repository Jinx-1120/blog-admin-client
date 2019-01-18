<template>
  <div class="aside">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF">
      <template v-for="(item,index) in $router.options.routes">
        <el-submenu v-if="item.meta.leaf && item.meta.show" :index="index + ''">
          <template slot="title">
            <i class="iconfont" :class="item.meta.icon"></i>
            <span slot="title">{{item.name}}</span>
          </template>
          <el-menu-item-group v-for="(child,inx) in item.children" :key="inx">
            <router-link :to="child.path">
              <el-menu-item :index="index + '-' + inx" v-if="child.meta.show">{{child.name}}</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <router-link :to="item.path" v-else-if="!item.meta.leaf && item.meta.show">
          <el-menu-item :index="index + ''" >
              <i class="iconfont" :class="item.meta.icon"></i>
              <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class LeftMenu extends Vue {
  private defaultPath = ''
  private defaultOpen: string[] = []
  private isOpend: boolean = false

  private get isCollapse (): boolean {
    console.log(!this.$store.state.app.sidebar.opend)
    return !this.$store.state.app.sidebar.opend
  }
  private linkUrl (url: string): object {
    return {
      is: 'router-link',
      to: url
    }
  }
  private created (): void {
    // console.log(this.$router.options.routes)
  }
  // private collapse (): boolean {
  //   return !this.isOpend
  // }
  // private hasOneShowingChild (children: Array<any>): boolean {
  //   if (!children) {
  //     return true
  //   }
  //   const showingChildren = children.filter(item => {
  //     if (item.hidden) {
  //       return false
  //     } else {
  //       return true
  //     }
  //   })
  //   if (showingChildren.length === 1) {
  //     return true
  //   }
  //   return false
  // }

}
</script>
<style lang="scss">
</style>

