import { site } from "@/lib/site";
import HeroSlider from "@/components/home/HeroSlider";
import {
  BestSellers, Boxes, CategoryRow, HowItWorks, MarqueeStrip, Newsletter, Promos, Recipes, Standards, Story, Testimonials, Welcome, WhyUs,
} from "@/components/home/Sections";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <MarqueeStrip />
      <Welcome />
      <CategoryRow />
      <Boxes />
      <Standards />
      <HowItWorks />
      <BestSellers />
      <Promos />
      <WhyUs />
      <Story />
      <Testimonials />
      {site.showRecipes && <Recipes />}
      <Newsletter />
    </>
  );
}
