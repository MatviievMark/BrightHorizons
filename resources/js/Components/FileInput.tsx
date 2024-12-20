import React from 'react';

interface FileInputProps {
    id: string;
    name: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({ id, name, label, onChange }) => {
    return (
        <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <input
            id={id}
            type="file"
            name={name}
            onChange={onChange}
            className="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        />
        </div>
    );
};

export default FileInput;