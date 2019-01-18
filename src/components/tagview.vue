<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        :key="tag.path"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)">
        {{ tag.name }}
        <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
      <el-dropdown class="contextmenu">
        <span class="el-dropdown-link">
          更多操作<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item >
            <span @click="closeSelectedTag(selectedTag)">关闭</span>
          </el-dropdown-item>
          <el-dropdown-item >
            <span @click="closeOthersTags">关闭其他</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="closeAllTags">关闭所有</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </scroll-pane>
  </div>
</template>

<script lang="ts">
import ScrollPane from '@/components/ScrollPane.vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'


@Component({
  components: {
    ScrollPane
  }
})
export default class TagView extends Vue {
  private visible: boolean = false
  private top: number = 0
  private left: number = 0
  private selectedTag: object = {}

  private get visitedViews () {
    return this.$store.state.tagview.visitedViews
  }

  @Watch('$route')
  private routeChange () {
    this.addViewTags()
    this.moveToCurrentTag()
  }

  private mounted () {
    this.addViewTags()
  }

  private isActive (route: Route) {
    route.path === this.$route.path ? this.selectedTag = route : this.selectedTag = {}
    return route.path === this.$route.path
  }
  private addViewTags () {
    const { name } = this.$route
    if (name) {
      this.$store.dispatch('addView', this.$route)
    }
    return false
  }
  private moveToCurrentTag () {
    const tags: any = this.$refs.tag
    this.$nextTick (() => {
      for (const tag of tags) {
        if (tag.to.path === this.$route.path) {
          if (tag.to.fullPath !== this.$route.fullPath) {
            this.$store.dispatch('updateVisitedView', this.$route)
          }
          break
        }
      }
    })
  }
  private closeSelectedTag (view: any) {
    this.$store.dispatch('delView', view).then(({ visitedViews }) => {
      if (this.isActive(view)) {
        const latestView = visitedViews.slice(-1)[0]
        if (latestView) {
          this.$router.push(latestView)
        } else {
          this.$router.push('/')
        }
      }
    })
  }
  private closeOthersTags () {
    this.$router.push(this.selectedTag)
    this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
      this.moveToCurrentTag()
    })
  }
  private closeAllTags () {
    this.$store.dispatch('delAllViews')
    this.$router.push('/')
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    background: #fff;
    z-index: 100;
    list-style-type: none;
    padding: 4px;
    border-radius: 0px;
    border: 1px #ccc solid;
    font-size: 12px;
    cursor: pointer;
    font-weight: 400;
    color: #333;
  }
}
</style>
