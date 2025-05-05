import Image from "next/image";

function WhatWeOffer() {
  return (
    <section className="text-gray-600 body-font bg-[#F4F4F4] my-2">
      <div className="container px-5 py-10 md:py-16 mx-auto">
        <div className="flex flex-col text-center w-full mb-6 md:mb-10">
          <h1 className="title-font text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4">
            What We Offer
          </h1>
        </div>
        <div className="flex flex-wrap -m-2 md:-m-4 md:px-10 lg:px-36">
          <div className="p-2 md:p-4 w-full md:w-1/3">
            <div className="flex rounded-lg h-full p-6 md:p-8 flex-col bg-white">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                  <Image src="/3square.png" width={32} height={32} alt="Icon" />
                </div>
                <h2 className="text-gray-900 text-base md:text-lg title-font font-semibold">
                  Stay flexible
                </h2>
              </div>
              <div className="flex-grow">
                <p className="leading-relaxed text-sm md:text-base">
                  Flexible cancellation options on all venues
                </p>
              </div>
            </div>
          </div>
          <div className="p-2 md:p-4 w-full md:w-1/3">
            <div className="flex rounded-lg h-full p-6 md:p-8 flex-col bg-white">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                  <Image src="/flash.png" width={32} height={32} alt="Icon" />
                </div>
                <h2 className="text-gray-900 text-base md:text-lg title-font font-semibold">
                  Book with confidence
                </h2>
              </div>
              <div className="flex-grow">
                <p className="leading-relaxed text-sm md:text-base">
                  Easy booking and skip-the-line entry on your phone
                </p>
              </div>
            </div>
          </div>
          <div className="p-2 md:p-4 w-full md:w-1/3">
            <div className="flex rounded-lg h-full p-6 md:p-8 flex-col bg-white">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                  <Image src="/airdrop.png" width={32} height={32} alt="Icon" />
                </div>
                <h2 className="text-gray-900 text-base md:text-lg title-font font-semibold">
                  Enjoy culture your way
                </h2>
              </div>
              <div className="flex-grow">
                <p className="leading-relaxed text-sm md:text-base">
                  The best experiences at museums and attractions worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatWeOffer;
