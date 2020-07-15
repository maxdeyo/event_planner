import React from 'react';

export default function FormTest() {
    const [state, setState] = React.useState({
        name: 'name',
        description: 'desc',
        location: 'loc',
        dtstart: 'start',
        dtend: 'end',
        summary: 'summary'
    });
    const handleInputChange = e => {
        const {name, value} = e.target
        setState({...state, [name]: value})
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
         let databody = {
             firstName: state.firstName,
             lastName: state.lastName,
             start: state.start,
             end: state.end,
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
                    <input type="text" name="name" onChange={handleInputChange} value={state.name}/>
                </label>
                <label>
                    Description:
                    <input type="text" name="description" onChange={handleInputChange} value={state.description} />
                </label>
                <label>
                    Location:
                    <input type="text" name="location" onChange={handleInputChange} value={state.location} />
                </label>
                <label>
                    Start:
                    <input type="text" name="dtstart" onChange={handleInputChange} value={state.dtstart} />
                </label>
                <label>
                    End:
                    <input type="text" name="dtend" onChange={handleInputChange} value={state.dtend} />
                </label>
                <label>
                    summary:
                    <input type="text" name="summary" onChange={handleInputChange} value={state.summary} />
                </label>
                <input type="submit" value="Submit" onSubmit={handleSubmit}/>
            </form>
        </div>
    );
}