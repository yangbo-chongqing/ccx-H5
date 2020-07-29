import {get, post, upImg } from "./Request";

//登录
export const login = async({ url, data }) => {
    return post({ url, data });
};
//获取验证码
export const getCode = async({ url, data }) => {
    return post({ url, data });
};
//注册
export const reg = async({ url, data }) => {
    return post({ url, data });
};
//党员绑定
export const bindingParty = async({ url, data }) => {
    return post({ url, data })
};
//更改用户信息
export const changeUserInfo = async({ data }) => {
    return post({ url: "/sys/user/updateUser", data })
};
//获取地区
export const getByParentid = async({ data }) => {
    return get({ url: "/system/sysDept/getByParentid", data })
};
//检查是否是党员
export const checkpart = async({ url, data, currentObject }) => {
    return get({ url, data, currentObject });
};
//党建--党建相册
export const getPhoto = async({ url, data, currentObject }) => {
    return post({ url, data, currentObject });
};
//党建相册详情
export const photoDetails = async({ url, data, currentObject }) => {
    return post({ url, data, currentObject });
};
// 党建相册详情--点赞
export const getZan = async({ url, data }) => {
    return post({ url, data });
};
// 党建相册详情--评论
export const getList = async({ url, data }) => {
    return post({ url, data });
};
// 党建相册发送评论
export const getSend = async({ url, data }) => {
    return post({ url, data });
};
// 换届选举
export const getElec = async({ url, data }) => {
    return post({ url, data });
};
// 换届选举详情
export const getVoteone = async({ url, data }) => {
    return post({ url, data });
};
// 换届选举详情--投票
export const Voteone = async({ url, data }) => {
    return post({ url, data });
};
// 书记考核
export const getScore = async({ url, data }) => {
    return post({ url, data });
};
// 书记考核试题
export const getTest = async({ url, data }) => {
    return post({ url, data });
};
// 试题提交
export const getSubmit = async({ url, data }) => {
    return post({ url, data });
};
// 投票调研
export const getVotingList = async({ url, data }) => {
    return post({ url, data });
};
// 投票调研详情
export const getVotedetails = async({ url, data }) => {
    return post({ url, data });
};
// 投票调研--投票
export const choseVote = async({ url, data }) => {
    return post({ url, data });
};
// 党员发展
export const getLine = async({ url, data }) => {
    return get({ url, data });
};
// 关系转移
export const getLocation = async({ url, data, currentObject }) => {
    return post({ url, data, currentObject });
};
// 关系转移--转入支部
export const getOrgRelation = async({ url, data }) => {
    return post({ url, data });
};
//提交关系转移提交
export const upDataRelation = async({ data }) => {
    return post({ url: "/member/turn/mebTurnInsert", data })
};
// 外出登记判断是否为党员
export const getParty = async({ url, data }) => {
    return post({ url, data })
};
// 外出登记党员详情
export const getPartyList = async({ url, data }) => {
    return get({ url, data })
};
// 外出登记提交
export const upDataOut = async({ data }) => {
    return post({ url: "/member/out/save", data })
};
// 组织架构
export const getOrg = async({ url, data }) => {
    return post({ url, data });
};
// 组织架构详情
export const orgDetail = async({ url, data }) => {
    return get({ url, data });
};
// 扶贫过程
export const getProList = async({ url, data, currentObject }) => {
    return post({ url, data, currentObject });
};
// 详情
export const getDetails = async({ url, data }) => {
    return post({ url, data });
};
// 扶贫过程详情
export const getInfo = async({ url, data }) => {
    return post({ url, data });
};
// 扶贫台账
export const getPull = async({ url, data }) => {
    return post({ url, data });
};
// 扶贫台账--更多信息
export const getMore = async({ url, data }) => {
    return post({ url, data });
};
// 扶贫台账--贫困户
export const getPoor = async({ url, data }) => {
    return post({ url, data });
};
// 贫困户信息
export const getPoorhouse = async({ url, data }) => {
    return post({ url, data });
};
// 贫困户--家庭成员
export const getFamily = async({ url, data }) => {
    return post({ url, data });
};
// 贫困户--扶贫过程
export const getProcess = async({ url, data }) => {
    return post({ url, data });
};
// 贫困户--扶贫项目
export const getArchives = async({ url, data }) => {
    return post({ url, data });
};
// 发展现状
export const getDevelopment = async({ url, data }) => {
    return post({ url, data });
};
// 驻村工作队
export const getResident = async({ url, data }) => {
    return post({ url, data });
};
// 警务信息
export const getPolice = async({ url, data }) => {
    return post({ url, data });
};
// 法律咨询律师类型
export const getLawyer = async({ url, data }) => {
    return post({ url, data });
};
// 法律咨询提交
export const upDataLawyer = async({ data }) => {
    return post({ url: "/legalAidApply/insertAndUpdate", data });
};
// 最美乡村详情
export const getBeautiful = async({ url, data }) => {
    return post({ url, data });
};
// VR详情
export const getVR = async({ url, data }) => {
    return post({ url, data });
};
// 地图导航
export const getMap = async({ url, data, currentObject }) => {
    return post({ url, data, currentObject });
};
// 社会组织详情
export const getSocial = async({ url, data }) => {
    return post({ url, data });
};
// 社会组织提交
export const upDataSociety = async({ url, data }) => {
    return post({ url, data });
};
//获取首页轮播图
export const getSwiper = async({ url, data, currentObject }) => {
    return post({ url, data, currentObject });
};
//获取新闻类调用时要传this(ar应用,景点介绍,自我保护，网上慢直播，
// 警情通报，五长制，村民自治，通知公告，智慧党建大类
// 掌上党校大类，组织生活大类 ， 先锋模范 ，政务公开大类 ，三治合一里面的德治类（社会组织、家风家训家教）)
export const getNewsClass = async({ data, currentObject }) => {
    return get({ url: "/F_Information/getInformationListApp", data, currentObject })
};
//获取我的积分列表
export const getintegral = async({ url, data }) => {
    return get({ url, data });
};
//首页获取区域 不需传地址
export const getAddress = async({ url, data }) => {
    return get({ url, data });
};
//获取办事指南类型
export const getGuideType = async({ url, data, currentObject }) => {
    return get({ url, data, currentObject })
};
//获取办事指南列表
export const getGuideList = async({ url, data, currentObject }) => {
    return post({ url, data, currentObject })
};
//获取办事指南单条详情
export const getGuideDetails = async({ url, data, currentObject }) => {
    return post({ url, data, currentObject })
};
//判断是否登录
export const isLogin = async() => {
    return post({ url: "/logins/isLogin" })
};
//获取验证码
export const getCaptcha = async({ data }) => {
    return post({ url: "/information/getSMSMsg", data })
};
//提交事件代办
export const upDataProxy = async({ url, data }) => {
    return post({ url, data })

};
//获取诉求类型
export const getAppealType = async({ url, currentObject }) => {
    return get({ url, currentObject })
};
//提交诉求提交
export const upDataAppeal = async({ data }) => {
    return post({ url: "/apply/save", data })
};
//上传图片 file 文件对象
export const upImage = async(file) => {
    const formData = new FormData();
    formData.append("mFile", file);
    console.log(formData);
    return upImg({ url: "/work/event/uploadEventImg", data: formData })
};
//提交在线申报
export const upDataDeclare = async(data) => {
    return post(({ url: "/flowOnline/save", data }));
};
//获取结果查询列表
export const getResultList = async() => {
    return post(({ url: "/apply/list" }));
};
//获取视频学习列表
export const getvedio = async({ url, data }) => {
    return get({ url, data })
};
//获取文档学习列表
export const getText = async({ url, data }) => {
    return get({ url, data })
};
//获取在线考试信息
export const getMyExamination = async({ data, currentObject }) => {
    return get({ url: "/fun/exam/list", data, currentObject })
};
// 党员学习考核试题
export const getMemberTest = async({ url, data }) => {
    return get({ url, data });
};
// 党员学习试题提交
export const memberSubmit = async({ url, data }) => {
    return post({ url, data });
};
//获取视频
export const getShow = async({ url, data }) => {
    return post({ url, data })
};
//获取视频评论列表
export const getComment = async({ url, data }) => {
    return post({ url, data })
};
//获取视频发送评论
export const enter = async({ url, data }) => {
    return post({ url, data })
};
//获取报警电话
export const getPolicePhone = async({ data }) => {
    return post({ url: "/CountryAddressList/getContactList", data })
};
//获取新闻详情 无需传地区
export const getNews = async({ data }) => {
    return post({ url: "/information/getOne", data })
};
//获取灾情上报列表
export const DisasterList = async({ currentObject }) => {
    return post({ url: "/baseDict/get", data: { dictType: "urgencyLevel" }, currentObject })
};
//提交灾情上报
export const updateDisaster = async({ data, currentObject }) => {
    return post({ url: "/disaster/reported/insertAndUpdate", data, currentObject })
};
//党员服务---我的任务
export const getMyTask = async({ data, currentObject }) => {
    return post({ url: "/work/mission/appList", data, currentObject })
};
//党员服务--党费收缴
export const getPartyPayList = async({ data }) => {
    return post({ url: "/handan/fee/getUserFeeList", data })
};
//党员服务---我的任务---获取单个任务
export const getTaskDetails = async({ data }) => {
    return post({ url: "work/mission/getOneMisson", data })
};
//党员服务---我的任务---提交任务处理
export const upDataTask = async({ data }) => {
    return post({ url: "/work/mission/finish", data })
};
//退出登录
export const logout = async() => {
    return post({ url: "/logout" })
};
//党员服务---书记信箱
export const mailbox = async({ url, data }) => {
    return post({ url, data })
};
//党员服务---我的组织
export const getMyOrg = async({ data, currentObject }) => {
    return get({ url: "/fun/deptOrg/appOrgInfo", data, currentObject })
};
//党员服务---书记信箱类型
export const getType = async({ data, currentObject }) => {
    return get({ url: "/baseDict/get", data, currentObject })
};
//党员服务---书记信箱提交
export const updata = async({ url, data }) => {
    return post({ url, data })
};
//党员服务---工作手册
export const getManual = async({ data, currentObject }) => {
    return get({ url: '/F_Information/getInformationListApp', data, currentObject })
};
//党员学习-- 治党治国
export const getStudy = async({ data, currentObject }) => {
    return get({ url: '/F_Information/getInformationListApp', data, currentObject })
};
//党员学习-- 党的历程
export const getroad = async({ data, currentObject }) => {
    return get({ url: '/F_Information/getInformationListApp', data, currentObject })
};
//党员学习---三会一课
export const getMeeting = async({ data, currentObject }) => {
    return get({ url: '/NewMeeting/getMeetings', data, currentObject })
};
//党员学习---获取签到会议
export const checkMeeting = async({ data, currentObject }) => {
    return get({ url: '/NewMeeting/checkShouldMeeting', data, currentObject })
};
//党员学习---签到
export const checkin = async({ data, currentObject }) => {
    return get({ url: '/NewMeeting/signInAndLeave', data, currentObject })
};
//党员学习---在线学习
export const getClass = async({ url, data }) => {
    return get({ url, data })
};
//党员学习---在线学习评论
export const getlist = async({ url, data }) => {
    return post({ url, data })
};
//党员学习---在线学习评论发送
export const getSends = async({ url, data }) => {
    return post({ url, data })
};
//党员学习---课程详情
export const getClassDetails = async({ url, data }) => {
    return get({ url, data })
};
//党员学习---获取签到人员
export const getPeople = async({ url, data, currentObject }) => {
    return get({ url, data, currentObject })
};
//党员学习---法规政策
export const getStatute = async({ data, currentObject }) => {
    return get({ url: '/F_Information/getInformationListApp', data, currentObject })
};
//党员学习---规章制度
export const getSystem = async({ data, currentObject }) => {
    return get({ url: '/information/Backstage', data, currentObject })
};
//获取志愿者服务列表
export const getVolunteerList = async({ data, currentObject }) => {
    return get({ url: "/F_Activity/getList", data, currentObject })
};
//成为志愿者
export const become = async({ data }) => {
    return post({ url: "/country/volunteer/insertAndUpdate", data })
};
//志愿者报名
export const VSignIn = async({ data }) => {
    return post({ url: "/F_Activity/signUp", data })
};

