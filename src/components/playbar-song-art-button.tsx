"use client";

import Image from "next/image";

export default function ScrollImage() {
  const handleScroll = () => {
    const section = document.getElementById("home-main");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button onClick={handleScroll}>
      <Image
        src="/icons/thrilling.png"
        alt="Album Art"
        width={48}
        height={48}
        className="rounded-md shrink-0 cursor-pointer"
      />
    </button>
  );
}
