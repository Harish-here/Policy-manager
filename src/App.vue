<template>
  <div id="app">
            <transition name='fade'>
              <div class='p5-10 white b6 w100 center' v-if='showAlert' style='position:fixed;top:0;z-index:7000' :class='classs'>
                {{label}}
              </div>
            </transition>
            <ul class='fl w100 p20-40 al-left bg-gray' id='pageTitle'>
                <li>
                  <button class='btn btn-primary btn-xs fr' data-toggle="modal" data-target="#myModal2"><span style='color:#fff !important;'><i class="fa fa-location-arrow" aria-hidden="true"></i> Manage City Category</span>
                  </button>
                </li>
                <li role="presentation" class='b3 f21'>Grade Policy </li>
            </ul>
            <hr class='fl w100'>
            <transition name='fade'>
              <div class='fl w100 p10-20'>
                  <!-- <router-view></router-view> -->
                  <Add :toRefresh='tellRefresh' @refreshDone='resetRefresh' />
                </div>
            </transition>
             
            <div class="modal right fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
                <div class="modal-dialog" role="document">
                      <div class="modal-content">

                        <div class="modal-header">
                          <button type="button" class="close fl" style='width:5%;' data-dismiss="modal" aria-label="Close"><span aria-hidden="true"><i class="fa fa-times fa-2" aria-hidden="true" style='font-size:18px;'></i></span></button>
                          <h4 class="modal-title fl w60" id="myModalLabel2" style="margin-top:-4px">City Category</h4>
                          
                        </div>

                        <div class="modal-body" style='display:flex' >
                          <div class='' style="flex:.7 0 0;">
                                <div class='p5-10 b6'>City Category List</div>
                                <ul style='height:400px;overflow-y:auto;'>
                                  <li  class='p10-20 cursor br-bt' v-for='i in cityCategoryData' @click='sendId(i.value)' :key='i.value'
                                      :class='{"active-list" : i.value == activeCityCat}'>
                                    <i class="fa fa-chevron-right f10" aria-hidden="true"></i> <b>{{i.label}}</b>
                                  </li>
                                </ul>
                          </div>
                          <div id='createSpace' v-show='createShow' class=' p10-20' style="flex:1 0 0;">
                              <div class='form-group'>
                                <label>Category</label><br>
                                <input class='form-control input-sm cus' type='text' name='cityCategory' value="" v-model='cityCategoryHolder'/>
                              </div>
                              <div class='form-group'>
                                <label>Assign City</label>
                                <v-select maxHeight='250px'  multiple v-model='cityHolder' :options='cityData.filter(x => CompCit.indexOf(x.value) == -1)'></v-select>
                                <div class='pa2 flex justify-around'>
                                  <button v-show='!showEdit' type='button' id='createBtn' class='btn btn-primary btn-sm' @click='create'>
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                    Add</button>
                                  <button v-show='showEdit' type='button'  id='editBtn' class='btn btn-danger btn-sm' @click="deleteCityCat(cityCategoryId)"><i class="fa fa-trash" aria-hidden="true"></i> Delete</button>
                                  <button v-show='showEdit' type='button' id='editBtn' class='btn btn-primary btn-sm' @click='edit'><i class="fa fa-floppy-o" aria-hidden="true"></i> Update</button>
                                  <button v-show='showEdit' class='btn btn-default btn-sm' @click="clean"><i class="fa fa-chevron-left" aria-hidden="true"></i> Back</button>
                                </div>
                              </div>
                          </div>
                          
                        </div>

                      </div><!-- modal-content -->
                </div><!-- modal-dialog -->
	         </div><!-- modal -->
          
  </div>
</template>

<script>
import Vue from 'vue'
import vSelect from 'vue-select'
// import _ from 'lodash/collection'
import api from '@/utility/api' 
import Add from '@/components/Edit'
Vue.component('v-select', vSelect)

