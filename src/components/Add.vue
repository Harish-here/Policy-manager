<template>
  <div id='city_category' class='flex'>
         <div class='p-15-top pa-lr br-right' style='width:35%;' >
                <div class='roboto black mb25' style='font-size:18px;'>City Group</div>
                <div class='centering mb25' @click="clean">Add City Group</div>
                <div class='f14 p2-4 b6 br-btm'>List of City Groups <span class="badge badge-primary">{{cityCategoryData.length}}</span></div>
                <ul style='height:400px;overflow-y:auto;' id='sideList'>
                  <li  class='p10-20' v-for='i in cityCategoryData' :key='i.value'
                      :class='{"active-list" : i.value == activeCityCat}'>
                    <!-- <b>{{i.label}}</b> -->
                    <div class='flex items-center'>
                      <div class='w75 cursor' @click="sendId(i.value,'view')" style='overflow-wrap: break-word;'> {{i.label}}</div>
                        <div class='w25 al-right'>
                           <span v-if='i.label != "Master Category"' class="btn btn-default btn-xs  action-btn" @click='sendId(i.value,"edit")'><i class="fa fa-pencil" aria-hidden="true"></i></span>
                          <span class="btn btn-default btn-xs action-btn" @click="sendId(i.value,'view')"><i class="fa fa-eye" aria-hidden="true"></i></span>
                      </div>
                    </div>                    
                  </li>
                  <li class='p10-20 center' style='border:1px solid #ddd;' v-if='cityCategoryData.length === 0' >No City Group</li>
                </ul>
          </div>
        <div style='display:flex' class='w60 p-15-top pa-lr'>
          <div id='createSpace' v-show='createShow' class='w70 p10-20'>
              <div class='form-group'>
                <label>Group Name<sup class='b6'>*</sup></label><br>
                <input class='form-control input-sm cus' type='text' name='cityCategory' value="" v-model='cityCategoryHolder'/>
              </div>
              <div class='form-group'>
                <label>Assign Cities</label>
                <v-select maxHeight='250px'  multiple v-model='cityHolder' :options='cityData.filter(x => CompCit.indexOf(x.value) == -1)'></v-select>
                
              </div>
              <div class="form-group">
                <div class='pa2 flex justify-around'>
                  <button v-show='!showEdit' type='button' id='createBtn' class='btn btn-primary btn-sm' @click='create'>
                    <!-- <i class="fa fa-plus" aria-hidden="true"></i> -->
                    Create City Group</button>
                  <button v-show='showEdit' type='button' class='btn btn-danger btn-sm' @click="deleteCityCat(cityCategoryId)"> Delete</button>
                  <button v-show='showEdit' type='button' id='editBtn' class='btn btn-primary btn-sm' @click='edit'> Update</button>
                  <button v-show='showEdit' class='btn btn-default btn-sm' @click="clean"> Back</button>
                </div>
              </div>
          </div>
          <div id='viewSpace' v-show='viewShow' class='w70 p10-20'>
              <div class='form-group'>
                <div class='b6 f16 mb20'>{{cityCategoryHolder}}</div>
              </div>
              <div class='form-group'>
                <label>Assigned Cities</label>
                <!-- <v-select maxHeight='250px'  multiple v-model='cityHolder' :options='cityData.filter(x => CompCit.indexOf(x.value) == -1)'></v-select> -->
                <ul class='w100 flex' style='overflow:hidden;flex-wrap:wrap;'>
                  <li class='p2-4' v-for='i in cityHolder' :key='i.value'>{{i.label}}{{ (index !== 0) ? ', ' : ""}}</li>
                </ul>
              </div>
              <div class="form-group">
                <div class='flex'>
                  <button class='btn btn-default btn-sm' @click="clean"> Back</button>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import vSelect from 'vue-select'
import _ from 'lodash/collection'
import api from '../utility/api'
Vue.component('v-select', vSelect);


