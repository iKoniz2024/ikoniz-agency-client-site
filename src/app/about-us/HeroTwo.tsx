import Image from "next/image";

function HeroTwo() {
  return (
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
  );
}

export default HeroTwo;
