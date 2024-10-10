import Introduction from "./Introduction"
import { useState } from "react";

export default function Banner() {

    const [isIntroModalOpen, setIsIntroModalOpen] = useState(false)
    const [isBannerVisible, setIsBannerVisible] = useState(true)

    function openIntroModal() {
      setIsIntroModalOpen(true)
    }
  
    function closeIntroModal() {
      setIsIntroModalOpen(false)
    }

    function closeBanner() {
        setIsBannerVisible(false); // Hide the banner when this function is called
    }

    return (
        <div>
            {isBannerVisible && (
                <div className="h-[25px] bg-button text-white text-sm flex items-center justify-between p-4 font-light gap-2">
                    <p><span className="font-bold">Welcome back!</span> Since it has been some time since your last login, would you like to be reintroduced to the app?</p>
                    <div className="flex items-center">
                        <span
                            className="underline font-bold"
                            onClick={openIntroModal}
                        >
                            Reintroduce me
                        </span>
                        <button className="ml-4" onClick={closeBanner}>
                            <img src="../../images/Xmark.svg" className="" />
                        </button>
                        </div>
                </div>
            )}
            {isIntroModalOpen && (
                <Introduction closeIntroModal={closeIntroModal} />
            )}
        </div>
    )
}