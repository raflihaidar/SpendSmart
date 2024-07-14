<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div class="w-full h-full p-3">
    <TheFinancialOverview />
    <div class="mt-10 flex justify-between jus gap-x-5">
      <TheCard width="w-[40%]" title="Budgeting">
        <template #card-content>
          <p class="text-green-custom text-sm font-bold mt-2">June 2024</p>
          <BasePieChart />
        </template>
      </TheCard>
      <TheCard width="w-[55%]" title="Spending Report">
        <template #card-content>
          <section class="flex justify-between items-center">
            <ul
              class="text-green-custom text-xs font-bold mt-2 flex justify-start gap-x-5"
            >
              <li class="opacity-100 cursor-pointer">12 Months</li>
              <li class="opacity-50 cursor-pointer">3 Months</li>
              <li class="opacity-50 cursor-pointer">30 Days</li>
              <li class="opacity-50 cursor-pointer">7 Days</li>
              <li class="opacity-50 cursor-pointer">24 Hours</li>
            </ul>
            <BaseButton
              bgColor="bg-color1"
              textColor="text-white"
              title="View Report"
              width="max-w-28"
            />
          </section>
          <BaseLineChart />
        </template>
      </TheCard>
    </div>
    <div class="mt-10 flex justify-between">
      <TheCard width="w-[60%]" title="Last Transaction">
        <template #card-content>
          <BaseTable>
            <template #tableHeader>
              <th class="text-color3">Today</th>
            </template>
          </BaseTable>
        </template>
      </TheCard>
      <TheCard width="w-[35%]" title="">
        <template #card-content>
          <div
            class="border-dotted border-4 rounded-lg border-black w-[90%] h-full mx-auto flex items-center justify-center cursor-pointer"
          >
            <Icon name="ic:outline-add-circle" size="3rem" />
          </div>
        </template>
      </TheCard>
    </div>
  </div>
</template>
