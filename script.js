/* =====================================
   STUDENT OS - CORE JAVASCRIPT
===================================== */
const startMenu =
   document.getElementById("startMenu"); 


document.getElementById("start")
   .onclick = () => {


      startMenu.classList.toggle("hidden");


   };
const songs = [

   {
      name: "Focus Session",
      artist: "Student OS",
      file: "music/focus.mp3",
      cover: "images/focus.jpg"
   },

   {
      name: "Rain Sounds",
      artist: "Student OS",
      file: "music/rain.mp3",
      cover: "images/rain.jpg"
   },

   {
      name: "Piano Study",
      artist: "Student OS",
      file: "music/piano.mp3",
      cover: "images/piano.jpg"
   },

   {
      name: "Coffee Shop",
      artist: "Student OS",
      file: "music/coffee.mp3",
      cover: "images/coffee.jpg"
   }

];

let currentSong = 0;
// ===============================
// CLOCK
// ===============================


function updateClock() {

   let now = new Date();


   document.getElementById("clock").innerHTML =
      now.toLocaleTimeString([], {

         hour: "2-digit",
         minute: "2-digit"

      });


}


setInterval(updateClock, 1000);

updateClock();


let calendarDate = new Date();

let selectedDate = new Date();

let events =
JSON.parse(
localStorage.getItem("calendarEvents")
) || [];
function renderCalendar(){

let box =
document.getElementById("calendarContainer");

if(!box) return;


let year =
calendarDate.getFullYear();

let month =
calendarDate.getMonth();


document.getElementById("calendarTitle").innerHTML =
new Date(year,month)
.toLocaleString(
"default",
{
month:"long",
year:"numeric"
}
);



let first =
new Date(year,month,1)
.getDay();


let total =
new Date(year,month+1,0)
.getDate();


let html =
`
<div class="calendar-grid">

<div>Sun</div>
<div>Mon</div>
<div>Tue</div>
<div>Wed</div>
<div>Thu</div>
<div>Fri</div>
<div>Sat</div>
`;


for(let i=0;i<first;i++){

html += `<div></div>`;

}


for(let day=1;day<=total;day++){


let date =
`${year}-${month+1}-${day}`;


let hasEvent =
events.some(
e=>e.date==date
);


html += `

<div 
class="calendar-day ${hasEvent?"has-event":""}"
onclick="selectDay('${date}')">

${day}

</div>

`;

}


html += "</div>";

box.innerHTML = html;

}
function changeMonth(amount){

calendarDate.setMonth(
calendarDate.getMonth()+amount
);

renderCalendar();

}


function goToday(){

calendarDate=new Date();

renderCalendar();

}
function selectDay(date){

selectedDate = date;

notify(
"Selected "+date
);

}
function saveEvent(){

let title =
document.getElementById("eventTitle").value;


let time =
document.getElementById("eventTime").value;


let type =
document.getElementById("eventType").value;


if(!title || !selectedDate){

alert("Choose a date first");

return;

}


events.push({

title:title,

date:selectedDate,

time:time,

type:type

});


localStorage.setItem(

"calendarEvents",

JSON.stringify(events)

);


renderCalendar();

showEvents();


notify("Event added");


}
function showEvents(){

let list =
document.getElementById("eventList");


if(!list)return;


list.innerHTML="";


events.forEach((event,index)=>{


list.innerHTML += `

<div class="calendar-event">

<b>${event.title}</b>

<br>

${event.date}

${event.time || ""}


<button onclick="deleteEvent(${index})">

❌

</button>


</div>

`;

});


}
function deleteEvent(index){

events.splice(index,1);


localStorage.setItem(

"calendarEvents",

JSON.stringify(events)

);


renderCalendar();

showEvents();

}
function importCalendar(event){

let file =
event.target.files[0];

if(file){

notify(
"Imported "+file.name
);

}

}


function exportCalendar(){

let data =
JSON.stringify(events);


let blob =
new Blob(
[data],
{
type:"application/json"
}
);


let link =
document.createElement("a");


link.href =
URL.createObjectURL(blob);


link.download =
"student-os-calendar.json";


link.click();

}

// ===============================
// WINDOW SYSTEM
// ===============================


const appWindow =
   document.getElementById("window");


const windowTitle =
   document.getElementById("windowTitle");


const windowContent =
   document.getElementById("windowContent");



let currentApp = "";





