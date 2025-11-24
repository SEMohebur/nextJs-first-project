const getAllData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Faild to fetch topics");
    }
    return res.json();
  } catch (err) {
    console.log("Error loading topics: ", err);
  }
};

const Homepage = async () => {
  const { topics } = await getAllData();
  // data asche ekhn sodho map kore bosabo
  console.log(topics);

  return <div className=" h-screen text-3xl text-red-500"></div>;
};

export default Homepage;
