(this["webpackJsonpalugue-na-hora-project"]=this["webpackJsonpalugue-na-hora-project"]||[]).push([[0],{108:function(e,a,t){e.exports=t(123)},123:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),o=t(11),l=t.n(o),c=t(33),i=t(22),m=t(15),s=t(178),u=t(96),d=Object(u.a)({palette:{common:{algBlue:"".concat("#ffffff"),algOrange:"".concat("#dc2f02")},primary:{main:"".concat("#ffffff")},secondary:{main:"".concat("#dc2f02")}},typography:{tab:{fontFamily:"Raleway",textTransform:"none",fontWeight:700},h1:{fontWeight:400},h2:{fontWeight:700,fontSize:"3rem",lineHeight:1.5},h3:{fontWeight:300,fontSize:"2rem",lineHeight:1.5,color:"gray"},h4:{fontSize:"1.75rem",fontWeight:700},subtitle1:{fontSize:"1.25em",fontWeight:300}}}),p=t(86),b=t(20),f=t(90),g=t(91),h=t(98),E=t(97),v=t(99),w=t(102),k=t(103),x=Object(k.a)((function(e){return{customButton:{marginTop:"2em",width:"20em",height:"3.5em",borderRadius:"0.5em"}}})),I=function(e){var a=e.children,t=Object(v.a)(e,["children"]),n=x();return r.a.createElement(w.a,Object.assign({variant:"contained",size:"medium",color:"secondary",className:n.customButton},t),a)},j=t(49);t(119),t(121);j.a.initializeApp({apiKey:"AIzaSyA79cJIiu3En1dHAPg3wGWBZF_qfs6DRMw",authDomain:"alugue-na-hora-a427b.firebaseapp.com",databaseURL:"https://alugue-na-hora-a427b.firebaseio.com",projectId:"alugue-na-hora-a427b",storageBucket:"alugue-na-hora-a427b.appspot.com",messagingSenderId:"825237480393",appId:"1:825237480393:web:455014ad2e22c305dcbe18"});var y=j.a.auth(),C=(j.a.firestore(),new j.a.auth.GoogleAuthProvider);C.setCustomParameters({prompt:"select_account"});var O=function(){return y.signInWithPopup(C)},N=(j.a,t(175)),S=t(63),P=t(179),z=t(176),q=function(e){Object(h.a)(t,e);var a=Object(E.a)(t);function t(e){var n;return Object(f.a)(this,t),(n=a.call(this,e)).handleSubmit=function(e){e.preventDefault(),n.setState({email:"",password:""})},n.handleChange=function(e){var a=e.target,t=a.value,r=a.name;n.setState(Object(b.a)({},r,t))},n.state={emai:"",password:""},n}return Object(g.a)(t,[{key:"render",value:function(){return r.a.createElement(N.a,{container:!0,justify:"center"},r.a.createElement(N.a,{item:!0,style:{marginTop:"5em"}},r.a.createElement(S.a,{variant:"h2"},"J\xe1 tenho uma conta"),r.a.createElement(S.a,{variant:"h3"},"Entra com seu email e contrasenha"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement(P.a,{fullWidth:!0,name:"email",value:this.state.email||"",type:"email",autoComplete:"on",label:"Email",variant:"outlined",onChange:this.handleChange,required:!0,md:6,xs:12,style:{marginTop:"2em"}}),r.a.createElement(P.a,{fullWidth:!0,name:"password",id:"password",type:"password",autoComplete:"on",label:"Password",variant:"outlined",onChange:this.handleChange,value:this.state.password||"",required:!0,md:6,xs:12,style:{marginTop:"2em"}}),r.a.createElement(N.a,{container:!0,justify:"space-between"},r.a.createElement(I,{variant:"contained",type:"submit",value:"submit-form",color:"secondary"},"Sign in"),r.a.createElement(I,{variant:"contained",onClick:O,value:"submit-form",color:"primary",style:{marginLeft:"1em"},startIcon:r.a.createElement(z.a,{className:"fab fa-google"})},"Sign in with Google")))))}}]),t}(r.a.Component),R=function(){return r.a.createElement("div",null,r.a.createElement(q,null))},T=t(131),V=Object(k.a)((function(e){return{mainContainer:{marginTop:"5em",alignCenter:"center",width:"100%"},filterContainer:{marginTop:"1em"}}})),W=[{value:"1",label:"1 quarto"},{value:"2",label:"2 quartos"},{value:"3",label:"3 quartos"},{value:"4",label:"4 quartos +"}],A=[{value:"1",label:"R$ 1.000"},{value:"2",label:"R$ 2.000"},{value:"3",label:"R$ 3.000"},{value:"4",label:"R$ 4.000"},{value:"5",label:"R$ 5.000"},{value:"6",label:"R$ 10.000 +"}];var B=function(e){var a=V(),t=Object(n.useState)("2"),o=Object(c.a)(t,2),l=o[0],i=o[1],m=r.a.useState("2"),s=Object(c.a)(m,2),u=s[0],d=s[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement(N.a,{container:!0,direction:"column"},r.a.createElement(N.a,{container:!0,className:a.mainContainer,justify:"center"},r.a.createElement(N.a,{item:!0},r.a.createElement(S.a,{variant:"h2",className:"h2"},"Alugue na Hora"),r.a.createElement(S.a,{variant:"h3",className:"h3"},"Encontre seu im\xf3vel"),r.a.createElement("form",null,r.a.createElement(P.a,{fullWidth:!0,disabled:!0,id:"outlined-disabled",label:"Cidade",defaultValue:"Campo Grande",variant:"outlined",md:6,xs:12}),r.a.createElement(N.a,{container:!0,className:a.filterContainer},r.a.createElement(P.a,{id:"outlined-search",label:"Busque por bairro",type:"search",variant:"outlined",md:3,xs:6}),r.a.createElement(P.a,{id:"outlined-select-price",select:!0,value:u,onChange:function(e){d(e.target.value)},helperText:"Selecione n\xba de quartos ",variant:"outlined",md:3,xs:6},W.map((function(e){return r.a.createElement(T.a,{key:e.value,value:e.value},e.label)}))),r.a.createElement(P.a,{id:"outlined-select-room",select:!0,value:l,onChange:function(e){i(e.target.value)},helperText:"Selecione precio",variant:"outlined"},A.map((function(e){return r.a.createElement(T.a,{key:e.value,value:e.value},e.label)})))),r.a.createElement(I,{variant:"contained",size:"medium",color:"secondary"},"Encontrar im\xf3veis")))),r.a.createElement(N.a,{item:!0,className:a.formContainer})))},M=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Im\xf3veis para alugar"))},D=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Quem somos"),r.a.createElement("h2",null,"Chupa cadelao!!!"),r.a.createElement("span",null),"\ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23 \ud83e\udd23")},F=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Pagina contato"))},H=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Anuncie seu im\xf3vel para alugar"))},L=function(){return r.a.createElement("div",null,r.a.createElement("h2",null,"Meus im\xf3veis"))},$=t(177),_=t(104),G=t(92),J=t.n(G),Q=t(93),U=t.n(Q),K=t(94),Z=t.n(K),X=t(95),Y=t.n(X),ee=t(136),ae=Object($.a)((function(e){var a,t,n;return{footer:(a={backgroundColor:"white",width:"100%",height:"11em",zIndex:1302,position:"absolute",bottom:0},Object(b.a)(a,e.breakpoints.down("md"),{height:"8em"}),Object(b.a)(a,e.breakpoints.down("xs"),{height:"6em"}),a),mainContainer:(t={},Object(b.a)(t,e.breakpoints.down("md"),{height:"8em"}),Object(b.a)(t,e.breakpoints.down("xs"),{height:"6em"}),t),link:{fontFamily:"Arial",fontSize:"0.75rem",fontWeight:"bold",textDecoration:"none",color:"#5D5F62"},gridItem:{margin:"3em"},icon:Object(b.a)({margin:"1em",height:"2em",width:"2em"},e.breakpoints.down("xs"),{height:"1.5em",width:"1.5em"}),socialContainer:(n={},Object(b.a)(n,e.breakpoints.down("md"),{marginTop:"2em",justifyContent:"center"}),Object(b.a)(n,e.breakpoints.down("xs"),{marginTop:"1em",justifyContent:"center"}),n)}})),te=function(e){var a=ae();return r.a.createElement("footer",{className:a.footer},r.a.createElement(ee.a,null),r.a.createElement(N.a,{container:!0,justify:"space-around",alignItems:"center",className:a.mainContainer},r.a.createElement(_.a,{mdDown:!0},r.a.createElement(N.a,{item:!0},r.a.createElement(N.a,{container:!0},r.a.createElement(N.a,{item:!0,className:a.gridItem},r.a.createElement(N.a,{container:!0,direction:"column",spacing:2},r.a.createElement(N.a,{item:!0,component:i.b,onClick:function(){return e.setValue(0)},to:"/",className:a.link},"Home"))),r.a.createElement(N.a,{item:!0,className:a.gridItem},r.a.createElement(N.a,{container:!0,direction:"column",spacing:2},r.a.createElement(N.a,{item:!0,component:i.b,onClick:function(){return e.setValue(1)},to:"/imoveis-para-alugar",className:a.link},"Im\xf3veis para alugar"))),r.a.createElement(N.a,{item:!0,className:a.gridItem},r.a.createElement(N.a,{container:!0,direction:"column",spacing:2},r.a.createElement(N.a,{item:!0,className:a.link},"Para propriet\xe1rios"),r.a.createElement(N.a,{item:!0,component:i.b,onClick:function(){e.setValue(2),e.setSelectedIndex(1)},to:"/anunciar-para-alugar",className:a.link},"Anunciar im\xf3vel para alugar"),r.a.createElement(N.a,{item:!0,component:i.b,onClick:function(){e.setValue(2),e.setSelectedIndex(2)},to:"/meus-imoveis",className:a.link},"Meus im\xf3veis"))),r.a.createElement(N.a,{item:!0,className:a.gridItem},r.a.createElement(N.a,{container:!0,direction:"column",spacing:2},r.a.createElement(N.a,{item:!0,component:i.b,onClick:function(){return e.setValue(3)},to:"/quem-somos",className:a.link},"Quem somos"),r.a.createElement(N.a,{item:!0,component:i.b,onClick:function(){return e.setValue(4)},to:"/contato",className:a.link},"Contate nos")))))),r.a.createElement(N.a,{item:!0,className:a.socialContainer},r.a.createElement(N.a,{container:!0,justify:"center"},r.a.createElement(N.a,{item:!0,component:"a",href:"https://www.facebook.com",rel:"noopener noreferrer",target:"_blank"},r.a.createElement("img",{alt:"facebook logo",src:J.a,className:a.icon})),r.a.createElement(N.a,{item:!0,component:"a",href:"https://www.twitter.com",rel:"noopener noreferrer",target:"_blank"},r.a.createElement("img",{alt:"twitter logo",src:U.a,className:a.icon})),r.a.createElement(N.a,{item:!0,component:"a",href:"https://www.instagram.com",rel:"noopener noreferrer",target:"_blank"},r.a.createElement("img",{alt:"instagram logo",src:Z.a,className:a.icon})),r.a.createElement(N.a,{item:!0,component:"a",href:"https://www.linkedin.com",rel:"noopener noreferrer",target:"_blank"},r.a.createElement("img",{alt:"linkedin logo",src:Y.a,className:a.icon}))))))},ne=function(){var e=Object(n.useState)(0),a=Object(c.a)(e,2),t=a[0],o=a[1],l=Object(n.useState)(0),u=Object(c.a)(l,2),b=u[0],f=u[1];return r.a.createElement(s.a,{theme:d},r.a.createElement(i.a,null,r.a.createElement(p.a,{value:b,setValue:f,selectedIndex:t,setSelectedIndex:o}),r.a.createElement(m.c,null,r.a.createElement(m.a,{exact:!0,path:"/",component:B}),r.a.createElement(m.a,{path:"/imoveis-para-alugar",component:function(){return r.a.createElement(M,null)}}),r.a.createElement(m.a,{path:"/quem-somos",component:function(){return r.a.createElement(D,null)}}),r.a.createElement(m.a,{path:"/contato",component:function(){return r.a.createElement(F,null)}}),r.a.createElement(m.a,{path:"/anunciar-para-alugar",component:function(){return r.a.createElement(H,null)}}),r.a.createElement(m.a,{path:"/meus-imoveis",component:function(){return r.a.createElement(L,null)}}),r.a.createElement(m.a,{path:"/contato",component:function(){return r.a.createElement(F,null)}}),r.a.createElement(m.a,{path:"/signin",component:function(){return r.a.createElement(R,null)}})),r.a.createElement(te,{value:b,setValue:f,selectedIndex:t,setSelectedIndex:o})))};l.a.render(r.a.createElement(ne,null),document.getElementById("root"))},86:function(e,a,t){"use strict";(function(e){var n=t(33),r=t(20),o=t(41),l=t(0),c=t.n(l),i=t(22),m=t(125),s=t(126),u=t(137),d=t(128),p=t(70),b=t(131),f=t(138),g=t(130),h=t(101),E=t(132),v=t(133),w=t(134),k=t(104),x=t(135),I=t(102),j=t(136),y=t(103),C=t(14),O=t(88),N=t.n(O),S=t(89),P=t.n(S),z=t(87),q=t.n(z);function R(e){var a=e.children,t=Object(m.a)({disableHysteresis:!0,threshold:0});return c.a.cloneElement(a,{elevation:t?4:0})}var T=Object(y.a)((function(e){var a,t;return{toolbarMargin:Object(o.a)({},e.mixins.toolbar),tabContainer:{marginRight:"auto"},tab:Object(o.a)(Object(o.a)({},e.typography.tab),{},{minWidth:10,marginLeft:"25px"}),logoContainer:{"&:hover":{backgroundColor:"transparent"}},logo:Object(r.a)({height:"2.7em",marginBottom:"0.5em",marginLeft:"1.5em"},e.breakpoints.down("xs"),{height:"2em"}),menuItem:Object(o.a)(Object(o.a)({},e.typography.tab),{},{fontSize:14,opacity:.6,"&:hover":{opacity:1.1}}),drawerIconContainer:{"&:hover":{backgroundColor:"transparent"}},drawerIcon:(a={height:"40px",width:"40px"},Object(r.a)(a,e.breakpoints.down("md"),{height:"30px",width:"30"}),Object(r.a)(a,e.breakpoints.down("xs"),{height:"25px",width:"25"}),a),drawerItems:Object(o.a)(Object(o.a)({},e.typography.tab),{},{fontSize:14,opacity:.6}),drawerItemSelected:{opacity:1.1},appbar:{zIndex:e.zIndex.modal+1,backgroundColor:"#ffffff"},toolbar:(t={},Object(r.a)(t,e.breakpoints.down("md"),{justifyContent:"space-between"}),Object(r.a)(t,e.breakpoints.down("xs"),{justifyContent:"start"}),t),accountButtom:{marginRight:"1.5em",borderRadius:"5em"}}}));a.a=function(a){var t=T(),r=Object(C.a)(),o=Object(s.a)(r.breakpoints.down("md")),m=e.browser&&/iPad|iPhone|iPod/.test(navigator.userAgent),y=Object(l.useState)(null),O=Object(n.a)(y,2),S=O[0],z=O[1],V=Object(l.useState)(!1),W=Object(n.a)(V,2),A=W[0],B=W[1],M=Object(l.useState)(!1),D=Object(n.a)(M,2),F=D[0],H=D[1],L=function(e){z(null),B(!1)},$=[{name:"Para propriet\xe1rios",link:"/para-proprietarios",activeIndex:2,selectedIndex:0},{name:"Anunciar im\xf3vel para alugar",link:"/anunciar-para-alugar",activeIndex:2,selectedIndex:1},{name:"Meus Im\xf3veis",link:"/meus-imoveis",activeIndex:2,selectedIndex:2}],_=[{name:"Home",link:"/",activeIndex:0},{name:"Im\xf3veis para alugar",link:"/imoveis-para-alugar",activeIndex:1},{name:"Para proprietarios",link:"/para-proprietarios",activeIndex:2,ariaOwns:S?"simple-menu":void 0,ariaPopup:S?"true":void 0,mouseOver:function(e){return z(e.currentTarget),void B(!0)}},{name:"Quem somos",link:"/quem-somos",activeIndex:3},{name:"Contate nos",link:"/contato",activeIndex:4}];Object(l.useEffect)((function(){[].concat($,_).forEach((function(e){switch(window.location.pathname){case"".concat(e.link):a.value!==e.activeIndex&&(a.setValue(e.activeIndex),e.selectedIndex&&e.selectedIndex!==a.selectedIndex&&a.setSelectedIndex(e.selectedIndex))}}))}),[a.value,$,a.selectedIndex,_,a]);var G=c.a.createElement(c.a.Fragment,null,c.a.createElement(u.a,{value:a.value,onChange:function(e,t){a.setValue(t)},className:t.tabContainer,indicatorColor:"primary"},_.map((function(e,a){return c.a.createElement(d.a,{key:"".concat(e).concat(a),className:t.tab,component:i.b,to:e.link,label:e.name,"aria-owns":e.ariaOwns,"aria-haspopup":e.ariaPopup,onMouseOver:e.mouseOver})}))),c.a.createElement(p.a,{id:"simple-menu",anchorEl:S,open:A,onClose:L,classes:{paper:t.menu},MenuListProps:{onMouseLeave:L},style:{zIndex:1302},keepMounted:!0},$.map((function(e,n){return c.a.createElement(b.a,{key:"".concat(e).concat(n),component:i.b,to:e.link,classes:{root:t.menuItem},onClick:function(e){!function(e,t){z(null),B(!1),a.setSelectedIndex(t)}(0,n),a.setValue(1),L()},selected:n===a.selectedIndex&&1===a.value},e.name)})))),J=c.a.createElement(c.a.Fragment,null,c.a.createElement(f.a,{disableBackdropTransition:!m,disableDiscovery:m,open:F,onClose:function(){return H(!1)},onOpen:function(){return H(!0)},classes:{paper:t.drawer}},c.a.createElement("div",{className:t.toolbarMargin}),c.a.createElement(g.a,{disablePadding:!0},_.map((function(e){return c.a.createElement(h.a,{divider:!0,key:"".concat(e).concat(e.activeIndex),button:!0,component:i.b,to:e.link,selected:a.value===e.activeIndex,classes:{selected:t.drawerItemSelected},onClick:function(){H(!1),a.setValue(e.activeIndex)}},c.a.createElement(E.a,{className:t.drawerItems,disableTypography:!0},e.name))})))));return c.a.createElement(c.a.Fragment,null,c.a.createElement(R,null,c.a.createElement(v.a,{position:"fixed",className:t.appbar},c.a.createElement(w.a,{disableGutters:!0,className:t.toolbar},c.a.createElement(k.a,{lgUp:!0},c.a.createElement(x.a,{className:t.drawerIconContainer,onClick:function(){return H(!F)},disableRipple:!0},c.a.createElement(N.a,{className:t.drawerIcon}))),c.a.createElement(I.a,{component:i.b,to:"/",className:t.logoContainer,onClick:function(){return a.setValue(0)}},c.a.createElement("img",{alt:"logo marca",src:q.a,className:t.logo})),o?J:G,c.a.createElement(k.a,{xsDown:!0},c.a.createElement(i.b,{to:"/signin",style:{textDecoration:"none"}},c.a.createElement(I.a,{variant:"contained",color:"default",className:t.accountButtom,startIcon:c.a.createElement(P.a,null)},"Area cliente")))))),c.a.createElement("div",{className:t.toolbarMargin}),c.a.createElement(j.a,null))}}).call(this,t(78))},87:function(e,a,t){e.exports=t.p+"static/media/aluguenahora.logo.f496b5f0.svg"},92:function(e,a,t){e.exports=t.p+"static/media/facebook-square-brands.34e73505.svg"},93:function(e,a,t){e.exports=t.p+"static/media/twitter-brands.6620c8ae.svg"},94:function(e,a,t){e.exports=t.p+"static/media/instagram-square-brands.6c6931f4.svg"},95:function(e,a,t){e.exports=t.p+"static/media/linkedin-brands.d9049f46.svg"}},[[108,1,2]]]);
//# sourceMappingURL=main.ceb2bfa2.chunk.js.map