import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Types for the CustomSelect component
interface OptionType {
  value: string;
  label: string;
}

type InputChangeEvent =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  | { target: { name: string; value: string } };

interface CustomSelectProps {
  options: OptionType[];
  value: string;
  onChange: (e: InputChangeEvent) => void;
  placeholder: string;
  error?: { message?: string };
  name: string;
  className?: string;
}

// Custom Dropdown Component
const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  error,
  name,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const customEvent = {
      target: {
        name,
        value: optionValue,
      },
    };
    onChange(customEvent);
    setIsOpen(false);
  };

  const getDisplayValue = () => {
    if (!value) return placeholder;
    const option = options.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        className={`w-full py-4 px-3 border ${
          error ? 'border-red-500' : 'border-[#45084A]/50'
        } rounded-xl flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-[#45084A] focus:border-transparent text-left`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={!value ? 'text-[#45084A]/50' : 'text-[#45084A]'}>{getDisplayValue()}</span>
        <ChevronDown
          className={`w-5 h-5 text-[#45084A] transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-[#45084A]/50 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={handleSelect(option.value)}
              className="w-full px-3 py-3 text-left hover:bg-gray-50 text-[#45084A] border-b border-[#45084A]/10 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Form data type
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  occupation: string;
  customOccupation: string;
  experienceLevel: string;
  role: string;
  expertiseAreas: string;
}

// Success Message Component
const SuccessMessage: React.FC = () => (
  <div className="max-w-4xl mx-auto p-6 bg-white">
    <div className="text-center p-8 bg-green-50 rounded-xl border border-green-200">
      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900">Thank you for joining!</h3>
      <p className="mt-2 text-sm text-gray-500">
        We&apos;ve received your application and will get back to you soon.
      </p>
    </div>
  </div>
);

// Main Form Component
const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'female',
    occupation: '',
    customOccupation: '',
    experienceLevel: '2 years and above',
    role: 'Mentor',
    expertiseAreas: '',
  });

  const [errors, setErrors] = useState<Record<string, { message: string }>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: Record<string, { message: string }> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = { message: 'First name is required' };
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = { message: 'Last name is required' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = { message: 'Email is required' };
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = { message: 'Please enter a valid email address' };
    }

    if (!formData.occupation) {
      newErrors.occupation = { message: 'Occupation is required' };
    }

    if (formData.occupation === 'other' && !formData.customOccupation.trim()) {
      newErrors.customOccupation = { message: 'Please specify your occupation' };
    }

    if (!formData.expertiseAreas.trim()) {
      newErrors.expertiseAreas = { message: 'Please specify areas of expertise' };
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing in a field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({
        form: { message: 'Failed to submit form. Please try again.' },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Option arrays
  const occupationOptions: OptionType[] = [
    { value: '', label: 'Choose your occupation' },
    { value: 'Back End Software Engineer', label: 'Back End Software Engineer' },
    { value: 'Full Stack Software Engineer', label: 'Full Stack Software Engineer' },
    { value: 'Data Scientist', label: 'Data Scientist' },
    { value: 'Data Analyst', label: 'Data Analyst' },
    { value: 'Cyber Security Engineer', label: 'Cyber Security Engineer' },
    { value: 'Mobile App Developer', label: 'Mobile App Developer' },
    { value: 'UI/UX Designer', label: 'UI/UX Designer' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Quality Assurance Engineer', label: 'Quality Assurance Engineer' },
    { value: 'Product Manager', label: 'Product Manager' },
    { value: 'other', label: 'Not listed' },
  ];

  const experienceOptions: OptionType[] = [
    { value: 'less than 1 year', label: 'Less than 1 year' },
    { value: '1 year', label: '1 year' },
    { value: '2 years and above', label: '2 years and more' },
    { value: 'Student', label: 'Student' },
    { value: 'Aspiring to join tech', label: 'Aspiring to join tech' },
  ];

  const roleOptions: OptionType[] = [
    { value: 'Mentor', label: 'Mentor' },
    { value: 'Mentee', label: 'Mentee' },
    { value: 'Both', label: 'Both' },
  ];

  // Show success message if form was submitted successfully
  if (submitSuccess) {
    return <SuccessMessage />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="space-y-6">
        <h2 className="text-4xl font-bold text-[#45084A]">Tech Sisters Kenya Registration Form</h2>
        <h2 className="text-2xl font-bold text-[#45084A] mb-6">Personal Details</h2>

        {errors.form && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600">{errors.form.message}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[#45084A] font-semibold text-md">First Name*</label>
            <div className="mt-1">
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter your first name"
                className={`w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${
                  errors.firstName ? 'border-red-500' : 'border-[#45084A]/50'
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#45084A] focus:border-transparent`}
              />
            </div>
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-[#45084A] font-semibold text-md">Last Name*</label>
            <div className="mt-1">
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter your last name"
                className={`w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${
                  errors.lastName ? 'border-red-500' : 'border-[#45084A]/50'
                } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#45084A] focus:border-transparent`}
              />
            </div>
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[#45084A] font-semibold text-md">Email Address*</label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-[#45084A]/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
            <input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              type="email"
              placeholder="Enter your email"
              className={`pl-10 w-full py-4 px-3 border placeholder:text-[#45084A]/50 ${
                errors.email ? 'border-red-500' : 'border-[#45084A]/50'
              } rounded-xl focus:outline-none focus:ring-2 focus:ring-[#45084A] focus:border-transparent`}
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-[#45084A] font-semibold text-md">
            Phone Number (provide +254xxxxxxx) No spaces
          </label>
          <div className="mt-1 flex">
            <div className="flex items-center px-4 py-4 border border-r-0 rounded-l-xl bg-purple-50 border-[#45084A]/50">
              <span className="font-semibold text-[#45084A] flex flex-row items-center">
                <span className="mr-2 text-2xl">🇰🇪</span>
                +254
              </span>
            </div>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              type="tel"
              placeholder="700000000"
              className={`flex-1 px-3 py-4 border border-l-0 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-[#45084A] focus:border-transparent placeholder:text-[#45084A]/50 ${
                errors.phone ? 'border-red-500' : 'border-[#45084A]/50'
              }`}
            />
          </div>
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-[#45084A] font-semibold text-md mb-1">
            Gender (This community is exclusively for Women in Tech or aspiring to join Tech)
          </label>
          <div className="w-full py-4 px-3 border bg-purple-50 rounded-xl border-[#45084A]/50 text-[#45084A]">
            Female
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[#45084A] font-semibold text-md mb-1">
            What is your Occupation/Role in Tech? If yours is not among the options provided type in
            your answer in the next question*
          </label>
          <CustomSelect
            options={occupationOptions}
            value={formData.occupation}
            onChange={handleInputChange}
            placeholder="Choose your occupation"
            error={errors.occupation}
            name="occupation"
          />
          {errors.occupation && (
            <p className="mt-1 text-sm text-red-600">{errors.occupation.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-[#45084A] font-semibold text-md mb-1">
            My role is not listed above (Please write your role)
          </label>
          <input
            name="customOccupation"
            value={formData.customOccupation}
            onChange={handleInputChange}
            type="text"
            placeholder="Type your role"
            className={`w-full py-4 px-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#45084A] focus:border-transparent ${
              errors.customOccupation ? 'border-red-500' : 'border-[#45084A]/50'
            }`}
          />
          {errors.customOccupation && (
            <p className="mt-1 text-sm text-red-600">{errors.customOccupation.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-[#45084A] font-semibold text-md mb-1">
            Years of Experience in Tech (Please select one)*
          </label>
          <CustomSelect
            options={experienceOptions}
            value={formData.experienceLevel}
            onChange={handleInputChange}
            placeholder="Select experience level"
            error={errors.experienceLevel}
            name="experienceLevel"
          />
          {errors.experienceLevel && (
            <p className="mt-1 text-sm text-red-600">{errors.experienceLevel.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-[#45084A] font-semibold text-md mb-1">
            Are you interested in being a mentor, mentee, or both?*
          </label>
          <CustomSelect
            options={roleOptions}
            value={formData.role}
            onChange={handleInputChange}
            placeholder="Select role preference"
            error={errors.role}
            name="role"
          />
          {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-[#45084A] font-semibold text-md mb-1">
            What specific areas of your technical expertise would you like to develop further?*
          </label>
          <textarea
            name="expertiseAreas"
            value={formData.expertiseAreas}
            onChange={handleInputChange}
            placeholder="Type your answer"
            rows={4}
            className={`w-full py-4 px-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#45084A] focus:border-transparent ${
              errors.expertiseAreas ? 'border-red-500' : 'border-[#45084A]/50'
            }`}
          />
          {errors.expertiseAreas && (
            <p className="mt-1 text-sm text-red-600">{errors.expertiseAreas.message}</p>
          )}
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            className="px-8 py-3 border border-[#45084A] rounded-xl text-[#45084A] font-semibold hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 bg-[#45084A] text-white rounded-xl font-semibold hover:bg-[#45084A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
