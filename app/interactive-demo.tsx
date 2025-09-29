
import { IconSymbol } from "@/components/IconSymbol";
import { Stack, router } from "expo-router";
import { Button } from "@/components/button";
import { commonStyles, colors } from "@/styles/commonStyles";
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text, Pressable, Animated } from "react-native";
import { soundManager } from "@/utils/soundManager";
import * as Haptics from "expo-haptics";

export default function InteractiveDemoScreen() {
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null);
  const [animationValue] = useState(new Animated.Value(0));

  useEffect(() => {
    // Initialize sound manager when component mounts
    soundManager.initialize();
    
    // Cleanup when component unmounts
    return () => {
      soundManager.cleanup();
    };
  }, []);

  const demos = [
    {
      id: "diffusion",
      title: "عرض الانتشار",
      description: "شاهد كيف تنتشر الجزيئات من التركيز العالي إلى المنخفض",
      example: "مثل انتشار قطرة الحبر في الماء",
      color: "#4CAF50",
      icon: "arrow.right.circle",
      soundType: "diffusion" as const,
      steps: [
        "ضع قطرة حبر في كأس ماء",
        "لاحظ انتشار اللون تدريجياً",
        "الجزيئات تتحرك من التركيز العالي للمنخفض",
        "لا تحتاج هذه العملية لطاقة خارجية"
      ]
    },
    {
      id: "osmosis",
      title: "عرض الخاصية الاسموزية",
      description: "تعلم كيف ينتقل الماء عبر الأغشية شبه النفاذة",
      example: "مثل وضع الخيار في الماء المالح",
      color: "#2196F3",
      icon: "drop.circle",
      soundType: "osmosis" as const,
      steps: [
        "ضع قطعة خيار في ماء مالح",
        "لاحظ انكماش الخيار بعد فترة",
        "الماء يخرج من الخيار للماء المالح",
        "هذا بسبب اختلاف التركيز"
      ]
    },
    {
      id: "active",
      title: "عرض النقل النشط",
      description: "اكتشف كيف تنقل الخلايا المواد ضد التدرج التركيزي",
      example: "مثل خياشيم الأسماك التي تزيل الملح",
      color: "#FF9800",
      icon: "bolt.circle",
      soundType: "active" as const,
      steps: [
        "الخلايا تستخدم الطاقة (ATP)",
        "تنقل المواد من التركيز المنخفض للعالي",
        "مثل إزالة الملح من جسم السمك",
        "عملية حيوية مهمة للحياة"
      ]
    }
  ];

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleDemoPress = async (demo: typeof demos[0]) => {
    try {
      // Play click sound first for immediate feedback
      await soundManager.playClickSound();
      
      // Play haptic feedback
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      
      // Toggle selection and start animation
      const isOpening = selectedDemo !== demo.id;
      setSelectedDemo(selectedDemo === demo.id ? null : demo.id);
      startAnimation();
      
      // Play transport sound when opening the dropdown
      if (isOpening) {
        // Small delay to let click sound finish
        setTimeout(async () => {
          await soundManager.playTransportSound(demo.soundType);
        }, 300);
      }
      
      console.log(`${isOpening ? 'Opened' : 'Closed'} demo: ${demo.title} with sound: ${demo.soundType}`);
    } catch (error) {
      console.log('Error handling demo press:', error);
      // Still allow the UI interaction even if sound fails
      setSelectedDemo(selectedDemo === demo.id ? null : demo.id);
      startAnimation();
    }
  };

  const renderDemo = (demo: typeof demos[0]) => {
    const isExpanded = selectedDemo === demo.id;
    const soundInfo = soundManager.getSoundInfo(demo.soundType);
    
    return (
      <View key={demo.id} style={[styles.demoCard, { borderColor: demo.color }]}>
        <Pressable
          onPress={() => handleDemoPress(demo)}
          style={styles.demoHeader}
        >
          <View style={[styles.demoIcon, { backgroundColor: demo.color }]}>
            <IconSymbol name={demo.icon as any} color="white" size={28} />
          </View>
          <View style={styles.demoInfo}>
            <Text style={styles.demoTitle}>{demo.title}</Text>
            <Text style={styles.demoDescription}>{demo.description}</Text>
            <Text style={styles.demoExample}>{demo.example}</Text>
            
            {/* Sound indicator */}
            <View style={styles.soundIndicator}>
              <IconSymbol name="speaker.wave.2" color={demo.color} size={16} />
              <Text style={[styles.soundText, { color: demo.color }]}>
                {isExpanded ? 'مع الصوت النشط' : 'مع الصوت التفاعلي'}
              </Text>
            </View>
          </View>
          <View style={styles.dropdownIndicator}>
            <IconSymbol 
              name={isExpanded ? "chevron.up" : "chevron.down"} 
              color="#1565C0" 
              size={24} 
            />
            <Text style={styles.dropdownText}>
              {isExpanded ? 'إغلاق' : 'فتح'}
            </Text>
          </View>
        </Pressable>

        {isExpanded && (
          <Animated.View 
            style={[
              styles.demoSteps,
              {
                opacity: animationValue,
                transform: [{
                  translateY: animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                  }),
                }],
              }
            ]}
          >
            {/* Sound Information Panel */}
            <View style={[styles.soundInfoPanel, { borderColor: demo.color }]}>
              <View style={styles.soundInfoHeader}>
                <IconSymbol name="waveform" color={demo.color} size={20} />
                <Text style={[styles.soundInfoTitle, { color: demo.color }]}>خصائص الصوت</Text>
              </View>
              <View style={styles.soundInfoGrid}>
                <Text style={styles.soundInfoItem}>التردد: {soundInfo.frequency}</Text>
                <Text style={styles.soundInfoItem}>المدة: {soundInfo.duration}</Text>
                <Text style={styles.soundInfoItem}>النمط: {soundInfo.pattern}</Text>
                <Text style={styles.soundInfoItem}>الوصف: {soundInfo.description}</Text>
              </View>
            </View>

            <Text style={styles.stepsTitle}>خطوات التجربة:</Text>
            {demo.steps.map((step, index) => (
              <View key={index} style={styles.stepItem}>
                <View style={[styles.stepNumber, { backgroundColor: demo.color }]}>
                  <Text style={styles.stepNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
            
            <View style={styles.animationContainer}>
              <Animated.View 
                style={[
                  styles.animatedParticle,
                  { backgroundColor: demo.color },
                  {
                    transform: [{
                      translateX: animationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 100],
                      }),
                    }],
                  }
                ]}
              />
              <Text style={styles.animationLabel}>محاكاة الحركة</Text>
            </View>

            {/* Enhanced Sound Control Panel */}
            <View style={styles.soundControlPanel}>
              <Text style={styles.soundControlTitle}>التحكم في الأصوات</Text>
              <View style={styles.soundButtons}>
                <Pressable
                  style={[styles.soundControlButton, { backgroundColor: demo.color }]}
                  onPress={async () => {
                    await soundManager.playClickSound();
                    setTimeout(() => soundManager.playTransportSound(demo.soundType), 200);
                  }}
                >
                  <IconSymbol name="play.circle" color="white" size={20} />
                  <Text style={styles.soundControlButtonText}>تشغيل</Text>
                </Pressable>
                <Pressable
                  style={[styles.soundControlButton, { backgroundColor: '#666' }]}
                  onPress={async () => {
                    await soundManager.playClickSound();
                    setTimeout(() => soundManager.stopAllSounds(), 100);
                  }}
                >
                  <IconSymbol name="stop.circle" color="white" size={20} />
                  <Text style={styles.soundControlButtonText}>إيقاف</Text>
                </Pressable>
              </View>
              
              {/* Click Sound Demo */}
              <View style={styles.clickSoundDemo}>
                <Text style={styles.clickSoundTitle}>تجربة صوت النقر:</Text>
                <Pressable
                  style={styles.clickDemoButton}
                  onPress={() => soundManager.playClickSound()}
                >
                  <IconSymbol name="hand.tap" color="#FF9800" size={18} />
                  <Text style={styles.clickDemoText}>اضغط لسماع صوت النقر</Text>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        )}
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "العرض التفاعلي",
          headerStyle: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
          },
          headerTintColor: '#1565C0',
          headerBackTitle: "رجوع",
        }}
      />
      
      <View style={styles.container}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.headerSection}>
            <Text style={styles.pageTitle}>التجارب التفاعلية</Text>
            <Text style={styles.pageDescription}>
              اكتشف طرق النقل عبر الغشاء البيلازمي من خلال التجارب العملية
            </Text>
            
            {/* Enhanced Sound Feature Highlight */}
            <View style={styles.soundFeatureHighlight}>
              <IconSymbol name="speaker.wave.3" color="#1565C0" size={24} />
              <Text style={styles.soundFeatureText}>تجارب تفاعلية مع أصوات نقر وأصوات تعليمية مميزة</Text>
            </View>
          </View>

          {/* Interactive Demos */}
          <View style={styles.demosSection}>
            {demos.map(renderDemo)}
          </View>

          {/* Enhanced Tips Section */}
          <View style={styles.tipsSection}>
            <Text style={styles.sectionTitle}>نصائح مهمة</Text>
            <View style={styles.tipCard}>
              <IconSymbol name="lightbulb" color="#FFA726" size={24} />
              <Text style={styles.tipText}>
                جرب هذه التجارب في المنزل تحت إشراف الكبار لفهم أفضل
              </Text>
            </View>
            <View style={styles.tipCard}>
              <IconSymbol name="exclamationmark.triangle" color="#EF5350" size={24} />
              <Text style={styles.tipText}>
                تذكر أن النقل النشط يحتاج طاقة بينما الانتشار والاسموزية لا يحتاجان
              </Text>
            </View>
            <View style={styles.tipCard}>
              <IconSymbol name="speaker.wave.2" color="#4CAF50" size={24} />
              <Text style={styles.tipText}>
                استمع للأصوات المختلفة: صوت النقر عند الضغط وصوت طريقة النقل عند الفتح
              </Text>
            </View>
            <View style={styles.tipCard}>
              <IconSymbol name="hand.tap" color="#FF9800" size={24} />
              <Text style={styles.tipText}>
                كل ضغطة تبدأ بصوت نقر سريع متبوعاً بالصوت التعليمي المناسب
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsSection}>
            <Button
              variant="primary"
              onPress={async () => {
                await soundManager.playClickSound();
                setTimeout(() => router.push("/quiz"), 200);
              }}
              style={styles.actionButton}
            >
              اختبر معلوماتك
            </Button>
            <Button
              variant="outline"
              onPress={async () => {
                await soundManager.playClickSound();
                setTimeout(() => router.back(), 200);
              }}
              style={styles.actionButton}
            >
              العودة للرئيسية
            </Button>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 20,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1565C0',
    textAlign: 'center',
    marginBottom: 12,
    writingDirection: 'rtl',
  },
  pageDescription: {
    fontSize: 16,
    color: '#424242',
    textAlign: 'center',
    lineHeight: 24,
    writingDirection: 'rtl',
    marginBottom: 16,
  },
  soundFeatureHighlight: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(21, 101, 192, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(21, 101, 192, 0.3)',
  },
  soundFeatureText: {
    fontSize: 15,
    color: '#1565C0',
    marginLeft: 12,
    fontWeight: '600',
    writingDirection: 'rtl',
    flex: 1,
  },
  demosSection: {
    marginBottom: 24,
  },
  demoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 2,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 6,
    overflow: 'hidden',
  },
  demoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  demoIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  demoInfo: {
    flex: 1,
  },
  demoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 6,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  demoDescription: {
    fontSize: 15,
    color: '#424242',
    marginBottom: 4,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  demoExample: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 8,
  },
  soundIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  soundText: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '500',
    writingDirection: 'rtl',
  },
  dropdownIndicator: {
    alignItems: 'center',
    marginLeft: 8,
  },
  dropdownText: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
    writingDirection: 'rtl',
  },
  demoSteps: {
    padding: 20,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  soundInfoPanel: {
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  soundInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'flex-end',
  },
  soundInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    writingDirection: 'rtl',
  },
  soundInfoGrid: {
    gap: 6,
  },
  soundInfoItem: {
    fontSize: 14,
    color: '#424242',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 16,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#424242',
    lineHeight: 22,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  animationContainer: {
    alignItems: 'center',
    marginTop: 20,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
    marginBottom: 16,
  },
  animatedParticle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginBottom: 8,
  },
  animationLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  soundControlPanel: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  soundControlTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0',
    textAlign: 'center',
    marginBottom: 12,
    writingDirection: 'rtl',
  },
  soundButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  soundControlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
    elevation: 3,
    flex: 1,
    justifyContent: 'center',
  },
  soundControlButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
    writingDirection: 'rtl',
  },
  clickSoundDemo: {
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 152, 0, 0.3)',
  },
  clickSoundTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9800',
    textAlign: 'center',
    marginBottom: 8,
    writingDirection: 'rtl',
  },
  clickDemoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  clickDemoText: {
    fontSize: 13,
    color: '#FF9800',
    marginLeft: 6,
    fontWeight: '500',
    writingDirection: 'rtl',
  },
  tipsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 16,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    color: '#424242',
    marginLeft: 12,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  actionsSection: {
    gap: 12,
    marginTop: 20,
  },
  actionButton: {
    width: '100%',
  },
});