//志愿者签到接口

export const getUserPartInfo = async() => {
    return post({ url: "/sys/user/getUserPartInfo" })
};
//获取党员积分详情
export const integerDetails = async() => {
    const data = {
        date: new Date().getFullYear()
    };
    return post({ url: "/exam/funcodeintegral/listMeByDate", data })
};
//获取志愿者活动的详情
export const getVolDel = ({ data }) => {
    return get({ url: "/F_Activity/getOne", data });
};
//当前用户是否是志愿者
export const isPostulant = () => {
    return get({ url: "/country/volunteer/checkVolunteer" })
};
//获取市场信息
export const market = ({ data, currentObject }) => {
    data = {...data, ... { from: true } }
    return post({ url: "/chishui/BazaarInfo/getList", data, currentObject })
};
//获取单条市场详情
export const marketDetails = ({ data, currentObject }) => {
    data = {...data, ... { from: true } }
    return post({ url: "/chishui/BazaarInfo/getOne", data, currentObject })
};
//获取集体经济
export const getCollective = ({ currentObject }) => {
    return get({ url: "/CollectiveEconomy/getList", data: { app: true }, currentObject })
};
//获取集体经济详情
export const getCollectiveDetails = ({ data }) => {
    return get({ url: "/CollectiveEconomy/getOne", data })
};
//获取农机服务视频列表
export const CollectiveStudy = ({ data, currentObject }) => {
    return get({ url: "/F_Information/getInformationListApp", data, currentObject })
};
//获取农机服务农业专家列表
export const getExportList = ({ data, currentObject }) => {
        return get({ url: "/expert/subscribe/getListExpert", data, currentObject })
    }
    // 人才新村--专家预约列表