function openWindow(app) {
appWindow.style.width = "700px";
appWindow.style.height = "450px";
appWindow.style.left = "250px";
appWindow.style.top = "100px";
appWindow.style.width = "700px";
appWindow.style.height = "450px";
appWindow.style.left = "250px";
appWindow.style.top = "100px";
   currentApp = app;

   addRunningApp(app);

   notify(
      app + " opened"
   );
   appWindow.classList.remove("hidden");


   windowTitle.innerHTML =
      app.toUpperCase();



   loadApp(app);

   if (app == "music") {


      windowContent.innerHTML = `



`;



   }

}



function searchApps(){

    const input =
    document.getElementById("taskSearch");

    const value =
    input.value.toLowerCase();

    let found = null;

    document.querySelectorAll(".icon").forEach(icon=>{

        const app = icon.dataset.app.toLowerCase();

        const visible = app.includes(value);

        icon.style.display = visible ? "block" : "none";

        if(visible && !found){
            found = icon.dataset.app;
        }

    });

    input.onkeydown = function(e){

        if(e.key==="Enter" && found){

            openWindow(found);

            input.value="";
            searchApps();

        }

    };

}



function closeWindow(){

    appWindow.classList.add("hidden");

    const button = document.getElementById(currentApp + "Btn");

    if(button){
        button.remove();
    }

    windowContent.innerHTML = "";
    currentApp = "";

}




document
   .getElementById("close")
   .onclick = closeWindow;







// ===============================
// MINIMIZE
// ===============================


document
   .getElementById("minimize")
   .onclick = () => {


      appWindow.classList.add("hidden");


   };







// ===============================
// MAXIMIZE
// ===============================


document
   .getElementById("maximize")
   .onclick = () => {


      if (appWindow.style.width == "100%") {


         appWindow.style.width = "700px";

         appWindow.style.height = "450px";

         appWindow.style.left = "250px";

         appWindow.style.top = "100px";


      }

      else {


         appWindow.style.width = "100%";

         appWindow.style.height = "calc(100% - 70px)";

         appWindow.style.left = "0";

         appWindow.style.top = "0";


      }



   };



let draggedIcon = null;
let iconOffsetX = 0;
let iconOffsetY = 0;

document.querySelectorAll(".icon").forEach(icon => {

    icon.addEventListener("mousedown", function(e){

        draggedIcon = icon;

        iconOffsetX = e.clientX - icon.offsetLeft;
        iconOffsetY = e.clientY - icon.offsetTop;

        icon.style.cursor = "grabbing";
    });

});

document.addEventListener("mousemove", function(e){

    if(!draggedIcon) return;

    draggedIcon.style.left =
        (e.clientX - iconOffsetX) + "px";

    draggedIcon.style.top =
        (e.clientY - iconOffsetY) + "px";

});

document.addEventListener("mouseup", function(){

    if(!draggedIcon) return;

    draggedIcon.style.cursor = "grab";

    draggedIcon = null;

});

// ===============================
// DESKTOP ICONS
// ===============================


document
   .querySelectorAll(".icon")
   .forEach(icon => {


      icon.onclick = () => {


         openWindow(
            icon.dataset.app
         );


      };


   });









// ===============================
// DRAG WINDOW
// ===============================


let dragging = false;

let offsetX;

let offsetY;



const header =
   document.querySelector(".window-header");



header.onmousedown = (e) => {


   dragging = true;


   offsetX =
      e.clientX -
      appWindow.offsetLeft;


   offsetY =
      e.clientY -
      appWindow.offsetTop;


};





document.onmousemove = (e) => {


   if (!dragging)
      return;


   appWindow.style.left =
      (e.clientX - offsetX) + "px";


   appWindow.style.top =
      (e.clientY - offsetY) + "px";


};





document.onmouseup = () => {

   dragging = false;

};









// ===============================
// THEME SWITCH
// ===============================


document
   .getElementById("theme")
   .onclick = () => {


      document.body.classList.toggle("light");



   };










// ===============================
// APP LOADER
// ===============================



