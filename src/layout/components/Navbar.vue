<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <span>{{ $store.getters.username }}</span>
          <img v-if="staffPhoto" :src="$store.getters.staffPhoto" class="user-avatar">
          <span v-else class="user-text">{{ username?.charAt(0) }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <a @click.prevent="updatePassword">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="35%" @close="dialogCancel">
      <el-form ref="formRef" :model="form" :rules="rules">
        <el-form-item label="原密码" prop="oldPassword" :label-width="formLabelWidth">
          <el-input v-model="form.oldPassword" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword" :label-width="formLabelWidth">
          <el-input v-model="form.newPassword" />
        </el-form-item>
        <el-form-item label="重复密码" class="my-star" prop="rePassword" :label-width="formLabelWidth">
          <el-input v-model="form.rePassword" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button type="primary" @click="submit">确认修改</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { updatePassRequest } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    const validator = (rule, value, callback) => {
      if (value !== this.form.newPassword) {
        callback(new Error('两次输入的密码不一样,请重新输入'))
        return
      }
      if (!/^\S{3,15}$/.test(value)) {
        callback(new Error('新密码格式错误3-15位'))
        return
      }
      if (value !== this.form.newPassword) {
        callback(new Error('两次密码不一样，请重新输入'))
        return
      }
      callback()
    }
    return {
      dialogFormVisible: false,
      form: {
        oldPassword: '',
        newPassword: '',
        rePassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '长度在 6 到 5 个字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '长度在 6 到 5 个字符', trigger: 'blur' }
        ],
        rePassword: [
          { validator, trigger: 'blur' }
        ]

      },
      formLabelWidth: '90px'
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'username',
      'staffPhoto'

    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.$store.commit('user/delTokenMutation')
      this.$router.push('/login')
    },
    updatePassword() {
      this.dialogFormVisible = !this.dialogFormVisible
    },
    submit() {
      this.$refs.formRef.validate(async(value) => {
        if (value) {
          console.log(value)
          await updatePassRequest({ oldPassword: this.form.oldPassword, newPassword: this.form.newPassword })
        }
      })
    },
    dialogCancel() {
      this.$refs.formRef.resetFields()
      this.dialogFormVisible = false
    }
  }
}
</script>

<style>
/* 这个style就是专门来针对 element-ui的样式 二次修改的 */
/* 因为放在下面带有scoped结构里面，有样式穿透的问题， 有些情况通过 ::v-deep 也不能生效 */
.my-star .el-form-item__label::before {
  content: '*';
  color: #F56C6C;
  margin-right: 4px;
}
</style>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        display: flex;
        align-items: center;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          margin: 0 5px 0 10px;
        }
        .user-text{
          width: 30px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          background-color: #04c9be;
          border-radius: 50%;
          margin-left: 8px;
          color: #fff;
          font-size: 16px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
