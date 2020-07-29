import Vue from 'vue'
import VueRouter from 'vue-router'
//首页
import Index from "../views/Index";


//个人中心
import Profile from "../views/personalCenter/Profile";
//登录页
import login from "../views/personalCenter/login";
//注册
import register from "../views/personalCenter/register";
//注册,下一步
import numbers from "../views/personalCenter/numbers";
//个人资料
import personalData from "../views/personalCenter/personalData";
//党建
import PartyBuild from "../views/PartyBuild";
//景区
import Scenic from "../views/Scenic";
//找回密码
import outPassword from '../views/outPassword';
//党建动态
import PartyBuildDynamics from '../views/PartyBuildDynamics';
// 党建相册
import PartyBuildPhoto from "../views/PartyBuildPhoto";
// 党建相册详情
import PartyPhotoDetails from "../views/PartyPhotoDetails";
// 党建相册列表详情
import PartyPhotoListDetails from "../views/PartyPhotoListDetails";
// 党务公开
import PartyAffairs from "../views/PartyAffairs";
//党员学习
import member from "../views/study/member";
//在线学习
import onlineLearning from "../views/study/onlineLearning";
//在线学习详情
import videoDetails from "../views/study/videoDetails";
//文档简介
import wdjj from "../views/study/wdjj";
//在线考试
import zxks from "../views/study/zxks";
//考试
import examination from "../views/study/examination";
//三会一课
import threeSessions from "../views/study/threeSessions";
//参会人员
import attendees from "../views/study/attendees";
//晚期会议-参与人员
import advanced from "../views/study/advanced";
//参与人员-签到
import checkInStaff from "../views/study/checkInStaff";
//政策法规
import policy from "../views/study/policy";
//党员服务
import dyfuwu from "../views/services/dyfuwu";
//党员缴费
import Pay from "../views/services/Pay";
//我的积分
import integral from "../views/services/integral";
//我的积分详情
import integralDetails from "../views/services/integralDetails";
//我的任务
import mytask from "../views/services/mytask";
//任务详情
import taskDetails from "../views/services/taskDetails";
//任务处理
import taskHandle from "../views/services/taskHandle";
//书记信箱
import mailbox from "../views/services/mailbox";
//书记信箱-发布
import release from "../views/services/release";
//书记信箱-民意详情
import poDetails from "../views/services/poDetails";
//工作手册
import manual from "../views/services/manual";
//我的组织
import myOrganization from "../views/services/myOrganization";
//通知快讯
import notice from "../views/services/notice";
//政务公开
import affairsOpen from "../views/government/affairsOpen";
//党务公开
import affairs from "../views/government/affairs";
//村情介绍
import sentiment from "../views/government/sentiment";
//详情
import details from "../views/study/details";
// 组织建设
import OrgConstruction from "../views/organization/OrgConstruction";
// 换届选举
import election from "../views/organization/election";
// 换届选举投票
import electionDetails from "../views/organization/electionDetails";
import electionWas from '../views/organization/electionWas'
// 书记考核
import secretary from "../views/organization/secretary";
// 书记考核详情
import scoring from "../views/organization/scoring";
// 投票调研
import pollresearch from "../views/organization/pollresearch";
// 投票调研详情
import pollDetails from '../views/organization/pollDetails';
// 党员发展
import development from '../views/organization/development';
//投票人员详情
import Detail from '../views/organization/Detail';
// 关系转移
import relational from '../views/organization/relational';
// 外出登记
import outregistration from '../views/organization/outregistration';
// 组织架构
import orgStructure from '../views/organization/orgStructure';
// 组织架构详情
import orgDetails from '../views/organization/orgDetails';
// 扶贫动态
import poverty from '../views/jzfp/poverty';
// 扶贫动态详情
import dynamicDetails from '../views/jzfp/dynamicDetails';
// 扶贫项目详情
import projectDetails from '../views/jzfp/projectDetails';
// 扶贫台账
import povertyAccount from '../views/jzfp/povertyAccount';
// 扶贫台账——贫困户
import households from '../views/jzfp/households';
// 贫困户--家庭信息
import family from '../views/jzfp/family';
// 家庭信息--家庭成员
import familyMember from '../views/jzfp/familyMember';
// 家庭信息--扶贫过程
import processList from '../views/jzfp/processList';
// 扶贫过程详情
import processDetails from '../views/jzfp/processDetails';
// 家庭信息--扶贫档案
import archives from '../views/jzfp/archives';
// 扶贫台账--发展现状
import poveryDevelopment from '../views/jzfp/poveryDevelopment';
// 扶贫台账--驻村工作队
import resident from '../views/jzfp/resident';
// 扶贫台账--统计
import statistics from '../views/jzfp/statistics';
//办事指南
import Guide from "../views/convenience/Guide";
//办事指南类型
import GuideClass from "../views/convenience/GuideClass"
//办事指南单条详情
import GuideDetails from "../views/convenience/GuideDetails";
// 景区--景区列表详情
import beautifulDetails from '../views/Scenic/beautifulDetails';
// 景区--地图
import map from '../views/Scenic/map';
// 景区--vr
import vr from '../views/Scenic/vr';
// 景区--乡村介绍
import villageIntroduction from '../views/Scenic/villageIntroduction';
// 乡村介绍详情
import villageDetails from '../views/Scenic/villageDetails'
//在线办理
import OnLine from "../views/convenience/OnLine";
/*事件代办*/
import ProxyThing from "../views/convenience/ProxyThing";
/*诉求提交*/
import Appeal from "../views/convenience/Appeal";
//在线申报
import Declare from "../views/convenience/Declare"
//结果查询
import ResultSearch from "../views/convenience/ResultSearch";
//便民查询
import SearchConvenience from "../views/convenience/SearchConvenience"
//三治合一
import Merge from "../views/government/Merge";
// 三治合一--警务信息
import Police from "../views/government/Police";
// 三治合一--法律常识
import Law from '../views/government/Law';
// 法律常识详情
import Lawdetails from '../views/government/Lawdetails';
// 三治合一--法律咨询
import Lawconsultation from '../views/government/Lawconsultation';
// 三治合一--社会组织
import Society from '../views/government/Society';
// 三治合一--家训家风
import instruction from '../views/government/instruction';
// 三治合一--村民自治
import villager from '../views/government/villager';
// 三治合一--五长制
import fiveLong from '../views/government/fiveLong';
// 社会组织详情
import SocietyDet from '../views/government/SocietyDet';
// 加入社会组织
import SocietySign from '../views/government/SocietySign';
//三治合志愿服务
import volunteer from '../views/government/volunteer';
import detailsVer from '../views/government/detailsVer';
import BeVolunteer from '../views/government/BeVolunteer';
//结果查询
import ResultDetails from "../views/convenience/ResultDetails";
// 平安家园
import Safe from '../views/safehome/Safe';
// 平安家园--自我保护
import Selfprotection from '../views/safehome/Selfprotection';
// 平安家园--灾情上报
import Disaster from '../views/safehome/Disaster';
// 平安家园--警情通报
import PoliceSentiment from '../views/safehome/PoliceSentiment';
// 疫情监控
import monitor from '../views/monitor';
// 最美乡村
import BeautifulCountry from '../views/Scenic/BeautifulCountry';
// VR详情
import VrDetails from '../views/Scenic/VrDetails';
//新闻详情页面
import NewsDetails from "../views/NewsDetails";
//政策宣传
import publicity from "../views/government/publicity";
// 党建要闻列表
import PartyBuildList from '../views/PartyBuildList';
// 先锋模范列表
import OrgList from '../views/organization/OrgList';
// 课程详情
import documentDetails from '../views/study/documentDetails';
// 人才新村
import Person from '../views/fiveCountry/Person';
// 人才新村更多
import PersonMore from '../views/fiveCountry/PersonMore';
// 专家详情
import PersonDetails from '../views/fiveCountry/PersonDetails';
// 预约
import Appointment from '../views/fiveCountry/Appointment';
// 人才库
import Talent from '../views/fiveCountry/Talent';
// 人才库详情
import TalentDetails from '../views/fiveCountry/TalentDetails';
// 申请上榜
import ApplyTalent from '../views/fiveCountry/ApplyTalent';
// 农业培训
import Agricultural from '../views/fiveCountry/Agricultural';
// 农业培训--线下培训详情
import AgriculturalDetails from '../views/fiveCountry/AgriculturalDetails';
// 大学生
import College from '../views/fiveCountry/College';
// 大学生列表详情
import CollegeDetails from '../views/fiveCountry/CollegeDetails';
// 大学生申请上榜
import ApplyCollege from '../views/fiveCountry/ApplyCollege';
// 视频播放
import Video from '../views/fiveCountry/Video';
// 文明新村
import Civilization from '../views/civilization/Civilization';
// 文明新村列表
import CivilizationList from '../views/civilization/CivilizationList';
// 人物评选
import Character from '../views/civilization/Character';
// 人物评选详情
import CharacterDetails from '../views/civilization/CharacterDetails';
import CharacterDetailsed from '../views/civilization/CharacterDetailsed';
// 社区文化
import Community from '../views/civilization/Community';
// 幸福分享
import Happiness from '../views/civilization/Happiness';
// 幸福分享详情
import HappinessDetails from '../views/civilization/HappinessDetails';
// 修改密码
import Forgetpwd from '../views/personalCenter/Forgetpwd'
// 幸福分享--文章发布
import PublishArticles from '../views/civilization/PublishArticles';
Vue.use(VueRouter);

