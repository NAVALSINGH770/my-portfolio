/* ==========================================================================
   NOVA OS // SYNTHETIC SOUND ENGINE (WEB AUDIO API)
   Generates lightweight, futuristic audio cues without external audio files.
   Includes global mute toggle and state persistence.
   ========================================================================== */

class NovaSoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = localStorage.getItem('nova_sound_muted') === 'true';
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
        this.initialized = true;
      }
    } catch (e) {
      console.warn('Web Audio API not supported in this environment.');
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('nova_sound_muted', this.isMuted);
    return this.isMuted;
  }

  playBeep(freq = 800, duration = 0.05, type = 'sine', volume = 0.08) {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx || this.audioCtx.state === 'suspended') return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(volume, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // Audio playback safety catch
    }
  }

  // Futuristic UI Interactions
  hover() {
    this.playBeep(1200, 0.04, 'sine', 0.03);
  }

  click() {
    this.playBeep(880, 0.07, 'triangle', 0.07);
    setTimeout(() => this.playBeep(1320, 0.08, 'sine', 0.06), 40);
  }

  bootChirp() {
    this.playBeep(440, 0.1, 'sine', 0.05);
    setTimeout(() => this.playBeep(660, 0.1, 'sine', 0.06), 100);
    setTimeout(() => this.playBeep(990, 0.15, 'sine', 0.08), 200);
  }

  transmit() {
    this.playBeep(520, 0.12, 'sawtooth', 0.05);
    setTimeout(() => this.playBeep(780, 0.15, 'triangle', 0.07), 80);
    setTimeout(() => this.playBeep(1170, 0.22, 'sine', 0.08), 160);
  }
}

// Global sound singleton
window.novaSound = new NovaSoundEngine();
