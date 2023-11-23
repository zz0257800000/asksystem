<script>
import Chart from 'chart.js';

export default {
  props: {
    questionnaire: Object,
    responses: Array,
  },
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const ctx = this.$refs.responseChart.getContext('2d');
      const responseLabels = this.responses.map(response => response.label);
      const responseData = this.responses.map(response => response.data);

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: responseLabels,
          datasets: [{
            label: '作答統計',
            data: responseData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
};
</script>
<template>
<div>
    <h2>問卷作答統計 - {{ questionnaire.questionName }}</h2>
    <canvas ref="responseChart"></canvas>
  </div>
</template>
<style lang="scss" scoped>

</style>