import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

import { db } from "../config/firebaseconfig";

import backgroundImage from "../public/background-image.jpg";
import placeholder from "../public/placeholder.png";

const symptomsData = [
  {
    id: 1,
    name: "Fever",
    value: "Fever",
    img: require("../public/fever.jpeg"),
  },
  {
    id: 2,
    name: "Tiredness",
    value: "Tiredness",
    img: require("../public/tiredness.jpeg"),
  },
  {
    id: 3,
    name: 'Dry-Cough',
    value: 'Dry-Cough',
    img: require("../public/dry-cough.jpeg"),
  },
  {
    id: 4,
    name: "Difficulty-in-Breathing",
    value: "Difficulty-in-Breathing",
    img: require("../public/difficulty-in-breathing.jpeg"),
  },
  {
    id: 5,
    name: "Sore-Throat",
    value: "Sore-Throat",
    img: require("../public/sore-throat.jpeg"),
  },
  {
    id: 6,
    name: "Pains",
    value: "Pains",
    img: require("../public/pains.jpeg"),
  },
  {
    id: 7,
    name: "Nasal-Congestion",
    value: "Nasal-Congestion",
    img: require("../public/nasal-congestion.jpeg"),
  },
  {
    id: 8,
    name: "Runny-Nose",
    value: "Runny-Nose",
    img: require("../public/runny-nose.jpeg"),
  },
  {
    id: 9,
    name: "Diarrhea",
    value: "Diarrhea",
    img: require("../public/diarrhhea.jpeg"),
  },
];

const clasificationData = {
  Mild: {
    name: "Ringan",
    recommendation: "Isolasi Mandiri di Rumah",
  },
  Moderate: {
    name: "Sedang",
    recommendation: "Mengunjungi Fasilitas Kesehatan",
  },
  Severe: {
    name: "Berat",
    recommendation: "Mengunjungi Fasilitas Kesehatan",
  },
};

const ClassificationPage = () => {
  const router = useRouter();
  const { user } = UserAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    // console.log(data);
     // console.log(router.query);
     console.log(
      JSON.stringify({
        ...data,
        ...router.query,
      })
    );
    try {
      const response = await fetch("http://185.223.207.122:8020/predict", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          ...router.query,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const prediction = await response.json();
      let sorted = [];
       for (let data in clasificationData) {
         sorted.push([data, clasificationData[data]]);
       }
       const resultData = sorted[0];
       console.log(JSON.stringify(resultData[1].name));

       try {
         const userRef = collection(db, "user", user.uid, "history");

         await addDoc(userRef, {
           criteria: resultData[1].name,
           recommendation: resultData[1].recommendation,
           dateCreated: Intl.DateTimeFormat("en-GB", {
             year: "numeric",
             month: "long",
             day: "2-digit",
             hour: "2-digit",
             minute: "2-digit",
             second: "2-digit",
           }).format(Date.now()),
         });
       } catch (err) {
         console.log(err);
       }

      router.push({
        pathname: "/result",
        query: prediction,
      });
      console.log(`ini prediciton ${JSON.stringify(prediction)}`);
    } catch (err) {
      console.log(err);
    }
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
          <div className="mt-10 text-center">
            <select
              {...register('contact', {
                required: 'Silakan mengisi data riwayat kontak Anda',
              })}
              className="form-field mt-0 p-2 text-gray-500 mb-4"
              id="contact"
              autoFocus
              placeholder="Riwayat Kontak"
            >
              <option value="" selected disabled hidden>Riwayat Kontak</option>
              <option value="Yes">Pernah Kontak</option>
              <option value="No">Belum Pernah Kontak</option>
              <option value="Dont Know">Tidak Tahu</option>
            </select>
            {errors.jenisKelamin && (
              <p className="text-red-500 relative">
                {errors.jenisKelamin.message}
              </p>
            )}
          </div>
          <button className="primary-button text-center block mx-auto mt-0 mb-0" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClassificationPage;
