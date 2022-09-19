<template>
  <transition :name="transitionName">
    <div v-show="visible" :style="customStyle"  class="back-bar">
      <div @click="backToTop" class="publicStyle back-to-ceiling">
        <svg
        width="20px"
        height="20px"

        viewBox="0 0 16 16"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch -->
        <title>返回顶部</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="返回顶部" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="fanhuidingbu-2" fill="#1F90FF" fill-rule="nonzero">
            <path
              d="M8,0 C3.6,0 0,3.6 0,8 C0,12.4 3.6,16 8,16 C12.4,16 16,12.4 16,8 C16,3.6 12.4,0 8,0 Z M10.9,9.1 L9.8,9.1 C9.6,9.1 9.5,9.2 9.5,9.4 L9.5,11.1 C9.5,11.2 9.4,11.3 9.3,11.3 L6.7,11.3 C6.6,11.3 6.5,11.2 6.5,11.1 L6.5,9.3 C6.5,9.2 6.4,9 6.2,9 L5.1,9 C5,9.1 5,9 5,9 L7.8,6.3 C7.9,6.2 8,6.2 8.1,6.3 L11,9 C11,9 11,9.1 10.9,9.1 Z M11,5.7 L5,5.7 C4.7,5.7 4.5,5.5 4.5,5.2 C4.5,4.9 4.7,4.7 5,4.7 L11,4.7 C11.3,4.7 11.5,4.9 11.5,5.2 C11.5,5.5 11.3,5.7 11,5.7 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </svg>
      </div>
      <div class="publicStyle back-to-ceiling" @click="backToBottom" style="transform: rotate(180deg);-ms-transform: rotate(90deg);">
        <svg
        width="20px"
        height="20px"

        viewBox="0 0 16 16"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <!-- Generator: Sketch 51.3 (57544) - http://www.bohemiancoding.com/sketch -->
        <title>返回底部</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g id="返回底部" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="fanhuidingbu-2" fill="#1F90FF" fill-rule="nonzero">
            <path
              d="M8,0 C3.6,0 0,3.6 0,8 C0,12.4 3.6,16 8,16 C12.4,16 16,12.4 16,8 C16,3.6 12.4,0 8,0 Z M10.9,9.1 L9.8,9.1 C9.6,9.1 9.5,9.2 9.5,9.4 L9.5,11.1 C9.5,11.2 9.4,11.3 9.3,11.3 L6.7,11.3 C6.6,11.3 6.5,11.2 6.5,11.1 L6.5,9.3 C6.5,9.2 6.4,9 6.2,9 L5.1,9 C5,9.1 5,9 5,9 L7.8,6.3 C7.9,6.2 8,6.2 8.1,6.3 L11,9 C11,9 11,9.1 10.9,9.1 Z M11,5.7 L5,5.7 C4.7,5.7 4.5,5.5 4.5,5.2 C4.5,4.9 4.7,4.7 5,4.7 L11,4.7 C11.3,4.7 11.5,4.9 11.5,5.2 C11.5,5.5 11.3,5.7 11,5.7 Z"
              id="Shape"
            ></path>
          </g>
        </g>
      </svg>
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  name: 'BackToTop',
  props: {
    visibilityHeight: {
      type: Number,
      default: 500
    },
    backPosition: {
      type: Number,
      default: 0
    },
    customStyle: {
      type: Object,
      default: function() {
        return {
          right: '50px',
          bottom: '40px',
          width: '40px'
        }
      }
    },
    transitionName: {
      type: String,
      default: 'fade'
    }
  },
  data() {
    return {
      visible: false,
      interval: null,
      isMoving: false
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('scroll', this.handleScroll, true)
    })
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll, true)
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  methods: {
    handleScroll() {
      // console.log(document.getElementsByClassName('el-container')[1].scrollTop)
      this.visible =
        document.getElementsByClassName('el-container')[1].scrollTop >
        this.visibilityHeight
    },
    // 回到顶部
    backToTop() {
      if (this.isMoving) return
      const start = document.getElementsByClassName('el-container')[1]
        .scrollTop
      // console.log(document.getElementsByClassName('el-container')[1])
      let i = 0
      this.isMoving = true
      this.interval = setInterval(() => {
        const next = Math.floor(this.easeInOutQuad(10 * i, start, -start, 200))
        if (next <= this.backPosition) {
          document.getElementsByClassName(
            'el-container'
          )[1].scrollTop = this.backPosition
          clearInterval(this.interval)
          this.isMoving = false
        } else {
          document.getElementsByClassName('el-container')[1].scrollTop = next
        }
        i++
      }, 16.7)
    },
    // 回到底部
    backToBottom() {
      if (this.isMoving) return
      document.getElementsByClassName('el-container')[1].scrollTop = document.getElementsByClassName('el-container')[1].scrollHeight
      // console.log(end)
    },
    // 优化回到动画
    easeInOutQuad(t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t + b
      return (-c / 2) * (--t * (t - 2) - 1) + b
    }
  }
}
</script>

<style scoped>
.back-bar {
  position: fixed;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  z-index: 999;
}
.publicStyle{
  /* padding: 10px 0;
   */
   height: 40px;

   line-height: 49px;
  /* margin-bottom: 10px; */
}
.back-to-ceiling:hover {
  background: #d5dbe7;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.back-to-ceiling .Icon {
  fill: #9aaabf;
  background: none;
}
</style>
