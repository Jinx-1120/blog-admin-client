<template>
  <div class="article-list" ref="content">
    <el-form :inline="true">
      <el-form-item>
        <el-button type="primary" @click="dialogAddTag = true">添加标签</el-button>
      </el-form-item>
    </el-form>
    <div class="table-wrap">
      <el-table
        :data="tagData"
        border
        :height="tableHeight"
        align="center"
        style="width: 100%">
        <el-table-column
          type="index"
          width="100">
        </el-table-column>
        <el-table-column
          prop="time"
          label="创建时间">
          <template slot-scope="scope">
            {{scope.row.time | format('yyyy-MM-dd hh.mm')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="tagName"
          label="标签"
          width="180">
        </el-table-column>
        <el-table-column
          prop="description"
          label="标签描述"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="btn"
          label="操作">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" circle @click="removeTag(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="pagination-wrap">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryOptions.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div> -->
    <el-dialog title="添加标签" :visible.sync="dialogAddTag">
      <el-form :model="addTagForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标签名" prop="tagName" 
          :rules="[{ required: true, message: '请输入标签名称', trigger: 'blur' }]">
          <el-input v-model="addTagForm.tagName"></el-input>
        </el-form-item>
        <el-form-item label="标签描述" prop="description"
          :rules="[{ min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }]">
          <el-input v-model="addTagForm.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="addTagForm.tagName === ''" type="primary" @click="submitForm()">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class Tag extends Vue {
  private addTagForm: object = {
    tagName: '',
    description: ''
  }
  private dialogAddTag: boolean = false
  private tableHeight: number = 700

  private submitForm (): void {
    this.$store.dispatch('addTag', this.addTagForm)
    this.getData()
  }
  private removeTag (item: any): void {
    this.$confirm(`是否确定删除${item.tagName}标签`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$store.dispatch('removeTag', item._id)
      this.getData()
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }
  private get tagData (): void {
    return this.$store.state.tag.tags
  }
  private getData (): void {
    this.$store.dispatch('getTags')
  }
  private created () {
    this.getData()
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

