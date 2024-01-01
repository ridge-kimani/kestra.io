<script>
export default {
    name: "Posts",

    props: {
        blogs: {
            type: Array,
        },
    },
};
</script>

<template>
    <div class="row mt-5">
        <div v-for="blog in blogs" :key="blog._path" class="col-lg-6 col-md-6">
            <BlogsBlogCard :blog="blog" data-aos="zoom-in" />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
