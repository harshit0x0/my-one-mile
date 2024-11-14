import React from 'react';

interface CustomAlertProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const Alert: React.FC<CustomAlertProps> = ({ message, type, onClose }) => {
    const alertColor = type === 'success' ? 'bg-green-400' : 'bg-red-400';

    return (
        <div className={`${alertColor} w-5/6 text-sm md:text-md md:w-1/2 flex justify-between fixed top-20 left-1/2 transform -translate-x-1/2 p-2 lg:p-4 rounded-md text-white`}>
            <p className='pl-4'>{message}</p>
            <button onClick={onClose} className="ml-4 font-bold">X</button>
        </div>
    );
};

export default Alert;
