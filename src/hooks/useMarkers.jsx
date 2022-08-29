const useMarkers = scrollInit => {
   if (document.querySelector('.gsap-marker-scroller-start')) {
      const markers = gsap.utils.toArray('[class *= "gsap-marker"]');

      scrollInit.addListener(({ offset }) => {
         gsap.set(markers, { marginTop: -offset.y });
      });
   }
};

export default useMarkers;