function loadApp(app) {



   if (app == "notes") {

windowContent.innerHTML = `

<div class="notes-app">

<h1>📝 Notes</h1>

<input
id="noteTitle"
type="text"
placeholder="Enter note title..."
>

<textarea
id="notesBox"
placeholder="Start typing..."
></textarea>

<div class="notes-actions">

<button onclick="saveNote()">
💾 Save Note
</button>

<button onclick="newNote()">
🆕 New Note
</button>

</div>

<hr>

<h2>Saved Notes</h2>

<div id="savedNotes"></div>

</div>

`;

showSavedNotes();

}







   if (app == "tasks") {



      windowContent.innerHTML = `

<h1>✅ Tasks</h1>

<br>


<input id="taskInput"
placeholder="New task">


<button onclick="addTask()">
Add
</button>


<ul id="taskList"></ul>


`;



      showTasks();



   }










  if (app == "calculator") {

windowContent.innerHTML = `

<div class="calculator">

<input
id="calcScreen"
class="calc-screen"
type="text"
readonly
>

<div class="calc-grid">

<button onclick="clearCalc()">C</button>
<button onclick="calcAdd('(')">(</button>
<button onclick="calcAdd(')')">)</button>
<button onclick="calcAdd('/')">÷</button>

<button onclick="calcAdd('7')">7</button>
<button onclick="calcAdd('8')">8</button>
<button onclick="calcAdd('9')">9</button>
<button onclick="calcAdd('*')">×</button>

<button onclick="calcAdd('4')">4</button>
<button onclick="calcAdd('5')">5</button>
<button onclick="calcAdd('6')">6</button>
<button onclick="calcAdd('-')">−</button>

<button onclick="calcAdd('1')">1</button>
<button onclick="calcAdd('2')">2</button>
<button onclick="calcAdd('3')">3</button>
<button onclick="calcAdd('+')">+</button>

<button onclick="calcAdd('0')">0</button>
<button onclick="calcAdd('.')">.</button>
<button onclick="backspace()">⌫</button>
<button onclick="calculate()">=</button>

</div>

</div>

`;

}









if (app == "calendar") {

windowContent.innerHTML = `

<div class="calendar-app">

<div class="calendar-top">

<button onclick="changeMonth(-1)">
◀
</button>

<h2 id="calendarTitle"></h2>

<button onclick="changeMonth(1)">
▶
</button>

</div>


<button onclick="goToday()">
Today
</button>


<div id="calendarContainer"></div>


<div class="event-panel">

<h3>Add Event</h3>

<input id="eventTitle"
placeholder="Event title">


<input id="eventTime"
type="time">


<select id="eventType">

<option value="school">📚 School</option>

<option value="exam">📝 Exam</option>

<option value="birthday">🎂 Birthday</option>

<option value="personal">⭐ Personal</option>

</select>


<button onclick="saveEvent()">
Add Event
</button>


</div>


<h3>Upcoming Events</h3>

<div id="eventList"></div>


<div class="import-area">

<label>

📂 Import Calendar

<input
type="file"
accept=".ics"
onchange="importCalendar(event)"
>

</label>


<button onclick="exportCalendar()">
Export Calendar
</button>


</div>


</div>

`;

renderCalendar();

showEvents();

}



   if (app == "files") {


      windowContent.innerHTML = `

<h1>📁 File Explorer</h1>


<br>


<div class="file-box">

<input id="fileName"
placeholder="File name">


<button onclick="createFile()">

Create

</button>


</div>



<input 
id="searchFile"
placeholder="Search files"
onkeyup="searchFiles()"
>



<div id="fileList"></div>


`;



      displayFiles();


   }




   if (app == "settings") {

windowContent.innerHTML = `

<div class="settings-app">

<h1>⚙ Settings</h1>

<br>


<h2>🎨 Appearance</h2>

<button onclick="setTheme('dark')">
🌙 Dark Mode
</button>


<button onclick="setTheme('light')">
☀️ Light Mode
</button>


<br><br>


<h2>🖼 Wallpaper</h2>


<button onclick="changeWallpaper('purple')">
🟣 Purple
</button>


<button onclick="changeWallpaper('blue')">
🔵 Blue
</button>


<button onclick="changeWallpaper('green')">
🟢 Green
</button>


<br><br>


<h2>🔔 Notifications</h2>


<label>

<input 
type="checkbox"
id="notificationToggle"
checked
>

Enable Notifications

</label>


<br><br>


<h2>🔊 Volume</h2>


<input
type="range"
min="0"
max="1"
step="0.01"
id="systemVolume"
value="1"
>


<br><br>


<h2>💾 Data</h2>


<button onclick="clearData()">

Delete Student OS Data

</button>


<br><br>


<h2>ℹ️ About</h2>

<p>
Student OS Version 1.0
</p>

<p>
Built with HTML, CSS & JavaScript
</p>


</div>

`;

}
if(app=="browser"){

windowContent.innerHTML = `

<div class="browser-app">
<div class="browser-warning">
⚠️ Some websites cannot be displayed inside Student OS Browser because they block embedded viewing.
If a website does not load, you can open it in a new browser tab.
</div>
<div class="browser-tabs">

<button onclick="newTab()">
➕
</button>

<div id="tabs"></div>

</div>


<div class="browser-toolbar">

<button onclick="browserBack()">
⬅
</button>

<button onclick="browserForward()">
➡
</button>

<button onclick="browserRefresh()">
🔄
</button>

<button onclick="browserHome()">
🏠
</button>


<input 
id="browserURL"
placeholder="Search or enter website..."
>


<button onclick="navigateBrowser()">
Go
</button>


<button onclick="bookmarkPage()">
⭐
</button>

</div>


<div class="browser-page">

<iframe 
id="browserFrame"
src="https://example.com">
</iframe>

</div>

<button onclick="openExternalBrowser()">
↗
</button>
</div>

`;

loadBrowser();

}
  
   if (app == "music") {

      windowContent.innerHTML = `

<div class="music-player">

<img
id="albumArt"
src="images/focus.jpg"
width="220"
height="220"
style="
border-radius:20px;
object-fit:cover;
box-shadow:0 15px 40px rgba(0,0,0,.4);
">

<h2 id="songName">Focus Session</h2>

<p id="artistName">Student OS Playlist</p>

<audio id="audioPlayer"></audio>

<input
type="range"
id="progressBar"
value="0"
min="0"
max="100"
>

<p>

<span id="currentTime">0:00</span>

/

<span id="duration">0:00</span>

</p>

<div>

<button onclick="previousSong()">⏮</button>

<button onclick="toggleMusic()" id="playButton">▶</button>

<button onclick="nextSong()">⏭</button>

</div>

<br>

<input

type="range"

id="volumeSlider"

min="0"

max="1"

step="0.01"

value="1"

oninput="changeVolume()"

>

<h3>Playlist</h3>

<div id="playlist"></div>

</div>

`;

      loadMusic();

   
   }
if(app=="homework"){

windowContent.innerHTML = `

<div class="homework-app">

<h1>📚 Homework</h1>

<input 
id="homeworkTitle"
placeholder="Assignment name">


<input 
id="homeworkDate"
type="date">


<select id="homeworkPriority">

<option value="high">
🔴 High
</option>

<option value="medium">
🟡 Medium
</option>

<option value="low">
🟢 Low
</option>

</select>


<button onclick="addHomework()">
➕ Add Homework
</button>


<h2>Assignments</h2>

<div id="homeworkList"></div>


</div>

`;

showHomework();

}
  if(app=="grades"){

windowContent.innerHTML = `

<div class="grades-app">

<h1>📊 Grade Calculator</h1>


<input
id="subjectName"
placeholder="Subject name">


<input
id="gradeValue"
type="number"
placeholder="Grade (%)">


<button onclick="addGrade()">
➕ Add Grade
</button>


<h2>Your Grades</h2>


<div id="gradeList"></div>


<h2 id="overallGrade">
Average: 0%
</h2>


</div>

`;

showGrades();

}


if(app=="focus"){

windowContent.innerHTML = `

<div class="focus-app">

<h1>⏱ Focus Mode</h1>


<h2 id="focusTimer">
25:00
</h2>
<div class="focusbuttons">

<button class="focusbuttons" onclick="startFocus()">
▶ Start
</button>


<button class="focusbuttons"  onclick="pauseFocus()">
⏸ Pause
</button>


<button class="focusbuttons" onclick="resetFocus()">
🔄 Reset
</button>

</div>
<br><br>


<button class="focusbuttons" onclick="startBreak()">
☕ Break
</button>


<h3>
🔥 Study Streak:
<span id="focusStreak">
0
</span>
</h3>


</div>

`;

loadFocus();

}
  
} 
let browserTabs = [];
let activeTab = -1;

