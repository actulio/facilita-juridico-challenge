import { motion } from 'framer-motion';
import React from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

import AddClient from '../pages/Clients/AddClient';
import Dashboard from '../pages/Clients/Dashboard';
import EditClient from '../pages/Clients/EditClient';
import ViewClient from '../pages/Clients/ViewClient';
import NotFound from '../pages/NotFound/NotFound';

const variants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const transition = {
  type: 'tween',
  ease: 'linear',
  duration: 0.3,
};

const AnimationLayout: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="in"
      variants={variants}
      transition={transition}
    >
      <Outlet />
    </motion.div>
  );
};

const RoutesWithAnimation = () => {
  return (
    <Routes>
      <Route element={<AnimationLayout />}>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddClient />} />
        <Route path="/edit/:clientId" element={<EditClient />} />
        <Route path="/view/:clientId" element={<ViewClient />} />
      </Route>
    </Routes>
  );
};

export default RoutesWithAnimation;
