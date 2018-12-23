<template>
  <base-layout>
    <div class="page-content" slot="content">
      <div class="row">
        <div class="col-md-12">
          <form>
            <div class="row">
              <div class="col-xxl-2  col-md-3 col-sm-6">
                <button type="button" class="btn btn-block btn-primary" :disabled="this.flag === 1 ? false : true" @click="showModalAdd = true;">添加用户</button>
              </div>
            </div>
          </form>
        </div>
        <transition name="fade">
          <div class="toast toast-just-text toast-info" v-if="showModalPro">
            <button type="button" class="toast-close-button" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
            <div class="toast-message">消息</div>
            <div class="toast-message" v-if="empty === 0">添加用户成功!</div>
            <div class="toast-message" v-if="empty === 1">修改用户信息成功!</div>
            <div class="toast-message" v-if="empty === 2">删除用户成功!</div>
          </div>
        </transition>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="panel" :class="{ 'is-loading': fetchLoading }">
            <div class="panel-body">
              <table class="table table-hover table-striped table-custom">
                <thead>
                  <tr>
                    <th>序号</th>
                    <th>用户名</th>
                    <th>姓名</th>
                    <th>用户状态</th>
                    <th>管理员</th>
                    <th>上次登录时间</th>
                    <th>创建时间</th>
                    <th>管理</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in users" :key="index">
                    <td>{{ index + 1 + (pagination.currentPage - 1) * 15 }} <input type="hidden" name="id" :value="item.id"></td>
                    <td>{{ item.username }}</td>
                    <td>{{ item.last_name }} {{ item.first_name }}</td>
                    <td>
                      <span v-if="item.is_active === true">可用</span>
                      <span v-if="item.is_active === false">停用</span>
                    </td>
                    <td>
                      <span v-if="item.is_superuser === true">是</span>
                      <span v-if="item.is_superuser === false">否</span>
                    </td>
                    <td>{{ item.last_login }}</td>
                    <td>{{ item.date_joined }}</td>
                    <td>
                      <button type="button" @click="toUpd(item.id, item.username, item.last_name, item.first_name)" class="btn btn-default btn-xs" :disabled="item.flag === 1 ? false : true">修改</button>
                      <button type="button" @click="toDel(item.id, item.username)" class="btn btn-danger btn-xs" :disabled="item.flag === 1 ? false : true">删除</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <turn-pages :pages="pagination.pages" v-on:url="url" :currentPage="pagination.currentPage"></turn-pages>
            </div>
            <div class="panel-loading" v-show="fetchLoading">
              <div class="loader loader-default"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="modal">
      <modal
        v-if="showModalAdd"
        @close="showModalAdd = false"
        :isLarge="true"
      >
        <h4 class="modal-title" slot="title">添加用户信息</h4>
        <div class="modal-body" slot="body">
         <form class="form-horizontal" method="post">
            <div class="form-group row">
              <label class="col-md-3 form-control-label">用户名: </label>
              <div class="col-md-9">
                <input type="text" v-validate="'required|alpha_dash'" :class="{'input': true, 'is-danger': errors.has('username') }" class="form-control" name="username" v-model="modalAdd.username" placeholder="用户名(由数字 字母  _  - 组合而成)" autocomplete="off"
                />
                <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 form-control-label">密码: </label>
              <div class="col-md-9">
                <input type="password" v-validate="'required|min:9'" :class="{'input': true, 'is-danger': errors.has('password') }" class="form-control" name="password" v-model="modalAdd.password" placeholder="密码(不少于9位)" autocomplete="off"
                />
                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 form-control-label">确认密码: </label>
              <div class="col-md-9">
                <input type="password" v-validate="'required|confirmed:password'" :class="{'input': true, 'is-danger': errors.has('rePassword') }" class="form-control" name="rePassword" v-model="modalAdd.rePassword" placeholder="再次输入密码" autocomplete="off"
                />
                <span v-show="errors.has('rePassword')" class="help is-danger">{{ errors.first('rePassword') }}</span>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 form-control-label">姓: </label>
              <div class="col-md-9">
                <input type="text" class="form-control" name="lastName" v-model="modalAdd.lastName" placeholder="姓氏" autocomplete="off"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 form-control-label">名: </label>
              <div class="col-md-9">
                <input type="text" class="form-control" name="firstName" v-model="modalAdd.firstName" placeholder="名字" autocomplete="off"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer" slot="footer">
          <button class="btn btn-default" @click="showModalAdd = false">关闭</button>
          <button class="btn btn-primary" type="submit" @click.prevent="save()">保存</button>
        </div>
      </modal>
    </div>
    <div slot="modal">
      <modal
        v-if="showModalEdit"
        @close="showModalEdit = false"
        :isLarge="true"
      >
        <h4 class="modal-title" slot="title">修改用户信息</h4>
        <div class="modal-body" slot="body">
         <form class="form-horizontal" method="post">
            <input type="hidden" name="id" v-model="modalUpd.id">
            <div class="form-group row">
              <label class="col-md-3 form-control-label">用户名: </label>
              <div class="col-md-9">
                <input type="text" class="form-control" name="username" v-model="modalUpd.username" placeholder="用户名" autocomplete="off"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 form-control-label">姓: </label>
              <div class="col-md-9">
                <input type="text" class="form-control" name="lastName" v-model="modalUpd.lastName" placeholder="姓氏" autocomplete="off"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 form-control-label">名: </label>
              <div class="col-md-9">
                <input type="text" class="form-control" name="firstName" v-model="modalUpd.firstName" placeholder="名字" autocomplete="off"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-md-3 form-control-label">新密码: </label>
              <div class="col-md-9">
                <input type="text" v-validate="'min:9'" :class="{'input': true, 'is-danger': errors.has('newPassword') }" class="form-control" name="newPassword" v-model="modalUpd.newPassword" placeholder="新密码(不少于9位,不输入则默认为'不修改此用户密码')" autocomplete="off"
                />
                <span v-show="errors.has('newPassword')" class="help is-danger">{{ errors.first('newPassword') }}</span>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer" slot="footer">
          <button class="btn btn-default" @click="showModalEdit = false">关闭</button>
          <button class="btn btn-primary" @click.prevent="userUpd(modalUpd.id)">修改</button>
        </div>
      </modal>
    </div>
    <div slot="modal">
      <modal
        v-if="showModalDel"
        @close="showModalDel = false"
        :isLarge="true"
      >
        <h4 class="modal-title" slot="title">确定删除此用户吗?</h4>
        <div class="modal-body" slot="body">
          <input type="hidden" name="id" v-model="modalDel.id">
          <span>用户名:  {{ modalDel.username }}</span>
          <div class="modal-footer" slot="footer">
            <button class="btn btn-default" @click="showModalDel = false">取消</button>
            <button class="btn btn-primary" @click.prevent="userDel(modalDel.id)">确定</button>
          </div>
        </div>
      </modal>
    </div>
  </base-layout>
