<script>
export default {
    name: "CommunityNews",
    props: {
        communityNews: {
            type: Array,
            required: true,
        }
    }
};
</script>

<template>
    <div>
        <h2 data-aos="fade-left">Community's News</h2>
        <div class="row mt-5">
            <div
                v-for="news in communityNews"
                :key="news.id"
                class="col-lg-4 col-md-6 col-12"
            >
                <BlogsBlogCard :blog="news" data-aos="zoom-in" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
