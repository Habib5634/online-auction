import About from "@/components/About";
import AuctionProducts from "@/components/AuctionProducts";
import Categories from "@/components/Categories";
import Faqs from "@/components/Faqs";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";



export default function Home() {
  return (
    <>
    <div className="relative">
<Navbar/>
    <HeroSection/>
    <AuctionProducts/>
    <About/>
    <Categories/>
 
    <Faqs/>
    <Footer/>
    </div>
    </>
  );
}
