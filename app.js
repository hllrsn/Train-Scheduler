//Initialize Firebase
var config = {
    apiKey: "AIzaSyCToCo5O2EHWq5ig7lftgvLVqj3T80tPXo",
    authDomain: "my-first-project-19d56.firebaseapp.com",
    databaseURL: "https://my-first-project-19d56.firebaseio.com",
    projectId: "my-first-project-19d56",
    storageBucket: "",
    messagingSenderId: "1074221752732"
  };
  firebase.initializeApp(config);

var database = firebase.database();

//Button for adding trains
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    //Grabs user input
    var trainName = $("#trainNameInput").val().trim();
    var trainDestination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#trainInput").val().trim(), "HH:mm").format("X");
    var trainFrequency = $("#frequencyInput").val().trim();

    //Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        train: firstTrain,
        frequency: trainFrequency
    };

    //Uploads train data to the database
    database.ref().push(newTrain);

    //Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.train);
    console.log(newTrain.frequency);

    //Alert
    alert("Train successfully added");

    //Clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#trainInput").val("");
    $("#frequencyInput").val("");
});

//Creates Firebase event for adding train to the database and a row in the html when user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    //Stores everything into a variable
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().role;
    var firstTrain = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().rate;
