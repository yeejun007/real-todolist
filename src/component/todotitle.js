import React from 'react';

const TodoTitle = ({title, changeContent}) => {
    return(
        <div className='title' onClick={changeContent}>{title}</div>
    )
}

export default TodoTitle;