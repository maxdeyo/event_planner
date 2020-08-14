export function icsText(data) {
    let str = 'BEGIN:VCALENDAR' + '\n' +
        'VERSION:2.0' + '\n' +
        'BEGIN:VEVENT' + '\n' +
        'CLASS:PUBLIC' + '\n' +
        'DESCRIPTION:' + data.name.toString() + '\n';

    if (data.tzid) {
    str+='DTSTART;TZID=' + data.tzid.toString() + ':' + (new Date(data.dtstart).toISOString()) + '\n' +
    'DTEND;TZID=' + data.tzid.toString() + ':' + (new Date(data.dtend).toISOString()) + '\n';
    } else {
     str+='DTSTART:' + (new Date(data.dtstart).toISOString()) + '\n' +
        'DTEND:' + (new Date(data.dtend).toISOString()) + '\n';
    }

    if(data.recurrence && data.recurrence != 'NONE'){
        str += 'FREQ=' + data.recurrence.toString() + '\n';
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

export function icsAllEvents(events){
    let str = 'BEGIN:VCALENDAR' + '\n' +
    'VERSION:2.0' + '\n';
    for(let event of events){
        str+='BEGIN:VEVENT' + '\n' +
            'CLASS:PUBLIC' + '\n' +
            'DESCRIPTION:' + event.name.toString() + '\n';

        if (event.tzid) {
            str+='DTSTART;TZID=' + event.tzid.toString() + ':' + event.dtstart.toString() + '\n' +
                'DTEND;TZID=' + event.tzid.toString() + ':' + event.dtend.toString() + '\n';
        } else {
            str+='DTSTART:' + event.dtstart.toString() + '\n' +
                'DTEND:' + event.dtend.toString() + '\n';
        }

        if(event.recurrence && event.recurrence != 'NONE'){
            str += 'FREQ=' + event.recurrence.toString() + '\n';
        }

        if(event.location){
            str+='LOCATION:' + event.location.toString() + '\n';
            str+='GEO:' + event.geocode.toString() + '\n';
        }
        str+=
            'SUMMARY;LANGUAGE=en-us:' + event.description.toString() + '\n';
        if(event.resources){
            console.log('Error:', event.resources);
            str += 'RESOURCES:' + event.resources.toString() + '\n';
        }
        if(event.priority){
            str+='PRIORITY:' + event.priority.toString() + '\n';
        }
        if(event.rsvp == true){
            str+='RSVP:TRUE' + '\n';
        }
        if(!event.rsvp || event.rsvp == false ){
            str+='RSVP:FALSE' + '\n';
        }
        if(event.sentby){
            str+='ORGANIZER;SENT-BY=' + '\'mailto:' + event.sentby.toString() + '\':';
        }
        if(event.mailto){
            str+='mailto:' + event.mailto.toString() + '\n';
        }
        str+=
            'END:VEVENT' + '\n'

    }
    str+='END:VCALENDAR';
    return str;
}