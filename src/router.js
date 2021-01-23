import {createRouter, createWebHistory} from 'vue-router'
import Heroes from "@/pages/Heroes";
import Calendar from "@/pages/Calendar";
import Home from "@/pages/Home";
import Markdown from "@/pages/Markdown";
import Slider from "@/pages/Slider";
import Calculator from "@/pages/Calculator";
import ReusableModal from "@/pages/ReusableModal";
import Chats from "@/pages/Chat";
import UserCrud from "@/pages/UserCrud";
import store from '@/store/index'
import Tensorflow from "@/pages/Tensorflow";


    const routes = [
        {path: '/', component:Home},
        {path: '/heroes', component:Heroes},
        {path: '/calendar', component:Calendar},
        {path: '/markdown', component:Markdown},
        {path: '/slider', component:Slider},
        {path: '/calculator', component:Calculator},
        {path: '/reusablemodal', component:ReusableModal},
        {path: '/chat', component:Chats, meta:{middleware:'auth'}},
        {path: '/usercrud', component:UserCrud},
        {path: '/tensorflow', component:Tensorflow},
    ]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


router.beforeEach((to,_,next) => {
    if(to.meta.middleware){
        const middleware = require(`@/middleware/${to.meta.middleware}`)
        if(middleware){
            middleware.default(next,store)
        }else {
            next()
        }
    } else {
        next()
    }

})

export default router