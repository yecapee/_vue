/*!
 * _vue Library v1.0.1
 * 我都覺得我快要可以登陸月球了
 * Date: 2017-12-7T13:56Z
 */

(function (global) {
  var eventType = {
    'v-click': function(el,event){
      el.addEventListener("click", event);
    },
    'v-change': function(el,event){
      el.addEventListener("onchange", event);
    },
  };

  var vMethods = {
    'v-for': function(el,data){
      // console.log(el,data,this);
      var template = el.innerHTML;
      var dataObj = this.state[data];
      var rs = '';
      for(var key in dataObj){
        rs += this.render(template,dataObj[key]);
      }
      el.innerHTML = rs;
    }
  }

  function _vue(obj) {
      this.id = obj.domId;
      this.template = document.getElementById(this.id).innerHTML;
      this.state = {};
      this.event = {};
      this.render = function (template, dataObj) {
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

          for(var key in vMethods){
            document.querySelectorAll('#'+this.id+' ['+key+']').forEach(function(el,index){
              for (var i = 0; i < el.attributes.length; i++) {
                if(el.attributes[i].name){
                  vMethods[el.attributes[i].name].bind(this)(el,el.attributes[i].value);
                }
              }
            }.bind(this))
          }

          for(var key in eventType){
            document.querySelectorAll('#'+this.id+' ['+key+']').forEach(function(el,index){
              for (var i = 0; i < el.attributes.length; i++) {
                if(el.attributes[i].name){
                  eventType[el.attributes[i].name](el, this.event[el.attributes[i].value].bind(this) );
                }
              }
            }.bind(this))
          }
          
          this.componentBind();
      }
      this.componentBind = function () {
          var __vue = this.constructor;
          var render = this.render;
          for (var key in __vue.comTemplate) {
              var comTemplate = __vue.comTemplate[key];
              document.querySelectorAll('#' + this.id + ' ' + key).forEach(function (el, index) {
                  var data = {};
                  for (var i = 0; i < el.attributes.length; i++) {
                      data[el.attributes[i].name] = el.attributes[i].value;
                  }
                  el.innerHTML = render(comTemplate, data);
              })
          }
      }
      for (var key in obj.data) {
          this.state[key] = obj.data[key];
      }
      this.event = obj.methods;
      this.change();
  }

  _vue.comTemplate = {};
  _vue.component = function (obj) {
      this.comTemplate[obj.el] = obj.template;
  };

  global._vue = _vue;
})(window);

