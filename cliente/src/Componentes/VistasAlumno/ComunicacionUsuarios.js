import React, { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import './Css/SalaComunicacion.css';
import Cookies from 'js-cookie';
import axios from "axios";
import Logo from '../VistasPrincipal/Utils/LearnMatchCerebro.png';


let userPk = Cookies.get('userPk');

function obtener_cookie(){
  userPk = Cookies.get('userPk');
}

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

const ponerNombreUsuario = async () => {
  try {
    const response = await axios.get(`https://201.124.154.2:3001/api/alumnos/obtenerNombreCompleto?userPk=${userPk}`);
    return response.data[0].nombreCompleto;
  } catch (error) {
      console.error('Error al obtener la cantidad de strikes:', error);
  }
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

const ComunicacionUsuarios = ({ setVista }) => {
  obtener_cookie();
  const roomID = getUrlParams().get('roomID') || randomID(5);
  const myCallContainerRef = useRef(null);
  const zp = useRef(null);
  

  useEffect(() => {
    const initializeZegoUIKit = async () => {
      console.log("Component mounted, initializing ZegoUIKitPrebuilt...");
      const fullName = await ponerNombreUsuario();
      const appID = 615825585;
      const serverSecret = "cef6fb2904ea3a9cc07c9f60d5e91367";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, randomID(5), fullName);

      // Create instance object from Kit Token.
      zp.current = ZegoUIKitPrebuilt.create(kitToken);
      // start the call
      zp.current.joinRoom({
        container: myCallContainerRef.current,
        maxUsers: 2,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        preJoinViewConfig: {
          title: '¡¡Bienvenido a tu clase!!', // The title of the prejoin view. Uses "enter Room" by default.
        },
        branding: {
          logoURL: Logo, // The branding LOGO URL.
        },
        whiteboardConfig: {
          showAddImageButton: true, // It's set to false by default. To use this feature, activate the File Sharing feature, and then import the plugin. Otherwise, this prompt will occur: "Failed to add image, this feature is not supported."
          showCreateAndCloseButton: true, // Whether to display the button that is used to create/turn off the whiteboard. Displayed by default.
        },
        showRoomTimer: true,
        showLeavingView: true, // Whether to display the leaving view. Displayed by default.
        showLeaveRoomConfirmDialog: true, // When leaving the room, whether to display a confirmation pop-up window, the default is true 
        /*onJoinRoom: () => {
          
        },
        onLeaveRoom: () => {
          
          
        },*/
      });

      console.log("ZegoUIKitPrebuilt initialized");
    };

    initializeZegoUIKit();

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
