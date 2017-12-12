/*!
 * _vue Library v1.0.1
 * 我都覺得我快要可以登陸月球了
 * Date: 2017-12-7T13:56Z
 */

function _vue(obj) {
  this.id = obj.domId;
  this.template = document.getElementById(this.id).innerHTML;
  this.state = {};
  this.render = function (template,dataObj) {
      var rsHtml = template;
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
      document.getElementById(this.id).innerHTML = this.render(this.template, this.state);
      this.componentBind();
  }
  this.componentBind = function(){
      var __vue = this.constructor;
      var render = this.render;
      for (var key in __vue.comTemplate) {
          var comTemplate = __vue.comTemplate[key];
          document.querySelectorAll('#' + this.id + ' ' + key).forEach(function (el, index) {
              console.log('-------',el.attributes[0]);
              var data = {};
              for(var i = 0; i < el.attributes.length; i++ ){
                  console.log(el.attributes[i].name,el.attributes[i].value)
                  data[el.attributes[i].name] = el.attributes[i].value;
              }
              el.innerHTML = render(comTemplate,data);
          })
      }
  }

  for (var key in obj.data) {
      this.state[key] = obj.data[key];
  }
  this.change();
}

_vue.comTemplate = {};
_vue.component = function(obj) {
  this.comTemplate[obj.el] = obj.template;
};

// Examples
//

<div id="app">
  <h4>{title}</h4>
  <p>{body}</p>
  <vue body=""></vue>
</div>

var app = _vue.component({
    el:'vue',
    template:'<p>{body}</p>'
});

var app = new _vue({
    domId:'div',
    data:{
        title:'HELLO',
        body:'_vue.js'
    }
});

app.change({
    title:'ASDFGHJK',
    body:'123456789'
});

// app.change({
//     title:'ggggg',
// });
