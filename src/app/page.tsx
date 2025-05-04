import Hero from "@/components/Hero";
import Card from "@/app/Component/skill/page";
import Status from "@/app/Component/status/page";
import PROJECT from "@/app/Component/project/page";
import Footer from "@/app/Component/Footer/page";
import Feedback from "@/app/Component/feedback/page";
import Comment from "@/app/Component/comment/page";
import MyServices from "@/app/Component/MyService/page";
import Phone from "@/app/Component/Phone/page";
import Cert from "@/app/Component/carousel/page";

export default async function HomePage() {


  return (
    <main className="relative w-full min-h-screen bg-default text-colors_default">
      <Hero />
      <Card />
      <Status  /> 
      <PROJECT />
      <MyServices />
      <Comment />
      <Phone />
      <Cert />
      <Feedback />
      <Footer />
    </main>
  );
}
