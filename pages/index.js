import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UserAuth } from '../context/AuthContext';

import backgroundImage from '../public/background-image-2.jpg';

const Homepage = () => {
  const { user } = UserAuth();

  console.log(`ini user ${JSON.stringify(user)}`);

  return (
    <div>
      <div className="fixed h-screen w-screen overflow-hidden -z-10">
        <Image
          alt="Hero Background"
          src={backgroundImage}
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <div className="grid grid-cols-2 grid-rows-1">
        <div className="col-start-2 flex flex-col gap-24 items-center justify-center w-full h-screen text-center">
          <div>
            <h1 className="text-[rgb(247,146,86)] text-6xl font-bold">COVID-19</h1>
            <h1 className="text-[#5072B8] text-5xl font-bold">
              Classification System
            </h1>
          </div>
          <p className="text-[#023047] text-2xl font-normal">
            Membantu mengklasifikasi tingkat keparahan gejala COVID-19
          </p>
          <Link href="/signin">
            <p className="text-blue-700 underline">klik disini</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
