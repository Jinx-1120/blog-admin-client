<!--
 * @Author: jhd
 * @Date: 2019-01-14 15:03:06
 * @Description: login file
 -->
<template>
  <div class="login_page">
    <div id="particles-background" class="background-canvas"></div>
    <div class="content">
      <div class="title">登陆管理</div>
      <el-form :model="form" ref="form">
        <el-form-item prop="userName"
        :rules="[
          { required: true, message: '用户名', trigger: 'blur' },
          { min: 5, message: '用户名至少5位', trigger: 'blur' }
        ]">
          <el-input placeholder="账号" v-model="form.userName" :maxlength="30"></el-input>
        </el-form-item>
        <el-form-item prop="passWord"
        :rules="[
          { required: true, message: '密码', trigger: 'blur' },
          { min: 5, message: '密码至少5位', trigger: 'blur' }
        ]">
          <el-input placeholder="密码" v-model="form.passWord" :maxlength="30" type="password" @keyup.enter.native="submit('form')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="submit('form')" :disabled="logining">
            {{ logining ? 'Login...' : 'Submit'}}
          </el-button>
        </el-form-item> 
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'particles.js'

interface ILoginData {
  userName: string
  passWord: string
}

@Component
export default class Login extends Vue {
  // public $refs: {
  //   form: HTMLFormElement
  // }
  private logining: boolean = false
  private form: ILoginData = {
    userName: '',
    passWord: ''
  }

  private submit (): void {
    const form: any = this.$refs.form
    console.log(this.$store)
    form.validate (async (valid: boolean): Promise<boolean> => {
      if (valid) {
        const data: Ajax.AjaxResponse = await this.$store.dispatch('user/login', { ...this.form })
        if (data.code !== 200) {
          return false
        }
        this.$router.push('/home')
        return true
      } else {
        return false
      }
    })
  }

  private mounted () {
    this.buildBackground()
  }

  private buildBackground (): void {
    particlesJS ('particles-background', {
      'particles': {
        'number': {
          'value': 30,
          'density': {
            'enable': true,
            'value_area': 1000
          }
        },
        'color': {
          'value': '#bebebe'
        },
        'shape': {
          'type': 'circle',
          'stroke': {
            'width': 0,
            'color': '#ffffff'
          },
          'polygon': {
            'nb_sides': 5
          },
          'image': {
            'src': 'img/github.svg',
            'width': 100,
            'height': 100
          }
        },
        'opacity': {
          'value': 0.3
        },
        'size': {
          'value': 15,
          'random': true,
          'anim': {
            'enable': false,
            'speed': 40,
            'size_min': 0.1,
            'sync': false
          }
        },
        'line_linked': {
          'enable': true,
          'distance': 300,
          'color': '#c5c5c5',
          'opacity': 0.4,
          'width': 1
        },
        'move': {
          'enable': true,
          'speed': .5,
          'direction': 'none',
          'random': true,
          'straight': false,
          'out_mode': 'out',
          'bounce': false,
          'attract': {
            'enable': false,
            'rotateX': 600,
            'rotateY': 1200
          }
        }
      },
      'interactivity': {
        'detect_on': 'canvas',
        'events': {
          'onhover': {
            'enable': false,
            'mode': 'repulse'
          },
          'onclick': {
            'enable': false,
            'mode': 'push'
          },
          'resize': true
        },
        'modes': {
          'grab': {
            'distance': 400,
            'line_linked': {
              'opacity': 1
            }
          },
          'bubble': {
            'distance': 400,
            'size': 40,
            'duration': 2,
            'opacity': 0.8471528471528471,
            'speed': 3
          },
          'repulse': {
            'distance': 200,
            'duration': 0.4
          },
          'push': {
            'particles_nb': 4
          },
          'remove': {
            'particles_nb': 2
          }
        }
      },
      'retina_detect': true
    })
  }

}
</script>

<style lang="scss">
@import '../assets/scss/variable.scss';
.login_page {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: $mobile-bg;
  >.background-canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
  >.content {
    position: absolute;
    width: 300px;
    height: 500px;
    z-index: 999;
    >.title {
      font-size: $font-size-logo * 1.5;
      text-align: center;
    }
    >.el-form {
       margin-top: 16px;
      .el-input__inner {
        height: $xlg-pad;
      }
      .el-button {
        display: block;
        height: $xlg-pad;
        width: 100%;
      }
    }
  }
}
</style>

