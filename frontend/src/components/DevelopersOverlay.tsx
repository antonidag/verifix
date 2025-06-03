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
          className={`fixed bottom-6 ${
            index === 0 ? "right-6" : "left-6"
          } flex items-center gap-4 p-5 bg-white/90 backdrop-blur-sm rounded-full shadow-xl transition-all hover:scale-105`}
        >
          <Avatar className="w-12 h-12">
            <AvatarImage src={dev.image} />
            <AvatarFallback className="bg-slate-100 text-slate-500">
              {dev.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-base">
            <div className="font-semibold text-slate-800 flex items-center gap-2">
              {dev.name}
              <img
                src={linkedin}
                alt="LinkedIn"
                className="w-5 h-5 inline-block"
              />
            </div>
            <div className="text-slate-500 text-sm">
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
