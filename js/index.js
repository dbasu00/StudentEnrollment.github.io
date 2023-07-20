/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


var jpdBaseURL = "http:api.login2explore.com:5577";
var jpdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var studentDBName = "STUDENT-DB";
var studentRelationName = "StudentData";
var connToken = "90931424|-31949324424714376|90950039";

$("#rollno").focus();

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);
}

function getStudentJsonObj(){
    var rollno = $("#rollno").val();
    var jsonStr = {
        id: rollno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#name").val(record.name);
    $("#cclass").val(record.cclass);
    $("#bdate").val(record.bdate);
    $("#address").val(record.address);
    $("#edate").val(record.edate);
}

function resetForm(){
    $("#rollno").val("");
    $("#name").val("");
    $("#cclass").val("");
    $("#bdate").val("");
    $("#address").val("");
    $("#edate").val("");
    $("#rollno").prop("disabled",false);
    $("#save").prop("disabled",true);
    $("#change").prop("disabled",true);
    $("#reset").prop("disabled",true);
    $("#rollno").focus();
}

function validateData(){
    var rollno, name, cclass, bdate, address, edate;
    rollno = $("#rollno").val();
    name = $("#name").val();
    cclass = $("#cclass").val();
    bdate = $("#bdate").val();
    address = $("#address").val();
    edate = $("#edate").val();
    
    if (rollno ===""){
        alert("Student roll number is missing");
        $("#rollno").focus();
        return "";
    }
    if (name ===""){
        alert("Student name is missing");
        $("#name").focus();
        return "";
    }
    if (cclass ===""){
        alert("Student class is missing");
        $("#cclass").focus();
        return "";
    }
    if (bdate ===""){
        alert("Student bdate is missing");
        $("#bdate").focus();
        return "";
    }
    if (address ===""){
        alert("Student address is missing");
        $("#address").focus();
        return "";
    }
    if (edate ===""){
        alert("Student edate is missing");
        $("#edate").focus();
        return "";
    }
    
    var jsonStrObj = {
        id: rollno,
        name: name,
        class: cclass,
        bdate: bdate,
        address: address,
        edate: edate
    };
    return JSON.stringify(jsonStrObj);
}

function getStudent(){
    var studentIdJsonObj = getStudentJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken,studentDBName,studentRelationName,studentIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    if(resJsonObj.status === 4000){
        $("#save").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#name").focus();
    }
    else if (resJsonObj.status === 200){
        $("#rollno").prop("disabled",true);
        fillData(resJsonObj);
        $("#save").prop("disabled",true);
        $("#change").prop("disabled",true);
        $("#reset").prop("disabled",true);
        $("#name").focus();
    }
}

function saveData(){
    var jsonStrObj = validateData();
    if(jsonStrObj === ""){
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, studentDBName,studentRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#rollno").focus();
}

function changedata(){
    $("#change").prop("disabled", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERequest(connToken, jsonChg, studentDBName,studentRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $("#rollno").focus();
}