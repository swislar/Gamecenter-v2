import React, { useContext } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { TZFETile } from "./index";
import { Dinosaur } from "../images/Dinosaur.tsx";
import { useGSAP } from "@gsap/react";
import { AuthContext } from "../context/authContext.js";

gsap.registerPlugin(ScrollTrigger);

export const HomeDinoTile = () => {
  const { darkMode } = useContext(AuthContext);

  const timeline1 = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: ".container1",
      start: "center+=200px center",
      end: "center+=800px center",
      // markers: true,
      toggleActions: "restart none none none",
      scrub: 1,
      pin: ".container1",
      pinSpacing: false,
    },
    onUpdate: (self) => {
      //
    },
  });

  useGSAP(() => {
    const jumpX = window.innerWidth / 11;
    timeline1.from(".container1", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".container1",
        start: "center center",
        end: "center+=400px center",
        // markers: true,
        toggleActions: "restart none none none",
        scrub: 1,
        pin: ".container1",
        pinSpacing: false,
      },
    });
    timeline1.from("#Tile2", { opacity: 0, yPercent: 100, duration: 1 });
    timeline1.fromTo(
      "#Dinosaur1",
      { opacity: 0, y: -150, x: -150 },
      { opacity: 1, y: -75, x: 0, duration: 0.5 }
    );
    timeline1.from("#Tile4", { opacity: 0, yPercent: 100, duration: 1 });
    timeline1.fromTo(
      "#Dinosaur1",
      { opacity: 1, y: -75, x: 0 },
      { opacity: 1, y: -150, x: jumpX * 1, duration: 0.5 }
    );
    timeline1.fromTo(
      "#Dinosaur1",
      { opacity: 1, y: -150, x: jumpX * 1 },
      { opacity: 1, y: -75, x: jumpX * 2, duration: 0.5 }
    );
    timeline1.from("#Tile8", { opacity: 0, yPercent: 100, duration: 1 });
    timeline1.fromTo(
      "#Dinosaur1",
      { opacity: 1, y: -75, x: jumpX * 2 },
      { opacity: 1, y: -150, x: jumpX * 3, duration: 0.5 }
    );
    timeline1.fromTo(
      "#Dinosaur1",
      { opacity: 1, y: -150, x: jumpX * 3 },
      { opacity: 1, y: -75, x: jumpX * 4, duration: 0.5 }
    );
    timeline1.from("#Tile16", { opacity: 0, yPercent: 100, duration: 1 });
    timeline1.fromTo(
      "#Dinosaur1",
      { opacity: 1, y: -75, x: jumpX * 4 },
      { opacity: 1, y: -150, x: jumpX * 5, duration: 0.5 }
    );
    timeline1.fromTo(
      "#Dinosaur1",
      { opacity: 1, y: -150, x: jumpX * 5 },
      { opacity: 1, y: -75, x: jumpX * 6, duration: 0.5 }
    );
    timeline1.from("#Tile32", { opacity: 0, yPercent: 100, duration: 1 });
    timeline1.fromTo(
      "#Dinosaur1",
      { opacity: 1, y: -75, x: jumpX * 6 },
      { opacity: 1, y: -150, x: jumpX * 7, duration: 0.5 }
    );
    timeline1.fromTo(
      "#Dinosaur1",
      { opacity: 1, y: -150, x: jumpX * 7 },
      { opacity: 1, y: -75, x: jumpX * 8, duration: 0.5 }
    );
    timeline1.fromTo(
      "#Dinosaur1",
      { opacity: 1, y: -75, x: jumpX * 8 },
      { opacity: 1, y: -150, x: jumpX * 9, duration: 0.5 }
    );
    timeline1.fromTo(
      "#Dinosaur1",
      { opacity: 1, y: -150, x: jumpX * 9 },
      { opacity: 1, y: -200, x: jumpX * 11, duration: 0.5 }
    );
  }, []);

  const timeline2 = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: ".container2",
      start: "center+=1000px center",
      end: "center+=1500px center",
      // markers: true,
      toggleActions: "restart none none none",
      scrub: 1,
      pin: ".container2",
      pinSpacing: false,
    },
  });

  useGSAP(() => {
    const jumpX = window.innerWidth / 13;
    timeline2.from(".container2", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".container2",
        start: "center center",
        end: "center+=420px center",
        // markers: true,
        toggleActions: "restart none none none",
        scrub: 1,
        pin: ".container2",
        pinSpacing: false,
      },
    });
    timeline2.from("#Tile2048", { opacity: 0, yPercent: 100, duration: 1 });
    timeline2.fromTo(
      "#Dinosaur2",
      { opacity: 0, y: -200, x: jumpX * 12 },
      { opacity: 1, y: -125, x: jumpX * 10.5, duration: 0.5 }
    );
    timeline2.from("#Tile1024", { opacity: 0, yPercent: 100, duration: 1 });
    timeline2.fromTo(
      "#Dinosaur2",
      { opacity: 1, y: -125, x: jumpX * 10.5 },
      { opacity: 1, y: -175, x: jumpX * 9.5, duration: 0.5 }
    );
    timeline2.fromTo(
      "#Dinosaur2",
      { opacity: 1, y: -175, x: jumpX * 9.5 },
      { opacity: 1, y: -125, x: jumpX * 8.5, duration: 0.5 }
    );
    timeline2.from("#Tile512", { opacity: 0, yPercent: 100, duration: 1 });
    timeline2.fromTo(
      "#Dinosaur2",
      { opacity: 1, y: -125, x: jumpX * 8.5 },
      { opacity: 1, y: -175, x: jumpX * 7.5, duration: 0.5 }
    );
    timeline2.fromTo(
      "#Dinosaur2",
      { opacity: 1, y: -175, x: jumpX * 7.5 },
      { opacity: 1, y: -125, x: jumpX * 6.5, duration: 0.5 }
    );
    timeline2.from("#Tile256", { opacity: 0, yPercent: 100, duration: 1 });
    timeline2.fromTo(
      "#Dinosaur2",
      { opacity: 1, y: -125, x: jumpX * 6.5 },
      { opacity: 1, y: -175, x: jumpX * 5.5, duration: 0.5 }
    );
    timeline2.fromTo(
      "#Dinosaur2",
      { opacity: 1, y: -175, x: jumpX * 5.5 },
      { opacity: 1, y: -125, x: jumpX * 4.5, duration: 0.5 }
    );
    timeline2.from("#Tile128", { opacity: 0, yPercent: 100, duration: 1 });
    timeline2.fromTo(
      "#Dinosaur2",
      { opacity: 1, y: -125, x: jumpX * 4.5 },
      { opacity: 1, y: -175, x: jumpX * 3.5, duration: 0.5 }
    );
    timeline2.fromTo(
      "#Dinosaur2",
      { opacity: 1, y: -175, x: jumpX * 3.5 },
      { opacity: 1, y: -125, x: jumpX * 2.5, duration: 0.5 }
    );
    timeline2.from("#Tile64", { opacity: 0, yPercent: 100, duration: 1 });
    timeline2.fromTo(
      "#Dinosaur2",
      { opacity: 1, y: -125, x: jumpX * 2.5 },
      { opacity: 1, y: -175, x: jumpX * 1.5, duration: 0.5 }
    );
    timeline2.fromTo(
      "#Dinosaur2",
      { opacity: 1, y: -175, x: jumpX * 1.5 },
      { opacity: 1, y: -125, x: jumpX * 0.75, duration: 0.5 }
    );
    timeline2.fromTo(
      "#Dinosaur2",
      { opacity: 1, y: -175, x: jumpX * 0.75 },
      { opacity: 1, y: -250, x: jumpX * -2, duration: 0.5 }
    );
  }, []);

  return (
    <div className="flex flex-col items-center h-[220vh] ">
      {/* <section className="w-full h-[40vh]"></section> */}
      <section className="container1 mb-[80vh] w-full flex flex-row justify-evenly">
        <div className="absolute left-0 top-[50%]">
          <Dinosaur width={100} height={100} id="Dinosaur1" />
        </div>
        <TZFETile number={2} id="Tile2" />
        <TZFETile number={4} id="Tile4" />
        <TZFETile number={8} id="Tile8" />
        <TZFETile number={16} id="Tile16" />
        <TZFETile number={32} id="Tile32" />
      </section>
      <section className="container2 mb-28 w-full flex flex-row justify-evenly">
        <div className="absolute left-0 top-[50%]">
          <Dinosaur width={100} height={100} id="Dinosaur2" reflectX={true} />
        </div>
        <TZFETile number={64} id="Tile64" />
        <TZFETile number={128} id="Tile128" />
        <TZFETile number={256} id="Tile256" />
        <TZFETile number={512} id="Tile512" />
        <TZFETile number={1024} id="Tile1024" />
        <TZFETile number={2048} id="Tile2048" />
      </section>
      {/* <section className="w-full h-[40vh]"></section> */}
    </div>
  );
};
