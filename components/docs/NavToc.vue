<template>
    <div class="bd-toc mt-3 mb-5 my-lg-0 mb-lg-5 px-sm-1 text-body-secondary">
        <button class="btn btn-link p-md-0 mb-2 mb-md-0 text-decoration-none bd-toc-toggle d-md-none" type="button"
                data-bs-toggle="collapse" data-bs-target="#tocContents" aria-expanded="false"
                aria-controls="tocContents">
            On this page

        </button>
        <strong class="d-none d-md-block h6 my-2 ms-3">On this page</strong>
        <hr class="d-none d-md-block my-2 ms-3">
        <div class="collapse bd-toc-collapse" id="tocContents">
            <nav id="TableOfContents">
                <ul>
                    <template v-for="item in generated" >
                        <li v-if="item.depth > 1 && item.depth < 6" :class="'depth-' + item.depth">
                            <a :href="'#' + item.id" class="active">{{ item.text }}</a>
                        </li>
                    </template>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            toc: {
                type: Object,
                required: true
            },
        },
        computed: {
            generated() {
                const recursive = (links) => {
                    const result = [];

                    for (const item of links) {
                        result.push(item);

                        if (item.children) {
                            result.push(...recursive(item.children));
                        }
                    }

                    return result;
                }

                return recursive(this.toc.links);
            }
        }
    }
</script>

<style lang="scss">
    @import "../../assets/styles/variable";

    .bd-toc {
        @include media-breakpoint-up(lg) {
            position: sticky;
            top: 5rem;
            right: 0;
            z-index: 2;
            height: subtract(100vh, 7rem);
            overflow-y: auto;
        }

        nav {
            @include font-size(.875rem);

            ul {
                padding-left: .75rem;
                margin-bottom: 0;
                list-style: none;

                @for $i from 2 through 6 {
                    li.depth-#{$i} {
                        padding-left: calc(.75rem * ($i - 2));
                    }
                }

                li {
                    border-left: .125rem solid transparent;

                    &:hover,
                    &.active {
                        a {
                            color: var(--bd-toc-color);
                            font-weight: 500;
                        }

                        border-left-color: var(--bd-toc-color);
                    }
                }
            }

            a {
                display: block;
                padding: .125rem .75rem ;
                color: inherit;
                text-decoration: none;

                code {
                    font: inherit;
                }
            }
        }
    }

    .bd-toc-toggle {
        display: flex;
        align-items: center;

        @include media-breakpoint-down(sm) {
            justify-content: space-between;
            width: 100%;
        }

        @include media-breakpoint-down(md) {
            color: var(--bs-body-color);
            border: 1px solid var(--bs-border-color);
            @include border-radius(var(--bs-border-radius));

            &:hover,
            &:focus,
            &:active,
            &[aria-expanded="true"] {
                color: var(--bd-violet);
                background-color: var(--bs-body-bg);
                border-color: var(--bd-violet);
            }

            &:focus,
            &[aria-expanded="true"] {
                box-shadow: 0 0 0 3px rgba(var(--bd-violet-rgb), .25);
            }
        }
    }

    .bd-toc-collapse {
        @include media-breakpoint-down(md) {
            nav {
                padding: 1.25rem 1.25rem 1.25rem 1rem;
                background-color: var(--bs-tertiary-bg);
                border: 1px solid var(--bs-border-color);
                @include border-radius(var(--bs-border-radius));
            }
        }

        @include media-breakpoint-up(md) {
            display: block !important; // stylelint-disable-line declaration-no-important
        }
    }
</style>