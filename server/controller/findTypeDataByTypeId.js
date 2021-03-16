//manage

//根据typeId查询商品类型数据
module.exports = (req, res) => {

    api.findData('Type', {
        typeId: req.query.typeId,
        remove: 0
    }, ['name', 'status']).then(result => {
        res.send({ msg: '查询商品类型数据成功', status: 1090, data: result })

    }).catch(err => {
        res.send({ msg: '查询商品类型数据失败', status: 1091 })
    })
}

