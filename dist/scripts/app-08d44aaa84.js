!function(){"use strict";angular.module("serviceTracker",["formio","ngFormioHelper","ui.router","ngMap","angularMoment"]).factory("Geolocation",["$q","$window",function(e,t){return{getCurrentPosition:function(){var o=e.defer();return t.navigator.geolocation?(t.navigator.geolocation.getCurrentPosition(function(e){o.resolve(e)},function(e){o.reject(e)}),o.promise):o.reject("Geolocation not supported.")}}}])}(),angular.module("serviceTracker").provider("TimeClockResource",function(){return{$get:function(){return null},parent:"appointment",base:"dealer.customer.appointment.",templates:{index:"",view:"views/timeclock/view.html",create:"",edit:"","delete":""},params:{index:{},view:{},create:{},edit:{},"delete":{}},controllers:{index:null,"abstract":null,view:null,create:["$scope","Geolocation",function(e,t){t.getCurrentPosition().then(function(t){t&&t.coords&&t.coords.longitude&&t.coords.latitude&&(e.submission.data.location=[t.coords.latitude,t.coords.longitude])})["catch"](function(t){console.log(t),e.submission.data.location=[0,0]})}],edit:null,"delete":null}}}),angular.module("serviceTracker").provider("ServiceResource",function(){return{$get:function(){return null},parent:"appointment",base:"dealer.customer.appointment.",templates:{index:"",view:"views/service/view.html",create:"",edit:"","delete":""},params:{index:{},view:{},create:{},edit:{},"delete":{}},controllers:{index:null,"abstract":null,view:null,create:["$scope",function(e){e.$on("formSubmission",function(e,t){console.log(t)})}],edit:["$scope",function(e){e.$on("formSubmission",function(e,t){console.log(t)})}],"delete":["$scope","$stateParams",function(e,t){e.$on("delete",function(e){console.log("Submission Deleted")})}]}}}),angular.module("serviceTracker").provider("EquipmentResource",function(){return{$get:function(){return null},parent:"customer",base:"dealer.customer.",templates:{index:"",view:"views/equipment/view.html",create:"",edit:"","delete":""},params:{index:{},view:{},create:{},edit:{},"delete":{}},controllers:{index:null,"abstract":null,view:null,create:["$scope",function(e){e.$on("formSubmission",function(e,t){console.log(t)})}],edit:["$scope",function(e){e.$on("formSubmission",function(e,t){console.log(t)})}],"delete":["$scope","$stateParams",function(e,t){e.$on("delete",function(e){console.log("Submission Deleted")})}]}}}),angular.module("serviceTracker").provider("DealerResource",function(){return{$get:function(){return null},parent:null,templates:{index:"","abstract":"views/dealer/dealer.html",view:"views/dealer/view.html",create:"",edit:"","delete":""},params:{index:{},view:{},create:{},edit:{},"delete":{}},controllers:{index:null,"abstract":null,view:null,create:["$scope",function(e){e.$on("formSubmission",function(e,t){console.log(t)})}],edit:["$scope",function(e){e.$on("formSubmission",function(e,t){console.log(t)})}],"delete":["$scope","$stateParams",function(e,t){e.$on("delete",function(e){console.log("Submission Deleted")})}]}}}),angular.module("serviceTracker").provider("CustomerResource",function(){return{$get:function(){return null},parent:"dealer",base:"dealer.",templates:{index:"","abstract":"views/customer/customer.html",view:"views/customer/view.html",create:"",edit:"","delete":""},params:{index:{},view:{},create:{},edit:{},"delete":{}},controllers:{index:null,"abstract":null,view:["$scope",function(e){e.position={lat:"40.74",lng:"-74.18"},e.customer.loadSubmissionPromise.then(function(t){t.data.address&&t.data.address.geometry&&t.data.address.geometry.location&&(e.position.lat=t.data.address.geometry.location.lat,e.position.lng=t.data.address.geometry.location.lng)})}],create:["$scope",function(e){e.$on("formSubmission",function(e,t){console.log(t)})}],edit:["$scope",function(e){e.$on("formSubmission",function(e,t){console.log(t)})}],"delete":["$scope","$stateParams",function(e,t){e.$on("delete",function(e){console.log("Submission Deleted")})}]}}}),angular.module("serviceTracker").provider("ContractorResource",function(){return{$get:function(){return null},parent:"dealer",base:"dealer.",templates:{index:"",view:"",create:"",edit:"","delete":""},params:{index:{},view:{},create:{},edit:{},"delete":{}},controllers:{index:null,"abstract":null,view:null,create:["$scope",function(e){e.$on("formSubmission",function(e,t){console.log(t)})}],edit:["$scope",function(e){e.$on("formSubmission",function(e,t){console.log(t)})}],"delete":["$scope","$stateParams",function(e,t){e.$on("delete",function(e){console.log("Submission Deleted")})}]}}}),angular.module("serviceTracker").provider("AppointmentResource",function(){return{$get:function(){return null},parent:"customer",base:"dealer.customer.",templates:{index:"","abstract":"views/appointment/appointment.html",view:"views/appointment/view.html",create:"",edit:"","delete":""},params:{index:{},view:{},create:{},edit:{},"delete":{}},controllers:{index:null,"abstract":null,view:null,create:null,edit:null,"delete":null}}}),function(){"use strict";angular.module("serviceTracker").run(["FormioAuth","AppConfig","$rootScope",function(e,t,o){e.init(),o.config=t,angular.forEach(t.forms,function(e,t){o[t]=e})}])}(),function(){"use strict";angular.module("serviceTracker").config(["FormioProvider","FormioAuthProvider","FormioResourceProvider","FormioFormsProvider","$stateProvider","$urlRouterProvider","AppConfig","$injector",function(e,t,o,n,r,i,l,s){e.setBaseUrl(l.apiUrl),e.setAppUrl(l.appUrl),t.setStates("auth.login","home"),t.setForceAuth(!0),t.register("login","user"),r.state("home",{url:"/?",templateUrl:"views/home.html"}).state("appointments",{url:"/appointments",templateUrl:"views/appointment/all.html",controller:["$scope","$state","$rootScope",function(e,t,o){e.$on("rowView",function(e,n){t.go("dealer.customer.appointment.view",{dealerId:o.user.data.dealer._id,customerId:n.data.customer._id,appointmentId:n._id})})}]}),angular.forEach(l.resources,function(e,t){o.register(t,e.form,s.get(e.resource+"Provider"))}),n.register("customer",l.appUrl,{field:[{name:"customer",stateParam:"customerId"}],base:"dealer.customer.",tag:"customer"}),i.otherwise("/")}])}();