function createTab(title = "New Tab", url = "https://example.com") {

    browserTabs.push({
        title,
        url
    });

    activeTab = browserTabs.length - 1;

    renderTabs();
    openTab(activeTab);
}
function renderTabs() {

    const tabs = document.getElementById("tabs");

    if (!tabs) return;

    tabs.innerHTML = "";

    browserTabs.forEach((tab, index) => {

        tabs.innerHTML += `
            <div class="browser-tab ${index === activeTab ? "active" : ""}">
                <span onclick="openTab(${index})">
                    ${tab.title}
                </span>

                <button onclick="closeTab(${index})">
                    ✕
                </button>
            </div>
        `;

    });

}
function openTab(index) {

    activeTab = index;

    const tab = browserTabs[index];

    document.getElementById("browserFrame").src = tab.url;
    document.getElementById("browserURL").value = tab.url;

    renderTabs();
}
function closeTab(index) {

    browserTabs.splice(index, 1);

    if (browserTabs.length === 0) {
        createTab();
        return;
    }

    if (activeTab >= browserTabs.length) {
        activeTab = browserTabs.length - 1;
    }

    renderTabs();
    openTab(activeTab);
}

function addRunningApp(app){

    let bar = document.getElementById("runningApps");

    let existing = document.getElementById(app + "Btn");

    if(existing){
        existing.classList.add("active");
        return;
    }

    let button = document.createElement("div");

    button.id = app + "Btn";
    button.className = "app-button";
    button.textContent = app;

    button.onclick = () => {
        openWindow(app);
    };

    bar.appendChild(button);

}
   // ===============================
   // TASK APP
   // ===============================


   let tasks =
      JSON.parse(
         localStorage.getItem("tasks")
      ) || [];





   function addTask() {


      let input =
         document.getElementById("taskInput");


      if (input.value == "")
         return;



      tasks.push(input.value);



      localStorage.setItem(
         "tasks",
         JSON.stringify(tasks)
      );



      input.value = "";


      showTasks();


   }






   function showTasks() {


      let list =
         document.getElementById("taskList");


      if (!list)
         return;



      list.innerHTML = "";



      tasks.forEach((task, index) => {


         list.innerHTML += `

<li>

${task}

<button onclick="removeTask(${index})">

❌

</button>

</li>


`;


      });


   }





   function removeTask(index) {


      tasks.splice(index, 1);


      localStorage.setItem(
         "tasks",
         JSON.stringify(tasks)
      );



      showTasks();


   }
   function addRunningApp(app) {


      let bar =
         document.getElementById(
            "runningApps"
         );



      if (document.getElementById(app + "Btn"))
         return;



      let button =
         document.createElement("div");



      button.id =
         app + "Btn";


      button.className =
         "app-button";


      button.innerHTML =
         app;



      button.onclick = () => {

         openWindow(app);

      };



      bar.appendChild(button);


   }







   // ===============================
   // NOTIFICATIONS
   // ===============================



   function notify(text) {


      let box =
         document.createElement("div");


      box.className = "notification";


      box.innerHTML =

         "🔔 " + text;



      document
         .querySelector(".desktop")
         .appendChild(box);



      setTimeout(() => {

         box.remove();

      }, 3000);



   }









   // ===============================
   // CALCULATOR
   // ===============================


   function calcAdd(number) {


      document.getElementById("calcScreen")
         .value += number;


   }



   
   function calculate(){

let screen =
document.getElementById("calcScreen");

try{

screen.value =
eval(screen.value);

}catch{

screen.value = "Error";

}

}



   function clearCalc() {


      document.getElementById("calcScreen")
         .value = "";


   }
   // ===============================
   // FILE EXPLORER
   // ===============================

