import { AreaChart } from '@/components/Charts/AreaChart';
import { Settings } from '@/components/svg';
import ThemeCustomize from '@/components/theme-customizer/theme-customizer';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const Home: React.FC = () => {

  return (
    <>
      <AreaChart />
      <ThemeCustomize />
    </>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
    </Route>,
  ),
);

