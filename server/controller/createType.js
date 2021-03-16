//manage


//创建商品类型
module.exports = (req, res) => {
    // console.log('req.userId==>', req.userId);
    // console.log('req.body==>', req.body);
    //创建商品类型id
    let typeId = 't_'+new Date().getTime();
    //启动事务处理
    api.transactionData(async t=>{
        
        //创建商品类型基础数据
        await api.createData('Type',{
            name:req.body.name,
            status:Number(req.body.status),
            typeId
        },t)
        
        //创建商品类型和用户的关系
        await api.createData('UserType',{
            userId:req.userId,
            typeId
        },t)
    }).then(()=>{
        res.send({msg:'创建商品类型成功',status:1060});
    }).catch(err=>{
        console.log('createType err=>',err)
        res.send({msg:'创建商品类型失败',status:1061})
    })
    
}