import React from 'react';

export default function FormTest() {
    const [event, setEvent] = React.useState({
        name: 'name',
        description: 'desc',
        location: 'loc',
        dtstart: 'start',
        dtend: 'end',
        summary: 'summary'
    });
    const handleInputChange = e => {
        const {name, value} = e.target
        setEvent({...event, [name]: value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
         let databody = {
            name: event.name,
            description: event.description,
            location: event.location,
            dtstart: event.dtstart,
            dtend: event.dtend,
            summary: event.summary
         }
     
         fetch('/api/events/save', {
                 method: 'POST',
                 body: JSON.stringify(databody),
                 headers: {
                     'Content-Type': 'application/json'
                 },
             })
             .then(res => res.json())
             .then(data => console.log(data));
     }
    return(
        <div>
            <form>
                <label>
                    Name:
                    <input type="text" name="name" onChange={handleInputChange} value={event.name}/>
                </label>
                <label>
                    Description:
                    <input type="text" name="description" onChange={handleInputChange} value={event.description} />
                </label>
                <label>
                    Location:
                    <input type="text" name="location" onChange={handleInputChange} value={event.location} />
                </label>
                <label>
                    Start:
                    <input type="text" name="dtstart" onChange={handleInputChange} value={event.dtstart} />
                </label>
                <label>
                    End:
                    <input type="text" name="dtend" onChange={handleInputChange} value={event.dtend} />
                </label>
                <label>
                    summary:
                    <input type="text" name="summary" onChange={handleInputChange} value={event.summary} />
                </label>
                <input type="submit" value="Submit" onSubmit={handleSubmit}/>
            </form>
        </div>
    );
}