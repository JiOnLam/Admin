//工具库
//工具库(公共方法)

//导入crypto加密模块
const crypto = require('crypto');

//导入jsonwebtoken模块签名token
const jsonwebtoken = require('jsonwebtoken');

//导入nodemailer模块发邮件
const nodemailer = require('nodemailer');

//导入文件系统模块(核心模块)
const fs = require('fs');


//导入uuid模块
const uuid = require('uuid');
const { resolve } = require('path');
const { resolveSoa } = require('dns');

//创建发邮件实例
let transporter = nodemailer.createTransport({
    host: config.emailOptions.host,
    port: config.emailOptions.port,
    secure: config.emailOptions.secure, // true for 465, false for other ports
    auth: {
        user: config.emailOptions.user, // 邮箱地址
        pass: config.emailOptions.pass, // 授权码
    },
});


class Utils {
    //加密字符串
    encodeString(value) {
        //创建md5加密方法
        let md5 = crypto.createHash('md5');

        //加密字符串
        let encode = md5.update(`${config.saltOptions.password}${value}`);

        //以hex(十六进制)输出，十六进制不能超过f 有效范围 0-f
        return encode.digest('hex');//输出32位加密的字符串
    }

    //发验证码到指定邮箱
    sendEmail(options) {
        //options:配置选项 
        return new Promise((resolve, reject) => {
            transporter.sendMail(options, (err, info) => {
                if (err) {
                    //失败
                    reject(err);
                } else {
                    //成功
                    resolve(info); 1
                }
            })
        })
    }

    //随机生成验证码
    createVaildCode(n) {
        //n:验证码字符数量，number
        let chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        let codes = [];
        for (let i = 0; i < n; i++) {
            let randomIndex = Math.floor(Math.random() * chars.length);
            codes.push(chars[randomIndex]);
        }
        return codes.join("");
    }

    //签名token
    signToken(value) {
        //value:签名字符串,String
        return jsonwebtoken.sign({
            data: value
        }, config.saltOptions.token, {
            expiresIn: config.tokenOptions.expires
        })

    }

    //解析token
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            jsonwebtoken.verify(token, config.saltOptions.token, (err, decoded) => {
                if (err) {
                    //token解析失败
                    reject(err);
                } else {
                    //token解析成功
                    resolve(decoded)
                }
            })
        })
    }

    //将cookie转换成普通对象
    transformCookie(cookie) {
        let cookies = cookie.split('; ');
        //    console.log(cookies)
        if (cookies.length == 0) {
            return null;
        }
        let cookieObject = {}
        cookies.forEach(v => {
            let c = v.split('=');
            cookieObject[c[0]] = c[1]
        })

        return cookieObject;
    }

    //随机在数组获取一个元素
    getRandomElement(arr) {
        let randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    }

    //上传图片
    uploadImg(imgBase64, type) {


        return new Promise((resolve, reject) => {
            //创建Buffer将文件信息转成二进制文件
            // let buffer = Buffer.from(文件信息,'base64');
            let buffer = Buffer.from(imgBase64, 'base64');

            //创建文件名称
            let filename = uuid.v1() + `.${type}`;
            //将buffer写入服务器中
            // fs.writeFile(写入文件保存的路径,buffer,err=>{})
            let fileUrl = path.resolve(__basename, `upload/proImgs/${filename}`);
            console.log(fileUrl)
            fs.writeFile(fileUrl, buffer, err => {
                if (err) {
                    //如果上传图片失败
                    reject(err);
                } else {
                    resolve(filename);
                }
            })
        })

    }
}

module.exports = new Utils();