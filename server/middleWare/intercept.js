//中间件层

const utils = require("../utils/utils");

//导入请求域白名单
const hostList = require(path.resolve(__basename, 'whiteList/hostList.js'));

//导入验证码白名单
const codeList = require(path.resolve(__basename, 'whiteList/codeList.js'));


//导入token白名单
const tokenList = require(path.resolve(__basename, 'whiteList/tokenList.js'));

//拦截层
module.exports = app => {

    //CORS 跨域资源共享
    //app.all(*)表示所有请求路径必须经过
    app.all('*', (req, res, next) => {

        console.log(req.headers);
        //允许指定域名请求
        // res.header("Access-Control-Allow-Origin", "http://192.168.31.211:5500");

        //动态允许域名请求
        res.header("Access-Control-Allow-Origin", req.headers.origin);

        //*表示允许所有域请求，在实际开发中，一般指定允许某个域请求，如上面设置
        // res.header("Access-Control-Allow-Origin", "*");

        //如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。
        res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type,token");

        //该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

        //该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可
        // res.header('Access-Control-Allow-Credentials', true);

        next();

    });

    //检测OPTIONS嗅探
    app.use((req, res, next) => {
        // console.log("req.method==>", req.method);
        if (req.method == "OPTIONS") {
            res.send(true);
        } else {
            next();
        }

    })

    //请求域拦截层
    app.use((req, res, next) => {
        // console.log('req.headers.origin=>', req.headers.origin);

        if (hostList.indexOf(req.headers.origin) > -1) {
            //当前请求域存在hostList白名单
            //将请求传递给下一个中间件或者路由
            next();
        } else {
            res.send({ msg: '请求域不合法', status: 0 });
        }
    })

    //验证码拦截
    app.use((req, res, next) => {

        let url = req.url.split('?')[0];
        if (codeList.indexOf(url) > -1) {
            //需要验证验证码

            let params = req.body.codeId ? req.body : req.query;


            if (!params.codeId) {
                return res.send({ msg: '验证码错误', status: 1021 });
            }

            //如果存在codeId,则需要根据获取验证码的邮箱、codeId、验证码的有效时间验证码

            //根据codeId查询当前验证码
            api.findData('Code', {
                codeId: params.codeId
            }).then(result => {
                if (result.length == 0) {
                    return res.send({ msg: '验证码不存在', status: 1035 })
                }
                let data = result[0].dataValues;
                if (data.email != params.email) {
                    res.send({ msg: '该邮箱与接收验证码邮箱不符', status: 1032 })
                } else if (data.code != params.validCode) {
                    res.send({ msg: '验证码错误', status: 1033 })
                } else {
                    //验证码验证是否在5分钟内有效
                    let time = new Date().getTime() - config.codeOptions.expires * 60 * 1000;
                    let codeTime = new Date(data.createdAt);

                    //创建验证码的时间
                    if (codeTime >= time) {
                        next();
                    } else {
                        res.send({ msg: '验证码已过期', status: 1034 })
                    }
                }
            }).catch(err => {
                console.log(err);
                res.send({ msg: '验证码错误', status: 1031 })
            })
        } else {
            console.log('无需验证验证码，通过');
            next();
        }
    })

    //token拦截
    app.use((req, res, next) => {
        // console.log(req)
        let url = req.url.split('?')[0];
        if (tokenList.indexOf(url) > -1) {
            //截取请求头
            let token = req.headers.token;
            // console.log(token)
            //解析token
            let t = utils.transformCookie(token);
            // console.log(t)

            if (!t) {
                res.send({ msg: '请先登录', status: 1050 });
            }

            //获取有效的cookie信息
            let tk = [];
            config.tokenOptions.keys.forEach(v => {
                tk.push(t[v])
            })
            tk = tk.join('.');


            //解析token
            utils.verifyToken(tk).then(result => {
                console.log('result==>', result)

                //将userId挂在req,传递给下一个中间件或者路由
                req.userId = result.data;
                next();
            }).catch(err => {
                console.log(err);
                res.send({ msg: '请先登录', status: 1050 })
            })
        } else {
            console.log('无需验证token');
            next();
        }
    })

}