import { HomeLoaderBoundary } from "./components/HomeLoaderBoundary";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { Journey } from "./components/Journey";
import { Promise } from "./components/Promise";
import { Features } from "./components/Features";
import { ProductShowcase } from "./components/ProductShowcase";
import { FruitNinja } from "./components/FruitNinja";
import { PrepAnimations } from "./components/PrepAnimations";
import { StudioShowcase } from "./components/StudioShowcase";
import { Reviews } from "./components/Reviews";
import { Mission } from "./components/Mission";
import { FAQ } from "./components/FAQ";
import { BlogTeaser } from "./components/BlogTeaser";
import { FinalCTA } from "./components/FinalCTA";
import { UserBlogSubmit } from "./components/UserBlogSubmit";
import { StickyDownloadBar } from "./components/StickyDownloadBar";

export default function HomePage() {
  return (
    <>
      <HomeLoaderBoundary />
      <Hero />
      <Stats />
      <Journey />
      <Promise />
      <Features />
      <ProductShowcase />
      <FruitNinja />
      <PrepAnimations />
      <StudioShowcase />
      <Reviews />
      <Mission />
      <FAQ />
      <BlogTeaser />
      <FinalCTA />
      <UserBlogSubmit />
      <StickyDownloadBar />
    </>
  );
}
