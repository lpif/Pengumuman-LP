var closure = {
  currentEvent: null,
  nextEvent: null,
  connectionError: false,
  serverTime: moment($('#dummy-server-time').text(), 'DD-MM-YYYY HH:mm:ss'),
  currentTime: moment(),
  serverClientTimeDiff: moment($('#dummy-server-time').text(), 'DD-MM-YYYY HH:mm:ss').diff(moment())
};

var todayEventsUrl = 'http://api.lp.if.its.ac.id/api/v1/schedules/{today}';

var boxElements = ['nav', '#event-name-box', '#next-event-box-header'];

var COLOR = {
  blue: '#095473',
  red: '#D93E30',
  gray: '#9DA698'
}

$(document).ready(function() {
  var timerInterval = 100;
  var ajaxRequestInterval = 10000;

  deleteServerTime();
  getNewTime();
  ajaxRequest();

  setInterval("getNewTime()", timerInterval);
  setInterval('ajaxRequest()', ajaxRequestInterval);

  render();
});


function changeCurrentEvent(currentEvent) {
  closure.currentEvent = currentEvent;
}

function changeNextEvent(nextEvent) {
  closure.nextEvent = nextEvent;
}

function renderTheme() {
  var color;
  var logoFileName;
  if (closure.connectionError) {
    color = COLOR.gray;
    $('#next-event-box').css('border', '2px solid ' + COLOR.gray);
    logoFileName = 'logo-gray.png';

  } else if (closure.currentEvent === null) {
    color = COLOR.blue;
    logoFileName = 'logo-blue.png';

    $('#next-event-box').css('border', '2px solid ' + COLOR.blue);
  } else {
    color = COLOR.red;
    logoFileName = 'logo-red.png';

    $('#next-event-box').css('border', '2px solid ' + COLOR.red);
  }

  boxElements.forEach(function(element) {
    $(element).css('background-color', color);
  });

  $('#logo-row').html('<div class="col-2 offset-5"> <center><img src="./assets/images/' + logoFileName + '" id="main-logo"></center></div>');
}

function renderStatus() {
  var currentEventComponent;
  if (closure.currentEvent === null) {
    currentEventComponent = '<div class="row"><div class="col-12 gotham-font" id="status-text"><center>There is no event, you can use the lab</center></div></div><div id="event-info"><div class="row"><div class="col-6 offset-3" id="event-name-box"><center><div class="caslon-font" id="event-name">-</div></center></div></div><div class="row" id="event-time"><div class="col-6 offset-3"><center><div class="caslon-font passive-time" id="event-time">-</div></center></div></div></div>';
  } else {
    currentEventComponent = '<div class="row"><div class="col-12 gotham-font" id="status-text"><center>Currently In Use</center></div></div><div id="event-info"><div class="row"><div class="col-6 offset-3 marque-box" id="event-name-box"><center><div class="caslon-font" id="event-name">' + closure.currentEvent.eventName + '</div></center></div></div><div class="row" id="event-time"><div class="col-6 offset-3"><center><div class="caslon-font" id="event-time">' + closure.currentEvent.eventTime + '</div></center></div></div></div>';
  }
  $('#status').html(currentEventComponent);
}

function renderNextEvent() {
  var nextEventComponent;
  if (closure.nextEvent === null) {
    nextEventComponent = '<div class="col-3 offset-8" id="next-event-box"><div class="row"><div class="col-12 gotham-font" id="next-event-box-header">Today Upcoming Event</div></div><div class="row"><div class="col-12 caslon-font" id="next-event-name">-</div></div><div class="row"><div class="col-12 caslon-font white-font" id="next-event-time">-</div></div></div></div>';
  } else {
    nextEventComponent = '<div class="col-3 offset-8" id="next-event-box"><div class="row"><div class="col-12 gotham-font" id="next-event-box-header">Today Upcoming Event</div></div><div class="row"><div class="col-12 caslon-font marque-box next-event-marque-box" id="next-event-name">' + closure.nextEvent.eventName + '</div></div><div class="row"><div class="col-12 caslon-font" id="next-event-time">' + closure.nextEvent.eventTime + '</div></div></div></div>';
  }
  $('#next-event-row').html(nextEventComponent);
}

function render() {
  renderStatus();
  renderNextEvent();
  renderTheme();
}

function renderTime() {
  var tempCurrentTime = closure.currentTime;
  tempCurrentTime.add(closure.serverClientTimeDiff);
  var currentDateText = tempCurrentTime.format('dddd, DD MMMM YYYY');
  var currentTimeText = tempCurrentTime.format('hh : mm : ss a');
  $('#current-date').text(currentDateText);
  $('#current-time').text(currentTimeText);
}

function getNewTime() {
  if (closure.currentTime !== moment()) {
    closure.currentTime = moment();
    renderTime();
  }
}

function deleteServerTime() {
  $('#dummy-server-time').text('');
}

function ajaxRequest() {
  var today = moment().format('YYYY-MM-DD');
  var currentTime = moment().add(closure.serverClientTimeDiff);
  $.ajax(_.replace(todayEventsUrl, '{today}', currentTime.format('YYYY-MM-DD')))
    .done(function(result) {
      var currentEvent = null;
      var nextEvent = null;

      closure.connectionError = false;

      _.forEach(result, function(current) {
        if (currentTime >= moment(current.start) && currentTime <= moment(current.end)) {
          currentEvent = {
            eventName: current.booking.title,
            eventTime: moment(current.start).local().format('hh:mm a') + ' - ' + moment(current.end).local().format('hh:mm a')
          };

          changeCurrentEvent(currentEvent);
        }

        if (nextEvent === null && currentTime < moment(current.start)) {
          nextEvent = {
            eventName: current.booking.title,
            eventTime: moment(current.start).local().format('hh:mm a') + ' - ' + moment(current.end).local().format('hh:mm a')
          };

          changeNextEvent(nextEvent);
        }
      });
    })
    .fail(function() {
      closure.connectionError = true;
    })
    .always(function() {
      render();
    });
}
