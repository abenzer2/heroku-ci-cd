import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';

const BeforeUnloadCheck = () => {
    const router = useRouter();

    const [number, setNumber] = useState(1)
    function isSafariMobile() {
        return (
            navigator &&
            /Safari/.test(navigator.userAgent) &&
            /iPhone|iPad/.test(navigator.userAgent)
        );
    }
    const [isIphone, setIsIphone] = useState(null)

    useEffect(() => {
        setIsIphone(isSafariMobile())
    }, [])


    const warningText =
        "You have unsaved changes - are you sure you wish to leave this page?";

    const handleWindowClose = (e) => {
        e?.preventDefault();
        return (warningText);
    };

    const handleBrowseAway = () => {
        if (window.confirm(warningText)) return;
        router.events.emit("routeChangeError");
        throw "routeChange aborted.";
    };
    const beforeUnloadHandler = (e) => {
        (e || window.event).returnValue = warningText;
        return warningText; // Gecko + Webkit, Safari, Chrome etc.
      }

      const beforeRouteHandler = (url,x) => {
        if (router.pathname !== url && !confirm(warningText)) {
          router.events.emit('routeChangeError');
          console.log('came here');
          router.replace('/before-unload')
          // tslint:disable-next-line: no-string-throw
          throw `Route change to "${url}${'x',x}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
        }
      };

    useEffect(() => {
        if(!navigator) return;
        router.events.on("routeChangeStart", beforeRouteHandler);
        // if (isIphone) {
        // window.addEventListener('pagehide',beforeRouteHandler);
        // }
        // else {
        // window.addEventListener("beforeunload",beforeUnloadHandler);
        // }
        return () => {
            router.events.off("routeChangeStart",beforeRouteHandler);
            // if (isIphone) {
            // window.removeEventListener('pagehide',beforeRouteHandler);
            // }
            // else {
            // window.removeEventListener("beforeunload", beforeUnloadHandler);
            // }
        };
    }, [isIphone]);
    // useEffect(() => {
    //     window.addEventListener("blur",handleWindowClose);
    //     return () => {
    //         window.removeEventListener("blur",handleWindowClose);  
    //     };
    // }, []);
    return (
        <div className='flex flex-col w-full min-h-[80vh] items-center justify-center' style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            minHeight: '80vh',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Link href={'/'}>Home</Link>
            <button onClick={() => setNumber(number+1)}>Show User Agent</button>
            <div>
                {/* {JSON.stringify(/iPhone/.test(navigator.userAgent))} */}
                {JSON.stringify(isIphone)}{JSON.stringify(number)}
            </div>
        </div>
    )
}

export default BeforeUnloadCheck