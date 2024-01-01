<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "Header",

    props: {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
    },
});
</script>

<template>
    <h1 data-aos="fade-left">{{ title }}</h1>
    <h4 data-aos="fade-right" class="fw-normal">
        {{ description }}
    </h4>
</template>

<style scoped lang="scss"></style>