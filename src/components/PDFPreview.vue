<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <button @click="addStamp">添加印章</button>
    <button @click="saveStampedPDF">保存盖章后的PDF</button>
    <div ref="pdfContainer">
      <canvas ref="pdfCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import * as pdfjs from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;


export default {
  data() {
    return {
      pdfDocument: null,
      numPages: null,
      currentPage: 1,
    };
  },

  methods: {

    async renderPDF(file) {
      try {
        const data = await this.readFileAsync(file);
        const loadingTask = pdfjs.getDocument({
          data: data,
        });
        loadingTask.promise.then((pdfDocument) => {
          this.pdfDocument = pdfDocument;
          this.numPages = pdfDocument.numPages;

          // 渲染第一页
          this.renderPage(this.currentPage);
        });
      } catch (error) {
        console.error('渲染PDF时出错:', error);
      }
    },

    async renderPage(pageNumber) {
      const page = await this.pdfDocument.getPage(pageNumber);
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      // 获取Canvas元素
      const canvas = this.$refs.pdfCanvas;
      const context = canvas.getContext('2d');

      // 设置Canvas尺寸
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // 渲染PDF页面到Canvas
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await page.render(renderContext);
    },

    // 在handleFileChange中调用renderPDF方法后，添加以下代码以显示第一页
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.renderPDF(file);
      }
    },

    async addStamp() {
      // 实现盖章逻辑
    },
    async saveStampedPDF() {
      // 实现保存逻辑
    },
    // 用于异步读取文件的辅助函数
    readFileAsync(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(new Uint8Array(e.target.result));
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
      });
    },
  },
};
</script>

<style scoped></style>
