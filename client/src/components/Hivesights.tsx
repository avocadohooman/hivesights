import React from 'react';

const Hivesights = (props: any) => {

    console.log("PROPS", props);
    return (
        <div>{props.user.userName} has validated an internship: {props.user.internshipValidated === true ? 'Yes' : 'No'}</div>
    );
}

export default Hivesights;