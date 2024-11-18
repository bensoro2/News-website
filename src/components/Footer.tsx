// Footer.tsx

"use client";
import { useState, useEffect } from "react";

const Footer = () => {
  const [facebookUrl, setFacebookUrl] = useState(
    "https://www.facebook.com/nuuneoicom"
  );

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("http://localhost:3001/settings");
        if (response.ok) {
          const data = await response.json();
          setFacebookUrl(data.facebookUrl);
        } else {
          console.error("Failed to fetch settings");
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-gray-100 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-12 text-center">
          <div
            className="fb-page inline-block"
            data-href={facebookUrl}
            data-width="280"
            data-hide-cover="false"
            data-show-facepile="true"
            data-show-posts="false"
          >
            <iframe
              src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                facebookUrl
              )}&tabs=timeline&width=340&height=70&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId`}
              width="340"
              height="70"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; 2023 Nuuneoi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
