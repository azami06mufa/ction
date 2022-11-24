import React, { Fragment, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { doc, setDoc, collection, addDoc, getDoc } from "firebase/firestore";
import { UserAuth } from '../context/AuthContext';
import { db } from "../config/firebaseconfig";

import backgroundImage from '../public/background-image.jpg';

const KotaYogyakartaHealthFacilityData = [
  {
    id: 1,
    hospitalName: 'Rumah Sakit PKU Muhammadiyah Yogyakarta',
    hospitalDirection: `https://goo.gl/maps/EPgTAXVue55zcqBn6`,
  },
  {
    id: 2,
    hospitalName: 'Rumah Sakit Panti Rapih',
    hospitalDirection: `https://goo.gl/maps/8yTsQzDJ9gbUHCca8`,
  },
  {
    id: 3,
    hospitalName: 'Rumah Sakit Bethesda Yogyakarta',
    hospitalDirection: `https://goo.gl/maps/AzJx3ma1sPtcQwed7`,
  },
  {
    id: 4,
    hospitalName: 'Rumah Sakit Pratama',
    hospitalDirection: `https://goo.gl/maps/YmERSNX81HHrxno38`,
  },
  {
    id: 5,
    hospitalName: 'Rumah Sakit Siloam',
    hospitalDirection: `https://goo.gl/maps/gQrQCqeJmpF4oEtU9`,
  },
  {
    id: 6,
    hospitalName: 'Rumah Sakit DKT Dr Soetarto',
    hospitalDirection: `https://goo.gl/maps/Jdup4qVpqa4terou9`,
  }
];

const KabupatenSlemanHealthFacilityData = [
  {
    id: 1,
    hospitalName: 'RSUP Dr. Sardjito',
    hospitalDirection: 'https://goo.gl/maps/whm6XBs1XSFELoFA6',
  },
  {
    id: 2,
    hospitalName: 'RSUD Sleman',
    hospitalDirection: `https://goo.gl/maps/XLFEw6XGFee4jYwD8`,
  },
  {
    id: 3,
    hospitalName: 'RSUD Prambanan',
    hospitalDirection: `https://goo.gl/maps/T3azp6QmHH7sD5Cg7`,
  },
  {
    id: 4,
    hospitalName: 'Rumah Sakit JIH',
    hospitalDirection: `https://goo.gl/maps/k9tqdCuFaTdspRgDA`,
  },
  {
    id: 5,
    hospitalName: 'Rumah Sakit Sakina Idaman',
    hospitalDirection: `https://goo.gl/maps/T1sJv4KJeBH1kbwS7`,
  },
  {
    id: 6,
    hospitalName: 'Rumah Sakit PKU Muhammadiyah Gamping',
    hospitalDirection: `https://goo.gl/maps/yZiboSa8jLfkCRqA7`,
  },
  {
    id: 7,
    hospitalName: 'Rumah Sakit Bhayangkara',
    hospitalDirection: `https://goo.gl/maps/XLFEw6XGFee4jYwD8`,
  },
  {
    id: 8,
    hospitalName: 'Rumah Sakit Akademik UGM',
    hospitalDirection: `https://goo.gl/maps/K1yaBoGQd1WN2QPu7`,
  },
  {
    id: 9,
    hospitalName: 'Rumah Sakit Hermina',
    hospitalDirection: `https://goo.gl/maps/5B3gZnufpYiYWfbi7`,
  },
  {
    id: 10,
    hospitalName: 'Rumah Sakit Panti Rini',
    hospitalDirection: 'https://goo.gl/maps/HqQWPQtxp8uVGMQE6',
  }
];

const KabupatenBantulHealthFacilityData = [
  {
    id: 1,
    hospitalName: 'RSUD Panembahan Senopati',
    hospitalDirection: `https://goo.gl/maps/5d58hMgyRWMMu7nG7`,
  },
  {
    id: 2,
    hospitalName: 'RSPAU Dr. Hardjolukito',
    hospitalDirection: `https://goo.gl/maps/ApXgL8ezW6kWRcmT9`,
  },
  {
    id: 3,
    hospitalName: 'Rumah Sakit Santa Elizabeth',
    hospitalDirection: `https://goo.gl/maps/iRCo5RGB4FSaXRBSA`,
  },
  {
    id: 4,
    hospitalName: 'Rumah Sakit PKU Muhammadiyah Bantul',
    hospitalDirection: `https://goo.gl/maps/Sw6kwC1AizMw6yfQ9`,
  }
];

const KabupatenGunungkidulHealthFacilityData = [
  {
    id: 1,
    hospitalName: 'RSUD Wonosari',
    hospitalDirection: `https://goo.gl/maps/326ARVwzxWcWV3kh6`,
  },
  {
    id: 2,
    hospitalName: 'Rumah Sakit Panti Rahayu',
    hospitalDirection: `https://goo.gl/maps/A7Mo6HufJhH4LyrM6`,
  }
];

const KabupatenKulonprogoHealthFacilityData = [
  {
    id: 1,
    hospitalName: 'RSUD Wates',
    hospitalDirection: `https://goo.gl/maps/VDDNuLdqioBsRdTy5`,
  },
  {
    id: 2,
    hospitalName: 'RSUD Nyia Ageng Serang',
    hospitalDirection: `https://goo.gl/maps/G3MWuCb94wk6nReZ6`,
  }
];

const clasificationData = {
  Mild: {
    name : 'Ringan',
    recommendation : 'Isolasi Mandiri di Rumah',
  },
  Moderate: {
    name : 'Sedang',
    recommendation : 'Mengunjungi Fasilitas Kesehatan',
  },
  Severe: {
    name : 'Berat',
    recommendation : 'Mengunjungi Fasilitas Kesehatan',
  },
};

const ResultPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userLocation, setUserLocation] = useState();
  const [loading, setLoading] = useState(true);
  const { user } = UserAuth();
  const router = useRouter();

  const maxClass = router.query.Mild
     ? Object.keys(router.query).reduce((a, b) =>
         router.query[a] > router.query[b] ? a : b
       )
     : 'Mild';

  const closeModal = () => {
    // redirect to userlanding
    setIsOpen(false);
  };
  const openModal = () => {
     setIsOpen(true);
   };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userProfileRef = doc(db, 'user', user.uid);
        const userProfileSnapshot = await getDoc(userProfileRef);
        const userProfileData = userProfileSnapshot.data();
        setUserLocation(userProfileData.domisili);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, [loading, user.uid]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    console.log(data);
  };

  if (loading) {
    return <div>Loadingg</div>;
  }

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

      <div className="m-0 text-center pt-[15vh]">
        <h1 className="font-bold text-3xl mb-28">Hasil Klasifikasi</h1>
        <p className="text-[#5072B8] text-2xl font-extrabold mb-16">
          Gejala {clasificationData[maxClass]['name']}
        </p>
        <p className="text-[#5072B8] text-2xl font-extrabold mb-4">
          Rekomendasi:
        </p>
        <p className="text-[#023047] text-2xl font-medium mb-20">
          {clasificationData[maxClass]['recommendation']}
        </p>
      </div>

      <button
        className="primary-button block mx-auto"
        onClick={() => openModal()}
      >
        Lihat Fasilitas Kesehatan
      </button>

      <Transition appear show={isOpen} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-xl min-h-[500px] transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-3xl bg-[#284F63] text-[#FCD8B0] font-bold text-center px-2 py-4"
                  >
                    Fasilitas Kesehatan Terdekat
                  </Dialog.Title>
                  <div className="mt-2 px-6 py-8">
                    <ul className="list-disc list-inside pl-9 -indent-9">
                    {userLocation === "Kota Yogyakarta" ? (
                         KotaYogyakartaHealthFacilityData.map((data, index) => (
                           <li
                             key={data.id}
                             className={
                               index === KotaYogyakartaHealthFacilityData.length - 1
                                 ? 'text-[#284F63] font-bold text-2xl'
                                 : 'text-[#284F63] font-bold text-2xl mb-4'
                             }
                           >
                             {data.hospitalName}
                             <a href={data.hospitalDirection}>Buka Google Maps</a>
                           </li>
                         ))
                       ) : userLocation === "Kabupaten Sleman" ? (
                        KabupatenSlemanHealthFacilityData.map((data, index) => (
                           <li
                             key={data.id}
                             className={
                               index === KabupatenSlemanHealthFacilityData.length - 1
                                 ? 'text-[#284F63] font-bold text-2xl'
                                 : 'text-[#284F63] font-bold text-2xl mb-4'
                             }
                           >
                             {data.hospitalName}
                             <a href={data.hospitalDirection}>Buka Google Maps</a>
                           </li>
                         ))
                       ) : userLocation === "Kabupaten Bantul" ? (
                        KabupatenBantulHealthFacilityData.map((data, index) => (
                          <li
                            key={data.id}
                            className={
                              index === KabupatenBantulHealthFacilityData.length - 1
                                ? 'text-[#284F63] font-bold text-2xl'
                                : 'text-[#284F63] font-bold text-2xl mb-4'
                            }
                          >
                            {data.hospitalName}
                            <a href={data.hospitalDirection}>Buka Google Maps</a>
                          </li>
                        ))
                        ) : userLocation === "Kabupaten Gunungkidul" ? (
                          KabupatenGunungkidulHealthFacilityData.map((data, index) => (
                            <li
                              key={data.id}
                              className={
                                index === KabupatenGunungkidulHealthFacilityData.length - 1
                                  ? 'text-[#284F63] font-bold text-2xl'
                                  : 'text-[#284F63] font-bold text-2xl mb-4'
                              }
                            >
                              {data.hospitalName}
                              <a href={data.hospitalDirection}>Buka Google Maps</a>
                            </li>
                          ))
                          ) : userLocation === "Kabupaten Kulonprogo" ? (
                            KabupatenKulonprogoHealthFacilityData.map((data, index) => (
                              <li
                                key={data.id}
                                className={
                                  index === KabupatenKulonprogoHealthFacilityData.length - 1
                                    ? 'text-[#284F63] font-bold text-2xl'
                                    : 'text-[#284F63] font-bold text-2xl mb-4'
                                }
                              >
                                {data.hospitalName}
                                <a href={data.hospitalDirection}>Buka Google Maps</a>
                              </li>
                            ))
                       ) : (<li>Rumah sakit terdekat tidak ditemukan</li>) }
                    </ul>
                  </div>

                  <div>
                    <button 
                      type="button"
                      className="bg-[#5072B8] text-white px-8 py-1 text-center rounded-2xl font-bold mx-auto mb-4 flex justify-center"
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

export default ResultPage;
