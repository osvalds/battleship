(this.webpackJsonpbattleship=this.webpackJsonpbattleship||[]).push([[0],{11:function(e,t,n){e.exports=n(22)},16:function(e,t,n){},21:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(9),o=n.n(c),l=(n(16),n(4)),i=n(1),u=n(3),s=n(5);function m(){return([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(e){return(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)}))}function f(e){return{rows:e.length,cols:e[0].length}}function d(){return Math.random()>=.5}function h(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}var p=function(e){return e.flat(2).reduce((function(e,t){return t+e}))};var v=n(2),b=n.n(v),g=r.a.memo((function(e){var t=e.ship,n=e.setDraggedShip,c=e.cellSize,o=void 0===c?10:c,l=e.gap,i=void 0===l?1:l,u=e.isSunken,s=e.isSmall,m=f(t),d=m.rows,h=m.cols,p=o*h+h-1,v=o*d+d-1,g=Object(a.useCallback)((function(e,a){n(t,e,a)}),[n,t]),E=b()("ship ship--".concat(h),{"ship--small":s},{"ship--sunken":u});return r.a.createElement("div",{className:E,onMouseDown:function(e){g(-1,-1)}},r.a.createElement("svg",{viewBox:"0 0 ".concat(p," ").concat(v),xmlns:"http://www.w3.org/2000/svg"},t.map((function(e,t){return e.map((function(e,n){return e?r.a.createElement("rect",{key:"".concat(n,":").concat(t),fill:"white",stroke:"transparent",x:n*o+n*i,y:t*o+t*i,width:o,height:o,onMouseDown:function(e){g(n,t),e.stopPropagation()}}):null}))}))))})),E=r.a.memo((function(e){return null===e.ship?null:r.a.createElement(g,e)})),y=function(e){for(var t=f(e),n=t.rows,a=t.cols,r=new Array(a).fill().map((function(){return new Array(n).fill(0)})),c=0;c<n;c++)for(var o=0;o<a;o++)r[a-o-1][c]=e[c][o];return r},S=r.a.memo((function(e){var t=e.templates,n=e.setDraggedShip,c=e.draggedShip,o=e.w,l=Object(a.useState)(!1),u=Object(i.a)(l,2),s=u[0],m=u[1],f=Object(a.useCallback)((function(e,t,a){n(e,t,a),m(!1)}),[m,n]);return r.a.createElement("div",{className:"ship-with-tooltip",onMouseLeave:function(){return m(!1)}},r.a.createElement("div",{onMouseEnter:function(){return m(!0)}},r.a.createElement(E,{ship:t[0],setDraggedShip:f})),t.length>1&&null===c&&s&&r.a.createElement("div",{className:"ship-with-tooltip__box",style:{width:o}},t.map((function(e,t){return r.a.createElement(E,{ship:e,key:"key-".concat(t),setDraggedShip:f})}))))})),w=r.a.memo((function(e){var t=e.allowed,n=e.children,a=b()("ship-group",{"ship-group--disabled":t<=0});return r.a.createElement("div",{className:a},r.a.createElement("div",{className:"ship-group__label"},t,"\xd7"),n)})),O=r.a.memo((function(e){var t=e.draggedShip,n=e.setDraggedShip,c=e.allowedCounts,o=Object(a.useContext)(_),l=Object(i.a)(o,1)[0];return r.a.createElement("div",{className:"ship-selector"},l.shipConfig.map((function(e,a){return r.a.createElement(w,{key:"group-".concat(a),allowed:c[a]},e.map((function(e,c){return r.a.createElement(S,{key:"ship-".concat(a,"-").concat(c),draggedShip:t,setDraggedShip:n,w:e.w,templateName:"ship-".concat(a,"-").concat(c),templates:e.t})})))})))})),j=function(e){for(var t=e.template,n=e.mutations,a=[t],r=0;r<n;r++)a.push(y(a[r]));return a},k=j({mutations:0,template:[[1]]}),x=j({mutations:1,template:[[1,1]]}),C=j({mutations:1,template:[[1,1,1]]}),N=j({mutations:3,template:[[1,1],[1,0]]}),M=j({mutations:0,template:[[1,1],[1,1]]}),D=j({mutations:1,template:[[1,1,1,1]]}),P={simple:{name:"simple",cols:"ABCDEFGHIJ",shipConfig:[[{t:k,w:null}],[{t:x,w:170}],[{t:C,w:210}],[{t:D,w:245}]]},advanced:{name:"advanced",cols:"KARTUPELIS",shipConfig:[[{t:k,w:null}],[{t:x,w:170}],[{t:C,w:210},{t:N,w:385}],[{t:D,w:245},{t:M,w:null},{t:j({mutations:3,template:[[1,1,1],[1,0,0]]}).concat(j({mutations:3,template:[[1,0,0],[1,1,1]]})),w:459},{t:j({mutations:3,template:[[0,1,0],[1,1,1]]}),w:459},{t:j({mutations:1,template:[[1,1,0],[0,1,1]]}).concat(j({mutations:1,template:[[0,1,1],[1,1,0]]})),w:459}]]}},_=r.a.createContext(P.advanced),A=[1,2,3,4,5,6,7,8,9,10],L=r.a.memo((function(e){var t=e.x,n=e.y,a=e.template,c=e.cellSize,o=void 0===c?10:c,l=e.gap,i=void 0===l?1:l,u=e.handleMouseDown,s=e.uuid;return r.a.createElement("g",{className:"board-ship",onMouseDown:function(){return u(-1,-1)}},a.map((function(e,a){return e.map((function(e,c){return e?r.a.createElement("rect",{key:"".concat(s,"-").concat(a,"-").concat(c),onMouseDown:function(e){u(c,a),e.stopPropagation()},strokeWidth:"2",stroke:"transparent",x:(t+c+1)*o+(t+c+1)*i,y:(n+a+1)*o+(n+a+1)*i,width:o,height:o}):null}))})))})),I=function(e){return e.inBounds?e.isOverlapping?"#b80d57":"white":"#ffd868"},T=function(e,t,n){var a=e.length,r=100/e[0].length,c=100/a;return"translate(-".concat(r/2+r*t,"%, -").concat(c/2+c*n,"%)")},B=r.a.memo((function(e){var t=e.letters,n=e.handleMouseEnter;return r.a.createElement("g",{className:"letter-row"},t.map((function(e,t){return r.a.createElement("g",{key:e},r.a.createElement("rect",{stroke:"var(--body-background)",strokeWidth:"2",fill:"var(--body-background)",x:10*(t+1)+1*(t+1),y:"0",width:10,height:10,onMouseEnter:n}),r.a.createElement("text",{x:10*(t+1)+1*t,y:10,transform:"translate(3,-2)",textLength:10,fill:"white",style:{fontSize:"9"}},e))})))})),Y=r.a.memo((function(e){var t=e.numbers,n=e.handleMouseEnter;return r.a.createElement("g",{className:"number-col"},t.map((function(e,t){return r.a.createElement("g",{key:e},r.a.createElement("rect",{stroke:"var(--body-background)",strokeWidth:"2",fill:"var(--body-background)",x:"0",y:10*(t+1)+1*(t+1),width:10,height:10,onMouseEnter:n}),r.a.createElement("text",{x:"0",y:10*(t+2)+1*t,textLength:10,fill:"white",transform:"translate(".concat(10===e?0:4,",-1)"),onMouseEnter:n,style:{fontSize:"9"}},e))})))})),G=r.a.memo((function(e){var t=e.cols,n=e.rows,a=e.handleMouseEnter,c=e.className,o=e.handleClick,l=void 0===o?function(){return null}:o;return r.a.createElement("g",{className:"blank-placeholders"},t.map((function(e,t){return n.map((function(n,o){return r.a.createElement("rect",{key:"".concat(e,":").concat(n),className:c,stroke:"transparent",fill:"#109DAC",x:10*(t+1)+1*(t+1),y:10*(o+1)+1*(o+1),width:10,height:10,onClick:function(){return l({x:t,y:o})},onMouseEnter:function(){return a({x:t,y:o})}})}))})))}));function z(e){var t=e.placedShips,n=e.draggingPosition,c=e.handleCellMouseEnter,o=e.draggedShip,l=e.handlePlacedShipDragging,s=Object(a.useContext)(_),m=Object(i.a)(s,1)[0],f=Object(u.a)(m.cols);return r.a.createElement("div",{className:"board"},o&&o.isDragging&&r.a.createElement("div",{style:{position:"fixed",zIndex:"2",left:n.x,top:n.y,pointerEvents:"none",transform:T(o.template,o.offset.x,o.offset.y)}},r.a.createElement(E,{ship:o.template})),r.a.createElement("svg",{viewBox:"0 0 ".concat(121," ").concat(121),onMouseLeave:function(){return c({x:-1,y:-1})},xmlns:"http://www.w3.org/2000/svg"},r.a.createElement(G,{cols:f,rows:A,handleMouseEnter:c}),r.a.createElement("g",{style:o?{pointerEvents:"none",fill:"white"}:{cursor:"pointer",fill:"white"}},t.map((function(e){return r.a.createElement(L,{template:e.template,uuid:e.uuid,key:e.uuid,handleMouseDown:function(t,n){c({x:e.x+t,y:e.y+n}),l(e,t,n)},x:e.x,y:e.y})}))),o&&o.isSnapping&&r.a.createElement("g",{style:{pointerEvents:"none",fill:I(o)}},r.a.createElement(L,{template:o.template,uuid:o.uuid,x:o.x,y:o.y})),r.a.createElement(B,{letters:f,handleMouseEnter:function(){return c({x:-1,y:-1})}}),r.a.createElement(Y,{numbers:A,handleMouseEnter:function(){return c({x:-1,y:-1})}})))}function U(e){var t=e.onCellClick,n=e.handleCellMouseEnter,c=e.children,o=Object(a.useContext)(_),l=Object(i.a)(o,1)[0],s=Object(u.a)(l.cols);return r.a.createElement("div",{className:"board"},r.a.createElement("svg",{viewBox:"0 0 ".concat(121," ").concat(121),onMouseLeave:function(){return n({x:-1,y:-1})},xmlns:"http://www.w3.org/2000/svg"},r.a.createElement(G,{cols:s,rows:A,className:"board-hover",handleClick:t,handleMouseEnter:n}),r.a.createElement(B,{letters:s,handleMouseEnter:function(){return n({x:-1,y:-1})}}),r.a.createElement(Y,{numbers:A,handleMouseEnter:function(){return n({x:-1,y:-1})}}),c))}var W=n(10),F=n.n(W);function R(e){var t=e.onClick,n=e.isDisabled,a=e.children,c=e.cn,o=e.outlined,l=e.isActive,i=b()("button",{"button--disabled":n},{"button--outlined":o},{"button--active":l},c);return r.a.createElement("button",{className:i,onClick:t},a)}function V(e,t){return 10*(e+t+1)+1*(e+t+1)}function H(e){var t=e.placedShots,n=e.shotSource;return t?r.a.createElement("g",{className:"placed-shots placed-shots--".concat(n)},t.map((function(e){var t=Object(i.a)(e,2),n=t[0],a=t[1];return r.a.createElement("g",{className:"placed-shots__group",key:"".concat(n,"-").concat(a)},r.a.createElement("rect",{className:"placed-shots__mask",stroke:"transparent",fill:"transparent",x:V(n,0),y:V(a,0),width:10,height:10}),r.a.createElement("circle",{className:"placed-shots__shot",cx:V(n,0)+5,cy:V(a,0)+5,r:"1.5"}))}))):null}var J=function(e,t,n){if(null===e||void 0===e?void 0:e.hits){var a=e.hits.filter((function(e){var a=Object(i.a)(e,2),r=a[0],c=a[1];return!(r===t&&c===n)}));return Object(s.a)({},e,{hits:[].concat(Object(u.a)(a),[[t,n]])})}return Object(s.a)({},e,{hits:[[t,n]]})},X=function(e){var t=e.template,n=e.hits;return t.flat(5).reduce((function(e,t){return t+e}))===n.length};function K(e){return e.hits.map((function(e){var t=Object(i.a)(e,2),n=t[0],a=t[1],c=V(n,0),o=V(a,0);return r.a.createElement("g",{className:"bombed-cell__wrapper",key:"".concat(n,"-").concat(a)},r.a.createElement("rect",{className:"bombed-ship__cell",x:c,y:o,width:10,height:10}),r.a.createElement("path",{d:"M ".concat(c+.5," ").concat(o+.5," \n                        L ").concat(c+10-.5," ").concat(o+10-.5,"\n                        M ").concat(c+.5," ").concat(o+10-.5,"\n                        L ").concat(c+10-.5," ").concat(o+.5),strokeWidth:"1",stroke:"var(--button-primary-bgcolor)"}))}))}function $(e){for(var t="M ".concat(e[0][0]," ").concat(e[0][1]),n=1;n<e.length;n++)t+=" ".concat(e[n][0]," ").concat(e[n][1]);return t}function q(e){for(var t=e.ship,n=[],a=t.template,c=t.x,o=t.y,l=f(a),i=l.rows,u=l.cols,s=0;s<i;s++)for(var m=0;m<u;m++)if(a[s][m]){var d=V(c,m)+.5,h=V(o,s)+.5,p=d+10-.5,v=h+10-.5;n.push([d,h],[d,v],[p,h],[p,v])}return r.a.createElement("path",{fill:"transparent",stroke:"var(--button-primary-bgcolor)",strokeWidth:"1",d:$(F()(n,1))})}function Q(e){return e.ships.map((function(e){var t=e.isSunken,n=e.hits,a=e.uuid;return r.a.createElement("g",{key:a,className:"bombed-ship bombed-ship--".concat(t)},r.a.createElement(K,{hits:n}),t&&r.a.createElement(q,{ship:e}))}))}function Z(e,t,n){for(var a=0,r=n.length;a<r;a++)if(n[a][0]===e&&n[a][1]===t)return!0;return!1}function ee(e,t,n){for(var a=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],r=function(e){for(var t=e.x,n=e.y,a=e.template,r=f(a),c=r.rows,o=r.cols,l=[],i=0;i<c;i++)for(var u=0;u<o;u++)a[i][u]&&l.push([t+u,n+i]);return l}(e),c=[],o=0;o<e.hits.length;o++){var u,s=Object(i.a)(e.hits[o],2),m=s[0],d=s[1],h=Object(l.a)(a);try{for(h.s();!(u=h.n()).done;){var p=Object(i.a)(u.value,2),v=p[0],b=d+p[1],g=m+v;b>-1&&b<10&&g>-1&&g<10&&(Z(g,b,c)||Z(g,b,t)||Z(g,b,r)||Z(g,b,n)||c.push([g,b]))}}catch(E){h.e(E)}finally{h.f()}}return c}var te=[[[1]],[[1,1]],[[1,1,1]],[[1,1,1,1]]];function ne(e){var t=e.row,n=Object(i.a)(t,2),a=n[0],c=n[1];return r.a.createElement("div",{className:"targets__row"},c.sort((function(e,t){return e.isSunken-t.isSunken})).reverse().map((function(e,t){return r.a.createElement(E,{ship:te[a-1],isSmall:!0,isSunken:e.isSunken,key:"key-".concat(a,"-").concat(t),setDraggedShip:function(){return null}})})))}function ae(e){var t=e.ships,n=e.gameState;if(0===t.length)return null;var a,c,o=(a=t.map((function(e){return{size:p(e.template),isSunken:!0===e.isSunken}})),c="size",a.reduce((function(e,t){var n=t[c];return e[n]||(e[n]=[]),e[n].push(t),e}),{})),l=b()("targets",{"targets--faded":"PLAYING"!==n});return r.a.createElement("div",{className:l},Object.entries(o).map((function(e,t){return r.a.createElement(ne,{row:e,key:t})})))}function re(e){var t=e.usePlacedShots,n=e.useEnemyShips,a=e.title,c=e.gameCanStart,o=e.isDisabled,l=e.onStartClick,s=e.gameState,m=e.useAutoShots,f=e.onMissedShot,d=e.showShips,h=Object(i.a)(t,2),p=h[0],v=h[1],g=Object(i.a)(m,2),E=g[0],y=g[1],S=Object(i.a)(n,2),w=S[0],O=S[1],j=b()("enemy-board",{"enemy-board--disabled":o});return r.a.createElement("div",{className:j},r.a.createElement("div",{className:"enemy-board__row"},r.a.createElement(U,{handleCellMouseEnter:function(){return null},onCellClick:function(e){var t=e.x,n=e.y,a=Object(u.a)(p),r=le(w);if(r[n][t]){var c=w.filter((function(e){return e.uuid!==r[n][t]})),o=w.filter((function(e){return e.uuid===r[n][t]}))[0];o=J(o,t,n),X(o)&&(o.isSunken=!0,y(E.concat(ee(o,p,E)))),O(c.concat([o]))}else f(),v(a.concat([[t,n]]))}},d&&w.map((function(e){return r.a.createElement(L,{template:e.template,uuid:e.uuid,key:e.uuid,handleMouseDown:function(){return null},x:e.x,y:e.y})})),r.a.createElement(H,{placedShots:p,shotSource:"player"}),r.a.createElement(H,{placedShots:E,shotSource:"computer"}),r.a.createElement(Q,{ships:w.filter((function(e){var t;return(null===(t=e.hits)||void 0===t?void 0:t.length)>0}))})),r.a.createElement(ae,{gameState:s,ships:w}),"SETUP"===s&&r.a.createElement(R,{isDisabled:!c,onClick:l,cn:"button--start"},"Start pew-pew")),r.a.createElement("h2",{className:"u-h2"},a))}var ce=function(e,t,n){var a=f(n),r=a.rows,c=a.cols;return!(e<0||t<0)&&(r+t<11&&c+e<11)},oe=function(e,t){for(var n=e.x,a=e.y,r=e.template,c=e.uuid,o=f(r),l=o.rows,i=o.cols,u=0;u<l;u++)for(var s=0;s<i;s++)t[a+u][n+s]=r[u][s]?c:""},le=function(e){var t,n=new Array(10).fill().map((function(){return new Array(10).fill("")})),a=Object(l.a)(e);try{for(a.s();!(t=a.n()).done;){var r=t.value;oe(r,n)}}catch(c){a.e(c)}finally{a.f()}return n},ie=[[-1,-1],[-1,0],[-1,1],[0,0],[0,-1],[0,1],[1,-1],[1,0],[1,1]],ue=function(e,t,n,a){for(var r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:le(a),c=f(n),o=c.rows,u=c.cols,s=0;s<o;s++)for(var m=0;m<u;m++)if(n[s][m]){var d,h=Object(l.a)(ie);try{for(h.s();!(d=h.n()).done;){var p=Object(i.a)(d.value,2),v=p[0],b=p[1],g=s+t+b,E=m+e+v;if(g>-1&&g<10&&E>-1&&E<10&&""!==r[g][E])return!0}}catch(y){h.e(y)}finally{h.f()}}return!1},se=function(e,t,n){return-1===t&&-1===n?function(e){var t=f(e),n=t.rows,a=t.cols;return{x:Math.floor((a-1)/2),y:Math.floor((n-1)/2)}}(e):{x:t,y:n}},me=function(e,t){for(var n=[],a=0;a<10;a++)for(var r=0;r<10;r++)ce(r,a,t)&&!ue(r,a,t,[],e)&&n.push([r,a]);return n},fe=function e(t){for(var n=new Array(10).fill().map((function(){return new Array(10).fill("")})),a=t.map((function(e){return[e.map((function(e){return e.t})).flat()]})).flat(),r=[],c=[],o=0;o<4;o++)for(var l=0;l<4-o;l++){var u=h(0,a[o].length-1);r.push(a[o][u])}for(var s=9;s>=0;s--){var f=me(n,r[s]);if(f.length>0){var d=Object(i.a)(f[h(0,f.length-1)],2),p=d[0],v=d[1];c.push({uuid:m(),x:p,y:v,template:r[s],inBounds:!0,isOverlapping:!1,isDragging:!1,isSnapping:!0}),oe({x:p,y:v,template:r[s]},n)}else e(t)}return c},de=function(e){var t,n=[4,3,2,1],a=Object(l.a)(e);try{for(a.s();!(t=a.n()).done;){var r=t.value;n[p(r.template)-1]--}}catch(c){a.e(c)}finally{a.f()}return n};function he(e){var t=e.usePlacedShips,n=e.title,c=e.gameState,o=Object(i.a)(t,2),l=o[0],f=o[1],d=Object(a.useState)(null),h=Object(i.a)(d,2),p=h[0],v=h[1],b=Object(a.useState)({x:0,y:0}),g=Object(i.a)(b,2),E=g[0],y=g[1],S=Object(a.useState)({x:-1,y:-1}),w=Object(i.a)(S,2),j=w[0],k=w[1],x=Object(a.useContext)(_),C=Object(i.a)(x,1)[0],N=Object(a.useCallback)((function(e){var t=e.x,n=e.y;k({x:t,y:n})}),[k]),M=Object(a.useCallback)((function(e,t,n){var a=m(),r=se(e,t,n);v({template:e,uuid:a,isDragging:!0,isSnapping:!1,offset:r,x:-1e5,y:-1e5})}),[v]),D=Object(a.useCallback)((function(){var e=j.x>-1&&j.y>-1,t=j.x-p.offset.x,n=j.y-p.offset.y,a=Object(s.a)({},p,{x:t,y:n,inBounds:ce(t,n,p.template),isOverlapping:ue(t,n,p.template,l),isDragging:!e,isSnapping:e});v(a)}),[p,v,j,l]),P=Object(a.useCallback)((function(e){if((null===p||void 0===p?void 0:p.isSnapping)&&p.inBounds&&!p.isOverlapping){var t=Object(u.a)(l);f(t.concat([Object(s.a)({},p)])),v(null),y({x:-1e3,y:-1e3})}else{if((null===p||void 0===p?void 0:p.lastValidPosition)&&p.inBounds){var n=Object(u.a)(l);f(n.concat([Object(s.a)({},p,{x:p.lastValidPosition.x,y:p.lastValidPosition.y})]))}y({x:-1e3,y:-1e3}),v(null)}}),[p,l,v,f,y]),A=Object(a.useCallback)((function(e,t,n){var a=l.filter((function(t){return t.uuid!==e.uuid}));e.offset=se(e.template,t,n),e.lastValidPosition={x:e.x,y:e.y},v(e),f(a)}),[l,f,v]),L=function(){f(fe(C.shipConfig))},I=Object(a.useCallback)((function(e){null===p||1!==e.buttons&&3!==e.buttons||(y({x:e.clientX,y:e.clientY}),D())}),[p,y,D]);Object(a.useEffect)((function(){return document.addEventListener("mousemove",I),function(){return document.removeEventListener("mousemove",I)}}),[I]);var T=Object(a.useCallback)((function(e){1!==e.buttons&&3!==e.buttons||y({x:e.clientX,y:e.clientY})}),[y]);return Object(a.useEffect)((function(){return document.addEventListener("mousedown",T,!1),function(){return document.removeEventListener("mousedown",T,!1)}}),[T]),Object(a.useEffect)((function(){return document.addEventListener("mouseup",P,!1),function(){return document.removeEventListener("mouseup",P,!1)}}),[P]),r.a.createElement(a.Fragment,null,r.a.createElement("div",{className:"setup-wrapper"},r.a.createElement("div",{className:"setup-wrapper__row"},r.a.createElement(z,{placedShips:l,handleCellMouseEnter:N,handlePlacedShipDragging:A,draggedShip:p,hoveredCell:j,draggingPosition:E}),r.a.createElement(ae,{gameState:c,ships:l})),r.a.createElement("h2",{className:"u-h2"},n),r.a.createElement("button",{className:"button",onClick:L},"Random layout"),r.a.createElement("button",{className:"button button--desktop",onClick:function(){f([])}},"Reset layout")),r.a.createElement(O,{allowedCounts:de(l),draggedShip:p,setDraggedShip:M}))}n(21);function pe(e){var t=e.useTakenShots,n=e.useTakenAutoShots,a=e.usePlacedShips,c=e.title,o=e.isDisabled,l=e.gameState,u=Object(i.a)(t,1)[0],s=Object(i.a)(n,1)[0],m=Object(i.a)(a,1)[0],f=b()("player-board",{"player-board--disabled":o});return r.a.createElement("div",{className:f},r.a.createElement("div",{className:"player-board__row"},r.a.createElement(U,{handleCellMouseEnter:function(){return null},onCellClick:function(){return null}},r.a.createElement(H,{placedShots:u,shotSource:"player"}),r.a.createElement(H,{placedShots:s,shotSource:"computer"}),m.map((function(e){return r.a.createElement(L,{template:e.template,uuid:e.uuid,key:e.uuid,handleMouseDown:function(){return null},x:e.x,y:e.y})})),r.a.createElement(Q,{ships:m.filter((function(e){var t;return(null===(t=e.hits)||void 0===t?void 0:t.length)>0}))})),r.a.createElement(ae,{gameState:l,ships:m})),r.a.createElement("h2",{className:"u-h2"},c))}function ve(e){var t=e.children;return r.a.createElement("div",{className:"button-group"},t)}function be(e){var t=e.gameState,n=Object(a.useContext)(_),c=Object(i.a)(n,2),o=c[0],l=c[1];return r.a.createElement("header",{className:"header"},r.a.createElement("div",{className:"header__content"},r.a.createElement("h1",{className:"header__logo"},r.a.createElement("span",{role:"img","aria-label":"logo"},"\ud83d\udea2")," \xd7 ",r.a.createElement("span",{role:"img","aria-label":"logo"},"\ud83d\udca3")),r.a.createElement(ve,null,r.a.createElement(R,{outlined:!0,isDisabled:"PLAYING"===t,onClick:function(){return l(P.simple)},isActive:"simple"===o.name},"Simple (",r.a.createElement("span",{role:"img","aria-label":"flag"},"\ud83c\uddfa\ud83c\uddf8"),")"),r.a.createElement(R,{outlined:!0,isDisabled:"PLAYING"===t,onClick:function(){return l(P.advanced)},isActive:"advanced"===o.name},"Advanced (",r.a.createElement("span",{role:"img","aria-label":"flag"},"\ud83c\uddf1\ud83c\uddfb"),")"))))}function ge(e){var t=e.computerShips,n=e.isPlayerTurn,a=e.restartGame;return n&&t.every((function(e){return e.isSunken}))?r.a.createElement("div",{className:"game-finished"},r.a.createElement("h2",{className:"u-h2"},"Congrats, you beat the computer!",r.a.createElement("span",{role:"img","aria-label":"confetti"},"\ud83c\udf89")),r.a.createElement(R,{onClick:a},"Dominate again!")):r.a.createElement("div",{className:"game-finished"},r.a.createElement("h2",{className:"u-h2"},"Tough luck, the Computer was superior!"),r.a.createElement(R,{onClick:a},"Let me rematch!"))}var Ee=function(e,t){var n=Object(a.useRef)(!1);Object(a.useEffect)((function(){n.current?e():n.current=!0}),t)},ye=function(e,t,n,a,r,c,o,l){var i=e.x,s=e.y,m=Object(u.a)(t),f=le(c);if(f[s][i]){var d=c.filter((function(e){return e.uuid!==f[s][i]})),h=c.filter((function(e){return e.uuid===f[s][i]}))[0];h=J(h,i,s),X(h)&&(h.isSunken=!0,r(a.concat(ee(h,t,a)))),o(d.concat([h]))}else l(),n(m.concat([[i,s]]))},Se=function(e){return e[h(0,e.length-1)]};var we=function(){var e,t=Object(a.useState)("SETUP"),n=Object(i.a)(t,2),c=n[0],o=n[1],u=Object(a.useState)(!0),s=Object(i.a)(u,2),m=s[0],f=s[1],p=Object(a.useState)(P.advanced),v=Object(i.a)(p,2),b=v[0],g=v[1],E=Object(a.useState)(fe(b.shipConfig)),y=Object(i.a)(E,2),S=y[0],w=y[1],O=Object(a.useState)([]),j=Object(i.a)(O,2),k=j[0],x=j[1],C=Object(a.useState)([]),N=Object(i.a)(C,2),M=N[0],D=N[1],A=Object(a.useState)(fe(b.shipConfig)),L=Object(i.a)(A,2),I=L[0],T=L[1],B=Object(a.useState)([]),Y=Object(i.a)(B,2),G=Y[0],z=Y[1],U=Object(a.useState)([]),W=Object(i.a)(U,2),F=W[0],R=W[1],V=Object(a.useState)(d()),H=Object(i.a)(V,2),J=H[0],X=H[1],K=Object(a.useCallback)((function(){w(fe(b.shipConfig)),T(fe(b.shipConfig)),x([]),D([]),z([]),R([]),o("SETUP"),X(d())}),[b,w,T,x,D,z,R,o,d]);return Object(a.useEffect)((function(){var e=null;return"PLAYING"!==c||m||(e=setTimeout((function(){var e=S.filter((function(e){var t;return(null===(t=e.hits)||void 0===t?void 0:t.length)>0&&!e.isSunken}));if(e[0]){var t=function(e,t,n,a){var r,c=t.hits,o=n.concat(a),u=[],s=function(e,t,n){return"advanced"===e||1===t.length?[[0,-1],[1,0],[0,1],[-1,0]]:"horizontal"===(t[0][0]===t[1][0]?"vertical":"horizontal")?[[1,0],[-1,0]]:[[0,1],[0,-1]]}(e,c),m=Object(l.a)(c);try{for(m.s();!(r=m.n()).done;){var f,d=Object(i.a)(r.value,2),p=d[0],v=d[1],b=Object(l.a)(s);try{for(b.s();!(f=b.n()).done;){var g=Object(i.a)(f.value,2),E=g[0],y=v+g[1],S=p+E;y>-1&&y<10&&S>-1&&S<10&&!Z(S,y,o)&&!Z(S,y,c)&&u.push([S,y])}}catch(w){b.e(w)}finally{b.f()}}}catch(w){m.e(w)}finally{m.f()}return u[h(0,u.length-1)]}(b.name,e[0],G,F),n=Object(i.a)(t,2),a=n[0],r=n[1];ye({x:a,y:r},G,z,F,R,S,w,(function(){return f(!0)}))}else{var c=function(e,t,n,a){for(var r=e.map((function(e){return e.hits})).filter((function(e){return void 0!==e})).flat().concat(t,n),c=[],o=[],l=0;l<10;l++)for(var u=0;u<10;u++)l%2!==u%2?o.push([u,l]):c.push([u,l]);var s=c.filter((function(e){var t=Object(i.a)(e,2);return!Z(t[0],t[1],r)})),m=o.filter((function(e){var t=Object(i.a)(e,2);return!Z(t[0],t[1],r)}));return a?s.length>0?Se(s):Se(m):m.length>0?Se(m):Se(s)}(S,G,F,J),o=Object(i.a)(c,2),u=o[0],s=o[1];ye({x:u,y:s},G,z,F,R,S,w,(function(){return f(!0)}))}}),400)),function(){return clearTimeout(e)}}),[c,b.name,m,G,z,F,R,S,w,f]),Object(a.useEffect)((function(){(I.every((function(e){return e.isSunken}))&&I.length>0||S.every((function(e){return e.isSunken}))&&S.length>0)&&o("FINISHED")}),[S,I,o]),Ee((function(){w(fe(b.shipConfig)),T(fe(b.shipConfig)),x([]),D([]),z([]),R([]),o("SETUP"),X(d())}),[b.name,w,T,x,D,z,R,o,X]),r.a.createElement(_.Provider,{value:[b,g]},r.a.createElement("div",{className:"App"},r.a.createElement(be,{gameState:c}),"FINISHED"===c&&r.a.createElement(ge,{computerShips:I,isPlayerTurn:m,restartGame:K}),r.a.createElement("div",{className:"App__row"},"SETUP"===c&&r.a.createElement(he,{title:"Your\u200d board",usePlacedShips:[S,w]}),"SETUP"!==c&&r.a.createElement(pe,{title:"Your\u200d board",gameState:c,isDisabled:"PLAYING"!==c,usePlacedShips:[S,w],useTakenShots:[G,z],useTakenAutoShots:[F,F]}),r.a.createElement(re,{title:"Computer's board",gameCanStart:(e=S,de(e).every((function(e){return 0===e}))),onMissedShot:function(){return f(!1)},gameState:c,onStartClick:function(){return o("PLAYING")},showShips:"FINISHED"===c,isDisabled:"PLAYING"!==c||!m,useEnemyShips:[I,T],usePlacedShots:[k,x],useAutoShots:[M,D]}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(we,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[11,1,2]]]);
//# sourceMappingURL=main.150deae8.chunk.js.map