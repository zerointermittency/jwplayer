<template>
    <div class="alert alert-success alert-dismissible fade show" role="alert">
        {{ text }} <a :href="url">Signed link</a>
    </div>
</template>

<script>
    export default {
        props: ['text', 'url'],
    };
</script>