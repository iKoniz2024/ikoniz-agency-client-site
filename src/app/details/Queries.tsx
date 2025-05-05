import { IoCheckmarkOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { TbPointFilled } from "react-icons/tb";
import {
  FiInfo,
  FiMapPin,
  FiPhone,
  FiClock,
  FiUsers,
  FiCalendar,
  FiLock,
  FiGlobe,
} from "react-icons/fi";

interface QueryData {
  whoWillGuide?: string;
  termsAndConditions?: string;
  summarize?: { id: number; summaryText: string }[];
  reference_code?: string;
  productKeywords?: { id: number; summaryText: string }[];
  option: {
    id: number;
    host_languages: Array<{ keyword: string }>;
    audio_guides_languages: Array<{ keyword: string }>;
    booklet_languages: Array<{ keyword: string }>;
    name: string;
    reference_code: string;
    maximum_group_size: number;
    is_wheelchair_accessible: boolean;
    skip_the_line_option: string;
    skip_the_line_enabled: boolean;
    valid_for: number;
    has_fixed_time: boolean;
    audio_guide: boolean;
    booklet: boolean;
    is_private: boolean;
    is_template: boolean;
    drop_off_type: string;
    meeting_point_type: string;
  };
  isTransportIncluded: boolean;
  isFoodIncluded: boolean;
  departure_from: string;
  duration: string;
  emergencyContacts?: { id: number; name: string; phone: string }[];
  notSuitable?: { id: number; condition: string }[];
  inclusions?: { id: number; name: string }[];
  exclusions?: { id: number; name: string }[];
  notAllowed?: { id: number; restriction: string }[];
  location?: { id: number; address: string }[];
  mustCarryItems?: { id: number; item: string }[];
  languageType?: string;
  contactInformation?: string;
  bookingInformation?: string;
  cancellationPolicy?: string;
  name?: string;
}

function Queries({ data }: { data: QueryData }) {
  return (
    <div className="w-full mx-auto py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          {data.option.name}
        </h1>
        <div className="flex items-center space-x-4 text-gray-600">
          <span className="flex items-center">
            <FiMapPin className="mr-1" /> {data.departure_from}
          </span>
          <span className="flex items-center">
            <FiClock className="mr-1" /> {data.duration}
          </span>
          <span className="flex items-center">
            <FiUsers className="mr-1" /> Max {data.option.maximum_group_size}{" "}
            people
          </span>
          {data.option.reference_code && (
            <span className="flex items-center bg-gray-100 px-2 py-1 rounded">
              <FiLock className="mr-1" /> Ref: {data.option.reference_code}
            </span>
          )}
        </div>
      </div>
      <div className="mb-6 space-y-6">
        {data.summarize && data.summarize.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FiInfo className="mr-2 text-blue-500" /> Tour Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {data.summarize.map((item) => (
                <div key={item.id} className="flex items-start">
                  <TbPointFilled className="mt-1 mr-2 text-blue-500 flex-shrink-0" />
                  <p className="text-gray-700">{item.summaryText}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Inclusions & Exclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.inclusions && data.inclusions.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                What's Included
              </h2>
              <ul className="space-y-3">
                {data.inclusions.map((item) => (
                  <li key={item.id} className="flex items-start">
                    <TbPointFilled className="mt-1 mr-2 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.exclusions && data.exclusions.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                What's Excluded
              </h2>
              <ul className="space-y-3">
                {data.exclusions.map((item) => (
                  <li key={item.id} className="flex items-start">
                    <TbPointFilled className="mt-1 mr-2 text-red-500 flex-shrink-0" />
                    <span className="text-gray-700">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column - Key Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Highlights Section */}

          {/* Detailed Information Sections */}
          <div className="space-y-6">
            {/* Overview Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {/* <h2 className="text-xl font-bold text-gray-800 mb-4">Overview</h2> */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Tour Details
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Tour Type:</span>
                        <span className="font-medium">
                          {data.option.is_private
                            ? "Private Tour"
                            : "Group Tour"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Fixed Schedule:</span>
                        <span className="font-medium">
                          {data.option.has_fixed_time ? "Yes" : "No"}
                        </span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Validity:</span>
                        <span className="font-medium">
                          {data.option.valid_for} days
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Accessibility</h3>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span className="text-gray-600">Wheelchair Access:</span>
                        {data.option.is_wheelchair_accessible ? (
                          <span className="flex items-center text-green-600">
                            <IoCheckmarkOutline className="mr-1" /> Available
                          </span>
                        ) : (
                          <span className="flex items-center text-red-600">
                            <RxCross2 className="mr-1" /> Not Available
                          </span>
                        )}
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-600">Skip-the-Line:</span>
                        {data.option.skip_the_line_enabled ? (
                          <span className="flex items-center text-green-600">
                            <IoCheckmarkOutline className="mr-1" /> Available
                          </span>
                        ) : (
                          <span className="flex items-center text-red-600">
                            <RxCross2 className="mr-1" /> Not Available
                          </span>
                        )}
                      </li>
                    </ul>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Languages Section */}
            {(data.option.host_languages.length > 0 ||
              data.option.audio_guides_languages.length > 0 ||
              data.option.booklet_languages.length > 0) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FiGlobe className="mr-2 text-blue-500" /> Available Languages
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.option.host_languages.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">
                        Live Guide
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {data.option.host_languages.map((lang, index) => (
                          <span
                            key={index}
                            className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                          >
                            {lang.keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.option.audio_guides_languages.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">
                        Audio Guide
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {data.option.audio_guides_languages.map(
                          (lang, index) => (
                            <span
                              key={index}
                              className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm"
                            >
                              {lang.keyword}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                  {data.option.booklet_languages.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">
                        Booklet
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {data.option.booklet_languages.map((lang, index) => (
                          <span
                            key={index}
                            className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
                          >
                            {lang.keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Additional Information */}
            {(data.notSuitable || data.notAllowed || data.mustCarryItems) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Important Information
                </h2>

                <div className="space-y-6">
                  {data.notSuitable && data.notSuitable.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">
                        Not Suitable For
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {data.notSuitable.map((item) => (
                          <span
                            key={item.id}
                            className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm"
                          >
                            {item.condition}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.notAllowed && data.notAllowed.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">
                        Restrictions
                      </h3>
                      <ul className="space-y-2">
                        {data.notAllowed.map((item) => (
                          <li key={item.id} className="flex items-start">
                            <RxCross2 className="mt-0.5 mr-2 text-red-500 flex-shrink-0" />
                            <span className="text-gray-700">
                              {item.restriction}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {data.mustCarryItems && data.mustCarryItems.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-3">
                        What To Bring
                      </h3>
                      <ul className="space-y-2">
                        {data.mustCarryItems.map((item) => (
                          <li key={item.id} className="flex items-start">
                            <IoCheckmarkOutline className="mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{item.item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Key Details */}
        <div className="space-y-6">
          {/* Quick Facts Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Quick Facts
            </h2>
            <ul className="space-y-5">
              <li className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-3">
                  <FiClock className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{data.duration}</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-3">
                  <FiUsers className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Group Size</p>
                  <p className="font-medium">
                    Up to {data.option.maximum_group_size} people
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg mr-3">
                  <FiCalendar className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Validity</p>
                  <p className="font-medium">{data.option.valid_for} days</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-lg mr-3">
                  <FiMapPin className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Departure Point</p>
                  <p className="font-medium">{data.departure_from}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Accessibility Features Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Accessibility
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center justify-between">
                <span className="text-gray-700">Wheelchair Accessible</span>
                {data.option.is_wheelchair_accessible ? (
                  <IoCheckmarkOutline className="mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                ) : (
                  <RxCross2 className="mt-0.5 mr-2 text-red-500 flex-shrink-0" />
                )}
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-700">Skip Line</span>
                {data.option.skip_the_line_enabled ? (
                  <IoCheckmarkOutline className="mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                ) : (
                  <RxCross2 className="mt-0.5 mr-2 text-red-500 flex-shrink-0" />
                )}
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-700">Audio Guide</span>
                {data.option.audio_guide ? (
                  <IoCheckmarkOutline className="mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                ) : (
                  <RxCross2 className="mt-0.5 mr-2 text-red-500 flex-shrink-0" />
                )}
              </li>
              <li className="flex items-center justify-between">
                <span className="text-gray-700">Booklet</span>
                {data.option.booklet ? (
                  <IoCheckmarkOutline className="mt-0.5 mr-2 text-green-500 flex-shrink-0" />
                ) : (
                  <RxCross2 className="mt-0.5 mr-2 text-red-500 flex-shrink-0" />
                )}
              </li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          {data.emergencyContacts && data.emergencyContacts.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FiPhone className="mr-2 text-red-500" /> Emergency Contacts
              </h2>
              <ul className="space-y-3">
                {data.emergencyContacts.map((contact) => (
                  <li
                    key={contact.id}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium">{contact.name}</span>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {contact.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Location Information */}
          {data.location && data.location.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Quick Location
              </h2>
              <ul className="space-y-2">
                {data.location.map((loc) => (
                  <li key={loc.id} className="text-gray-700">
                    {loc.address}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* Policies Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-4">
        <h2 className="text-xl font-bold text-gray-800">Policies</h2>
        {/* Cancellation Policy Section */}
        <div className="py-6 border-b space-y-4">
          <h2 className="font-bold text-gray-600">Free Cancellation </h2>
          <p className=" text-gray-600">
            For a full refund, you must cancel at least 24 hours before the
            experience's start date/time*. If you cancel less than 24 hours
            before the experience's start date/time*, the amount you paid will
            not be refunded. Any changes made less than 24 hours before the
            experience's start date/time* will not be accepted. Non-refundable{" "}
          </p>
          <p className=" text-gray-600">
            These experiences are non-refundable and cannot be changed for any
            reason. If you cancel or ask for an amendment, the amount paid will
            not be refunded.
          </p>
        </div>

        {/* Terms and Conditions Section */}
        <div className="py-6  bg-white">
          <h3 className="text-lg font-semibold mb-4">Terms and Conditions</h3>

          <div className="space-y-4 text-sm">
            {/* Cancellation Policy */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h4 className="font-medium text-green-800 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Cancellation Policy
              </h4>
              <p className="mt-2 text-green-700">
                Full refund available if cancelled{" "}
                <span className="font-semibold">24+ hours before</span> the
                tour.
                <span className="block mt-1 text-red-600">
                  No refunds for cancellations under 24 hours.
                </span>
              </p>
            </div>

            {/* Booking Policy */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-800 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                1. Booking Policy
              </h4>
              <p className="mt-2 text-blue-700">
                Confirmation email sent after payment. Present voucher at
                check-in.
              </p>
            </div>

            {/* Changes Policy */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h4 className="font-medium text-purple-800 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                2. Changes Policy
              </h4>
              <p className="mt-2 text-purple-700">
                Date/time changes subject to availability (must request 24+
                hours prior).
              </p>
            </div>

            {/* No-Show Policy */}
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <h4 className="font-medium text-amber-800 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                3. No-Show Policy
              </h4>
              <p className="mt-2 text-amber-700">
                Late arrivals after 15 minutes forfeit the tour without refund.
              </p>
            </div>

            {/* Weather Policy */}
            <div className="bg-sky-50 p-4 rounded-lg border border-sky-100">
              <h4 className="font-medium text-sky-800 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
                </svg>
                4. Weather Policy
              </h4>
              <p className="mt-2 text-sky-700">
                Rainchecks offered for severe weather cancellations initiated by
                us.
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-400">
            By booking, you agree to these terms. Policies last updated{" "}
            {new Date().toLocaleDateString()}.
          </p>
        </div>
        {/* {data.cancellationPolicy && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Cancellation Policy
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {data.cancellationPolicy}
                  </p>
                </div>
              )}

              {data.bookingInformation && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Booking Information
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {data.bookingInformation}
                  </p>
                </div>
              )}

              {data.termsAndConditions && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Terms & Conditions
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {data.termsAndConditions}
                  </p>
                </div>
              )} */}
      </div>
    </div>
  );
}

export default Queries;
