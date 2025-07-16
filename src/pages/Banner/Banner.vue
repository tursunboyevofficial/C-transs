<template >
    <div class="box">
        <section class="header">
            <h1>Мобильные баннеры</h1>
            <p>Макс. 3 изображения. Рекомендуемый размер: 320x180 px</p>
            <div class="img_section">
                <img src="@/assets/logo.svg" class="img" alt="img">
                <img src="@/assets/logo.svg" class="img" alt="img">
            </div>
        </section>
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
    height: 60%;
    
}
.header{
    display: flex;
    flex-direction: column;
    width: 100%;
}
.header h1{
    font-size: 36px;
}
.header p{
    font-size: 20px;
}
.img_section{
    width: 100%;
    height: 100%;
}
.img{
    width: 49%;
    height: 100%;
    border-radius: 20px;
    cursor:pointer;
    border: 1px solid;
    margin-right: 15px;
}
</style>