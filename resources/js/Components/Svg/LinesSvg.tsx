import React from 'react';

interface Props {
    className?: string;
}

export default function LinesSvg({ className = '' }: Props) {
    return (
        <svg viewBox="0 0 276 251" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMidYMid meet">
            <rect x="61.7104" y="34.1133" width="23.9985" height="292.65" transform="rotate(-42.1807 61.7104 34.1133)" fill="#BFD7FF"/>
            <rect y="16.1145" width="23.9985" height="292.65" transform="rotate(-42.1807 0 16.1145)" fill="#BA7EFF"/>
        </svg>
    );
} 