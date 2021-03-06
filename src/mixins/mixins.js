import {Base64 } from "js-base64";
import {Toast , Dialog} from "vant";
import md5 from "js-md5";
import {isLogin} from "../apis";
const globalBaseUrl = "http://www.mlxc365.com"
export default {
    methods:{
        /**
         * 跳转其他页面可传参base64加密
         * @param pageRouter
         * @param params
         */
        switchPage({pageRouter , params = null}){
            if(params){
                const keys = Object.keys(params);
                let data = {};
                keys.forEach(key =>{
                    data[Base64.encode(key)] = Base64.encode(params[key])
                })
                this.$router.push({
                    path:pageRouter,
                    query: data
                });
            }else{
                this.$router.push(pageRouter);
            }
        },
        /**
         * 解码
         * @param obj
         * @returns {{}}
         */
        decodeBase64(obj){
            let newObj = {};
            const keys = Object.keys(obj);
            keys.forEach(key => {
                newObj[Base64.decode(key)] = Base64.decode(obj[key]);
            })
            return newObj;
        },
        /**
         * 轻提醒 默认时间是2秒
         * @param message 提示文本
         * @param loading 加载提示
         * @param success 成功展示
         * @param fail    失败展示
         * @constructor
         */
        GToast({message = "加载中..." ,loading = false , success = false , fail = false}){
            //加载提醒
            if(loading){
                Toast.loading({
                    message,
                    forbidClick: true,
                });
                return false;
            }
            //成功提醒
            if(success){
                Toast.success(message);
                return false;
            }
            //失败提醒
            if(fail){
                Toast.fail(message);
                return false;
            }
            //基本的文字提醒
            Toast(message);
        },
        //判断是否登录
        /**
         *
         * @param resolve 登录要做的事情
         * @param reject  没有登录要做的事情
         * @returns {Promise<void>}
         */
        isLogin(resolve,params){
            isLogin().then(msg => {
                //没有登录
                if(~~msg.code === 0 && ~~msg.status === 400){
                    Dialog.confirm({
                        title: '温馨提示',
                        message: '此功能需要登录才能查看，是否进行登录？'
                    }).then(() => {
                        //确认
                        this.$router.push("/Login.html")
                    }).catch(() => {
                        //取消
                    })
                }else{
                    //进行跳转
                    if(params.pageRouter === "/shop"){
                        const userInfo = this.$store.state.userInfo;
                        const username = userInfo.username;
                        const password = md5(userInfo.plaintextPassword);
                        let url = "http://shop.mlxc365.com/#/index";
                        url = url + "?username="+username+"&password="+password;
                        window.open(url,"_self");
                    }else if(!params.pageRouter){
                        this.GToast({message:"暂未开发"});
                    } else {
                        resolve&&resolve(params)
                    }

                }
            }).catch(err=>{
                console.log(err);
                this.GToast({message:"网络错误"})
            })
        },
        imgError(e){
            e.target.src = require("../assets/img/noImg.png");
        }
    },
    filters:{
        //图片过滤
        formatImg(src){
            if(!src){
                return require("../assets/img/noImg.png");
            }

            if(src === require("../assets/img/noImg.png")){
                return src;
            }
            //判断是否有http
            src = src.split(",")[0];
            if(src.indexOf("http") !== -1){
                return src;
            }else {
                return globalBaseUrl + src;
            }
        }
    }
}
