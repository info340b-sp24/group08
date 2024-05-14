import React from "react";

function HomePage(props) {
  return (
    <main>
      <h2 className="text-center">Welcome!</h2>
      <div>
        <img src={'./Husky.jpg'} alt="Website Logo" />
        <p>Find the right job position for you!</p>
        <a href="listings.html" className="button">Start your journey!</a>
      </div>

      <h3>Introduction</h3>
      <p>Embarking on a journey of higher education in a foreign country is an
        important milestone filled with both opportunities and challenges for us
        as diverse international students in the United States. Securing
        employment is a significant hurdle, a challenge not unique to us, but
        shared by countless international students across the U.S. The
        complexities of different cultural norms, understanding the local job
        market, and dealing with restrictive work authorization laws add layers of
        difficulty. Based on our shared experiences and stories from our
        teammates, we have decided to dedicate this quarter's INFO 340 project to
        a cause closely related to us—enhancing employment opportunities for
        international students.</p>
      <h3>About InterStu Spot</h3>
      <p>InterStu Spot's purpose is to help international job seekers in the U.S.
        Users of the website can access critical services such as Visa
        Information, Job Listings, and a Discussion Board. Users can delve into
        detailed guides on visa processes, search and apply for jobs matched to
        their qualifications, and participate in community discussions. Users can
        freely browse job listings, access information on various international
        student visas, and participate in discussion boards by posting or replying
        to discussions.</p>
    </main>
  );
}

export default HomePage;