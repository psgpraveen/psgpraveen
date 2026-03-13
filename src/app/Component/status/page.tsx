import Status from "./Status";

export const dynamic = "force-dynamic";

const Page = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL || 'https://portfo1.vercel.app/'}status`, {
      cache: "no-store", 
    });
    const data = await res.json();
    return <Status result={data[0]} />;
  } catch (error) {
    console.error("Error fetching status data:", error);
    return <Status result={{ like: 0, view: 0 }} />;
  }
};

export default Page;
