<script lang="ts" setup>
const options = reactive({
  labels: ["Transport", "Food", "Shopping"],
  plotOptions: {
    pie: {
      customScale: 1,
    },
  },
  legend: {
    show: true,
    showForSingleSeries: false,
    showForNullSeries: true,
    showForZeroSeries: true,
    position: "bottom",
    horizontalAlign: "center",
    fontSize: "12px",
    fontFamily: "Poppins, Arial",
    fontWeight: 400,
    itemMargin: {
      horizontal: 20,
      vertical: 10,
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
  tooltip: {
    y: {
      formatter: function (val: number) {
        return `${val}`;
      },
    },
  },
});

const series = reactive([40, 32, 28]);
</script>

<template>
  <div class="flex justify-center">
    <ClientOnly>
      <apexchart
        width="380"
        type="donut"
        :options="options"
        :series="series"
      ></apexchart>
    </ClientOnly>
  </div>
</template>