let currentNote = null;
   let files =

      JSON.parse(
         localStorage.getItem("files")
      ) || [];






   function createFile() {


      let input =
         document.getElementById(
            "fileName"
         );



      if (input.value == "")
         return;



      files.push({

         name: input.value,

         content: ""

      });



      localStorage.setItem(

         "files",

         JSON.stringify(files)

      );



      input.value = "";


      displayFiles();
   }

   notify("File created");









   function displayFiles(list = files) {


      let area =
         document.getElementById(
            "fileList"
         );



      if (!area)
         return;



      area.innerHTML = "";



      list.forEach((file, index) => {


         area.innerHTML += `


<div class="file">


<span>
${file.type==="note" ? "📝" : "📄"} ${file.name}
</span>


<button onclick="deleteFile(${index})">

Delete

</button>


</div>


`;


      });


   }








   function deleteFile(index) {


      files.splice(index, 1);



      localStorage.setItem(

         "files",

         JSON.stringify(files)

      );



      displayFiles();



      notify("File deleted");


   }








   function searchFiles(){

let value =
document.getElementById(
"searchFile"
).value.toLowerCase();


let result =
files.filter(file=>

file.name
.toLowerCase()
.includes(value)

);


displayFiles(result);

}



// ===============================
// MUSIC PLAYER
// ===============================

function toggleMusic(){

    const player = document.getElementById("audioPlayer");
    const button = document.getElementById("playButton");

    if(player.paused){

        player.play();

        button.innerHTML = "⏸";

    }else{

        player.pause();

        button.innerHTML = "▶";

    }

}


