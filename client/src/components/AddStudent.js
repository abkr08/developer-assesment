import React, { useState, useEffect } from 'react';
import classes from './AddStudent.module.css';
import axios from 'axios';

const AddStudent = props => {

    const [data, updateData] = useState({
        id: {
            type: 'number',
            label: 'Student Id',
            value: ''
        },
        firstName: {
            type: 'text',
            label: 'First name',
            value: ''
        },
        lastName: {
            type: 'text',
            label: 'Last name',
            value: ''
        },
        age: {
            type: 'number',
            label: 'Age',
            value: ''
        },
        nationality: {
            type: 'text',
            label: 'Nationality',
            value: ''
        },
    });
    const inputChangedHandler = (event, identifier) => {
        updateData({
            ...data, 
            [identifier]: {
                ...data[identifier], 
                value: event.target.value
            }
        });
    }
    const onSubmit = event => {
        event.preventDefault();
        let inputData = {};
        for (let key in data){
            inputData[key]= data[key].value   
        }
        axios.post('http://localhost:8080/init', inputData)
            .then(res => {
                props.history.push('/home');
            })
            .catch(err => console.log(err));
    }
    let formInput = [];
    for (let key in data){
        formInput.push({
            name: key,
            data: data[key]
        })
    }
    let form = formInput.map(item => (
        <Input key={item.name}
        type={item.data.type} 
        value={item.data.value} 
        label={item.data.label}
        name={item.name}
        onChange={(event) => inputChangedHandler(event, item.name)}
        />
    )) 
    return (
        <form className={classes.AddStudent} onSubmit={onSubmit}>
            <span style={{display: 'block', textAlign: 'left', width: '100%'}}><button onClick={() => props.history.push('/home')} className={classes.Button}>View Students</button></span>
            <h1>Add a new student</h1>
            {form}
            <br />
            <button className={classes.Button} type='submit'>Add student</button>
        </form>
    )
}
export default AddStudent;

const Input = ({
    type,
    label,
    value,
    name,
    onChange
}) => (
    <>
        <label className={classes.Label}>{label}:</label>
        <input type={type}
        required
        label={label}
        value={value}
        onChange={onChange}
        name={name}
        className={classes.Input}
        />
    </>
)