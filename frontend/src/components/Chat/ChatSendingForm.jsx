import React, { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/material";
import { AiOutlineSend, AiFillAudio } from "react-icons/ai";

import { useAuth } from "../../contexts/AuthContext";
import { createMessage } from "../../services/Api";

import "../../styles/ChatSendingForm.scss";

const ChatSendingForm = ({ chatId }) => {
  const audioRef = useRef(null);

  const {
    state: { user },
  } = useAuth();

  const [isRecording, setIsRecording] = useState(false);

  const messageSchema = Yup.object().shape({
    messageText: Yup.string()
      .min(1, "Le message est trop court!")
      .required("Un message est requis!"),
  });

  const handleRecordStart = async () => {
    setIsRecording(true);

    // Vérifie si le navigateur prend en charge l'API Web Audio
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        const chunks = [];

        mediaRecorder.addEventListener("dataavailable", (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        });

        mediaRecorder.addEventListener("stop", async () => {
          const blob = await new Blob(chunks, { type: "audio/wav" });

          // Mettre à jour le state avec l'URL de l'enregistrement audio

          await uploadAudioToServer(blob);
        });

        mediaRecorder.start();
        audioRef.current = mediaRecorder;
      } catch (error) {
        console.error("Error accessing microphone:", error);
        setIsRecording(false);
      }
    } else {
      console.error("Web Audio API not supported by the browser");
      setIsRecording(false);
    }
  };

  const handleRecordStop = async () => {
    setIsRecording(false);

    if (audioRef.current && audioRef.current.state === "recording") {
      await audioRef.current.stop();
    }
  };

  const uploadAudioToServer = async (blob) => {
    const formData = new FormData();
    const file = new File([blob], "audio.wav", {
      type: "audio/wav",
      lastModified: Date.now(),
    });
    formData.append("files", file, "audio.wav");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}${process.env.REACT_APP_STRAPI_UPLOAD_URL}`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: JSON.parse(window.localStorage.getItem("AUTH"))
              ?.token
              ? `Bearer ${
                  JSON.parse(window.localStorage.getItem("AUTH"))?.token
                }`
              : null,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const audioId = data[0].id; // Récupérez l'ID de l'enregistrement audio créé dans Strapi

        // Enregistrez l'ID de l'enregistrement audio dans le chat
        await createMessage({
          data: {
            messageText: "",
            sendDate: new Date().toISOString(),
            users_permissions_user: user.id,
            chat: parseInt(chatId),
            media: [audioId],
          },
        });
        // setAudioBlob(null);
      } else {
        console.error("Failed to upload audio:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading audio:", error);
    }
  };

  return (
    <Formik
      initialValues={{
        messageText: "",
      }}
      validationSchema={messageSchema}
      onSubmit={async (values, actions) => {
        createMessage({
          data: {
            messageText: values.messageText,
            sendDate: new Date().toISOString(),
            users_permissions_user: user.id,
            chat: parseInt(chatId),
          },
        });

        actions.resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {errors.messageText && touched.messageText && (
            <div style={{ color: "red" }}>{errors.messageText}</div>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              margin: 2,
            }}
          >
            <Field name="messageText" className="ChatEntryField" />
            <button className="ChatSendButton" type="submit">
              <AiOutlineSend color="white" />
            </button>
            {isRecording ? (
              <button
                className="ChatSendButton Recording"
                onMouseUp={handleRecordStop}
              >
                Stop Recording
              </button>
            ) : (
              <button
                className="ChatSendButton"
                type="button"
                onMouseDown={handleRecordStart}
              >
                <AiFillAudio color="white" />
              </button>
            )}
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ChatSendingForm;
