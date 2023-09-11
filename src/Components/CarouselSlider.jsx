function CarouselSlider({ image, title, description, sliderId, totalSlide }) {
    return (
        <>
            <div id={`slide${sliderId}`} className="carousel-item relative w-full ">
                <div className='flex flex-col item-center justify-center text-center gap-4 px-[1%] md:px-[15%] lg:px-[15%] '>
                    <img src={image} className="w-40 rounded-full border-2 border-gray-300 my-1 m-auto" />
                    <p className='text-xl text-gray-300'>
                        {description}
                    </p>
                    <h1 className='text-2xl font-semibold'>{title}</h1>
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href={`#slide${sliderId == 1 ? totalSlide : sliderId - 1}`} className="btn btn-circle">❮</a>
                        <a href={`#slide${sliderId == totalSlide ? 1 : sliderId + 1}`} className="btn btn-circle">❯</a>
                    </div>
                </div>

            </div>
        </>
    );
}
export default CarouselSlider;