function selectSong(index){

    currentSong = index;

    loadMusic();

    const player = document.getElementById("audioPlayer");

    player.play();

    document.getElementById("playButton").innerHTML = "⏸";

}
function updateProgress(){

    const player = document.getElementById("audioPlayer");

    if(!player.duration) return;

    document.getElementById("progressBar").value =
        (player.currentTime/player.duration)*100;

    document.getElementById("currentTime").innerHTML =
        formatTime(player.currentTime);

}

function formatTime(seconds){

    if(isNaN(seconds)) return "0:00";

    let minutes = Math.floor(seconds/60);
    let secs = Math.floor(seconds%60);

    if(secs < 10){

        secs = "0"+secs;

    }

    return `${minutes}:${secs}`;

}
function previousSong(){

    currentSong--;

    if(currentSong < 0){

        currentSong = songs.length - 1;

    }

    loadMusic();

    const player = document.getElementById("audioPlayer");

    player.play();

    document.getElementById("playButton").innerHTML = "⏸";

}
function nextSong(){

    currentSong++;

    if(currentSong >= songs.length){

        currentSong = 0;

    }

    loadMusic();

    const player = document.getElementById("audioPlayer");

    player.play();

    document.getElementById("playButton").innerHTML = "⏸";

}
function loadMusic(){

    const player = document.getElementById("audioPlayer");

    if(!player) return;

    const song = songs[currentSong];

    document.getElementById("songName").innerHTML = song.name;
    document.getElementById("artistName").innerHTML = song.artist;
    document.getElementById("albumArt").src = song.cover;

    player.src = song.file;
    player.load();

    const playlist = document.getElementById("playlist");

    playlist.innerHTML = "";

    songs.forEach((song,index)=>{

        playlist.innerHTML += `
            <button
                class="${index===currentSong ? "active-song" : ""}"
                onclick="selectSong(${index})">
                🎵 ${song.name}
            </button>
        `;

    });

    player.onended = nextSong;

    player.ontimeupdate = updateProgress;

    player.onloadedmetadata = function(){

        document.getElementById("duration").innerHTML =
            formatTime(player.duration);

    };

    document.getElementById("progressBar").oninput = function(){

        player.currentTime =
            (this.value/100) * player.duration;

    };

}


function playMusic(){

const player =
document.getElementById("audioPlayer");

if(player){

player.play();

notify("Playing music");

}

}



function pauseMusic(){

const player =
document.getElementById("audioPlayer");

if(player){

player.pause();

notify("Music paused");

}

}



function changeVolume(){

const player =
document.getElementById("audioPlayer");

const slider =
document.getElementById("volumeSlider");


if(player && slider){

player.volume =
slider.value;

}

}
function backspace(){

let screen =
document.getElementById("calcScreen");

screen.value =
screen.value.slice(0,-1);

}
function showSavedNotes(){

let area =
document.getElementById("savedNotes");

if(!area) return;


area.innerHTML = "";


files
.filter(file => file.type === "note")
.forEach(file => {


area.innerHTML += `

<div class="note-item">

<span>
📝 ${file.name}
</span>


<div class="note-buttons">

<button onclick="openNote('${file.name}')">
Open
</button>


<button onclick="deleteNote('${file.name}')">
Delete
</button>

</div>

</div>

`;

});

}
function saveNote(){

let title =
document.getElementById("noteTitle").value.trim();

let text =
document.getElementById("notesBox").value;

if(title===""){
alert("Please enter a note title.");
return;
}

let existing =
files.find(f=>f.type==="note" && f.name===title);

if(existing){

existing.content=text;

}else{

files.push({

type:"note",

name:title,

content:text

});

}

localStorage.setItem(
"files",
JSON.stringify(files)
);

showSavedNotes();

displayFiles();

notify("Note saved");

}
function showSavedNotes(){

let area =
document.getElementById("savedNotes");

if(!area) return;

area.innerHTML="";

files
.filter(file=>file.type==="note")
.forEach(file=>{

area.innerHTML += `

<div class="note-item">

<div>

<strong>📝 ${file.name}</strong>

</div>

<div class="note-buttons">

<button onclick="openNote('${file.name}')">

Open

</button>

<button onclick="deleteNote('${file.name}')">

Delete

</button>

</div>

</div>

`;
});

}

