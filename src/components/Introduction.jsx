import PropTypes from 'prop-types';

export default function Introduction({closeIntroModal}) {
    return (
        <div className="fixed p-10 inset-0 z-50 flex items-start justify-center overflow-y-auto bg-gray-800 bg-opacity-75">
            <div className="font-extralight relative w-full max-w-[535px] sm:w-11/12 md:w-10/12 lg:w-3/4 xl:w-[535px] h-auto rounded-md px-8 py-8 bg-zinc-50 flex flex-col m-4 font-geologica">
                <h1>This app is ~~~~~</h1>
                <div>
                    <p>Step 1. Create your profile here</p>
                    <p>Step 2. Add your friends friends</p>
                    <p>Step 3. Create group</p>
                    <p>Step 4. Add expenses you wanna share</p>
                </div>
                <button onClick={closeIntroModal} className="flex justify-center mt-10 items-center">
                    <img src="../../images/Xmark.svg" className="mr-1" /> 
                    <span className="font-normal">Close</span>
                </button>
            </div>
        </div>
    )
}

Introduction.propTypes = {
    closeIntroModal: PropTypes.func.isRequired,
  };