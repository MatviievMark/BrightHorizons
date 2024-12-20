import React from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectInputProps {
    id: string;
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
    required?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({ id, name, label, value, onChange, options, required = false }) => {
    return (
        <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
            {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
        </div>
    );
};

export default SelectInput;