function openNote(name){

let note =
files.find(f=>f.name===name);

if(!note) return;

document.getElementById("noteTitle").value =
note.name;

document.getElementById("notesBox").value =
note.content;

currentNote=name;

}
function deleteNote(name){

files =
files.filter(file=>file.name!==name);

localStorage.setItem(
"files",
JSON.stringify(files)
);

showSavedNotes();

displayFiles();

notify("Note deleted");

}
function newNote(){

currentNote=null;

document.getElementById("noteTitle").value="";

document.getElementById("notesBox").value="";

}
function renderCalendar(){

const calendar =
document.getElementById("calendarContainer");

if(!calendar) return;

const today = new Date();

const year = today.getFullYear();

const month = today.getMonth();

const firstDay =
new Date(year,month,1).getDay();

const days =
new Date(year,month+1,0).getDate();

const names = [
"Sun","Mon","Tue","Wed","Thu","Fri","Sat"
];

let html =
'<div class="calendar-grid">';

names.forEach(day=>{

html += `<div class="calendar-header">${day}</div>`;

});

for(let i=0;i<firstDay;i++){

html += "<div></div>";

}

for(let d=1; d<=days; d++){

let todayClass =
d===today.getDate()
? "calendar-today"
: "";

html +=
`<div class="calendar-day ${todayClass}">${d}</div>`;

}

html += "</div>";

calendar.innerHTML = html;

}
function importCalendar(event){

const file =
event.target.files[0];

if(!file) return;

notify("Imported: " + file.name);

}
// ===============================
// SETTINGS
// ===============================


function setTheme(mode){

    if(mode=="light"){

        document.body.classList.add("light");

        localStorage.setItem(
            "theme",
            "light"
        );

    }

    else{

        document.body.classList.remove("light");

        localStorage.setItem(
            "theme",
            "dark"
        );

    }


    notify(
        mode+" mode enabled"
    );

}




function changeWallpaper(color){


    let desktop =
    document.querySelector(".desktop");


    if(color=="purple"){

        desktop.style.background =
        "linear-gradient(135deg,#020617,#312e81,#7e22ce)";

    }


    if(color=="blue"){

        desktop.style.background =
        "linear-gradient(135deg,#0f172a,#0369a1,#38bdf8)";

    }


    if(color=="green"){

        desktop.style.background =
        "linear-gradient(135deg,#022c22,#047857,#34d399)";

    }


    localStorage.setItem(
        "wallpaper",
        color
    );


}


let browserHistory=[];

let browserIndex=-1;


let bookmarks =
JSON.parse(localStorage.getItem("bookmarks"))
|| [];


function loadBrowser(){

createTab("Home");

}




function navigateBrowser(){

    let input =
    document.getElementById("browserURL");


    let url =
    input.value.trim();


    if(!url){
        return;
    }


    if(!url.startsWith("http")){

        url =
        "https://www.google.com/search?q="
        + encodeURIComponent(url);

    }


    showBrowserWarning();


    openBrowserURL(url);

}



function openBrowserURL(url){

let frame =
document.getElementById("browserFrame");


frame.src=url;


browserHistory.push(url);

browserIndex =
browserHistory.length-1;


}



function browserBack(){

if(browserIndex>0){

browserIndex--;

document.getElementById("browserFrame")
.src =
browserHistory[browserIndex];

}

}




function browserForward(){

if(browserIndex < browserHistory.length-1){

browserIndex++;

document.getElementById("browserFrame")
.src =
browserHistory[browserIndex];

}

}




function browserRefresh(){

let frame=
document.getElementById("browserFrame");

frame.src=frame.src;

}




function browserHome(){

openBrowserURL(
"https://www.wikipedia.org"
);

}



function bookmarkPage(){

let url =
document.getElementById("browserFrame").src;


bookmarks.push(url);


localStorage.setItem(
"bookmarks",
JSON.stringify(bookmarks)
);


notify("Page bookmarked ⭐");

}

function clearData(){

    if(confirm(
        "Delete all Student OS data?"
    )){


        localStorage.clear();


        location.reload();


    }

}
//================
//BROWSER
//================
  function showBrowserWarning(){

    let warning =
    document.querySelector(".browser-warning");

    if(warning){

        warning.style.display="block";

        setTimeout(()=>{

            warning.style.display="none";

        },8000);

    }

}
function openExternalBrowser(){

    let url =
    document.getElementById("browserFrame").src;


    window.open(url,"_blank");

    notify(
        "Opened in external browser"
    );

}
let homework =
JSON.parse(
localStorage.getItem("homework")
)
|| [];



function addHomework(){

let title =
document.getElementById("homeworkTitle").value;


let date =
document.getElementById("homeworkDate").value;


let priority =
document.getElementById("homeworkPriority").value;


if(!title){
    return;
}


homework.push({

title:title,

date:date,

priority:priority,

done:false

});


localStorage.setItem(
"homework",
JSON.stringify(homework)
);


showHomework();

notify("Homework added");


}



