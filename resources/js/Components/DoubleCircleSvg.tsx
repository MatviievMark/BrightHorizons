import React from 'react';

interface Props {
    className?: string;
}

export default function DoubleCircleSvg({ className = '' }: Props) {
    return (
        <svg viewBox="0 0 230 225" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <circle cx="122.168" cy="117.773" r="107.227" fill="#BA7EFF"/>
            <circle cx="107.227" cy="107.227" r="107.227" fill="#BFD7FF"/>
        </svg>
    );
} 