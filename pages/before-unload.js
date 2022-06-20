import React, { useEffect } from 'react'
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

    const warningText =
        "You have unsaved changes - are you sure you wish to leave this page?";

    const handleWindowClose = (e) => {
        e?.preventDefault();
        return (e.returnValue = warningText);
    };

    const handleBrowseAway = () => {
        if (window.confirm(warningText)) return;
        router.events.emit("routeChangeError");
        throw "routeChange aborted.";
    };

    useEffect(() => {
        if (isSafariMobile()) {
            window.addEventListener('focus',handleBrowseAway);
            window.addEventListener('blur',handleBrowseAway);
        }
        else {
            window.addEventListener("beforeunload", handleBrowseAway);
            router.events.on("routeChangeStart", handleBrowseAway);
        }
        return () => {
            if (isSafariMobile()) {
                window.removeEventListener('focus',handleBrowseAway);
                window.removeEventListener('blur', handleBrowseAway);
            }
            else {
                window.removeEventListener("beforeunload", handleBrowseAway);
                router.events.off("routeChangeStart", handleBrowseAway);
            }
        };
    }, []);
    return (
        <div className='flex flex-col w-full min-h-[80vh] items-center justify-center' style={{
            display:'flex',
            flexDirection:'column',
            width:'100%',
            minHeight:'80vh',
            justifyContent:'center',
            alignItems:'center'
          }}>
            <Link href={'/'}>Home</Link>
        </div>
    )
}

export default BeforeUnloadCheck