<template>
  <div id='create' class='fl  w100' >
      
    <div class='fl w100'>
      <ul id='create-box' class='fl o-gray w100 mb20' style=''>
            <li class='fl w100 b6 black mb20' style='padding-left:5px;' v-if='bundleName.length === 0'>Travel Policy Configuration</li>
             <li class='fl w100 b6 f16 mb20' style='padding-left:5px;' v-else>{{bundleName}}<small> - (Code: {{bundleCode}})</small></li>

            <li class='fl w50 p5-10'>
                <div class=''>Name <sup class='b6'>*</sup></div>
                <input name='policy bundle' type='text' class='pa10 black  w100' v-model='bundleName' />
            </li>
            <li class='fl w50 p5-10 '>
                <div class=''>Code <sup class='b6'>*</sup></div>
                <input name='policy bundle' type='text' class='pa10 black' v-model='bundleCode' />
            </li> 
      </ul>
    </div>
    <div class='fl w100'>
        <ul id='tab_policy' class='fl w100 b6 center'>
            <li class='fl w50 p5-10' :class='{"br-active":activeTab === "Accomodation"}' @click='activeTab = "Accomodation"'>Accomodation</li>
            <li class='fl w50 p5-10' :class='{"br-active":activeTab === "Allowance"}' @click='activeTab = "Allowance"'>Allowance</li>
            <!-- <li class='fl w20 p5-10' :class='{"br-active":activeTab === "Conveyance"}' @click='activeTab = "Conveyance"'>Conveyance</li>
            <li class='fl w20 p5-10' :class='{"br-active":activeTab === "Entertainment"}' @click='activeTab = "Entertainment"'>Entertainment</li> -->
        </ul>
    </div>
    <div class='fl w100' v-for='(j,index) in policyBundles' :key='index' :class='{"dbNo":j.benefitTypeId.label !== activeTab}'>
            <div class='panel panel-default fl w100'  :id="index">
                    <!-- <div class='panel-heading fl w100'>
                        <div class='panel-title fl w100'>
                            <div class='fl w30 p5-10 f16'>{{ j.benefitTypeId.label }}</div>
                           
                        </div>
                    </div> -->
                    <div :id="'collapselist'+j.benefitTypeId.value" class='panel-collapse collapse in fl w100'>
                        <div class='panel-body'>
                            <div class='fl w100'>
                                <div class='fl w70'>
                                    <div class='pa10'>
                                        <label class='b6'>Benefits <!--<sup style='color:red;' v-if='copyHolder[index].cityCatAndAllowances.length > 0'>*</sup> --></label>
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
                                                            <sup v-if='j.benefitTypeId.value == "3"  && copyHolder[index].benefits.hasOwnProperty("value")' style='color:red;'>*</sup> -->
                                            </label>
                                        <v-select maxHeight='250px' v-if='j.benefitTypeId.value == "3"' multiple v-model='copyHolder[index].cityCatAndAllowances' :options='j.cityCatAndAllowances.filter(x => x.label !== "Master Category")'></v-select>
                                        <!--this is to make the option for other policies from accomodation -->
                                        <v-select maxHeight='250px' v-else multiple v-model='copyHolder[index].cityCatAndAllowances' :options='j.cityCatAndAllowances.filter(y => CityCat.indexOf(y.value) > -1)'></v-select>
                                    </div>
                                </div>
                                <div v-if='copyHolder[index].cityCatAndAllowances.length > 0' class='fl w100 p5-10'>
                                    <table  class='table'>
                                        <thead>
                                            <tr v-if='j.benefitTypeId.value == "3"'>
                                                <th class='w20'>City Group</th>
                                                <th class='w10 center'>Unlimited</th>
                                                <th class='w10 center'>Star <sup style='color:red;'>*</sup> </th>
                                                <th class='w25 center'>Price</th>
                                                <th class='w25'>Excess</th>        
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
                                                <td class='w10 center'>
                                                    <input :id='i.value' v-model='i.limitSpent' type='checkbox'>
                                                </td><!-- @click='disableField(i.value)'-->
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
                                                        <span class='fl w30 p2-4'> Min </span>
                                                        <input class='fl w70' :id='i.value' v-model='i.min'  type='number' :disabled='i.limitSpent'>
                                                    </div>
                                                    <div class='p2-4 fl w100'>
                                                        <span class='fl w30 p2-4'>Max </span>
                                                        <input class='fl w70'  :id='i.value' :value='i.limitSpent'  v-model='i.max' :min='i.min' type='number' :disabled='i.limitSpent'>
                                                        <span v-if=' Number(i.max) < Number(i.min) ' class='fl red f10'>Should be more than {{i.min}}</span>
                                                    </div> 
                                                </td>
                                                <td class='w25 center'>
                                                    <div class=' fl w40 p2-4'>
                                                        &nbsp;Flat
                                                        <input v-model='i.flex' class='fl w25' :name='"type_"+ind+j.benefitTypeId.value+i.label' type='radio' value='1' :disabled='i.limitSpent'>
                                                    </div>
                                                    <div class='fl w40 p2-4'>
                                                        &nbsp;%
                                                        <input v-model='i.flex' class='fl w25' type='radio' value='2'  :name='"type_"+ind+j.benefitTypeId.value+i.label' :disabled='i.limitSpent'>
                                                    </div>
                                                    <div class='fl w80 p2-4'>
                                                        <input v-model='i.flexAmt' class='fl w100' min='0' type='number' :disabled='i.limitSpent'>
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
                                                    <div class='p2-4 fl w100'>
                                                        <span class='fl w30 p2-4'> </span>
                                                        <input class='fl w70 p2-4'  :id='i.value' :value='i.limitSpent'  v-model='i.max' :min='i.min' type='number' :disabled='i.limitSpent'>
                                                        <!-- <span v-if=' Number(i.max) < Number(i.min) ' class='fl red f10'>Should be more than {{i.min}}</span> -->
                                                    </div> 
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class='fl w100 p5-10 center m-top-25' v-else>
                                           Please ensure City Groups are configured before proceed with {{j.benefitTypeId.label}} Policy. 
                                </div> 
                            </div>  
                            
                        </div>
                    </div>
            </div>
    </div>
    <div class='fl w100 p5-10'>
            <button class='btn btn-primary btn-sm' v-if='policyBundles.hasOwnProperty("length") && policyBundles.length > 0' @click='sendBundle' :disabled='disableSave'>Create Policy
              <i v-if='disableSave' class="fa fa-spinner fa-spin" aria-hidden="true"></i>
            </button> 
            <!-- <span v-if='Error' class='red'>Resolve the errors please</span> -->
    </div>  
