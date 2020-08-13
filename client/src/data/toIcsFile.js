export function icsText(data) {
    let str = 'BEGIN:VCALENDAR' + '\n' +
        'VERSION:2.0' + '\n' +
        'BEGIN:VEVENT' + '\n' +
        'CLASS:PUBLIC' + '\n' +
        'DESCRIPTION:' + data.name.toString() + '\n';

    //Temp comment out tzid as it doesn't work
    /*str+='DTSTART;TZID=' + data.tzid.toString() + ':' + data.dtstart.toString() + '\n' +
    'DTEND;TZID=' + data.tzid.toString() + ':' + data.dtend.toString() + '\n';*/

    str+='DTSTART:' + data.dtstart.toJSON() + '\n' +
        'DTEND:' + data.dtend.toJSON() + '\n';
    if(data.recurrence){
        str += 'RRULE:FREQ=' + data.recurrence.toString() + ';INTERVAL=1' + '\n';
    }
    if(data.location){
        str+='LOCATION:' + data.location.toString() + '\n';
        str+='GEO:' + data.geocode.toString() + '\n';
    }
    str+= 'SUMMARY;LANGUAGE=en-us:' + data.description.toString() + '\n';
    if(data.resources){
        str += 'RESOURCES:' + data.resources.toString() + '\n';
    }
    if(data.priority){
        str+='PRIORITY:' + data.priority.toString() + '\n';
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
            'CLASS:PUBLIC' + '\n';
        str+='DESCRIPTION:' + event.name.toString() + '\n'
            +'DTSTART:' + event.dtstart.toString() + '\n' +
            'DTEND:' + event.dtend.toString() + '\n';
        if(event.recurrence){
            str += 'RRULE:FREQ=' + event.recurrence.toString() + '\n';
        }
        if(event.location){
            str+='LOCATION:' + event.location.toString() + '\n'
        }
        str+=
            'SUMMARY;LANGUAGE=en-us:' + event.description.toString() + '\n';
        if(event.resources){
            str += 'RESOURCES:' + event.resources.toString() + '\n';
        }
        if(event.priority){
            str+='PRIORITY:' + event.priority.toString() + '\n';
        }
        str+= 'END:VEVENT' + '\n';

    }
    str+='END:VCALENDAR';
    return str;
}