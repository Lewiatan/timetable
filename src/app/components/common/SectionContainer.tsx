import React from 'react';

interface SectionContainerProps {
  title: string;
  children: React.ReactNode;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({ title, children }) => {
  return (
    <section className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
}
