export function icsText(data) {
    let str = 'BEGIN:VCALENDAR' + '\n' +
        'VERSION:2.0' + '\n' +
        'BEGIN:VEVENT' + '\n' +
        'CLASS:PUBLIC' + '\n' +
        'DESCRIPTION:' + data.name.toString() + '\n';

    str+='DTSTART;TZID=' + data.tzid.toString() + ':' + data.dtstart.toString() + '\n' +
    'DTEND;TZID=' + data.tzid.toString() + ':' + data.dtend.toString() + '\n';

    if(data.recurrence && data.recurrence != 'None'){
        str += 'RRULE:FREQ=' + data.recurrence.toString() + '\n';
    }
    if(data.location){
        str+='LOCATION:' + data.location.toString() + '\n';
        str+='GEO:' + data.geocode.toString() + '\n';
    }
    str+=
        'SUMMARY;LANGUAGE=en-us:' + data.description.toString() + '\n';
    if(data.resources){
          console.log('Error:', data.resources);
        str += 'RESOURCES:' + data.resources.toString() + '\n';
    }
    if(data.priority){
        str+='PRIORITY:' + data.priority.toString() + '\n';
    }
    if(data.rsvp == true){
        str+='RSVP:TRUE' + '\n';
    }
    if(!data.rsvp || data.rsvp == false ){
        str+='RSVP:FALSE' + '\n';
    }
    if(data.sentby){
        str+='ORGANIZER;SENT-BY=' + '\'mailto:' + data.sentby.toString() + '\':';
    }
    if(data.mailto){
        str+='mailto:' + data.mailto.toString() + '\n';
    }
    str+=
        'END:VEVENT' + '\n' +
        'END:VCALENDAR';
    return str;
}