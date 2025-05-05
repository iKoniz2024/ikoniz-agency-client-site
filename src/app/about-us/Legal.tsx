import Image from "next/image";

function Legal() {
  return (
    <section className="text-gray-600 body-font bg-[#F4F4F4] mb-24">
      <div className="container px-5 py-10 md:py-16 mx-auto">
        <div className="flex flex-col text-center w-full mb-6 md:mb-10">
          <h1 className="title-font text-2xl md:text-3xl lg:text-4xl mb-4 font-bold text-black">
            Legal
          </h1>
        </div>
        <div className="flex flex-wrap -m-2 md:-m-4">
          <div className="p-2 md:p-4 w-full md:w-1/3">
            <div className="flex flex-col gap-6">
              <div className="flex rounded-lg h-full p-6 md:p-8 flex-col bg-white">
                <div className="flex items-center mb-3 h-[60px] md:h-[80px] w-full">
                  <div className="w-12 h-12 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                    <Image src="/Rectangle 18.png" width={64} height={64} alt="Icon" />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-gray-900 text-base md:text-lg title-font font-semibold">
                      CEO
                    </h2>
                    <p className="leading-relaxed text-sm md:text-base">Shamim Hosain</p>
                  </div>
                </div>
              </div>
              <div className="flex rounded-lg h-full p-6 md:p-8 flex-col bg-white">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                    <Image src="/messages-3.png" width={32} height={32} alt="Icon" />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-gray-900 text-base md:text-lg title-font font-semibold">
                      Contact information
                    </h2>
                    <p className="leading-relaxed text-sm md:text-base">info@tourgeeky.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 md:p-4 w-full md:w-1/3">
            <div className="flex rounded-lg h-full p-6 md:p-8 flex-col bg-white">
              <div className="items-center mb-3 md:pt-10">
                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                  <Image src="/building.png" width={32} height={32} alt="Icon" />
                </div>
                <h2 className="text-gray-900 text-base md:text-lg title-font font-semibold">
                  Website operator
                </h2>
              </div>
              <div className="flex-grow">
                <p className="leading-relaxed text-sm md:text-base">
                  Tour Geeky, James Wattstraat 77-P1097 DL, Amsterdam, Netherlands
                </p>
              </div>
            </div>
          </div>
          <div className="p-2 md:p-4 w-full md:w-1/3">
            <div className="flex flex-col gap-6">
              <div className="flex rounded-lg h-full p-6 md:p-8 flex-col bg-white">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                    <Image src="/bill.png" width={32} height={32} alt="Icon" />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-gray-900 text-base md:text-lg title-font font-semibold">
                      Commercial registration
                    </h2>
                    <p className="leading-relaxed text-sm md:text-base">
                      Dutch Chamber of Commerce, KvK 59620285
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex rounded-lg h-full p-6 md:p-8 flex-col bg-white">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                    <Image src="/clipboard.png" width={32} height={32} alt="Icon" />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-gray-900 text-base md:text-lg title-font font-semibold">
                      VAT number
                    </h2>
                    <p className="leading-relaxed text-sm md:text-base">NL853573876B01</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Legal;
