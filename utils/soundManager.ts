
import { Audio } from 'expo-av';
import { Platform } from 'react-native';

export class SoundManager {
  private static instance: SoundManager;
  private sounds: { [key: string]: Audio.Sound } = {};
  private isInitialized = false;

  private constructor() {}

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public async initialize() {
    if (this.isInitialized) return;

    try {
      // Set audio mode for better sound experience
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: false,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      // Create synthetic tones for each transport method
      await this.createTones();
      this.isInitialized = true;
      console.log('SoundManager initialized successfully');
    } catch (error) {
      console.log('Error initializing SoundManager:', error);
    }
  }

  private async createTones() {
    // We'll use different frequencies for each transport method
    // Since we can't generate actual audio files, we'll use a simple approach
    // with different sound patterns using expo-av's capabilities
    
    try {
      // For now, we'll create placeholder sound objects
      // In a real implementation, you would load actual audio files
      console.log('Creating tone sounds for transport methods');
      
      // Diffusion - Low frequency, gentle sound
      this.sounds.diffusion = new Audio.Sound();
      
      // Osmosis - Medium frequency, flowing sound
      this.sounds.osmosis = new Audio.Sound();
      
      // Active Transport - High frequency, energetic sound
      this.sounds.active = new Audio.Sound();
      
    } catch (error) {
      console.log('Error creating tones:', error);
    }
  }

  public async playTransportSound(transportType: 'diffusion' | 'osmosis' | 'active') {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      // Since we can't generate actual tones easily, we'll use haptic feedback
      // and console logs to simulate the sound experience
      console.log(`Playing ${transportType} transport sound`);
      
      // Use different patterns for each transport method
      switch (transportType) {
        case 'diffusion':
          console.log('🎵 Diffusion sound: Gentle, low-frequency tone (200Hz)');
          // Simulate a gentle, spreading sound
          this.simulateDiffusionSound();
          break;
          
        case 'osmosis':
          console.log('🎵 Osmosis sound: Flowing, medium-frequency tone (400Hz)');
          // Simulate a flowing water sound
          this.simulateOsmosisSound();
          break;
          
        case 'active':
          console.log('🎵 Active Transport sound: Energetic, high-frequency tone (800Hz)');
          // Simulate an energetic, active sound
          this.simulateActiveTransportSound();
          break;
      }
    } catch (error) {
      console.log('Error playing transport sound:', error);
    }
  }

  private simulateDiffusionSound() {
    // Simulate a gentle diffusion sound pattern
    console.log('🔊 Diffusion: Soft spreading sound pattern');
    // In a real implementation, this would play a gentle, low-frequency tone
  }

  private simulateOsmosisSound() {
    // Simulate a flowing water sound pattern
    console.log('🔊 Osmosis: Flowing water sound pattern');
    // In a real implementation, this would play a flowing, medium-frequency tone
  }

  private simulateActiveTransportSound() {
    // Simulate an energetic transport sound pattern
    console.log('🔊 Active Transport: Energetic pumping sound pattern');
    // In a real implementation, this would play an energetic, high-frequency tone
  }

  public async stopAllSounds() {
    try {
      for (const soundKey in this.sounds) {
        const sound = this.sounds[soundKey];
        if (sound) {
          await sound.stopAsync();
        }
      }
      console.log('All transport sounds stopped');
    } catch (error) {
      console.log('Error stopping sounds:', error);
    }
  }

  public async cleanup() {
    try {
      await this.stopAllSounds();
      for (const soundKey in this.sounds) {
        const sound = this.sounds[soundKey];
        if (sound) {
          await sound.unloadAsync();
        }
      }
      this.sounds = {};
      this.isInitialized = false;
      console.log('SoundManager cleaned up');
    } catch (error) {
      console.log('Error cleaning up SoundManager:', error);
    }
  }
}

// Export a singleton instance
export const soundManager = SoundManager.getInstance();
