import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link';
import { useBeforeunload } from 'react-beforeunload';

const BeforeUnloadCheck = () => {
    const router = useRouter();

    const [number, setNumber] = useState(1);
    const [isIPhone, setIsIPhone] = useState(false);

    const isSafariMobile = () => {
        return (
            navigator &&
            /Safari/.test(navigator.userAgent) &&
            /iPhone|iPad/.test(navigator.userAgent)
        );
    };
    useEffect(() => {
        setIsIPhone(isSafariMobile())
    }, [])

    useBeforeunload((event) => {
        event.preventDefault();
    });
    useEffect(() => {
      if(isSafariMobile()) return;
      const warningText =
      "You have unsaved changes - are you sure you wish to leave this page?";
      const beforeRouteHandler = (url) => {
        if (router.pathname !== url && !confirm(warningText)) {
          router.events.emit("routeChangeError");
          throw `Route change to "${url}" was aborted (this error can be safely ignored).`;
        }
      };
      router.events.on("routeChangeStart", beforeRouteHandler);
      return () => {
        router.events.off("routeChangeStart", beforeRouteHandler);
      }
    }, [])
    
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
            <button onClick={() => setNumber(number + 1)}>Show User Agent</button>
            <div>
                {JSON.stringify(isIPhone)}
                {JSON.stringify(number)}
            </div>
        </div>
    )
}

export default BeforeUnloadCheck