import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import MobileNav from './MobileNav.jsx';
import Ambient from './Ambient.jsx';
import ModalHost from './ModalHost.jsx';
import Toast from '../ui/Toast.jsx';

export default function AppShell() {
    const { pathname } = useLocation();

    return (
        <div className="relative min-h-screen">
            <Ambient />

            <Sidebar />

            <div className="relative z-10 md:pl-56">
                <Topbar />

                <main className="mx-auto max-w-[1500px] p-4 pb-24 md:p-8 md:pb-10">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.12 }}
                    >
                        <Outlet />
                    </motion.div>
                </main>
            </div>

            <MobileNav />
            <ModalHost />
            <Toast />
        </div>
    );
}
