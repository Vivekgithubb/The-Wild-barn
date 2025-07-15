import { useEffect, useRef } from "react";

export default function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function HandleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      document.addEventListener("click", HandleClick, listenCapturing);
      return () =>
        document.removeEventListener("click", HandleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );
  return ref;
}
