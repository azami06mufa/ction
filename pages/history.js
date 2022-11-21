import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import backgroundImage from '../public/background-image.jpg';

import { useForm } from 'react-hook-form';

const userHistoryData = [
  {
    inputDate: new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).format(Date.now()),
    result: 'Gejala Ringan',
    recommendation: 'Isolasi Mandiri',
  },
  {
    inputDate: new Intl.DateTimeFormat('en-GB', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).format(Date.now()),
    result: 'Gejala Berat',
    recommendation: 'Mengunjungi fasilitas kesehatan terdekat',
  },
];


const HistoryPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    console.log(data);
  };

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

      <div className="m-0 flex flex-col justify-center pt-[10vh]">
        <h2 className="text-center font-bold text-4xl text-[#023047] mb-8">
          Riwayat
        </h2>

        <div className="mx-auto border-2">
          {userHistoryData.map((data, index) => (
            <div
              key={index}
              className="w-[500px] bg-white border-[1px] shadow-md rounded-xl py-6 px-4 mb-4"
            >
              <p>Tanggal Pengisian: {data.inputDate}</p>
              <p>Hasil: {data.result}</p>
              <p>Rekomendasi: {data.recommendation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
