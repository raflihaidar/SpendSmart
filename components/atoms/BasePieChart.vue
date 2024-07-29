<script lang="ts" setup>
import { defineProps, ref, toRefs, watch, onMounted } from "vue";

// Mendefinisikan tipe untuk props
const props = defineProps<{
  label: string[];
  data: number[];
}>();

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

// Mendefinisikan interface untuk ChartOptions
interface ChartOptions {
  labels: string[];
  plotOptions: {
    pie: {
      customScale: number;
    };
  };
  legend: {
    show: boolean;
    showForSingleSeries: boolean;
    showForNullSeries: boolean;
    showForZeroSeries: boolean;
    position: string;
    horizontalAlign: string;
    fontSize: string;
    fontFamily: string;
    fontWeight: number;
    itemMargin: {
      horizontal: number;
      vertical: number;
    };
  };
  responsive: Array<{
    breakpoint: number;
    options: {
      chart: {
        width: number;
      };
    };
  }>;
  tooltip: {
    y: {
      formatter: (val: number) => string;
    };
  };
}

// Menginisialisasi options dengan array kosong untuk labels
const options = ref<ChartOptions>({
  labels: [],
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
          width: 300,
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

// Mengatur labels pada saat komponen dimuat
onMounted(() => {
  options.value.labels = label.value; // Spread operator untuk memaksa reaktivitas
});

// Mengamati perubahan pada label
watch(
  label,
  (newVal: string[]) => {
    options.value.labels = newVal; // Spread operator untuk memaksa reaktivitas
    console.log("Labels diperbarui:", newVal);
  },
  { deep: true }
);
</script>
<template>
  <div class="flex justify-center items-center">
    <ClientOnly>
      <apexchart
        width="400"
        type="donut"
        :options="label.length <= 0 ? nullOptions : options"
        :series="data"
      ></apexchart>
    </ClientOnly>
  </div>
</template>
