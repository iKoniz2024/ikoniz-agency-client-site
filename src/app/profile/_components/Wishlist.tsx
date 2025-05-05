import Image from "next/image"
import { HiOutlineTicket } from "react-icons/hi2";
import { TfiEraser } from "react-icons/tfi";

function Wishlist() {
  return (
    <div>
      <main className="flex-1 ">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold ">
            Wishlist <span className="text-red-500">(0)</span>
          </h1>
          <button className="text-gray-500 hover:text-gray-700 flex justify-center items-center gap-2 text-[14px]">
          <TfiEraser />
          Clear All
          </button>
        </div>

        <div className="flex flex-col items-center mt-20">
          <div className="flex flex-col items-center p-6 bg-white ">
            <div className="  rounded-md flex items-center justify-center mb-4">
            <Image
              src="/wishlist-empty .png"
              width={280}
              height={160}
              alt="empty-wishlist"
            />
            </div>
            <h2 className="text-lg font-semibold">Your wishlist is empty</h2>
            <p className="text-gray-500 text-center mt-2">
              Save activities to your wishlist by clicking on the heart icon.
            </p>
            <button className="mt-6 px-6 py-2 bg-red-500 text-[15px] text-white rounded-md hover:bg-red-600 flex justify-center items-center gap-2">
              See All Tickets <HiOutlineTicket  size={15}/>

            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Wishlist