(this["webpackJsonpalugue-na-hora-project"]=this["webpackJsonpalugue-na-hora-project"]||[]).push([[0],{107:function(e,a,t){e.exports=t(123)},123:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(11),c=t.n(o),l=t(19),i=t(21),s=t(15),m=t(178),u=t(98),d=Object(u.a)({palette:{common:{algBlue:"".concat("#ffffff"),algOrange:"".concat("#dc2f02")},primary:{main:"".concat("#ffffff")},secondary:{main:"".concat("#dc2f02")}},typography:{tab:{fontFamily:"Raleway",textTransform:"none",fontWeight:700},h1:{fontWeight:400},h2:{fontWeight:700,fontSize:"3rem",lineHeight:1.5},h3:{fontWeight:300,fontSize:"2rem",lineHeight:1.5,color:"gray"},h4:{fontSize:"1.75rem",fontWeight:700},subtitle1:{fontSize:"1.25em",fontWeight:300}}}),p=t(26),b=t(91),f=t(54),g=t.n(f),h=t(73),E=t(99),v=t(76),j=t(102),w=Object(j.a)((function(e){return{customButton:{marginTop:"2em",width:"20em",height:"3.5em",borderRadius:"0.5em"}}})),k=function(e){var a=e.children,t=Object(E.a)(e,["children"]),n=w();return r.a.createElement(v.a,Object.assign({variant:"contained",size:"medium",color:"secondary",className:n.customButton},t),a)},x=t(175),O=t(65),y=t(179),I=t(176),C=Object(s.f)((function(e){var a=Object(n.useState)(""),t=Object(l.a)(a,2),o=t[0],c=t[1],i=Object(n.useState)(""),s=Object(l.a)(i,2),m=s[0],u=s[1],d=Object(n.useState)(null),b=Object(l.a)(d,2),f=b[0],E=b[1],j=Object(n.useState)(!0),w=Object(l.a)(j,2),C=w[0],N=w[1],S=function(e){e.preventDefault(),o.trim()?m.trim()?m<6?E("Password deve conter mais de 6 caracteres"):(console.log("correct..."),E(null),C?P():z()):E("Ingresse o password"):E("Ingresse o email")},P=Object(n.useCallback)(Object(h.a)(g.a.mark((function a(){var t;return g.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,p.a.signInWithEmailAndPassword(o,m);case 3:t=a.sent,console.log(t.user),c(""),u(""),E(null),e.history.push("/meus-imoveis"),a.next=17;break;case 11:a.prev=11,a.t0=a.catch(0),console.log(a.t0),"auth/invalid-email"===a.t0.code&&E("* O email n\xe3o corresponde"),"auth/user-not-found"===a.t0.code&&E("* Email n\xe3o registrado"),"auth/wrong-password"===a.t0.code&&E("* Contrasenha incorreta");case 17:case"end":return a.stop()}}),a,null,[[0,11]])}))),[o,m,e.history]),z=Object(n.useCallback)(Object(h.a)(g.a.mark((function a(){var t;return g.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,p.a.createUserWithEmailAndPassword(o,m);case 3:return t=a.sent,console.log(t.user),a.next=7,p.b.collection("users").doc(t.user.email).set({email:t.user.email,uid:t.user.uid});case 7:c(""),u(""),E(null),e.history.push("/meus-imoveis"),a.next=18;break;case 13:a.prev=13,a.t0=a.catch(0),console.log(a.t0),"auth/invalid-email"===a.t0.code&&E("* Formato de email n\xe3o v\xe1lido"),"auth/email-already-in-use"===a.t0.code&&E("* Este email j\xe1 est\xe1 em uso");case 18:case"end":return a.stop()}}),a,null,[[0,13]])}))),[o,m,e.history]);return r.a.createElement(x.a,{container:!0,justify:"center"},r.a.createElement(x.a,{item:!0,style:{marginTop:"5em"}},r.a.createElement(O.a,{variant:"h2"},C?"J\xe1 tenho uma conta":"Cadastro de usu\xe1rio"),r.a.createElement(O.a,{variant:"h3"},C?"Entra com seu email e contrasenha":"Insira um email v\xe1lido e uma contrasenha"),r.a.createElement("form",{onSubmit:S},f&&r.a.createElement(x.a,{container:!0,style:{marginTop:"1em"}},f),r.a.createElement(y.a,{fullWidth:!0,name:"email",type:"email",autoComplete:"on",label:"Email",variant:"outlined",onChange:function(e){return c(e.target.value)},value:o,required:!0,md:6,xs:12,style:{marginTop:"2em"}}),r.a.createElement(y.a,{fullWidth:!0,name:"password",id:"password",type:"password",autoComplete:"on",label:"Password",variant:"outlined",onChange:function(e){return u(e.target.value)},value:m,required:!0,md:6,xs:12,style:{marginTop:"2em"}}),r.a.createElement(x.a,{container:!0,justify:"space-between"},r.a.createElement(k,{variant:"contained",type:"submit",color:"secondary",onClick:S},C?"Entrar":"Cadastrar"),C&&r.a.createElement(k,{variant:"contained",onClick:p.c,value:"submit-form",color:"primary",style:{marginLeft:"1em"},startIcon:r.a.createElement(I.a,{className:"fab fa-google"})},"Entrar con Google")),r.a.createElement(x.a,{container:!0,justify:"center"},r.a.createElement(v.a,{size:"small",style:{justifyContent:"center",marginTop:"2em"},onClick:function(){return N(!C)},type:"button"},C?"N\xe3o est\xe1 registrado?":"J\xe1 possuo conta")))))})),N=t(131),S=Object(j.a)((function(e){return{mainContainer:{marginTop:"5em",alignCenter:"center",width:"100%"},filterContainer:{marginTop:"1em"}}})),P=[{value:"1",label:"1 quarto"},{value:"2",label:"2 quartos"},{value:"3",label:"3 quartos"},{value:"4",label:"4 quartos +"}],z=[{value:"1",label:"R$ 1.000"},{value:"2",label:"R$ 2.000"},{value:"3",label:"R$ 3.000"},{value:"4",label:"R$ 4.000"},{value:"5",label:"R$ 5.000"},{value:"6",label:"R$ 10.000 +"}];var T=function(e){var a=S(),t=Object(n.useState)("2"),o=Object(l.a)(t,2),c=o[0],i=o[1],s=r.a.useState("2"),m=Object(l.a)(s,2),u=m[0],d=m[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(x.a,{container:!0,direction:"column"},r.a.createElement(x.a,{container:!0,className:a.mainContainer,justify:"center"},r.a.createElement(x.a,{item:!0},r.a.createElement(O.a,{variant:"h2",className:"h2"},"Alugue na Hora"),r.a.createElement(O.a,{variant:"h3",className:"h3"},"Encontre seu im\xf3vel"),r.a.createElement("form",null,r.a.createElement(y.a,{fullWidth:!0,disabled:!0,id:"outlined-disabled",label:"Cidade",defaultValue:"Campo Grande",variant:"outlined",md:6,xs:12}),r.a.createElement(x.a,{container:!0,className:a.filterContainer},r.a.createElement(y.a,{id:"outlined-search",label:"Busque por bairro",type:"search",variant:"outlined",md:3,xs:6}),r.a.createElement(y.a,{id:"outlined-select-price",select:!0,value:u,onChange:function(e){d(e.target.value)},helperText:"Selecione n\xba de quartos ",variant:"outlined",md:3,xs:6},P.map((function(e){return r.a.createElement(N.a,{key:e.value,value:e.value},e.label)}))),r.a.createElement(y.a,{id:"outlined-select-room",select:!0,value:c,onChange:function(e){i(e.target.value)},helperText:"Selecione precio",variant:"outlined"},z.map((function(e){return r.a.createElement(N.a,{key:e.value,value:e.value},e.label)})))),r.a.createElement(k,{variant:"contained",size:"medium",color:"secondary"},"Encontrar im\xf3veis")))),r.a.createElement(x.a,{item:!0,className:a.formContainer})))},A=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Im\xf3veis para alugar"))},W=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Quem somos"),r.a.createElement("h2",null,"Chupa cadelao!!!"),r.a.createElement("span",null),"\ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23")},q=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Pagina contato"))},R=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Anuncie seu im\xf3vel para alugar"))},V=Object(s.f)((function(e){var a=Object(n.useState)(null),t=Object(l.a)(a,2),o=(t[0],t[1]);return Object(n.useEffect)((function(){p.a.currentUser?(console.log("existe usuario"),o(p.a.currentUser)):(console.log("nao existe usuario"),e.history.push("/signin"))}),[e.history]),r.a.createElement(x.a,{container:!0,justify:"center"},r.a.createElement(O.a,{variant:"h3"},"Meus Im\xf3veis!!"))})),B=t(22),M=t(177),F=t(103),U=t(94),D=t.n(U),H=t(95),L=t.n(H),$=t(96),_=t.n($),G=t(97),J=t.n(G),Q=t(136),K=Object(M.a)((function(e){var a,t,n;return{footer:(a={backgroundColor:"white",width:"100%",height:"11em",zIndex:1302,position:"absolute",bottom:0},Object(B.a)(a,e.breakpoints.down("md"),{height:"8em"}),Object(B.a)(a,e.breakpoints.down("xs"),{height:"6em"}),a),mainContainer:(t={},Object(B.a)(t,e.breakpoints.down("md"),{height:"8em"}),Object(B.a)(t,e.breakpoints.down("xs"),{height:"6em"}),t),link:{fontFamily:"Arial",fontSize:"0.75rem",fontWeight:"bold",textDecoration:"none",color:"#5D5F62"},gridItem:{margin:"3em"},icon:Object(B.a)({margin:"1em",height:"2em",width:"2em"},e.breakpoints.down("xs"),{height:"1.5em",width:"1.5em"}),socialContainer:(n={},Object(B.a)(n,e.breakpoints.down("md"),{marginTop:"2em",justifyContent:"center"}),Object(B.a)(n,e.breakpoints.down("xs"),{marginTop:"1em",justifyContent:"center"}),n)}})),Z=function(e){var a=K();return r.a.createElement("footer",{className:a.footer},r.a.createElement(Q.a,null),r.a.createElement(x.a,{container:!0,justify:"space-around",alignItems:"center",className:a.mainContainer},r.a.createElement(F.a,{mdDown:!0},r.a.createElement(x.a,{item:!0},r.a.createElement(x.a,{container:!0},r.a.createElement(x.a,{item:!0,className:a.gridItem},r.a.createElement(x.a,{container:!0,direction:"column",spacing:2},r.a.createElement(x.a,{item:!0,component:i.b,onClick:function(){return e.setValue(0)},to:"/",className:a.link},"Home"))),r.a.createElement(x.a,{item:!0,className:a.gridItem},r.a.createElement(x.a,{container:!0,direction:"column",spacing:2},r.a.createElement(x.a,{item:!0,component:i.b,onClick:function(){return e.setValue(1)},to:"/imoveis-para-alugar",className:a.link},"Im\xf3veis para alugar"))),r.a.createElement(x.a,{item:!0,className:a.gridItem},r.a.createElement(x.a,{container:!0,direction:"column",spacing:2},r.a.createElement(x.a,{item:!0,className:a.link},"Para propriet\xe1rios"),r.a.createElement(x.a,{item:!0,component:i.b,onClick:function(){e.setValue(2),e.setSelectedIndex(1)},to:"/meus-imoveis",className:a.link},"Anunciar im\xf3vel para alugar"),r.a.createElement(x.a,{item:!0,component:i.b,onClick:function(){e.setValue(2),e.setSelectedIndex(2)},to:"/meus-imoveis",className:a.link},"Meus im\xf3veis"))),r.a.createElement(x.a,{item:!0,className:a.gridItem},r.a.createElement(x.a,{container:!0,direction:"column",spacing:2},r.a.createElement(x.a,{item:!0,component:i.b,onClick:function(){return e.setValue(3)},to:"/quem-somos",className:a.link},"Quem somos"),r.a.createElement(x.a,{item:!0,component:i.b,onClick:function(){return e.setValue(4)},to:"/contato",className:a.link},"Contate nos")))))),r.a.createElement(x.a,{item:!0,className:a.socialContainer},r.a.createElement(x.a,{container:!0,justify:"center"},r.a.createElement(x.a,{item:!0,component:"a",href:"https://www.facebook.com",rel:"noopener noreferrer",target:"_blank"},r.a.createElement("img",{alt:"facebook logo",src:D.a,className:a.icon})),r.a.createElement(x.a,{item:!0,component:"a",href:"https://www.twitter.com",rel:"noopener noreferrer",target:"_blank"},r.a.createElement("img",{alt:"twitter logo",src:L.a,className:a.icon})),r.a.createElement(x.a,{item:!0,component:"a",href:"https://www.instagram.com",rel:"noopener noreferrer",target:"_blank"},r.a.createElement("img",{alt:"instagram logo",src:_.a,className:a.icon})),r.a.createElement(x.a,{item:!0,component:"a",href:"https://www.linkedin.com",rel:"noopener noreferrer",target:"_blank"},r.a.createElement("img",{alt:"linkedin logo",src:J.a,className:a.icon}))))))},X=function(){var e=Object(n.useState)(0),a=Object(l.a)(e,2),t=a[0],o=a[1],c=Object(n.useState)(0),u=Object(l.a)(c,2),f=u[0],g=u[1],h=Object(n.useState)(!1),E=Object(l.a)(h,2),v=E[0],j=E[1];return Object(n.useEffect)((function(){p.a.onAuthStateChanged((function(e){console.log(e),j(e||null)}))}),[]),!1!==v?r.a.createElement(m.a,{theme:d},r.a.createElement(i.a,null,r.a.createElement(b.a,{firebaseUser:v,value:f,setValue:g,selectedIndex:t,setSelectedIndex:o}),r.a.createElement(s.c,null,r.a.createElement(s.a,{exact:!0,path:"/",component:function(){return r.a.createElement(T,null)}}),r.a.createElement(s.a,{path:"/imoveis-para-alugar",component:function(){return r.a.createElement(A,null)}}),r.a.createElement(s.a,{path:"/quem-somos",component:function(){return r.a.createElement(W,null)}}),r.a.createElement(s.a,{path:"/contato",component:function(){return r.a.createElement(q,null)}}),r.a.createElement(s.a,{path:"/anunciar-para-alugar",component:function(){return r.a.createElement(R,null)}}),r.a.createElement(s.a,{path:"/meus-imoveis",component:function(){return r.a.createElement(V,null)}}),r.a.createElement(s.a,{path:"/contato",component:function(){return r.a.createElement(q,null)}}),r.a.createElement(s.a,{path:"/signin",component:function(){return r.a.createElement(C,null)}}),r.a.createElement(s.a,{path:"/user"},"User...")),r.a.createElement(Z,{value:f,setValue:g,selectedIndex:t,setSelectedIndex:o}))):r.a.createElement("p",null,"Loading...")};c.a.render(r.a.createElement(X,null),document.getElementById("root"))},26:function(e,a,t){"use strict";t.d(a,"c",(function(){return l})),t.d(a,"b",(function(){return r})),t.d(a,"a",(function(){return o}));var n=t(53);t(114),t(116);n.a.initializeApp({apiKey:"AIzaSyA79cJIiu3En1dHAPg3wGWBZF_qfs6DRMw",authDomain:"alugue-na-hora-a427b.firebaseapp.com",databaseURL:"https://alugue-na-hora-a427b.firebaseio.com",projectId:"alugue-na-hora-a427b",storageBucket:"alugue-na-hora-a427b.appspot.com",messagingSenderId:"825237480393",appId:"1:825237480393:web:455014ad2e22c305dcbe18"});var r=n.a.firestore(),o=n.a.auth(),c=new n.a.auth.GoogleAuthProvider;c.setCustomParameters({prompt:"select_account"});var l=function(){return o.signInWithPopup(c)}},91:function(e,a,t){"use strict";(function(e){var n=t(19),r=t(22),o=t(42),c=t(0),l=t.n(c),i=t(21),s=t(15),m=t(26),u=t(125),d=t(126),p=t(137),b=t(128),f=t(74),g=t(131),h=t(138),E=t(130),v=t(101),j=t(132),w=t(133),k=t(134),x=t(103),O=t(135),y=t(76),I=t(136),C=t(102),N=t(14),S=t(93),P=t.n(S),z=t(72),T=t.n(z),A=t(92),W=t.n(A);function q(e){var a=e.children,t=Object(u.a)({disableHysteresis:!0,threshold:0});return l.a.cloneElement(a,{elevation:t?4:0})}var R=Object(C.a)((function(e){var a,t;return{toolbarMargin:Object(o.a)({},e.mixins.toolbar),tabContainer:{marginRight:"auto"},tab:Object(o.a)(Object(o.a)({},e.typography.tab),{},{minWidth:10,marginLeft:"25px"}),logoContainer:{"&:hover":{backgroundColor:"transparent"}},logo:Object(r.a)({height:"2.7em",marginBottom:"0.5em",marginLeft:"1.5em"},e.breakpoints.down("xs"),{height:"2em"}),menuItem:Object(o.a)(Object(o.a)({},e.typography.tab),{},{fontSize:14,opacity:.6,"&:hover":{opacity:1.1}}),drawerIconContainer:{"&:hover":{backgroundColor:"transparent"}},drawerIcon:(a={height:"40px",width:"40px"},Object(r.a)(a,e.breakpoints.down("md"),{height:"30px",width:"30"}),Object(r.a)(a,e.breakpoints.down("xs"),{height:"25px",width:"25"}),a),drawerItems:Object(o.a)(Object(o.a)({},e.typography.tab),{},{fontSize:14,opacity:.6}),drawerItemSelected:{opacity:1.1},appbar:{zIndex:e.zIndex.modal+1,backgroundColor:"#ffffff"},toolbar:(t={},Object(r.a)(t,e.breakpoints.down("md"),{justifyContent:"space-between"}),Object(r.a)(t,e.breakpoints.down("xs"),{justifyContent:"start"}),t),accountButtom:{marginRight:"1.5em",borderRadius:"5em"}}}));a.a=Object(s.f)((function(a){var t=R(),r=Object(N.a)(),o=Object(d.a)(r.breakpoints.down("md")),s=e.browser&&/iPad|iPhone|iPod/.test(navigator.userAgent),u=Object(c.useState)(null),C=Object(n.a)(u,2),S=C[0],z=C[1],A=Object(c.useState)(!1),V=Object(n.a)(A,2),B=V[0],M=V[1],F=Object(c.useState)(!1),U=Object(n.a)(F,2),D=U[0],H=U[1],L=Object(c.useState)(null),$=Object(n.a)(L,2),_=$[0],G=$[1],J=function(e){z(null),M(!1)},Q=[{name:"Para propriet\xe1rios",link:"/para-proprietarios",activeIndex:2,selectedIndex:0},{name:"Anunciar im\xf3vel para alugar",link:"/meus-imoveis",activeIndex:2,selectedIndex:1},{name:"Meus Im\xf3veis",link:"/meus-imoveis",activeIndex:2,selectedIndex:2}],K=[{name:"Home",link:"/",activeIndex:0},{name:"Im\xf3veis para alugar",link:"/imoveis-para-alugar",activeIndex:1},{name:"Para proprietarios",link:"/para-proprietarios",activeIndex:2,ariaOwns:S?"simple-menu":void 0,ariaPopup:S?"true":void 0,mouseOver:function(e){return z(e.currentTarget),void M(!0)}},{name:"Quem somos",link:"/quem-somos",activeIndex:3},{name:"Contate nos",link:"/contato",activeIndex:4}];Object(c.useEffect)((function(){[].concat(Q,K).forEach((function(e){switch(window.location.pathname){case"".concat(e.link):m.a.currentUser?(console.log("existe usuario"),G(m.a.currentUser)):(console.log("nao existe usuario"),a.history.push("/signin")),a.value!==e.activeIndex&&(a.setValue(e.activeIndex),e.selectedIndex&&e.selectedIndex!==a.selectedIndex&&a.setSelectedIndex(e.selectedIndex))}}))}),[a.value,Q,a.selectedIndex,K,a,a.history,_]);var Z=l.a.createElement(l.a.Fragment,null,l.a.createElement(p.a,{value:a.value,onChange:function(e,t){a.setValue(t)},className:t.tabContainer,indicatorColor:"primary"},K.map((function(e,a){return l.a.createElement(b.a,{key:"".concat(e).concat(a),className:t.tab,component:i.b,to:e.link,label:e.name,"aria-owns":e.ariaOwns,"aria-haspopup":e.ariaPopup,onMouseOver:e.mouseOver})}))),l.a.createElement(f.a,{id:"simple-menu",anchorEl:S,open:B,onClose:J,classes:{paper:t.menu},MenuListProps:{onMouseLeave:J},style:{zIndex:1302},keepMounted:!0},Q.map((function(e,n){return l.a.createElement(g.a,{key:"".concat(e).concat(n),component:i.b,to:e.link,classes:{root:t.menuItem},onClick:function(e){!function(e,t){z(null),M(!1),a.setSelectedIndex(t)}(0,n),a.setValue(1),J()},selected:n===a.selectedIndex&&1===a.value},e.name)})))),X=l.a.createElement(l.a.Fragment,null,l.a.createElement(h.a,{disableBackdropTransition:!s,disableDiscovery:s,open:D,onClose:function(){return H(!1)},onOpen:function(){return H(!0)},classes:{paper:t.drawer}},l.a.createElement("div",{className:t.toolbarMargin}),l.a.createElement(E.a,{disablePadding:!0},K.map((function(e){return l.a.createElement(v.a,{divider:!0,key:"".concat(e).concat(e.activeIndex),button:!0,component:i.b,to:e.link,selected:a.value===e.activeIndex,classes:{selected:t.drawerItemSelected},onClick:function(){H(!1),a.setValue(e.activeIndex)}},l.a.createElement(j.a,{className:t.drawerItems,disableTypography:!0},e.name))})))));return l.a.createElement(l.a.Fragment,null,l.a.createElement(q,null,l.a.createElement(w.a,{position:"fixed",className:t.appbar},l.a.createElement(k.a,{disableGutters:!0,className:t.toolbar},l.a.createElement(x.a,{lgUp:!0},l.a.createElement(O.a,{className:t.drawerIconContainer,onClick:function(){return H(!D)},disableRipple:!0},l.a.createElement(P.a,{className:t.drawerIcon}))),l.a.createElement(y.a,{component:i.b,to:"/",className:t.logoContainer,onClick:function(){return a.setValue(0)}},l.a.createElement("img",{alt:"logo marca",src:W.a,className:t.logo})),o?X:Z,l.a.createElement(x.a,{xsDown:!0},null!==a.firebaseUser?l.a.createElement(y.a,{variant:"contained",color:"default",className:t.accountButtom,startIcon:l.a.createElement(T.a,null),onClick:function(){m.a.signOut().then((function(){a.history.push("/signin")}))}},"Fechar sess\xe3o"):l.a.createElement(i.b,{to:"/signin",style:{textDecoration:"none"}},l.a.createElement(y.a,{variant:"contained",color:"default",className:t.accountButtom,startIcon:l.a.createElement(T.a,null)},"Area cliente")))))),l.a.createElement("div",{className:t.toolbarMargin}),l.a.createElement(I.a,null))}))}).call(this,t(83))},92:function(e,a,t){e.exports=t.p+"static/media/aluguenahora.logo.f496b5f0.svg"},94:function(e,a,t){e.exports=t.p+"static/media/facebook-square-brands.34e73505.svg"},95:function(e,a,t){e.exports=t.p+"static/media/twitter-brands.6620c8ae.svg"},96:function(e,a,t){e.exports=t.p+"static/media/instagram-square-brands.6c6931f4.svg"},97:function(e,a,t){e.exports=t.p+"static/media/linkedin-brands.d9049f46.svg"}},[[107,1,2]]]);
//# sourceMappingURL=main.de707348.chunk.js.map