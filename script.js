
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
var nextArrival = "";
var formatTime = $("#timeTrain").val();
var minAway = "";
var newFreq = "";

var a = moment([06]);
var b = moment([04]);
var duration = moment.duration(a.diff(b));
var hours = duration.asHours();
console.log(hours); // time difference in hours

// var currentTime = moment().format('hh' + ':' + 'mm');
var trainTime = moment().format('LT');
var nextTrain = moment.duration()

console.log(formatTime);
// console.log(currentTime);


// console.log(moment([2007, 0, 29]).toNow('m'));

$("#addTrain").on("click", function() {
    newTrain = $("#trainName").val();
    newDest = $("#trainDes").val();
    newTime = $("#timeTrain").val();
    newFreq = $("#trainFreq").val();

    // var timeOne = newTime.text(moment().format('LT'));
    // var timeTwo = newTime
    
    database.ref().push({
        newTrain: newTrain,
        newDest: newDest,
        newTime: newTime,
        newFreq: newFreq
    });

});

database.ref().on("child_added", function(childSnap) {
    // console.log(childSnap.val().newTrain);
    // console.log(childSnap.val().newDest);
    // console.log(childSnap.val().newTime);
    // console.log(childSnap.val().newFreq);

    $("#trainSch").append("<tr><th scope='row'>" + childSnap.val().newTrain + "</th><td>" 
    + childSnap.val().newDest + "</td><td>" 
    + childSnap.val().newFreq + "</td><td>" 
    + childSnap.val().newTime + "</td>");

    var storeTime = childSnap.val().newTime;
    var timeNow = moment().format('hh' + ':' + 'mm');
    // var convertTime = moment(storeTime, timeFormat);
    console.log(timeNow);


})

$("#test").text(hours);

