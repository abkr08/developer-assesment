import React, {useState, useEffect} from 'react';
import axios from 'axios';

import classes from './StudentsView.module.css';

const StudentsView = props => {
    const [studentList, updateList] = useState([]);
    const [nationalities, updateNationalities] = useState([]);
    const [selectedNationality, updateSelectedNationality] = useState(null);
    const [order, updateOrder] = useState(null);
    const[errorMessage, updateErrorMessage] = useState(null);
    
    useEffect(() => {
            axios.get('http://localhost:8080/students')
                .then(res => {
                    updateList(res.data);
                    let nationalities = Array.from(new Set(res.data.map(item => item.nationality))).sort((a, b) => {
                        return a.localeCompare(b);
                    });
                    updateNationalities(nationalities);
                    updateSelectedNationality(nationalities[0]);
                })
                .catch(err => {
                    console.log(err.message);
                    err.response ? updateErrorMessage(err.response.data) :
                    updateErrorMessage(err.message)
                    ;
                });
                    
    }, []);

    const selectionChangedHandler = event => {
        updateSelectedNationality(event.target.value);
    }

    const sortItems = () => {
        let listCopy = [...studentList];
        if (!order || order === 'descending'){
            listCopy.sort((a, b) => {
                return a.firstName.localeCompare(b.firstName);
            });
            updateList(listCopy);
            updateOrder('ascending');
        } else {
            listCopy.sort((a, b) => {
                return b.firstName.localeCompare(a.firstName);
            });
            updateList(listCopy);
            updateOrder('descending')
        }

    }
    let content = null;

    if (!studentList.length){
        if (errorMessage) {
            content = (
                <>
                    <h1>{errorMessage}</h1>
                    <button 
                    onClick={() => props.history.push('/new')} 
                    className={[classes.Button, classes.AddButton].join(' ')}>
                        Add student
                    </button>
                </>
            )
        } else {
            content = <Spinner />
        }
    } else {
        content = (
            <div>
                <select onChange={selectionChangedHandler} >
                    {nationalities.map((item, i) => <option key={item+i} value={item}>{item}</option>)}
                </select>
                <ul className={classes.ListContainer}>
                    {studentList.filter(item => item.nationality === selectedNationality).map(student => (
                        <li className={classes.ListItem} key={student._id}>{`${student.firstName} ${student.lastName} (${student.age})`}</li>
                    ))}
                </ul>
                <span className={classes.ButtonsContainer}>
                    <button onClick={sortItems} className={[classes.Button, classes.SortButton].join(' ')}>Sort</button>
                    <button onClick={() => props.history.push('/new')} className={[classes.Button, classes.AddButton].join(' ')}>Add student</button>
                </span>
            </div>
        )
    }
    return (
        <div className={classes.StudentsView}>
            {content}
        </div>
    )
}

export default StudentsView;

const Spinner = () => (
    <div className={classes.Spinner}></div>
)