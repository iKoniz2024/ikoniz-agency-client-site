import MainLayout from "@/layout/MainLayout";
import React from "react";

export default function PrivacyPolicy() {
  return (
   <MainLayout>
     <div className="bg-white text-gray-800 px-4 sm:px-8 md:px-16 lg:px-32 py-12 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>

        <p className="mb-6">
          The protection of your personal data is important to us. With this privacy policy, we would like to explain to you in more detail what personal data we collect and for what purposes this data is processed. United States residents should consult the section titled “United States residents’ rights” for rights that apply to them. Please also see our supplementary CCPA.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            This privacy policy describes the way our company, Tourgeeky International B.V. and our group companies, collect, store, process and use personal data. As a visitor or customer of the www.tourgeeky.com website, Tourgeeky iOS and Android applications and other applications that facilitate our products and services, you have given your consent for our collection and use of your personal data. We use this data to improve our products and services and help you discover and embrace cultural experiences. As personal data can be directly or indirectly linked to your identity, contact information or location, we take our responsibility to safeguarding your personal data very seriously.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Personal Data</h2>
          <p className="mb-4">
            Your name, telephone number, email address and data relating to your activities on our website are examples of information that directly or indirectly relates to your identity, contact information or location.
          </p>
          <p>
            We also collect your personal data when you visit our website or use one of our mobile applications. This information may include your IP address, location details, general preferences, settings and system specifications.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">How We Use Personal Data</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Tailoring content</li>
            <li>Reviews</li>
            <li>Customer assistance</li>
            <li>Marketing purposes</li>
            <li>Consent</li>
            <li>Overall legal compliance</li>
            <li>Safe payments</li>
          </ul>
          <p className="mt-4 font-semibold">
            We will only store your personal data temporarily for the purposes listed above, save for situations where laws or regulations dictate otherwise.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Newsletters</h2>
          <p>
            We use newsletters to inform you on recent developments and introduce our new products, special offers and promotions...
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Your User Accounts</h2>
          <p>
            You may have created a Tourgeeky account by verifying your email address, connecting via a social media platform or logging in through your Google or Facebook account...
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Location</h2>
          <p>
            When using a mobile device, we may request your permission before we can access your location. You are free to deny access, although this may result in some functionality being unavailable.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Legal Bases</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Performance of a contract</li>
            <li>Legitimate interest</li>
            <li>Consent</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Cookies And Google Analytics</h2>
          <p>
            We want you to enjoy visiting our platform, and we use cookies to ensure that our website runs smoothly and reliably. Cookies are small text files...
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Third Party Access To Personal Data</h2>
          <p className="mb-2">
            We work with a number of third parties and may share your personal data for certain purposes.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Suppliers</li>
            <li>Business partners</li>
            <li>Other Tourgeeky entities</li>
            <li>Other third parties</li>
          </ul>
          <p className="mt-2 font-medium">For example:</p>
          <p className="mt-1">
            In order for you to select an interesting voucher offer, we may transmit your IP address and data related to your order to Sovendus GmbH...
          </p>
        </section>
      </div>
    </div>
   </MainLayout>
  );
}
