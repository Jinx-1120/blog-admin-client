<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
    <slot/>
  </el-scrollbar>
</template>

<script lang="ts">
const tagAndTagSpacing = 4 // tagAndTagSpacing
import { Component, Vue } from 'vue-property-decorator'
export default class ScrollPane extends Vue {
  private left: number = 0
  private handleScroll (e: any) {
    // todo
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  text-align: left;
  width: 100%;
  /deep/ {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>