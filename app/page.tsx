import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroBanner
        images={["HomeBanner1.jpg", "HomeBanner2.jpg", "HomeBanner3.jpg"]}
        links={["/fashion", "/electronic", "/bags"]}
      />
    </>
  );
}
