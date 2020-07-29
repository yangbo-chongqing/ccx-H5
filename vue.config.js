const path = require('path');
const debug = process.env.NODE_ENV !== 'production';
const pageEntry = "./src/main.js";
const pageTemplate = "./public/index.html";
const params = {
        entry: './src/main.js',
        template: './public/index.html'
    }
    /**
     *
     * @type {string[]}
     */
let temp = [
    'index', //首页
    'profile', //个人中心
    'login', //登录
    'register', //注册
    'monitor', //疫情监控
    'personalData', //个人资料
    'numbers',
    'server',
    'partyBuild',
    'scenic',
    'member',
    'onlineLearning',
    'videoDetails',
    'wdjj',
    'zxks',
    'policy',
    'details',
    'dyfuwu', //党员服务
    'Pay', //党员缴费
    'integral', //我的积分
    'integralDetails', //我的积分详情
    'mytask', //我的任务
    'taskDetails', //任务详情
    'taskHandle', //任务处理
    'mailbox', //书记信箱
    'release', //书记信箱-发布
    'poDetails', //书记信箱-民意详情
    'manual', //书记信箱-民意详情
    'myOrganization', //我的组织
    'notice', //通知快讯
    'affairsOpen', //政务公开
    'affairs', //党务公开
    'sentiment', //村情介绍
    'instruction', //家训家风
    'villager', //村民自治
    'fiveLong', //五长制
    'threeSessions',
    'attendees',
    'advanced',
    'checkInStaff',
    'PartyBuildDynamics',
    'PartyBuildPhoto',
    'PartyPhotoDetails',
    'PartyPhotoListDetails',
    'PartyAffairs',
    'Guide',
    'GuideClass',
    'GuideDetails',
    'OnLine',
    'ProxyThing',
    'Appeal',
    'Declare',
    'ResultSearch',
    'ResultDetails',
    'SearchConvenience',
    'Merge',
    'volunteer',
    'BeVolunteer',
    'detailsVer',
    'OrgConstruction',
    'election',
    'electionDetails',
    'secretary',
    'scoring',
    'pollresearch',
    'pollDetails',
    'development',
    'relational',
    'orgStructure',
    'outregistration',
    'orgDetails',
    'poverty',
    'dynamicDetails',
    'projectDetails',
    'povertyAccount',
    'households',
    'family',
    'familyMember',
    'processList',
    'archives',
    'processDetails',
    'poveryDevelopment',
    'resident',
    'statistics',
    'BeautifulCountry',
    'beautifulDetails',
    'map',
    'vr',
    'Police',
    'Law',
    'Lawdetails',
    'Lawconsultation',
    'Society',
    'SocietyDet',
    'SocietySign',
    'villageIntroduction',
    'villageDetails',
    'Safe',
    'Selfprotection',
    'NewDetails',
    'Disaster',
    'PoliceSentiment',
    'publicity',
    'morePhone',
    'documentDetails',
    'estate', //产业富村
    'estateDetails', //产业富村市场信息详情
    "collective", //集体经济
    "collectiveDetails", //集体经济详情
    "agriculturalServer", //农技服务
    "esVideoDetails", //农技服务视频详情
    "esArticle", //农技服务文章详情
    "expertDetails", //农技服务专家详情
    "estateMap", //产业地图
    "estateMapDetails", //产业地图详情
]
let pages = {};
temp.forEach(item => {
    let obj = {};
    obj.filename = item + '.html';
    obj = {...obj, ...params };
    pages[item] = obj;
});
module.exports = {
    lintOnSave: false,
    runtimeCompiler: false,
    productionSourceMap: false,
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'stylus',
            patterns: [
                path.resolve(__dirname, "./src/assets/css/public.styl")
            ]
        }
    },
    configureWebpack: {
        module: {
            rules: [{
                test: /\.swf$/, //此处添加视频组件的.swf文件编译
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'file/[path][name].[hash7].[ext]'
                }
            }]
        }
    },
    // devServer:{
    //     proxy:'http://119.3.196.255:7604'
    // },
    publicPath: "./",
    outputDir: "newsccxh5",
    pages
};