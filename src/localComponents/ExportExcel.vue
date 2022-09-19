<template>
  <el-button type="primary" @click="exportExcel" v-if="$showExportBtn">导出 <i class="el-icon-download"></i></el-button>
</template>
<script>
// import xlsxer from 'xlsx'
// import FileSaver from "file-saver";

export default {
  name: 'ExportExcel',
  data() {
    return {}
  },
  props: {
    exportId: {
      type: String,
      default: 'exportId'
    },
    excelName: {
      type: String,
      default: 'excel'
    },
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    exportExcel() {
      // if (this.tableData.length > 0) {
      //   let xlsxParam = { raw: true }; //转换成excel时，使用原始的格式
      //   let wb = xlsxer.utils.table_to_book(
      //     document
      //       .getElementById(this.exportId)
      //       .getElementsByClassName("el-table__body")[0],
      //     xlsxParam
      //   );
      //   let wbout = xlsxer.write(wb, {
      //     bookType: "xlsx",
      //     bookSST: true,
      //     type: "array"
      //   });
      //   try {
      //     FileSaver.saveAs(
      //       new Blob([wbout], {
      //         type: "application/octet-stream,charset=utf-8"
      //       }),
      //       this.excelName
      //     );
      //   } catch (e) {
      //     if (typeof console !== "undefined") console.log(e, wbout);
      //   }
      //   return wbout;
      // }else{
      //     this.$message({
      //         type:'warning',
      //         message:'导出数据为空'
      //     })
      // }
    }
  }
}
</script>
<style lang="less" scoped>
</style>


