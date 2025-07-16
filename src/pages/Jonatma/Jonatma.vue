<template >
    <div class="box">
        <section class="header">

        </section>
        <router-link to="/jonatmaQoshish">Jonatma qo'shish</router-link>
        <div></div>
        <router-link to="/buyurtmaEdit">Buyurtma edit</router-link>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.box{
    box-shadow: 0.4px 0.4px 4px 1px;
    padding: 40px;
    
}
.header{
    display: flex;
    justify-content: space-between;
    height: 70px;
    align-items: center;
    width: 100%;
    background-color: antiquewhite;
}
</style>