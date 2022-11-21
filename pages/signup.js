import React, { Fragment, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { db } from '../config/firebaseconfig';
import { collection, doc, getDoc } from 'firebase/firestore';
import { UserAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

import backgroundImage from '../public/background-image.jpg';

const SignUpPage = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { user, signUp, signIn } = UserAuth();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm();

  const closeModal = () => {
    const email = getValues('email');
    const password = getValues('password');
    signIn(email, password).catch((error) => console.log(error));
    router.push('/userlanding');
    setIsSuccess(false);
  };

  const submitHandler = async (data) => {
    try {
      signUp(data.username, data.email, data.domisili, data.password);
      setIsSuccess(true);
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
        <h2 className="font-bold text-4xl text-[#023047] mb-1">Buat Akun</h2>

        <form
          className="max-w-screen px-8 mt-16"
          noValidate
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="mb-6">
            <input
              type="text"
              {...register('username', {
                required: 'Silakan masukkan username Anda',
              })}
              className="form-field mt-1 p-2 text-gray-500 mb-6"
              id="username"
              autoFocus
              placeholder="Username"
            ></input>
            {errors.username && (
              <div className="text-red-500">{errors.username.message}</div>
            )}
          </div>

          <div className="mb-6">
            <input
              type="email"
              {...register('email', {
                required: 'Silakan masukkan email Anda',
              })}
              className="form-field mt-1 p-2 text-gray-500 mb-6"
              id="email"
              autoFocus
              placeholder="E-Mail"
            ></input>
            {errors.email && (
              <div className="text-red-500">{errors.email.message}</div>
            )}
          </div>

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
            Daftar
          </button>
        </form>
        <p className="mt-4">
          Sudah punya akun?{' '}
          <Link href="/signin">
            <span className="text-[#F79256]">Daftar</span>
          </Link>
        </p>
      </div>

      <Transition appear show={isSuccess} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full flex flex-col justify-center max-w-md min-h-[196px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 text-[#5072B8] font-bold text-center"
                  >
                    Akun berhasil terdaftar
                  </Dialog.Title>

                  <div className="mt-10">
                    <button
                      type="button"
                      className="bg-[#5072B8] text-white px-8 py-1 text-center rounded-2xl font-bold mx-auto flex justify-center"
                      onClick={closeModal}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SignUpPage;
