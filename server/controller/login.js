

module.exports = (req, res) => {
    // console.log(req.body)
    // res.send('登录界面');

    //根据邮箱查询用户信息
    api.findData('User', {
        email: req.body.email
    }, ['userId', 'password']).then(result => {
        // console.log(result);
        //如果用户不存在
        if (result.length == 0) {
            res.send({ msg: '邮箱未注册', status: 1042 });
        } else {
            //如果用户存在，则验证密码是否正确
            let password = utils.encodeString(req.body.password);

            if (password == result[0].dataValues.password) {
                //登录成功,以userId签名一个token
                let token = utils.signToken(result[0].dataValues.userId);
                //将token切片
                let tokens = token.split('.');
                let ts = {
                    rtsts: 'e5cIkpXVyJhbGcXRhRCJ4ICI6joidV2iIsIn',
                    gidsf: 'eyJhbGcXRhICI6joidV8iIsInR5cIkpXVCJ9'
                };
                config.tokenOptions.keys.forEach((v, i) => {
                    ts[v] = tokens[i]
                })
                res.send({ msg: '登录成功', status: 1041, data: ts });
            } else {
                res.send({ msg: '邮箱或者密码不正确', status: 1043 });
            }
        }
    }).catch(err => {
        console.log(err);
        res.send({ msg: '登陆失败', status: 1040 })
    })
}