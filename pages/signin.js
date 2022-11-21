import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import backgroundImage from '../public/background-image.jpg';

import { useForm } from 'react-hook-form';
import { UserAuth } from '../context/AuthContext';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseconfig';
import { useRouter } from 'next/router';

const SignInPage = () => {
  const { user, signIn } = UserAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const submitHandler = async (data) => {
    try {
      const loginData = await signIn(data.email, data.password);
      const userDocRef = doc(db, 'user', loginData.user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        router.push('/userlanding');
      } else {
        router.push('/signin');
      }
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
          Selamat Datang
        </h2>
        <h1 className="font-light text-3xl text-[#AAA] ">
          Silakan masuk untuk melanjutkan
        </h1>

        <form
          className="max-w-screen px-8 mt-16"
          noValidate
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="mb-6">
            <input
              type="email"
              {...register('email', {
                required: 'Silakan masukkan email Anda',
              })}
              className="form-field mt-1 p-2 text-gray-500 mb-6"
              id="email"
              autoFocus
              placeholder="Username/E-Mail"
            ></input>
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>

          <div className="mb-6">
            <input
              type="password"
              {...register('password', {
                required: 'Silakan masukkan kata sandi Anda',
              })}
              className="form-field mt-1 p-2 text-gray-500"
              id="password"
              autoFocus
              placeholder="Kata Sandi"
            ></input>
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
          </div>

          <button type="submit" className="primary-button !w-[300px] mt-20">
            Masuk
          </button>
        </form>
        <p className="mt-4">
          Belum punya akun?{' '}
          <Link href="/signup">
            <span className="text-[#F79256]">Buat Akun</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
