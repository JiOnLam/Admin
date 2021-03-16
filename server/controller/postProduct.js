//manage

//创建商品类型
module.exports = (req, res) => {

     //01-上传商品图片，等待所有图片都上传完毕，再执行其他sql语句将商品数据写入数据库里面
     //02-将商品基础数据写入商品数据表中
     //03-将商品和类型写入商品、类型关系表
     //04-将商品和用户写入商品、用户关系表

     let imgPromise = [
          utils.uploadImg(req.body.img, req.body.imgType),
          utils.uploadImg(req.body.detailImg, req.body.detailImgType),
     ]

     //处理所有图片都上传完毕后，再执行其他逻辑
     Promise.all(imgPromise).then((result) => {
          let typeId = req.body.typeId;
          req.body.img = result[0];
          req.body.detailImg = result[1];
          delete req.body.imgType;
          delete req.body.detailImgType;
          delete req.body.typeId;
     
          //生成商品id
          let proId = 'pro_' + new Date().getTime();
          //启动事务处理
          api.transactionData(async t => {
               //将商品基础数据写入商品数据表中
               await api.createData('Product', { ...req.body, proId }, t);
               //将商品和类型写入商品、类型关系表
               await api.createData('ProductType', { proId, typeId }, t);
               //将商品和用户写入商品、用户关系表
               await api.createData('UserProduct', { proId, userId: req.userId }, t);
          }).then(() => {
               res.send({ msg: '发布商品成功', status: 1500 })
          }).catch(err => {
               console.log(err);
               res.send({ msg: '发布商品失败', status: 1501 })
          })

     }).catch(err => {
          console.log(err)
          res.send({ msg: '发布商品失败', status: 1501 })
     });


}