import React, { useState, useRef, useEffect } from 'react';
import '../styles/voiceRecorder.css';

interface VoiceRecorderProps {
  onSaveRecording: (audioBlob: Blob | null) => void;
  existingRecording: Blob | null;
}

/**
 * Voice Recorder Component
 * Handles microphone recording with start, pause, stop controls
 * Provides playback functionality for recorded audio
 */
function VoiceRecorder({ onSaveRecording, existingRecording }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(existingRecording || null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  // Check for existing recording
  useEffect(() => {
    if (existingRecording) {
      setAudioBlob(existingRecording);
    }
  }, [existingRecording]);

  /**
   * Request microphone permission
   */
  const requestMicrophonePermission = async (): Promise<MediaStream | null> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermissionGranted(true);
      return stream;
    } catch (error) {
      alert('Microphone permission denied. Please allow microphone access to record.');
      return null;
    }
  };

  /**
   * Start recording
   */
  const startRecording = async () => {
    const stream = await requestMicrophonePermission();
    if (!stream) return;

    audioChunksRef.current = [];
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      setAudioBlob(blob);
      onSaveRecording(blob);
      
      // Stop all tracks to release microphone
      stream.getTracks().forEach(track => track.stop());
    };

    mediaRecorder.start();
    setIsRecording(true);
    setIsPaused(false);
    setRecordingTime(0);

    // Start timer
    timerRef.current = window.setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  /**
   * Pause recording
   */
  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  /**
   * Resume recording
   */
  const resumeRecording = () => {
    if (mediaRecorderRef.current && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      
      // Resume timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  /**
   * Stop recording
   */
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  /**
   * Delete recording
   */
  const deleteRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
    onSaveRecording(null);
  };

  /**
   * Format time in MM:SS
   */
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="voice-recorder">
      <div className="recorder-card">
        {!audioBlob ? (
          <>
            <div className="recorder-status">
              {isRecording ? (
                <>
                  <div className={`recording-indicator ${isPaused ? 'paused' : 'active'}`}>
                    {isPaused ? '⏸️' : '🔴'}
                  </div>
                  <span className="recording-time">{formatTime(recordingTime)}</span>
                  <span className="recording-label">
                    {isPaused ? 'Paused' : 'Recording...'}
                  </span>
                </>
              ) : (
                <>
                  <div className="mic-icon">🎤</div>
                  <span className="ready-label">Ready to record your answer</span>
                </>
              )}
            </div>

            <div className="recorder-controls">
              {!isRecording ? (
                <button onClick={startRecording} className="btn-record">
                  Start Recording
                </button>
              ) : (
                <>
                  {!isPaused ? (
                    <button onClick={pauseRecording} className="btn-pause">
                      Pause
                    </button>
                  ) : (
                    <button onClick={resumeRecording} className="btn-resume">
                      Resume
                    </button>
                  )}
                  <button onClick={stopRecording} className="btn-stop">
                    Stop & Save
                  </button>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="playback-section">
              <div className="playback-header">
                <span className="playback-icon">✅</span>
                <span className="playback-label">Answer Recorded</span>
              </div>
              
              <audio 
                controls 
                src={URL.createObjectURL(audioBlob)}
                className="audio-player-main"
              />

              <div className="playback-actions">
                <button onClick={deleteRecording} className="btn-delete">
                  🗑️ Delete & Re-record
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VoiceRecorder;
