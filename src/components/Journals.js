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
      title: "Bobi Wine: The People’s President – A Gripping Underdog Saga Against Immovable Powe",
      content: "Leaders adopting the title 'the people's president' is a historical trend. In Africa, this political discourse, focused on amplifying the people's voice, recurs every decade.",
      button: "https://www.sinemafocus.com/review-bobi-wine-the-peoples-president-captures-the-true-scale-of-an-underdogs-fight-against-an-immovable-power/",
      timestamp: "Last updated 3 mins ago",
    },
    {
      id: 3,
      image: "https://www.sinemafocus.com/wp-content/uploads/2023/10/Click-Click-premiere-1140x570.jpg",
      title: "Kenya's Cinema Culture: Winning Audience Goodwill",
      content: "Exploring the cultural impact of cinema in Kenya involves understanding the beliefs and social forms surrounding this entertainment phenomenon. What do Kenyans generally believe about cinema, and how does it manifest in their social context?",
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
              <div className="card journal" style={{ height: "500px",width: '300px', color:'white', backgroundColor: '#EA0085', marginBottom: '10px' }}>
                <img src={journal.image} className="card-img-top" alt="Journal" style={{ width:"300", height:"300" }} />
                <div className="card-body">
                  <h5 className="card-title">{journal.title}</h5>
                  <p className="card-text">{journal.content}</p>
                </div>
                <div className="card-button">
                    <a href={journal.button} style={{ textDecoration: 'none', color: "GrayText", fontWeight:'bold', float:"left", padding:'10px' }}>READ STORY</a>
                </div>
                {/* <div className="card-footer">
                  <small className="text-body-secondary">{journal.timestamp}</small>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Journals;