export const getPerson = async({ url, data }) => {
    return post({ url, data })
};
// 专家预约详情
export const getPersonDetails = async({ url, data }) => {
    return post({ url, data })
};
// 专家预约提交
export const upDataPerson = async({ url, data }) => {
    return post({ url, data })
};
// 大学生、人才库
export const getCollege = async({ url, data }) => {
    return post({ url, data })
};
// 大学生、人才库详情
export const getCollegeDetails = async({ url, data }) => {
    return post({ url, data })
};
// 大学生、人才库申请上榜
export const upApply = async({ url, data }) => {
    return post({ url, data })
};
//获取农技服务视频评论
export const exComment = async({ data }) => {
    return get({ url: "/F_Information/getComment", data })
};

//发送农技服务视频评论
export const updateComment = async({ data }) => {
    return get({ url: "/F_Information/saveComment", data })
};
//农技服务专家详情
export const expertDetails = async({ data }) => {
    return get({ url: "/expert/subscribe/getOneExpert", data })
};
//获取产业列表
export const getMapList = async({ data, currentObject }) => {
    return get({ url: "/industry/map/getList", data, currentObject });
};
//获取单条产业详情
export const getEstateDetails = async({ data }) => {
        data = {...data, ... { from: true } };
        return get({ url: "/industry/map/getOne", data })
    }
    // 修改密码
