"use client";

import { motion } from "framer-motion";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "27712345678";
const DEFAULT_MESSAGE = "Hi iConnect Pre-Owned! I'd like to ask about a device.";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated sm:bottom-7 sm:right-7"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M16.02 3C9.4 3 4 8.36 4 14.98c0 2.2.6 4.26 1.63 6.03L4 29l8.2-1.55a12.9 12.9 0 0 0 3.82.58h.01c6.62 0 12.02-5.36 12.02-11.98C28.05 8.36 22.66 3 16.02 3Zm7.05 17.02c-.3.83-1.7 1.6-2.35 1.7-.6.1-1.36.14-2.2-.14-.5-.16-1.15-.38-2-.75-3.52-1.52-5.82-5.08-6-5.32-.18-.24-1.43-1.9-1.43-3.63s.9-2.57 1.23-2.93c.3-.32.66-.4.88-.4.22 0 .44 0 .63.01.2 0 .48-.08.75.57.3.7 1 2.43 1.09 2.6.09.18.15.4.03.64-.12.24-.18.4-.36.6-.18.2-.38.46-.55.62-.18.18-.37.37-.16.73.2.36.9 1.5 1.95 2.43 1.34 1.2 2.47 1.57 2.83 1.75.36.18.57.15.78-.09.22-.24.9-1.05 1.15-1.4.24-.36.48-.3.8-.18.34.12 2.1.99 2.46 1.17.36.18.6.27.68.42.1.16.1.9-.2 1.72Z" />
      </svg>
    </motion.a>
  );
}
