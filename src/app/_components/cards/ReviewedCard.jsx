import Image from "next/image";
import { FaCalendar, FaUsers } from "react-icons/fa6";
import { TbTicket } from "react-icons/tb";
import { TfiEraser } from "react-icons/tfi";
function ReviewedCard() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between mt-5">
        <div className="flex flex-col sm:flex-row items-start">
          {/* Image */}
          <div className="relative w-full sm:w-32 h-40 sm:h-36 mb-4 sm:mb-0 mr-0 sm:mr-4">
            <Image
              src="https://cdn.pixabay.com/photo/2024/10/24/03/36/ai-generated-9144650_1280.jpg"
              alt="Dubai Skydive Experience"
              layout="fill"
              className="object-cover rounded-md"
            />
            <span className="absolute top-2 left-2 bg-[#F8B101] font-bold text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
              Visited
            </span>
            <span className="absolute top-10 left-2 bg-[#F8B101] font-bold text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
              Already Reviewed
            </span>
          </div>

          {/* Details */}
          <div>
            <h3 className="text-lg font-bold mb-1">
              Dubai: Tandem Skydive Experience at The Palm
            </h3>
            <p className="text-gray-500 text-sm flex items-center mb-1">
              <span className="mr-2">📷 24 Hour & Digital Walking Tour</span>
            </p>
            <p className="text-gray-500 text-sm flex items-center mb-1">
              <span className="mr-2">⏰ 1 hour</span>
            </p>
            <p className="text-gray-500 text-sm flex items-center mb-4">
              <span className="mr-2 flex items-center gap-2">
                <FaCalendar /> 15 October 2023
              </span>
            </p>
            <div className="flex gap-5">
              <p className="text-gray-900 text-sm">
                <span className="flex gap-1 items-center">
                  <FaUsers />2 Adults x €37.68
                </span>
              </p>
              <p className="text-gray-900 text-sm">
                <span className="flex gap-1 items-center">
                  <FaUsers />2 Child x €16.68
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Price Section */}
      </div>
      <div className="pl-8 ">
        <div className="mt-4 pl-2 bg-white  border-l-4 border-[#DD2509]">
          {/* <!-- Review Title --> */}
          <h2 className="text-lg font-semibold mt-2">
            Your rating & review of this service
          </h2>
          {/* <!-- Rating and Time --> */}
          <div className="flex items-center  gap-4">
            {/* <!-- Stars --> */}
            <div className="flex space-x-1 text-yellow-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {/* <!-- Repeat this SVG five times for a five-star rating --> */}
            </div>
            <span className="text-gray-500 text-sm border-l-2 pl-4">2 mins ago</span>
          </div>

          {/* <!-- Review Text --> */}
          <p className="text-gray-700 mt-2 text-[15px]">
            An amazing welcome to my first time in Rome, a efficient way to
            enjoy and efficiently transported thru the main attraction of Rome
            in one day. Lovely way you can explore on your own the areas and
            come back and catch the bus back safely. I WILL DO IT AGAIN IN THE
            SAME WAY.
          </p>
        </div>
      </div>
      
    </div>
  );
}

export default ReviewedCard;




