import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Dialog, Transition } from '@headlessui/react';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

import { UserAuth } from '../context/AuthContext';
import { db } from '../config/firebaseconfig';
import backgroundImage from '../public/background-image.jpg';

const DomGenderPage = () => {
  const { user } = UserAuth();
  const router = useRouter();

  // console.log(`ini user ${JSON.stringify(user)}`);


  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    console.log(data.jenisKelamin)
    console.log(typeof(data.jenisKelamin))
    const userDocRef = doc(db, 'user', user.uid);
    try {
      await updateDoc(userDocRef, {
        domisili: data.domisili,
        jeniskelamin: data.jeniskelamin,
        usia: data.usia,
      });
      router.push('/classification')
    } catch (err) {
      console.log(err);
    }
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

      <div className="m-0 text-center pt-[10vh]">
        <h2 className="font-bold text-4xl text-[#023047] mb-1">
          Mohon diisi sebelum melanjutkan
        </h2>

        <form
          className="max-w-screen px-8 mt-16"
          noValidate
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="mb-6">
            <input
              type="text"
              {...register('domisili', {
                required: 'Silakan masukkan domisili Anda',
              })}
              className="form-field mt-1 p-2 text-gray-500 mb-6"
              id="domisili"
              autoFocus
              placeholder="Domisili"
            ></input>
            {errors.domisili && (
              <div className="text-red-500">{errors.domisili.message}</div>
            )}
          </div>

          <div className="mb-6">
            <select
              {...register('jeniskelamin', {
                required: 'Silakan untuk memilih jenis kelamin anda',
              })}
              className="form-field mt-1 p-2 text-gray-500 mb-6"
              id="jenisKelamin"
              autoFocus
              placeholder="Jenis Kelamin"
            >
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
            {errors.jenisKelamin && (
              <p className="text-red-500 relative">
                {errors.jenisKelamin.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <input
              type="number"
              {...register('usia', {
                required: 'Silakan untuk memasukkan usia anda',
                min: {
                  value: 1,
                  message: 'Minimal usia adalah 1 tahun',
                },
              })}
              className="form-field mt-1 p-2 text-gray-500 mb-6"
              id="usia"
              placeholder="Usia"
            ></input>
            {errors.usia && (
              <p className="text-red-500 relative -top-5">
                {errors.usia.message}
              </p>
            )}
          </div>

          <button type="submit" className="primary-button !w-[300px] mt-20">
            Lanjut
          </button>
        </form>
      </div>
    </div>
  );
};

export default DomGenderPage;
