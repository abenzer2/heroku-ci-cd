import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';

const BeforeUnloadCheck = () => {
    const router = useRouter();
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

    useEffect(() => {
        if(!navigator) return;
        if (isSafariMobile()) {
        window.addEventListener('focus',handleBrowseAway);
        window.addEventListener('blur',handleBrowseAway);
        }
        else {
        window.addEventListener("beforeunload",handleWindowClose);
        router.events.on("routeChangeStart", handleBrowseAway);
        }
        return () => {
            if (isSafariMobile()) {
            window.removeEventListener('focus',handleBrowseAway);
            window.removeEventListener('blur',handleBrowseAway);
            }
            else {
            window.removeEventListener("beforeunload", handleWindowClose);
            router.events.off("routeChangeStart",handleBrowseAway);
            }
        };
    }, [isIphone]);
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
            <button onClick={() => setUserAgent(navigator.userAgent)}>Show User Agent</button>
            <div>
                {/* {JSON.stringify(/iPhone/.test(navigator.userAgent))} */}
                {JSON.stringify(isIphone)}
            </div>
        </div>
    )
}

export default BeforeUnloadCheck