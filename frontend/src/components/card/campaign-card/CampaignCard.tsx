"use client"

import Image from 'next/image';
import React, { useState } from 'react';

const CampaignCard: React.FC = () => {
  const fullText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet perspiciatis velit sed inventore, sapiente provident voluptatem doloremque quas rerum vitae autem officiis explicabo. Magni labore illo officiis laudantium, quaerat nam?";
  const maxWords = 14;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const truncateText = (text: string, maxWords: number): string => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };

  return (
    <div className="w-full rounded-md bg-[#5A5A5A] flex flex-col lg:flex-row text-white pb-4 lg:pb-0">
      <div className="w-full lg:w-2/5">
        <div className="relative w-full pt-[56.25%] lg:pt-[80%] xl:pt-[66%]">
          <Image
            src="https://res.cloudinary.com/demo/image/upload/v1689803100/ai/hiker.jpg"
            alt="Example Image"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-l-md"
          />
          <div className="absolute top-2 right-2 md:top-4 md:right-4 w-20 h-20 md:w-32 md:h-32 lg:hidden">
            <Image
              src="https://res.cloudinary.com/demo/image/upload/v1689803100/ai/hiker.jpg"
              alt="Example Image"
              fill
              className="rounded-full object-cover border-2 border-white"
            />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-3/5 px-4 mr-6 items-center my-auto">
        <div className="flex flex-row">
          <div className="w-full lg:w-9/12 space-y-1 mt-3 lg:mt-0">
            <div id="title" className="text-lg font-bold font-poppins">
              Judul
            </div>
            <div id="deskripsi" className="font-light font-poppins text-sm md:text-md hidden md:block">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet perspiciatis velit sed inventore, sapiente provident voluptatem doloremque quas rerum vitae autem officiis explicabo. Magni labore illo officiis laudantium, quaerat nam?
            </div>
            <div className="font-light font-poppins text-[13px] md:hidden">
              {isExpanded ? (
                <>
                  {fullText}
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="font-semibold text-blue-400 hover:underline"
                  >
                    tutup
                  </button>
                </>
              ) : (
                <>
                  {truncateText(fullText, maxWords)}
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="font-semibold text-blue-400 hover:underline"
                  >
                    lihat selengkapnya
                  </button>
                </>
              )}
            </div>
            <div className="font-poppins font-light text-sm md:text-md">
              Kategori :
            </div>
            <div className="flex space-x-2 pt-1 items-center">
              <div className="px-4 md:py-2 py-1 bg-blue-600 rounded-lg text-sm text-white font-semibold">
                FOOD
              </div>
              <div className="px-4 md:py-2 py-1 bg-pink-600 rounded-lg text-sm text-white font-semibold">
                MICRO
              </div>
            </div>
          </div>
          <div className="w-3/12 lg:flex justify-end hidden lg:visible">
            <div className="w-32 h-32 relative">
              <Image
                src="https://res.cloudinary.com/demo/image/upload/v1689803100/ai/hiker.jpg"
                alt="Example Image"
                fill
                className="rounded-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="mt-3 bg-white h-[1px] lg:hidden">
        </div>
        <div className="flex mt-2 flex-col space-y-1">
          <div className="font-poppins font-light text-sm md:text-md">
            Total terkumpul :
          </div>
          <div className="font-poppins font-bold text-sm md:text-base">
            50% ~ 30 hari lagi
          </div>
          <div className="h-2 lg:h-3 w-full bg-pink-600 rounded-md mt-3">
            <span className="rounded-l-lg block h-full w-[50%] bg-green-500"></span>
          </div>
        </div>
        <div className="flex mt-3">
          <div className="flex flex-col w-2/5 md:w-1/3 items-start md:items-center md:border-r-2">
            <div className="text-sm md:text-md font-semibold">
              Rp. 50.000.000
            </div>
            <div className="text-[13px] md:text-sm font-light">
              Total terkumpul
            </div>
          </div>
          <div className="flex flex-col w-2/5 md:w-1/3 items-start md:items-center">
            <div className="text-sm md:text-md font-semibold">
              Rp. 100.000.000
            </div>
            <div className="text-[13px] md:text-sm font-light">
              Target
            </div>
          </div>
          <div className="flex flex-col w-1/5 md:w-1/3 items-start md:items-center md:border-l-2">
            <div className="text-sm md:text-md font-semibold">
              1222
            </div>
            <div className="text-[13px] md:text-sm font-light">
              Donatur
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
