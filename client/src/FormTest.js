import React from 'react';

export default function FormTest() {
    const [state, setState] = React.useState({
        firstName: 'John',
        lastName: 'Smith',
        start: '7',
        end: '8'
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
                    First Name:
                    <input type="text" name="firstName" onChange={handleInputChange} value={state.firstName}/>
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lastName" onChange={handleInputChange} value={state.lastName} />
                </label>
                <label>
                    Start:
                    <input type="text" name="start" onChange={handleInputChange} value={state.start} />
                </label>
                <label>
                    End:
                    <input type="text" name="end" onChange={handleInputChange} value={state.end} />
                </label>
                <input type="submit" value="Submit" onSubmit={handleSubmit}/>
            </form>
        </div>
    );
}