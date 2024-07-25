<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps({
  label: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
});

const { label, data } = toRefs(props);

const nullOptions = ref({
  colors: ["#f0f0f0"],
  legend: {
    show: false,
  },
  states: {
    hover: {
      filter: {
        type: "none",
      },
    },
  },
});

const options = ref({
  labels: label.value,
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
</script>

<template>
  <div class="flex justify-center">
    <ClientOnly>
      <apexchart
        width="380"
        type="donut"
        :options="label.length <= 0 ? nullOptions : options"
        :series="data"
      ></apexchart>
    </ClientOnly>
  </div>
</template>
