$(document).ready(function() {
  $("#month-goal").click( function() {
    $("#goal").text(getMonthGoal);
  })

  $("#short-goal").click( function() {
    $("#goal").text(getShortGoal);
  })
})

function getShortGoal() {
  var goalIndex = Math.floor(Math.random() * shortGoals.length);
  return shortGoals[goalIndex];
}

function getMonthGoal() {
  var goalIndex = Math.floor(Math.random() * monthGoals.length);
  return monthGoals[goalIndex];
}


var shortGoals = [
  "Meditate for 10 minutes 🧘‍",
  "Call your parents and/or children 📞",
  "Reach out to an old friend 🙋‍",
  "Think of 5 things you are greatful for 🙏",
  "Thank 3 people whom have helped you 🙏",
  "Go to the gym for 15 minutes  🏋️‍",
  "Read about something new 🧾",
  "Read about an opposing viewpoint🧾",
  "Stay off your phone for the next 2 hours📵",
  "Do a something kind for a stranger 🧡",
  "Drop and give me 20! Seriously!! 🏋️‍",
  "Say hi to a stranger ✋",
  "Do a deep clean of your room/office 🧹"
]

var monthGoals = [
  "Skip a cup of coffee everyday ☕",
  "Read 20 pages a day 📖",
  "Reduce your screen time by 5 minutes each day (See if you can double it) 📴",
  "Spend 2 hours volunteering this month 💕",
  "Read about an opposing viewpoint everyday 🧾",
  "Don't snooze your alarm! ⏰",
  "Thank someone every day 🙏",
  "Meditate daily 👌",
  "Hit the gym for at least 15 minutes a day 🏋️‍",
  "Reach out to someone you haven't spoken to in a while every day 📞"
]
