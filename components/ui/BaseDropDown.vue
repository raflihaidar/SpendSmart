<script setup lang="ts">
interface data {
    id: number;
    name: string;
}
const props = withDefaults(
    defineProps<{
        datas: Array<data>;
        width?: string;
        border?: string;
        borderColor?: string;
        modelValue: number | null;
        enableEdit?: boolean;
    }>(),
    {
        width: "w-full",
        border: "border-none",
        borderColor: "border-none",
        enableEdit: false,
    },
);

const emit = defineEmits(["update:modelValue", "edit", "delete"]);

const { datas, modelValue } = toRefs(props);
const currentValue = ref("No items found, please add one");
const isOpen = ref(false);
const editingItemId = ref<number | null>(null);

const handleChange = (itemName: string, itemId: number) => {
    currentValue.value = itemName;
    emit("update:modelValue", itemId);
    isOpen.value = false;
};

const handleEdit = (itemId: number, itemName: string) => {
    if (editingItemId.value === itemId) {
        emit("edit", itemId, itemName);
        editingItemId.value = null;
    } else {
        editingItemId.value = itemId;
    }
};

const handleDelete = (itemId: number) => {
    emit("delete", itemId);
};

const openOption = () => {
    isOpen.value = !isOpen.value;
};

// Watch for changes in datas and update currentValue and modelValue accordingly
watch(
    () => datas.value,
    (newDatas: Array<data>) => {
        if (newDatas.length > 0) {
            const selectedValue = newDatas.find(
                (data: data) => data.id === modelValue.value,
            );
            if (selectedValue) {
                currentValue.value = selectedValue.name;
            } else {
                emit("update:modelValue", newDatas[0].id);
                currentValue.value = newDatas[0].name;
            }
        } else {
            currentValue.value = "Add a category to proceed";
        }
    },
    {
        deep: true,
    },
);

// Watch for changes in modelValue and update currentValue accordingly
watch(
    () => modelValue.value,
    (newValue: number | null) => {
        const value = datas.value.find((data: data) => data.id === newValue);
        if (value) {
            currentValue.value = value.name;
        } else {
            currentValue.value = "";
        }
    },
    {
        immediate: true,
    },
);
</script>

<template>
    <div
        :class="[
            `${props.border} ${props.borderColor} ${
                props.width ?? 'w-full'
            } rounded-lg`,
            'relative',
        ]"
    >
        <button
            class="cursor-pointer w-full text-left flex justify-between items-center"
            @click="openOption"
        >
            {{ currentValue }}
            <Icon name="ic:round-keyboard-arrow-down" size="1.5rem" />
        </button>
        <ul
            v-if="isOpen"
            class="absolute top-10 left-0 bg-white z-20 w-full origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
            <li
                v-for="(item, index) in datas"
                :key="index"
                :value="item.id"
                class="w-full px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between"
            >
                <p
                    v-if="editingItemId !== item.id"
                    class="w-full block"
                    @click="handleChange(item.name, item.id)"
                >
                    {{ item.name }}
                </p>

                <span v-else class="flex gap-x-3 items-center w-[90%]">
                    <input
                        v-model="item.name"
                        class="w-full bg-inherit outline-none border border-color3 px-2 py-1 rounded-md"
                    />
                    <Icon
                        name="ic:baseline-delete"
                        size="1.5rem"
                        class="bg-red-500 cursor-pointer"
                        @click="handleDelete(item.id)"
                    />
                </span>
                <Icon
                    v-if="props.enableEdit"
                    name="ic:round-app-registration"
                    size="1.5rem"
                    class="bg-gray-400 hover:bg-gray-500 z-20"
                    @click="handleEdit(item.id, item.name)"
                />
            </li>
            <slot name="tools" />
        </ul>
        <!-- <ul v-else>
            <li>Add a category to proceed</li>
        </ul> -->
    </div>
</template>
