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
    <div className="fixed inset-0 z-50 flex items-start justify-center p-10 overflow-y-auto bg-gray-800 bg-opacity-75">
      <div className="font-extralight relative w-full max-w-[535px] sm:w-11/12 md:w-10/12 lg:w-3/4 xl:w-[535px] h-auto rounded-md bg-zinc-50 flex flex-col m-4 font-geologica">
        <div className='px-8 pt-8'>
            <div className="flex items-center justify-between pb-4 mb-4 border-b">
                <h2 className="font-medium text-md">
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
                        <img src="../images/welcome.png" alt="Expense section screenshot" />
                        <p className='mt-4 text-sm font-medium'>
                            Slice, an intuitive expense splitter and tracker that simplifies managing shared costs with clear and fair solutions.
                        </p>
                    </div>
                )}
                {currentStep === 2 && (
                    <div>
                        <img src="../images/step1.png" alt="Profile page screenshot" />
                        <p className='mt-4 text-sm font-medium'>
                            Start by setting up your profile to personalize your experience.
                        </p>
                    </div>
                )}
                {currentStep === 3 && (
                    <div>
                        <img src="../images/step2.png" alt="Add friend screenshot" />
                        <p className='mt-4 text-sm font-medium'>
                            Invite your friends to join by adding them to your account.
                        </p>
                    </div>
                )}
                {currentStep === 4 && (
                    <div>
                        <img src="../images/step3.png" alt="Add group screenshot" />
                        <p className='mt-4 text-sm font-medium'>
                            Organize your shared expenses by creating a group for you and your friends.
                        </p>
                    </div>
                )}
                {currentStep === 5 && (
                    <div>
                        <img src="../images/step4.png" alt="Add expense screenshot" />
                        <p className='mt-4 text-sm font-medium'>
                            Input the expenses you want to share, making it easy to track costs together.
                        </p>
                    </div>
                )}
            </div>
        </div>
            

            <div className="flex justify-end p-4 mt-10 space-x-4 bg-light-indigo rounded-b-md text-medium">
            <button
                onClick={closeIntroModal}
                className="flex items-center px-4 py-2 text-black transition rounded-lg"
            >
                <span>Close</span>
            </button>
            {currentStep < 5 && (
                <button
                onClick={nextStep}
                className="px-4 py-2 text-white transition rounded-lg bg-button"
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