</template>

<script>
import { getUsers, getUsersAdd, getUsersUpd, getUsersDel } from '@/api/ciq';

const Base = () => import('@/components/Layouts/Base');
const Select2 = () => import('@/components/Select2/Select2');
const Input = () => import('@/components/Input/Input');
const Modal = () => import('@/components/Modal/Modal');
const Pagination = () => import('@/components/Pagination/Pagination');

export default {
  components: {
    'base-layout': Base,
    'select-2': Select2,
    'float-input': Input,
    modal: Modal,
    'turn-pages': Pagination,
  },
  data() {
    return {
      users: [],
      userFlag: [],
      username: '',
      is_superuser: false,
      is_active: false,
      last_login: '',
      date_joined: '',
      showModalAdd: false,
      showModalEdit: false,
      showModalDel: false,
      fetchLoading: false,
      showModalPro: false,
      empty: 0,
      inputVal: {
        username: '',
        realname: '',
        department: '',
      },
      modalAdd: {
        username: '',
        password: '',
        rePassword: '',
        lastName: '',
        firstName: '',
      },
      modalUpd: {
        id: '',
        fId: '',
        username: '',
        newPassword: '',
        lastName: '',
        firstName: '',
      },
      modalDel: {
        id: '',
      },
      flag: 0,
      pagination: {
        page: 1,
        currentPage: 1, // 当前页
        pages: 0, // 总页数
      },
    };
  },

  methods: {

    async url(currentPage) {
      this.fetchLoading = true;
      const result = await getUsers({
        page: currentPage,
        length: 15,
      });
      this.users.splice(0, this.users.length);
      this.users = result.data.list;
      this.users.forEach((element) => {
        this.userFlag.push(element.flag);
      });
      if (this.userFlag.includes(0)) {
        this.flag = 0;
      } else {
        this.flag = 1;
      }
      this.fetchLoading = false;
      this.pagination.pages = Math.ceil(result.data.total / 15);
    },

    async save() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          getUsersAdd({
            username: this.modalAdd.username,
            password: this.modalAdd.password,
            rePassword: this.modalAdd.rePassword,
            lastName: this.modalAdd.lastName,
            firstName: this.modalAdd.firstName,
          })
          .then(() => {
            this.showModalAdd = false;
            this.url();
            this.empty = 0;
            this.pro();
          });
        }
      });
    },

    toUpd(id, username, lastName, firstName) {
      this.showModalEdit = true;
      this.modalUpd.id = id;
      this.modalUpd.username = username;
      this.modalUpd.lastName = lastName;
      this.modalUpd.firstName = firstName;
    },

    async userUpd(userId) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          getUsersUpd({
            newPassword: this.modalUpd.newPassword,
            username: this.modalUpd.username,
            lastName: this.modalUpd.lastName,
            firstName: this.modalUpd.firstName,
          }, userId)
          .then(() => {
            this.showModalEdit = false;
            this.url();
            this.empty = 1;
            this.pro();
          });
        }
      });
    },

    toDel(id, username) {
      this.showModalDel = true;
      this.modalDel.id = id;
      this.modalDel.username = username;
    },

    async userDel(userId) {
      await getUsersDel({
      }, userId)
      .then(() => {
        this.showModalDel = false;
        this.url();
        this.empty = 2;
        this.pro();
      });
    },

    pro() {
      this.showModalPro = true;
      let timer = null;
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.showModalPro = false;
      }, 5000);
    },
  },

  mounted() {
    this.url(1);
  },

  created() {
    const dictionary = {
      zh: {
        attributes: {
          username: '用户名',
          password: '密码',
          rePassword: '确认密码',
          newPassword: '新密码',
        },
      },
    };
    this.$validator.localize(dictionary);
    const dict = {
      custom: {
        username: {
          required: () => '您的用户名为空',
        },
        password: {
          required: () => '您的密码为空',
        },
        rePassword: {
          required: () => '确认密码为空',
        },
      },
    };
    this.$validator.localize('zh', dict);
  },
};
</script>

<style scoped>
  .is-danger {
    color: red;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .toast-info {
    position: fixed;
    right: 20px;
    top:110px;
    background-color: #28d17c;
    z-index:9999;
  }
  .toast {
    padding: 15px 20px;
    border-radius: 5px;
  }
  button.toast-close-button {
    padding: 0;
    cursor: pointer;
    background: transparent;
    border: 0;
    -webkit-appearance: none;
  }
  .toast-close-button {
    position: relative;
    top: -0.3em;
    right: -0.3em;
    float: right;
    margin-bottom: -.5em;
    font-size: 20px;
    font-weight: 300;
    color: #fff;
    -webkit-text-shadow: 0 1px 0 white;
    text-shadow: 0 1px 0 white;
    opacity: .8;
  }
  .toast-message {
    color: white;
  }
  .btn-xs, .btn-group-xs > .btn {
    padding: .072rem .358rem;
    font-size: .858rem;
    line-height: 1.5;
    border-radius: .143rem;
  }
</style>
