import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Flavors from "@/components/Flavors";
import HowItWorks from "@/components/HowItWorks";
import Zones from "@/components/Zones";
import Plans from "@/components/Plans";
import Testimonials from "@/components/Testimonials";
import BigCta from "@/components/BigCta";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { getFlavors } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const flavors = await getFlavors();

  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Ticker dark />
      <Flavors flavors={flavors} />
      <HowItWorks />
      <Zones />
      <Plans />
      <Testimonials />
      <BigCta />
      <Footer />
      <CartDrawer />
    </main>
  );
}
