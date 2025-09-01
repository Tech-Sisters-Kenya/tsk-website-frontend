import React from 'react';

type CardProps = {
  cardDetails: {
    title: string;
    content: {
      name: string;
      descritpion: string;
    }[];
  };
};

function Card({ cardDetails }: CardProps) {
  const { title, content } = cardDetails;

  return (
    <div className="bg-tsk-light-2 px-12 py-8 rounded-2xl">
      <h2 className="uppercase font-body font-semibold text-tsk-primary-dark text-2xl">{title}</h2>
      <ul className="mt-8 marker:text-tsk-primary-dark">
        {content.map((item, index) => (
          <li
            key={index}
            className="list-disc list-inside font-body text-tsk-primary-dark text-xl font-medium leading-[150%]"
          >
            {item.name} - {item.descritpion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Card;
