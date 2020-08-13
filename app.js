// Instance Variables
var user = {
  name: '', age: '', level: '', type: ''
};
var resultsPage = [];
var videos = [];
var workoutId = ['workoutResults1', 'workoutResults2', 'workoutResults3'];

// List of appropriate workouts based on user selected difficulty
var upperBeg = ["Kneeling Pushups", "Shoulder Taps", "Crunches"];
var upperInt = ["Regular Pushups", "Supermans", "Leg Raises"];
var upperAdv = ["Diamond Pushups", "Dips", "V-Ups"];
var lowerBeg = ["Glute Briges", "Lunges", "Crunches"];
var lowerInt = ["Donkey Kicks", "box jumps", "leg Raises"];
var lowerAdv = ["Deadlifts", "Pistols", "V-Ups"];

// The corresponding embeded videos
var upperBegVid = ["https://www.youtube.com/embed/wc-W05Gi9hU", "https://www.youtube.com/embed/gWHQpMUd7vw", "https://www.youtube.com/embed/HiRsmHH7psA"];
var upperIntVid = ["https://www.youtube.com/embed/v9LABVJzv8A", "https://www.youtube.com/embed/67rgxYNKbZY", "https://www.youtube.com/embed/_OQaO65Vdzs"];
var upperAdv = ["https://www.youtube.com/embed/SwoNNo4W1OU", "https://www.youtube.com/embed/vhXqTx7JYSs", "https://www.youtube.com/embed/-JIwvMSk4vo"];
var lowerBegVid = ["https://www.youtube.com/embed/N48d7sm8dbU", "https://www.youtube.com/embed/UpyDdQjBTa0", "https://www.youtube.com/embed/HiRsmHH7psA"];
var lowerIntVid = ["https://www.youtube.com/embed/SJ1Xuz9D-ZQ", "https://www.youtube.com/embed/52r_Ul5k03g", "https://www.youtube.com/embed/_OQaO65Vdzs"];
var lowerAdvVid = ["https://www.youtube.com/embed/HtHxnWmMgzM", "https://www.youtube.com/embed/qDcniqddTeE", "https://www.youtube.com/embed/-JIwvMSk4vo"];

// Method important to get the user data from the form
function formData() {
  event.preventDefault();
  var name = document.getElementsByName('name')[0].value;
  user.name = name;
  var age = document.getElementsByName('age')[0].value;
  user.age = age;
  var fitnessLevel = document.getElementsByName('level');
  for (var i = 0; i < fitnessLevel.length; i++) {
    if (fitnessLevel[i].checked) {
      user.level = fitnessLevel[i].value;
    }
  }
  var workoutType = document.getElementsByName('type');
  for (var i = 0; i < workoutType.length; i++) {
    if (workoutType[i].checked) {
      user.type = workoutType[i].value;
    }
  }
  // Stores the data as a JSON string being mapped to userData in local storage
  localStorage.setItem('userData', JSON.stringify(user));
  genWorkout();
}

// generates workout based on user data and stores the appropriate arrays as a JSON string in local storage
function genWorkout() {
  if (user.type === 'Upper' && user.level === 'Beginner') {
    localStorage.setItem('workoutData', JSON.stringify(upperBeg));
    localStorage.setItem('workoutVideo', JSON.stringify(upperBegVid));
  }
  else if (user.type === 'Upper' && user.level === 'Intermediate') {
    localStorage.setItem('workoutData', JSON.stringify(upperInt));
    localStorage.setItem('workoutVideo', JSON.stringify(upperIntVid));
  }
  else if (user.type === 'Upper' && user.level === 'Expert') {
    localStorage.setItem('workoutData', JSON.stringify(upperAdv));
    localStorage.setItem('workoutVideo', JSON.stringify(upperAdvVid));
  }
  else if (user.type === 'lower' && user.level === 'Beginner') {
    localStorage.setItem('workoutData', JSON.stringify(lowerBeg));
    localStorage.setItem('workoutVideo', JSON.stringify(lowerBegVid));
  }
  else if (user.type === 'lower' && user.level === 'Intermediate') {
    localStorage.setItem('workoutData', JSON.stringify(lowerInt));
    localStorage.setItem('workoutVideo', JSON.stringify(lowerIntVid));
  }
  else {
    localStorage.setItem('workoutData', JSON.stringify(lowerAdv));
    localStorage.setItem('workoutVideo', JSON.stringify(lowerAdvVid));
  }
  // Allows the page to redirect to result
  window.location = 'result.html';
}
// Returns the element that has this ID attribute
document.getElementById('clickMe');
// Attaches event handler to the document
document.addEventListener('submit', formData);

function createWorkoutPage() {
  // Data is retrieved by parsing the JSON string
  resultsPage = JSON.parse(localStorage.getItem('workoutData'));
  videos = JSON.parse(localStorage.getItem('workoutVideo'));
  user = JSON.parse(localStorage.getItem('userData'));
  doName();
  doResults(resultsPage);
  doVideo(resultsPage, videos);
}

// Method responsible for displaying the workouts in the black box
function doResults(resultsPage) {
  for (var i = 0; i < resultsPage.length; i++) {
    // Returns the element with the ID attribute resultsTitle
    var outlineBox = document.getElementById('resultsTitle');
    // HTML element created
    var outline = document.createElement('div');
    outline.setAttribute('id', 'exerciseList');
    // Sets the HYML content 
    outline.innerHTML = resultsPage[i] + ' for 8-12 reps';
    // Appends node as the last child of a node
    outlineBox.appendChild(outline);
  }
}

function doVideo(resultsPage, videos) {
  for (var i = 0; i < resultsPage.length; i++) {
    // Returns the element that has the ID attribute to this specific value
    var workoutContainer = document.getElementById('workoutResults');
    // Creates the HTML element
    var vidContainer = document.createElement('div');
    // Adds the specified attribute to the specified elements, giving it the value 
    vidContainer.setAttribute('class', 'workoutFrame');
    vidContainer.setAttribute('id', workoutId[i]);
    var video = document.createElement('iframe');
    // Adds the specified attribute to the specified elements, giving it the value   
    video.setAttribute('class', 'iframeSizing');
    // Assigns appropriate embeded youtube link based on index in videos array
    video.src = videos[i];
    // Appends node as the last child of a node
    workoutContainer.appendChild(vidContainer);
    vidContainer.appendChild(video);
  }
}
function doName() {
  var getName = document.getElementById('showName');
  var addName = document.createElement('p');
  // Sets the HYML content
  addName.innerHTML = "YO " + user.name + ", it's time to start grinding!";
  // Appends node as the last child of a node
  getName.appendChild(addName);
}