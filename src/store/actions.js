import { modifyUserInfo ,modifyArea , modifyShowArea} from "./actionTypes"

export default {
    //修改用户信息
    [modifyUserInfo]:(context,args)=>{
        context.commit(modifyUserInfo,args);
    },
    //修改区域位置
    [modifyArea]:(context , args) => {
        context.commit(modifyArea ,args)
    },
    //修改首页地址名字
    [modifyShowArea]:(context , args) => {
        context.commit(modifyShowArea ,args)
    }
}