<!-- <pre>{{copyHolder}}</pre> -->
  </div>
</template>

<script>
import api from '../utility/api'
export default {
  name: 'List',
  props: {
      getFresh: {
          type: Boolean,
          default: false
      }
  },
  data(){
      return {
          bundleName : '',
          bundleCode : '',
          methType : '',
          cityCategoryHolder:null,
          cityCategoryData : [],
          allow : [],
          disableSave: false,
          benifitsHolder:[],
          priorityHolder:null,
          policyBundles:''  ,
          copyHolder:[],
          activeTab:"Accomodation",
          Error: false,
          singleSelect : '', 
      }
  },
 computed: {
     tabs(){
         var o = this.policyBundles;
         return o.map(x => x.benefitTypeId.label)
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
     singleSelect : function(val){
        //  console.log(val);
         for(let r= 0;r< this.copyHolder.length;r++){
             let o = this.copyHolder;
             if(o[r].benefitTypeId.value == '3' && o[r].benefits.length > 0){
                 o[r].benefits= [];
                 o[r].benefits.push(val)
             }
             if(o[r].benefitTypeId.value == '3' && o[r].benefits.length == 0){
                 o[r].benefits.push(val)
             }
         }
     },
     getFresh: function(val){
         if(val){
             //refesh the policy bundle mode and emit event
                       var self = this;
                $.post(api.getModelPolicyBundle,{'companyId' : api.companyId }).done(function(res){
                    var t = JSON.parse(res);
                    t.policybundles.map(function(x){
                        x.cityCatAndAllowances.map(function(y){
                            y.limitSpent = true;
                            y.min = y.min || 0;
                            y.max = y.max || 0;
                            y.flex = y.flex || "1";
                            y.flexAmt = y.flexAmt || 0;
                            y.starCat = y.starCat || '0' ;//inserting star category for accomodation 
                                
                        });
                    });

                            self.policyBundles = t.policybundles;
                            var ss = JSON.parse(JSON.stringify(self.policyBundles));
                            //creating a copy to have a holder for v-model
                        for(var i=0;i<self.policyBundles.length;i++){
                            self.copyHolder.push({
                                "benefitTypeId": {
                                        "label": ss[i].benefitTypeId.label,
                                        "value": ss[i].benefitTypeId.value
                                    },
                                    "priority": "",
                                    "benefits": [],
                                    "cityCatAndAllowances" :[]
                            });
                        }
                    });
                
             this.$emit('doneRefresh');
         }
     }
 },

  methods:{
      fade: function(id,sec){
        var t = sec * 1000;
        $('#'+id).fadeIn();
        setTimeout(function(){
          $('#'+id).fadeOut()
        },t)
        },
        shows : function(){
        if(api.production){
          setProgress(3);
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
            o.starCat = '0';
            
         }else{
            o.max = 0 ;
            o.min = 0;
            o.flex = "1";
            o.flexAmt = 0;
                o.starCat = '0';
         }
         
      },
      sendBundle : function(){
          const self = this;let dos = true;
          self.disableSave = true;
          var dataToSend = {
              "benefitBundleId" : "",
              "bundleName" : self.bundleName,
              "bundleCode" : self.bundleCode,
              "companyId" : api.companyId ,
              "methType" : "create",
              "policybundles" : self.copyHolder.filter(function(x){
                  return (x.benefits.hasOwnProperty('value') || x.benefits.length > 0 || x.cityCatAndAllowances.length > 0)
              })
          };

        
        if(self.bundleName != '' && self.bundleCode != ''){
            //check for the citycaetgory = 0 and benefit bundle = 0 what if nothing selected
                  const d = dataToSend.policybundles;

                    // ///hack for multi select to single select
                    // let ind = d.findIndex(x => x.benefitTypeId.value == '3');
                    // if(ind >= 0){
                    //     let temp = (d[ind].benefits.hasOwnProperty('value')) ? [d[ind].benefits] : [];
                    //     d[ind].benefits =  JSON.parse(JSON.stringify(temp));
                    //     // console.log(JSON.parse(JSON.stringify(temp)))
                    // }
                  
          //check for the citycaetgory = 0 and benefit bundle = 0 what if nothing selected
                for(var c=0;c < d.length; c++){
                        
                        if(Array.isArray(d[c].cityCatAndAllowances) && d[c].cityCatAndAllowances.length === 0){
                            alert('Atleast one City Group must be selected in '+d[c].benefitTypeId.label);
                            self.disableSave = false;
                            return;
                        }
                        if(Array.isArray(d[c].benefits) && (d[c].benefits.length === 0 && d[c].benefits[0] === null)){
                            
                            alert('At least one Benefit must be selected in '+d[c].benefitTypeId.label);
                            self.disableSave = false;
                            return;
                        }

                        if(d[c].benefitTypeId.value == '3' && d[c].cityCatAndAllowances.length > 0){
                            //that is the value of accomadation
                            for(let t=0;t < d[c].cityCatAndAllowances.length;t++){
                                let p = d[c].cityCatAndAllowances ;
                                
                                if( p[t].starCat == '0'){
                                    alert('Please specify Star category.');
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
                                    alert('Maximum amount should be greater than Minimum amount.');
                                        self.disableSave = false;
                                        return;
                                }
                            }
                            
                        }
                    }
            if(dataToSend.policybundles.length > 0){
                self.shows()
            $.post(api.createPolicyBundle,(api.production) ? dataToSend : JSON.stringify(dataToSend)).done(function(res){
                //console.log(res.toString().includes('T'));
                
                const tt = res.split('|');
                if(res.toString().includes('T')){
                    
                    $.post(api.getModelPolicyBundle,{'companyId' : api.companyId }).done(function(res){
                        var t = JSON.parse(res);
                        t.policybundles.map(function(x){ //set this to true which is default
                            x.cityCatAndAllowances.map(function(y){
                        y.limitSpent = true;
                        y.min = y.min || 0;
                        y.max = y.max || 0;
                        y.flex = y.flex || "1";
                        y.flexAmt = y.flexAmt || 0;
                        y.starCat = y.starCat || '0' ;//inserting star category for accomodation 
                                    
                            });
                        });

                            self.policyBundles = t.policybundles;
                            var ss = self.policyBundles;
                           self.copyHolder.length = 0;
                        for(var i=0;i<self.policyBundles.length;i++){
                            self.copyHolder.push({
                                "benefitTypeId": {
                                        "label": ss[i].benefitTypeId.label,
                                        "value": ss[i].benefitTypeId.value
                                    },
                                    "priority": "",
                                    "benefits": [],
                                    "cityCatAndAllowances" :[]
                            })
                        }
                        self.$store.commit('showAlert','s|Travel policy created successfully.');
                        self.disableSave = false;
                        self.bundleName = '';
                        self.bundleCode = '';
                        self.singleSelect = '';
                    });
                }
                else{
                    self.$store.commit('showAlert','d|'+tt[1]);
                    self.disableSave = false;
                }

                
                setTimeout(function(){
                    self.$emit('refresh',1);
                },2000)
                
                  
                
            });
            }else{
                      alert('Atleast one City Group and Benefit must be there under Accomodation!');
                      self.disableSave = false;
                  }
             //URL to create bundle
                
        }else{
            alert("Please fill in all the required fields.");
            self.disableSave = false;
        }
        
      },
      vald: function(min,max){
          return min > max
      }
  },
  created(){
       var self = this;
       self.shows()
            $.post(api.getModelPolicyBundle,{'companyId' : api.companyId }).done(function(res){
                var t = JSON.parse(res);
                t.policybundles.map(function(x){
                    x.cityCatAndAllowances.map(function(y){
                        y.limitSpent = true;
                        y.min = y.min || 0;
                        y.max = y.max || 0;
                        y.flex = y.flex || "1";
                        y.flexAmt = y.flexAmt || 0;
                        y.starCat = y.starCat || '0' ;//inserting star category for accomodation 
                            
                    });
                });

            self.policyBundles = t.policybundles;
            var ss = JSON.parse(JSON.stringify(self.policyBundles));
            //creating a copy to have a holder for v-model
           for(var i=0;i<self.policyBundles.length;i++){
               self.copyHolder.push({
                   "benefitTypeId": {
                        "label": ss[i].benefitTypeId.label,
                        "value": ss[i].benefitTypeId.value
                    },
                    "priority": "",
                    "benefits": [],
                    "cityCatAndAllowances" :[]
               });
           }
        });
    
  }
}
</script>

<style>
.panel {
    margin-bottom: 20px;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 1px;
    /* border-width: 1px; */
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
.form-control{
  border-radius : 0px !important;
  padding : 5px 10px !important; 
}
table{
    font-size : 12px;
}
.form-control{
    height:24px !important;
}


</style>
