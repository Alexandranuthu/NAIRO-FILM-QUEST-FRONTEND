import React from "react";

const Journals = () => {
  // Placeholder data (you can replace this with actual data fetched from an API)
  const journalData = [
    {
      id: 1,
      image: "https://www.sinemafocus.com/wp-content/uploads/2023/10/Instant-Dad-2-e1697585156275-1140x570.webp",
      title: "‘An Instant Dad’ Review: A Heartfelt Kenyan Take on a Time-Tested Formula",
      content: "An Instant Dad is a story we’ve all seen before. It’s reminiscent of the charm and playful exuberance of 2000s Disney films that always paired tough guys with adorable children, often daughters, creating a delightful blend of comedy and heartwarming moments throughout the runtime.",
      button: "https://www.sinemafocus.com/an-instant-dad-review-a-heartfelt-kenyan-take-on-a-time-tested-formula/",
      timestamp: "Last updated 3 mins ago",
    },
    {
      id: 2,
      image: "https://www.sinemafocus.com/wp-content/uploads/2023/10/Bobi_Wine_Key_Art_In_Theaters_July2-1140x570.jpg",
      title: "Review: ‘Bobi Wine: The People’s President’ Captures the True Scale of An Underdog’s Fight Against An Immovable Power",
      content: "Many revolutionaries and leaders throughout history have sported the banner of “the people’s president”, some more deserving than others; an idealistic thought bubble where the voice of the people is believed to be so muffled that their leader fights for their voice, barred from the instruments of power. For Africa, however, this political question to be debated over is the norm twice every decade.",
      button: "https://www.sinemafocus.com/review-bobi-wine-the-peoples-president-captures-the-true-scale-of-an-underdogs-fight-against-an-immovable-power/",
      timestamp: "Last updated 3 mins ago",
    },
    {
      id: 3,
      image: "https://www.sinemafocus.com/wp-content/uploads/2023/10/Click-Click-premiere-1140x570.jpg",
      title: "Cinema Culture in Kenya and Why We Must Win the Goodwill of the Audience",
      content: "What exactly am I referring to by the word ‘culture’? Webster has it defined as: the customary beliefs, social forms, and material traits of a racial, religious, or social group. Now, prefix ‘cinema’ onto that, and we have a general outline of this editorial argument. What beliefs about cinema does the common Kenyan hold, if any? What social forms does this entertainment phenomena take?",
      button: "https://www.sinemafocus.com/cinema-culture-in-kenya-and-why-we-must-win-the-goodwill-of-the-audience/",
      timestamp: "Last updated 3 mins ago",
    },
  ];

  return (
    <>
      <div className="bg-dark">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {journalData.map((journal) => (
            <div key={journal.id} className="col">
              <div className="card h-100 w-60">
                <img src={journal.image} className="card-img-top" alt="Journal" style={{ width:"300", height:"300" }} />
                <div className="card-body">
                  <h5 className="card-title">{journal.title}</h5>
                  <p className="card-text">{journal.content}</p>
                </div>
                <div className="card-button">
                    <a href={journal.button}>READ STORY</a>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">{journal.timestamp}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Journals;
