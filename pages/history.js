import React, {useEffect, useState} from "react";
import Image from 'next/image';
import Link from 'next/link';
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebaseconfig";
import { UserAuth } from "../context/AuthContext";

import backgroundImage from '../public/background-image.jpg';

import { useForm } from 'react-hook-form';

// const userHistoryData = [
//   {
//     inputDate: new Intl.DateTimeFormat("en-GB", {
//       year: "numeric",
//       month: "long",
//       day: "2-digit",
//     }).format(Date.now()),
//     result: "Gejala Ringan",
//     recommendation: "Isolasi Mandiri di Rumah",
//   },
//   {
//     inputDate: new Intl.DateTimeFormat('en-GB', {
//       year: "numeric",
//       month: "long",
//       day: "2-digit",
//     }).format(Date.now()),
//     result: "Gejala Berat",
//     recommendation: "Mengunjungi fasilitas kesehatan terdekat",
//   },
// ];


const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = UserAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const getData = async () => {
      const snapshot = await getDocs(
        collection(db, `user/${user.uid}/history`)
      );
      snapshot.docs.map((doc) => {
        console.log(doc.data());
        setHistoryData([...historyData, doc.data()]);
      });
      setLoading(false);
    };

    getData();
  }, [loading]);

  // const snapshot = await firebase.firestore().collection('events').get()
  //   return snapshot.docs.map(doc => doc.data());

  if (loading) {
    return <div>loading</div>;
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

      <div className="m-0 flex flex-col justify-center pt-[10vh]">
        <h2 className="text-center font-bold text-4xl text-[#023047] mb-8">
          Riwayat
        </h2>

        <div className="mx-auto ">
        {historyData.length > 0 ? (
            <>
              {historyData.map((data, index) => (
            <div
              key={index}
              className="w-[500px] bg-white border-[1px] shadow-md rounded-xl py-6 px-4 mb-4"
            >
              <p>Tanggal Pengisian: {data.dateCreated}</p>
              <p>Hasil: {data.criteria}</p>
              <p>Rekomendasi: {data.recommendation}</p>
            </div>
          ))}
        </>
        ) : (
          <h1>Belum ada data</h1>  
        )}
      </div>
    </div>
    </div>
  );
};

export default HistoryPage;
