import { useState } from 'react';
import PropTypes from 'prop-types';

export default function Introduction({ closeIntroModal }) {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="fixed p-10 inset-0 z-50 flex items-start justify-center overflow-y-auto bg-gray-800 bg-opacity-75">
      <div className="font-extralight relative w-full max-w-[535px] sm:w-11/12 md:w-10/12 lg:w-3/4 xl:w-[535px] h-auto rounded-md px-8 py-8 bg-zinc-50 flex flex-col m-4 font-geologica">

        <div className="flex justify-between items-center mb-4 border-b pb-4">
          <h2 className="text-md font-medium">
            {currentStep === 1 && 'Welcome!'}
            {currentStep === 2 && 'Create Your Profile'}
            {currentStep === 3 && 'Add Your Friends'}
            {currentStep === 4 && 'Create a Group'}
            {currentStep === 5 && 'Add Expenses'}
          </h2>
          <span className="text-sm text-gray-500">{currentStep}/5</span>
        </div>

        <div>
          {currentStep === 1 && (
            <div>
              <img src="../images/welcome.png" alt="" />
              <p className='text-sm mt-4'>
                Slice, an intuitive expense splitter and tracker that simplifies managing shared costs with clear and fair solutions.
              </p>
            </div>
          )}
          {currentStep === 2 && (
            <div>
              <img src="../images/step1.png" alt="" />
              <p className='text-sm mt-4'>
                Start by setting up your profile to personalize your experience.
              </p>
            </div>
          )}
          {currentStep === 3 && (
            <div>
              <img src="../images/step2.png" alt="" />
              <p className='text-sm mt-4'>
                Invite your friends to join by adding them to your account.
              </p>
            </div>
          )}
          {currentStep === 4 && (
            <div>
              <img src="../images/step3.png" alt="" />
              <p className='text-sm mt-4'>
                Organize your shared expenses by creating a group for you and your friends.
              </p>
            </div>
          )}
          {currentStep === 5 && (
            <div>
              <img src="../images/step4.png" alt="" />
              <p className='text-sm mt-4'>
                Input the expenses you want to share, making it easy to track costs together.
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-end space-x-4">
          <button
            onClick={closeIntroModal}
            className="text-black px-4 py-2 rounded-lg transition flex items-center"
          >
            <span>Close</span>
          </button>
          {currentStep < 5 && (
            <button
              onClick={nextStep}
              className="bg-button text-white px-4 py-2 rounded-lg transition"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

Introduction.propTypes = {
  closeIntroModal: PropTypes.func.isRequired,
};
