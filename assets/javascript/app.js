 var config = {
    apiKey: "AIzaSyC5OdavNiAmpouHK0DuQwyaYX168J_FPes",
    authDomain: "train-scheduler-5aef6.firebaseapp.com",
    databaseURL: "https://train-scheduler-5aef6.firebaseio.com",
    projectId: "train-scheduler-5aef6",
    storageBucket: "train-scheduler-5aef6.appshot.com",
    messagingSenderId: "395125162332"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
  	event.preventDefault();

  	var trainName = $("#train-name-input").val().trim();
  	var trainDestination = $("#destination-input").val().trim();
  	var firstTrain = $("#start-input").val().trim();
  	var trainFrequency = $("#frequency-input").val().trim();

  	var newTrain = {
  		name: trainName,
  		destination: trainDestination,
  		start: firstTrain,
  		frequency: trainFrequency,
  	}

  	database.ref().push(newTrain);

  	console.log(newTrain.name);
  	console.log(newTrain.destination);
  	console.log(newTrain.start);
  	console.log(newTrain.frequency);

  	$("#train-name-input").val("");
  	$("#destination-input").val("");
  	$("#start-input").val("");
  	$("#frequency-input").val("");

    return false;
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log('firstTrain: ', firstTrain);
    console.log('trainFrequency: ', trainFrequency);



      var currentTime = moment();
      console.log("CURRENT TIME: ", moment(currentTime).format("HH:mm"));
      var currentTimeConverted = moment(currentTime).format("X");
      console.log("CURRENT TIME CONVERTED TO UNIX: ", currentTimeConverted);
      var subtractYear = moment(firstTrain, 'hh:mm').subtract(1, 'years');
      var timeDiff = currentTime.diff(moment(subtractYear), 'minutes');
      var remainder = timeDiff % trainFrequency;
      var minutesUntilTrain = trainFrequency - remainder;
      var nextTrain = currentTime.add(minutesUntilTrain, 'minutes').format('hh:mm'); 
      console.log("Next train:", minutesUntilTrain); 
       

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainFrequency + "</td><td>" + nextTrain + "</td><td>" + minutesUntilTrain + "</td></tr>");
});


