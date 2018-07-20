(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b,c){"use strict"
function generateAccessor(b0,b1,b2){var g=b0.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var a0
if(g.length>1)a0=true
else a0=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a1=d&3
var a2=d>>2
var a3=f=f.substring(0,e-1)
var a4=f.indexOf(":")
if(a4>0){a3=f.substring(0,a4)
f=f.substring(a4+1)}if(a1){var a5=a1&2?"r":""
var a6=a1&1?"this":"r"
var a7="return "+a6+"."+f
var a8=b2+".prototype.g"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}if(a2){var a5=a2&2?"r,v":"v"
var a6=a2&1?"this":"r"
var a7=a6+"."+f+"=v"
var a8=b2+".prototype.s"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}}return f}function defineClass(a4,a5){var g=[]
var f="function "+a4+"("
var e="",d=""
for(var a0=0;a0<a5.length;a0++){var a1=a5[a0]
if(a1.charCodeAt(0)==48){a1=a1.substring(1)
var a2=generateAccessor(a1,g,a4)
d+="this."+a2+" = null;\n"}else{var a2=generateAccessor(a1,g,a4)
var a3="p_"+a2
f+=e
e=", "
f+=a3
d+="this."+a2+" = "+a3+";\n"}}if(supportsDirectProtoAccess)d+="this."+"$deferredAction"+"();"
f+=") {\n"+d+"}\n"
f+=a4+".builtin$cls=\""+a4+"\";\n"
f+="$desc=$collectedClasses."+a4+"[1];\n"
f+=a4+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a4+".name=\""+a4+"\";\n"
f+=g.join("")
return f}var z=supportsDirectProtoAccess?function(d,e){var g=d.prototype
g.__proto__=e.prototype
g.constructor=d
g["$is"+d.name]=d
return convertToFastObject(g)}:function(){function tmp(){}return function(a1,a2){tmp.prototype=a2.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a1.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var a0=e[d]
g[a0]=f[a0]}g["$is"+a1.name]=a1
g.constructor=a1
a1.prototype=g
return g}}()
function finishClasses(a5){var g=init.allClasses
a5.combinedConstructorFunction+="return [\n"+a5.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a5.combinedConstructorFunction)(a5.collected)
a5.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.name
var a1=a5.collected[a0]
var a2=a1[0]
a1=a1[1]
g[a0]=d
a2[a0]=d}f=null
var a3=init.finishedClasses
function finishClass(c2){if(a3[c2])return
a3[c2]=true
var a6=a5.pending[c2]
if(a6&&a6.indexOf("+")>0){var a7=a6.split("+")
a6=a7[0]
var a8=a7[1]
finishClass(a8)
var a9=g[a8]
var b0=a9.prototype
var b1=g[c2].prototype
var b2=Object.keys(b0)
for(var b3=0;b3<b2.length;b3++){var b4=b2[b3]
if(!u.call(b1,b4))b1[b4]=b0[b4]}}if(!a6||typeof a6!="string"){var b5=g[c2]
var b6=b5.prototype
b6.constructor=b5
b6.$isc=b5
b6.$deferredAction=function(){}
return}finishClass(a6)
var b7=g[a6]
if(!b7)b7=existingIsolateProperties[a6]
var b5=g[c2]
var b6=z(b5,b7)
if(b0)b6.$deferredAction=mixinDeferredActionHelper(b0,b6)
if(Object.prototype.hasOwnProperty.call(b6,"%")){var b8=b6["%"].split(";")
if(b8[0]){var b9=b8[0].split("|")
for(var b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=true}}if(b8[1]){b9=b8[1].split("|")
if(b8[2]){var c0=b8[2].split("|")
for(var b3=0;b3<c0.length;b3++){var c1=g[c0[b3]]
c1.$nativeSuperclassTag=b9[0]}}for(b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=false}}b6.$deferredAction()}if(b6.$isk)b6.$deferredAction()}var a4=Object.keys(a5.pending)
for(var e=0;e<a4.length;e++)finishClass(a4[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.charCodeAt(0)
var a1
if(d!=="^"&&d!=="$reflectable"&&a0!==43&&a0!==42&&(a1=g[d])!=null&&a1.constructor===Array&&d!=="<>")addStubs(g,a1,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(d,e){var g
if(e.hasOwnProperty("$deferredAction"))g=e.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}d.$deferredAction()
f.$deferredAction()}}function processClassData(b2,b3,b4){b3=convertToSlowObject(b3)
var g
var f=Object.keys(b3)
var e=false
var d=supportsDirectProtoAccess&&b2!="c"
for(var a0=0;a0<f.length;a0++){var a1=f[a0]
var a2=a1.charCodeAt(0)
if(a1==="i"){processStatics(init.statics[b2]=b3.i,b4)
delete b3.i}else if(a2===43){w[g]=a1.substring(1)
var a3=b3[a1]
if(a3>0)b3[g].$reflectable=a3}else if(a2===42){b3[g].$D=b3[a1]
var a4=b3.$methodsWithOptionalArguments
if(!a4)b3.$methodsWithOptionalArguments=a4={}
a4[a1]=g}else{var a5=b3[a1]
if(a1!=="^"&&a5!=null&&a5.constructor===Array&&a1!=="<>")if(d)e=true
else addStubs(b3,a5,a1,false,[])
else g=a1}}if(e)b3.$deferredAction=finishAddStubsHelper
var a6=b3["^"],a7,a8,a9=a6
var b0=a9.split(";")
a9=b0[1]?b0[1].split(","):[]
a8=b0[0]
a7=a8.split(":")
if(a7.length==2){a8=a7[0]
var b1=a7[1]
if(b1)b3.$S=function(b5){return function(){return init.types[b5]}}(b1)}if(a8)b4.pending[b2]=a8
b4.combinedConstructorFunction+=defineClass(b2,a9)
b4.constructorsList.push(b2)
b4.collected[b2]=[m,b3]
i.push(b2)}function processStatics(a4,a5){var g=Object.keys(a4)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a4[e]
var a0=e.charCodeAt(0)
var a1
if(a0===43){v[a1]=e.substring(1)
var a2=a4[e]
if(a2>0)a4[a1].$reflectable=a2
if(d&&d.length)init.typeInformation[a1]=d}else if(a0===42){m[a1].$D=d
var a3=a4.$methodsWithOptionalArguments
if(!a3)a4.$methodsWithOptionalArguments=a3={}
a3[e]=a1}else if(typeof d==="function"){m[a1=e]=d
h.push(e)}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a1=e
processClassData(e,d,a5)}}}function addStubs(b6,b7,b8,b9,c0){var g=0,f=g,e=b7[g],d
if(typeof e=="string")d=b7[++g]
else{d=e
e=b8}if(typeof d=="number"){f=d
d=b7[++g]}b6[b8]=b6[e]=d
var a0=[d]
d.$stubName=b8
c0.push(b8)
for(g++;g<b7.length;g++){d=b7[g]
if(typeof d!="function")break
if(!b9)d.$stubName=b7[++g]
a0.push(d)
if(d.$stubName){b6[d.$stubName]=d
c0.push(d.$stubName)}}for(var a1=0;a1<a0.length;g++,a1++)a0[a1].$callName=b7[g]
var a2=b7[g]
b7=b7.slice(++g)
var a3=b7[0]
var a4=(a3&1)===1
a3=a3>>1
var a5=a3>>1
var a6=(a3&1)===1
var a7=a3===3
var a8=a3===1
var a9=b7[1]
var b0=a9>>1
var b1=(a9&1)===1
var b2=a5+b0
var b3=b7[2]
if(typeof b3=="number")b7[2]=b3+c
if(b>0){var b4=3
for(var a1=0;a1<b0;a1++){if(typeof b7[b4]=="number")b7[b4]=b7[b4]+b
b4++}for(var a1=0;a1<b2;a1++){b7[b4]=b7[b4]+b
b4++}}var b5=2*b0+a5+3
if(a2){d=tearOff(a0,f,b7,b9,b8,a4)
b6[b8].$getter=d
d.$getterStub=true
if(b9)c0.push(a2)
b6[a2]=d
a0.push(d)
d.$stubName=a2
d.$callName=null}}function tearOffGetter(d,e,f,g,a0){return a0?new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"(x) {"+"if (c === null) c = "+"H.b1"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(d,e,f,g,H,null):new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"() {"+"if (c === null) c = "+"H.b1"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,g,H,null)}function tearOff(d,e,f,a0,a1,a2){var g
return a0?function(){if(g===void 0)g=H.b1(this,d,e,f,true,[],a1).prototype
return g}:tearOffGetter(d,e,f,a1,a2)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.b2=function(){}
var dart=[["","",,H,{"^":"",fR:{"^":"c;a"}}],["","",,J,{"^":"",
m:function(a){return void 0},
b7:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
ay:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.b5==null){H.dY()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.f(P.bG("Return interceptor for "+H.d(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$aL()]
if(v!=null)return v
v=H.e1(a)
if(v!=null)return v
if(typeof a=="function")return C.A
y=Object.getPrototypeOf(a)
if(y==null)return C.p
if(y===Object.prototype)return C.p
if(typeof w=="function"){Object.defineProperty(w,$.$get$aL(),{value:C.k,enumerable:false,writable:true,configurable:true})
return C.k}return C.k},
k:{"^":"c;",
h:["ad",function(a){return"Instance of '"+H.a_(a)+"'"}]},
cA:{"^":"k;",
h:function(a){return String(a)},
$isaZ:1},
cB:{"^":"k;",
h:function(a){return"null"},
$isr:1},
aN:{"^":"k;",
h:["ae",function(a){return String(a)}]},
cH:{"^":"aN;"},
aU:{"^":"aN;"},
ad:{"^":"aN;",
h:function(a){var z=a[$.$get$bg()]
if(z==null)return this.ae(a)
return"JavaScript function for "+H.d(J.al(z))},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}},
$isaJ:1},
ab:{"^":"k;$ti",
X:function(a,b){H.q(b,H.t(a,0))
if(!!a.fixed$length)H.aC(P.x("add"))
a.push(b)},
A:function(a,b){var z,y
H.e(b,{func:1,ret:-1,args:[H.t(a,0)]})
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.f(P.aI(a))}},
h:function(a){return P.bi(a,"[","]")},
ga0:function(a){return new J.cc(a,a.length,0,[H.t(a,0)])},
gj:function(a){return a.length},
m:function(a,b,c){H.u(b)
H.q(c,H.t(a,0))
if(!!a.immutable$list)H.aC(P.x("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.f(H.ag(a,b))
if(b>=a.length||b<0)throw H.f(H.ag(a,b))
a[b]=c},
$isaa:1,
$isp:1,
i:{
cz:function(a,b){return J.ac(H.ak(a,[b]))},
ac:function(a){H.aA(a)
a.fixed$length=Array
return a}}},
fQ:{"^":"ab;$ti"},
cc:{"^":"c;a,b,c,0d,$ti",
gw:function(){return this.d},
B:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.f(H.e8(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
as:{"^":"k;",
J:function(a,b){var z
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=C.a.gK(b)
if(this.gK(a)===z)return 0
if(this.gK(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gK:function(a){return a===0?1/a<0:a<0},
a5:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.f(P.x(""+a+".toInt()"))},
a_:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.f(P.x(""+a+".floor()"))},
aL:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.f(P.x(""+a+".round()"))},
aA:function(a,b,c){if(C.a.J(b,c)>0)throw H.f(H.a4(b))
if(this.J(a,b)<0)return b
if(this.J(a,c)>0)return c
return a},
h:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
u:function(a,b){var z=a%b
if(z===0)return 0
if(z>0)return z
if(b<0)return z-b
else return z+b},
af:function(a,b){if((a|0)===a)if(b>=1||b<-1)return a/b|0
return this.V(a,b)},
t:function(a,b){return(a|0)===a?a/b|0:this.V(a,b)},
V:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.f(P.x("Result of truncating division is "+H.d(z)+": "+H.d(a)+" ~/ "+b))},
aw:function(a,b){var z
if(a>0)z=this.av(a,b)
else{z=b>31?31:b
z=a>>z>>>0}return z},
av:function(a,b){return b>31?0:a>>>b},
C:function(a,b){if(typeof b!=="number")throw H.f(H.a4(b))
return a<b},
$isah:1,
$isD:1},
bk:{"^":"as;",$isN:1},
bj:{"^":"as;"},
aK:{"^":"k;",
ak:function(a,b){if(b>=a.length)throw H.f(H.ag(a,b))
return a.charCodeAt(b)},
p:function(a,b){H.o(b)
if(typeof b!=="string")throw H.f(P.b9(b,null,null))
return a+b},
M:function(a,b,c){H.u(c)
if(c==null)c=a.length
if(b>c)throw H.f(P.aR(b,null,null))
if(c>a.length)throw H.f(P.aR(c,null,null))
return a.substring(b,c)},
ac:function(a,b){return this.M(a,b,null)},
h:function(a){return a},
gj:function(a){return a.length},
$isC:1}}],["","",,H,{"^":"",cD:{"^":"c;a,b,c,0d,$ti",
gw:function(){return this.d},
B:function(){var z,y,x,w
z=this.a
y=J.b4(z)
x=y.gj(z)
if(this.b!==x)throw H.f(P.aI(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.aC(z,w);++this.c
return!0}},ar:{"^":"c;$ti"}}],["","",,H,{"^":"",
dS:function(a){return init.types[H.u(a)]},
jj:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.m(a).$isaM},
d:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.al(a)
if(typeof z!=="string")throw H.f(H.a4(a))
return z},
cI:function(a,b){var z,y
if(typeof a!=="string")H.aC(H.a4(a))
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return
if(3>=z.length)return H.v(z,3)
y=H.o(z[3])
if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return},
a_:function(a){var z,y,x,w,v,u,t,s,r
z=J.m(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.t||!!J.m(a).$isaU){v=C.o(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.j.ak(w,0)===36)w=C.j.ac(w,1)
r=H.b6(H.aA(H.V(a)),0,null)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+r,init.mangledGlobalNames)},
dT:function(a){throw H.f(H.a4(a))},
v:function(a,b){if(a==null)J.aD(a)
throw H.f(H.ag(a,b))},
ag:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.W(!0,b,"index",null)
z=H.u(J.aD(a))
if(!(b<0)){if(typeof z!=="number")return H.dT(z)
y=b>=z}else y=!0
if(y)return P.cy(b,a,"index",null,z)
return P.aR(b,"index",null)},
a4:function(a){return new P.W(!0,a,null,null)},
bZ:function(a){if(typeof a!=="number")throw H.f(H.a4(a))
return a},
f:function(a){var z
if(a==null)a=new P.bo()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.c8})
z.name=""}else z.toString=H.c8
return z},
c8:function(){return J.al(this.dartException)},
aC:function(a){throw H.f(a)},
e8:function(a){throw H.f(P.aI(a))},
a8:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.ea(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.a.aw(x,16)&8191)===10)switch(w){case 438:return z.$1(H.aO(H.d(y)+" (Error "+w+")",null))
case 445:case 5007:return z.$1(H.bn(H.d(y)+" (Error "+w+")",null))}}if(a instanceof TypeError){v=$.$get$bv()
u=$.$get$bw()
t=$.$get$bx()
s=$.$get$by()
r=$.$get$bC()
q=$.$get$bD()
p=$.$get$bA()
$.$get$bz()
o=$.$get$bF()
n=$.$get$bE()
m=v.l(y)
if(m!=null)return z.$1(H.aO(H.o(y),m))
else{m=u.l(y)
if(m!=null){m.method="call"
return z.$1(H.aO(H.o(y),m))}else{m=t.l(y)
if(m==null){m=s.l(y)
if(m==null){m=r.l(y)
if(m==null){m=q.l(y)
if(m==null){m=p.l(y)
if(m==null){m=s.l(y)
if(m==null){m=o.l(y)
if(m==null){m=n.l(y)
l=m!=null}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0
if(l)return z.$1(H.bn(H.o(y),m))}}return z.$1(new H.d6(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.bp()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.W(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.bp()
return a},
a6:function(a){var z
if(a==null)return new H.bP(a)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.bP(a)},
e0:function(a,b,c,d,e,f){H.i(a,"$isaJ")
switch(H.u(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw H.f(new P.dj("Unsupported number of arguments for wrapped closure"))},
a5:function(a,b){var z
H.u(b)
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,H.e0)
a.$identity=z
return z},
cj:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.m(d).$isp){z.$reflectionInfo=d
x=H.cM(z).r}else x=d
w=e?Object.create(new H.cX().constructor.prototype):Object.create(new H.ba(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(e)v=function(){this.$initialize()}
else{u=$.E
if(typeof u!=="number")return u.p()
$.E=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!e){t=f.length==1&&!0
s=H.bf(a,z,t)
s.$reflectionInfo=d}else{w.$static_name=g
s=z
t=!1}if(typeof x=="number")r=function(h,i){return function(){return h(i)}}(H.dS,x)
else if(typeof x=="function")if(e)r=x
else{q=t?H.bc:H.aF
r=function(h,i){return function(){return h.apply({$receiver:i(this)},arguments)}}(x,q)}else throw H.f("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=s,o=1;o<u;++o){n=b[o]
m=n.$callName
if(m!=null){n=e?n:H.bf(a,n,t)
w[m]=n}if(o===c){n.$reflectionInfo=d
p=n}}w["call*"]=p
w.$R=z.$R
w.$D=z.$D
return v},
cg:function(a,b,c,d){var z=H.aF
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
bf:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.ci(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.cg(y,!w,z,b)
if(y===0){w=$.E
if(typeof w!=="number")return w.p()
$.E=w+1
u="self"+w
w="return function(){var "+u+" = this."
v=$.X
if(v==null){v=H.an("self")
$.X=v}return new Function(w+H.d(v)+";return "+u+"."+H.d(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.E
if(typeof w!=="number")return w.p()
$.E=w+1
t+=w
w="return function("+t+"){return this."
v=$.X
if(v==null){v=H.an("self")
$.X=v}return new Function(w+H.d(v)+"."+H.d(z)+"("+t+");}")()},
ch:function(a,b,c,d){var z,y
z=H.aF
y=H.bc
switch(b?-1:a){case 0:throw H.f(H.cP("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
ci:function(a,b){var z,y,x,w,v,u,t,s
z=$.X
if(z==null){z=H.an("self")
$.X=z}y=$.bb
if(y==null){y=H.an("receiver")
$.bb=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.ch(w,!u,x,b)
if(w===1){z="return function(){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+");"
y=$.E
if(typeof y!=="number")return y.p()
$.E=y+1
return new Function(z+y+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
z="return function("+s+"){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+", "+s+");"
y=$.E
if(typeof y!=="number")return y.p()
$.E=y+1
return new Function(z+y+"}")()},
b1:function(a,b,c,d,e,f,g){var z,y
z=J.ac(H.aA(b))
H.u(c)
y=!!J.m(d).$isp?J.ac(d):d
return H.cj(a,z,c,y,!!e,f,g)},
o:function(a){if(a==null)return a
if(typeof a==="string")return a
throw H.f(H.H(a,"String"))},
e4:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.f(H.H(a,"num"))},
u:function(a){if(a==null)return a
if(typeof a==="number"&&Math.floor(a)===a)return a
throw H.f(H.H(a,"int"))},
e6:function(a,b){throw H.f(H.H(a,H.o(b).substring(3)))},
e5:function(a,b){var z=J.b4(b)
throw H.f(H.cf(a,z.M(b,3,z.gj(b))))},
i:function(a,b){if(a==null)return a
if((typeof a==="object"||typeof a==="function")&&J.m(a)[b])return a
H.e6(a,b)},
e_:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.m(a)[b]
else z=!0
if(z)return a
H.e5(a,b)},
aA:function(a){if(a==null)return a
if(!!J.m(a).$isp)return a
throw H.f(H.H(a,"List"))},
c_:function(a){var z
if("$S" in a){z=a.$S
if(typeof z=="number")return init.types[H.u(z)]
else return a.$S()}return},
ai:function(a,b){var z,y
if(a==null)return!1
if(typeof a=="function")return!0
z=H.c_(J.m(a))
if(z==null)return!1
y=H.c3(z,null,b,null)
return y},
e:function(a,b){var z,y
if(a==null)return a
if($.aW)return a
$.aW=!0
try{if(H.ai(a,b))return a
z=H.aj(b)
y=H.H(a,z)
throw H.f(y)}finally{$.aW=!1}},
b3:function(a,b){if(a!=null&&!H.b_(a,b))H.aC(H.H(a,H.aj(b)))
return a},
bU:function(a){var z
if(a instanceof H.j){z=H.c_(J.m(a))
if(z!=null)return H.aj(z)
return"Closure"}return H.a_(a)},
e9:function(a){throw H.f(new P.cl(H.o(a)))},
c1:function(a){return init.getIsolateTag(a)},
ak:function(a,b){a.$ti=b
return a},
V:function(a){if(a==null)return
return a.$ti},
ji:function(a,b,c){return H.a7(a["$as"+H.d(c)],H.V(b))},
dR:function(a,b,c,d){var z
H.o(c)
H.u(d)
z=H.a7(a["$as"+H.d(c)],H.V(b))
return z==null?null:z[d]},
t:function(a,b){var z
H.u(b)
z=H.V(a)
return z==null?null:z[b]},
aj:function(a){var z=H.O(a,null)
return z},
O:function(a,b){var z,y
H.af(b,"$isp",[P.C],"$asp")
if(a==null)return"dynamic"
if(a===-1)return"void"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.b6(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(a===-2)return"dynamic"
if(typeof a==="number"){H.u(a)
if(b==null||a<0||a>=b.length)return"unexpected-generic-index:"+a
z=b.length
y=z-a-1
if(y<0||y>=z)return H.v(b,y)
return H.d(b[y])}if('func' in a)return H.dE(a,b)
if('futureOr' in a)return"FutureOr<"+H.O("type" in a?a.type:null,b)+">"
return"unknown-reified-type"},
dE:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=[P.C]
H.af(b,"$isp",z,"$asp")
if("bounds" in a){y=a.bounds
if(b==null){b=H.ak([],z)
x=null}else x=b.length
w=b.length
for(v=y.length,u=v;u>0;--u)C.b.X(b,"T"+(w+u))
for(t="<",s="",u=0;u<v;++u,s=", "){t+=s
z=b.length
r=z-u-1
if(r<0)return H.v(b,r)
t=C.j.p(t,b[r])
q=y[u]
if(q!=null&&q!==P.c)t+=" extends "+H.O(q,b)}t+=">"}else{t=""
x=null}p=!!a.v?"void":H.O(a.ret,b)
if("args" in a){o=a.args
for(z=o.length,n="",m="",l=0;l<z;++l,m=", "){k=o[l]
n=n+m+H.O(k,b)}}else{n=""
m=""}if("opt" in a){j=a.opt
n+=m+"["
for(z=j.length,m="",l=0;l<z;++l,m=", "){k=j[l]
n=n+m+H.O(k,b)}n+="]"}if("named" in a){i=a.named
n+=m+"{"
for(z=H.dO(i),r=z.length,m="",l=0;l<r;++l,m=", "){h=H.o(z[l])
n=n+m+H.O(i[h],b)+(" "+H.d(h))}n+="}"}if(x!=null)b.length=x
return t+"("+n+") => "+p},
b6:function(a,b,c){var z,y,x,w,v,u
H.af(c,"$isp",[P.C],"$asp")
if(a==null)return""
z=new P.bq("")
for(y=b,x="",w=!0,v="";y<a.length;++y,x=", "){z.a=v+x
u=a[y]
if(u!=null)w=!1
v=z.a+=H.O(u,c)}v="<"+z.h(0)+">"
return v},
a7:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
b0:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.V(a)
y=J.m(a)
if(y[b]==null)return!1
return H.bX(H.a7(y[d],z),null,c,null)},
af:function(a,b,c,d){var z,y
H.o(b)
H.aA(c)
H.o(d)
if(a==null)return a
z=H.b0(a,b,c,d)
if(z)return a
z=b.substring(3)
y=H.b6(c,0,null)
throw H.f(H.H(a,function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(z+y,init.mangledGlobalNames)))},
bX:function(a,b,c,d){var z,y
if(c==null)return!0
if(a==null){z=c.length
for(y=0;y<z;++y)if(!H.y(null,null,c[y],d))return!1
return!0}z=a.length
for(y=0;y<z;++y)if(!H.y(a[y],b,c[y],d))return!1
return!0},
jg:function(a,b,c){return a.apply(b,H.a7(J.m(b)["$as"+H.d(c)],H.V(b)))},
c4:function(a){var z
if(typeof a==="number")return!1
if('futureOr' in a){z="type" in a?a.type:null
return a==null||a.builtin$cls==="c"||a.builtin$cls==="r"||a===-1||a===-2||H.c4(z)}return!1},
b_:function(a,b){var z,y,x
if(a==null){z=b==null||b.builtin$cls==="c"||b.builtin$cls==="r"||b===-1||b===-2||H.c4(b)
return z}z=b==null||b===-1||b.builtin$cls==="c"||b===-2
if(z)return!0
if(typeof b=="object"){z='futureOr' in b
if(z)if(H.b_(a,"type" in b?b.type:null))return!0
if('func' in b)return H.ai(a,b)}y=J.m(a).constructor
x=H.V(a)
if(x!=null){x=x.slice()
x.splice(0,0,y)
y=x}z=H.y(y,null,b,null)
return z},
q:function(a,b){if(a!=null&&!H.b_(a,b))throw H.f(H.H(a,H.aj(b)))
return a},
y:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
if(a===c)return!0
if(c==null||c===-1||c.builtin$cls==="c"||c===-2)return!0
if(a===-2)return!0
if(a==null||a===-1||a.builtin$cls==="c"||a===-2){if(typeof c==="number")return!1
if('futureOr' in c)return H.y(a,b,"type" in c?c.type:null,d)
return!1}if(typeof a==="number")return!1
if(typeof c==="number")return!1
if(a.builtin$cls==="r")return!0
if('func' in c)return H.c3(a,b,c,d)
if('func' in a)return c.builtin$cls==="aJ"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
if('futureOr' in c){x="type" in c?c.type:null
if('futureOr' in a)return H.y("type" in a?a.type:null,b,x,d)
else if(H.y(a,b,x,d))return!0
else{if(!('$is'+"Y" in y.prototype))return!1
w=y.prototype["$as"+"Y"]
v=H.a7(w,z?a.slice(1):null)
return H.y(typeof v==="object"&&v!==null&&v.constructor===Array?v[0]:null,b,x,d)}}u=typeof c==="object"&&c!==null&&c.constructor===Array
t=u?c[0]:c
if(t!==y){s=H.aj(t)
if(!('$is'+s in y.prototype))return!1
r=y.prototype["$as"+s]}else r=null
if(!u)return!0
z=z?a.slice(1):null
u=c.slice(1)
return H.bX(H.a7(r,z),b,u,d)},
c3:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("bounds" in a){if(!("bounds" in c))return!1
z=a.bounds
y=c.bounds
if(z.length!==y.length)return!1}else if("bounds" in c)return!1
if(!H.y(a.ret,b,c.ret,d))return!1
x=a.args
w=c.args
v=a.opt
u=c.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
for(p=0;p<t;++p)if(!H.y(w[p],d,x[p],b))return!1
for(o=p,n=0;o<s;++n,++o)if(!H.y(w[o],d,v[n],b))return!1
for(o=0;o<q;++n,++o)if(!H.y(u[o],d,v[n],b))return!1
m=a.named
l=c.named
if(l==null)return!0
if(m==null)return!1
return H.e3(m,b,l,d)},
e3:function(a,b,c,d){var z,y,x,w
z=Object.getOwnPropertyNames(c)
for(y=z.length,x=0;x<y;++x){w=z[x]
if(!Object.hasOwnProperty.call(a,w))return!1
if(!H.y(c[w],d,a[w],b))return!1}return!0},
jh:function(a,b,c){Object.defineProperty(a,H.o(b),{value:c,enumerable:false,writable:true,configurable:true})},
e1:function(a){var z,y,x,w,v,u
z=H.o($.c2.$1(a))
y=$.ax[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.az[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=H.o($.bW.$2(a,z))
if(z!=null){y=$.ax[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.az[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.aB(x)
$.ax[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.az[z]=x
return x}if(v==="-"){u=H.aB(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.c6(a,x)
if(v==="*")throw H.f(P.bG(z))
if(init.leafTags[z]===true){u=H.aB(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.c6(a,x)},
c6:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.b7(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
aB:function(a){return J.b7(a,!1,null,!!a.$isaM)},
e2:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return H.aB(z)
else return J.b7(z,c,null,null)},
dY:function(){if(!0===$.b5)return
$.b5=!0
H.dZ()},
dZ:function(){var z,y,x,w,v,u,t,s
$.ax=Object.create(null)
$.az=Object.create(null)
H.dU()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.c7.$1(v)
if(u!=null){t=H.e2(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
dU:function(){var z,y,x,w,v,u,t
z=C.x()
z=H.U(C.u,H.U(C.z,H.U(C.n,H.U(C.n,H.U(C.y,H.U(C.v,H.U(C.w(C.o),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.c2=new H.dV(v)
$.bW=new H.dW(u)
$.c7=new H.dX(t)},
U:function(a,b){return a(b)||b},
cL:{"^":"c;a,b,c,d,e,f,r,0x",i:{
cM:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z=J.ac(z)
y=z[0]
x=z[1]
return new H.cL(a,z,(y&2)===2,y>>2,x>>1,(x&1)===1,z[2])}}},
d3:{"^":"c;a,b,c,d,e,f",
l:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
i:{
F:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=H.ak([],[P.C])
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.d3(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
at:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
bB:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
cF:{"^":"n;a,b",
h:function(a){var z=this.b
if(z==null)return"NullError: "+H.d(this.a)
return"NullError: method not found: '"+z+"' on null"},
i:{
bn:function(a,b){return new H.cF(a,b==null?null:b.method)}}},
cC:{"^":"n;a,b,c",
h:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.d(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.d(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.d(this.a)+")"},
i:{
aO:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.cC(a,y,z?null:b.receiver)}}},
d6:{"^":"n;a",
h:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
ea:{"^":"j:5;a",
$1:function(a){if(!!J.m(a).$isn)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
bP:{"^":"c;a,0b",
h:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z},
$isB:1},
j:{"^":"c;",
h:function(a){return"Closure '"+H.a_(this).trim()+"'"},
ga7:function(){return this},
$isaJ:1,
ga7:function(){return this}},
br:{"^":"j;"},
cX:{"^":"br;",
h:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
ba:{"^":"br;a,b,c,d",
h:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.d(this.d)+"' of "+("Instance of '"+H.a_(z)+"'")},
i:{
aF:function(a){return a.a},
bc:function(a){return a.c},
an:function(a){var z,y,x,w,v
z=new H.ba("self","target","receiver","name")
y=J.ac(Object.getOwnPropertyNames(z))
for(x=y.length,w=0;w<x;++w){v=y[w]
if(z[v]===a)return v}}}},
d4:{"^":"n;a",
h:function(a){return this.a},
i:{
H:function(a,b){return new H.d4("TypeError: "+H.d(P.aq(a))+": type '"+H.bU(a)+"' is not a subtype of type '"+b+"'")}}},
ce:{"^":"n;a",
h:function(a){return this.a},
i:{
cf:function(a,b){return new H.ce("CastError: "+H.d(P.aq(a))+": type '"+H.bU(a)+"' is not a subtype of type '"+b+"'")}}},
cO:{"^":"n;a",
h:function(a){return"RuntimeError: "+H.d(this.a)},
i:{
cP:function(a){return new H.cO(a)}}},
dV:{"^":"j:5;a",
$1:function(a){return this.a(a)}},
dW:{"^":"j:10;a",
$2:function(a,b){return this.a(a,b)}},
dX:{"^":"j:11;a",
$1:function(a){return this.a(H.o(a))}}}],["","",,H,{"^":"",
dO:function(a){return J.cz(a?Object.keys(a):[],null)}}],["","",,H,{"^":"",
M:function(a,b,c){if(a>>>0!==a||a>=c)throw H.f(H.ag(b,a))},
hg:{"^":"k;","%":"ArrayBuffer"},
bm:{"^":"k;","%":";ArrayBufferView;aP|bL|bM|aQ|bN|bO|K"},
hh:{"^":"bm;","%":"DataView"},
aP:{"^":"bm;",
gj:function(a){return a.length},
$isaM:1,
$asaM:I.b2},
aQ:{"^":"bM;",
n:function(a,b){H.M(b,a,a.length)
return a[b]},
$asar:function(){return[P.ah]},
$asae:function(){return[P.ah]},
$isaa:1,
$asaa:function(){return[P.ah]},
$isp:1,
$asp:function(){return[P.ah]}},
K:{"^":"bO;",
$asar:function(){return[P.N]},
$asae:function(){return[P.N]},
$isaa:1,
$asaa:function(){return[P.N]},
$isp:1,
$asp:function(){return[P.N]}},
hi:{"^":"aQ;","%":"Float32Array"},
hj:{"^":"aQ;","%":"Float64Array"},
hk:{"^":"K;",
n:function(a,b){H.M(b,a,a.length)
return a[b]},
"%":"Int16Array"},
hl:{"^":"K;",
n:function(a,b){H.M(b,a,a.length)
return a[b]},
"%":"Int32Array"},
hm:{"^":"K;",
n:function(a,b){H.M(b,a,a.length)
return a[b]},
"%":"Int8Array"},
hn:{"^":"K;",
n:function(a,b){H.M(b,a,a.length)
return a[b]},
"%":"Uint16Array"},
ho:{"^":"K;",
n:function(a,b){H.M(b,a,a.length)
return a[b]},
"%":"Uint32Array"},
hp:{"^":"K;",
gj:function(a){return a.length},
n:function(a,b){H.M(b,a,a.length)
return a[b]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
hq:{"^":"K;",
gj:function(a){return a.length},
n:function(a,b){H.M(b,a,a.length)
return a[b]},
"%":";Uint8Array"},
bL:{"^":"aP+ae;"},
bM:{"^":"bL+ar;"},
bN:{"^":"aP+ae;"},
bO:{"^":"bN+ar;"}}],["","",,P,{"^":"",
d9:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.dL()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.a5(new P.db(z),1)).observe(y,{childList:true})
return new P.da(z,y,x)}else if(self.setImmediate!=null)return P.dM()
return P.dN()},
iZ:[function(a){self.scheduleImmediate(H.a5(new P.dc(H.e(a,{func:1,ret:-1})),0))},"$1","dL",4,0,4],
j_:[function(a){self.setImmediate(H.a5(new P.dd(H.e(a,{func:1,ret:-1})),0))},"$1","dM",4,0,4],
j0:[function(a){P.aT(C.h,H.e(a,{func:1,ret:-1}))},"$1","dN",4,0,4],
aT:function(a,b){var z
H.e(b,{func:1,ret:-1})
z=C.a.t(a.a,1000)
return P.dB(z<0?0:z,b)},
dH:function(a,b){if(H.ai(a,{func:1,args:[P.c,P.B]}))return b.aK(a,null,P.c,P.B)
if(H.ai(a,{func:1,args:[P.c]}))return H.e(a,{func:1,ret:null,args:[P.c]})
throw H.f(P.b9(a,"onError","Error handler must accept one Object or one Object and a StackTrace as arguments, and return a a valid result"))},
dG:function(){var z,y
for(;z=$.T,z!=null;){$.a3=null
y=z.b
$.T=y
if(y==null)$.a2=null
z.a.$0()}},
jf:[function(){$.aX=!0
try{P.dG()}finally{$.a3=null
$.aX=!1
if($.T!=null)$.$get$aV().$1(P.bY())}},"$0","bY",0,0,1],
bT:function(a){var z=new P.bI(H.e(a,{func:1,ret:-1}))
if($.T==null){$.a2=z
$.T=z
if(!$.aX)$.$get$aV().$1(P.bY())}else{$.a2.b=z
$.a2=z}},
dK:function(a){var z,y,x
H.e(a,{func:1,ret:-1})
z=$.T
if(z==null){P.bT(a)
$.a3=$.a2
return}y=new P.bI(a)
x=$.a3
if(x==null){y.b=z
$.a3=y
$.T=y}else{y.b=x.b
x.b=y
$.a3=y
if(y.b==null)$.a2=y}},
e7:function(a){var z,y
z={func:1,ret:-1}
H.e(a,z)
y=$.l
if(C.c===y){P.aw(null,null,C.c,a)
return}y.toString
P.aw(null,null,y,H.e(y.I(a),z))},
bu:function(a,b){var z,y
z={func:1,ret:-1}
H.e(b,z)
y=$.l
if(y===C.c){y.toString
return P.aT(a,b)}return P.aT(a,H.e(y.I(b),z))},
av:function(a,b,c,d,e){var z={}
z.a=d
P.dK(new P.dI(z,e))},
bR:function(a,b,c,d,e){var z,y
H.e(d,{func:1,ret:e})
y=$.l
if(y===c)return d.$0()
$.l=c
z=y
try{y=d.$0()
return y}finally{$.l=z}},
bS:function(a,b,c,d,e,f,g){var z,y
H.e(d,{func:1,ret:f,args:[g]})
H.q(e,g)
y=$.l
if(y===c)return d.$1(e)
$.l=c
z=y
try{y=d.$1(e)
return y}finally{$.l=z}},
dJ:function(a,b,c,d,e,f,g,h,i){var z,y
H.e(d,{func:1,ret:g,args:[h,i]})
H.q(e,h)
H.q(f,i)
y=$.l
if(y===c)return d.$2(e,f)
$.l=c
z=y
try{y=d.$2(e,f)
return y}finally{$.l=z}},
aw:function(a,b,c,d){var z
H.e(d,{func:1,ret:-1})
z=C.c!==c
if(z)d=!(!z||!1)?c.I(d):c.ay(d,-1)
P.bT(d)},
db:{"^":"j:6;a",
$1:function(a){var z,y
z=this.a
y=z.a
z.a=null
y.$0()}},
da:{"^":"j:12;a,b,c",
$1:function(a){var z,y
this.a.a=H.e(a,{func:1,ret:-1})
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
dc:{"^":"j:0;a",
$0:function(){this.a.$0()}},
dd:{"^":"j:0;a",
$0:function(){this.a.$0()}},
dA:{"^":"c;a,0b,c",
ah:function(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(H.a5(new P.dC(this,b),0),a)
else throw H.f(P.x("`setTimeout()` not found."))},
Y:function(){if(self.setTimeout!=null){var z=this.b
if(z==null)return
self.clearTimeout(z)
this.b=null}else throw H.f(P.x("Canceling a timer."))},
i:{
dB:function(a,b){var z=new P.dA(!0,0)
z.ah(a,b)
return z}}},
dC:{"^":"j:1;a,b",
$0:function(){var z=this.a
z.b=null
z.c=1
this.b.$0()}},
S:{"^":"c;0a,b,c,d,e,$ti",
aH:function(a){if(this.c!==6)return!0
return this.b.b.L(H.e(this.d,{func:1,ret:P.aZ,args:[P.c]}),a.a,P.aZ,P.c)},
aE:function(a){var z,y,x,w
z=this.e
y=P.c
x={futureOr:1,type:H.t(this,1)}
w=this.b.b
if(H.ai(z,{func:1,args:[P.c,P.B]}))return H.b3(w.aM(z,a.a,a.b,null,y,P.B),x)
else return H.b3(w.L(H.e(z,{func:1,args:[P.c]}),a.a,null,y),x)}},
I:{"^":"c;T:a<,b,0au:c<,$ti",
a4:function(a,b,c){var z,y,x,w
z=H.t(this,0)
H.e(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
y=$.l
if(y!==C.c){y.toString
H.e(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
if(b!=null)b=P.dH(b,y)}H.e(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
x=new P.I(0,$.l,[c])
w=b==null?1:3
this.N(new P.S(x,w,a,b,[z,c]))
return x},
aP:function(a,b){return this.a4(a,null,b)},
N:function(a){var z,y
z=this.a
if(z<=1){a.a=H.i(this.c,"$isS")
this.c=a}else{if(z===2){y=H.i(this.c,"$isI")
z=y.a
if(z<4){y.N(a)
return}this.a=z
this.c=y.c}z=this.b
z.toString
P.aw(null,null,z,H.e(new P.dk(this,a),{func:1,ret:-1}))}},
R:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=H.i(this.c,"$isS")
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){u=H.i(this.c,"$isI")
y=u.a
if(y<4){u.R(a)
return}this.a=y
this.c=u.c}z.a=this.v(a)
y=this.b
y.toString
P.aw(null,null,y,H.e(new P.dq(z,this),{func:1,ret:-1}))}},
H:function(){var z=H.i(this.c,"$isS")
this.c=null
return this.v(z)},
v:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
O:function(a){var z,y,x,w
z=H.t(this,0)
H.b3(a,{futureOr:1,type:z})
y=this.$ti
x=H.b0(a,"$isY",y,"$asY")
if(x){z=H.b0(a,"$isI",y,null)
if(z)P.bJ(a,this)
else P.dl(a,this)}else{w=this.H()
H.q(a,z)
this.a=4
this.c=a
P.a1(this,w)}},
D:[function(a,b){var z
H.i(b,"$isB")
z=this.H()
this.a=8
this.c=new P.w(a,b)
P.a1(this,z)},function(a){return this.D(a,null)},"aQ","$2","$1","gal",4,2,13],
$isY:1,
i:{
dl:function(a,b){var z,y,x
b.a=1
try{a.a4(new P.dm(b),new P.dn(b),null)}catch(x){z=H.a8(x)
y=H.a6(x)
P.e7(new P.dp(b,z,y))}},
bJ:function(a,b){var z,y
for(;z=a.a,z===2;)a=H.i(a.c,"$isI")
if(z>=4){y=b.H()
b.a=a.a
b.c=a.c
P.a1(b,y)}else{y=H.i(b.c,"$isS")
b.a=2
b.c=a
a.R(y)}},
a1:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=H.i(y.c,"$isw")
y=y.b
u=v.a
t=v.b
y.toString
P.av(null,null,y,u,t)}return}for(;s=b.a,s!=null;b=s){b.a=null
P.a1(z.a,b)}y=z.a
r=y.c
x.a=w
x.b=r
u=!w
if(u){t=b.c
t=(t&1)!==0||t===8}else t=!0
if(t){t=b.b
q=t.b
if(w){p=y.b
p.toString
p=p==null?q==null:p===q
if(!p)q.toString
else p=!0
p=!p}else p=!1
if(p){H.i(r,"$isw")
y=y.b
u=r.a
t=r.b
y.toString
P.av(null,null,y,u,t)
return}o=$.l
if(o==null?q!=null:o!==q)$.l=q
else o=null
y=b.c
if(y===8)new P.dt(z,x,b,w).$0()
else if(u){if((y&1)!==0)new P.ds(x,b,r).$0()}else if((y&2)!==0)new P.dr(z,x,b).$0()
if(o!=null)$.l=o
y=x.b
if(!!J.m(y).$isY){if(y.a>=4){n=H.i(t.c,"$isS")
t.c=null
b=t.v(n)
t.a=y.a
t.c=y.c
z.a=y
continue}else P.bJ(y,t)
return}}m=b.b
n=H.i(m.c,"$isS")
m.c=null
b=m.v(n)
y=x.a
u=x.b
if(!y){H.q(u,H.t(m,0))
m.a=4
m.c=u}else{H.i(u,"$isw")
m.a=8
m.c=u}z.a=m
y=m}}}},
dk:{"^":"j:0;a,b",
$0:function(){P.a1(this.a,this.b)}},
dq:{"^":"j:0;a,b",
$0:function(){P.a1(this.b,this.a.a)}},
dm:{"^":"j:6;a",
$1:function(a){var z=this.a
z.a=0
z.O(a)}},
dn:{"^":"j:14;a",
$2:function(a,b){this.a.D(a,H.i(b,"$isB"))},
$1:function(a){return this.$2(a,null)}},
dp:{"^":"j:0;a,b,c",
$0:function(){this.a.D(this.b,this.c)}},
dt:{"^":"j:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.c
z=w.b.b.a3(H.e(w.d,{func:1}),null)}catch(v){y=H.a8(v)
x=H.a6(v)
if(this.d){w=H.i(this.a.a.c,"$isw").a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=H.i(this.a.a.c,"$isw")
else u.b=new P.w(y,x)
u.a=!0
return}if(!!J.m(z).$isY){if(z instanceof P.I&&z.gT()>=4){if(z.gT()===8){w=this.b
w.b=H.i(z.gau(),"$isw")
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.aP(new P.du(t),null)
w.a=!1}}},
du:{"^":"j:15;a",
$1:function(a){return this.a}},
ds:{"^":"j:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t
try{x=this.b
w=H.t(x,0)
v=H.q(this.c,w)
u=H.t(x,1)
this.a.b=x.b.b.L(H.e(x.d,{func:1,ret:{futureOr:1,type:u},args:[w]}),v,{futureOr:1,type:u},w)}catch(t){z=H.a8(t)
y=H.a6(t)
x=this.a
x.b=new P.w(z,y)
x.a=!0}}},
dr:{"^":"j:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=H.i(this.a.a.c,"$isw")
w=this.c
if(w.aH(z)&&w.e!=null){v=this.b
v.b=w.aE(z)
v.a=!1}}catch(u){y=H.a8(u)
x=H.a6(u)
w=H.i(this.a.a.c,"$isw")
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.w(y,x)
s.a=!0}}},
bI:{"^":"c;a,0b"},
cY:{"^":"c;$ti",
gj:function(a){var z,y
z={}
y=new P.I(0,$.l,[P.N])
z.a=0
this.aF(new P.d_(z,this),!0,new P.d0(z,y),y.gal())
return y}},
d_:{"^":"j;a,b",
$1:function(a){H.q(a,H.t(this.b,0));++this.a.a},
$S:function(){return{func:1,ret:P.r,args:[H.t(this.b,0)]}}},
d0:{"^":"j:0;a,b",
$0:function(){this.b.O(this.a.a)}},
cZ:{"^":"c;$ti"},
iG:{"^":"c;"},
w:{"^":"c;a,b",
h:function(a){return H.d(this.a)},
$isn:1},
dD:{"^":"c;",$isiY:1},
dI:{"^":"j:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.bo()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.f(z)
x=H.f(z)
x.stack=y.h(0)
throw x}},
dw:{"^":"dD;",
aN:function(a){var z,y,x
H.e(a,{func:1,ret:-1})
try{if(C.c===$.l){a.$0()
return}P.bR(null,null,this,a,-1)}catch(x){z=H.a8(x)
y=H.a6(x)
P.av(null,null,this,z,H.i(y,"$isB"))}},
aO:function(a,b,c){var z,y,x
H.e(a,{func:1,ret:-1,args:[c]})
H.q(b,c)
try{if(C.c===$.l){a.$1(b)
return}P.bS(null,null,this,a,b,-1,c)}catch(x){z=H.a8(x)
y=H.a6(x)
P.av(null,null,this,z,H.i(y,"$isB"))}},
ay:function(a,b){return new P.dy(this,H.e(a,{func:1,ret:b}),b)},
I:function(a){return new P.dx(this,H.e(a,{func:1,ret:-1}))},
az:function(a,b){return new P.dz(this,H.e(a,{func:1,ret:-1,args:[b]}),b)},
a3:function(a,b){H.e(a,{func:1,ret:b})
if($.l===C.c)return a.$0()
return P.bR(null,null,this,a,b)},
L:function(a,b,c,d){H.e(a,{func:1,ret:c,args:[d]})
H.q(b,d)
if($.l===C.c)return a.$1(b)
return P.bS(null,null,this,a,b,c,d)},
aM:function(a,b,c,d,e,f){H.e(a,{func:1,ret:d,args:[e,f]})
H.q(b,e)
H.q(c,f)
if($.l===C.c)return a.$2(b,c)
return P.dJ(null,null,this,a,b,c,d,e,f)},
aK:function(a,b,c,d){return H.e(a,{func:1,ret:b,args:[c,d]})}},
dy:{"^":"j;a,b,c",
$0:function(){return this.a.a3(this.b,this.c)},
$S:function(){return{func:1,ret:this.c}}},
dx:{"^":"j:1;a,b",
$0:function(){return this.a.aN(this.b)}},
dz:{"^":"j;a,b,c",
$1:function(a){var z=this.c
return this.a.aO(this.b,H.q(a,z),z)},
$S:function(){return{func:1,ret:-1,args:[this.c]}}}}],["","",,P,{"^":"",
bi:function(a,b,c){var z,y,x
if(P.dF(a))return b+"..."+c
z=new P.bq(b)
y=$.$get$aY()
C.b.X(y,a)
try{x=z
x.a=P.d1(x.gE(),a,", ")}finally{if(0>=y.length)return H.v(y,-1)
y.pop()}y=z
y.a=y.gE()+c
y=z.gE()
return y.charCodeAt(0)==0?y:y},
dF:function(a){var z,y
for(z=0;y=$.$get$aY(),z<y.length;++z)if(a===y[z])return!0
return!1},
ae:{"^":"c;$ti",
ga0:function(a){return new H.cD(a,this.gj(a),0,[H.dR(this,a,"ae",0)])},
aC:function(a,b){return this.n(a,b)},
h:function(a){return P.bi(a,"[","]")}}}],["","",,P,{"^":"",
cr:function(a){var z=J.m(a)
if(!!z.$isj)return z.h(a)
return"Instance of '"+H.a_(a)+"'"},
aq:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.al(a)
if(typeof a==="string")return JSON.stringify(a)
return P.cr(a)},
aZ:{"^":"c;"},
"+bool":0,
ah:{"^":"D;"},
"+double":0,
ap:{"^":"c;a",
C:function(a,b){return C.a.C(this.a,H.i(b,"$isap").a)},
h:function(a){var z,y,x,w,v
z=new P.cq()
y=this.a
if(y<0)return"-"+new P.ap(0-y).h(0)
x=z.$1(C.a.t(y,6e7)%60)
w=z.$1(C.a.t(y,1e6)%60)
v=new P.cp().$1(y%1e6)
return""+C.a.t(y,36e8)+":"+H.d(x)+":"+H.d(w)+"."+H.d(v)},
i:{
co:function(a,b,c,d,e,f){return new P.ap(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
cp:{"^":"j:7;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
cq:{"^":"j:7;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
n:{"^":"c;"},
bo:{"^":"n;",
h:function(a){return"Throw of null."}},
W:{"^":"n;a,b,c,d",
gG:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gF:function(){return""},
h:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+z
w=this.gG()+y+x
if(!this.a)return w
v=this.gF()
u=P.aq(this.b)
return w+v+": "+H.d(u)},
i:{
b9:function(a,b,c){return new P.W(!0,a,b,c)}}},
cK:{"^":"W;e,f,a,b,c,d",
gG:function(){return"RangeError"},
gF:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.d(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.d(z)
else if(x>z)y=": Not in range "+H.d(z)+".."+H.d(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.d(z)}return y},
i:{
aR:function(a,b,c){return new P.cK(null,null,!0,a,b,"Value not in range")}}},
cx:{"^":"W;e,j:f>,a,b,c,d",
gG:function(){return"RangeError"},
gF:function(){if(J.c9(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.d(z)},
i:{
cy:function(a,b,c,d,e){var z=H.u(e!=null?e:J.aD(b))
return new P.cx(b,z,!0,a,c,"Index out of range")}}},
d7:{"^":"n;a",
h:function(a){return"Unsupported operation: "+this.a},
i:{
x:function(a){return new P.d7(a)}}},
d5:{"^":"n;a",
h:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"},
i:{
bG:function(a){return new P.d5(a)}}},
cV:{"^":"n;a",
h:function(a){return"Bad state: "+this.a},
i:{
cW:function(a){return new P.cV(a)}}},
ck:{"^":"n;a",
h:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.d(P.aq(z))+"."},
i:{
aI:function(a){return new P.ck(a)}}},
bp:{"^":"c;",
h:function(a){return"Stack Overflow"},
$isn:1},
cl:{"^":"n;a",
h:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
f4:{"^":"c;"},
dj:{"^":"c;a",
h:function(a){return"Exception: "+this.a}},
N:{"^":"D;"},
"+int":0,
p:{"^":"c;$ti",$isaa:1},
"+List":0,
r:{"^":"c;",
h:function(a){return"null"}},
"+Null":0,
D:{"^":"c;"},
"+num":0,
c:{"^":";",
h:function(a){return"Instance of '"+H.a_(this)+"'"},
toString:function(){return this.h(this)}},
B:{"^":"c;"},
C:{"^":"c;"},
"+String":0,
bq:{"^":"c;E:a<",
gj:function(a){return this.a.length},
h:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
i:{
d1:function(a,b,c){var z=J.cb(b)
if(!z.B())return a
if(c.length===0){do a+=H.d(z.gw())
while(z.B())}else{a+=H.d(z.gw())
for(;z.B();)a=a+c+H.d(z.gw())}return a}}}}],["","",,W,{"^":"",
bQ:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.df(a)
if(!!J.m(z).$isP)return z
return}else return H.i(a,"$isP")},
bV:function(a,b){var z
H.e(a,{func:1,ret:-1,args:[b]})
z=$.l
if(z===C.c)return a
return z.az(a,b)},
a:{"^":"a9;","%":";HTMLElement"},
ec:{"^":"z;","%":"AbortPaymentEvent"},
ed:{"^":"a;",
h:function(a){return String(a)},
"%":"HTMLAnchorElement"},
em:{"^":"b;","%":"AnimationEvent"},
en:{"^":"b;","%":"AnimationPlaybackEvent"},
eo:{"^":"b;","%":"ApplicationCacheErrorEvent"},
ep:{"^":"a;",
h:function(a){return String(a)},
"%":"HTMLAreaElement"},
eq:{"^":"bl;","%":"HTMLAudioElement"},
es:{"^":"a;","%":"HTMLBRElement"},
et:{"^":"aE;","%":"BackgroundFetchClickEvent"},
aE:{"^":"z;","%":";BackgroundFetchEvent"},
eu:{"^":"aE;","%":"BackgroundFetchFailEvent"},
ev:{"^":"aE;","%":"BackgroundFetchedEvent"},
ew:{"^":"a;","%":"HTMLBaseElement"},
ex:{"^":"b;","%":"BeforeInstallPromptEvent"},
ey:{"^":"b;","%":"BeforeUnloadEvent"},
cd:{"^":"k;","%":";Blob"},
ez:{"^":"b;","%":"BlobEvent"},
eA:{"^":"a;","%":"HTMLBodyElement"},
eB:{"^":"a;","%":"HTMLButtonElement"},
eC:{"^":"d2;","%":"CDATASection"},
eD:{"^":"z;","%":"CanMakePaymentEvent"},
aG:{"^":"a;",
aa:function(a,b,c){return a.getContext(b)},
a9:function(a,b){return this.aa(a,b,null)},
$isaG:1,
"%":"HTMLCanvasElement"},
eE:{"^":"k;","%":"CanvasGradient"},
eF:{"^":"k;","%":"CanvasPattern"},
bd:{"^":"k;",$isbd:1,"%":"CanvasRenderingContext2D"},
aH:{"^":"Z;0j:length=","%":";CharacterData"},
eI:{"^":"b;","%":"ClipboardEvent"},
eJ:{"^":"b;","%":"CloseEvent"},
eK:{"^":"aH;","%":"Comment"},
eL:{"^":"a0;","%":"CompositionEvent"},
eM:{"^":"a;","%":"HTMLContentElement"},
eO:{"^":"b;","%":"CustomEvent"},
eP:{"^":"a;","%":"HTMLDListElement"},
eQ:{"^":"a;","%":"HTMLDataElement"},
eR:{"^":"a;","%":"HTMLDataListElement"},
eU:{"^":"a;","%":"HTMLDetailsElement"},
eV:{"^":"b;","%":"DeviceMotionEvent"},
eW:{"^":"b;","%":"DeviceOrientationEvent"},
eX:{"^":"a;","%":"HTMLDialogElement"},
eZ:{"^":"a;","%":"HTMLDivElement"},
bh:{"^":"Z;","%":";Document"},
cm:{"^":"Z;","%":";DocumentFragment"},
f_:{"^":"k;","%":"DOMError"},
f0:{"^":"k;",
h:function(a){return String(a)},
"%":"DOMException"},
cn:{"^":"k;",
h:function(a){return"Rectangle ("+H.d(a.left)+", "+H.d(a.top)+") "+H.d(a.width)+" x "+H.d(a.height)},
"%":";DOMRectReadOnly"},
a9:{"^":"Z;",
h:function(a){return a.localName},
$isa9:1,
"%":";Element"},
f2:{"^":"a;","%":"HTMLEmbedElement"},
f3:{"^":"b;","%":"ErrorEvent"},
b:{"^":"k;",$isb:1,"%":";Event|InputEvent"},
P:{"^":"k;",
ai:function(a,b,c,d){return a.addEventListener(b,H.a5(H.e(c,{func:1,args:[W.b]}),1),!1)},
$isP:1,
"%":";EventTarget"},
z:{"^":"b;","%":";ExtendableEvent"},
f5:{"^":"z;","%":"ExtendableMessageEvent"},
fu:{"^":"z;","%":"FetchEvent"},
fv:{"^":"a;","%":"HTMLFieldSetElement"},
fw:{"^":"cd;","%":"File"},
fy:{"^":"a0;","%":"FocusEvent"},
fz:{"^":"b;","%":"FontFaceSetLoadEvent"},
fA:{"^":"z;","%":"ForeignFetchEvent"},
fC:{"^":"a;0j:length=","%":"HTMLFormElement"},
fE:{"^":"b;","%":"GamepadEvent"},
fF:{"^":"a;","%":"HTMLHRElement"},
fG:{"^":"b;","%":"HashChangeEvent"},
fH:{"^":"a;","%":"HTMLHeadElement"},
fI:{"^":"a;","%":"HTMLHeadingElement"},
fJ:{"^":"bh;","%":"HTMLDocument"},
fK:{"^":"a;","%":"HTMLHtmlElement"},
fL:{"^":"a;","%":"HTMLIFrameElement"},
fM:{"^":"a;","%":"HTMLImageElement"},
fO:{"^":"a;",$iscG:1,$isao:1,"%":"HTMLInputElement"},
fP:{"^":"z;","%":"InstallEvent"},
fS:{"^":"a0;","%":"KeyboardEvent"},
fT:{"^":"a;","%":"HTMLLIElement"},
fU:{"^":"a;","%":"HTMLLabelElement"},
fV:{"^":"a;","%":"HTMLLegendElement"},
fY:{"^":"a;","%":"HTMLLinkElement"},
fZ:{"^":"a;","%":"HTMLMapElement"},
bl:{"^":"a;","%":";HTMLMediaElement"},
h1:{"^":"b;","%":"MediaEncryptedEvent"},
h2:{"^":"k;","%":"MediaError"},
h3:{"^":"b;","%":"MediaKeyMessageEvent"},
h4:{"^":"b;","%":"MediaQueryListEvent"},
h5:{"^":"b;","%":"MediaStreamEvent"},
h6:{"^":"b;","%":"MediaStreamTrackEvent"},
h7:{"^":"a;","%":"HTMLMenuElement"},
h8:{"^":"b;","%":"MessageEvent"},
h9:{"^":"a;","%":"HTMLMetaElement"},
hb:{"^":"a;","%":"HTMLMeterElement"},
hc:{"^":"b;","%":"MIDIConnectionEvent"},
hd:{"^":"b;","%":"MIDIMessageEvent"},
he:{"^":"a;","%":"HTMLModElement"},
J:{"^":"a0;",
gaJ:function(a){var z,y,x,w,v,u
if(!!a.offsetX)return new P.R(a.offsetX,a.offsetY,[P.D])
else{z=a.target
if(!J.m(W.bQ(z)).$isa9)throw H.f(P.x("offsetX is only supported on elements"))
y=H.i(W.bQ(z),"$isa9")
z=a.clientX
x=a.clientY
w=[P.D]
v=y.getBoundingClientRect()
u=v.left
v=v.top
H.af(new P.R(u,v,w),"$isR",w,"$asR")
if(typeof z!=="number")return z.ab()
if(typeof x!=="number")return x.ab()
return new P.R(C.i.a5(z-u),C.i.a5(x-v),w)}},
$isJ:1,
"%":";DragEvent|MouseEvent"},
hf:{"^":"b;","%":"MutationEvent"},
hr:{"^":"cE;","%":"Navigator"},
cE:{"^":"k;","%":";NavigatorConcurrentHardware"},
hs:{"^":"k;","%":"NavigatorUserMediaError"},
Z:{"^":"P;",
h:function(a){var z=a.nodeValue
return z==null?this.ad(a):z},
"%":";Node"},
ht:{"^":"z;","%":"NotificationEvent"},
hu:{"^":"a;","%":"HTMLOListElement"},
hv:{"^":"a;","%":"HTMLObjectElement"},
hy:{"^":"a;","%":"HTMLOptGroupElement"},
hz:{"^":"a;","%":"HTMLOptionElement"},
hA:{"^":"a;","%":"HTMLOutputElement"},
hB:{"^":"k;","%":"OverconstrainedError"},
hC:{"^":"b;","%":"PageTransitionEvent"},
hD:{"^":"a;","%":"HTMLParagraphElement"},
hE:{"^":"a;","%":"HTMLParamElement"},
hH:{"^":"z;","%":"PaymentRequestEvent"},
hI:{"^":"b;","%":"PaymentRequestUpdateEvent"},
hJ:{"^":"a;","%":"HTMLPictureElement"},
hK:{"^":"J;","%":"PointerEvent"},
hN:{"^":"b;","%":"PopStateEvent"},
hO:{"^":"k;","%":"PositionError"},
hP:{"^":"a;","%":"HTMLPreElement"},
hQ:{"^":"b;","%":"PresentationConnectionAvailableEvent"},
hR:{"^":"b;","%":"PresentationConnectionCloseEvent"},
hS:{"^":"aH;","%":"ProcessingInstruction"},
hT:{"^":"a;","%":"HTMLProgressElement"},
cJ:{"^":"b;","%":";ProgressEvent"},
hU:{"^":"b;","%":"PromiseRejectionEvent"},
hV:{"^":"z;","%":"PushEvent"},
hW:{"^":"a;","%":"HTMLQuoteElement"},
i0:{"^":"b;","%":"RTCDataChannelEvent"},
i1:{"^":"b;","%":"RTCDTMFToneChangeEvent"},
i2:{"^":"b;","%":"RTCPeerConnectionIceEvent"},
i3:{"^":"b;","%":"RTCTrackEvent"},
i4:{"^":"a;","%":"HTMLScriptElement"},
i6:{"^":"b;","%":"SecurityPolicyViolationEvent"},
i7:{"^":"a;0j:length=","%":"HTMLSelectElement"},
i8:{"^":"b;","%":"SensorErrorEvent"},
ia:{"^":"a;","%":"HTMLShadowElement"},
ib:{"^":"cm;","%":"ShadowRoot"},
ic:{"^":"a;","%":"HTMLSlotElement"},
id:{"^":"a;","%":"HTMLSourceElement"},
ie:{"^":"a;","%":"HTMLSpanElement"},
ig:{"^":"b;","%":"SpeechRecognitionError"},
ih:{"^":"b;","%":"SpeechRecognitionEvent"},
ii:{"^":"b;","%":"SpeechSynthesisEvent"},
il:{"^":"b;","%":"StorageEvent"},
im:{"^":"a;","%":"HTMLStyleElement"},
is:{"^":"z;","%":"SyncEvent"},
iu:{"^":"a;","%":"HTMLTableCaptionElement"},
iv:{"^":"a;","%":"HTMLTableCellElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement"},
iw:{"^":"a;","%":"HTMLTableColElement"},
ix:{"^":"a;","%":"HTMLTableElement"},
iy:{"^":"a;","%":"HTMLTableRowElement"},
iz:{"^":"a;","%":"HTMLTableSectionElement"},
iA:{"^":"a;","%":"HTMLTemplateElement"},
d2:{"^":"aH;","%":";Text"},
iB:{"^":"a;","%":"HTMLTextAreaElement"},
iD:{"^":"a0;","%":"TextEvent"},
iF:{"^":"a;","%":"HTMLTimeElement"},
iH:{"^":"a;","%":"HTMLTitleElement"},
iJ:{"^":"a0;","%":"TouchEvent"},
iK:{"^":"a;","%":"HTMLTrackElement"},
iL:{"^":"b;","%":"TrackEvent"},
iM:{"^":"b;","%":"TransitionEvent|WebKitTransitionEvent"},
a0:{"^":"b;","%":";UIEvent"},
iN:{"^":"a;","%":"HTMLUListElement"},
iO:{"^":"a;","%":"HTMLUnknownElement"},
iQ:{"^":"b;","%":"VRDeviceEvent"},
iR:{"^":"b;","%":"VRDisplayEvent"},
iS:{"^":"b;","%":"VRSessionEvent"},
iU:{"^":"bl;","%":"HTMLVideoElement"},
iW:{"^":"J;","%":"WheelEvent"},
d8:{"^":"P;",
a2:function(a,b){H.e(b,{func:1,ret:-1,args:[P.D]})
this.P(a)
return this.at(a,W.bV(b,P.D))},
at:function(a,b){return a.requestAnimationFrame(H.a5(H.e(b,{func:1,ret:-1,args:[P.D]}),1))},
P:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$isbH:1,
"%":"DOMWindow|Window"},
iX:{"^":"bh;","%":"XMLDocument"},
j1:{"^":"Z;","%":"Attr"},
j2:{"^":"Z;","%":"DocumentType"},
j3:{"^":"cn;",
h:function(a){return"Rectangle ("+H.d(a.left)+", "+H.d(a.top)+") "+H.d(a.width)+" x "+H.d(a.height)},
"%":"ClientRect|DOMRect"},
j5:{"^":"a;","%":"HTMLDirectoryElement"},
j6:{"^":"a;","%":"HTMLFontElement"},
j7:{"^":"a;","%":"HTMLFrameElement"},
j8:{"^":"a;","%":"HTMLFrameSetElement"},
j9:{"^":"a;","%":"HTMLMarqueeElement"},
ja:{"^":"b;","%":"MojoInterfaceRequestEvent"},
jb:{"^":"cJ;","%":"ResourceProgressEvent"},
je:{"^":"b;","%":"USBConnectionEvent"},
dg:{"^":"cY;$ti",
aF:function(a,b,c,d){var z=H.t(this,0)
H.e(a,{func:1,ret:-1,args:[z]})
H.e(c,{func:1,ret:-1})
return W.L(this.a,this.b,a,!1,z)}},
j4:{"^":"dg;a,b,c,$ti"},
dh:{"^":"cZ;a,b,c,d,e,$ti",
ax:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
H.e(z,{func:1,args:[W.b]})
if(y)J.ca(x,this.c,z,!1)}},
i:{
L:function(a,b,c,d,e){var z=W.bV(new W.di(c),W.b)
z=new W.dh(0,a,b,z,!1,[e])
z.ax()
return z}}},
di:{"^":"j:8;a",
$1:function(a){return this.a.$1(H.i(a,"$isb"))}},
de:{"^":"c;a",$isP:1,$isbH:1,i:{
df:function(a){if(a===window)return H.i(a,"$isbH")
else return new W.de(a)}}}}],["","",,P,{"^":"",hx:{"^":"cN;","%":"IDBOpenDBRequest|IDBVersionChangeRequest"},cN:{"^":"P;","%":";IDBRequest"},iT:{"^":"b;","%":"IDBVersionChangeEvent"}}],["","",,P,{"^":"",dv:{"^":"c;",
aI:function(){return Math.random()<0.5}},R:{"^":"c;a,b,$ti",
h:function(a){return"Point("+H.d(this.a)+", "+H.d(this.b)+")"}}}],["","",,P,{"^":"",eb:{"^":"A;","%":"SVGAElement"},ee:{"^":"am;","%":"SVGAnimateElement"},ef:{"^":"am;","%":"SVGAnimateMotionElement"},eg:{"^":"am;","%":"SVGAnimateTransformElement"},eh:{"^":"k;","%":"SVGAnimatedLength"},ei:{"^":"k;","%":"SVGAnimatedLengthList"},ej:{"^":"k;","%":"SVGAnimatedNumber"},ek:{"^":"k;","%":"SVGAnimatedNumberList"},el:{"^":"k;","%":"SVGAnimatedString"},am:{"^":"h;","%":";SVGAnimationElement"},eG:{"^":"Q;","%":"SVGCircleElement"},eH:{"^":"A;","%":"SVGClipPathElement"},eS:{"^":"A;","%":"SVGDefsElement"},eT:{"^":"h;","%":"SVGDescElement"},eY:{"^":"h;","%":"SVGDiscardElement"},f1:{"^":"Q;","%":"SVGEllipseElement"},f6:{"^":"h;","%":"SVGFEBlendElement"},f7:{"^":"h;","%":"SVGFEColorMatrixElement"},f8:{"^":"h;","%":"SVGFEComponentTransferElement"},f9:{"^":"h;","%":"SVGFECompositeElement"},fa:{"^":"h;","%":"SVGFEConvolveMatrixElement"},fb:{"^":"h;","%":"SVGFEDiffuseLightingElement"},fc:{"^":"h;","%":"SVGFEDisplacementMapElement"},fd:{"^":"h;","%":"SVGFEDistantLightElement"},fe:{"^":"h;","%":"SVGFEFloodElement"},ff:{"^":"au;","%":"SVGFEFuncAElement"},fg:{"^":"au;","%":"SVGFEFuncBElement"},fh:{"^":"au;","%":"SVGFEFuncGElement"},fi:{"^":"au;","%":"SVGFEFuncRElement"},fj:{"^":"h;","%":"SVGFEGaussianBlurElement"},fk:{"^":"h;","%":"SVGFEImageElement"},fl:{"^":"h;","%":"SVGFEMergeElement"},fm:{"^":"h;","%":"SVGFEMergeNodeElement"},fn:{"^":"h;","%":"SVGFEMorphologyElement"},fo:{"^":"h;","%":"SVGFEOffsetElement"},fp:{"^":"h;","%":"SVGFEPointLightElement"},fq:{"^":"h;","%":"SVGFESpecularLightingElement"},fr:{"^":"h;","%":"SVGFESpotLightElement"},fs:{"^":"h;","%":"SVGFETileElement"},ft:{"^":"h;","%":"SVGFETurbulenceElement"},fx:{"^":"h;","%":"SVGFilterElement"},fB:{"^":"A;","%":"SVGForeignObjectElement"},fD:{"^":"A;","%":"SVGGElement"},Q:{"^":"A;","%":";SVGGeometryElement"},A:{"^":"h;","%":";SVGGraphicsElement"},fN:{"^":"A;","%":"SVGImageElement"},fW:{"^":"Q;","%":"SVGLineElement"},fX:{"^":"bK;","%":"SVGLinearGradientElement"},h_:{"^":"h;","%":"SVGMarkerElement"},h0:{"^":"h;","%":"SVGMaskElement"},ha:{"^":"h;","%":"SVGMetadataElement"},hF:{"^":"Q;","%":"SVGPathElement"},hG:{"^":"h;","%":"SVGPatternElement"},hL:{"^":"Q;","%":"SVGPolygonElement"},hM:{"^":"Q;","%":"SVGPolylineElement"},hX:{"^":"bK;","%":"SVGRadialGradientElement"},hY:{"^":"Q;","%":"SVGRectElement"},i5:{"^":"h;","%":"SVGScriptElement"},i9:{"^":"am;","%":"SVGSetElement"},ik:{"^":"h;","%":"SVGStopElement"},io:{"^":"h;","%":"SVGStyleElement"},h:{"^":"a9;","%":";SVGElement"},ip:{"^":"A;","%":"SVGSVGElement"},iq:{"^":"A;","%":"SVGSwitchElement"},ir:{"^":"h;","%":"SVGSymbolElement"},it:{"^":"bt;","%":"SVGTSpanElement"},bs:{"^":"A;","%":";SVGTextContentElement"},iC:{"^":"bt;","%":"SVGTextElement"},iE:{"^":"bs;","%":"SVGTextPathElement"},bt:{"^":"bs;","%":";SVGTextPositioningElement"},iI:{"^":"h;","%":"SVGTitleElement"},iP:{"^":"A;","%":"SVGUseElement"},iV:{"^":"h;","%":"SVGViewElement"},bK:{"^":"h;","%":";SVGGradientElement"},au:{"^":"h;","%":";SVGComponentTransferFunctionElement"},jc:{"^":"h;","%":"SVGFEDropShadowElement"},jd:{"^":"h;","%":"SVGMPathElement"}}],["","",,P,{"^":"",er:{"^":"b;","%":"AudioProcessingEvent"},hw:{"^":"b;","%":"OfflineAudioCompletionEvent"}}],["","",,P,{"^":"",eN:{"^":"b;","%":"WebGLContextEvent"},hZ:{"^":"k;","%":"WebGLRenderingContext"},i_:{"^":"k;","%":"WebGL2RenderingContext"}}],["","",,P,{"^":"",ij:{"^":"k;","%":"SQLError"}}],["","",,A,{"^":"",G:{"^":"c;a,b,c,d,e",
gaD:function(){if(this.b)return 240
else return 0},
gaG:function(){var z,y,x,w
for(z=this.a,y=z.length,x=0,w=0;w<y;++w)if(z[w].b)++x
return x},
h:function(a){return"Cell("+this.d+", "+this.e+")"}}}],["","",,S,{"^":"",cs:{"^":"c;a,b,0c,0d",
aj:function(){var z,y,x,w,v
for(z=this.b,y=[A.G],x=0;x<1600;++x){w=C.a.t(x,40)
v=new Array(8)
v.fixed$length=Array
C.b.m(z,x,new A.G(H.ak(v,y),!1,!1,x%40,w))}},
am:function(){var z,y,x,w,v,u,t,s,r,q,p
for(z=this.b,y=0;y<1600;++y){x=z[y]
w=x.d
v=x.e
u=C.a.u(w-1,40)
t=C.a.u(v-1,40)*40
s=t+u
if(s<0||s>=1600)return H.v(z,s)
r=z[s]
q=x.a
C.b.m(q,0,r)
p=C.a.u(w,40)
s=t+p
if(s<0||s>=1600)return H.v(z,s)
C.b.m(q,1,z[s])
w=(w+1)%40
s=t+w
if(s<0||s>=1600)return H.v(z,s)
C.b.m(q,2,z[s])
t=C.a.u(v,40)*40
s=t+u
if(s>=1600)return H.v(z,s)
C.b.m(q,3,z[s])
s=t+w
if(s>=1600)return H.v(z,s)
C.b.m(q,4,z[s])
t=(v+1)%40*40
s=t+u
if(s>=1600)return H.v(z,s)
C.b.m(q,5,z[s])
s=t+p
if(s>=1600)return H.v(z,s)
C.b.m(q,6,z[s])
s=t+w
if(s>=1600)return H.v(z,s)
C.b.m(q,7,z[s])}},
a1:function(){return C.b.A(this.b,new S.cu())},
aB:function(a){return C.b.A(this.b,new S.ct())},
a6:function(){var z=this.b
C.b.A(z,new S.cv())
C.b.A(z,new S.cw())},
q:function(a){var z,y,x,w,v,u,t
a.fillStyle="rgba(0, 38, 0, 1)"
z=this.a
a.fillRect(0,0,z,z)
for(z=this.b,y=0;y<1600;++y){x=z[y]
a.fillStyle="rgba(0, "+x.gaD()+", 0, 1)"
w=x.d
v=this.c
u=this.d
t=v-2*u
a.fillRect(w*v+u,x.e*v+u,t,t)}},
Z:function(a){var z,y,x,w,v
H.af(a,"$isR",[P.D],"$asR")
z=a.a
y=this.c
if(typeof z!=="number")return z.a8()
x=C.m.a_(z/y)
y=a.b
z=this.c
if(typeof y!=="number")return y.a8()
w=C.m.a_(y/z)
x=Math.min(x,39)
v=Math.min(w,39)*40+x
z=this.b
if(v<0||v>=1600)return H.v(z,v)
return z[v]}},cu:{"^":"j:2;",
$1:function(a){var z
H.i(a,"$isG")
a.toString
z=$.$get$be().aI()
a.b=z
return z}},ct:{"^":"j:2;",
$1:function(a){H.i(a,"$isG").b=!1
return!1}},cv:{"^":"j:2;",
$1:function(a){var z
H.i(a,"$isG")
a.c=a.b
z=a.gaG()
if(z<=1||z>=4)a.c=!1
else if(z===3)a.c=!0
return}},cw:{"^":"j:2;",
$1:function(a){var z
H.i(a,"$isG")
z=a.c
a.b=z
return z}}}],["","",,F,{"^":"",
c5:function(){var z,y,x,w
z=H.i(document.querySelector("#canvas"),"$isaG")
y=window.innerWidth
x=window.innerHeight
w=C.i.aL(Math.min(H.bZ(y),H.bZ(x))*0.8)
z.width=w
z.height=w
T.cR(z,H.e_((z&&C.r).a9(z,"2d"),"$isbd"))}},1],["","",,T,{"^":"",aS:{"^":"c;a,b",
h:function(a){return this.b}},cQ:{"^":"c;a,b,0c,0d,e,f,r,0x,y,z,Q,ch,cx",
ag:function(a,b){var z,y,x,w,v
z=this.a
y=z.width
y.toString
this.c=y
x=new Array(1600)
x.fixed$length=Array
x=new S.cs(y,H.ak(x,[A.G]))
y/=40
x.c=y
x.d=Math.max(0.5,y*0.05)
x.aj()
x.am()
x.a1()
this.d=x
z.draggable=!0
x=W.J
y={func:1,ret:-1,args:[x]}
W.L(z,"click",H.e(this.gan(),y),!1,x)
W.L(z,"dragover",H.e(this.gao(),y),!1,x)
z=this.y
z.toString
w=W.b
W.L(z,"change",H.e(new T.cU(this),{func:1,ret:-1,args:[w]}),!1,w)
w=this.z
w.toString
W.L(w,"click",H.e(this.gaq(),y),!1,x)
z=this.Q
z.toString
W.L(z,"click",H.e(this.gas(),y),!1,x)
z=this.ch
z.toString
W.L(z,"click",H.e(this.gap(),y),!1,x)
v=this.cx
v.toString
W.L(v,"click",H.e(this.gar(),y),!1,x)
w.disabled=!1
z.disabled=!1
v.disabled=!1
this.sk(0,C.f)},
U:function(){var z,y
this.f.Y()
z=window
y=this.x
C.l.P(z)
z.cancelAnimationFrame(y)},
aX:[function(a){H.e4(a)
this.f.Y()
this.f=P.bu(this.r,new T.cS(this))},"$1","gW",4,0,16],
S:function(){var z,y
z=this.y
y=H.cI(z.value,null)
y=H.u(C.a.aA(y==null?20:y,5,60))
z.value=C.a.h(y)
this.r=P.co(0,0,0,C.a.af(1000,y),0,0)},
aU:[function(a){var z=this.e
if(z===C.f)this.sk(0,C.d)
else if(z===C.d||z===C.e)this.sk(0,C.f)
else throw H.f(P.cW("Cannot pause/resume from current state: "+this.gk(this).h(0)))},"$1","gaq",4,0,3],
aW:[function(a){this.d.a6()
this.d.q(this.b)},"$1","gas",4,0,3],
aT:[function(a){this.sk(0,C.e)
this.d.aB(0)
this.d.q(this.b)},"$1","gap",4,0,3],
aV:[function(a){this.sk(0,C.e)
this.d.a1()
this.d.q(this.b)},"$1","gar",4,0,3],
sk:function(a,b){if(b===C.f){this.z.value="Pause"
this.Q.disabled=!0
this.S()
this.x=C.l.a2(window,this.gW())}else if(b===C.d){this.z.value="Resume"
this.Q.disabled=!1
this.U()}else if(b===C.e){this.z.value="Start"
this.Q.disabled=!1
this.U()}else throw H.f(P.x("Unsupported simulation state: "+b.h(0)))
this.e=b},
gk:function(a){return this.e},
aR:[function(a){var z,y,x
H.i(a,"$isJ")
z=this.e
if(z===C.f)this.sk(0,C.d)
else if(z===C.d||z===C.e){y=J.b8(a)
x=this.d.Z(y)
x.b=!x.b
this.d.q(this.b)}else throw H.f(P.x("Canvas clicked with unsupported state: "+this.gk(this).h(0)))},"$1","gan",4,0,9],
aS:[function(a){var z,y
H.i(a,"$isJ")
z=this.e
if(z===C.f)this.sk(0,C.d)
else if(z===C.d||z===C.e){y=J.b8(a)
this.d.Z(y).b=!0
this.d.q(this.b)}else throw H.f(P.x("Canvas mouse dragged with unsupported state: "+this.gk(this).h(0)))},"$1","gao",4,0,9],
i:{
cR:function(a,b){var z,y
z=P.bu(C.h,new T.cT())
y=document
y=new T.cQ(a,b,C.e,z,C.h,H.i(y.querySelector("#fps_box"),"$iscG"),H.i(y.querySelector("#pause_button"),"$isao"),H.i(y.querySelector("#step_button"),"$isao"),H.i(y.querySelector("#clear_button"),"$isao"),H.i(y.querySelector("#randomize_button"),"$isao"))
y.ag(a,b)
return y}}},cT:{"^":"j:0;",
$0:function(){}},cU:{"^":"j:8;a",
$1:function(a){return this.a.S()}},cS:{"^":"j:0;a",
$0:function(){var z=this.a
z.d.a6()
z.d.q(z.b)
z.x=C.l.a2(window,z.gW())}}}]]
setupProgram(dart,0,0)
J.m=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.bk.prototype
return J.bj.prototype}if(typeof a=="string")return J.aK.prototype
if(a==null)return J.cB.prototype
if(typeof a=="boolean")return J.cA.prototype
if(a.constructor==Array)return J.ab.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ad.prototype
return a}if(a instanceof P.c)return a
return J.ay(a)}
J.b4=function(a){if(typeof a=="string")return J.aK.prototype
if(a==null)return a
if(a.constructor==Array)return J.ab.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ad.prototype
return a}if(a instanceof P.c)return a
return J.ay(a)}
J.dP=function(a){if(a==null)return a
if(a.constructor==Array)return J.ab.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ad.prototype
return a}if(a instanceof P.c)return a
return J.ay(a)}
J.dQ=function(a){if(typeof a=="number")return J.as.prototype
if(a==null)return a
if(!(a instanceof P.c))return J.aU.prototype
return a}
J.c0=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.ad.prototype
return a}if(a instanceof P.c)return a
return J.ay(a)}
J.c9=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.dQ(a).C(a,b)}
J.ca=function(a,b,c,d){return J.c0(a).ai(a,b,c,d)}
J.cb=function(a){return J.dP(a).ga0(a)}
J.aD=function(a){return J.b4(a).gj(a)}
J.b8=function(a){return J.c0(a).gaJ(a)}
J.al=function(a){return J.m(a).h(a)}
var $=I.p
C.r=W.aG.prototype
C.t=J.k.prototype
C.b=J.ab.prototype
C.m=J.bj.prototype
C.a=J.bk.prototype
C.i=J.as.prototype
C.j=J.aK.prototype
C.A=J.ad.prototype
C.p=J.cH.prototype
C.k=J.aU.prototype
C.l=W.d8.prototype
C.q=new P.dv()
C.c=new P.dw()
C.h=new P.ap(0)
C.u=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.v=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.n=function(hooks) { return hooks; }

C.w=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.x=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.y=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.z=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.o=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.f=new T.aS(0,"SimulationState.running")
C.d=new T.aS(1,"SimulationState.paused")
C.e=new T.aS(2,"SimulationState.stopped")
$.E=0
$.X=null
$.bb=null
$.aW=!1
$.c2=null
$.bW=null
$.c7=null
$.ax=null
$.az=null
$.b5=null
$.T=null
$.a2=null
$.a3=null
$.aX=!1
$.l=C.c
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){var z=$dart_deferred_initializers$[a]
if(z==null)throw"DeferredLoading state error: code with hash '"+a+"' was not loaded"
z($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryParts={}
init.deferredPartUris=[]
init.deferredPartHashes=[];(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["bg","$get$bg",function(){return H.c1("_$dart_dartClosure")},"aL","$get$aL",function(){return H.c1("_$dart_js")},"bv","$get$bv",function(){return H.F(H.at({
toString:function(){return"$receiver$"}}))},"bw","$get$bw",function(){return H.F(H.at({$method$:null,
toString:function(){return"$receiver$"}}))},"bx","$get$bx",function(){return H.F(H.at(null))},"by","$get$by",function(){return H.F(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"bC","$get$bC",function(){return H.F(H.at(void 0))},"bD","$get$bD",function(){return H.F(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"bA","$get$bA",function(){return H.F(H.bB(null))},"bz","$get$bz",function(){return H.F(function(){try{null.$method$}catch(z){return z.message}}())},"bF","$get$bF",function(){return H.F(H.bB(void 0))},"bE","$get$bE",function(){return H.F(function(){try{(void 0).$method$}catch(z){return z.message}}())},"aV","$get$aV",function(){return P.d9()},"aY","$get$aY",function(){return[]},"be","$get$be",function(){return C.q}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1,ret:P.r},{func:1,ret:-1},{func:1,ret:-1,args:[A.G]},{func:1,ret:-1,args:[,]},{func:1,ret:-1,args:[{func:1,ret:-1}]},{func:1,args:[,]},{func:1,ret:P.r,args:[,]},{func:1,ret:P.C,args:[P.N]},{func:1,ret:-1,args:[W.b]},{func:1,ret:-1,args:[W.J]},{func:1,args:[,P.C]},{func:1,args:[P.C]},{func:1,ret:P.r,args:[{func:1,ret:-1}]},{func:1,ret:-1,args:[P.c],opt:[P.B]},{func:1,ret:P.r,args:[,],opt:[,]},{func:1,ret:[P.I,,],args:[,]},{func:1,ret:-1,args:[P.D]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.e9(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.b2=a.b2
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(F.c5,[])
else F.c5([])})})()
//# sourceMappingURL=main.dart.js.map
