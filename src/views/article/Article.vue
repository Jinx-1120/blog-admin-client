<template>
  <div class="article-list" ref="content">
    <el-form :inline="true">
      <el-form-item label="关键字">
        <el-input v-model="formInline.keyword" placeholder="keyWord"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchArts">查询</el-button>
      </el-form-item>
      <el-form-item>
        <router-link to="/article/release">
          <el-button type="primary">添加新文章</el-button>
        </router-link>
      </el-form-item>
    </el-form>
    <div class="table-wrap">
      <el-table
        :data="list"
        border=""
        :height="tableHeight"
        style="width: 100%;height: 100%">
        <el-table-column
          type="index"
          width="100">
        </el-table-column>
        <el-table-column
          prop="title"
          label="封面"
          align="center">
          <template slot-scope="scope">
            <img width="70" height="45" v-if="scope.row.coverImg" :src="scope.row.coverImg" alt="">
            <span v-else> - </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="文章标题"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="tags"
          label="标签"
          align="center">
          <template slot-scope="scope">
            <el-tag style="margin: 0 2px" v-for="(item,index) in scope.row.tags" :key="index">{{item}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="发布时间"
          align="center"
          width="260">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | format('yyyy-MM-dd hh.mm')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          align="center"
          width="260">
          <template slot-scope="scope">
            <span v-if="scope.row.updateTime">{{scope.row.updateTime | format('yyyy-MM-dd hh.mm') }}</span>
            <span v-else>{{ '--' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.status === 0 ? '发布' : '草稿'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="btn"
          label="操作"
          align="center"
          width="200">
          <template slot-scope="scope">
            <!-- <router-link :to="{name:'showArticle', params: {id : scope.row._id } }"> -->
              <el-button type="success" icon="el-icon-search" circle></el-button>
            <!-- </router-link> -->
            <!-- <router-link :to="{name:'editArticle', params: {id : scope.row._id } }"> -->
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <!-- </router-link> -->
            <el-button type="danger" icon="el-icon-delete" circle @click="removeTag(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-wrap">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryOptions.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

interface IForm {
  keyword: string
}
interface IQueryOptions {
  page_num: number,
  page_size: number,
  tag: string
}
@Component({
  components: {
    // HelloWorld
  }
})
export default class Article extends Vue {
  private formInline: IForm = {
    keyword: ''
  }
  private tableHeight: number = 700
  private queryOptions: IQueryOptions = {
    page_num: 1,
    page_size: 20,
    tag: ''
  }
  private handleSizeChange (val: any) {
    console.log(`每页 ${val} 条`)
    this.queryOptions.page_size = val
    this.getData()
  }
  private handleCurrentChange (val: any) {
    console.log(`当前页: ${val}`)
  }
  private get total (): number {
    return this.$store.state.article.totalNum
  }
  private get currentPage (): number {
    return this.$store.state.article.page
  }
  private get list (): any[] {
    return this.$store.state.article.arts
  }
  private async searchArts (): Promise<void> {
    if (this.formInline.keyword) {
      await this.$store.dispatch('searchArts', this.formInline)
    } else {
      this.getData()
    }
  }
  private async getData (): Promise<void> {
    await this.$store.dispatch('getArts', this.queryOptions)
  }
  private async getTags (): Promise<void> {
    await this.$store.dispatch('getTags')
  }
  private created (): void {
    Promise.all([
      this.getData(),
      this.getTags()
    ])
  }
  private mounted (): void {
    const that = this
    this.$nextTick( () => {
      that.tableHeight = document.documentElement.clientHeight - 200
    })
    window.onresize = () => {
      that.tableHeight = document.documentElement.clientHeight - 200
    }
  }
}
</script>
<style lang="scss">
.article-list {
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px 20px;
  .el-form--inline {
    text-align: left;
    margin-left: 20px;
  }
}
</style>

