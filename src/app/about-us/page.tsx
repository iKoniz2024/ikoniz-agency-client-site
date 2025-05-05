import React from "react";

import MainLayout from "@/layout/MainLayout";
import Image from "next/image";

function AboutUs() {
  return (
   
      <MainLayout>
      <div className="px-6 md:px-24">
        <section className="mt-10 text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold mb-2">
            About Us
          </h2>
          <p className="text-base sm:text-lg md:text-[18px] text-[#010A15B2] leading-relaxed">
            Tourgeeky is an online booking platform for museums and attractions
            that connects travelers worldwide with more ways to experience
            culture.
          </p>
        </section>
<section className="text-gray-600 body-font">
      <div className="container mx-auto flex py-12 md:py-24 flex-col-reverse md:flex-row items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left items-center text-center px-4 md:px-0">
          <h1 className="title-font text-2xl sm:text-3xl md:text-4xl mb-4 font-bold text-black">
            Making culture more accessible
          </h1>
          <p className="mb-8 leading-relaxed text-base sm:text-lg">
            In 2023, Tour Geeky founders embarked on a mission to make it easier
            for travelers to experience the best museums and attractions
            worldwide. Since then, we've brought millions of people to museums
            and attractions around the world with our instant and intuitive
            mobile booking technology. Every day, we work with thousands of
            renowned museums, thrilling attractions, and hidden gems to offer
            travelers unforgettable experiences.
          </p>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-full px-4 md:px-0 mb-8 md:mb-0">
          <Image
            className="object-cover object-center rounded"
            alt="hero"
            src="/image 7.png"
            width={530}
            height={560}
          />
        </div>
      </div>
    </section>       
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
       <section className="text-gray-600 body-font">
             <div className="container mx-auto flex py-12 md:py-24 flex-col md:flex-row items-center">
               <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left items-center text-center px-4 md:px-0">
                 <h1 className="title-font text-2xl sm:text-3xl md:text-4xl mb-4 font-bold text-black">
                   Need travel inspiration? <br className="hidden md:block" /> We’ve got plenty.
                 </h1>
                 <p className="mb-8 leading-relaxed text-base sm:text-lg">
                   From insider guides to must-see cities to in-depth interviews with
                   <span className="hidden md:inline">
                     <br />
                   </span>
                   top museums & attractions, get all the inspiration you need on the
                   <span className="hidden md:inline">
                     <br />
                   </span>
                   Tour Geeky’s Blog.
                 </p>
               </div>
               <div className="lg:max-w-2xl lg:w-full md:w-1/2 w-full px-4 md:px-0 mb-8 md:mb-0">
                 <Image
                   className="object-cover object-center rounded"
                   alt="hero"
                   src="/image 8.png"
                   width={700}
                   height={420}
                 />
               </div>
             </div>
           </section>
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
      </div>
      </MainLayout>
    
  );
}

export default AboutUs;
