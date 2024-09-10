import { useState } from "react";
import EcommercePage from "./EcommercePage";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
          newErrors.email = "Email is invalid";
        break;
      case 2:
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.zipCode) newErrors.zipCode = "Zip code is required";
        break;
      case 3:
        if (!formData.cardNumber)
          newErrors.cardNumber = "Card number is required";
        if (!formData.expiryDate)
          newErrors.expiryDate = "Expiry date is required";
        if (!formData.cvv) newErrors.cvv = "CVV is required";
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(step)) {
      setSubmitted(true);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-4xl font-bold text-gray-600 pb-10 ">
              Personal Details
            </h2>
            <div className="w-full flex flex-col items-start gap-2 ">
              <label
                htmlFor="firstName"
                className=" font-semibold text-gray-600 text-xl"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className=" w-full rounded-md shadow-sm outline-none p-2"
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">{errors.firstName}</span>
              )}
            </div>
            <div className="w-full flex flex-col items-start ">
              <label
                htmlFor="lastName"
                className=" font-semibold text-gray-600 text-xl"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className=" w-full rounded-md shadow-sm outline-none p-2"
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">{errors.lastName}</span>
              )}
            </div>
            <div className="w-full flex flex-col items-start gap-2">
              <label
                htmlFor="email"
                className=" font-semibold text-gray-600 text-xl"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className=" w-full rounded-md shadow-sm outline-none p-2"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email}</span>
              )}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="text-4xl font-bold text-gray-600 pb-10 ">Address</h2>
            <div className="w-full flex flex-col items-start gap-2 ">
              <label
                htmlFor="address"
                className=" font-semibold text-gray-600 text-xl"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className=" w-full rounded-md shadow-sm outline-none p-2"
              />
              {errors.address && (
                <span className="text-red-500 text-sm">{errors.address}</span>
              )}
            </div>
            <div className="w-full flex flex-col items-start gap-2">
              <label
                htmlFor="city"
                className=" font-semibold text-gray-600 text-xl"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className=" w-full rounded-md shadow-sm outline-none p-2"
              />
              {errors.city && (
                <span className="text-red-500 text-sm">{errors.city}</span>
              )}
            </div>
            <div className="w-full flex flex-col items-start gap-2 ">
              <label
                htmlFor="zipCode"
                className=" font-semibold text-gray-600 text-xl"
              >
                Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className=" w-full rounded-md shadow-sm outline-none p-2"
              />
              {errors.zipCode && (
                <span className="text-red-500 text-sm">{errors.zipCode}</span>
              )}
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="text-4xl font-bold text-gray-600 pb-10 ">
              Payment Details
            </h2>
            <div className="w-full flex flex-col items-start gap-2 ">
              <label
                htmlFor="cardNumber"
                className=" font-semibold text-gray-600 text-xl"
              >
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className=" w-full rounded-md shadow-sm outline-none p-2"
              />
              {errors.cardNumber && (
                <span className="text-red-500 text-sm">
                  {errors.cardNumber}
                </span>
              )}
            </div>
            <div className="w-full flex flex-col items-start gap-2 ">
              <label
                htmlFor="expiryDate"
                className=" font-semibold text-gray-600 text-xl"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className=" w-full rounded-md shadow-sm outline-none p-2"
              />
              {errors.expiryDate && (
                <span className="text-red-500 text-sm">
                  {errors.expiryDate}
                </span>
              )}
            </div>
            <div className="w-full flex flex-col items-start gap-2 ">
              <label
                htmlFor="cvv"
                className=" font-semibold text-gray-600 text-xl"
              >
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                className=" w-full rounded-md shadow-sm outline-none p-2"
              />
              {errors.cvv && (
                <span className="text-red-500 text-sm">{errors.cvv}</span>
              )}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  if (submitted) {
    return <EcommercePage />;
  }

  return (
    <div className=" w-full h-screen bg-blue-100 flex items-center justify-center">
      <form
        className=" bg-blue-50 p-10 rounded-lg md:min-w-[500px] md:min-h-[500px] flex flex-col items-center justify-between"
        onSubmit={handleSubmit}
      >
        {renderStep()}
        <div className="flex items-center justify-between gap-10">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Previous
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MultiStepForm;
