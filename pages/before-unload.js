import React, { useEffect } from 'react'
import {useRouter} from 'next/router'
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
      e.preventDefault();
      return (e.returnValue = warningText);
    };
  
    const handleBrowseAway = () => {
      if (window.confirm(warningText)) return;
      router.events.emit("routeChangeError");
      throw "routeChange aborted.";
    };
  
    useEffect(() => {
      window.addEventListener("beforeunload", handleWindowClose);
      router.events.on("routeChangeStart", handleBrowseAway);

      if(isSafariMobile) {
        window.addEventListener('focus', function(){
            // do stuff
            handleBrowseAway
          });
     
        window.addEventListener('blur', function(){
            // do stuff
            handleBrowseAway
          });
      }
      return () => {
        window.removeEventListener("beforeunload", handleWindowClose);
        router.events.off("routeChangeStart", handleBrowseAway);
        if(isSafariMobile){
            window.removeEventListener('focus', function(){
                // do stuff
            handleBrowseAway()
              });
         
            window.removeEventListener('blur', function(){
                // do stuff
            handleBrowseAway()
              });
        }
      };
    }, []);
  return (
    <div> 
        <Link href={'/'}>Home</Link>
    </div>
  )
}

export default BeforeUnloadCheck