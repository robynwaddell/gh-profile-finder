import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Search from './pages/Search';
import User from './pages/User';

const App = () => {
    const location = useLocation();

    return (
        <main>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Search />
                        </motion.div>
                    } />
                    <Route path="/user/:username" element={
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <User />
                        </motion.div>
                    } />
                </Routes>
            </AnimatePresence>
        </main>
    );
};

export default App;
