import Image from "next/image";

function Hero() {
  return (
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
  );
}

export default Hero;
