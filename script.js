
var config = {
    apiKey: "AIzaSyBaE3tp7HDwr5dhVoCUeTl6JMTLbCUeuk4",
    authDomain: "train-times-ceda4.firebaseapp.com",
    databaseURL: "https://train-times-ceda4.firebaseio.com",
    projectId: "train-times-ceda4",
    storageBucket: "train-times-ceda4.appspot.com",
    messagingSenderId: "599259899697"
};
firebase.initializeApp(config);

var database = firebase.database();

var newTrain = "";
var newDest = "";
var newTime = "";
var newFreq = "";

if ($("#trainName").val() === "" ) {
    $("#addTrain").attr('disabled', 'disabled');
} 

$("#trainName").keyup(function() {
    $("#addTrain").css("opacity", "1");
    $("#addTrain").css("cursor", "pointer");
    $("#addTrain").removeAttr('disabled');  
})

$("#trainDes").keyup(function() {
    $("#addTrain").css("opacity", "1");
    $("#addTrain").css("cursor", "pointer");
    $("#addTrain").removeAttr('disabled');    
})

$("#timeTrain").keyup(function() {
    $("#addTrain").css("opacity", "1");
    $("#addTrain").css("cursor", "pointer");
    $("#addTrain").removeAttr('disabled');    
})

$("#trainFreq").keyup(function() {
    $("#addTrain").css("opacity", "1");
    $("#addTrain").css("cursor", "pointer");
    $("#addTrain").removeAttr('disabled');    
})

$("#addTrain").on("click", function () {
    newTrain = $("#trainName").val();
    newDest = $("#trainDes").val();
    newTime = $("#timeTrain").val();
    newFreq = $("#trainFreq").val();
    
    database.ref().push({
        newTrain: newTrain,
        newDest: newDest,
        newTime: newTime,
        newFreq: newFreq
    });

});

database.ref().on("child_added", function (childSnap) {
    console.log(childSnap.val().newTrain);
    console.log(childSnap.val().newDest);
    console.log(childSnap.val().newTime);
    console.log(childSnap.val().newFreq);

    var tFreq = childSnap.val().newFreq;

    var userTime = childSnap.val().newTime;

    var userTimeConvert = moment(userTime, "HH:mm").subtract(1, 'years');

    var timeNow = moment();

    var timeDiff = moment().diff(moment(userTimeConvert), "minutes");


    var newRem = timeDiff % tFreq;


    var newArrival = tFreq - newRem;


    var nextArrival = moment().add(newArrival, "minutes");
    var arrivalFormat = moment(nextArrival).format("hh:mm");


    $("#trainSch").append("<tr><th scope='row'>" + childSnap.val().newTrain + "</th><td>"
        + childSnap.val().newDest + "</td><td>"
        + childSnap.val().newFreq + "</td><td>"
        + arrivalFormat + "</td><td>" 
        + newArrival + "</td>");
})


