//根据proId编辑商品数据


module.exports = (req, res) => {
    console.log(req.body);
    // res.send("ok")

    //01-没有图片，没有类型，只有商品基础数据，只修改Product模型数据
    //02-没有图片，没有商品基础数据，只有商品类型，只修改ProductType模型数据
    //03-没有商品基础数据，没有类型，只有图片，先上传图片，再将上传的图片名称写入Product模型

    //更新商品函数
    function updateProduct() {
        //启动事务处理
        api.transactionData(async t => {
            //t:事务处理对象


            //判断是否存在类型
            if (typeId) {
                delete req.body.typeId;

                //需要修改ProductType模型数据
                await api.updateData('ProductType', {
                    typeId
                }, {
                    proId
                })
            }

            //判断是否存在商品基础数据
            if (JSON.stringify(req.body) != '{}') {
                //修改商品基础数据
                await api.updateData('Product', req.body, {
                    proId
                })
            }
        }).then(result => {
            res.send({ msg: '编辑商品成功', status: 1930, data: result })
        }).catch(error => {
            res.send({ msg: '编辑商品失败', status: 1931 })
        })

    }

    //保存proId
    let proId = req.body.proId;
    delete req.body.proId;

    //商品类型typeId
    let typeId = req.body.typeId;

    //获取图片信息
    let imgName = ['img', 'detailImg'];
    let imgs = [];
    let imgFlag = [];
    imgName.forEach(v => {
        if (req.body[v]) {
            //处理图片上传
            imgs.push(
                utils.uploadImg(req.body[v], req.body[v + 'Type'])
            )
            //保存图片的标记，以便标记上传图片的类型(区分大小图)
            imgFlag.push(v)
            delete req.body[v + 'Type'];
        }
    })

    //判断是否存在图片
    let keys = Object.keys(imgs);
    if (keys.length == 0) {
        //没有图片
        updateProduct();

    } else {
        //存在图片

        //先上传图片，待上传完毕图片后，判断是否存在商品类型，判断是否存在商品基础

        Promise.all(imgs).then(result => {
            imgFlag.forEach((v, i) => {
                req.body[v] = result[i];
            })
            updateProduct();
        })

    }
}