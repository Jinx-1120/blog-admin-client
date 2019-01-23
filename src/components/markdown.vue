<!--
 * @Author: jhd
 * @Date: 2019-01-23 17:46:59
 * @Description: markdown file content
 -->
 <template>
   <div class="editor-container" >
     <h1>sssss</h1>
    <div v-if="type" id="editor">
        <mavon-editor :ishljs="true" ref=md @imgAdd="$imgAdd" :subfield="false" :value="value" @change="editChange"></mavon-editor>
    </div>
    <div v-else class="showview">
        <mavon-editor  :navigation="true"  defaultOpen="preview" codeStyle="paraiso-light" :toolbarsFlag="false" :subfield="false" ref=md :value="value" :style="markdownStyle"></mavon-editor>
        <!-- <vue-markdown :source="value" :anchor-attributes="anchorAttrs"></vue-markdown> -->
    </div>
  </div>
 </template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import * as qiniu from 'qiniu-js'

@Component({
  components: {
    mavonEditor
  }
})
export default class Markdown extends Vue {
  private type: boolean = true
  private markdownStyle: object = {
    'height': `200px`
  }
  @Prop()
  private value: string = ''

  @Watch ('value')
  private valueChange (val: any) {
    console.log(val)
  }

  private editChange (val: any, render: any) {
    this.$emit('getContent', val)
  }
  private $imgAdd (pos: any, $file: any) {
    const putExtra = {
      params: {},
      fname: $file.name,
      mimeType: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
    }
    const upOptions = {
      useCdnDomain: true
    }
    console.log(putExtra, upOptions)
    const observable = qiniu.upload($file, $file.name, this.$store.state.article.qntoken, putExtra, upOptions)
    const subscription = observable.subscribe({
      // error: err => {
      //   console.error('失败', err)
      // },
      // complete: res => {
      //   console.log(res)
      //   if(res.hash) {
      //     this.$refs.md.$img2Url(pos, 'https://static.jinhaidi.cn/' + res.key);
      //   }
      // }
    })
  }
}
</script>
