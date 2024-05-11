import React from 'react';

const Content = ({ title, description }) => {
  return (
    <section>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}

export default Content;