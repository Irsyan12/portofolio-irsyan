// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import TechStack from "../components/TechStack";
import { fetchExperiences } from "../firebase/experiencesService"; // Assuming this path is correct

const AboutSection = () => {
  return (
    <section
      className="py-20 w-11/12 md:w-5/6 mx-auto text-white cursor-default"
      id="about"
    >
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-xl md:text-4xl font-bold text-[#c5f82a]">
            About Me
          </h2>
          <p className="text-sm md:text-md lg:text-lg text-gray-300">
            I&apos;m a Computer Engineering student at Syiah Kuala University
            with skills in Machine Learning, Web Development, and mobile
            development. I enjoy learning new things and sharing knowledge. Open
            to collaboration and discussions on technology.
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-[#c5f82a]" />
              <span className="text-sm md:text-md">
                irsyanramadhan72@gmail.com
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-[#c5f82a]" />
              <span className="text-sm md:text-md">Banda Aceh, Indonesia</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 p-6 rounded-lg hover:shadow-color1/10 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-xl md:text-2xl font-bold text-[#c5f82a]">ML</h3>
            <p className="text-sm md:text-md">Machine Learning Specialist</p>
          </div>
          <div className="bg-white/5 p-6 rounded-lg hover:shadow-color1/10 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-xl md:text-2xl font-bold text-[#c5f82a]">
              Web
            </h3>
            <p>Full-Stack Developer</p>
          </div>
          <div className="bg-white/5 p-6 rounded-lg hover:shadow-color1/10 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-xl md:text-2xl font-bold text-[#c5f82a]">
              Mobile
            </h3>
            <p>App Development</p>
          </div>
          <div className="bg-white/5 p-6 rounded-lg hover:shadow-color1/10 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-xl md:text-2xl font-bold text-[#c5f82a]">
              10+
            </h3>
            <p>Tech Certifications</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const SkillsSection = () => {
  const skills = [
    {
      category: "Frontend",
      items: ["React", "Tailwind CSS", "Bootsrap", "JavaScript", "TypeScript"],
    },
    { category: "Backend", items: ["Node.js", "Python", "PHP", "MySQL"] },
    { category: "Design", items: ["Figma", "Adobe Ilustrator"] },
    { category: "Tools", items: ["Git", "Firebase"] },
  ];

  return (
    <div className="mb-20 cursor-default">
      <section className="mt-20 w-11/12 md:w-5/6 mx-auto text-white ">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#c5f82a]">
            Skills & Technologies
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are the technologies and tools I use to bring ideas to life
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 cursor-default">
          {skills.map((skillGroup) => (
            <div
              key={skillGroup.category}
              className="p-6 rounded-lg bg-white/5 hover:shadow-color1/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur"
            >
              <h3 className="text-xl font-bold mb-4 text-[#c5f82a]">
                {skillGroup.category}
              </h3>
              <ul className="space-y-2">
                {skillGroup.items.map((skill) => (
                  <li key={skill} className="flex items-center">
                    <div className="w-2 h-2 bg-[#c5f82a] rounded-full mr-2" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <TechStack />
    </div>
  );
};

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const experiencesData = await fetchExperiences(); // Fetches experiences (likely sorted asc by 'order' from service)
        // Sort experiences by 'order' in descending order (highest order first)
        const sortedExperiences = experiencesData.sort((a, b) => {
          const orderA = typeof a.order === "number" ? a.order : -Infinity;
          const orderB = typeof b.order === "number" ? b.order : -Infinity;
          return orderB - orderA;
        });
        setExperiences(sortedExperiences);
      } catch (err) {
        console.error("Error loading experiences for public page:", err);
        setError("Failed to load experiences. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    loadExperiences();
  }, []);

  return (
    <section className="py-20  w-11/12 md:w-5/6 cursor-default mx-auto text-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-color1">
          Experience
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          My professional journey in the tech industry
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-color1"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-md">
          {error}
        </div>
      ) : experiences.length === 0 ? (
        <div className="text-center text-gray-400">
          No professional experiences listed yet.
        </div>
      ) : (
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-4 md:left-1/4 ml-1 top-2 bottom-2 w-1 bg-color1/30 hidden md:block"></div>

          <div className="space-y-6 relative">
            {experiences.map((exp, index) => (
              <div
                key={exp.id || index} // Use exp.id if available, otherwise index
                className="flex flex-col md:flex-row gap-10 relative"
              >
                <div className="md:w-1/4 flex items-center md:items-start md:justify-end">
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/4 w-8 h-8 rounded-full bg-color1 items-center justify-center -ml-3 mt-1 shadow-lg shadow-color1/20 hidden md:flex">
                    <div className="w-3 h-3 bg-dark rounded-full"></div>
                  </div>

                  {/* Mobile timeline indicator */}
                  <div className="w-6 h-6 rounded-full bg-color1 flex items-center justify-center mr-4 shadow-lg shadow-color1/20 md:hidden">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>

                  <span className="text-color1 md:me-10 font-medium bg-white/5 px-4 py-2 rounded-full hover:shadow-color1/10 hover:shadow-md transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm border border-white/5">
                    {exp.period}
                  </span>
                </div>

                <div className="md:w-3/5 bg-white/5 p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-color1/10 hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm border border-white/10">
                  <h3 className="text-xl font-bold mb-2">{exp.role}</h3>
                  <h4 className="text-lg text-color1 mb-4 flex items-center gap-2">
                    <span className="w-3 h-3 bg-color1 rounded-full inline-block"></span>
                    {exp.company}
                  </h4>
                  <p className="text-gray-400">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

const AboutSections = () => {
  return (
    <div className="bg-dark">
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
    </div>
  );
};

export default AboutSections;
