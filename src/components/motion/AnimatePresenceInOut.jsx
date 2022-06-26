import { AnimatePresence, motion } from 'framer-motion';

export const AnimatePresenceInOut = ({ color, isVisible, children }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        key="child"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ color }}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);
