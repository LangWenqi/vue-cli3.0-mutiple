import qs from 'qs'
import { TokenKeys } from '@/common/js/variable'
//获取字体宽度换行
export function measureCanvasFont(text, maxWidth, fontSize) {
  let measureCanvas = document.createElement("canvas");
  let measureCtx = measureCanvas.getContext("2d");
  if (!text) {
    return [];
  }
  let chr = text.split("");
  let temp = "";
  let row = [];
  for (var a = 0; a < chr.length; a++) {
    if (measureCtx.measureText(temp).width < maxWidth - 2 * fontSize) {
      temp += chr[a];
    } else {
      a--;
      row.push(temp);
      temp = "";
    }
  }
  row.push(temp);
  measureCtx = null;
  measureCanvas - null;
  return row
}
//表情转换编码
export function utf16toEntities(str) {
  if (!str) {
    return str
  }
  var patt = /[\ud800-\udbff][\udc00-\udfff]/g;
  // 检测utf16字符正则
  str = str.replace(patt, function (char) {
    var H, L, code;
    if (char.length === 2) {
      H = char.charCodeAt(0);
      // 取出高位
      L = char.charCodeAt(1);
      // 取出低位
      code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00;
      // 转换算法
      return "&#" + code + ";";
    } else {
      return char;
    }
  });
  return str;
};
//表情转换解码
export function entitiestoUtf16(str) {
  if (!str) {
    return ''
  }
  // 检测出形如&#12345;形式的字符串
  var strObj = utf16toEntities(str);
  var patt = /&#\d+;/g;
  var H, L, code;
  var arr = strObj.match(patt) || [];
  for (var i = 0; i < arr.length; i++) {
    code = arr[i];
    code = code.replace('&#', '').replace(';', '');
    // 高位
    H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
    // 低位
    L = (code - 0x10000) % 0x400 + 0xDC00;
    code = "&#" + code + ";";
    var s = String.fromCharCode(H, L);
    strObj = strObj.replace(code, s);
  }
  return strObj;
};
export function getHtmlData(str) {
  if (!str) {
    return '';
  }
  let newStr = entitiestoUtf16(str).replace('<', '&lt;').replace('>', '&gt;').replace(/\n|\r\n/g, "<br>").replace(/[ ]/g, "&nbsp;");
  return newStr;
};
export function getType(obj) {
  let toString = Object.prototype.toString;
  let map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
};
export function getQsParse(str) {
  let strs = getType(str) == 'string' ? str : location.href.split('?')[1];
  return qs.parse(strs);
}


export function getQsString(obj) {
  let objs = getType(obj) == 'object' ? obj : {};
  return qs.stringify(objs);
};
export function deepClone(data) {
  let type = getType(data);
  let obj;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    return data;
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (let key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};
export function sort(a, b) {
  if (a > b) {
    return 1
  } else if (a < b) {
    return -1
  } else {
    return 0
  }
};
//验证手机号
export function checkPhone(mobile) {
  let reg = /(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[3456789]\d{9})$)/;
  return reg.test(mobile)
};
export function checkExpression(str) {
  let emoji = /[\ud800-\udbff][\udc00-\udfff]/;
  //   let reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
  if ((!str) || emoji.test(str) || (str.trim() === '')) {
    return false;
  }
  return true;
}
/**
 * author:langwenqi
 * date: 2018/5/20
 * describe:验证手机号
 * params:{
 *
 * }
 **/
export function checkMobile(mobile) {
  let reg = /^1[0-9]{10}$/;
  return reg.test(mobile)
};

//找到对象摸个属性并删除
export function deleteObjPrototype(obj = {}, p) {
  if (!obj[p]) return obj;
  delete obj[p];
  return obj;
}
//提取html图片src
export function getHtmlImg(strs) {
  let imgReg = /<img.*?(?:>|\/>)/gi;
  let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
  let arr = [];
  if (strs && strs.trim()) {
    arr = strs.match(imgReg);
  }
  console.log('所有已成功匹配图片的数组：' + arr);
  let arr_src = [];
  if (arr) {
    for (var i = 0; i < arr.length; i++) {
      var src = arr[i].match(srcReg);
      //获取图片地址
      if (src[1]) {
        arr_src.push(src[1])
      }
    }
  }
  console.log('截取html生成的数组')
  console.log(arr_src)
  return arr_src;
}

//显示放大图
export function preverImg(index = 0, imgUrl = []) {
  wx.previewImage({
    current: imgUrl[index], // 当前显示图片的http链接
    urls: imgUrl // 需要预览的图片http链接列表
  })
}
//分享传递小程序信息
export function postShareMessage(postData = {
  title: 'AiCard',
  img: '',
  path: ''
}) {
  wx.miniProgram.postMessage({ data: postData })
}
//跳转到小程序

export const navigator={
  push(obj={},ifEncode=false){
    wx.miniProgram.navigateTo({
      url:`${obj.url}?${qs.stringify(obj.query?obj.query:{},{ encode: ifEncode })}`
    })
  },
  redirect(obj={},ifEncode=false){
    wx.miniProgram.navigateTo({
      url:`${obj.url}?${qs.stringify(obj.query?obj.query:{},{ encode: ifEncode })}`
    })
  },
  switch(url){
    wx.miniProgram.switchTab({url:url})
  }
}
//判断是否为iphone X
export function isIPhoneX() {
  var u = navigator.userAgent;
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isIOS) {
    if (screen.height == 812 && screen.width == 375) {
      //是iphoneX
      return true;
    } else {
      //不是iphoneX
      return false;
    }
  }
}
//无头像获取默认头像
export function getDefaultImg(url) {
  return url ? url : TokenKeys.DEFAULT_USER_PHOTO;
}

