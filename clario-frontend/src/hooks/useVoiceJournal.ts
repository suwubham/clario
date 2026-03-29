import { useState, useRef, useEffect, useCallback } from "react";
import { MediaHandler, GeminiClient } from "../lib/gemini";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

export function useVoiceJournal() {
  const { session } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const mediaHandlerRef = useRef<MediaHandler | null>(null);
  const geminiClientRef = useRef<GeminiClient | null>(null);

  // Initialize once
  useEffect(() => {
    mediaHandlerRef.current = new MediaHandler();
    geminiClientRef.current = new GeminiClient({
      onOpen: () => {
        setIsConnected(true);
        geminiClientRef.current?.sendConfig({
          testProfile: "debug-agent-metadata-001",
          clientBuild: "voice-journal",
        });
        geminiClientRef.current?.sendText(
          `System: Start by greeting the user in english with whats up brother i know you are fuckedup but don't overthink im here for your mentel peace.`
        );
      },
      onMessage: (event) => {
        if (typeof event.data === "string") {
          try {
            const msg = JSON.parse(event.data);
            if (msg.type === "interrupted") {
              mediaHandlerRef.current?.stopAudioPlayback();
            }
          } catch (e) {
            console.error("Parse error:", e);
          }
        } else {
          // It's binary audio data sent from Gemini
          mediaHandlerRef.current?.playAudio(event.data);
        }
      },
      onClose: () => {
        setIsConnected(false);
        setIsRecording(false);
      },
      onError: () => {
        toast.error("Connection failed. Are the backend services running?");
        setIsConnected(false);
        setIsRecording(false);
      },
    });

    return () => {
      geminiClientRef.current?.disconnect();
      mediaHandlerRef.current?.stopAudio();
    };
  }, []);

  const startSession = useCallback(async () => {
    if (!mediaHandlerRef.current || !geminiClientRef.current) return;

    try {
      await mediaHandlerRef.current.initializeAudio();
      const token = session?.access_token;
      geminiClientRef.current.connect(token);
      
      await mediaHandlerRef.current.startAudio((data) => {
        if (geminiClientRef.current?.isConnected()) {
          geminiClientRef.current.send(data);
        }
      });
      setIsRecording(true);
    } catch (e) {
      toast.error("Could not access microphone.");
      setIsRecording(false);
    }
  }, []);

  const endSession = useCallback(() => {
    if (mediaHandlerRef.current) {
      mediaHandlerRef.current.stopAudio();
      mediaHandlerRef.current.stopAudioPlayback();
    }
    if (geminiClientRef.current) {
      geminiClientRef.current.disconnect();
    }
    setIsRecording(false);
    setIsConnected(false);
  }, []);

  return {
    isRecording,
    isConnected,
    startSession,
    endSession,
  };
}