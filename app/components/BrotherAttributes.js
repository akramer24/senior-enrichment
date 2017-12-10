import React from 'react';

export default function BrotherAttributes(props) {
    const brother = props.brother;
    return (
        <div className='brother-flex'>
        <ul className='brother-attributes'>
            {
                brother.nickname ? <li><span className='attribute-title'>Nickname: </span>{brother.nickname}</li>
                    : <li />
            }
            <li><span className='attribute-title'>Email: </span>{brother.email}</li>
            <li><span className='attribute-title'>GPA: </span>{brother.gpa}</li>
        </ul>
        <div>
            <img src={brother.imageUrl} className='brother-img' />
        </div>
    </div>
    )
}