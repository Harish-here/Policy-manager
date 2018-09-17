<template>
  <div id='policy' class='fl w100'>
    <div class='fl w20 p5-10'>
        <div class='m-top-25 p2-4'>
            <button class='btn btn-info' @click="show('1')"><b>Create Grade Policy </b></button>
        </div>
        <div class='f16 m-top-10 m-bottom-10 p2-4' ><b>List of Policy</b></div>
        <ul id='sideList' class='cursor'>
            <li class='p10-20 al-left br-gray' v-for='i in policyBundleData' @click="getPolicyBundle(i.value)" :class='{"active-list" : i.value == activeListId}' :key='i.value' :id='"pol_"+i.value'><i class="fa fa-chevron-right f10" aria-hidden="true"></i> {{i.label}}</li>
            <li class='p10-20 center gray' v-if='policyBundleData.length === 0' >No Policy Bundle</li>
        
        </ul>
    </div>
    <!-- <pre>{{copyHolder}}</pre> -->
    <div class='fl w80 p5-10' id='editPanel' v-if='showEdit'>
                <div class='fl p5-10'>
                    <ul id='create-box' class='fl p5-10 o-gray'>
                        <li class='fl p5-10 '>
                            <div class='pl-0' for='policyName'>Grade Policy Name</div>
                            <input placeholder="Name" id='policyName' class='p2-4 f14 black b6' v-model='policyBundleName' />
                        </li>
                        <li class='fl p5-10'>
                            <div class='pl-0' for='policyBundleCode'>Grade Policy Code</div>
                            <input id='policyBundleCode' class='p2-4 f14 black' v-model='policyBundleCode' />
                        </li>
                        <li class='fl p5-10'><br>
                            <div style='margin-top:3px;'>
                                <button class='btn btn-primary btn-sm' @click='sendEdit' :disabled='disableSave'>Save 
                                    <i v-if='disableSave' class="fa fa-spinner fa-spin" aria-hidden="true"></i>
                                </button>
                                <button class='btn btn-danger btn-sm' @click="deleteBundle(policyBundleId)" :disabled='disableSave'>Delete</button>
                                <button class='btn btn-default btn-sm' @click='showDetailss'>Back</button>
                            </div>
                            
                        </li>
                    </ul>
                </div>
                <div class='fl w100 p5-10'>
                    <ul id='tab_policy' class='fl w100 b6 center cursor'>
                        <li class='fl w20 p5-10' :class='{"br-active":activeTab === "Accomodation"}' @click='activeTab = "Accomodation"'>Accomodation</li>
                        <li class='fl w20 p5-10' :class='{"br-active":activeTab === "Allowance"}' @click='activeTab = "Allowance"'>Allowance</li>
                        <li class='fl w20 p5-10' :class='{"br-active":activeTab === "Conveyence"}' @click='activeTab = "Conveyence"'>Conveyence</li>
                        <li class='fl w20 p5-10' :class='{"br-active":activeTab === "Entertainment"}' @click='activeTab = "Entertainment"'>Entertainment</li>
                    </ul>
                </div>
                <div  v-for='(j,index) in policyBundle' class='fl w100 p5-10' :key='index' :class='{"dbNo":j.benefitTypeId.label !== activeTab}'>
                    <div class='panel panel-default fl w100' :id='index' >
                            <div class='panel-heading fl w100'>
                                <div class='panel-title w100'>
                                    <div :href="'#collapse'+j.benefitTypeId.value " class='fl w30 p5-10 f14'><b>{{ j.benefitTypeId.label }}</b></div>
                                    
                                        <!-- <select class='fr w10' v-model='copyHolder[index].priority'>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                            <option value='4'>4</option>
                                            <option value='5'>5</option>
                                        </select>
                                        <div class='fr p5-10 w15 al-right f12 b3'>Set Priority</div> -->
                                    </div>
                                </div>
                                <div :id="'collapse'+j.benefitTypeId.value" class='panel-collapse collapse in fl w100'>
                                        <div class='panel-body'>
                                                <div class='fl w40 p5-10'>
                                                    <div class='p5-10'>
                                                        <label class='b6'>Benefits <sup style='color:red;' v-if='copyHolder[index].cityCatAndAllowances.length > 0'>*</sup></label>
                                                        <div v-if='j.benefitTypeId.value != "3"'>
                                                            <v-select multiple v-model='copyHolder[index].benefits' :options='j.benefits'></v-select>
                                                        </div>
                                                        <div v-if='j.benefitTypeId.value == "3"' >
                                                            <select v-model='copyHolder[index].benefits' class='w100 benefit-acc'>
                                                                <option v-for='k in j.benefits' :value='k' :key='k.label'>{{ k.label}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class='p5-10'>
                                                        <label class='b6'>City Category
                                                            <sup v-if='j.benefitTypeId.value != "3" && copyHolder[index].benefits.length > 0' style='color:red;'>*</sup>
                                                            <sup v-if='j.benefitTypeId.value == "3" && copyHolder[index].benefits.hasOwnProperty("value")' style='color:red;'>*</sup>
                                                        </label>
                                                        <v-select multiple v-model='copyHolder[index].cityCatAndAllowances' :options='j.cityCatAndAllowances'></v-select>
                                                    </div>
                                                </div>
                                                <div class='fl w60 p5-10' v-if='copyHolder[index].cityCatAndAllowances.length > 0'>                                   
                                                    <table v-if='copyHolder[index].cityCatAndAllowances.length > 0' class='table'>
                                                        <thead>
                                                            <tr>
                                                                <th class='w20'>City Category</th>
                                                                <th class='w10 center'>Unlimited</th>
                                                                <th class='w25 center'>Price</th>
                                                                <th class='w25'>Excess</th>
                                                                <th class='w10 center'  v-if='j.benefitTypeId.label == "Accomodation"'>Star <sup style='color:red;'>*</sup> </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr  v-for='(i,ind) in copyHolder[index].cityCatAndAllowances' :id='i.value' :key='i.value'>
                                                            <td class='w20'>{{i.label}}</td>
                                                            <td class='w10 center'><input :id='i.value' v-model='i.limitSpent' type='checkbox' @change='reset(j.benefitTypeId.value,ind,index)' ></td><!-- @click='disableField(i.value)'-->
                                                            <td class='w25' style='padding:1px;'>
                                                            <div class='p2-4 fl w100'> 
                                                                <span class='fl w30 p2-4'> Min</span>
                                                                <input class='fl w70 al-right' :id='i.value' v-model='i.min'  type='number' :disabled='i.limitSpent'>
                                                            </div>
                                                            <div class='p2-4 fl w100'>
                                                                <span class='fl w30 p2-4'>Max </span>
                                                                <input class='fl w70 al-right'  :id='i.value'  v-model='i.max' :min='i.min' type='number' :disabled='i.limitSpent'>
                                                                <span v-if=' Number(i.max) < Number(i.min) ' class='fl red f10'>Should be more than {{i.min}}</span>
                                                            </div> 
                                                            </td>
                                                            <td class='w25 center'>
                                                                <div class=' fl w40 p2-4'>
                                                                    &nbsp;Flat
                                                                    <input v-model='i.flex' class='fl w25' name='type' type='radio' value='1' :disabled='i.limitSpent'>
                                                                </div>
                                                                <div class='fl w40 p2-4'>
                                                                    &nbsp;%
                                                                    <input v-model='i.flex' class='fl w25 ' type='radio' value='2'  name='type' :disabled='i.limitSpent'>
                                                                </div>
                                                                <div class='fl w80 p2-4'>
                                                                    <input v-model='i.flexAmt' class='fl w100 al-right' min='0' type='number' :disabled='i.limitSpent || i.flex == ""'>
                                                                </div>
                                                                
                                                            </td>
                                                            <td v-if='j.benefitTypeId.label == "Accomodation"' >
                                                            <select v-model='i.starCat' class='p2-4' style='width:50px;' :disabled='i.limitSpent'>
                                                                <option value='1'>1</option>
                                                                <option value='2'>2</option>
                                                                <option value='3'>3</option>
                                                                <option value='4'>4</option>
                                                                <option value='5'>5</option>
                                                            </select>
                                                            </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div class='fl w60 p10-20 center gray' v-else>
                                                    Add city category to configure policy {{j.benefitTypeId.label}}
                                                </div>    
                                                
                                                
                                        </div>
                                        
                                </div>
                            </div>
                    </div>
                </div>
      <!-- display the details of policy -->          
    <div class='fl w80 p5-10' id ='displayPanel' v-if='showDetails'>
            <div class='fl p5-10'>
                <ul id='create-box' class='fl p5-10 o-gray'>
                    <li class='fl p5-10'>
                        <div class='pl-0' for='policyName'>Grade Policy Name</div>
                        <input id='policyName' v-model='policyBundleName' class='p5-10 br-none bg-gray  f14 black b6' disabled/>
                    </li>
                    <li class='fl p5-10'>
                        <div class='pl-0' for='policyBundleCode'>Grade Policy Code</div>
                        <input id='policyBundleCode' v-model='policyBundleCode' class='p5-10 br-none bg-gray f14 black' disabled/>
                    </li>
                    <li class='fl p5-10'>
                        <br/>
                        <button style='margin-top:5px' class='btn btn-primary btn-sm' @click="show('3')"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</button>
                    </li>
                </ul>
            </div>
            <div class='fl w100 p5-10'>
                    <ul id='tab_policy' class='fl w100 b6 center cursor'>
                        <li class='fl w20 p5-10' :class='{"br-active":activeTab === "Accomodation"}' @click='activeTab = "Accomodation"'>Accomodation</li>
                        <li class='fl w20 p5-10' :class='{"br-active":activeTab === "Allowance"}' @click='activeTab = "Allowance"'>Allowance</li>
                        <li class='fl w20 p5-10' :class='{"br-active":activeTab === "Conveyence"}' @click='activeTab = "Conveyence"'>Conveyence</li>
                        <li class='fl w20 p5-10' :class='{"br-active":activeTab === "Entertainment"}' @click='activeTab = "Entertainment"'>Entertainment</li>
                    </ul>
            </div>
            <div class='fl w100 p5-10' v-for='(j,index) in displayHolder' :key='index' :class='{"dbNo":j.benefitTypeId.label !== activeTab}'>
                <div class='panel panel-default fl w100'  :id='index' >
                        <div class='panel-heading fl w100'>
                            <div class='panel-title fl w100'>
                                <div  class='fl w40 p5-10 f14'><b>{{ j.benefitTypeId.label }}</b></div>
                                <!-- <div class='fr w40 p5-10 f14 al-right b3'>
                                    Priority - 
                                    {{displayHolder[index].priority}}
                                </div> -->
                            </div>
                        </div>
                        <div class='panel-collapse collapse in fl w100'>
                            <div class='panel-body'>
                                    <div class='fl w20 p5-10' >
                                        <div class='f12 b6'>Benefits</div>
                                        <ul v-if='j.benefitTypeId.value != "3"'>
                                            <li v-for=' u in displayHolder[index].benefits' class='m-top-10 f12' :key='u.label'>{{u.label}}</li>
                                        </ul>
                                        <ul v-else>
                                            <li class='m-top-10 f12'>{{j.benefits.label}}</li>
                                        </ul>
                                    </div>
                                    <!--<div class='col-md-6'>
                                        <h4>City Category</h4>
                                        <ul class='list-inline'>
                                        <li v-for=' u in displayHolder[index].cityCatAndAllowances' class='list-inline-item'>{{u.label}}</li>
                                        </ul>
                                    </div> -->
                                    <div class='fl w80 p5-10' style='border-left:2px solid #ddd;'>    
                                        <table class='table'>
                                            <thead>
                                                <tr>
                                                    <th class='w20'>City Category</th>
                                                    <th class='w10 center'>Unlimited</th>
                                                    <th class='w20 center'> Price (Min - Max)</th>
                                                    <th class='w15 center'>Excess</th>
                                                    <th class='w10 center' v-if='j.benefitTypeId.label == "Accomodation"'>Star</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr  v-for='i in displayHolder[index].cityCatAndAllowances' :id='i.value' :key='i.value'>
                                                    <td class=''>{{i.label}}</td>
                                                    <td class='center'>{{ (i.limitSpent) ? 'Yes' : 'No' }}</td>
                                                    <td class='center'>{{ (!i.limitSpent) ? ('₹' + i.min) : '---' }} - {{ (!i.limitSpent) ? ('₹' + i.max) : '---'}}</td>
                                                    <td class='center'>{{ (!i.limitSpent) ? i.flexAmt : '---'}} {{ (!i.limitSpent) ?  (i.flex != 0) ? ( (i.flex==1) ? 'INR' : '%') :'' : '' }}</td>
                                                    <td class='center'  v-if='j.benefitTypeId.value == "3"'>{{ (i.limitSpent) ? "--" : i.starCat}}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                            </div>
                        </div>
                </div>
            </div>
    </div>
    <!-- <pre>{{ copyHolder }}</pre> -->
    <div class='fl w80 p5-10 center'  v-if='showDetails'>
        {{ (displayHolder !== null && displayHolder.map(x => x.benefitTypeId.label).includes(activeTab)) ? "" : `No ${activeTab} Policy Available` }}
    </div>

    <transition name='fade'>
        <div id='createPanel'  class='fl w80 p5-10' v-if='createPanelShow'>
            <List @refresh='getList'/>
        </div>
    </transition>  
    
 </div> 
   
     
 
</template>

<script>
import Vue from 'vue'
import List from '@/components/List'
import api from '../utility/api'

Vue.component('List', List);
export default {
  name: 'Edit',
  data(){
      return {
           policyBundleHolder : null,
           policyBundleData : [],
           policyBundleCode : null,
           policyBundleName : null,
           policyBundle : null,
           policyBundleId : null,
           copyHolder:[],
           displayHolder : [],
           showDetails : false,
           createPanelShow : true,
           showEdit : false,
           disableSave: false,
           activeTab:"Accomodation",
           activeListId: "",
      }
  },

  components : { List },
  computed : {
      sample(){
          const self = this;
          if(self.policyBundle !== null && self.displayHolder.length > 0){
                //  return  self.policyBundle.map(function(obj){
                //                 for(var t= 0;t<self.displayHolder.length;t++){
                //                     if(self.displayHolder[t].benefitTypeId.value == obj.benefitTypeId.value){
                //                         return self.displayHolder[t];
                //                     }else{
                //                         return {
                //                             "benefitTypeId": {
                //                                     "label": obj.benefitTypeId.label,
                //                                     "value": obj.benefitTypeId.value
                //                                 },
                //                                 "priority": "",
                //                                 "benefits": [],
                //                                 "cityCatAndAllowances" :[]
                //                         };
                //                     }
                //                 }
                //             });
                return self.policyBundle.map(function(obj){
                    var find = self.displayHolder.find(function(x){ return x.benefitTypeId.value === obj.benefitTypeId.value;})
                    if(find !== undefined){
                        return find;
                    }else{
                         return {
                                            "benefitTypeId": {
                                                    "label": obj.benefitTypeId.label,
                                                    "value": obj.benefitTypeId.value
                                                },
                                                "priority": "",
                                                "benefits": [],
                                                "cityCatAndAllowances" :[]
                                        };
                    }
                });       
                            
            }

      }
  },
  methods:{
      show : function(num){
          const self = this;
          switch(num){
              case '1' : self.createPanelShow = true;self.showEdit =false;self.showDetails = false;break;
              case '2' : self.createPanelShow = false;self.showEdit =false;self.showDetails = true;break;
              case '3' : self.createPanelShow = false;self.showEdit =true;self.showDetails = false;break;
          }
      },
      returnYN : function(s){
          return (s.toString().indexOf('f') === 0) ? 'No' : 'Yes';
      },
      shows : function(){
        if(api.production){
          setProgress(3);
        }
      },
       fade: function(id,sec){
        var t = sec * 1000;
        $('#'+id).fadeIn();
        setTimeout(function(){
          $('#'+id).fadeOut()
        },t)
        },
        siwtchTab: function(id){
            $('#sideList li').removeClass('act');
            $('#sideList li#'+id).addClass('act');

        },
      getList : function(id){
          const self = this;
            $.post(api.listPolicyBundle,{'companyId' : api.companyId }).done(function(res){
                self.createPanelShow = true;
                self.policyBundleData = JSON.parse(res)
            });
      },

      showDetailss: function(){
          const self = this;
          self.showEdit = false;
          self.showDetails = true;
      },

      getPolicyBundle : function(id){
            const self = this;
            self.activeListId = id;
            self.createPanelShow = false;
            self.siwtchTab(id);
            let h;
            self.showEdit = false;
            self.shows()
            if(self.policyBundleHolder != ''){
                    $.post(api.getPolicyBundle,{'benefitBundleId' : id}) 
                    .done(function(response){
                        h = JSON.parse(response);
                         //self.copyHolder = h.policybundles;
                        
                            $.post(api.getModelPolicyBundle,{'companyId' : api.companyId }).done(function(dat){
                                
                             let j = JSON.parse(dat);
                            // console.log(j)
                             h.policybundles.map(function(y){
                                 if(y.benefitTypeId.value == '3'){
                                     let temp = y.benefits[0];
                                     y.benefits = {...temp};
                                 }
                                 if(y.hasOwnProperty('y.cityCatAndAllowances') && y.cityCatAndAllowances.length > 0){
                                     y.cityCatAndAllowances.map(function(r){
                                        //   r['limitSpent'] = Boolean(r['limitSpent']);
                                        if(r['limitSpent'] == 'true'){
                                            r['limitSpent'] = true;
                                        }else{
                                            r['limitSpent'] = false;
                                        }
                                        
                                     });
                                 }
                             });
                             self.displayHolder = JSON.parse(JSON.stringify(h.policybundles));//saved data
                            //  console.log(h.policybundles)
                             //parent data
                             self.policyBundle = JSON.parse(JSON.stringify(j.policybundles));
                           /* self.copyHolder = j.policybundles.map(function(obj){
                                for(var t = 0;t<self.displayHolder.length;t++){
                                    if(self.displayHolder[t].benefitTypeId.value == obj.benefitTypeId.value){
                                        return self.displayHolder[t];
                                    }else{
                                        return {
                                            "benefitTypeId": {
                                                    "label": obj.benefitTypeId.label,
                                                    "value": obj.benefitTypeId.value
                                                },
                                                "priority": "",
                                                "benefits": [],
                                                "cityCatAndAllowances" :[]
                                        };
                                    }
                                }
                            }); */
                           let copyTemp =  j.policybundles.map(function(obj){
                                var find = self.displayHolder.find(function(x){ return x.benefitTypeId.value === obj.benefitTypeId.value;})
                                if(find !== undefined){
                                    return find;
                                }else{
                                    return {
                                                        "benefitTypeId": {
                                                                "label": obj.benefitTypeId.label,
                                                                "value": obj.benefitTypeId.value
                                                            },
                                                            "priority": "",
                                                            "benefits": [],
                                                            "cityCatAndAllowances" :[]
                                                    };
                                }
                            });
                            self.copyHolder = JSON.parse(JSON.stringify(copyTemp));
                             self.policyBundleName = h.bundleName;
                            self.policyBundleCode = h.bundleCode;
                            self.policyBundleId = h.benefitBundleId;
                            self.showDetails = true;
                            });
                            
                        
                        
                    });
                    
                    
            }else{
                alert('Select a policy Bundle')
            }
      },
      reset: function(val,label,index){   
     //    this to reset the 
     
         var o = this.copyHolder[index].cityCatAndAllowances[label];
         if(!o.limitSpent){
             o.max = 0 ;
            o.min = 0;
            o.flex = "1";
            o.flexAmt = 0;
            if(val == '3'){
                o.starCat = '';
            }
            
         }else{
            o.max = '' ;
            o.min = '';
            o.flex = "";
            o.flexAmt = '';
            if(val == '3'){
                o.starCat = '';
            }
         }
         
      },
      sendEdit : function(){
          const self = this;
          let dos =true;
          self.disableSave = true;
          const has = Object.hasOwnProperty;
          
          const dataToSend = {
              "benefitBundleId" : self.policyBundleId,
              "bundleName" : self.policyBundleName,
              "bundleCode" : self.policyBundleCode,
              "companyId" : api.companyId ,
              "methType" : "edit",
              "policybundles" : self.copyHolder.filter(function(x){
                  return (x.benefits.hasOwnProperty('value') || x.benefits.length > 0 || x.cityCatAndAllowances.length > 0) 
              })
          };
        //   var d = dataToSend.policybundles;
        //   //check for the citycaetgory = 0 and benefit bundle = 0 what if nothing selected
        //   for(var c=0;c<d.length;c++){
        //       if(d[c].benefits.length > 1 && d[c].cityCatAndAllowances.length === 0){
        //           alert('Atleast one City category need to be in '+d[c].benefitTypeId.label);
        //           return;
        //       }
        //   }
          
          if(self.policyBundleName != '' && self.policyBundleCode != ''){
                //check for the citycaetgory = 0 and benefit bundle = 0 what if nothing selected
                  var d = dataToSend.policybundles;
                    ///hack for multi select to single select
                    let ind = d.findIndex(x => x.benefitTypeId.value == '3');
                    if(ind >= 0){
                        let temp = (d[ind].benefits.hasOwnProperty('value')) ? [d[ind].benefits] : [];
                        d[ind].benefits =  JSON.parse(JSON.stringify(temp));
                        // console.log(JSON.parse(JSON.stringify(temp)))
                    }
                    //check for the citycaetgory = 0 and benefit bundle = 0 what if nothing selected
                    for(var c=0;c < d.length; c++){
                        
                        if(d[c].benefits.length > 0 && d[c].cityCatAndAllowances.length === 0){
                                if(d[c].benefitTypeId.value == '3'){
                                    let temp = d[c].benefits[0];
                                    d[c].benefits = JSON.parse(JSON.stringify(temp));
                                }
                            alert('At least one City Category must be selected in '+d[c].benefitTypeId.label);
                            self.disableSave = false;
                            return;
                        }
                        if(d[c].benefits.length == 0 && d[c].cityCatAndAllowances.length > 0){
                            alert('At least one Benefit must be selected in '+d[c].benefitTypeId.label);
                            self.disableSave = false;
                            return;
                        }

                        if(d[c].benefitTypeId.value == '3' && d[c].cityCatAndAllowances.length > 0){
                            //that is the value of accomadation
                            for(var t=0;t < d[c].cityCatAndAllowances.length;t++){
                                var p = d[c].cityCatAndAllowances ;
                                
                                if(!p[t].limitSpent && p[t].starCat == ''){
                                    alert('Star need to mentioned in City category');
                                        self.disableSave = false;
                                        return;
                                }
                            }
                            
                        }
                        
                        // to check max and min
                        if(d[c].cityCatAndAllowances.length > 0){
                            //that is the value of accomadation
                            for(let t=0;t < d[c].cityCatAndAllowances.length;t++){
                                let p = d[c].cityCatAndAllowances ;
                                
                                if(!p[t].limitSpent && (Number(p[t].min) >= Number(p[t].max))){
                                    alert('Maximum amount should be greater than Minmum amount');
                                        self.disableSave = false;
                                        return;
                                }
                            }
                            
                        }                        
                    }



              if(dataToSend.policybundles.length > 0){
             // Bundle
             self.shows()
            $.post(api.updatePolicyBundle,(api.production) ? dataToSend : JSON.stringify(dataToSend)).done(function(data){
                 $.post(api.listPolicyBundle,{'companyId' : api.companyId }).done(function(res){//get refreshed bundle
                    self.policyBundleData = JSON.parse(res)
                    self.policyBundleHolder = null;
                    self.showDetails = false;
                    var dd = data.toString().split('|');
                    if(dd[0].indexOf('T') === 0){
                            self.$store.commit('showAlert','s|Policy Bundle updated successfully..!');
                            
                        }else{
                            self.$store.commit('showAlert','o|'+dd[1]);
                            
                        }
                        self.show('2');
                        self.disableSave = false;
            });
            });
            }else{
                alert('atleast one city category or bundle has to be there');
                self.disableSave = false;
            }
              
        }else{
            alert("Name and Code is required")
            self.disableSave = false;
        }

      },
      deleteBundle : function(id){
          var self = this;
          
          if(confirm("Are you sure you want to delete this Policy ?")){
              self.shows();
              self.disableSave = true;
              $.post(api.deletePolicyBundle,{ benefitBundleId : id }).done(function(data){
              
                  $.post(api.listPolicyBundle,{'companyId' : api.companyId }).done(function(res){
                        self.showEdit = false;
                        self.policyBundleData = JSON.parse(res)
                        var dd = data.toString().split('|');
                        if(dd[0].indexOf('T') === 0){
                            self.$store.commit('showAlert','d|Policy Bundle deleted successfully..!');
                        }else{
                           // self.$store.commit('showAlert','o|'+dd[1]); temporary move to show case delete msg
                            self.$store.commit('showAlert','d|Policy Bundle deleted successfully..!');
                        }
                        self.show('1');
                        self.disableSave = false;
                    });
              
          });
          }
          
      },
      
  },
  created(){
      const self = this;
      self.shows()
    $.post(api.listPolicyBundle,{'companyId' : api.companyId }).done(function(res){
        self.policyBundleData = JSON.parse(res)
    });

  }
}
</script>

<style>
.form-control{
  border-radius : 0px;
}
table{
    font-size : 12px;
}
.list-group-item:hover{
  background-color : #ddd;
  cursor : pointer;
  font-size : 15px;
}
.panel {
    margin-bottom: 20px;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 1px;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    border-image: initial;
    height: auto !important;
}
.panel-default {
    border-color: rgb(221, 221, 221);
    border:1px solid #ddd !important
}
.panel-heading{
    background-color:#ddd;
    padding : 5px 10px !important;
    height : auto !important;
}
.cursor li:hover{
    background-color:#f7f7f7;
    border: 1px solid #ddd;
}
.cursor li{
    border: 1px solid #ddd;
    margin: 2px 2px;
    border-radius: 2px;
}
.act{
   background-color:#f7f7f7;
    border: 1px solid #ddd;  
}
.br-active{
    border-bottom: 3px solid #1A73E8;
    color:#1A73E8 !important;
}
#sideList{
height: 400px;
overflow-y: auto;
overflow-x: hidden;
}
#create-box> li > input{
    width:175px;
}

#create-box{
    border: 1px solid aliceblue;
    background-color: aliceblue;
    border-radius: 5px;
}
.benefit-acc{
    padding: 5px;
    border:  1px solid #cdcdcd;
}
.active-List{
    background-color: #1a73e8bf !important;
    color:#fff !important;
}

sup{
    top:0;
    font-size: 18px;
}

</style>
