import { forwardRef } from "react";
import { motion } from "framer-motion";

export const Lens = forwardRef(function Lens(
  { showLoader, showPlaceholder },
  ref
) {
  return (
    <div
      id="canvas-parent"
      className="flex justify-center align-middle w-full h-full"
    >
      <canvas
        className="relative border-zinc-400 border"
        id="my-canvas"
        ref={ref}
      />
      {/* <div
          className={
            "relative flex flex-col items-center justify-center rounded-lg w-[337px] h-[600px] -top-[300px] border-zinc-400 border p-4 bg-[url('boomboxARplaceholder.png')] z-10 " +
            (showPlaceholder ? "opacity-100" : "opacity-0")
          }
        >
          <motion.div
            className={
              "w-10 h-10 text-center text-zinc-100 " +
              (showLoader ? "" : "hidden")
            }
            animate={{ scale: ["100%", "120%", "100%"] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Loading
          </motion.div>
        </div> */}
    </div>
  );
});
