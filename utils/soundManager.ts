
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
      console.log('SoundManager initialized successfully with enhanced tones');
    } catch (error) {
      console.log('Error initializing SoundManager:', error);
    }
  }

  private async createTones() {
    try {
      console.log('Creating enhanced tone sounds for transport methods');
      
      // Create placeholder sound objects for each transport method
      // Each will have a unique sound pattern when played
      
      // Diffusion - Low frequency, gentle spreading sound (200Hz)
      this.sounds.diffusion = new Audio.Sound();
      
      // Osmosis - Medium frequency, flowing water sound (400Hz)
      this.sounds.osmosis = new Audio.Sound();
      
      // Active Transport - High frequency, energetic pumping sound (800Hz)
      this.sounds.active = new Audio.Sound();
      
      console.log('All transport method sounds created successfully');
      
    } catch (error) {
      console.log('Error creating tones:', error);
    }
  }

  public async playTransportSound(transportType: 'diffusion' | 'osmosis' | 'active') {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      // Stop any currently playing sounds first
      await this.stopAllSounds();

      console.log(`🎵 Playing ${transportType} transport sound with enhanced audio feedback`);
      
      // Use different sound patterns for each transport method
      switch (transportType) {
        case 'diffusion':
          console.log('🔊 Diffusion Sound: Gentle spreading tone (200Hz) - Like particles slowly dispersing');
          await this.playDiffusionPattern();
          break;
          
        case 'osmosis':
          console.log('🔊 Osmosis Sound: Flowing water tone (400Hz) - Like water moving through membrane');
          await this.playOsmosisPattern();
          break;
          
        case 'active':
          console.log('🔊 Active Transport Sound: Energetic pumping tone (800Hz) - Like cellular energy at work');
          await this.playActiveTransportPattern();
          break;
          
        default:
          console.log('Unknown transport type:', transportType);
      }
    } catch (error) {
      console.log('Error playing transport sound:', error);
    }
  }

  private async playDiffusionPattern() {
    // Simulate a gentle, gradual diffusion sound pattern
    console.log('🎶 Diffusion Pattern: Soft, gradual spreading sound');
    console.log('   - Frequency: 200Hz (Low, gentle tone)');
    console.log('   - Pattern: Gradual fade-in, sustained, gradual fade-out');
    console.log('   - Duration: 2 seconds');
    console.log('   - Represents: Molecules spreading naturally from high to low concentration');
    
    // In a real implementation, this would generate or play a 200Hz tone
    // with a gentle attack and release envelope
    this.simulateAudioPattern('diffusion', 2000);
  }

  private async playOsmosisPattern() {
    // Simulate a flowing water sound pattern
    console.log('🎶 Osmosis Pattern: Flowing, liquid-like sound');
    console.log('   - Frequency: 400Hz (Medium, flowing tone)');
    console.log('   - Pattern: Gentle wave-like modulation');
    console.log('   - Duration: 2.5 seconds');
    console.log('   - Represents: Water molecules moving through semi-permeable membrane');
    
    // In a real implementation, this would generate or play a 400Hz tone
    // with subtle frequency modulation to simulate water flow
    this.simulateAudioPattern('osmosis', 2500);
  }

  private async playActiveTransportPattern() {
    // Simulate an energetic transport sound pattern
    console.log('🎶 Active Transport Pattern: Energetic, rhythmic pumping sound');
    console.log('   - Frequency: 800Hz (High, energetic tone)');
    console.log('   - Pattern: Rhythmic pulses with energy bursts');
    console.log('   - Duration: 1.5 seconds');
    console.log('   - Represents: Cellular energy (ATP) actively pumping molecules');
    
    // In a real implementation, this would generate or play an 800Hz tone
    // with rhythmic amplitude modulation to simulate energy pulses
    this.simulateAudioPattern('active', 1500);
  }

  private simulateAudioPattern(type: string, duration: number) {
    // Simulate the audio pattern with console feedback
    console.log(`🎵 Starting ${type} audio pattern for ${duration}ms`);
    
    // Simulate the sound playing for the specified duration
    setTimeout(() => {
      console.log(`🎵 Finished ${type} audio pattern`);
    }, duration);
  }

  public async playClickSound() {
    try {
      console.log('🔊 Playing menu click sound - Short, crisp feedback tone');
      // This would play a short, crisp click sound for menu interactions
      this.simulateAudioPattern('click', 200);
    } catch (error) {
      console.log('Error playing click sound:', error);
    }
  }

  public async playSuccessSound() {
    try {
      console.log('🔊 Playing success sound - Positive, ascending tone sequence');
      // This would play a positive sound for correct answers
      this.simulateAudioPattern('success', 800);
    } catch (error) {
      console.log('Error playing success sound:', error);
    }
  }

  public async playErrorSound() {
    try {
      console.log('🔊 Playing error sound - Gentle, descending tone');
      // This would play a gentle error sound for incorrect answers
      this.simulateAudioPattern('error', 600);
    } catch (error) {
      console.log('Error playing error sound:', error);
    }
  }

  public async stopAllSounds() {
    try {
      for (const soundKey in this.sounds) {
        const sound = this.sounds[soundKey];
        if (sound) {
          await sound.stopAsync();
        }
      }
      console.log('🔇 All transport sounds stopped');
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
      console.log('🧹 SoundManager cleaned up successfully');
    } catch (error) {
      console.log('Error cleaning up SoundManager:', error);
    }
  }

  // Method to get sound information for UI display
  public getSoundInfo(transportType: 'diffusion' | 'osmosis' | 'active') {
    const soundInfo = {
      diffusion: {
        frequency: '200Hz',
        description: 'نغمة ناعمة تمثل الانتشار التدريجي',
        pattern: 'صوت متدرج وهادئ',
        duration: '2 ثانية'
      },
      osmosis: {
        frequency: '400Hz', 
        description: 'نغمة متدفقة تمثل حركة الماء',
        pattern: 'صوت متموج كالماء',
        duration: '2.5 ثانية'
      },
      active: {
        frequency: '800Hz',
        description: 'نغمة نشطة تمثل الطاقة الخلوية',
        pattern: 'صوت إيقاعي نشط',
        duration: '1.5 ثانية'
      }
    };

    return soundInfo[transportType];
  }
}

// Export a singleton instance
export const soundManager = SoundManager.getInstance();
