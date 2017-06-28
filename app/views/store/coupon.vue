<template>
    <div>
        <div>{{couponNumber}}</div>
        <div>{{productFullName}}</div>
        <div>Цена продукта: {{productPrice}}</div>
    </div>
</template>

<script>
export default {
    name: 'storelayout',
    props: [
        'couponNumber',
        'productFullName',
        'productPrice'
    ],
    data: function () {
        return {
            
        }
    },
    methods: {}
}
</script>

<style>

</style>