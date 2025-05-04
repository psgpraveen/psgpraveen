import Hero from "@/components/Hero";
import Card from "@/app/Component/skill/page";
import Status from "@/app/Component/status/Status";
import PROJECT from "@/app/Component/project/page";
import Footer from "@/app/Component/Footer/page";
import Feedback from "@/app/Component/feedback/page";
import Comment from "@/app/Component/comment/page";
import MyServices from "@/app/Component/MyService/page";
import Phone from "@/app/Component/Phone/page";
import Cert from "@/app/Component/carousel/page";
import axios from "axios";

export default async function HomePage() {
  let statusData = null;

  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/status`);
    statusData = res.data[0];
  } catch (error) {
    statusData = null;
    console.error("Error fetching status data:", error);
  }

  return (
    <main className="relative w-full min-h-screen bg-default text-colors_default">
      <Hero />
      <Card />
      <Status result={statusData} /> 
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
