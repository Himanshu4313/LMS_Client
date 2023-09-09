import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from 'react-icons/bs';
function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
    <>
      <footer className=' flex justify-between items-center flex-col md:flex-row lg:flex-row py-3 px-5 bg-slate-800 text-white relative left-0 bottom-0 h-[19vh] md:h-[9vh] lg:h-[10vh] 
      '>
        <section>
          Developed by Himanshu_Kumar
        </section>
        <section className='py-3 md:py-0 lg:py-0'>
          &copy; Copyright {year} | All right reserved
        </section>
        <section className=' flex justify-center items-center gap-5'>
          <a href="#" className='text-2xl hover:text-yellow-600 hover:transition-all hover:duration-500 hover:ease-in-out'>
            <BsFacebook />
          </a> <a href="#" className='text-2xl hover:text-yellow-600 hover:transition-all hover:duration-500 over:ease-in-out'>
            <BsInstagram />
          </a> <a href="#" className='text-2xl hover:text-yellow-600 hover:transition-all hover:duration-500 hover:ease-in-out'>
            <BsLinkedin />
          </a> <a href="#" className='text-2xl hover:text-yellow-600 hover:transition-all hover:duration-500 hover:ease-in-out'>
            <BsTwitter />
          </a>
        </section>
      </footer>
    </>
  );

}
export default Footer;