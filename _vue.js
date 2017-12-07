/*!
 * _vue Library v1.0.0
 * 
 * 沒有錯誤檢查
 * 沒有list的解決方案
 * 沒有優美的風格
 * 沒有效能
 * 沒有虛擬dom
 * 沒有事件綁定
 * 沒有子元件
 * 沒有的很多 但是不影響我的自我感覺良好
 * Released under the MIT license
 *
 * Date: 2017-12-7T13:56Z
 */


function _vue(obj) {
  this.id = obj.domId;
  this.template = obj.template;
  this.state = {};
  this.render = function (dataObj) {
    var rsHtml = this.template;
    for (var key in dataObj) {
      var reg = new RegExp('{' + key + '}', 'g')
      rsHtml = rsHtml.replace(reg, dataObj[key]);
    };
    return rsHtml;
  }
  this.change = function (data) {
    for (var key in data) {
      this.state[key] = data[key];
    }
    document.getElementById(this.id).innerHTML = this.render(this.state);
  }

  for (var key in obj.data) {
    this.state[key] = obj.data[key];
  }
  this.change();
}


// Examples
//
// var app = new _vue({
//     domId:'div',
//     template:'<h1>{title}</h1><h4>{body}</h4>',
//     data:{
//         title:'fghjkl',
//         body:'0987654321'
//     }
// });
//
// app.change({
//     title:'ASDFGHJK',
//     body:'123456789'
// });
//
// app.change({
//     title:'ggggg',
// });
