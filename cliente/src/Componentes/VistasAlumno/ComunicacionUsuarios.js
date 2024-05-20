import React, {useEffect,use} from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import './Css/SalaComunicacion.css';
//import { set } from '../../../../server/configuracion/emailConfig';

function randomID(len) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url = window.location.href
) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

const ComunicacionUsuarios = ({ setVista }) => {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  let zp;
  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 615825585;
    const serverSecret = "cef6fb2904ea3a9cc07c9f60d5e91367";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), randomID(5));

    // Create instance object from Kit Token.
    zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
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
  };



  return (
    <div className="myCallContainer col" ref={myMeeting} style={{height: '100vh' }}>
  
    </div>
  );
}

export default ComunicacionUsuarios;