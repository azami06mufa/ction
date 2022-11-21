import '../styles/globals.css';
import Layout from '../components/Layout';
import { AuthContextProvider } from '../context/AuthContext';
import { useRouter } from 'next/router';

import ProtectedRoute from '../components/ProtectedRoute';

const noAuthRoutes = ['/','/signin','/signup'];

function MyApp({ Component, pageProps }) {

  const router = useRouter();

  return (
    <AuthContextProvider>
      <Layout>
        {noAuthRoutes.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <ProtectedRoute>
            <Component {...pageProps} />
          </ProtectedRoute>
        )}
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
