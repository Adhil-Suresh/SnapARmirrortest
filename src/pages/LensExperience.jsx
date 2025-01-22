import { Lens } from "../components/Lens";
import { useEffect, useRef, useState } from "react";
import { bootstrapCameraKit, Transform2D } from "@snap/camera-kit";

const setupAndStartLens = async function (canvas, setLoader) {
  setLoader([true, true]);

  const cameraKit = await bootstrapCameraKit({
    apiToken: import.meta.env.VITE_API_KEY,
  });

  const liveRenderTarget = canvas;
  const session = await cameraKit.createSession({
    liveRenderTarget,
    renderWhileTabHidden: false,
  });
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  let source = await session.setSource(mediaStream);
  source.setTransform(Transform2D.MirrorX);
  //source.setTransform(new Transform2D([0, 1, 0, 1, 0, 0, 0, 0, 1]));
  //   source.setRenderSize(450 * 8, 800 * 8);
  source.setRenderSize(
    window.screen.availHeight * 4,
    window.screen.availWidth * 4
  );
  console.log(window.screen.availHeight);
  await session.play();
  setLoader([false, false]);

  const lens = await cameraKit.lensRepository.loadLens(
    import.meta.env.VITE_LENS_ID,
    import.meta.env.VITE_LENS_GROUP_ID
  );
  await session.applyLens(lens);
};

export function LensExperience() {
  const playButtonRef = useRef(null);
  const lensRef = useRef(null);
  const [placeholderStatus, setPlaceholderStatus] = useState([false, true]);

  //   useEffect(() => {
  //     if (playButtonRef.current && lensRef.current) {
  //       playButtonRef.current.addEventListener("click", () => {
  //         lensRef.current?.scrollIntoView({
  //           block: "center",
  //           behavior: "smooth",
  //         });
  //         if (playButtonRef.current) {
  //           playButtonRef.current.disabled = true;
  //         }
  //         if (lensRef.current)
  //           setupAndStartLens(lensRef.current, setPlaceholderStatus);
  //       });
  //     }
  //   }, []);

  useEffect(() => {
    setupAndStartLens(lensRef.current, setPlaceholderStatus);
    document.addEventListener("fullscreenchange", () => {
      lensRef.current.style.width = 100;
      console.log("fullscreen");
    });
  }, []);

  return (
    <>
      <Lens
        ref={lensRef}
        showLoader={placeholderStatus[0]}
        showPlaceholder={placeholderStatus[1]}
      />
      <button
        className="px-4 py-2 m-4 rounded-xl border bg-gradient-to-r from-indigo-300 via-pink-300 to-red-300"
        onClick={() => {
          document.getElementById("canvas-parent").requestFullscreen();
        }}
      >
        Full Screen
      </button>
    </>
  );
}
