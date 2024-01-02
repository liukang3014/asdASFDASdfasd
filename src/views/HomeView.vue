<template>
  <div class="home">
    <PDFPreview />
  </div>
</template>

<script>
import PDFPreview from '@/components/PDFPreview.vue'

export default {
  name: 'HomeView',
  components: {
    PDFPreview
  }
}
</script>
