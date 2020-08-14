export function icsText(data) {
    let str = 'BEGIN:VCALENDAR' + '\r\n' +
        'PRODID:-//Sloth Wall//Event Calendar Version 1.0//EN' + '\r\n' +
        'VERSION:2.0' + '\r\n' +
        'BEGIN:VEVENT' + '\r\n' +
        'CLASS:PUBLIC' + '\r\n' +
        'DESCRIPTION:' + data.name.toString() + '\r\n' +
        'UID:' + (new Date().toISOString()) + '@slothwall.com' + '\r\n' +
        'DTSTAMP:' + (new Date().toUTCString()) + '\r\n';

    if (data.tzid) {
    str+='DTSTART;TZID=' + data.tzid.toString() + ':' + (new Date(data.dtstart).toISOString()) + '\r\n' +
    'DTEND;TZID=' + data.tzid.toString() + ':' + (new Date(data.dtend).toISOString()) + '\r\n';
    } else {
     str+='DTSTART:' + (new Date(data.dtstart).toUTCString()) + '\r\n' +
        'DTEND:' + (new Date(data.dtend).toUTCString()) + '\r\n';
    }

    if(data.recurrence && data.recurrence != 'NONE'){
        str += 'FREQ=' + data.recurrence.toString() + '\r\n';
    }

    if(data.location){
        str+='LOCATION:' + data.location.toString() + '\r\n';
        str+='GEO:' + data.geocode.toString() + '\r\n';
    }
    str+=
        'SUMMARY;LANGUAGE=en-us:' + data.description.toString() + '\r\n';
    if(data.resources){
          console.log('Error:', data.resources);
        str += 'RESOURCES:' + data.resources.toString() + '\r\n';
    }
    if(data.priority){
        str+='PRIORITY:' + data.priority.toString() + '\r\n';
    }
    if(data.rsvp == true){
        str+='RSVP:TRUE' + '\r\n';
    }
    if(!data.rsvp || data.rsvp == false ){
        str+='RSVP:FALSE' + '\r\n';
    }
    if(data.sentby){
        str+='ORGANIZER;SENT-BY=' + '\'mailto:' + data.sentby.toString() + '\':';
    }
    if(data.mailto){
        str+='mailto:' + data.mailto.toString() + '\r\n';
    }
    str+=
        'END:VEVENT' + '\r\n' +
        'END:VCALENDAR';
    return str;
}

export function icsAllEvents(events){
    let str = 'BEGIN:VCALENDAR' + '\r\n' +
    'VERSION:2.0' + '\r\n';
    for(let event of events){
        str+='BEGIN:VEVENT' + '\r\n' +
            'CLASS:PUBLIC' + '\r\n' +
            'DESCRIPTION:' + event.name.toString() + '\r\n';

        if (event.tzid) {
            str+='DTSTART;TZID=' + event.tzid.toString() + ':' + event.dtstart.toString() + '\r\n' +
                'DTEND;TZID=' + event.tzid.toString() + ':' + event.dtend.toString() + '\r\n';
        } else {
            str+='DTSTART:' + event.dtstart.toString() + '\r\n' +
                'DTEND:' + event.dtend.toString() + '\r\n';
        }

        if(event.recurrence && event.recurrence != 'NONE'){
            str += 'FREQ=' + event.recurrence.toString() + '\r\n';
        }

        if(event.location){
            str+='LOCATION:' + event.location.toString() + '\r\n';
            str+='GEO:' + event.geocode.toString() + '\r\n';
        }
        str+=
            'SUMMARY;LANGUAGE=en-us:' + event.description.toString() + '\r\n';
        if(event.resources){
            console.log('Error:', event.resources);
            str += 'RESOURCES:' + event.resources.toString() + '\r\n';
        }
        if(event.priority){
            str+='PRIORITY:' + event.priority.toString() + '\r\n';
        }
        if(event.rsvp == true){
            str+='RSVP:TRUE' + '\r\n';
        }
        if(!event.rsvp || event.rsvp == false ){
            str+='RSVP:FALSE' + '\r\n';
        }
        if(event.sentby){
            str+='ORGANIZER;SENT-BY=' + '\'mailto:' + event.sentby.toString() + '\':';
        }
        if(event.mailto){
            str+='mailto:' + event.mailto.toString() + '\r\n';
        }
        str+=
            'END:VEVENT' + '\r\n'

    }
    str+='END:VCALENDAR';
    return str;
}