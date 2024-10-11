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
                <div className="h-[25px] bg-button text-white text-sm flex items-center justify-center p-4 font-light gap-2">
                    <p><span className="font-bold">Welcome to our app !</span> —no login required, just dive right in! <span className="underline font-normal cursor-pointer" onClick={openIntroModal}>Click here to see steps to get started.</span></p>
                    <button className="ml-4" onClick={closeBanner}>
                        <img src="../../images/Xmark.svg" className="" />
                    </button>
                </div>
            )}
            {isIntroModalOpen && (
                <Introduction closeIntroModal={closeIntroModal} />
            )}
        </div>
    )
}