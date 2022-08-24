import gsap from "gsap";
import { ScrollTrigger as scrollTrigger } from "gsap/ScrollTrigger";
import { ScrollbarPlugin } from "smooth-scrollbar";
import Scrollbar from 'smooth-scrollbar';

gsap.registerPlugin(scrollTrigger)


class DisableScrollPlugin extends ScrollbarPlugin {
   static pluginName = 'disableScroll';

   static defaultOptions = {
      direction: '',
   };

   transformDelta(delta) {
      if (this.options.direction) {
         delta[this.options.direction] = 0;
      }

      return { ...delta };
   }
}


function setScrollSmooth(object, hide = '', disable = '', script = () => { }) {
   const wrapperScroll = Scrollbar.init(object, {
      smooth: true,
      plugins: {
         disableScroll: {
            direction: disable
         }
      }
   })

   hide.includes('x') && wrapperScroll.track.xAxis.element.remove();
   hide.includes('y') && wrapperScroll.track.yAxis.element.remove();

   scrollTrigger.scrollerProxy(object, {
      scrollTop(value) {
         if (arguments.length) {
            wrapperScroll.scrollTop = value;
         }
         script();
         return wrapperScroll.scrollTop;
      }
   });

   wrapperScroll.addListener(scrollTrigger.update);

   return wrapperScroll;
}


function allowMarkers(scrollInit) {
   if (document.querySelector('.gsap-marker-scroller-start')) {
      const markers = gsap.utils.toArray('[class *= "gsap-marker"]');

      scrollInit.addListener(({ offset }) => {
         gsap.set(markers, { marginTop: -offset.y })
      });
   }
}


export { DisableScrollPlugin, setScrollSmooth, allowMarkers }