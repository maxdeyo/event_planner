export function icsText(data) {
    let str = 'BEGIN:VCALENDAR' + '\n' +
        'VERSION:2.0' + '\n' +
        'BEGIN:VEVENT' + '\n' +
        'CLASS:PUBLIC' + '\n' +
        'DESCRIPTION:' + data.name.toString() + '\n';

    //Temp comment out tzid as it doesn't work
    /*str+='DTSTART;TZID=' + data.tzid.toString() + ':' + data.dtstart.toString() + '\n' +
    'DTEND;TZID=' + data.tzid.toString() + ':' + data.dtend.toString() + '\n';*/

    str+='DTSTART:' + data.dtstart.toString() + '\n' +
        'DTEND:' + data.dtend.toString() + '\n';
    if(data.recurrence){
        str += 'RRULE:FREQ=' + data.recurrence.toString() + '\n';
    }
    if(data.location){
        str+='LOCATION:' + data.location.toString() + '\n'
    }
    str+=
        'SUMMARY;LANGUAGE=en-us:' + data.description.toString() + '\n';
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