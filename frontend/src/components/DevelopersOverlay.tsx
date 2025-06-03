import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import linkedin from "@/assets/linkedin.svg";
import anton from "@/assets/anton.jpg";
import victor from "@/assets/victor.jpeg";

interface Developer {
  name: string;
  role: string;
  company: string;
  image: string;
  linkedin: string;
}

export const DevelopersOverlay = () => {
  const developers: Developer[] = [
    {
      name: "Victor Winberg",
      role: "Full Stack Developer",
      company: "PinMeTo",
      image: victor,
      linkedin: "https://www.linkedin.com/in/victorwinberg/",
    },
    {
      name: "Anton Björkman",
      role: "Integration Developer",
      company: "Epical",
      image: anton,
      linkedin: "https://www.linkedin.com/in/anton-björkman-447a1a1b1/",
    },
  ];

  return (
    <>
      {developers.map((dev, index) => (
        <a
          href={dev.linkedin}
          key={dev.name}
          target="_blank"
          rel="noopener noreferrer"
          className={`fixed bottom-4 ${
            index === 0 ? "right-4" : "left-4"
          } flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg transition-all hover:scale-105`}
        >
          <Avatar>
            <AvatarImage src={dev.image} />
            <AvatarFallback className="bg-slate-100 text-slate-500">
              {dev.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <div className="font-medium text-slate-800 flex items-center gap-2">
              {dev.name}
              <img
                src={linkedin}
                alt="LinkedIn"
                className="w-4 h-4 inline-block"
              />
            </div>
            <div className="text-slate-500 text-xs">
              {dev.role}
              <span className="mx-1">·</span>
              {dev.company}
            </div>
          </div>
        </a>
      ))}
    </>
  );
};
