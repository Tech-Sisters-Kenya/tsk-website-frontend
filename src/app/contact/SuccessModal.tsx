import Button from '@/components/Button';
import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-xl sm:w-[600px] w-full max-w-[90%] p-8 sm:p-12">
        <div className="flex flex-col items-center text-center gap-4">
          <h1 className="font-decorative lg:text-6xl md:text-5xl text-3xl text-tsk-primary-dark leading-tight font-normal">
            Thanks for reaching out!
          </h1>
          <p className="text-tsk-primary-dark text-base sm:text-lg font-body mt-2 font-medium">
            Your message has been sent successfully
          </p>
          <Button
            onClick={onClose}
            className="sm:w-2/3 w-full mt-6 bg-tsk-primary-dark sm:px-12 px-8 py-2 rounded-xl font-semibold transition-colors duration-300 text-base sm:text-lg"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
