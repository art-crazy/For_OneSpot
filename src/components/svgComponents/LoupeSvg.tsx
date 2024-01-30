import React from 'react';

const LoupeSvg = (props: { color: string; }) => {
    return (
        <svg className={props.color} width="31" height="31" viewBox="0 0 31 31" fill="none"
             xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M2 12C2 6.62584 6.62584 2 12 2C17.3742 2 21 6.62584 21 12C21 14.2737 20.351 16.2344 19.1952 17.74C18.7256 17.7072 18.2061 17.7939 18 18C17.7939 18.2061 17.7072 18.7256 17.74 19.1952C16.2344 20.351 14.2737 21 12 21C6.62584 21 2 17.3742 2 12ZM18.8123 20.8123C16.9743 22.2008 14.6335 23 12 23C5.64873 23 0 18.3513 0 12C0 5.64873 5.64873 0 12 0C18.3513 0 23 5.64873 23 12C23 14.6335 22.2008 16.9743 20.8123 18.8123L30 28C30.3557 28.3557 30.3557 29.6443 30 30C29.6443 30.3557 28.3557 30.3557 28 30L18.8123 20.8123Z"
                  fill="currentColor"/>
        </svg>
    );
}
export default LoupeSvg;
