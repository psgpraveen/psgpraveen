import Status from "./Status";

const Page = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}status`, {
      cache: "no-store", 
    });
    const data = await res.json();
    return <Status result={data[0]} />;
  } catch (error) {
    console.error("Error fetching status data:", error);
  }
};

export default Page;
