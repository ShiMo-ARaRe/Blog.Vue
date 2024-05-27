// 这段代码是一个 JavaScript 工具模块,提供了几个常用的函数和工具。

//这是一个正则表达式,用于匹配日期格式字符串中的年(y)、月(M)、日(d)、时(h)、分(m)、秒(s)等占位符。
var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
//这是一个默认的日期格式模式,用于在未指定格式时的日期格式化。
var DEFAULT_PATTERN = 'yyyy-MM-dd';
//这是一个用于为数字值添加前导零的辅助函数。它会根据指定的长度 len 在字符串 s 前面添加零。
function padding(s: string, len: number) {
    var leng = len - (s + '').length;
    len=leng;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};

// 这是导出的默认对象,包含了几个常用的工具函数:
export default {
    //这个函数用于从当前 URL 的查询字符串中获取指定名称的参数值。
    getQueryStringByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },

    formatDate: {

        //这个函数用于根据指定的格式模式,格式化给定的日期对象。
        //如果未指定格式模式,则使用默认的 DEFAULT_PATTERN。
        //该函数会遍历格式模式字符串,并根据每个占位符替换为相应的日期值。
        format: function (date, pattern:string) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y': return padding(date.getFullYear(), $0.length);
                    case 'M': return padding(date.getMonth() + 1, $0.length);
                    case 'd': return padding(date.getDate(), $0.length);
                    case 'w': return date.getDay() + 1;
                    case 'h': return padding(date.getHours(), $0.length);
                    case 'm': return padding(date.getMinutes(), $0.length);
                    case 's': return padding(date.getSeconds(), $0.length);
                }
            });
        },

        // 这个函数用于根据指定的格式模式,解析给定的日期字符串。
        // 该函数会通过匹配格式模式和日期字符串中的值,创建并返回一个新的 Date 对象。
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y': _date.setFullYear(_int); break;
                        case 'M': _date.setMonth(_int - 1); break;
                        case 'd': _date.setDate(_int); break;
                        case 'h': _date.setHours(_int); break;
                        case 'm': _date.setMinutes(_int); break;
                        case 's': _date.setSeconds(_int); break;
                    }
                }
                return _date;
            }
            return null;
        }

    },
    // 这个函数用于检查给定的对象是否为空(undefined、null 或空字符串)。
    // 如果对象为空,则返回 true；否则返回 false。
    isEmt:{
        format: function (obj) {
            if(typeof obj == "undefined" || obj == null || obj == ""){
                return true;
            }else{
                return false;
            }
        },
    }

};
