import { modifyUserInfo, modifyArea, modifyShowArea } from "./actionTypes";

export default {
    [modifyUserInfo]: (state, args = null) => {
        //传参本地保存没传删除
        state.userInfo = args;
        if (args) {
            args = window.JSON.stringify(args);
            window.sessionStorage.setItem("userInfo", args);
        } else {
            window.sessionStorage.removeItem("userInfo");
        }
    },
    [modifyArea]: (state, args = [23]) => {
        //没传或传的是[28],删除本地储存，传了设置本地存储
        state.area = args;
        if (args == [23]) {
            window.sessionStorage.removeItem("area");
        } else {
            args = window.JSON.stringify(args);
            window.sessionStorage.setItem("area", args);
        }
    },
    [modifyShowArea]: (state, args = "重庆市") => {
        state.showArea = args;
        if (args == "重庆市") {
            window.sessionStorage.removeItem("showArea");
        } else {
            args = window.JSON.stringify(args);
            window.sessionStorage.setItem("showArea", args);
        }
    }
}