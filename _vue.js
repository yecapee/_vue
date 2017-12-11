/*!
 * _vue Library v1.0.0
 * 
 * Date: 2017-12-7T13:56Z
 */


function _vue(obj) {
  this.id = obj.domId;
  this.template = document.getElementById(this.id).innerHTML;
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
//     data:{
//         title:'fghjkl',
//         body:'0987654321'
//     }
// });

// app.change({
//     title:'ASDFGHJK',
//     body:'123456789'
// });

// app.change({
//     title:'ggggg',
// });
