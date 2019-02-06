<template>
  <div class="release" :style="{height: Height+ 'px'}">
    <el-form :model="articleData" ref="articleData" label-width="100px" class="articleData">
      <el-form-item label="文章名称" prop="title"
        :rules="[ { required: true, message: '请输入文章标题', trigger: 'blur' } ]" >
        <el-input v-model="articleData.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description"
        :rules="[ { required: true, message: '请输入文章描述', trigger: 'blur' } ]" >
        <el-input v-model="articleData.description" clearable></el-input>
      </el-form-item>
      <el-form-item label="所属标签" prop="tags">
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
      </el-form-item>
      <el-form-item label="内容" prop="content"
        :rules="[ { required: true, message: '请输入文章内容' } ]">
        <div class="editor-container" style="margin: 0 2px">
          <!-- <v-markdown id="contentEditor" @getContent="getContent" ref="contentEditor" :value="content" :zIndex="20"></v-markdown> -->
          <!-- <mavon-editor v-model="content"></mavon-editor> -->
          <mavon-editor :ishljs="true" ref='markdown' @imgAdd="$imgAdd" :subfield="false" v-model="articleData.content" @change="editChange"></mavon-editor>

          <!-- <markdown-editor 
            v-model="content" 
            ref="markdownEditor"
            :configs="configs"
            :highlight="true"
            preview-class="markdown-body"></markdown-editor> -->
        </div>
      </el-form-item>
      <el-form-item label="文章封面">
        <el-upload
          class="avatar-uploader"
          :action="action"
          :data="qn"
          :show-file-list="false"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          :on-error="handleError">
          <img v-if="articleData.coverImg" :src="articleData.coverImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="状态" prop="status" style="margin-top:30px">
        <el-radio-group v-model="articleData.status">
          <el-radio :label="0">发布</el-radio>
          <el-radio :label="1">草稿</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-button :disabled="articleData.title === ''" @click="addArticle" style="margin-top:80px;" type="primary" icon="el-icon-document">确定</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import { error, success } from '../../utils/notification'
import config from '../../config'

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
  private action: string = 'https://up.qbox.me/'
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
  // 缩略图上传成功
  private handleSuccess (): void {
    this.articleData.coverImg = `${config.staticUrl}${this.qn.key}`
  }
  // 出错
  private handleError (res: Ajax.AjaxResponse): void {
    this.$notify.error(res.message)
  }
  /**
   * @description: 上传文件类型大小检查
   * @param {file} 上传文件
   * @return: boolean
   */
  private beforeUpload (file: File): boolean {
    this.qn.key = file.name
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
    const isLt10M = file.size / 1024 / 1024 < 10
    if (!isJPG) {
      this.$notify.error('上传头像图片只能是 JPG/PNG 格式!')
    }
    if (!isLt10M) {
      this.$notify.error('上传头像图片大小不能超过 10MB!')
    }
    return isJPG && isLt10M
  }

  private editChange (val: any, render: any) {
    this.articleData.content = val
  }
  /**
   * @description: markdown 图片上传
   * @param {pos}上传地址
   * @param {$file}上传文件
   * @return: null
   */
  private $imgAdd (pos: any, $file: any) {
    const flag: boolean = this.beforeUpload($file)
    if (flag) {
      const xhr: XMLHttpRequest = new XMLHttpRequest()
      const formData = new FormData()
      formData.append('token', this.qn.token)
      formData.append('key', $file.name)
      formData.append('file', $file, $file.name)
      const md: any = this.$refs.markdown
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          this.$notify.success('上传图片成功！')
          md.$img2Url(pos, `${config.staticUrl}${JSON.parse(xhr.responseText).key}`)
        } else {
          this.$notify.error(xhr.responseText)
        }
      }
      xhr.open('post', this.action, true)
      xhr.send(formData)
    }
  }
  /**
   * @description: 获取mardown 内容
   * @param {val} 内容
   */
  private getContent (val: any) {
    this.articleData.content = val
  }
  private async addArticle () {
    const res = await this.$store.dispatch('addArt', this.articleData)
    if (res.code === 200) this.$notify.success(res.message)
    else this.$notify.error(res.message)
  }
  private async created () {
    await this.$store.dispatch('getTags')
    await this.$store.dispatch('getQnToken')
    this.qn.token = this.$store.state.article.qntoken
  }
  private mounted (): void {
    console.log(this.$route)
    const that = this
    this.$nextTick( () => {
      that.Height = document.documentElement.clientHeight - 84
    })
    window.onresize = () => {
      that.Height = document.documentElement.clientHeight - 84
    }
  }
}
</script>
<style lang="scss" scoped>
.release {
  overflow-y: scroll;
  text-align: left;
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

