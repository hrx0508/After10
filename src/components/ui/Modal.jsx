import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
export default function Modal({ open, onClose, title, children, wide }) {
    useEffect(() => { const f = e => e.key === 'Escape' && onClose(); if (open) window.addEventListener('keydown', f); return () => window.removeEventListener('keydown', f) }, [open]);
    return <AnimatePresence>{open && <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
        <motion.div role="dialog" aria-label={title} onClick={e => e.stopPropagation()} initial={{ scale: .92, y: 24, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: .95, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className={`glass max-h-[90vh] w-full overflow-auto rounded-3xl p-6 ${wide ? 'max-w-2xl' : 'max-w-md'}`}><div className="mb-4 flex items-center justify-between"><h3 className="text-xl font-bold">{title}</h3>
                <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 hover:bg-white/10"><X size={18} /></button></div>{children}</motion.div></motion.div>}</AnimatePresence>
}
