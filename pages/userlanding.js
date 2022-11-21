import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import backgroundImage from '../public/background-image.jpg';

const UserLandingPage = () => {
  const router = useRouter();
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
            <h1 className="text-[#F79256] text-6xl font-bold">COVID-19</h1>
            <h1 className="text-[#5072B8] text-6xl font-bold">
              Classification System
            </h1>
          </div>
          <p className="text-2xl font-light">
            Membantu mengklasifikasi tingkat keparahan gejala COVID-19
          </p>
          <button
            className="primary-button"
            onClick={() => router.push('/domgender')}
          >
            Mulai
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLandingPage;
