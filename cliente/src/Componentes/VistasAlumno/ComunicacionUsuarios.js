import React, { useEffect, useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import './Css/SalaComunicacion.css';

function randomID(len) {
  let result = '';
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

const ComunicacionUsuarios = ({ setVista }) => {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  const myCallContainerRef = useRef(null);
  const zp = useRef(null);
  
  useEffect(() => {
    console.log("Component mounted, initializing ZegoUIKitPrebuilt...");

    const appID = 615825585;
    const serverSecret = "cef6fb2904ea3a9cc07c9f60d5e91367";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

    // Create instance object from Kit Token.
    zp.current = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.current.joinRoom({
      container: myCallContainerRef.current,
      maxUsers: 2,
      sharedLinks: [
        {
          name: 'Personal link',
          url: window.location.protocol + '//' + window.location.host + window.location.pathname + '?roomID=' + roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });

    console.log("ZegoUIKitPrebuilt initialized");

    // Clean up function to leave the room when the component unmounts
    return () => {
      console.log("Component unmounted, cleaning up...");
      if (zp.current) {
        if (zp.current.destroy) {
          zp.current.destroy();  // Using destroy method if available
        }
        zp.current = null;
        console.log("ZegoUIKitPrebuilt instance destroyed");
      }
    };
  }, [roomID]);

  return (
    <div className="myCallContainer col" ref={myCallContainerRef} style={{ height: '100vh' }}>
      {/* This div will be used as the container for the ZegoUIKitPrebuilt instance */}
    </div>
  );
}

export default ComunicacionUsuarios;