export default {
  name: 'app',
  data(){
      return {
          msg : null,
          optionData : [],
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
  components : {Add},
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
              setProgress(2);
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
              self.createShow = true ;self.showEdit = false;
              self.cityCategoryHolder = null;
              self.cityHolder = [];
              self.activeCityCat = '';
              self.activeId = [];
            },
      create : function(){
            var self = this;let datas;
            if(self.cityCategoryHolder != null && self.cityHolder != null && self.cityHolder.length > 0 && self.cityCategoryHolder != '' && self.cityCategoryHolder != ' ' ){
              self.btnState('createBtn','adding...',1);
              if(api.production){
                datas = {'companyId' : api.companyId,'cityCat' : {'label':self.cityCategoryHolder,'value' : ''},'cities' : self.cityHolder};
              }else{
                datas = JSON.stringify({'companyId' : api.companyId,'cityCat' : {'label':self.cityCategoryHolder,'value' : ''},'cities' : self.cityHolder});
              }
              
              //self.sendData('http://localhost',datas,false)//URL to creatCityCat http://www.hobse.com/demo/index.php/customer/customer/policy/listCityCat
              self.show()
              $.post(api.creatCityCat,datas).done(function(data){
                //  self.dataReturn = JSON.parse(data);//response
                  $.post(api.listCityCat,{'companyId' : api.companyId ,'methodType' :'list' }).done(function(data){
                  self.cityCategoryData = JSON.parse(data);//respo refresh the list
                  self.showEdit = false;
                    self.tellRefresh = true;//to tell the childrens to refresh the city category
                  self.cityHolder = [];
                  self.activeCityCat = '';
                  self.btnState('createBtn','create',0);
                  //self.fade('createInfo',3);
                  self.getCityCat();
                  self.$store.commit('showAlert','s|City Category \"'+ self.cityCategoryHolder +'\" is Created..!')
                  self.cityCategoryHolder = null;
                  $('#createBtn').html('add');
                  // location.reload();
                });
                });
              
            }else{
              if(self.cityHolder !== null && self.cityHolder.length !== 0){
                alert('City Category Name cannot be Empty')
              }else{
                alert('Atleast one city need to be in a Category ')
              }
              
            }
          },
          sendId : function(obj){
              var self = this;
              self.showEdit = true;
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
                });
          },
          deleteCityCat : function(id){
            var self = this;
            if(confirm("Are Sure You want to delete this City Category") && id != null){
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
                
                  self.$store.commit('showAlert','d|Sorry can\'t Delete this city Category because it is associated with some policy bundle !!!')
                }else{
                  self.activeId = [];
                  // self.fade('deleteInfo',4);
                  self.$store.commit('showAlert','d|City Category is Deleted..!')
                }
                self.getCityCat();
                });
                
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
            if(api.production){
              toSend ={ cityCat : { label : self.cityCategoryHolder, value : self.cityCategoryId },cities : self.cityHolder,remCities : self.remCities,companyId : api.companyId} ;
            }else{
              toSend = JSON.stringify({ cityCat : { label : self.cityCategoryHolder, value : self.cityCategoryId },cities : self.cityHolder,remCities : self.remCities,companyId : api.companyId});
            }
            self.show()
            $.post(api.updateCityCat,toSend)
              .done(function(data){ 
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
                    self.btnState('editBtn','Update',0);
                    self.getCityCat();
                    self.$store.commit('showAlert','o|City Category updated..!')
                });
                
              });
          }
  } 
      
}

</script>

<style src='@/assets/basic.css'>


/*left bar*/
/*******************************
* MODAL AS LEFT/RIGHT SIDEBAR
*******************************/
	.modal.left .modal-dialog,
	.modal.right .modal-dialog {
		position: fixed;
		margin: auto;
		width: 570px;
		height: 100%;
		-webkit-transform: translate3d(0%, 0, 0);
		    -ms-transform: translate3d(0%, 0, 0);
		     -o-transform: translate3d(0%, 0, 0);
		        transform: translate3d(0%, 0, 0);
	}

	.modal.left .modal-content,
	.modal.right .modal-content {
		height: 100%;
		overflow-y: auto;
	}
	
	.modal.left .modal-body,
	.modal.right .modal-body {
		padding: 15px 15px 80px;
	}

        
/*Right*/
	.modal.right.fade .modal-dialog {
		right: -320px;
		-webkit-transition: opacity 0.2s linear, right 0.2s ease-out;
		   -moz-transition: opacity 0.2s linear, right 0.2s ease-out;
		     -o-transition: opacity 0.2s linear, right 0.2s ease-out;
		        transition: opacity 0.2s linear, right 0.2s ease-out;
	}
	
	.modal.right.fade.in .modal-dialog {
		right: 0;
	}

/* ----- MODAL STYLE ----- */
	.modal-content {
		border-radius: 0;
		border: none;
	}

	.modal-header {
		border-bottom-color: #EEEEEE;
		background-color: #FAFAFA;
	}

</style>
