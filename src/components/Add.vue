<template>
  <div id='city_category'>
    <div class='fl w20 p5-10'>
        <ul class='list-group'>
          <li class='list-group-item btn btn-default' @click="clean"><b> + Create City Category </b></li>
          <li class='list-group-item' v-for='i in cityCategoryData' @click='sendId(i.value)' :key='i.value' ><i class="fa fa-chevron-right f10" aria-hidden="true"></i> <b>{{i.label}}</b></li>
          <li class='list-group-item' v-if='cityCategoryData.length === 0'>No City Category</li>
        
        </ul>
    </div>
    <div class='fl w80'>
    
      <div id='createSpace' v-show='createShow' class='fl w30 p5-10'>
          <div class='form-group'>
            <label>City Category</label><br>
            <input class='form-control input-sm' type='text' name='cityCategory' value="" v-model='cityCategoryHolder'/>
          </div>
          <div class='form-group'>
            <label>Assign City</label>
            <v-select  multiple v-model='cityHolder' :options='cityData'></v-select>
            <br/>
              <button v-show='!showEdit' id='createBtn' class='btn btn-primary btn-sm' @click='create'>Create</button>
              <button v-show='showEdit' id='editBtn' class='btn btn-primary btn-sm' @click='edit'>Update</button>
              <button v-show='showEdit' id='editBtn' class='btn btn-danger btn-sm' @click="deleteCityCat(cityCategoryId)">Delete</button>
          </div>

            <!-- end of create space -->
    
       </div>
    
    </div>
    
    <div class="modal right fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
		<div class="modal-dialog" role="document">
			<div class="modal-content">

				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title fl" id="myModalLabel2">City Category</h4>
          <div class='btn btn-info btn-xs center fr' @click="clean" style='margin-right:10px;'>Create City Category</div>
				</div>

				<div class="modal-body">
          <div class='fl w40 p5-10'>
                <ul v-if='cityCategoryData.length > 0'>
                  <li class='p10-20 cursor' v-for='i in cityCategoryData' @click='sendId(i.value)' :key='i.value' >
                    <i class="fa fa-chevron-right f10" aria-hidden="true"></i> <b>{{i.label}}</b>
                  </li>
                </ul>
                <ul v-else>
                  <li>No Category is there !</li>
                </ul>
          </div>
          <div id='createSpace' v-show='createShow' class='fl w60 p5-10'>
              <div class='form-group'>
                <label>City Category</label><br>
                <input class='form-control input-sm' name='cityCategory' value="" v-model='cityCategoryHolder'/>
              </div>
              <div class='form-group'>
                <label>Assign City</label>
                <v-select  multiple v-model='cityHolder' :options='cityData'></v-select>
                <div class='p10-20 center'>
                  <button v-show='!showEdit' id='createBtn' class='btn btn-primary btn-sm' @click='create'>Add</button>
                  <button v-show='showEdit' id='editBtn' class='btn btn-primary btn-sm' @click='edit'>Update</button>
                  <button v-show='showEdit' id='editBtn' class='btn btn-danger btn-sm' @click="deleteCityCat(cityCategoryId)">Delete</button>
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
import _ from 'lodash/collection'
import api from '../utility/api'
Vue.component('v-select', vSelect);


export default {
  name: 'Add',
  data(){
      return {
          msg : null,
          optionData : [],
          cityData:[],
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
          dataReturn : null
      }
  },
  watch : {
    cityHolder : function(){
      const self= this;
      let dif = 0;let put;
    _.forEach(self.preCityHolder,function(value){
        for(let i in self.cityHolder){
          if(self.cityHolder[i].value == value.value ){
            put = false;
            break;
          }else{
            put= true;
          }
        }
        //push here
        if(put){
          if(self.remCities.length > 0){
              for(var u in self.remCities){//checking it is availabel alreadu in removecities
                if(self.remCities[u].value == value.value){
                  dif = 1;
                  break;
                }else{
                  continue;
                }
              }
              if(!dif){
                self.remCities.push(value);
              }
              }else{
                self.remCities.push(value);
              }
        }
     
    });
      

    }
  },
  methods:{
      btnState : function(id,text,type){
        if(type === 1){
          $('#'+id).html(''+text+'...').attr('disabled','disabled');
        }else{
          $('#'+id).html(text).removeAttr('disabled');
        }

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
           self.cityHolder = null;
        },
  create : function(){
        var self = this;let datas;
        if(self.cityCategoryHolder != null && self.cityHolder != null && self.cityHolder.length > 0){
          self.btnState('createBtn','creating',1);
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
           
            self.cityHolder = null;
            self.btnState('createBtn','create',0);
            //self.fade('createInfo',3);
            self.$store.commit('showAlert','s|City Category \"'+ self.cityCategoryHolder +'\" is Created..!')
             self.cityCategoryHolder = null;
            $('#createBtn').html('create')
             });
             });
          
        }else{
          alert('City Category Name cannot be Empty')
        }
      },
      sendId : function(obj){
          var self = this;
          self.showEdit = true;
          self.show()
          $.post(api.listCityCatDetails,{'cityCatId' : obj }).done(function(data){
             self.dataReturn = JSON.parse(data);//response
             self.cityCategoryId = self.dataReturn.cityCat.value; //setting the id here
            self.cityCategoryHolder = self.dataReturn.cityCat.label;
             self.cityHolder =  self.dataReturn.cities;
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
      
          self.show()
          $.post(api.listCityCat,{'companyId' : api.companyId ,'methodType' :'list' }).done(function(datas){
             self.cityCategoryData = JSON.parse(datas);//respo refresh the list
             self.cityCategoryId = self.cityCategoryHolder = null;
             self.cityHolder = [];
             self.preCityHolder  = [];
             self.showEdit = false;
            if(res.indexOf('f') === 0){
             self.fade('deleteNotInfo',3)
              self.$store.commit('showAlert','d|Sorry can\'t Delete this city Category because it is associated with some policy bundle !!!')
            }else{
              // self.fade('deleteInfo',4);
              self.$store.commit('showAlert','d|City Category is Deleted..!')
            }
             });
             
          });
        }
      },

      edit : function(){
        const self = this;let toSend
        self.btnState('editBtn','changing',1);
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
                self.cityHolder = [];
                self.preCityHolder  = [];
                self.remCities  = [];
                self.showEdit = false;
          self.btnState('editBtn','Update',0);
         self.$store.commit('showAlert','o|City Category updated..!')
             });
            
          });
      }
  },
  created(){
       var self = this;
          $.post(api.listCityCat,{'companyId' : api.companyId ,'methodType' :'list' }).done(function(data){
             self.cityCategoryData = JSON.parse(data);//response
             });
            self.show()
             $.get(api.listCity).done(function(res){
                self.cityData = JSON.parse(res)
             }).fail(function(err){
               console.log(err)
             });
    
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
