import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';

const BeforeUnloadCheck = () => {
    const router = useRouter();
    const warningText =
    "You have unsaved changes - are you sure you wish to leave this page?";

    const [number, setNumber] = useState(1)

    useEffect(() => {
        if (!router.isReady) return;
        const beforeRouteHandler = (url) => {
            if (router.pathname !== url && !confirm(warningText)) {
                router.events.emit('routeChangeError');
                router.replace('/before-unload')
                throw `Route change to "${url}" was aborted (this error can be safely ignored). See https://github.com/zeit/next.js/issues/2476.`;
            }
        };
        router.events.on("routeChangeStart", beforeRouteHandler);
        return () => {
            router.events.off("routeChangeStart", beforeRouteHandler);
        };
    }, [router.isReady]);
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
               {JSON.stringify(number)}
            </div>
        </div>
    )
}

export default BeforeUnloadCheck