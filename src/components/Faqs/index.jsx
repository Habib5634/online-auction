'use client'
import React, { useState } from 'react'

const Faqs = () => {
    const faqData = [
        {
          question: "How do I participate in a live auction?",
          answer:
            "To join a live auction, simply create an account, browse available auctions, and click on the Join Auction button for the desired item.",
        },
        {
          question: "Is there a fee for participating in auctions?",
          answer:
            "There are no fees for browsing or participating in auctions. However, a small transaction fee may apply upon winning an auction",
        },
        {
          question: "What happens if I win an auction?",
          answer:
            "If you win an auction, you’ll receive an email with payment instructions and further steps for claiming your item.",
        },
        {
          question: "Can I cancel my bid during an auction?",
          answer:
            "Once a bid is placed, it cannot be canceled. Please bid responsibly.",
        },
        
      ];
      const [activeIndex, setActiveIndex] = useState(null);
      const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index); // Toggle the active question
      };

  return (
    <div id='faqs' className='bg-aboutbg bg-cover  px-6 md:px-10 py-32  w-full  overflow-hidden relative'>
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            <div className=' max-w-[1440px] mx-auto w-full gap-5 relative z-[0.1]'>
    <h1 className='text-[35px] md:text-[40px] lg:text-[48px] xl:text-[60px] text-center text-white font-medium my-8 leading-tight'>FAQs</h1>
    <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="   p-4 cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">
                  {faq.question}
                </h3>
                <span
                  className={`transition-transform text-white duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
                <p className={`${activeIndex === index ? 'block mt-2  h-fit':'h-0 overflow-hidden'} text-white anim3`}>{faq.answer}</p>
              
            </div>
          ))}
        </div>

    </div>
</div>
  )
}

export default Faqs