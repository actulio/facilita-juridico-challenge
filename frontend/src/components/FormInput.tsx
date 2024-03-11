import React from 'react';

interface Props {
  label: string;
  name: string;
  onChange: (e: any) => void;
  value: any;
  placeholder?: string;
  type?: string;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  hasError?: boolean;
  min?: number;
  max?: number;
}

const FormInput: React.FC<Props> = ({ label, error, hasError, readOnly, ...props }) => {
  return (
    <div>
      <label
        htmlFor={label}
        className={`${
          hasError ? 'text-red-500' : 'block text-base font-medium leading-6 text-gray-900'
        }`}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          {...props}
          id={label}
          className={`${
            hasError ? 'ring-red-500' : 'ring-gray-300'
          } ${readOnly ? 'cursor-not-allowed' : 'cursor-auto'} block w-full rounded-md border-0 px-4 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6`}
        />
      </div>
      {error && hasError && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
