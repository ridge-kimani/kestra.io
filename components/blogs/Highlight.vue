<script>
export default {
    name: "BlogsHighlight",

    props: {
        categories: {
            type: Array,
        },
        blogs: {
            type: Array
        },
        filter: {
            type: String
        }
    },

    methods: {
        getHighlightBlog(filter) {
            const blogs = this.blogs.filter(
                (e) => e.category === filter || filter === "All news"
            );
            return blogs[blogs.length - 1];
        },
    },
};
</script>

<template>
    <div class="tab-content" id="myTabContent">
        <div
            v-for="cat in categories"
            :key="cat.name"
            class="tab-pane fade"
            :class="{ 'show active': filter === cat.name }"
            :id="cat.name"
            role="tabpanel"
            :aria-labelledby="`${cat.name}-tab`"
        >
            <BlogsHighlightBlogCard
                :blog="getHighlightBlog(cat.name)"
                class="mt-5"
            />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>