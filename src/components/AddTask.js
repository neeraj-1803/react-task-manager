import { useState } from 'react'

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);
    const onSubmitChange = (e) => {
        e.preventDefault()
        if(!text){
            alert("Please enter a task name")
            return
        }
        onAdd({text, day, reminder})
        setText('')
        setDay('')
        setReminder(false)
    }
    return (
        <form className='add-form' onSubmit={onSubmitChange}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text'placeholder='Add Task' onChange={(e)=>{setText(e.target.value)}} value={text}></input>
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input type='text'placeholder='Add Day & Time' onChange={(e)=>{setDay(e.target.value)}} value={day}></input>
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox' checked={reminder} onChange={(e)=>{setReminder(e.currentTarget.checked)}}></input>
            </div>
            <input type='submit' value='Save Task' className='btn btn-block'></input>
        </form>
    )
}

export default AddTask
