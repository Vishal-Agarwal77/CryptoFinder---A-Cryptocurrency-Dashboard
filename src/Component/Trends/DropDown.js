import React, { memo,  } from 'react';

function MYdropDown({largeArray}) {
    console.log("MYdropDown is running");   
    return ( largeArray &&
        <>
            {largeArray.map((item, index) => (
                <option key={`${index} ${item.name}`} value={item.id}>
                    {item.name}
                </option>
            ))}
        </>
    )
}

export default memo(MYdropDown);
