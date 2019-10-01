import React from 'react';

export default function Button({ onClick }) {
    return ( 
    <a className="f6 link ph3 pv2 mb2 mh2 white bg-mid-gray" href="#0" onClick={onClick}>
        Search
    </a>
    );
}