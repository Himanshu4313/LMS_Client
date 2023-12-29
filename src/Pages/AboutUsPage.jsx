import AboutImage from "../../src/assets/aboutmain.png";
import CarouselSlider from "../Components/CarouselSlider";
import { celebraties } from "../constant/SliderData";
import HomeLayout from "../Layouts/HomeLayout";
function AboutUsPage() {
  return (
    <>
      <HomeLayout>
        <div className="flex flex-col justify-center item-center pt-20 md:pl-20 lg:pl-20 pl-10 pb-20 text-white">
          <div className=" flex justify-center  item-center gap-5 mx-10 flex-col-reverse md:flex-row lg:flex-row">
            <section className=" w-fit md:w-1/2 lg:w-1/2 space-y-10 flex flex-col justify-center item-center">
              <h1 className="text-yellow-500 font-bold text-4xl">
                Affordable and quality education
              </h1>
              <p className="text-slate-300 font-semibold">
                Our goal to provide the affordable and quality education to the
                world. We are providing the platform for the aspiring teachers
                and students to share their skill , creativity and knowledge to
                each other to empower and contribute in the growth and wellness
                of mark mankind.
              </p>
            </section>
            <section className=" w-fit md:w-1/2 lg:w-1/2 flex justify-center item-center ">
              <img src={AboutImage} alt="aboutImage" />
            </section>
          </div>

          {/* carousel */}

          <div className="carousel w-10/12 md:w-1/2 lg:w-1/2 my-16 m-auto">
            {celebraties.map((cle) => (
              <CarouselSlider
                key={cle.sliderId}
                image={cle.image}
                title={cle.title}
                description={cle.description}
                sliderId={cle.sliderId}
                totalSlide={5}
              />
            ))}
          </div>
        </div>
      </HomeLayout>
    </>
  );
}

export default AboutUsPage;
