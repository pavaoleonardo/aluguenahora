(this["webpackJsonpalugue-na-hora-project"]=this["webpackJsonpalugue-na-hora-project"]||[]).push([[0],{67:function(e,a,t){"use strict";(function(e){var n=t(35),r=t(47),o=t(28),c=t(0),l=t.n(c),i=t(14),m=t(87),u=t(88),s=t(98),p=t(36),b=t(100),d=t(92),E=t(99),v=t(91),f=t(29),h=t(37),g=t(93),w=t(94),k=t(95),y=t(96),O=t(43),j=t(97),C=t(17),I=t(68),N=t.n(I);function x(e){var a=e.children,t=Object(m.a)({disableHysteresis:!0,threshold:0});return l.a.cloneElement(a,{elevation:t?4:0})}var P=Object(j.a)((function(e){return{toolbarMagin:Object(o.a)({},e.mixins.toolbar),tabContainer:{marginLeft:"auto"},tab:Object(o.a)(Object(o.a)({},e.typography.tab),{},{minWidth:10,marginLeft:"25px"}),logoContainer:Object(r.a)({padding:0,"&:hover":{backgroundColor:"transparent"}},e.breakpoints.down("md"),{}),menuItem:Object(o.a)(Object(o.a)({},e.typography.tab),{},{fontSize:14,opacity:.7,"&:hover":{opacity:1}}),drawerIconContainer:{"&:hover":{backgroundColor:"transparent"},marginLeft:"auto"},drawerIcon:{height:"40px",width:"40px"},drawer:{backgroundColor:e.palette.common.algBlue},drawerItems:Object(o.a)({},e.typography.tab)}}));a.a=function(a){var t=P(),r=Object(C.a)(),o=Object(u.a)(r.breakpoints.down("md")),m=e.browser&&/iPad|iPhone|iPod/.test(navigator.userAgent),j=Object(c.useState)(0),I=Object(n.a)(j,2),T=I[0],A=I[1],M=Object(c.useState)(null),S=Object(n.a)(M,2),q=S[0],H=S[1],L=Object(c.useState)(!1),B=Object(n.a)(L,2),F=B[0],R=B[1],Q=Object(c.useState)(0),J=Object(n.a)(Q,2),W=J[0],z=J[1],D=Object(c.useState)(!1),G=Object(n.a)(D,2),K=G[0],U=G[1],V=function(e){H(null),R(!1)};Object(c.useEffect)((function(){switch("/"===window.location.pathname&&0!==T?A(0):"/imoveis-para-alugar"===window.location.pathname&&1!==T?A(1):"/imoveis-para-comprar"===window.location.pathname&&2!==T?A(2):"/para-proprietarios"===window.location.pathname&&3!==T?A(3):"/quem-somos"===window.location.pathname&&4!==T?A(4):"/contato"===window.location.pathname&&5!==T&&A(5),window.location.pathname){case"/":0!==T&&A(0);break;case"/imoveis-para-alugar":1!==T&&A(1);break;case"/imoveis-para-comprar":2!==T&&A(2);break;case"/para-proprietarios":3!==T&&(A(3),z(0));break;case"/anunciar-para-alugar":3!==T&&(A(3),z(1));break;case"/anunciar-para-vender":3!==T&&(A(3),z(2));break;case"/meus-imoveis":3!==T&&(A(3),z(3));break;case"/quem-somos":4!==T&&A(4);break;case"/contato":5!==T&&A(5)}}),[T]);var X=l.a.createElement(l.a.Fragment,null,l.a.createElement(s.a,{value:T,onChange:function(e,a){A(a)},className:t.tabContainer,indicatorColor:"primary"},l.a.createElement(p.a,{className:t.tab,component:i.b,to:"/",label:"Home"}),l.a.createElement(p.a,{className:t.tab,component:i.b,to:"/imoveis-para-alugar",label:"Im\xf3veis para alugar"}),l.a.createElement(p.a,{className:t.tab,component:i.b,to:"/imoveis-para-comprar",label:"Im\xf3veis para comprar"}),l.a.createElement(p.a,{"aria-owns":q?"simple-menu":void 0,"aria-haspopup":q?"true":void 0,className:t.tab,component:i.b,onMouseOver:function(e){return H(e.currentTarget),void R(!0)},to:"/para-proprietarios",label:"Para propriet\xe1rios"}),l.a.createElement(p.a,{className:t.tab,component:i.b,to:"/quem-somos",label:"Quem somos"}),l.a.createElement(p.a,{className:t.tab,component:i.b,to:"/contato",label:"Contate nos"})),l.a.createElement(b.a,{id:"simple-menu",anchorEl:q,open:F,onClose:V,classes:{paper:t.menu},MenuListProps:{onMouseLeave:V}},[{name:"Para propriet\xe1rios",link:"/para-proprietarios"},{name:"Anunciar im\xf3vel para alugar",link:"/anunciar-para-alugar"},{name:"Anunciar im\xf3vel para vender",link:"/anunciar-para-vender"},{name:"Meus Im\xf3veis",link:"/meus-imoveis"}].map((function(e,a){return l.a.createElement(d.a,{key:e,component:i.b,to:e.link,classes:{root:t.menuItem},onClick:function(e){!function(e,a){H(null),R(!1),z(a)}(0,a),A(1),V()},selected:a===W&&1===T},e.name)})))),Y=l.a.createElement(l.a.Fragment,null,l.a.createElement(E.a,{disableBackdropTransition:!m,disableDiscovery:m,open:K,onClose:function(){return U(!1)},onOpen:function(){return U(!0)},classes:{paper:t.drawer}},l.a.createElement(v.a,{disablePadding:!0},l.a.createElement(f.a,{onClick:function(){return U(!1)},divider:!0,button:!0,component:i.b,to:"/"},l.a.createElement(h.a,{className:t.drawerItems,disableTypography:!0},"Home")),l.a.createElement(f.a,{onClick:function(){return U(!1)},divider:!0,button:!0,component:i.b,to:"/imoveis-para-alugar"},l.a.createElement(h.a,{className:t.drawerItems,disableTypography:!0},"Im\xf3veis para alugar")),l.a.createElement(f.a,{onClick:function(){return U(!1)},divider:!0,button:!0,component:i.b,to:"/imoveis-para-comprar"},l.a.createElement(h.a,{className:t.drawerItems,disableTypography:!0},"Im\xf3veis para comprar")),l.a.createElement(f.a,{onClick:function(){return U(!1)},divider:!0,button:!0,component:i.b,to:"/para-proprietarios"},l.a.createElement(h.a,{className:t.drawerItems,disableTypography:!0},"Para propriet\xe1rios")),l.a.createElement(f.a,{onClick:function(){return U(!1)},divider:!0,button:!0,component:i.b,to:"/quem-somos"},l.a.createElement(h.a,{className:t.drawerItems,disableTypography:!0},"Quem somos")),l.a.createElement(f.a,{onClick:function(){return U(!1)},divider:!0,button:!0,component:i.b,to:"/contato"},l.a.createElement(h.a,{className:t.drawerItems,disableTypography:!0},"Contate nos")))),l.a.createElement(g.a,{className:t.drawerIconContainer,onClick:function(){return U(!K)},disableRipple:!0},l.a.createElement(N.a,{className:t.drawerIcon})));return l.a.createElement(l.a.Fragment,null,l.a.createElement(x,null,l.a.createElement(w.a,{position:"fixed"},l.a.createElement(k.a,null,l.a.createElement(y.a,{component:i.b,to:"/",className:t.logoContainer,onClick:function(){return A(0)},disableRipple:!0},l.a.createElement(O.a,{variant:"h5"},"Alugue na HORA ",l.a.createElement("i",{className:"far fa-clock"}))),o?Y:X))),l.a.createElement("div",{className:t.toolbarMagin}))}}).call(this,t(80))},73:function(e,a,t){e.exports=t(86)},86:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(6),c=t.n(o),l=t(127),i=t(14),m=t(10),u=t(69),s=Object(u.a)({palette:{common:{algBlue:"".concat("#edf2fb"),algOrange:"".concat("#dc2f02")},primary:{main:"".concat("#edf2fb")},secondary:{main:"".concat("#dc2f02")}},typography:{tab:{fontFamily:"Raleway",textTransform:"none",fontWeight:"700"}}}),p=t(67);var b=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Home Page"))},d=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Im\xf3veis para alugar"))},E=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Quem somos"),r.a.createElement("h2",null,"Chupa cadelao!!!"),r.a.createElement("span",null),"\ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23")},v=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Pagina contato"))},f=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Im\xf3veis para comprar"))},h=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Anuncie seu im\xf3vel para alugar"))},g=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Anuncie seu im\xf3vel para vender"))},w=function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"Meus im\xf3veis"))},k=function(){return r.a.createElement(l.a,{theme:s},r.a.createElement(i.a,null,r.a.createElement(p.a,null),r.a.createElement(m.c,null,r.a.createElement(m.a,{exact:!0,path:"/",component:function(){return r.a.createElement(b,null)}}),r.a.createElement(m.a,{exact:!0,path:"/imoveis-para-alugar",component:function(){return r.a.createElement(d,null)}}),r.a.createElement(m.a,{exact:!0,path:"/imoveis-para-comprar",component:function(){return r.a.createElement(f,null)}}),r.a.createElement(m.a,{exact:!0,path:"/quem-somos",component:function(){return r.a.createElement(E,null)}}),r.a.createElement(m.a,{exact:!0,path:"/contato",component:function(){return r.a.createElement(v,null)}}),r.a.createElement(m.a,{exact:!0,path:"/anunciar-para-alugar",component:function(){return r.a.createElement(h,null)}}),r.a.createElement(m.a,{exact:!0,path:"/anunciar-para-vender",component:function(){return r.a.createElement(g,null)}}),r.a.createElement(m.a,{exact:!0,path:"/meus-imoveis",component:function(){return r.a.createElement(w,null)}}),r.a.createElement(m.a,{exact:!0,path:"/contato",component:function(){return r.a.createElement(v,null)}}))))};c.a.render(r.a.createElement(k,null),document.getElementById("root"))}},[[73,1,2]]]);
//# sourceMappingURL=main.0c042e10.chunk.js.map