export default {
  name: 'Add',
  data(){
      return {
          msg : null,
          optionData : [],
          viewShow:false,
          cityData:[],
          tellRefresh: false,
          departmentData:[],
          departmentHolder : '',
          cityCategoryHolder : null,
          cityHolder:[],
          cityCategoryData:'',
          createShow: true,
          displayShow : true,
          companyId : '',
          showEdit : false,
          remCities :[],
          preCityHolder : [],
          cityCategoryId: null,
          dataReturn : null,
          activeCityCat : '',
          cityDataCat: [],
          activeId: [],
          activeCityVal:[]
      }
  },
 created(){
     var self = this;
  
          $.post(api.listCityCat,{'companyId' : api.companyId ,'methodType' :'list' }).done(function(data){
             self.cityCategoryData = JSON.parse(data);//response
             });
            self.show()
             $.get(api.listCity).done(function(res){
                self.cityData = JSON.parse(res).sort(function(a,b){
                   var textA = a.label.toUpperCase();
                    var textB = b.label.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });
             }).fail(function(err){
               console.log(err)
             });
             $.get(api.listCityCatList).done(function(res){
               let temp = JSON.parse(res);
                self.cityDataCat = temp.map(x => x.value)
             }).fail(function(err){
               console.log(err)
             });
   } ,  
   computed: {
     showAlert(){
       const self = this;
       return self.$store.state.alt
     },
     SelectedId(){
       if(this.activeId.length > 0){
        return this.activeId;
       }else{
         return []
       }
     },
     CompCit(){
       const self = this;
       return this.cityDataCat.filter(x => {
         return self.SelectedId.indexOf(x) === -1
       });
     },
     classs(){
       const self = this;
       return self.$store.state.class
     },
     label(){
       return this.$store.state.label
     }
   },

    methods:{
          resetRefresh: function(){
            this.tellRefresh = false;
          },

          getOld: function(){
            var self = this;
  
            $.post(api.listCityCat,{'companyId' : api.companyId ,'methodType' :'list' }).done(function(data){
                self.cityCategoryData = JSON.parse(data);//response
                });
              self.show()
                $.get(api.listCity).done(function(res){
                  self.cityData = JSON.parse(res).sort(function(a,b){
                      var textA = a.label.toUpperCase();
                      var textB = b.label.toUpperCase();
                      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                  });
                }).fail(function(err){
                  console.log(err)
                });
                $.get(api.listCityCatList).done(function(res){
                  let temp = JSON.parse(res);
                  self.cityDataCat = temp.map(x => x.value)
                }).fail(function(err){
                  console.log(err)
                });
          },
          btnState : function(id,text,type){
            if(type === 1){
              $('#'+id).html(''+text+'...').attr('disabled','disabled');
            }else{
              $('#'+id).html(text).removeAttr('disabled');
            }

          },
          getCityCat: function(){
            const self = this;
            $.get(api.listCityCatList).done(function(res){
               let temp = JSON.parse(res);
                self.cityDataCat = temp.map(x => x.value)
             }).fail(function(err){
               console.log(err)
             });
          },
          show : function(){
            if(api.production){
              // setProgress(2);
            }
          },
          fade: function(id,sec){
            var t = sec * 1000;
            $('#'+id).fadeIn();
            setTimeout(function(){
              $('#'+id).fadeOut()
            },t)
            },
            clean : function(){
              const self = this;
              self.createShow = true ;self.showEdit = false;self.viewShow = false;
              self.cityCategoryHolder = null;
              self.cityHolder = [];
              self.activeCityCat = '';
              self.activeId = [];
            },
      create : function(){
            var self = this;let datas;
            if(self.cityCategoryHolder != null && self.cityHolder != null && self.cityHolder.length > 0 && self.cityCategoryHolder != '' && self.cityCategoryHolder != ' ' ){
              self.btnState('createBtn','creating...',1);
              if(api.production){
                datas = {'companyId' : api.companyId,'cityCat' : {'label':self.cityCategoryHolder,'value' : ''},'cities' : self.cityHolder};
              }else{
                datas = JSON.stringify({'companyId' : api.companyId,'cityCat' : {'label':self.cityCategoryHolder,'value' : ''},'cities' : self.cityHolder});
              }
              
              //self.sendData('http://localhost',datas,false)//URL to creatCityCat http://www.hobse.com/demo/index.php/customer/customer/policy/listCityCat
              self.show()
              $.post(api.creatCityCat,datas).done(function(data){
                if(data.includes("successfully")){
                    $.post(api.listCityCat,{'companyId' : api.companyId ,'methodType' :'list' }).done(function(data){
                      self.cityCategoryData = JSON.parse(data);//respo refresh the list
                      self.showEdit = false;
                        // self.tellRefresh = true;//to tell the childrens to refresh the city category
                      self.cityHolder = [];
                      self.activeCityCat = '';
                      self.btnState('createBtn','create',0);
                      //self.fade('createInfo',3);
                      self.getCityCat();
                      self.$store.commit('showAlert','s|City Category \"'+ self.cityCategoryHolder +'\" is Created..!')
                      self.cityCategoryHolder = null;
                      $('#createBtn').html('Create City Group');
                      // location.reload();
                    });
                }else{
                  alertify.error("City Group name already exist.");
                  self.btnState('createBtn','create',0);
                  $('#createBtn').html('Create City Group');
                }
                //  self.dataReturn = JSON.parse(data);//response
                  
                });
              
            }else{
              if(self.cityHolder !== null && self.cityHolder.length !== 0){
                alert('City Group Name cannot be empty')
              }else{
                alert('Atleast one City need to be in a City Group ')
              }
              
            }
          },
          sendId : function(obj,type){
              var self = this;
              // self.showEdit = true;
              self.show();
              self.activeId = []
              $.post(api.listCityCatDetails,{'cityCatId' : obj }).done(function(data){
                self.activeCityCat = obj;
                self.dataReturn = JSON.parse(data);//response
                self.cityCategoryId = self.dataReturn.cityCat.value; //setting the id here
                self.cityCategoryHolder = self.dataReturn.cityCat.label;
                self.cityHolder =  self.dataReturn.cities;
                self.activeId = self.dataReturn.cities.map(x => x.value);
                self.preCityHolder = [...self.cityHolder];
                self.createShow = true;
                  if(type === 'view'){
                     self.showEdit = false;
                    self.createShow = false;
                    self.viewShow = true;
                  }else{
                    self.viewShow = false;
                    self.createShow = true;
                    self.showEdit = true;
                  }
                });
          },
          deleteCityCat : function(id){
            var self = this;
            if(confirm("Are Sure You want to delete this City Group") && id != null){
              $.post(api.deleteCityCat,{'cityCatId' : id,'methodType':'delete'}).done(function(data){ //url for delte 
              //http://www.hobse.com/demo/index.php/customer/customer/policy/deleteCityCat
              var res = data
              self.activeId = []
              self.show()
              $.post(api.listCityCat,{'companyId' : api.companyId ,'methodType' :'list' }).done(function(datas){
                self.cityCategoryData = JSON.parse(datas);//respo refresh the list
                self.cityCategoryId = self.cityCategoryHolder = null;
                self.activeCityCat = '';
                self.cityHolder = [];
                self.tellRefresh = true;
                self.preCityHolder  = [];
                self.showEdit = false;
                if(res.indexOf('f') === 0){
                self.fade('deleteNotInfo',3)
                
                  self.$store.commit('showAlert','d|Sorry can\'t Delete this City Group because it is associated with some policy bundle.')
                }else{
                  self.activeId = [];
                  // self.fade('deleteInfo',4);
                  self.$store.commit('showAlert','d|City Group is Deleted..!')
                }
                });
                  self.getOld();
              });
            }
          },

          edit : function(){
            const self = this;let toSend;
            self.btnState('editBtn','changing',1);
            //write the edit suace here
            self.remCities = self.preCityHolder.filter(x => {
              return self.cityHolder.map(y => y.value).indexOf(x.value) == -1
            });
            // console.log(self.remCities);
            if(self.cityCategoryHolder != null && self.cityHolder != null && self.cityHolder.length > 0 && self.cityCategoryHolder != '' && self.cityCategoryHolder != ' ' ){
              if(api.production){
                toSend ={ cityCat : { label : self.cityCategoryHolder, value : self.cityCategoryId },cities : self.cityHolder,remCities : self.remCities,companyId : api.companyId} ;
              }else{
                toSend = JSON.stringify({ cityCat : { label : self.cityCategoryHolder, value : self.cityCategoryId },cities : self.cityHolder,remCities : self.remCities,companyId : api.companyId});
              }
              self.show()
              $.post(api.updateCityCat,toSend)
                .done(function(data){
                  if(!data.includes('F|')){
                      $.post(api.listCityCat,{'companyId' : api.companyId ,'methodType' :'list' }).done(function(res){
                        self.cityCategoryData = JSON.parse(res);//response
                        self.cityCategoryId = null;
                        self.cityCategoryHolder = null;
                        self.activeCityCat = '';
                        self.cityHolder = [];
                        self.preCityHolder  = [];
                        self.remCities  = [];
                        self.showEdit = false;
                        self.activeId = [];
                        self.getCityCat();
                        self.$store.commit('showAlert','o|City Group updated.')
                    });
                  }else{
                    let s = data.split('|')[1];
                    alertify.error(s);
                  } 
                    
                                        self.btnState('editBtn','Update',0);
              });              
            }else{
              alert("Atleast one City need to be in a Group");
              self.btnState('editBtn','Update',0);

            }

          }
  }
}
</script>

<style scoped>
.form-control{
  border-radius : 0px;
}
.compress{
    width:75%;
}
.left-bar{
    overflow-y:auto;
    height : 100vh;
}
.list-group-item:hover{
  background-color : #ddd;
  cursor : pointer;
  font-size : 15px;
}
.form-control{
  border-radius : 0px !important;
  padding : 5px 10px !important; 
}
.v-select > .dropdown-toggle{
  border-radius : 0px !important;
}

</style>
