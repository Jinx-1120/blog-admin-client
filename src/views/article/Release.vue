<template>
  <div class="release" :style="{height: Height}">
    <el-form :model="articleData" ref="articleData" label-width="100px" class="articleData">
      <el-form-item label="文章名称" prop="title"
        :rules="[ { required: true, message: '请输入文章标题', trigger: 'blur' } ]" >
        <el-input v-model="articleData.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description"
        :rules="[ { required: true, message: '请输入文章描述', trigger: 'blur' } ]" >
        <el-input v-model="articleData.description" clearable></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content"
        :rules="[ { required: true, message: '请输入文章内容' } ]">
        <div class="editor-container" style="margin: 0 2px">
          <!-- <Markdown id="contentEditor" @getContent="getContent" ref="contentEditor" :value="content" :zIndex="20"></Markdown> -->
          <markdown-editor 
            v-model="content" 
            ref="markdownEditor"
            :configs="configs"
            :highlight="true"
            preview-class="markdown-body"></markdown-editor>
        </div>
      </el-form-item>
      <!-- <el-form-item label="所属标签" prop="tags">
        <el-select v-model="onTag" placeholder="请选择文章标签" @change="choiceTag">
          <el-option v-for="item in tagData" :key="item._id" :label="item.tagName" :value="item.tagName"></el-option>
        </el-select>
        <div>
          <el-tag
            v-for="tag in choiceTags"
            :key="tag.name"
            closable
            @close="removeTag(tag)">
            {{tag}}
          </el-tag>
        </div>
      </el-form-item> -->
      <el-form-item label="文章封面">
        <el-upload
          class="avatar-uploader"
          action="https://up.qbox.me/"
          :data="qn"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          :on-error="handleError">
          <img v-if="articleData.coverImg" :src="articleData.coverImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <!-- <el-form-item label="状态" prop="status" style="margin-top:30px">
        <el-radio-group v-model="articleData.status">
          <el-radio :label="0">发布</el-radio>
          <el-radio :label="1">草稿</el-radio>
        </el-radio-group>
      </el-form-item> -->
    </el-form>
    <!-- <el-button :disabled="articleData.title === ''" @click="addArticle" style="margin-top:80px;" type="primary" icon="el-icon-document">确定</el-button> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Markdown from '../../components/markdown.vue'
import { error } from '../../utils/notification'

interface IArt {
  title: string,
  description: string,
  tags: object[],
  status: number,
  content: string,
  coverImg: string
}
@Component({
  components: {
    Markdown
  }
})
export default class Release extends Vue {
  private articleData: IArt = {
    title: '',
    description: '',
    tags: [],
    status: 0,
    content: '',
    coverImg: ''
  }
  private Height: number = 600
  private configs: any = {
    status: false,
    indentWithTabs: false,
    spellChecker: false
  }
  private qn = {
    token: '',
    key: ''
  }
  private onTag: string = ''
  private choiceTags: object[] = []
  private content: string = ''

  private get tagData (): void {
    return this.$store.state.tag.tags
  }
  private removeTag (tag: any) {
    this.choiceTags.splice(this.choiceTags.indexOf(tag), 1)
  }
  private choiceTag (val: any) {
    if (this.choiceTags.indexOf(val) < 0) {
      this.choiceTags.push(val)
    }
    this.articleData.tags = this.choiceTags
  }
  private handleSuccess (): void {
    this.articleData.coverImg = 'https://static.jinhaidi.cn/' + this.qn.key
  }
  // 出错
  private handleError (res: Ajax.AjaxResponse): void {
    error(res.message)
  }
  // 上传之前检测
  private beforeUpload (file: File): boolean {
    this.qn.key = file.name
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
    const isLt10M = file.size / 1024 / 1024 < 10
    if (!isJPG) {
      error('上传头像图片只能是 JPG/PNG 格式!')
    }
    if (!isLt10M) {
      error('上传头像图片大小不能超过 10MB!')
    }
    return isJPG && isLt10M
  }

  private getContent (val: any) {
    this.articleData.content = val
  }
  private addArticle (): void {
    console.log(11)
  }
  private async created () {
    await this.$store.dispatch('getQnToken')
    this.qn.token = this.$store.state.article.qntoken
  }
  private mounted (): void {
    const that = this
    this.$nextTick( () => {
      that.Height = document.documentElement.clientHeight - 400
    })
    window.onresize = () => {
      that.Height = document.documentElement.clientHeight - 400
    }
  }
}
</script>
<style lang="scss" scoped>
.release {
  overflow-y: auto;
  .articleData {
    padding: 20px;
  }
}
.el-form-item{
  margin-bottom: 25px;
}
.el-form-item__content{
  text-align: left;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #ccc;
  border-radius: 5px;
  cursor: pointer;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  width: 178px;
  height: 178px;
  opacity: 0;
  cursor: pointer;
}
</style>

