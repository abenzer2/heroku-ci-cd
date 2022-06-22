import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Link from 'next/link';
import { useBeforeunload } from 'react-beforeunload';

const BeforeUnloadCheck = () => {
    const router = useRouter();

    const [number, setNumber] = useState(1)

    // useEffect(() => {
    //     if (!router.isReady) return;

    //     const warningText =
    //         "You have unsaved changes - are you sure you wish to leave this page?";

    //     const isSafariMobile = () => {
    //         return (
    //             navigator &&
    //             /Safari/.test(navigator.userAgent) &&
    //             /iPhone|iPad/.test(navigator.userAgent)
    //         );
    //     };
    //     const beforeRouteHandler = (url) => {
    //         if (router.pathname !== url && !confirm(warningText)) {
    //             router.events.emit("routeChangeError");
    //             throw `Route change to "${url}" was aborted (this error can be safely ignored).`;
    //         }
    //     };
    //     const beforeUnload = (e) => {
    //         (e || window.event).returnValue = warningText;
    //         return warningText;
    //     };

    //     router.events.on("routeChangeStart", beforeRouteHandler);
    //     if (!isSafariMobile) {
    //         window.addEventListener("beforeunload", beforeUnload);
    //     }
    //     return () => {
    //         router.events.off("routeChangeStart", beforeRouteHandler);
    //         if (!isSafariMobile()) {
    //             window.removeEventListener("beforeunload", beforeUnload);
    //         }
    //     };
    // }, [router.isReady]);
    useBeforeunload((event) => {
        event.preventDefault();
    });
    useEffect(() => {
                const warningText =
            "You have unsaved changes - are you sure you wish to leave this page?";
        const beforeRouteHandler = (url) => {
            console.log(router)
            if (router.pathname !== url && !confirm(warningText)) {
                // router.events.emit("routeChangeError");
                router.replace('/before-unload');
                // throw `Route change to "${url}" was aborted (this error can be safely ignored).`;
                // router.replace('/before-unload',as)
            }
            
        };
        router.events.on("routeChangeStart", beforeRouteHandler);
        return () => {
            router.events.off("routeChangeStart", beforeRouteHandler);
        }
    }, [])
    // useEffect(() => {
    //     router.beforePopState(({ as }) => {
    //         if (as !== router.asPath) {
    //             handleRouteChange({ toHref: '/before-unload' }, Router.push);
    //             return false;
    //         }
    //         return true;
    //     });
        
    //     return () => {
    //         router.beforePopState(() => true);
    //     };
    // }, [router]);



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
                {/* {JSON.stringify(isIphone)} */}
                {JSON.stringify(number)}
            </div>
        </div>
    )
}

export default BeforeUnloadCheck