// StreamHandler.js
class StreamHandler {
  constructor() {
    this.stream = null;
  }

  async start() {
    const constraints = {
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
      },
    };

    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      return this.stream;
    } catch (err) {
      console.error('Error accessing camera:', err);
      throw err;
    }
  }

  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  }

  destroy() {
    this.stop();
  }
}

export default StreamHandler;
