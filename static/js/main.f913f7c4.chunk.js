(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{111:function(t,e,n){"use strict";n.r(e);var c,a,i=n(0),o=n.n(i),r=n(10),s=n.n(r),l=(n(86),n(87),n(46)),u=n(32),d=n(148),j=n(139),b=n(5),f=o.a.memo((function(t){var e=t.callBack;console.log("AddItemForm");var n=Object(i.useState)(""),c=Object(u.a)(n,2),a=c[0],o=c[1],r=Object(i.useState)(!1),s=Object(u.a)(r,2),l=s[0],f=s[1],O=function(){""!==a.trim()?(e(a),o("")):f(!0)};return Object(b.jsxs)("div",{children:[Object(b.jsx)(d.a,{error:l,id:"outlined-basic",label:"Title is required",variant:"outlined",value:a,onChange:function(t){o(t.currentTarget.value),f(!1)},onKeyPress:function(t){"Enter"===t.key&&(O(),o(""))},color:l?"secondary":"primary",size:"small"}),Object(b.jsx)(j.a,{variant:"contained",color:"primary",style:{maxWidth:"37px",maxHeight:"70px",minWidth:"37px",minHeight:"39px"},onClick:O,disabled:l,children:"+"})]})})),O=o.a.memo((function(t){var e=t.callBack,n=Object(l.a)(t,["callBack"]);console.log("EditableSpan is called");var c=Object(i.useState)(!1),a=Object(u.a)(c,2),o=a[0],r=a[1],s=Object(i.useState)(n.title),j=Object(u.a)(s,2),f=j[0],O=j[1];return o?Object(b.jsx)(d.a,{id:"standard-basic",autoFocus:!0,value:f,onChange:function(t){O(t.currentTarget.value)},onBlur:function(){e(f),r(!1)},variant:"standard"}):Object(b.jsx)("span",{onDoubleClick:function(){r(!0)},children:n.title})})),h=n(140),p=n(141),m=n(24),k=n(35),v=n(9),x=n(68),g=n.n(x).a.create({baseURL:"https://social-network.samuraijs.com/api/1.1/",withCredentials:!0,headers:{"API-KEY":"1734c197-25c0-4bdd-9d52-5f9220f3c903"}}),y=function(){return g.get("todo-lists")},C=function(t){return g.post("todo-lists",{title:t})},I=function(t){return g.delete("todo-lists/".concat(t))},D=function(t,e){return g.put("todo-lists/".concat(t),{title:e})},w=function(t){return g.get("/todo-lists/".concat(t,"/tasks"))},T=function(t,e){return g.post("/todo-lists/".concat(t,"/tasks"),{title:e})},L=function(t,e,n){return g.put("/todo-lists/".concat(t,"/tasks/").concat(e),n)},S=function(t,e){return g.delete("/todo-lists/".concat(t,"/tasks/").concat(e))};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(c||(c={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.High=2]="High",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(a||(a={}));var E="todoLists-reducer/REMOVE-TODOLIST",A="todoLists-reducer/ADD-TODOLIST",B="todoLists-reducer/RENAME-TODOLIST",N="todoLists-reducer/CHANGE-FILTER",P="todoLists-reducer/SET-TODOLIST",K=[],z=function(){return function(t){y().then((function(e){var n;t((n=e.data,{type:P,todoLists:n}))}))}},H=function(t){return function(e){C(t).then((function(t){var n;0===t.data.resultCode&&e((n=t.data.data.item,{type:A,newTodolist:n}))}))}},M=function(t){return function(e){I(t).then((function(n){0===n.data.resultCode&&e(function(t){return{type:E,todolistID:t}}(t))}))}},R=function(t,e){return function(n){D(t,e).then((function(c){0===c.data.resultCode&&n({type:B,id:t,title:e})}))}},U="task-reducer/ADD-TASK",W="task-reducer/REMOVE-TASK",F="task-reducer/SET-TASK",G="task-reducer/UPDATE_TASK",J={},V=function(t){return function(e){w(t).then((function(n){e(function(t,e){return{type:F,task:t,todolistID:e}}(n.data.items,t))}))}},Y=function(t,e){return function(n){T(t,e).then((function(t){var e;0===t.data.resultCode&&n((e=t.data.data.item,{type:U,task:e}))}))}},q=function(t,e){return function(n){S(t,e).then((function(c){0===c.data.resultCode&&n(function(t,e){return{type:W,taskID:e,todolistID:t}}(t,e))}))}},$=function(t,e){return function(n){var c=Object(v.a)(Object(v.a)({},t),e);L(t.todoListId,t.id,c).then((function(t){0===t.data.resultCode&&n(function(t){return{type:G,task:t}}(t.data.data.item))}))}},_=n(18),Q=n(151),X=o.a.memo((function(t){var e=t.task,n=t.todolistID,a=Object(_.b)(),o=Object(i.useCallback)((function(){a(q(n,e.id))}),[a,n,e.id]),r=Object(i.useCallback)((function(){var t=e.status===c.New?c.Completed:c.New;a($(e,{status:t}))}),[a,e]),s=Object(i.useCallback)((function(t){a($(e,{title:t}))}),[a,e]);return Object(b.jsxs)("div",{children:[Object(b.jsx)(O,{title:e.title,callBack:s}),Object(b.jsx)(Q.a,{checked:e.status===c.Completed,color:"primary",onChange:r,inputProps:{"aria-label":"controlled"},size:"small"}),Object(b.jsx)(h.a,{"aria-label":"delete",onClick:o,children:Object(b.jsx)(p.a,{fontSize:"inherit"})})]},e.id)})),Z=o.a.memo((function(t){var e=t.filter,n=t.todolistID,a=Object(l.a)(t,["filter","todolistID"]);console.log("Todolist is called");var o=Object(_.b)(),r=Object(_.c)((function(t){return t.tasks[n]})),s=Object(i.useCallback)((function(t){o(Y(n,t))}),[o,n]),u=Object(i.useCallback)((function(t){o(function(t,e){return{type:N,filter:e,id:t}}(n,t))}),[o,n]),d=Object(i.useCallback)((function(t){o(R(n,t))}),[o,n]),m=Object(i.useCallback)((function(){o(M(n))}),[o,n]),k=r;return"active"===e&&(k=r.filter((function(t){return t.status===c.New}))),"complete"===e&&(k=r.filter((function(t){return t.status===c.Completed}))),Object(i.useEffect)((function(){o(V(n))}),[o,n]),Object(b.jsxs)("div",{children:[Object(b.jsxs)("h3",{children:[Object(b.jsx)(O,{title:a.title,callBack:d}),Object(b.jsx)(h.a,{"aria-label":"delete",onClick:m,children:Object(b.jsx)(p.a,{fontSize:"inherit"})})]}),Object(b.jsx)(f,{callBack:s}),k.map((function(t){return Object(b.jsx)(X,{task:t,todolistID:n},t.id)})),Object(b.jsxs)("div",{style:{paddingTop:"5px"},children:[Object(b.jsx)(j.a,{variant:"all"===e?"contained":"outlined",color:"primary",onClick:function(){return u("all")},children:"All"}),Object(b.jsx)(j.a,{variant:"active"===e?"contained":"outlined",color:"primary",onClick:function(){return u("active")},children:"Active"}),Object(b.jsx)(j.a,{variant:"complete"===e?"contained":"outlined",color:"primary",onClick:function(){return u("complete")},children:"Completed"})]})]})})),tt=n(150),et=n(142),nt=n(143),ct=n(145),at=n(146),it=n(147),ot=n(113),rt=n(144);var st=function(){console.log("APP is called");var t=Object(_.b)(),e=Object(_.c)((function(t){return t.todolists})),n=Object(i.useCallback)((function(e){t(H(e))}),[t]);return Object(i.useEffect)((function(){t(z())}),[t]),Object(b.jsxs)("div",{className:"App",children:[Object(b.jsx)(tt.a,{style:{flexGrow:1},children:Object(b.jsx)(et.a,{position:"static",children:Object(b.jsxs)(nt.a,{children:[Object(b.jsx)(h.a,{size:"medium",edge:"start",color:"inherit","aria-label":"menu",style:{margin:2},children:Object(b.jsx)(rt.a,{})}),Object(b.jsx)(ct.a,{variant:"h6",component:"div",style:{flexGrow:1},children:"Your Todolist"}),Object(b.jsx)(j.a,{color:"inherit",children:"Login"})]})})}),Object(b.jsxs)(at.a,{fixed:!0,children:[Object(b.jsx)(it.a,{container:!0,style:{padding:"20px"},children:Object(b.jsx)(f,{callBack:n})}),Object(b.jsx)(it.a,{container:!0,spacing:3,children:e.map((function(t){return Object(b.jsx)(it.a,{item:!0,children:Object(b.jsx)(ot.a,{style:{padding:"10px"},children:Object(b.jsx)(Z,{title:t.title,todolistID:t.id,filter:t.filter},t.id)},t.id)},t.id)}))})]})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var lt=n(48),ut=n(69),dt=Object(lt.b)({todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case E:return t.filter((function(t){return t.id!==e.todolistID}));case A:return[Object(v.a)(Object(v.a)({},e.newTodolist),{},{filter:"all"})].concat(Object(k.a)(t));case B:return t.map((function(t){return t.id===e.id?Object(v.a)(Object(v.a)({},t),{},{title:e.title}):t}));case N:return t.map((function(t){return t.id===e.id?Object(v.a)(Object(v.a)({},t),{},{filter:e.filter}):t}));case P:return e.todoLists.map((function(t){return Object(v.a)(Object(v.a)({},t),{},{filter:"all"})}));default:return t}},tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:J,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case U:return Object(v.a)(Object(v.a)({},t),{},Object(m.a)({},e.task.todoListId,[e.task].concat(Object(k.a)(t[e.task.todoListId]))));case W:return Object(v.a)(Object(v.a)({},t),{},Object(m.a)({},e.todolistID,t[e.todolistID].filter((function(t){return t.id!==e.taskID}))));case P:var n=Object(v.a)({},t);return e.todoLists.forEach((function(t){n[t.id]=[]})),n;case A:return Object(v.a)(Object(v.a)({},t),{},Object(m.a)({},e.newTodolist.id,[]));case E:var c=Object(v.a)({},t);return delete c[e.todolistID],c;case F:return Object(v.a)(Object(v.a)({},t),{},Object(m.a)({},e.todolistID,Object(k.a)(e.task)));case G:return Object(v.a)(Object(v.a)({},t),{},Object(m.a)({},e.task.todoListId,t[e.task.todoListId].map((function(t){return t.id===e.task.id?Object(v.a)(Object(v.a)({},t),e.task):t}))));default:return t}}}),jt=Object(lt.c)(dt,Object(lt.a)(ut.a));jt.subscribe((function(){localStorage.setItem("appState",JSON.stringify(jt.getState()))})),window.store=jt,s.a.render(Object(b.jsx)(_.a,{store:jt,children:Object(b.jsx)(st,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},86:function(t,e,n){},87:function(t,e,n){}},[[111,1,2]]]);
//# sourceMappingURL=main.f913f7c4.chunk.js.map