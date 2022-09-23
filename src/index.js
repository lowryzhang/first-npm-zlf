import components from './components/' // 加载公共组件
import localComponents from './localComponents/' // 加载本地公共组件

// 公共组件首字母大写
Object.keys(components).forEach((key) => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase())
  Vue.component(`ep${name}`, components[key])
})

// 本地公共组件首字母大写
Object.keys(localComponents).forEach((key) => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase())
  Vue.component(`epl${name}`, localComponents[key])
})