const routes = [

    {
        path: "/index.html",
        name: "Index",
        component: Index
    },
    {
        path: "/server.html",
        name: "server",
        component: () =>
            import ("../views/Server")
    },
    {
        path: "/profile.html",
        name: 'profile',
        component: Profile
    },
    {
        path: "/scenic.html",
        name: "Scenic",
        component: Scenic
    },
    //个人中心，登录
    {
        path: "/login.html",
        name: "login",
        component: login
    },
    //注册
    {
        path: "/numbers.html",
        name: "numbers",
        component: numbers
    },
    //个人资料
    {
        path: "/monitor.html",
        name: "monitor",
        component: monitor
    },
    //疫情监控
    {
        path: "/personalData.html",
        name: "personalData",
        component: personalData
    },
    {
        path: "/register.html",
        name: "register",
        component: register
    },
    //党建动态
    {
        path: "/partyBuild.html",
        name: "partyBuild",
        component: PartyBuild
    },
    {
        path: '/PartyBuildDynamics.html',
        name: 'PartyBuildDynamics',
        component: PartyBuildDynamics
    },
    {
        path: '/PartyBuildPhoto.html',
        name: 'PartyBuildPhoto',
        component: PartyBuildPhoto
    },
    {
        path: '/PartyPhotoDetails.html',
        name: 'PartyPhotoDetails',
        component: PartyPhotoDetails,
    },
    {
        path: '/PartyPhotoListDetails.html',
        name: 'PartyPhotoListDetails',
        component: PartyPhotoListDetails
    },
    {
        path: '/PartyAffairs.html',
        name: 'PartyAffairs',
        component: PartyAffairs
    },
    { //党员学习
        path: '/member.html',
        name: 'member',
        component: member
    },
    { //在线学习
        path: '/onlineLearning.html',
        name: 'onlineLearning',
        component: onlineLearning
    },
    { //在线学习详情
        path: '/videoDetails.html',
        name: 'videoDetails',
        component: videoDetails
    },
    { //文档简介
        path: '/wdjj.html',
        name: 'wdjj',
        component: wdjj
    },
    { //在线考试
        path: '/zxks.html',
        name: 'zxks',
        component: zxks
    },
    { //开始考试
        path: '/examination.html',
        name: 'examination',
        component: examination
    },
    { //三会一课
        path: '/threeSessions.html',
        name: 'threeSessions',
        component: threeSessions
    },
    { //参会人员
        path: '/attendees.html',
        name: 'attendees',
        component: attendees
    },
    { //参与人员-签到
        path: '/checkInStaff.html',
        name: 'checkInStaff',
        component: checkInStaff
    },
    { //晚期会议-参会人员
        path: '/advanced.html',
        name: 'advanced',
        component: advanced
    },
    { //政策法规
        path: '/policy.html',
        name: 'policy',
        component: policy
    },
    { //详情
        path: '/details.html',
        name: 'details',
        component: details
    },
    // 组织建设
    {
        path: '/OrgConstruction.html',
        name: 'OrgConstruction',
        component: OrgConstruction
    },
    // 党员服务
    {
        path: '/dyfuwu.html',
        name: 'dyfuwu',
        component: dyfuwu
    },
    {
        path: '/outPassword.html',
        name: 'outPassword',
        component: outPassword
    },
    // 党员缴费
    {
        path: '/Pay.html',
        name: 'Pay',
        component: Pay
    },
    // 我的积分
    {
        path: '/integral.html',
        name: 'integral',
        component: integral
    },
    {
        path: '/election.html',
        name: 'election',
        component: election
    },
    // 我的积分详情
    {
        path: '/integralDetails.html',
        name: 'integralDetails',
        component: integralDetails
    },
    // 我的任务
    {
        path: '/mytask.html',
        name: 'mytask',
        component: mytask
    },
    // 任务详情
    {
        path: '/taskDetails.html',
        name: 'taskDetails',
        component: taskDetails
    },
    // 任务处理
    {
        path: '/taskHandle.html',
        name: 'taskHandle',
        component: taskHandle
    },
    // 书记信箱
    {
        path: '/mailbox.html',
        name: 'mailbox',
        component: mailbox
    },
    // 书记信箱-发布
    {
        path: '/release.html',
        name: 'release',
        component: release
    },
    // 书记信箱-民意详情
    {
        path: '/poDetails.html',
        name: 'poDetails',
        component: poDetails
    },
    // 工作手册
    {
        path: '/manual.html',
        name: 'manual',
        component: manual
    },
    // 我的组织
    {
        path: '/myOrganization.html',
        name: 'myOrganization',
        component: myOrganization
    },
    // 通知快讯
    {
        path: '/notice.html',
        name: 'notice',
        component: notice
    },
    // 政务公开
    {
        path: '/affairsOpen.html',
        name: 'affairsOpen',
        component: affairsOpen
    },
    // 党务公开
    {
        path: '/affairs.html',
        name: 'affairs',
        component: affairs
    },
    // 村情介绍
    {
        path: '/sentiment.html',
        name: 'sentiment',
        component: sentiment
    },
    {
        path: '/electionDetails.html',
        name: 'electionDetails',
        component: electionDetails
    },
    {
        path: "/electionWas.html",
        name: "electionWas",
        component: electionWas
    },
    {
        path: '/secretary.html',
        name: 'secretary',
        component: secretary
    },
    {
        path: '/scoring.html',
        name: 'scoring',
        component: scoring
    },
    {
        path: '/pollresearch.html',
        name: 'pollresearch',
        component: pollresearch
    },
    {
        path: '/pollDetails.html',
        name: 'pollDetails',
        component: pollDetails
    },
    {
        path: '/development.html',
        name: 'development',
        component: development
    },
    {
        path: '/relational.html',
        name: 'relational',
        component: relational
    },
    {
        path: '/outregistration.html',
        name: 'outregistration',
        component: outregistration
    },
    {
        path: '/orgStructure.html',
        name: 'orgStructure',
        component: orgStructure
    },
    {
        path: '/orgDetails.html',
        name: 'orgDetails',
        component: orgDetails
    },
    // 精准扶贫--扶贫动态
    {
        path: '/poverty.html',
        name: 'poverty',
        component: poverty
    },
    {
        path: '/dynamicDetails.html',
        name: 'dynamicDetails',
        component: dynamicDetails
    },
    {
        path: '/projectDetails.html',
        name: 'projectDetails',
        component: projectDetails
    },
    // 精准扶贫--扶贫台账
    {
        path: '/povertyAccount.html',
        name: 'povertyAccount',
        component: povertyAccount
    },
    {
        path: '/households.html',
        name: 'households',
        component: households
    },
    {
        path: '/familyMember.html',
        name: 'familyMember',
        component: familyMember
    },
    {
        path: '/family.html',
        name: 'family',
        component: family
    },
    {
        path: '/processList.html',
        name: 'processList',
        component: processList
    },
    {
        path: '/processDetails.html',
        name: 'processDetails',
        component: processDetails
    },
    {
        path: '/archives.html',
        name: 'archives',
        component: archives
    },
    {
        path: '/poveryDevelopment.html',
        name: 'poveryDevelopment',
        component: poveryDevelopment
    },
    {
        path: '/resident.html',
        name: 'resident',
        component: resident
    },
    {
        path: '/statistics.html',
        name: 'statistics',
        component: statistics
    },
    {
        path: "/Guide.html",
        name: "Guide",
        component: Guide
    },
    {
        path: "/GuideClass.html",
        name: "GuideClass",
        component: GuideClass
    },
    {
        path: "/GuideDetails.html",
        name: "GuideDetails",
        component: GuideDetails
    },
    // 景区
    {
        path: '/beautifulDetails.html',
        name: 'beautifulDetails',
        component: beautifulDetails
    },
    {
        path: '/map.html',
        name: 'map',
        component: map
    },
    {
        path: "/vr.html",
        name: "vr",
        component: vr
    },
    {
        path: "/villageIntroduction.html",
        name: "villageIntroduction",
        component: villageIntroduction
    },
    {
        path: "/villageDetails.html",
        name: "villageDetails",
        component: villageDetails
    },
    {
        path: "/OnLine.html",
        name: "OnLine",
        component: OnLine
    },
    {
        path: "/ProxyThing.html",
        name: "ProxyThing",
        component: ProxyThing
    },
    {
        path: "/Appeal.html",
        name: "Appeal",
        component: Appeal
    },
    {
        path: "/Declare.html",
        name: "Declare",
        component: Declare
    },
    {
        path: "/ResultSearch.html",
        name: "ResultSearch",
        component: ResultSearch
    },
    {
        path: "/SearchConvenience.html",
        name: "SearchConvenience",
        component: SearchConvenience
    },
    {
        path: "/BeautifulCountry.html",
        name: "BeautifulCountry",
        component: BeautifulCountry
    },
    {
        path: "/VrDetails.html",
        name: "VrDetails",
        component: VrDetails
    },
    {
        path: '/Detail.html',
        name: 'Detail',
        component: Detail
    },
    // 三治合一
    {
        path: "/volunteer.html",
        name: "volunteer",
        component: volunteer
    },
    {
        path: "/detailsVer.html",
        name: "detailsVer",
        component: detailsVer
    },
    {
        path: "/BeVolunteer.html",
        name: "BeVolunteer",
        component: BeVolunteer
    },
    {
        path: "/Merge.html",
        name: "Merge",
        component: Merge
    },
    {
        path: "/Police.html",
        name: "Police",
        component: Police
    },
    {
        path: "/Law.html",
        name: "Law",
        component: Law
    },
    {
        path: "/Lawdetails.html",
        name: "Lawdetails",
        component: Lawdetails
    },
    {
        path: "/Lawconsultation.html",
        name: "Lawconsultation",
        component: Lawconsultation
    },
    {
        path: "/Society.html",
        name: "Society",
        component: Society
    },
    {
        path: "/SocietyDet.html",
        name: "SocietyDet",
        component: SocietyDet
    },
    {
        path: "/SocietySign.html",
        name: "SocietySign",
        component: SocietySign
    },
    {
        path: "/ResultDetails.html",
        name: "ResultDetails",
        component: ResultDetails
    },
    { //家训家教
        path: "/instruction.html",
        name: "instruction",
        component: instruction
    },
    { //村民自治
        path: "/villager.html",
        name: "villager",
        component: villager
    },
    { //五长制
        path: "/fiveLong.html",
        name: "fiveLong",
        component: fiveLong
    },
    // 平安家园
    {
        path: "/Safe.html",
        name: "Safe",
        component: Safe
    },
    {
        path: "/Selfprotection.html",
        name: "Selfprotection",
        component: Selfprotection
    },
    {
        path: "/Disaster.html",
        name: "Disaster",
        component: Disaster
    },
    {
        path: "/PoliceSentiment.html",
        name: "PoliceSentiment",
        component: PoliceSentiment
    },
    {
        path: "/NewsDetails.html",
        name: "NewsDetails",
        component: NewsDetails
    },
    {
        path: "/publicity.html",
        name: "publicity",
        component: publicity
    },
    {
        path: "/PartyBuildList.html",
        name: "PartyBuildList",
        component: PartyBuildList
    },
    {
        path: "/OrgList.html",
        name: "OrgList",
        component: OrgList
    },
    {
        path: "/documentDetails.html",
        name: "documentDetails",
        component: documentDetails
    },
    // 人才新村
    {
        path: "/Person.html",
        name: "Person",
        component: Person
    },
    {
        path: "/PersonMore.html",
        name: "PersonMore",
        component: PersonMore
    },
    {
        path: "/PersonDetails.html",
        name: "PersonDetails",
        component: PersonDetails
    },
    {
        path: "/Appointment.html",
        name: "Appointment",
        component: Appointment
    },
    {
        path: "/Talent.html",
        name: "Talent",
        component: Talent
    },
    {
        path: "/TalentDetails.html",
        name: "TalentDetails",
        component: TalentDetails
    },
    {
        path: "/ApplyTalent.html",
        name: "ApplyTalent",
        component: ApplyTalent
    },
    {
        path: "/Agricultural.html",
        name: "Agricultural",
        component: Agricultural
    },
    {
        path: "/AgriculturalDetails.html",
        name: "AgriculturalDetails",
        component: AgriculturalDetails
    },
    {
        path: "/College.html",
        name: "College",
        component: College
    },
    {
        path: "/CollegeDetails.html",
        name: "CollegeDetails",
        component: CollegeDetails
    },
    {
        path: "/ApplyCollege.html",
        name: "ApplyCollege",
        component: ApplyCollege
    },
    {
        path: "/Video.html",
        name: "Video",
        component: Video
    },
    {
        path: "/morePhone.html",
        name: "MorePhone",
        component: () =>
            import ("../views/safehome/MorePhone")
    },
    {
        path: "/estate.html",
        name: "Estate",
        component: () =>
            import ("../views/estate/Estate")
    },
    {
        path: "/estateDetails.html",
        name: "EstateDetails",
        component: () =>
            import ("../views/estate/EstateDetails")
    },
    {
        path: "/collective.html",
        name: "Collective",
        component: () =>
            import ("../views/estate/Collective")
    },
    {
        path: "/collectiveDetails.html",
        name: "CollectiveDetails",
        component: () =>
            import ("../views/estate/CollectiveDetails")
    },
    {
        path: "/agriculturalServer.html",
        name: "AgriculturalServer",
        component: () =>
            import ("../views/estate/AgriculturalServer")
    },
    {
        path: "/esVideoDetails.html",
        name: "ESVideoDetails.vue",
        component: () =>
            import ("../views/estate/ESVideoDetails")
    },
    {
        path: "/esArticle.html",
        name: "ESArticle",
        component: () =>
            import ("../views/estate/ESArticle")
    },
    {
        path: "/expertDetails.html",
        name: "ExpertDetails",
        component: () =>
            import ("../views/estate/ExpertDetails")
    },
    {
        path: "/estateMap.html",
        name: "EstateMap",
        component: () =>
            import ("../views/estate/EstateMap")
    },
    {
        path: "/estateMapDetails.html",
        name: "EstateMapDetails",
        component: () =>
            import ("../views/estate/EstateMapDetails")
    },
    {
        path: "/Civilization.html",
        name: "Civilization",
        component: Civilization
    },
    {
        path: "/CivilizationList.html",
        name: "CivilizationList",
        component: CivilizationList
    },
    {
        path: "/Character.html",
        name: "Character",
        component: Character
    },
    {
        path: "/CharacterDetails.html",
        name: "CharacterDetails",
        component: CharacterDetails
    },
    {
        path: "/CharacterDetailsed.html",
        name: "CharacterDetailsed",
        component: CharacterDetailsed
    },
    {
        path: "/Community.html",
        name: "Community",
        component: Community
    },
    {
        path: "/Happiness.html",
        name: "Happiness",
        component: Happiness
    },
    {
        path: "/HappinessDetails.html",
        name: "HappinessDetails",
        component: HappinessDetails
    },
    {
        path: "/Forgetpwd.html",
        name: "Forgetpwd",
        component: Forgetpwd
    },
    {
        path: "/PublishArticles.html",
        name: "PublishArticles",
        component: PublishArticles
    },
    {
        path: '/',
        redirect: "/index.html"
    }
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router