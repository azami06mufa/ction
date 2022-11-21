import React from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

import backgroundImage from '../public/background-image.jpg';
import placeholder from '../public/placeholder.png';

const symptomsData = [
  {
    id: 1,
    name: 'Gejala 1',
    value: 'gejala1',
    img: require('../public/placeholder.png'),
  },
  {
    id: 2,
    name: 'Gejala 2',
    value: 'gejala2',
    img: require('../public/placeholder.png'),
  },
  {
    id: 3,
    name: 'Gejala 3',
    value: 'gejala3',
    img: require('../public/placeholder.png'),
  },
  {
    id: 4,
    name: 'Gejala 4',
    value: 'gejala4',
    img: require('../public/placeholder.png'),
  },
  {
    id: 5,
    name: 'Gejala 5',
    value: 'gejala5',
    img: require('../public/placeholder.png'),
  },
  {
    id: 6,
    name: 'Gejala 6',
    value: 'gejala6',
    img: require('../public/placeholder.png'),
  },
];

const ClassificationPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    console.log(data);
  };

  return (
    <div className="w-screen">
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

      <div className="px-8 py-4">
        <h1 className="text-[#023047] font-bold text-xl">
          Pilih jika mengalami satu atau lebih gejala di bawah ini
        </h1>

        <form
          className="max-w-screen px-8 mt-16"
          noValidate
          onSubmit={handleSubmit(submitHandler)}
        >
          <ul class="grid gap-6 w-full grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {symptomsData.map((data) => (
              <li key={data.id}>
                <input
                  {...register('symptoms', {
                    required: false,
                  })}
                  type="checkbox"
                  id={data.value}
                  value={data.value}
                  class="hidden peer"
                  required=""
                />
                <label
                  for={data.value}
                  class="block items-center w-full text-gray-500 bg-white border-2 rounded-2xl cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div class="block">
                    <div className="mb-2 w-full h-[180px] relative rounded-2xl oveflow-hidden">
                      <Image
                        alt="Gejala1"
                        src={data.img}
                        fill
                        sizes="100vw"
                        style={{
                          objectFit: 'cover',
                        }}
                        className="rounded-t-2xl"
                      />
                    </div>

                    <div class="w-full text-lg font-semibold text-center mb-2">
                      {data.name}
                    </div>
                  </div>
                </label>
              </li>
            ))}
          </ul>
          <button className="primary-button text-center block mx-auto mt-20" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClassificationPage;
