import React from 'react';

const Todocontent = ({eachContent, deleteContent}) => {
    return(
        <>
        <li className='li' onClick={
            function(){
                var wantDelete = eachContent;
                deleteContent(wantDelete);
            }
        }>{eachContent}</li>
        </>
    )
}

export default Todocontent;