//manage

//根据typeId编辑商品类型数据
module.exports = (req, res) => {
 
    let typeId = req.body.typeId;
    delete req.body.typeId;
    api.updateData('Type', req.body, {
        typeId,
        remove:0
    }).then(result => {
        res.send({ msg: '编辑商品类型数据成功', status: 1100, data: result })
    }).catch(err => {
        res.send({ msg: '编辑商品类型数据失败', status: 1101 })
    })
}