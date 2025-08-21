import React from "react";
import AthleteCard from "./AthleteCard";

type Athlete = {
  name: string;
  photo: string;
  sport: string;
  achievements: string[];
  description: string;
};

type Props = {
  athletes: Athlete[];
};

const AthletesGrid: React.FC<Props> = ({ athletes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {athletes.map((athlete, index) => (
        <AthleteCard key={index} athlete={athlete} />
      ))}
    </div>
  );
};

export default AthletesGrid;
