<template>
    <el-row>
        <p class="ep-title">
            <slot></slot>
        </p>
    </el-row>
</template>

<script type="es6">

export default {
  props: {

  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    /**
             * 点击事件
             */
    onClick() {
      // if (!this.isClick) return
      // let obj = {
      //   path: this.$route.path + '/doQuery/' + this.name,
      //   form: this.form
      // }
      // this.$store.dispatch('SET_COMMONPOST', obj)
    },
    /**
             * 选择事件
             */
    onChange() {
      // if (!this.isChange) return
      // let obj = {
      //   path: this.$route.path + '/doCheck/' + this.name,
      //   form: this.form
      // }
      // this.$store.dispatch('SET_COMMONPOST', obj)
    },
    /**
             * 失去焦点
             */
    onBlur() {
      // if (!this.isBlur) return
      // let obj = {
      //   path: this.$route.path + '/blur/' + this.name,
      //   form: this.form
      // }
      // this.$store.dispatch('SET_COMMONPOST', obj)
    },
    /**
             * 获取焦点
             */
    onFocus() {
      // if (!this.isFocus) return
      // let obj = {
      //   path: this.$route.path + '/focus/' + this.name,
      //   form: this.form
      // }
      // this.$store.dispatch('SET_COMMONPOST', obj)
    }
  }
}
</script>

<style lang="less" scoped>
    .ep-title{
        color: #008af0;
        font-size: 16px;
        font-weight: 600;
        margin: 0;
        height: 48px;
        line-height: 48px;
    }

</style>
