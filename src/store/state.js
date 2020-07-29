//用户信息
const userInfo = window.sessionStorage.getItem("userInfo") ?
    window.JSON.parse(window.sessionStorage.getItem("userInfo")) :
    null;
//区域信息 [省,市,区,街道,社区] 默认为陕西省
const area = window.sessionStorage.getItem("area") ?
    window.JSON.parse(window.sessionStorage.getItem("area")) : [23];
//首页展示的值
const showArea = window.sessionStorage.getItem("showArea") ?
    window.JSON.parse(window.sessionStorage.getItem("showArea")) :
    "重庆市";

export default {
    userInfo,
    area,
    showArea
}