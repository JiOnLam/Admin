class Tool {
    //格式化日期
    formatDate(data, format) {


        let date = null;
        if (Object.prototype.toString.call(data) === "[Object Date]") {
            date = data;
        } else {
            date = new Date(data);
        }

        let year = date.getFullYear().toString();

        if (/(y+)/.test(format)) {
            let yearContent = RegExp.$1;
            format = format.replace(yearContent, year.slice(year.length - yearContent.length));

        }

        let dateObject = {
            M: date.getMonth() + 1,
            d: date.getDate(),
            h: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds(),
        }
        for (let key in dateObject) {
            let reg = new RegExp(`(${key}+)`);
            // console.log(reg)
            if (reg.test(format)) {
                let content = RegExp.$1;

                format = format.replace(content, dateObject[key] >= 10 ? dateObject[key] : content.length === 2 ? '0' + dateObject[key] : dateObject[key])
            }
        }

        return format;
    }
}


export const tool = new Tool();