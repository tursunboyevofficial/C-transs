<template >
    <div class="box">
        <div class="bar">
            <Sidebar :class="{'sidebar1':$store.state.isCollapsed,'sidebar':$store.state.isCollapsed}"/>
        </div>
        <div class="bar_content">
            <Navbar class="navbar"/>
            <router-view class="content"/>
        </div>
        

    </div>
</template>
<script>
import { RouterLink, RouterView } from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
import store from "@/store/index";
export default {
    data(){
        return{
        }
    },
    components:{
        Sidebar,
        Navbar,
        Dashboard,
    },
}
</script>
<style scoped>
    .box{
        display: flex;
        width: 100%;
        height: 100vh;
        /* margin: 0 10px; ; */
    }
    .bar{
        display: flex;
    }
    .sidebar{
        width: 11vh;
    }
    .sidebar1{
        width: 14vh;
    }
    .bar_content{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100vh;
    }
    .navbar{
        
        height: 11%;
    }
    .content{
        height: 100vh;
        margin: 20px;
        border: 1px solid rgb(214, 214, 214);
        padding: 10px 20px;
    }
</style>