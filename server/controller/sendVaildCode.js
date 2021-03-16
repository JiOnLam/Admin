//manage



//发送验证码
module.exports = (req, res) => {

    let code = utils.createVaildCode(6);
    let codeId = 'c_' + new Date().getTime();

    // 先保存验证码到数据库，再发邮件
    api.createData('Code', {
        code,
        email: req.body.email,
        codeId
    }).then(result1 => {
        
        //测试
        // console.log(result1);
        // res.send({ msg: '发送验证码成功', status: 1010, data: { codeId: result1.dataValues.codeId } })
        // return;

        //开发测试时要屏蔽发邮件
        utils.sendEmail({
            from: config.emailOptions.user, // 发件者地址
            to: req.body.email, // 接收邮件地址
            subject: "后台管理系统", // 邮件主题
            text: `验证码为: ${code}, ${config.codeOptions.expires}分钟有效`, // 邮件内容
        }).then(result => {
            res.send({ msg: '发送验证码成功', status: 1010, data: { codeId: result1.dataValues.codeId } });
        }).catch(err => {
            res.send({ msg: '发送验证码失败', status: 1011 })
        })
    }).catch(err1 => {
        res.send({ msg: '发送验证码失败', })
    })


}