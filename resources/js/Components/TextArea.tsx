import React from 'react';

interface TextAreaProps {
    id: string;
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({ id, name, label, value, onChange, required = false, rows = 4 }) => {
    return (
        <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows={rows}
        />
        </div>
    );
};

export default TextArea;