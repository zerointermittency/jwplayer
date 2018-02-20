<template>
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <h3>Code: {{ code }}</h3>
        <p>Status code: {{ status }}</p>
        <p>Message: {{ message }}</p>
    </div>
</template>

<script>
    export default {
        props: ['code', 'status', 'message']
    };
</script>