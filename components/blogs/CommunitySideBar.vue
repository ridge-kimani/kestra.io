<script>

export default {
    name: 'CommunitySideBar',

    props: {
        communityNews: {
            type: Array
        }
    }
}
</script>

<template>
    <div class="right-side-bar rounded-3 col-12 col-md-4 col-lg-3">
        <h5 class="heading mb-4">Last Community’s News</h5>
        <div v-for="news in communityNews" :key="news.id">
            <BlogsBlogCard :blog="news" data-aos="zoom-in" />
        </div>
        <NuxtLink href="/blogs/community">
            <button class="btn btn-light w-100">More news</button>
        </NuxtLink>
    </div>
</template>

<style scoped lang='scss'>

</style>