//计算字符串字节数
export function getBytesLength(str) {
  // 在GBK编码里，除了ASCII字符，其它都占两个字符宽
  return str.replace(/[^\x00-\xff]/g, 'xx').length;
}

//
export function getStr(str, len, ellipsis = false) {
  if (!str) return ''
  var regexp = /[^\x00-\xff]/g;// 正在表达式匹配中文
  // 当字符串字节长度小于指定的字节长度时
  if (str.replace(regexp, "aa").length <= len) {
    return str;
  }
  // 假设指定长度内都是中文
  var m = Math.floor(len / 2);
  for (var i = m, j = str.length; i < j; i++) {
    // 当截取字符串字节长度满足指定的字节长度
    if (str.substring(0, i).replace(regexp, "aa").length >= len) {
      if (!ellipsis) {
        return str.substring(0, i) + '...';
      } else {
        return str.substring(0, i);
      }
    }
  }
  return str;
}
//判断是否为大于0整数，用于库存判断
export function isInteger(str) {
  var reg = /^\+?[1-9]\d*$/;
  return reg.test(str)
}
//判断是否为整数，用于价格
export function isPositiveNumber(str) {
  var reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
  return reg.test(str)

}
// 精确乘法
export function mul(arg1 = 0, arg2 = 0) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  }
  catch (e) {
  }
  try {
    m += s2.split(".")[1].length;
  }
  catch (e) {
  }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

// 精确除法
export function div(arg1 = 0, arg2 = 1) {
  var t1 = 0, t2 = 0, r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  }
  catch (e) {
  }
  try {
    t2 = arg2.toString().split(".")[1].length;
  }
  catch (e) {
  }
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}
//旋转图片
export function rotateImage(image) {
  console.log('rotateImage');
  var width = image.width;
  var height = image.height;

  var canvas = document.createElement("canvas")
  var ctx = canvas.getContext('2d');

  var newImage = new Image();
  let imageDate;
  //旋转图片操作
  EXIF.getData(image,function () {
      var orientation = EXIF.getTag(this,'Orientation');
      // orientation = 6;//测试数据
      console.log('orientation:'+orientation);
      switch (orientation){
        //正常状态
        case 1:
          console.log('旋转0°');
          // canvas.height = height;
          // canvas.width = width;
          newImage = image;
          break;
        //旋转90度
        case 6:
          console.log('旋转90°');
          canvas.height = width;
          canvas.width = height;
          ctx.rotate(Math.PI/2);
          ctx.translate(0,-height);

          ctx.drawImage(image,0,0)
          imageDate = canvas.toDataURL('Image/jpeg',1)
          newImage.src = imageDate;
          break;
        //旋转180°
        case 3:
          console.log('旋转180°');
          canvas.height = height;
          canvas.width = width;
          ctx.rotate(Math.PI);
          ctx.translate(-width,-height);

          ctx.drawImage(image,0,0)
          imageDate = canvas.toDataURL('Image/jpeg',1)
          newImage.src = imageDate;
          break;
        //旋转270°
        case 8:
          console.log('旋转270°');
          canvas.height = width;
          canvas.width = height;
          ctx.rotate(-Math.PI/2);
          ctx.translate(-height,0);

          ctx.drawImage(image,0,0)
          imageDate = canvas.toDataURL('Image/jpeg',1)
          newImage.src = imageDate;
          break;
        //undefined时不旋转
        case undefined:
          console.log('undefined  不旋转');
          newImage = image;
          break;
        case 0:
          console.log('0  不旋转');
          newImage = image;
          break;
        default:
          newImage = image;
          break;
      }
    }
  );
  return newImage;
}

//限制只能输入中文英文数字
export function changeTxt(txt) {
  return txt.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')
}

export const drawImg = (obj = {
  url: '',
  top: '',
  left: '',
  width: '',
  height: '',
  orgWidth: '',
  orgHeight: '',
  canvasWidth:'',
  canvasHeight:'',
  ifFit: false
}) => {
  let top = obj.top;
  let left = obj.left;
  let width = obj.width;
  let height = obj.height;
  console.log(width,height)

  let canvas = document.createElement("canvas")
  let ctx = canvas.getContext('2d');
  let initOne = () => {
    height = obj.height;
    width = obj.orgWidth * obj.height / obj.orgHeight;
    top = obj.top;
  }
  let initTwo = () => {
    width = obj.width;
    height = obj.orgHeight * obj.width / obj.orgWidth;
    left = obj.left;
  }
  if (obj.ifFit) {
    if (obj.orgWidth / obj.orgHeight > obj.width / obj.height) {
      initTwo();
      top = obj.top + (obj.height - height) / 2;
    } else {
      initOne();
      left = obj.left + (obj.width - width) / 2;
    }
  } else {
    if (obj.orgWidth / obj.orgHeight > obj.width / obj.height) {
      initOne();
      left = obj.left - (width - obj.width) / 2;
    } else {
      initTwo();
      top = obj.top - (height - obj.height) / 2;
    }
  }
  canvas.height =obj.canvasHeight;
  canvas.width = obj.canvasWidth;
  ctx.drawImage(obj.url, left, top,width,height);
  console.log(canvas)
  let url = canvas.toDataURL("image/png").replace("image/png","image/octet-stream");
  return url
}

