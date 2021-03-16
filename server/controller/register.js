
//测试
module.exports = (req, res) => {

  //查询邮箱是否被注册
  api.findData('User', {
    email: req.body.email
  }).then(result1 => {
    //如果邮箱没被注册过,则执行注册
    if (result1.length == 0) {

      let userId = 'u_' + new Date().getTime();

      //加密密码
      let password = utils.encodeString(req.body.password);

      //随机生成一个昵称
      let nickName = utils.getRandomElement(config.nickNameOptions);

      //将数据写入到mysql的user表中
      api.createData('User', {
        userId,
        email: req.body.email,
        password,
        nickName
      }).then(result => {
        // console.log('register result=>', result)
        res.send({ msg: '注册成功', data: result, status: 1000 })
      }).catch(err => {
        console.log('err=>', err);
        console.log({ msg: '注册失败', status: 1001 })
      })

    } else {
      res.send({ msg: '该邮箱已被注册', status: 1002 });
    }
  }).catch(err => {
    console.log('find err =>', err)
  })


}