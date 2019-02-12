<template>
  <div id='policy' class='fl w100'>
    <div class='fl br-right' style='width:16%;height:100%;background:ghostwhite;'>
        <div class='menu-heads'>Travel Policy</div>
        <ul id='sidemenu'>
            <li @click='show("1")' class='centering' :class='{"act-": !showCity}'>
                <span class='center'>
                    Travel Policy
                </span>
            </li>
            
        </ul>
        <div class='menu-heads'>City Group</div>
        <ul id='sidemenu'>
            <li @click='show("4")' class='centering' :class='{"act-": showCity}'>
                 <span class='center'>
                    
                    City Group
                </span>
            </li>
        </ul>
    </div>
    <!-- show display or edit -->
    <div v-if='!showCity'>
        <div class='fl p-15-top pa-lr br-right' style='width:30%;'>
            <!-- <div class='m-top-25 p2-4'>
                <button class='btn btn-info' @click="show('1')"><b>Create Grade Policy </b></button>
            </div> -->
            <div class='roboto black mb25' style='font-size:18px;'>Travel Policy</div>
            <div class='centering mb25' style='' @click="show('1')">Add Travel Policy</div>
            <div class='f14 p2-4 b6 br-btm flex justify-between align-baseline' >
                <span>List of Policies <span class='badge badge-primary'>{{policyBundleData.length}}</span></span>
                <input type='text' style='height:24px;font-weight:400;border-radius:2px;padding:5px;' placeholder="Search policies" v-model='SearchString' />
            </div>
            
            <ul id='sideList' class=''>
                <!-- <li class='p10-20 center act-' v-if='policyBundleData.length === 0' >Add policy</li> -->
                <li class='p10-20' style='overflow:hidden' v-for='i in MainList' 
                   :class='{"active-list" : i.value == activeListId,"al-left": i.value != activeListId,"opa" :i.label === "Master Admin"}' :key='i.value'>
                   <div class='flex items-center'>
                    <div class='w75 cursor' @click="getPolicyBundle(i.value,'view')" style='overflow-wrap: break-word;'> {{i.label}}</div>
                    <div class='w25 al-right'>
                       <span v-if='i.label !== "Master Admin"' class="btn btn-default btn-xs action-btn" @click='getPolicyBundle(i.value,"edit")'><i class="fa fa-pencil" aria-hidden="true"></i></span>
                       <span class="btn btn-default btn-xs action-btn" @click="getPolicyBundle(i.value,'view')"><i class="fa fa-eye" aria-hidden="true"></i></span>
                   </div>
                   </div>
                </li>
                <li class='p10-20 center' v-if='MainList.length === 0' >No Travel Policy</li>
            
            </ul>
        </div>
        <div class='fl w50 p-15-top pa-lr br-right' id='editPanel' v-if='showEdit'>
                    <div class='fl p5-10'>
                        <ul id='create-box' class='fl o-gray mb20'>
                            <li class='fl w100 b6 black mb20' style='padding-left:5px;'>
                                <div class='fl w50' v-if='policyBundleName !== null && policyBundleName.length > 0'>Travel Policy Configuration</div>
                                <div class='fl w50 f16' v-else>{{policyBundleName}}<small> - (code: {{policyBundleCode}})</small></div>
                                <div class='fr w50 al-right'>
                                    <button class='btn btn-primary btn-xs' @click='sendEdit' :disabled='disableSave'>
                                        <i class="fa fa-floppy-o" aria-hidden="true"></i>
                                        Save
                                        <!-- <i v-if='disableSave' class="fa fa-spinner fa-spin" aria-hidden="true"></i> -->
                                    </button>
                                    <button class='btn btn-danger btn-xs' @click="deleteBundle(policyBundleId)" :disabled='disableSave'>
                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                        Delete
                                    </button>
                                    <!-- <button class='btn btn-default btn-xs' @click='show("1")' :disabled='disableSave'>
                                        <i class="fa fa-chevron-left" aria-hidden="true"></i>
                                        Back
                                    </button> -->
                                </div>                                
                            </li>
                            <li class='fl w50 p5-10 '>
                                <div class='' for='policyName'> Name <sup class='b6'>*</sup></div>
                                <input placeholder="Name" id='policyName' class='pa10 f14 black b6' v-model='policyBundleName' />
                            </li>
                            <li class='fl w50 p5-10'>
                                <div class='' for='policyBundleCode'>Code <sup class='b6'>*</sup></div>
                                <input id='policyBundleCode' class='pa10 f14 black' v-model='policyBundleCode' />
                            </li>
                            
                        </ul>
                    </div>
                    <div class='fl w100 p5-10'>
                        <ul id='tab_policy' class='fl w100 b6 center cursor'>
                            <li class='fl w50 p5-10' :class='{"br-active":activeTab === "Accomodation"}' @click='activeTab = "Accomodation"'>Accomodation</li>
                            <li class='fl w50 p5-10' :class='{"br-active":activeTab === "Allowance"}' @click='activeTab = "Allowance"'>Allowance</li>
                            <!-- <li class='fl w20 p5-10' :class='{"br-active":activeTab === "Conveyance"}' @click='activeTab = "Conveyance"'>Conveyance</li>
                            <li class='fl w20 p5-10' :class='{"br-active":activeTab === "Entertainment"}' @click='activeTab = "Entertainment"'>Entertainment</li> -->
                        </ul>
                    </div>
                    <div  v-for='(j,index) in policyBundle' class='fl w100 p5-10' :key='index' :class='{"dbNo":j.benefitTypeId.label !== activeTab}'>
                        <div class='panel panel-default fl w100' :id='index' >
                                <!-- <div class='panel-heading fl w100'>
                                     <div class='panel-title w100'>
                                        <div :href="'#collapse'+j.benefitTypeId.value " class='fl w30 p5-10 f14'>{{ j.benefitTypeId.label }}</div>
                                        
                                        </div>
                                    </div> --> 
                                    <div :id="'collapse'+j.benefitTypeId.value" class='panel-collapse collapse in fl w100'>
                                            <div class='panel-body'>
                                                    <div class='fl w70'>
                                                        <div class='pa10'>
                                                            <label class='b6'>Benefits 
                                                                <!-- <sup style='color:red;' v-if='copyHolder[index].cityCatAndAllowances.length > 0'>*</sup> -->
                                                            </label>
                                                            <div v-if='j.benefitTypeId.value != "3"'>
                                                                <v-select maxHeight='250px' multiple v-model='copyHolder[index].benefits' :options='j.benefits'></v-select>
                                                            </div>
                                                            <div v-if='j.benefitTypeId.value == "3"' >
                                                                <!-- <select v-model='singleSelect' class='w100 benefit-acc'>
                                                                    <option v-for='k in j.benefits' :value='k' :key='k.label'>{{ k.label}}</option>
                                                                </select> -->
                                                                <v-select maxHeight='250px' v-model='singleSelect' :options='j.benefits'></v-select>
                                                            </div>
                                                        </div>
                                                        <div class='pa10'>
                                                            <label class='b6'>City Group
                                                                <!-- <sup v-if='j.benefitTypeId.value != "3" && copyHolder[index].benefits.length > 0' style='color:red;'>*</sup>
                                                                <sup v-if='j.benefitTypeId.value == "3" && copyHolder[index].benefits.hasOwnProperty("value")' style='color:red;'>*</sup> -->
                                                            </label>
                                            <v-select maxHeight='250px' v-if='j.benefitTypeId.value == "3"' multiple v-model='copyHolder[index].cityCatAndAllowances' :options='j.cityCatAndAllowances.filter(x => x.label !== "Master Category")'></v-select>
                                            <!--this is to make the option for other policies from accomodation -->
                                            <v-select maxHeight='250px' v-else multiple v-model='copyHolder[index].cityCatAndAllowances' :options='j.cityCatAndAllowances.filter(y => CityCat.indexOf(y.value) > -1)'></v-select>
                                                        </div>
                                                    </div>
                                                    <div class='fl w100 p5-10' v-if='copyHolder[index].cityCatAndAllowances.length > 0'>                                   
                                                        <table v-if='copyHolder[index].cityCatAndAllowances.length > 0' class='table'>
                                                            <thead>
                                                                <tr v-if='j.benefitTypeId.value == "3"'>
                                                                    <th class='w25'>City Group</th>
                                                                    <th class='w15 center'>Unlimited</th>
                                                                    <th class='w10 center'>Star <sup style='color:red;'>*</sup> </th>
                                                                    <th class='w20 center'>Price</th>
                                                                    <th class='w20'>Excess</th>
                                                                    
                                                                </tr>
                                                                <tr v-else>
                                                                    <th class='w20'>City Group</th>
                                                                    <th class='w10 center'>Unlimited</th>
                                                                    <th class='w25 center'>Entitlement Per Day</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody v-if='j.benefitTypeId.value == "3"'>
                                                                <tr  v-for='(i,ind) in copyHolder[index].cityCatAndAllowances' :id='i.value' :key='i.value'>
                                                                    <td class='w20'>{{i.label}}</td>
                                                                    <td class='w10 center'><input :id='i.value' v-model='i.limitSpent' type='checkbox' @change='reset(j.benefitTypeId.value,ind,index)' ></td><!-- @click='disableField(i.value)'-->
                                                                    <td v-if='j.benefitTypeId.label == "Accomodation"' >
                                                                        <select v-model='i.starCat' class='p2-4' style='width:75px;'>
                                                                            <option value='0' disabled></option>
                                                                            <option value='1'>1</option>
                                                                            <option value='2'>Upto 2</option>
                                                                            <option value='3'>Upto 3</option>
                                                                            <option value='4'>Upto 4</option>
                                                                            <option value='5'>Upto 5</option>
                                                                        </select>
                                                                    </td>                                                                    
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
                                                                            <input v-model='i.flex' class='fl w25' type='radio' value='1' :name='"type_"+ind+j.benefitTypeId.value+i.label' :disabled='i.limitSpent'>
                                                                        </div>
                                                                        <div class='fl w40 p2-4'>
                                                                            &nbsp;%
                                                                            <input v-model='i.flex' class='fl w25 ' type='radio' value='2'  :name='"type_"+ind+j.benefitTypeId.value+i.label' :disabled='i.limitSpent'>
                                                                        </div>
                                                                        <div class='fl w80 p2-4'>
                                                                            <input v-model='i.flexAmt' class='fl w100 al-right' min='0' type='number' :disabled='i.limitSpent'>
                                                                        </div>
                                                                        
                                                                    </td>

                                                                </tr>
                                                            </tbody>
                                                            <tbody v-else>
                                                                <tr  v-for='i in copyHolder[index].cityCatAndAllowances' :id='i.value' :key='i.value'>
                                                                    <td class='w20'>{{i.label}}</td>
                                                                    <td class='w10 center'>
                                                                        <input :id='i.value' v-model='i.limitSpent' type='checkbox'>
                                                                    </td><!-- @click='disableField(i.value)'-->
                                                                    <td class='w25' style='padding:1px;'>
                                                                        <div class='p2-4 fl w100 center'>
                                                                            <span class='fl w30 p2-4'> </span>
                                                                            <input class='fl w70 p2-4'  :id='i.value' :value='i.limitSpent'  v-model='i.max'  type='number' :disabled='i.limitSpent'>
                                                                        </div> 
                                                                    </td>
                                                                </tr>
                                                            </tbody>                                                        
                                                        </table>
                                                    </div>
                                                    <div class='fl w60 p10-20 center gray' v-else>
                                                      Please ensure City groups are configured before proceed with {{j.benefitTypeId.label}} Policy
                                                    </div>    
                                                    
                                                    
                                            </div>
                                            
                                    </div>
                                </div>
                        </div>
                    </div>
        <!-- display the details of policy -->          
        <div class='fl w50 p-15-top pa-lr br-right' id ='displayPanel' v-if='showDetails'>
                <div class='fl w100 p5-10'>
                    <ul id='create-box' class='fl w100 o-gray'>
                        <li class='fl w100 b6 f16 mb20' style='padding-left:5px;'>{{policyBundleName}}<small> - (code: {{policyBundleCode}})</small></li>
                        <!-- <li class='fl w50 p5-10'>
                            <div class='' for='policyName'>Name</div>
                            <input id='policyName' v-model='policyBundleName' class='p5-10 br-none bg-gray  f14 black b6' disabled/>
                        </li>
                        <li class='fl w50 p5-10'>
                            <div class='' for='policyBundleCode'> Code</div>
                            <input id='policyBundleCode' v-model='policyBundleCode' class='p5-10 br-none bg-gray f14 black' disabled/>
                        </li> -->
                        <!-- <li class='fl w100 p5-10'>
                            <br/>
                            <button style='margin-top:5px' class='btn btn-primary btn-xs' :disabled='policyBundleName === "Master Admin"' @click="show('3')"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</button>
                            <button style='margin-top:5px' class='btn btn-default btn-xs' @click="show('1')"><i class="fa fa-chevron-left" aria-hidden="true"></i> Back</button>
                        </li> -->
                    </ul>
                </div>
                <div class='fl w100 p5-10'>
                        <ul id='tab_policy' class='fl w100 b6 center'>
                            <li class='fl w50 p5-10' :class='{"br-active":activeTab === "Accomodation"}' @click='activeTab = "Accomodation"'>Accomodation</li>
                            <li class='fl w50 p5-10' :class='{"br-active":activeTab === "Allowance"}' @click='activeTab = "Allowance"'>Allowance</li>
                            <!-- <li class='fl w20 p5-10' :class='{"br-active":activeTab === "Conveyance"}' @click='activeTab = "Conveyance"'>Conveyance</li>
                            <li class='fl w20 p5-10' :class='{"br-active":activeTab === "Entertainment"}' @click='activeTab = "Entertainment"'>Entertainment</li> -->
                        </ul>
                </div>
                <div class='fl w100 p5-10' v-for='(j,index) in displayHolder' :key='index' :class='{"dbNo":j.benefitTypeId.label !== activeTab}'>
                    <div class='panel panel-default fl w100'  :id='index' >
                            <div class='panel-heading fl w100 mb20'>
                                <div class='panel-title fl w100'>
                                    <!-- <div class='fl p5-10 f14'>
                                        {{ j.benefitTypeId.label }}
                                    </div> -->
                                    <!-- <div class='fr w40 p5-10 f14 al-right b3'>
                                        Priority - 
                                        {{displayHolder[index].priority}}
                                    </div> -->
                                    <div class='fl p5-10'>
                                        <ul class='flex' v-if='displayHolder[index].benefits.length > 0'>
                                                    <li v-for=' u in displayHolder[index].benefits' :key='u.label'>{{u.label}} <i class="fa fa-check-circle" aria-hidden="true"></i></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class='panel-collapse collapse in fl w100'>
                                <div class='panel-body'>
                                        <!-- <div class='fl w20 p5-10' >
                                            <div class='f12 b6'>Benefits</div>
                                            
                                            <ul>
                                                <li class='m-top-10 centet f12'>No Benefits Selected</li>
                                            </ul>
                                        </div> -->
                                        <!--<div class='col-md-6'>
                                            <h4>City Category</h4>
                                            <ul class='list-inline'>
                                            <li v-for=' u in displayHolder[index].cityCatAndAllowances' class='list-inline-item'>{{u.label}}</li>
                                            </ul>
                                        </div> -->
                                        <div class='fl w100 p5-10'>    
                                            <table class='table' v-if='displayHolder[index].cityCatAndAllowances.length > 0'>
                                                <thead>
                                                    <tr v-if='j.benefitTypeId.value == "3"'>
                                                        <th class='w25'>City Group</th>
                                                        <th class='w15 center'>Unlimited</th>
                                                        <th class='w10 center' >Star</th>
                                                        <th class='w15 center'> Price (Min - Max)</th>
                                                        <th class='w10 center'>Excess</th>
                                                        
                                                    </tr>
                                                    <tr v-else>
                                                        <th class='w20'>City Group</th>
                                                        <th class='w10 center'>Unlimited</th>
                                                        <th class='w25 center'>Entitlement Per Day</th>
                                                    </tr>
                                                </thead>
                                                <tbody v-if='j.benefitTypeId.value == "3"'>
                                                    <tr  v-for='i in displayHolder[index].cityCatAndAllowances' :id='i.value' :key='i.value'>
                                                        <td class=''>{{i.label}}</td>
                                                        <td class='center'>{{ (i.limitSpent) ? 'Yes' : 'No' }}</td>
                                                        <td class='center'  v-if='j.benefitTypeId.value == "3" && Number(i.starCat) !== 0'>{{ ((Number(i.starCat) > 1) ? 'upto ' + i.starCat : i.starCat)}}</td>
                                                        <td class='center'  v-if='j.benefitTypeId.value == "3" && Number(i.starCat) == 0'>---</td>
                                                        <td class='center' v-if="!i.limitSpent"><span v-money>{{ i.min }}</span> - <span v-money>{{ i.max }}</span></td>
                                                        <td class="center" v-else> -- - --</td>
                                                        <td class='center' v-if='i.flex != "1"'>{{ (!i.limitSpent) ? ((i.flex == '1') ? '' : '') + i.flexAmt + ((i.flex == '2') ? '%' : '') : '---'}}</td>
                                                        <td class="center"  v-if='i.flex == "1"'>₹{{ i.flexAmt }}</td>
                                                    </tr>
                                                </tbody>
                                                <tbody v-else>
                                                    <tr  v-for='i in displayHolder[index].cityCatAndAllowances' :id='i.value' :key='i.value'>
                                                        <td class=''>{{i.label}}</td>
                                                        <td class='center'>{{ (i.limitSpent) ? 'Yes' : 'No' }}</td>
                                                        <td class='center cur' v-if='!i.limitSpent' v-money>{{ i.max }}</td>
                                                        <td class="center" v-else>---</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div class='fl w100 p5-10 center gray' v-else>
                                                No City Group Selected
                                            </div>
                                        </div>
                                </div>
                            </div>
                    </div>
                </div>
        </div>
        <div class='fl w50  center'  v-if='showDetails'>
            {{ (displayHolder !== null && displayHolder.map(x => x.benefitTypeId.label).includes(activeTab)) ? "" : `No ${activeTab} Policy Available` }}
        </div>
    </div>
    <!--Create panel -->
    <div id='createPanel'  class='fl w50 p-15-top pa-lr' v-if='createPanelShow && !showCity'>
        <List @refresh='getList' :getFresh='toRefresh' @doneRefresh='resetFresh'/>
    </div>
    <!-- City Group -->
    <div class='fl w80' v-if='showCity'>
        <Add/>
    </div>
    

    
 </div> 
   
     
 
