let forProd = false;//change to true when you built for production
let id;
if (forProd) {
    (function () {
        $.get('http://www.hobse.com/demo/index.php/customer/policy/companyId').done(function (data) {
            var temp = JSON.parse(data);
            var id = temp.companyId;
        });
    })();
}

const prodPath = "http://www.hobse.com/demo/index.php/customer/policy";
const localPath = "http://localhost:8800";

export default {
    listCityCat: (forProd) ? prodPath + "/listCityCat" : localPath + "/citycategory",
    listCityCatDetails: (forProd) ? prodPath + "/listCityCatDetails" : localPath + "/citymapping/list",
    creatCityCat: (forProd) ? prodPath + "/createCityCat" : localPath + "/cityCatMap",
    listCity: (forProd) ? prodPath + "/listCities" : localPath + "/listCity",
    deleteCityCat: (forProd) ? prodPath + "/deleteCityCat" : localPath + "/citycategory",
    updateCityCat: (forProd) ? prodPath + "/updateCityCat" : localPath + "/cityCatMap/edit",
    listPolicyBundle: (forProd) ? prodPath + "/listPolicyBundle" : localPath + "/listBenefitBundle",
    createPolicyBundle: (forProd) ? prodPath + "/createPolicyBundle" : localPath + "/benefitbundle",
    updatePolicyBundle: (forProd) ? prodPath + "/updatePolicyBundle" : localPath + "/benefitbundle",
    deletePolicyBundle: (forProd) ? prodPath + "/deletePolicyBundle" : localPath + "/benefitbundle/delete",
    getPolicyBundle: (forProd) ? prodPath + "/getPolicyBundleDetails" : localPath + "/getBenefitBundle",
    getModelPolicyBundle: (forProd) ? prodPath + "/getPolicyBundle" : localPath + "/listBundleRequirement",
    production: forProd,
    companyId: (forProd) ? id : '104'
}

