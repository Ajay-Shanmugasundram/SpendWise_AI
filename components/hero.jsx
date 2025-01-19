"use client";

import Link from "next/link";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="pb-20 px-4 h-100  bottom-80">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
          Smarter Transactions <br /> Powered by Intelligence!
        </h1>
        <p className="text-gray-800 mb-8 text-xl max-w-2xl mx-auto">
          An AI Power Financial management platoform that helps you track
          analyze, and optimize your spending with real time insights.
        </p>
        <div className="flex justify-center mx-auto space-x-4">
          <Link href="/dashboard">
            <Button size={"lg"} className="px-8">
              Get Started
            </Button>
          </Link>
          <Link href="/">
            <Button size={"lg"} className="px-8" variant="outline">
              Watch Demo
            </Button>
          </Link>
        </div>
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{ width: "100%", height:"50%", objectFit: "cover" }}
            >
              <source src="/Video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          
      </div>
    </div>
  );
};

export default Hero;
