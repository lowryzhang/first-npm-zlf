<template>
    <div class="helloName">
        <input type="text" placeholder="请输入姓名" v-model="yourName"></input>
        <div v-if="name">hello<span class="name">{{name}}!</span></div>
    </div>
</template>
<script>
    export default {
        name:'helloName',
        data () {
            return {
                yourName: ''
            }
        },
        methods: {

        },
        created(){
        }
    }
</script>
<style>
</style>