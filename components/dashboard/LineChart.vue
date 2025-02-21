<script setup lang="ts">
import type { SeriesItem } from "~/types/chart.type";

const props = defineProps<{
  data: SeriesItem[];
}>();

const { data } = toRefs(props);
const series = ref<SeriesItem[]>([]);

const options = ref({
  colors: ["#48BB78", "#FF0000"],
  chart: {
    height: 350,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    categories: [] as string[],
  },
});

const updateChart = () => {
  const months = getMonths();
  options.value.xaxis.categories = months;
  series.value = data.value;
};

const getMonths = (): string[] => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNames;
};

watch(() => data, updateChart, { deep: true });
onMounted(updateChart);
</script>

<template>
  <ClientOnly>
    <apexchart type="area" height="350" :options="options" :series="series" />
  </ClientOnly>
</template>