export const upPwd = async({ url, data }) => {
    return post({ url, data })
};
// 人物评选
export const getVote = async({ url, data }) => {
    return post({ url, data })
};
// 幸福分享
export const getHapply = async({ url, data }) => {
    return post({ url, data })
};
// 幸福分享详情
export const getHapplyDetails = async({ url, data }) => {
    return post({ url, data })
};
// 幸福分享关注
export const getHapplyFollow = async({ url, data }) => {
    return post({ url, data })
};
// 幸福分享评论列表
export const getCommentList = async({ url, data }) => {
    return post({ url, data })
};
// 幸福分享发送评论
export const sendComment = async({ url, data }) => {
    return post({ url, data })
};
// 幸福分享--发布文章
export const sendPublishArticles = async({ url, data }) => {
    return post({ url, data })
};
//组织建设-书记考核
export const outRate = async({ url, data }) => {
        return get({ url, data })
    }
    //产业富村>农技服务
export const getEsVideo = async({ data }) => {
        return get({ url: '/information/getOne', data })
    }
    // 党员服务 > 书记信箱 > 民意详情
export const getmingyi = async({ data }) => {
        return post({ url: '/peopleOpinion/get', data })
    }
    //党员学习>在线学习>增加积分
export const saveVideo = async({ data }) => {
    return post({ url: '/exam/funcodeintegral/save', data })
}