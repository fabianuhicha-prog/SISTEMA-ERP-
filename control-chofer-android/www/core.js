(()=>{
const KEY='cc_apk_v1';
const $=id=>document.getElementById(id);
const money=v=>'$'+Number(v||0).toFixed(2);
function defaults(){return{users:[
 {username:'chofer',password:'1234',name:'Juan Pérez',role:'chofer',vehicle:{type:'Automóvil',color:'Gris',model:'Kia Soluto 2023',plate:'PVA-0926',goal:80,fuelFill:30,fuelRange:600,odometer:128450}},
 {username:'admin',password:'admin123',name:'Administrador',role:'admin',vehicle:{type:'Automóvil',color:'Azul',model:'Demo',plate:'ADMIN',goal:80,fuelFill:30,fuelRange:600,odometer:0}}
],trips:[],expenses:[],incomes:[]}}
let state;
function load(){try{state=JSON.parse(localStorage.getItem(KEY))||defaults()}catch(e){state=defaults()} save()}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function username(){return sessionStorage.getItem('ccu')||''}
function user(){return state.users.find(x=>x.username===username())}
function requireUser(){if(!user()){location.replace('index.html');return false}return true}
function today(){return new Date().toISOString().slice(0,10)}
function trips(){return state.trips.filter(x=>x.user===username())}
function expenses(){return state.expenses.filter(x=>x.user===username())}
function incomes(){return state.incomes.filter(x=>x.user===username())}
function head(){if(!requireUser())return;const u=user(),v=u.vehicle;const un=$('headUser'),vh=$('vehicleHead');if(un)un.textContent=u.name.split(' ')[0];if(vh)vh.textContent=`${v.type} · ${v.model} · ${v.plate}`}
function logout(){sessionStorage.removeItem('ccu');location.replace('index.html')}
function login(ev){if(ev)ev.preventDefault();const uname=$('loginUser').value.trim(),pass=$('loginPass').value;const u=state.users.find(x=>x.username===uname&&x.password===pass);if(!u){$('loginError').textContent='Usuario o contraseña incorrectos';return false}sessionStorage.setItem('ccu',u.username);location.replace('inicio.html');return false}
function daySummary(){const d=today(),ts=trips().filter(x=>x.date===d);const gross=ts.reduce((a,x)=>a+Number(x.base||x.baseIncome||0)+Number(x.extra||x.extraIncome||0),0)+incomes().filter(x=>x.date===d).reduce((a,x)=>a+Number(x.amount||0),0);const cost=ts.reduce((a,x)=>a+Number(x.total||x.totalCost||0),0)+expenses().filter(x=>x.date===d).reduce((a,x)=>a+Number(x.amount||0),0);const km=ts.reduce((a,x)=>a+Number(x.distance||0),0);return{gross,cost,net:gross-cost,km,count:ts.length}}
function seedIfEmpty(){if(trips().length)return;const u=username(); if(!u)return;const now=new Date();const routes=[['Uber','La Carolina','Cumbayá',[-0.1807,-78.484],[-0.2002,-78.4282],12.4,7.2],['inDrive','Quito Centro','La Pradera',[-0.2202,-78.5124],[-0.1905,-78.48],6.8,4.5],['Expresos','Sangolquí','Quito Centro',[-0.3341,-78.4522],[-0.2202,-78.5124],22.3,12]];for(let back=5;back>=0;back--){let d=new Date(now);d.setDate(d.getDate()-back);for(let j=0;j<3;j++){let r=routes[(back+j)%routes.length],ds=d.toISOString().slice(0,10),start=new Date(ds+'T'+String(8+j*5).padStart(2,'0')+':15:00'),pts=[];for(let p=0;p<7;p++){let t=p/6;pts.push([r[3][0]+(r[4][0]-r[3][0])*t,r[3][1]+(r[4][1]-r[3][1])*t])}let fuel=r[5]*(user().vehicle.fuelFill/user().vehicle.fuelRange),other=.25,total=fuel+other;state.trips.push({id:Date.now()+back*10+j,user:u,platform:r[0],date:ds,startTime:start.toISOString(),endTime:new Date(start.getTime()+32*60000).toISOString(),startLabel:r[1],endLabel:r[2],distance:r[5],base:r[6],extra:0,toll:0,other,fuel,total,net:r[6]-total,route:pts})}}save()}
function addExpense(){const amount=Number($('expAmount').value||0);if(!amount)return alert('Ingresa un valor');state.expenses.push({user:username(),date:today(),category:$('expCategory').value,amount,description:$('expDesc').value});save();alert('Gasto guardado');location.reload()}
function addIncome(){const amount=Number($('incAmount').value||0);if(!amount)return alert('Ingresa un valor');state.incomes.push({user:username(),date:today(),source:$('incSource').value,amount,description:$('incDesc').value});save();alert('Ingreso guardado');location.reload()}
function saveVehicle(){const v=user().vehicle;v.type=$('vType').value;v.color=$('vColor').value;v.model=$('vModel').value;v.plate=$('vPlate').value;v.goal=Number($('vGoal').value||0);v.fuelFill=Number($('vFuelFill').value||0);v.fuelRange=Math.max(1,Number($('vFuelRange').value||1));save();alert('Configuración guardada');location.reload()}
function createUser(){if(user().role!=='admin')return;const name=$('newName').value.trim(),un=$('newUser').value.trim(),pw=$('newPass').value.trim(),plate=$('newPlate').value.trim();if(!name||!un||!pw||!plate)return alert('Completa nombre, usuario, contraseña y placa');if(state.users.some(x=>x.username===un))return alert('Ese usuario ya existe');state.users.push({username:un,password:pw,name,role:'chofer',vehicle:{type:$('newType').value||'Automóvil',color:$('newColor').value,model:$('newModel').value,plate,goal:80,fuelFill:30,fuelRange:600,odometer:0}});save();alert('Chofer creado');location.reload()}
function exportData(){const b=new Blob([JSON.stringify(state,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='Control_Chofer_respaldo_'+today()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
function plugin(name){try{return window.Capacitor&&Capacitor.Plugins?Capacitor.Plugins[name]:null}catch(e){return null}}
load();
window.CC={$,money,state:()=>state,save,username,user,requireUser,today,trips,expenses,incomes,head,logout,login,daySummary,seedIfEmpty,addExpense,addIncome,saveVehicle,createUser,exportData,plugin};
})();
