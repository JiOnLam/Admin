module.exports = (req, res) => {
    // console.log(req.body)
    // res.send('登录界面');

    //根据邮箱查询用户信息
    api.findData('User', {
        userId: req.userId
    }, ['nickName', 'avatar']).then(result => {
        // console.log(result);
        res.send({ msg: '查询用户信息成功', status: 1400, data: result, staticUrl: `${config.staticBaseUrl.url}${config.staticBaseUrl.base}/userImgs/` });
    }).catch(err => {
        console.log(err);
        res.send({ msg: '查询用户信息失败', status: 1401 });
    })
}