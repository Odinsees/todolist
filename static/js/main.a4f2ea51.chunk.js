(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{21:function(t,e,c){t.exports={content:"Todolist_content__2cG_M",task:"Todolist_task__3IWJI",title:"Todolist_title__4v1tN",editSpan:"Todolist_editSpan__XUGXY",taskCheckBox:"Todolist_taskCheckBox__3R6bf",buttonBox:"Todolist_buttonBox__3xbXR"}},29:function(t,e,c){t.exports={App:"App_App__3jUgO",addForm:"App_addForm__11Uzk",todolistComponent:"App_todolistComponent__3kZaP"}},31:function(t,e,c){t.exports={content:"AddItemForm_content__2lgB3",textField:"AddItemForm_textField__1jKhe"}},54:function(t,e,c){t.exports={editSpan:"EditableSpan_editSpan__evPLN"}},66:function(t,e,c){},73:function(t,e,c){"use strict";c.r(e);var a=c(0),n=c(9),i=c.n(n),o=(c(66),c(12)),l=c(46),r=c(15),s=c(17),d=c(29),j=c.n(d),u=c(39),b=c(103),O=c(108),f=c(107),m=c(5),p=function(t){var e=t.title,c=t.callBack,a=t.error,n=t.className,i=t.variant,o=t.color,l=function(){c()};return t.iconButton?Object(m.jsx)(b.a,{"aria-label":"delete",color:"primary",onClick:l,children:Object(m.jsx)(f.a,{})}):Object(m.jsx)(O.a,{variant:i,color:o,disabled:!!a,onClick:l,className:n,children:e})},x=c(31),h=c.n(x),v=c(109),k=function(t){var e=t.callBack,c=Object(a.useState)(""),n=Object(s.a)(c,2),i=n[0],o=n[1],l=Object(a.useState)(null),r=Object(s.a)(l,2),d=r[0],j=r[1],u=function(){""!==i.trim()?(e(i),o("")):j("Title is required")},b=function(t){o(t.currentTarget.value),j(null)};return Object(m.jsxs)("div",{className:h.a.content,children:[d?Object(m.jsx)("div",{ref:"input",className:h.a.textField,children:Object(m.jsx)(v.a,{error:!0,id:"outlined-error-helper-text",label:d,helperText:"Incorrect entry.",value:i,onChange:b})}):Object(m.jsx)("div",{className:h.a.textField,children:Object(m.jsx)(v.a,{id:"outlined-basic",variant:"outlined",value:i,onChange:b,onKeyPress:function(t){"Enter"===t.key&&(u(),o(""))},className:d?h.a.errorInput:""})}),Object(m.jsx)(p,{callBack:u,title:"+",error:d,variant:"contained",color:"primary",iconButton:!1})]})},_=c(54),B=c.n(_),T=function(t){var e=t.callBack,c=Object(u.a)(t,["callBack"]),n=Object(a.useState)(!1),i=Object(s.a)(n,2),o=i[0],l=i[1],r=Object(a.useState)(c.title),d=Object(s.a)(r,2),j=d[0],b=d[1];return Object(m.jsx)("div",{className:B.a.editSpan,children:o?Object(m.jsx)(v.a,{id:"standard-basic",autoFocus:!0,value:j,onChange:function(t){b(t.currentTarget.value)},onBlur:function(){e(j),l(!1)},variant:"standard"}):Object(m.jsx)("span",{onDoubleClick:function(){l(!0)},children:c.title})})},N=c(111),g=c(21),C=c.n(g),S=function(t){var e=t.todolistID,c=t.filter,a=Object(u.a)(t,["todolistID","filter"]),n=function(t){a.changeFilter(t,e)};return Object(m.jsxs)("div",{className:C.a.content,children:[Object(m.jsxs)("div",{className:C.a.title,children:[Object(m.jsx)("h3",{children:Object(m.jsx)(T,{title:a.title,callBack:function(t){a.renameTodolist(t,e)}})}),Object(m.jsx)(p,{callBack:function(){a.removeTodolist(e)},iconButton:!0})]}),Object(m.jsx)("div",{children:Object(m.jsx)(k,{callBack:function(t){a.addTask(e,t)}})}),a.task.map((function(t){return Object(m.jsxs)("div",{className:C.a.task,children:[Object(m.jsx)("div",{className:C.a.editSpan,children:Object(m.jsx)(T,{title:t.title,callBack:function(c){a.renameTask(c,e,t.id)}})}),Object(m.jsx)("div",{className:C.a.taskCheckBox,children:Object(m.jsx)(N.a,{checked:t.isDone,color:"primary",onChange:function(c){a.changeChecked(c.currentTarget.checked,e,t.id)},inputProps:{"aria-label":"controlled"}})}),Object(m.jsx)("div",{className:C.a.removeTaskBTN,children:Object(m.jsx)(p,{callBack:function(){a.removeTask(t.id,e)},iconButton:!0})})]},t.id)})),Object(m.jsxs)("div",{className:C.a.buttonBox,children:[Object(m.jsx)(p,{callBack:function(){return n("all")},title:"All",variant:"all"===c?"contained":"outlined",color:"primary",iconButton:!1}),Object(m.jsx)(p,{callBack:function(){return n("active")},title:"Active",variant:"active"===c?"contained":"outlined",color:"primary",iconButton:!1}),Object(m.jsx)(p,{callBack:function(){return n("complete")},title:"Completed",variant:"complete"===c?"contained":"outlined",color:"primary",iconButton:!1})]})]})},y=c(110);var D=function(){var t,e=Object(y.a)(),c=Object(y.a)(),n=Object(a.useState)([{id:e,title:"What to learn",filter:"all"},{id:c,title:"What to buy",filter:"all"}]),i=Object(s.a)(n,2),d=i[0],u=i[1],b=Object(a.useState)((t={},Object(r.a)(t,e,[{id:Object(y.a)(),title:"HTML&CSS",isDone:!0},{id:Object(y.a)(),title:"JS",isDone:!1}]),Object(r.a)(t,c,[{id:Object(y.a)(),title:"Milk",isDone:!0},{id:Object(y.a)(),title:"React Book",isDone:!1}]),t)),O=Object(s.a)(b,2),f=O[0],p=O[1],x=function(t,e){p(Object(o.a)(Object(o.a)({},f),{},Object(r.a)({},t,[{id:Object(y.a)(),title:e,isDone:!1}].concat(Object(l.a)(f[t])))))},h=function(t,e){p(Object(o.a)(Object(o.a)({},f),{},Object(r.a)({},e,f[e].filter((function(e){return e.id!==t})))))},v=function(t){u(d.filter((function(e){return e.id!==t})))},_=function(t,e){u(d.map((function(c){return c.id===e?Object(o.a)(Object(o.a)({},c),{},{filter:t}):c})))},B=function(t,e,c){p(Object(o.a)(Object(o.a)({},f),{},Object(r.a)({},e,f[e].map((function(e){return e.id===c?Object(o.a)(Object(o.a)({},e),{},{isDone:t}):e})))))},T=function(t,e,c){p(Object(o.a)(Object(o.a)({},f),{},Object(r.a)({},e,f[e].map((function(e){return e.id===c?Object(o.a)(Object(o.a)({},e),{},{title:t}):e})))))},N=function(t,e){u(d.map((function(c){return c.id===e?Object(o.a)(Object(o.a)({},c),{},{title:t}):c})))};return Object(m.jsxs)("div",{className:j.a.App,children:[Object(m.jsxs)("div",{className:j.a.addForm,children:[Object(m.jsx)("h3",{children:"Add Todolist"}),Object(m.jsx)(k,{callBack:function(t){var e={id:Object(y.a)(),title:t,filter:"all"};u([].concat(Object(l.a)(d),[e])),p(Object(o.a)(Object(o.a)({},f),{},Object(r.a)({},e.id,[])))}})]}),Object(m.jsx)("div",{className:j.a.todolistComponent,children:d.map((function(t){var e=f[t.id];return"active"===t.filter&&(e=f[t.id].filter((function(t){return!t.isDone}))),"complete"===t.filter&&(e=f[t.id].filter((function(t){return t.isDone}))),Object(m.jsx)(S,{title:t.title,task:e,todolistID:t.id,removeTask:h,addTask:x,changeFilter:_,changeChecked:B,filter:t.filter,renameTask:T,renameTodolist:N,removeTodolist:v},t.id)}))})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(Object(m.jsx)(D,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[73,1,2]]]);
//# sourceMappingURL=main.a4f2ea51.chunk.js.map