function showHomework(){

let box =
document.getElementById("homeworkList");


if(!box)
return;


box.innerHTML="";


homework.forEach((work,index)=>{


box.innerHTML += `

<div class="homework-card">

<div>

<h3>
${work.done ? "✅" : "📚"}
${work.title}
</h3>

<p>
Due: ${work.date || "No date"}
</p>

<p>
Priority:
${work.priority}
</p>

</div>


<div>

<button onclick="completeHomework(${index})">
✓
</button>


<button onclick="deleteHomework(${index})">
❌
</button>


</div>


</div>

`;


});


}



function completeHomework(index){

homework[index].done =
!homework[index].done;


saveHomework();

}



function deleteHomework(index){

homework.splice(index,1);

saveHomework();

notify("Homework deleted");

}



function saveHomework(){

localStorage.setItem(
"homework",
JSON.stringify(homework)
);


// Sync with calendar

homework.forEach(work=>{

    let exists =
    events.some(e =>
        e.title === work.title &&
        e.date === work.date
    );


    if(!exists && work.date){

        events.push({

            title:"📚 "+work.title,

            date:work.date,

            time:"",

            type:"school"

        });

    }

});


localStorage.setItem(
"calendarEvents",
JSON.stringify(events)
);


showHomework();

}
function checkHomework(){

let today =
new Date()
.toISOString()
.split("T")[0];


homework.forEach(work=>{


if(
work.date === today &&
!work.done
){

notify(
"📚 Homework due today: " + work.title
);

}

});


}


setInterval(
checkHomework,
60000
);
let grades =
JSON.parse(
localStorage.getItem("grades")
)
|| [];



function addGrade(){

let subject =
document.getElementById("subjectName").value;


let value =
document.getElementById("gradeValue").value;


if(subject=="" || value==""){
    return;
}


grades.push({

subject:subject,

grade:Number(value)

});


localStorage.setItem(
"grades",
JSON.stringify(grades)
);


showGrades();


notify("Grade added");

}



function showGrades(){

let box =
document.getElementById("gradeList");


if(!box)
return;


box.innerHTML="";


let total = 0;



grades.forEach((item,index)=>{


total += item.grade;


box.innerHTML += `

<div class="grade-card">


<div>

<h3>
📚 ${item.subject}
</h3>


<p>
${item.grade}%
</p>


</div>


<button onclick="deleteGrade(${index})">

❌

</button>


</div>

`;



});



let average = 0;


if(grades.length > 0){

average =
(total / grades.length)
.toFixed(1);

}



document.getElementById("overallGrade")
.innerHTML =
"Average: " + average + "%";


}



function deleteGrade(index){

grades.splice(index,1);


localStorage.setItem(
"grades",
JSON.stringify(grades)
);


showGrades();


notify("Grade removed");

}
let focusSeconds = 1500;

let focusTimer = null;

let focusRunning = false;


let focusStreak =
Number(
localStorage.getItem("focusStreak")
)
|| 0;



function loadFocus(){

let streak =
document.getElementById("focusStreak");

if(streak){

streak.innerHTML =
focusStreak;

}

updateFocusDisplay();

}



function updateFocusDisplay(){

let timer =
document.getElementById("focusTimer");

if(!timer)
return;


let minutes =
Math.floor(focusSeconds / 60);


let seconds =
focusSeconds % 60;


if(seconds < 10)
seconds="0"+seconds;


timer.innerHTML =
minutes + ":" + seconds;

}



function startFocus(){

if(focusRunning)
return;


focusRunning=true;


focusTimer =
setInterval(()=>{


focusSeconds--;


updateFocusDisplay();


if(focusSeconds <= 0){

completeFocus();

}


},1000);


notify("Focus started 🚀");

}



function pauseFocus(){

focusRunning=false;


clearInterval(focusTimer);


notify("Focus paused");

}



function resetFocus(){

pauseFocus();


focusSeconds=1500;


updateFocusDisplay();

}



function startBreak(){

pauseFocus();


focusSeconds=300;


updateFocusDisplay();


notify("5 minute break ☕");

}



function completeFocus(){

pauseFocus();


focusSeconds=1500;


focusStreak++;


localStorage.setItem(
"focusStreak",
focusStreak
);


updateFocusDisplay();


loadFocus();


notify(
"🎉 Focus session complete!"
);

}
function checkHomework(){

let today =
new Date()
.toISOString()
.split("T")[0];


homework.forEach(work=>{


if(
work.date === today &&
!work.done
){

notify(
"📚 Homework due today: "
+ work.title
);

}


});


}


setInterval(
checkHomework,
60000
);