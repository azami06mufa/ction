import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { UserAuth } from '../context/AuthContext';

import logo from '../public/logo.png';

const Layout = ({ children }) => {
  const router = useRouter();
  const { logout } = UserAuth();

  return (
    <>
      <Head>
        <title>CTION</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <header>
        <nav className="m-auto w-full mt-1 flex h-20 items-center justify-between px-12 shadow-md">
          <Link href="/">
            <Image
              src={logo}
              width={64}
              height={64}
              layout="fixed"
              alt="Logo"
            />
          </Link>

          {router.pathname === '/' || router.pathname === '/signin' || router.pathname === '/signup' ? 
          (
            <div>
              <Link href="/">
                <p className="text-[#023047] font-bold"></p>
              </Link>
            </div>
          ) 
          :
           (
            <div className="flex items-center justify-center gap-16 mr-16">
              <button
                className={
                  router.pathname == '/userlanding'
                    ? 'rounded-2xl bg-blue-100 shadow-md border-[1px] px-3 py-1'
                    : 'rounded-2xl bg-white shadow-md border-[1px] px-3 py-1'
                }
                onClick={() => router.push('/userlanding')}
              >
                <p className="font-bold text-lg">Laman Utama</p>
              </button>
              <button
                className={
                  router.pathname == '/history'
                    ? 'rounded-2xl bg-blue-100 shadow-md border-[1px] px-3 py-1'
                    : 'rounded-2xl bg-white shadow-md border-[1px] px-3 py-1'
                }
                onClick={() => router.push('/history')}
              >
                <p className="font-bold text-lg">Riwayat</p>
              </button>

              {/* Add logic to sign out */}
              <button
                className="rounded-2xl bg-white shadow-md border-[1px] px-3 py-1"
                onClick={() => {
                  logout();
                  router.push("/")
                }}
              >
                <p className="font-bold text-lg">Keluar</p>
              </button>
            </div>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
