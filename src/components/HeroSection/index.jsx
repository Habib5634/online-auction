import React from 'react'

const HeroSection = () => {
    return (
        <div className="relative h-screen -mt-[81px] w-full overflow-hidden">
            {/* Video Background */}

            <div className="absolute inset-0 z-[-1]">
                <video
                    className="w-full h-full object-cover scale-150"
                    src="/assets/bgvideo.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                ></video>
            </div>

            {/* Transparent Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Hero Content */}
            <div className="relative flex flex-col items-center justify-center text-center h-full text-white px-6">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">The Best Place To buy And Sell</h1>
                <p className="text-lg md:text-xl max-w-2xl">
                    Your Gateway to Seamless Auctions and Competitive Bidding.
                </p>
            </div>

        </div>
    )
}

export default HeroSection
