(this.webpackJsonpmoviesdb=this.webpackJsonpmoviesdb||[]).push([[10],{21:function(n,e,t){"use strict";t.r(e);var a=t(0);e.default=function(n){var e=n.totalPages,t=n.page,i=n.setPage,c=function(){var n=[];if(e)for(var t=0;t<e;t++)n.push(t);return n};return Object(a.jsx)("div",{className:"pagination",children:e>20?Object(a.jsxs)("div",{className:"dropdown-pagination",children:[Object(a.jsx)("p",{children:"Page: "}),Object(a.jsx)("select",{name:"page",className:"dropdown",onChange:function(n){t!==parseInt(n.target.value)&&(i((function(e){return e-e+parseInt(n.target.value)})),window.location.hash="#title")},children:c().map((function(n){return Object(a.jsx)("option",{value:n,children:n+1},n)}))}),Object(a.jsxs)("p",{children:[" of ",e]})]}):c().map((function(n){return Object(a.jsx)("a",{href:"#title",className:t===n?"btn-pagination active":"btn-pagination",onClick:function(){t!==n&&i((function(e){return e-e+n}))},children:n+1},n)}))})}}}]);
//# sourceMappingURL=10.3c737c7c.chunk.js.map