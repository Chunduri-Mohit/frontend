// src/components/DemoSection.tsx
import { useState, useRef } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import { API_URL } from "@/config"; // Use Render backend

type DetectionResults = {
  image: string;
  counts: Record<string, number>;
  detections: {
    class: string;
    confidence: number;
    bbox: number[];
  }[];
};

const DemoSection = () => {
  const [results, setResults] = useState<DetectionResults | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [captureEnabled, setCaptureEnabled] = useState(false);
  const [isLiveDetection, setIsLiveDetection] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // -------- File upload --------
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setResults(null);
    setError(null);
    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/predict`, {  // ✅ Render backend URL
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) setResults(data);
      else setError(data.error || "Failed to fetch results");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch results. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  // -------- Camera logic --------
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStream(stream);
      setIsCameraActive(true);
      setResults(null);
      setError(null);
      setCaptureEnabled(false);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => setCaptureEnabled(true);
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert("Unable to access camera. Check permissions.");
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "camera.jpg", { type: "image/jpeg" });
      uploadFile(file);
    }, "image/jpeg");

    stopCamera();
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
    }
    setCameraStream(null);
    setIsCameraActive(false);
    setIsLiveDetection(false);
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
    setResults(null);
  };

  // -------- Live Detection --------
  const startLiveDetection = async () => {
    if (!videoRef.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      setCameraStream(stream);
      setIsCameraActive(true);
      setCaptureEnabled(true);
      setIsLiveDetection(true);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      detectionIntervalRef.current = setInterval(() => {
        if (!videoRef.current || videoRef.current.paused || videoRef.current.ended || !isLiveDetection) return;

        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], "live.jpg", { type: "image/jpeg" });
          await uploadFile(file);
        }, "image/jpeg");
      }, 1000);
    } catch (err) {
      console.error("Live detection error:", err);
      alert("Unable to start live detection. Check camera permissions.");
    }
  };

  return (
    <section id="demo" className="relative py-20 px-6 w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Particle Background */}
      <AnimatedBackground />

      <div className="container mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          AI Detection Demo
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Upload an image or use the camera to run YOLO detection.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="group relative px-8 py-4 text-lg font-semibold bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105 border border-neon-blue/50"
          >
            Upload Image
          </button>
          <button
            onClick={startCamera}
            className="group relative px-8 py-4 text-lg font-semibold bg-gradient-to-r from-neon-purple to-neon-blue hover:shadow-glow-purple transition-all duration-300 hover:scale-105 border border-neon-purple/50"
          >
            Open Camera
          </button>
          {!isLiveDetection ? (
            <button
              onClick={startLiveDetection}
              className="group relative px-8 py-4 text-lg font-semibold bg-gradient-to-r from-neon-green to-neon-blue hover:shadow-glow-green transition-all duration-300 hover:scale-105 border border-neon-green/50"
            >
              Start Live Detection
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="px-8 py-4 text-lg font-semibold bg-red-500 hover:shadow-glow transition-all duration-300 hover:scale-105 border border-red-700"
            >
              Stop Live Detection
            </button>
          )}
        </div>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />

        {/* Camera Preview */}
        {isCameraActive && (
          <div className="mb-6 text-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="max-w-md mx-auto rounded-lg border border-neon-blue/30 shadow-glow mb-4"
            />

            {!isLiveDetection && (
              <button
                disabled={!captureEnabled}
                onClick={capturePhoto}
                className="px-6 py-2 bg-neon-green hover:shadow-glow-green transition-all duration-300 hover:scale-105 disabled:opacity-50"
              >
                Capture Photo
              </button>
            )}
            {!captureEnabled && <p className="text-sm text-muted-foreground mt-2">Camera is loading...</p>}
          </div>
        )}

        {/* Error */}
        {error && <p className="text-red-500 text-center mb-6">{error}</p>}

        {/* Detection Results */}
        {results && (
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative">
              <img
                src={`data:image/jpeg;base64,${results.image}`}
                alt="Detection Output"
                className="w-full rounded-xl border border-neon-blue/30 shadow-card"
              />
              <div className="absolute top-4 left-4 bg-space-surface/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm text-neon-green border border-neon-green/30">
                ✓ Detection Complete
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Detection Summary</h3>
              <div className="space-y-4">
                {Object.entries(results.counts).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-4 bg-space-surface rounded-lg border border-border hover:border-neon-blue/30 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          key === "helmet"
                            ? "bg-neon-green shadow-glow-green"
                            : key === "tool"
                            ? "bg-neon-blue shadow-glow"
                            : "bg-destructive shadow-destructive"
                        }`}
                      />
                      <span className="capitalize font-medium text-foreground">{key} Detected</span>
                    </div>
                    <span className="text-2xl font-bold text-primary">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </section>
  );
};

export default DemoSection;