</template>

<script>
import Vue from 'vue'
import List from '@/components/List'
import api from '../utility/api'
import Add from '@/components/Add'

Vue.component('List', List);
export default {
  name: 'Edit',
  props : {
      toRefresh :{
          type: Boolean,
          default: false
      }
  },

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
           singleSelect: '',
           showCity: false,
           SearchString: ''
      }
  },
  directives: {
    money:{
      inserted:function(el){
        var str = el.innerHTML;
        var output,
            decm = "";
        if(str.includes('.')){
          decm ='.' + str.split('.')[1];
          str = str.split('.')[0];
        }
          if( !isNaN(str) && str.toString().length >= 4 ){
            output = str.split('').reverse().map((x,i)=>{
              if(i >1 && i%2 !== 0){
                return  x  + ','
              }else{
                return x
              }
            }).reverse().join('');
          }else{
            output = str
          }
          el.innerHTML = '₹' + output + decm;
        }
    }
  },
  components : { List, Add },
  computed : {
      MainList(){
          const self = this;
         if(this.SearchString.length > 0){
             return this.policyBundleData.filter(x =>{
                 return x.label.toLowerCase().includes(self.SearchString.toLowerCase())
             });
         }else{
             return this.policyBundleData
         }
     },
      CityCat(){
         //this is hold the selecetd city category of the accomodtion
         return this.copyHolder
         .find(x => x.benefitTypeId.value == '3')
         .cityCatAndAllowances
         .map(y => y.value)
      }
  },
  
 watch : {
    //  showCity:function(val){
    //      if(val){
    //          this.CreateHistory('policy');
    //      }else{
    //          this.CreateHistory('city');
    //      }
    //  },
     singleSelect : function(val){
        //  console.log(val);
         for(let r= 0;r< this.copyHolder.length;r++){
             let o = this.copyHolder;
             if(o[r].benefitTypeId.value == '3' && o[r].benefits.length > 0){
                 o[r].benefits=[];
                 o[r].benefits.push(val)
             }
             if(o[r].benefitTypeId.value == '3' && o[r].benefits.length == 0){
                 o[r].benefits.push(val)
             }
         }

        for(let r= 0;r< this.displayHolder.length;r++){
             let o = this.displayHolder;
             if(o[r].benefitTypeId.value == '3' && o[r].benefits.length > 0){
                 o[r].benefits= [];
                 o[r].benefits.push(val)
             }
             if(o[r].benefitTypeId.value == '3' && o[r].benefits.length == 0){
                 o[r].benefits.push(val)
             }
         }
     },
   toRefresh: function(val){
        //   console.log(val);
          if(val){
              //set the value to true and emit the event


              
          }
      }
 },

  methods:{
      show : function(num){
          const self = this;
          switch(num){
              case '1' : self.createPanelShow = true;self.showEdit =false;self.showDetails = false;self.activeListId ='';self.showCity = false;self.CreateHistory('grade');break;
              case '2' : self.createPanelShow = false;self.showEdit =false;self.showDetails = true;self.showCity = false;break;
              case '3' : self.createPanelShow = false;self.showEdit =true;self.showDetails = false;self.showCity = false;break;
              case '4' : self.createPanelShow = false;self.showEdit = false;self.showDetails = false;self.showCity = true;self.CreateHistory('city');break;
          }
      },
      returnYN : function(s){
          return (s.toString().indexOf('f') === 0) ? 'No' : 'Yes';
      },
      resetFresh: function(){
          this.$emit('refreshDone');//runs when child inform that it done refreshing and it inform to its parent
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

      getPolicyBundle : function(id,type){
            const self = this;
            self.activeTab = "Accomodation";
            self.activeListId = id;
            self.createPanelShow = false;
            self.siwtchTab(id);
            let h;
            self.showEdit = false;
            self.showDetails = false;
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
                                 
                                 if(y.cityCatAndAllowances.length > 0){
                                     y.cityCatAndAllowances.map(function(r){
                                        //   r['limitSpent'] = Boolean(r['limitSpent']);
                                        if(r['limitSpent'] == 'true'){
                                            
                                            r.limitSpent = true;
                                            r.min = r.min || 0;
                                            r.max = r.max || 0;
                                            r.flex = r.flex || "1";
                                            r.flexAmt = r.flexAmt || 0;
                                            r.starCat = r.starCat || '0' ;
                                        }else{
                                            r['limitSpent'] = false;
                                        }
                                        
                                     });
                                 }
                             });
                             let find = h.policybundles.findIndex(x => {
                                 return x.benefitTypeId.value == '3'
                             })
                             //set the valu for the single select
                             self.singleSelect = (find >= 0) ? h.policybundles[find].benefits[0]: '';

                            //  self.displayHolder = JSON.parse(JSON.stringify(h.policybundles));//saved data
                             self.displayHolder = h.policybundles;
                            //  console.log(h.policybundles)
                             //parent data
                            //  self.policyBundle = JSON.parse(JSON.stringify(j.policybundles));//not a refference copying

                            j.policybundles.map(function(x){
                                    x.cityCatAndAllowances.map(function(y){
                                        y.limitSpent = true;
                                        y.min = y.min || 0;
                                        y.max = y.max || 0;
                                        y.flex = y.flex || "1";
                                        y.flexAmt = y.flexAmt || 0;
                                        y.starCat = y.starCat || '0' ;//inserting star category for accomodation 
                                            
                                    });
                                });
                            self.policyBundle = j.policybundles;//refference copying
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
                           self.copyHolder =  j.policybundles.map(function(obj){
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
                            // self.copyHolder = JSON.parse(JSON.stringify(copyTemp));
                            // self.copyHolder = copyTemp;
                             self.policyBundleName = h.bundleName;
                            self.policyBundleCode = h.bundleCode;
                            self.policyBundleId = h.benefitBundleId;
                           
                                if(type === 'view'){
                                    self.showDetails = true;
                                }else{
                                    self.show('3')
                                }
                            });
                            
                        
                        
                    });
                    
                    
            }else{
                alert('Select a Travel Policy')
            }
      },
      CreateHistory: function(type){
          const self = this;
          let url  = location.href.split('/').filter(x => x != 'grade' && x != 'city').join('/');
          
          history.pushState({liveRoute: type},'Page'+type,url+'/'+type);

        },
      reset: function(val,label,index){   
     //    this to reset the 
     
         var o = this.copyHolder[index].cityCatAndAllowances[label];
         if(!o.limitSpent){
             o.max = 0 ;
            o.min = 0;
            o.flex = "1";
            o.flexAmt = 0;
            
                o.starCat = '0';
            
            
         }else{
            o.max = 0 ;
            o.min = 0;
            o.flex = "1";
            o.flexAmt = 0;
            
                o.starCat = '0';
            
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
                    // let ind = d.findIndex(x => x.benefitTypeId.value == '3');
                    // if(ind >= 0){
                    //     let temp = (d[ind].benefits.hasOwnProperty('value')) ? [d[ind].benefits] : [];
                    //     d[ind].benefits =  JSON.parse(JSON.stringify(temp));
                    //     // console.log(JSON.parse(JSON.stringify(temp)))
                    // }
                    //check for the citycaetgory = 0 and benefit bundle = 0 what if nothing selected
                    for(var c=0;c < d.length; c++){
                        
                        if(Array.isArray(d[c].cityCatAndAllowances) && d[c].cityCatAndAllowances.length === 0){
                                
                            alert('At least one City Group must be selected in '+d[c].benefitTypeId.label);
                            self.disableSave = false;
                            return;
                        }
                        if(Array.isArray(d[c].benefits) && (d[c].benefits.length === 0 || d[c].benefits[0] === null)){
                            alert('At least one Benefit must be selected in '+d[c].benefitTypeId.label);
                            self.disableSave = false;
                            return;
                        }

                        if(d[c].benefitTypeId.value == '3' && d[c].cityCatAndAllowances.length > 0){
                            //that is the value of accomadation
                            for(var t=0;t < d[c].cityCatAndAllowances.length;t++){
                                var p = d[c].cityCatAndAllowances ;
                                
                                if(p[t].starCat == '0'){
                                    alert('Star must be specified for City Groups');
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
                                    alert('Maximum amount should be greater than Minimum amount');
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
                    if(data.includes('|')){
                        var dd = data.split('|');
                    
                        if(dd[0].indexOf('T') === 0){
                            self.getPolicyBundle(self.policyBundleId,'view');
                            self.$store.commit('showAlert','s|Policy Bundle updated successfully..!');
                            $.post(api.listPolicyBundle,{'companyId' : api.companyId }).done(function(res){//get refreshed bundle
                                self.policyBundleData = JSON.parse(res);
                                
                                self.policyBundleHolder = null;
                                self.showDetails = false;
                                self.show('2');
                                self.disableSave = false;
                                self.singleSelect = '';
                            });
                            
                        }else{
                            self.$store.commit('showAlert','o|'+dd[1]);
                            self.disableSave = false;
                            
                        }
                    }else{
                        self.$store.commit('showAlert','d|Error in updating the policy');
                        self.disableSave = false;
                    }
                    
            
            });
            }else{
                alert('Atleast one City group And Benefit must be there under Accomodation');
                self.disableSave = false;
            }
              
        }else{
            alert("Please fill in all the required fields")
            self.disableSave = false;
        }

      },
      deleteBundle : function(id){
          var self = this;
          
          if(confirm("Are you sure you want to delete this Policy ?")){
              self.shows();
              self.disableSave = true;
              $.post(api.deletePolicyBundle,{ benefitBundleId : id }).done(function(data){
                    if(data.includes('|')){
                        var dd = data.toString().split('|');
                        if(dd[0].includes('t')){
                            self.$store.commit('showAlert','d|Policy Bundle deleted successfully..!');
                            $.post(api.listPolicyBundle,{'companyId' : api.companyId }).done(function(res){
                                self.showEdit = false;
                                self.policyBundleData = JSON.parse(res)
                                self.show('1');
                                self.disableSave = false;
                            });
                        }else{
                            // self.$store.commit('showAlert','o|'+dd[1]); temporary move to show case delete msg
                            self.$store.commit('showAlert','d|Couldn\'t delete the policy bundle since it was assigned to some employee');
                            self.disableSave = false;
                        }
                    }else{
                        // self.$store.commit('showAlert','d|Error in deleting the policy');need to work here
                        //  self.$store.commit('showAlert','d|Policy Bundle deleted successfully..!');
                        self.$store.commit('showAlert','d|Couldn\'t delete the policy bundle since it was assigned to some employee');
                            $.post(api.listPolicyBundle,{'companyId' : api.companyId }).done(function(res){
                                self.showEdit = false;
                                self.policyBundleData = JSON.parse(res)
                                self.show('1');
                                self.disableSave = false;
                            });
                    }

                  
              
          });
          }
          
      },
      
  },
  created(){
      const self = this;
      self.shows();
     let arr = location.href.split('/');
     let type = (arr[arr.length -1 ] == 'city') ? 'city' : 'grade';//get last element
     if(type == 'grade'){
         this.showCity = false;
     }else{
           this.showCity = true;
     }
    //  this.CreateHistory(type);
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
    
    border-style: solid;
    border-color: transparent;
    border-image: initial;
    height: auto !important;
}
/* .panel-default {
    border-color: rgb(221, 221, 221);
    border:1px solid #ddd !important
} */
.panel-heading{
    background-color:#ddd;
    padding : 5px 10px !important;
    height : auto !important;
}
#sideList > li:hover{
    background-color:#f7f7f7;
    /* border: 1px solid #ddd; */
}
#sideList > li{
    border-bottom: 1px solid #ddd;
}
/* .cursor li{
    border: 1px solid #ddd;
    margin: 2px 2px;
    border-radius: 2px;
} */
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
    width:100%;
}

#create-box{
    /* border: 1px solid ghostwhite;
    background-color: ghostwhite; */
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
#sidemenu{
    padding:10px;
}
.centering:hover{
    cursor: pointer;
}
.centering{
    width: 100%;
    background-color: white;
    color: #000;
    font-size: 12px;
    font-weight: 400;
    border: 1px solid #ddd;
    text-align: center;
    text-shadow: none;
    padding: 6px;
    margin-bottom: 5px;
    margin-top: 5px;
}
.act-{
    color:white;
    background-color: #467eae;
}
.menu-heads{
    padding: 5px 15px;
    color: #000;
    font-weight: 500;
    background-color: #efefef;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
}
</style>
