
import { IconSymbol } from "@/components/IconSymbol";
import { Stack, router } from "expo-router";
import { Button } from "@/components/button";
import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { soundManager } from "@/utils/soundManager";
import * as Haptics from "expo-haptics";

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Initialize sound manager when component mounts
    soundManager.initialize();
    
    // Cleanup when component unmounts
    return () => {
      soundManager.cleanup();
    };
  }, []);

  const questions = [
    {
      id: 1,
      question: "أي من طرق النقل التالية لا تحتاج إلى طاقة؟",
      options: [
        "النقل النشط",
        "الانتشار",
        "النقل بالحويصلات",
        "الضخ الأيوني"
      ],
      correctAnswer: 1,
      explanation: "الانتشار هو عملية طبيعية لا تحتاج إلى طاقة، حيث تنتقل المواد من التركيز العالي إلى المنخفض",
      soundType: "diffusion" as const
    },
    {
      id: 2,
      question: "ما هي الخاصية الاسموزية؟",
      options: [
        "انتقال جميع المواد عبر الغشاء",
        "انتقال الماء عبر الغشاء شبه النفاذ",
        "انتقال البروتينات فقط",
        "انتقال الأملاح بالطاقة"
      ],
      correctAnswer: 1,
      explanation: "الخاصية الاسموزية هي انتقال الماء عبر الغشاء شبه النفاذ من التركيز المنخفض إلى العالي",
      soundType: "osmosis" as const
    },
    {
      id: 3,
      question: "متى تستخدم الخلية النقل النشط؟",
      options: [
        "عندما تريد توفير الطاقة",
        "عند نقل المواد مع التدرج التركيزي",
        "عند نقل المواد ضد التدرج التركيزي",
        "عند نقل الماء فقط"
      ],
      correctAnswer: 2,
      explanation: "النقل النشط يستخدم عندما تحتاج الخلية لنقل المواد ضد التدرج التركيزي، مما يتطلب طاقة",
      soundType: "active" as const
    },
    {
      id: 4,
      question: "أي مثال يوضح الانتشار؟",
      options: [
        "انكماش الخيار في الماء المالح",
        "ضخ الصوديوم في خياشيم السمك",
        "انتشار رائحة العطر في الغرفة",
        "امتصاص الجذور للماء"
      ],
      correctAnswer: 2,
      explanation: "انتشار رائحة العطر في الغرفة مثال واضح على الانتشار، حيث تنتقل جزيئات العطر من التركيز العالي إلى المنخفض",
      soundType: "diffusion" as const
    },
    {
      id: 5,
      question: "ما الذي يحدث للخيار في الماء المالح؟",
      options: [
        "ينتفخ بسبب دخول الماء",
        "ينكمش بسبب خروج الماء",
        "لا يتغير شكله",
        "يذوب في الماء"
      ],
      correctAnswer: 1,
      explanation: "الخيار ينكمش في الماء المالح بسبب الخاصية الاسموزية، حيث يخرج الماء من الخيار إلى الماء المالح",
      soundType: "osmosis" as const
    }
  ];

  const handleAnswerSelect = async (answerIndex: number) => {
    try {
      // Play click sound first
      await soundManager.playClickSound();
      
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers[currentQuestion] = answerIndex;
      setSelectedAnswers(newSelectedAnswers);

      // Play haptic feedback
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      // Check if answer is correct and play appropriate sound
      const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
      
      // Delay to let click sound finish
      setTimeout(async () => {
        if (isCorrect) {
          // Play success sound first, then transport method sound
          await soundManager.playSuccessSound();
          setTimeout(async () => {
            await soundManager.playTransportSound(questions[currentQuestion].soundType);
          }, 400);
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          console.log('Correct answer! Playing success + transport sound:', questions[currentQuestion].soundType);
        } else {
          // Play error sound for incorrect answer
          await soundManager.playErrorSound();
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          console.log('Incorrect answer selected');
        }
      }, 200);
    } catch (error) {
      console.log('Error handling answer selection:', error);
      // Still update the UI even if sound fails
      const newSelectedAnswers = [...selectedAnswers];
      newSelectedAnswers[currentQuestion] = answerIndex;
      setSelectedAnswers(newSelectedAnswers);
    }
  };

  const handleNext = async () => {
    await soundManager.playClickSound();
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }, 200);
  };

  const handlePrevious = async () => {
    await soundManager.playClickSound();
    setTimeout(() => {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
      }
    }, 200);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = async () => {
    await soundManager.playClickSound();
    setTimeout(() => {
      setCurrentQuestion(0);
      setSelectedAnswers([]);
      setShowResults(false);
    }, 200);
  };

  const getScoreColor = () => {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "#4CAF50";
    if (percentage >= 60) return "#FF9800";
    return "#F44336";
  };

  const getScoreMessage = () => {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "ممتاز! لديك فهم جيد لطرق النقل";
    if (percentage >= 60) return "جيد! يمكنك تحسين معلوماتك أكثر";
    return "تحتاج لمراجعة المادة مرة أخرى";
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <>
        <Stack.Screen
          options={{
            title: "نتائج الاختبار",
            headerStyle: {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
            },
            headerTintColor: '#1565C0',
          }}
        />
        
        <View style={styles.container}>
          <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.resultsContainer}>
              <Text style={styles.resultsTitle}>نتائج الاختبار</Text>
              
              <View style={[styles.scoreCard, { borderColor: getScoreColor() }]}>
                <Text style={[styles.scoreText, { color: getScoreColor() }]}>
                  {score} من {questions.length}
                </Text>
                <Text style={styles.percentageText}>
                  {Math.round((score / questions.length) * 100)}%
                </Text>
                <Text style={[styles.scoreMessage, { color: getScoreColor() }]}>
                  {getScoreMessage()}
                </Text>
              </View>

              {/* Enhanced Sound Feature Info */}
              <View style={styles.soundFeatureInfo}>
                <IconSymbol name="speaker.wave.3" color="#1565C0" size={24} />
                <Text style={styles.soundFeatureText}>
                  لاحظت الأصوات المختلفة؟ نقر + نجاح/خطأ + صوت طريقة النقل للإجابات الصحيحة
                </Text>
              </View>

              {/* Sound Legend */}
              <View style={styles.soundLegend}>
                <Text style={styles.soundLegendTitle}>دليل الأصوات المستخدمة:</Text>
                <View style={styles.soundLegendItem}>
                  <IconSymbol name="hand.tap" color="#FF9800" size={16} />
                  <Text style={styles.soundLegendText}>صوت النقر: عند اختيار الإجابة</Text>
                </View>
                <View style={styles.soundLegendItem}>
                  <IconSymbol name="checkmark.circle" color="#4CAF50" size={16} />
                  <Text style={styles.soundLegendText}>صوت النجاح: للإجابة الصحيحة</Text>
                </View>
                <View style={styles.soundLegendItem}>
                  <IconSymbol name="xmark.circle" color="#F44336" size={16} />
                  <Text style={styles.soundLegendText}>صوت الخطأ: للإجابة الخاطئة</Text>
                </View>
                <View style={styles.soundLegendItem}>
                  <IconSymbol name="waveform" color="#1565C0" size={16} />
                  <Text style={styles.soundLegendText}>صوت طريقة النقل: للإجابات الصحيحة</Text>
                </View>
              </View>

              {/* Detailed Results */}
              <View style={styles.detailedResults}>
                <Text style={styles.detailedTitle}>تفاصيل الإجابات</Text>
                {questions.map((question, index) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <View key={question.id} style={styles.resultItem}>
                      <View style={styles.resultHeader}>
                        <Text style={styles.questionNumber}>السؤال {index + 1}</Text>
                        <View style={[
                          styles.resultStatus,
                          { backgroundColor: isCorrect ? "#4CAF50" : "#F44336" }
                        ]}>
                          <IconSymbol 
                            name={isCorrect ? "checkmark" : "xmark"} 
                            color="white" 
                            size={16} 
                          />
                        </View>
                      </View>
                      <Text style={styles.resultQuestion}>{question.question}</Text>
                      <Text style={styles.resultExplanation}>{question.explanation}</Text>
                      
                      {/* Enhanced Sound replay buttons */}
                      <View style={styles.soundReplaySection}>
                        {isCorrect && (
                          <Pressable
                            style={styles.soundReplayButton}
                            onPress={async () => {
                              await soundManager.playClickSound();
                              setTimeout(async () => {
                                await soundManager.playSuccessSound();
                                setTimeout(() => soundManager.playTransportSound(question.soundType), 400);
                              }, 200);
                            }}
                          >
                            <IconSymbol name="speaker.wave.2" color="#4CAF50" size={16} />
                            <Text style={styles.soundReplayText}>إعادة تشغيل أصوات الإجابة الصحيحة</Text>
                          </Pressable>
                        )}
                        <Pressable
                          style={[styles.soundReplayButton, { backgroundColor: 'rgba(255, 152, 0, 0.1)' }]}
                          onPress={() => soundManager.playClickSound()}
                        >
                          <IconSymbol name="hand.tap" color="#FF9800" size={16} />
                          <Text style={[styles.soundReplayText, { color: '#FF9800' }]}>تجربة صوت النقر</Text>
                        </Pressable>
                      </View>
                    </View>
                  );
                })}
              </View>

              <View style={styles.actionsSection}>
                <Button
                  variant="primary"
                  onPress={resetQuiz}
                  style={styles.actionButton}
                >
                  إعادة الاختبار
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
            </View>
          </ScrollView>
        </View>
      </>
    );
  }

  const currentQ = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  return (
    <>
      <Stack.Screen
        options={{
          title: `السؤال ${currentQuestion + 1} من ${questions.length}`,
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
          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {currentQuestion + 1} من {questions.length}
            </Text>
          </View>

          {/* Enhanced Sound Feature Reminder */}
          <View style={styles.soundReminder}>
            <IconSymbol name="speaker.wave.2" color="#4CAF50" size={20} />
            <Text style={styles.soundReminderText}>
              ستسمع: نقر → نجاح/خطأ → صوت طريقة النقل (للإجابات الصحيحة)
            </Text>
          </View>

          {/* Question Card */}
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{currentQ.question}</Text>
            
            <View style={styles.optionsContainer}>
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQ.correctAnswer;
                const showResult = selectedAnswer !== undefined;
                
                let optionStyle = styles.optionButton;
                let textStyle = styles.optionText;
                
                if (showResult) {
                  if (isSelected && isCorrect) {
                    optionStyle = [styles.optionButton, styles.correctOption];
                    textStyle = [styles.optionText, styles.correctOptionText];
                  } else if (isSelected && !isCorrect) {
                    optionStyle = [styles.optionButton, styles.incorrectOption];
                    textStyle = [styles.optionText, styles.incorrectOptionText];
                  } else if (isCorrect) {
                    optionStyle = [styles.optionButton, styles.correctOption];
                    textStyle = [styles.optionText, styles.correctOptionText];
                  }
                }
                
                return (
                  <Pressable
                    key={index}
                    style={optionStyle}
                    onPress={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== undefined}
                  >
                    <View style={styles.optionContent}>
                      <Text style={textStyle}>{option}</Text>
                      {showResult && isCorrect && (
                        <IconSymbol name="checkmark.circle" color="#4CAF50" size={24} />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <IconSymbol name="xmark.circle" color="#F44336" size={24} />
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>

            {/* Explanation */}
            {selectedAnswer !== undefined && (
              <View style={styles.explanationContainer}>
                <Text style={styles.explanationTitle}>التفسير:</Text>
                <Text style={styles.explanationText}>{currentQ.explanation}</Text>
                
                {/* Enhanced sound explanation for correct answers */}
                {selectedAnswer === currentQ.correctAnswer && (
                  <View style={styles.soundExplanation}>
                    <IconSymbol name="speaker.wave.3" color="#4CAF50" size={20} />
                    <Text style={styles.soundExplanationText}>
                      سمعت تسلسل الأصوات: نقر → نجاح → {currentQ.soundType === 'diffusion' ? 'الانتشار' : 
                                  currentQ.soundType === 'osmosis' ? 'الخاصية الاسموزية' : 
                                  'النقل النشط'}؟
                    </Text>
                    <Pressable
                      style={styles.replaySoundButton}
                      onPress={async () => {
                        await soundManager.playClickSound();
                        setTimeout(async () => {
                          await soundManager.playSuccessSound();
                          setTimeout(() => soundManager.playTransportSound(currentQ.soundType), 400);
                        }, 200);
                      }}
                    >
                      <Text style={styles.replaySoundText}>إعادة تشغيل التسلسل</Text>
                    </Pressable>
                  </View>
                )}

                {/* Sound explanation for incorrect answers */}
                {selectedAnswer !== currentQ.correctAnswer && (
                  <View style={styles.errorSoundExplanation}>
                    <IconSymbol name="speaker.wave.1" color="#F44336" size={20} />
                    <Text style={styles.errorSoundExplanationText}>
                      سمعت: نقر → صوت خطأ. جرب مرة أخرى في الأسئلة القادمة!
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>

          {/* Navigation Buttons */}
          <View style={styles.navigationContainer}>
            <Button
              variant="outline"
              onPress={handlePrevious}
              disabled={currentQuestion === 0}
              style={[styles.navButton, { opacity: currentQuestion === 0 ? 0.5 : 1 }]}
            >
              السابق
            </Button>
            
            <Button
              variant="primary"
              onPress={handleNext}
              disabled={selectedAnswer === undefined}
              style={[styles.navButton, { opacity: selectedAnswer === undefined ? 0.5 : 1 }]}
            >
              {currentQuestion === questions.length - 1 ? "النتائج" : "التالي"}
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
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1565C0',
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    writingDirection: 'rtl',
  },
  soundReminder: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  soundReminderText: {
    flex: 1,
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 12,
    fontWeight: '500',
    writingDirection: 'rtl',
  },
  questionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 6,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 20,
    textAlign: 'right',
    writingDirection: 'rtl',
    lineHeight: 28,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  correctOption: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderColor: '#F44336',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    color: '#424242',
    textAlign: 'right',
    writingDirection: 'rtl',
    flex: 1,
  },
  correctOptionText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  incorrectOptionText: {
    color: '#F44336',
    fontWeight: '600',
  },
  explanationContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 8,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  explanationText: {
    fontSize: 15,
    color: '#424242',
    lineHeight: 22,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  soundExplanation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: 8,
  },
  soundExplanationText: {
    flex: 1,
    fontSize: 14,
    color: '#4CAF50',
    marginLeft: 8,
    marginRight: 8,
    writingDirection: 'rtl',
  },
  errorSoundExplanation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: 8,
  },
  errorSoundExplanationText: {
    flex: 1,
    fontSize: 14,
    color: '#F44336',
    marginLeft: 8,
    writingDirection: 'rtl',
  },
  replaySoundButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  replaySoundText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    writingDirection: 'rtl',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  navButton: {
    flex: 1,
  },
  resultsContainer: {
    alignItems: 'center',
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 24,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  scoreCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 3,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
    elevation: 8,
    width: '100%',
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  percentageText: {
    fontSize: 24,
    color: '#666',
    marginBottom: 12,
  },
  scoreMessage: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  soundFeatureInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(21, 101, 192, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(21, 101, 192, 0.3)',
  },
  soundFeatureText: {
    flex: 1,
    fontSize: 15,
    color: '#1565C0',
    marginLeft: 12,
    fontWeight: '500',
    writingDirection: 'rtl',
  },
  soundLegend: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: '100%',
  },
  soundLegendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 12,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  soundLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  soundLegendText: {
    fontSize: 14,
    color: '#424242',
    marginLeft: 12,
    writingDirection: 'rtl',
  },
  detailedResults: {
    width: '100%',
    marginBottom: 24,
  },
  detailedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 16,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  resultItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0',
    writingDirection: 'rtl',
  },
  resultStatus: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultQuestion: {
    fontSize: 15,
    color: '#424242',
    marginBottom: 8,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  resultExplanation: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'right',
    writingDirection: 'rtl',
    marginBottom: 8,
  },
  soundReplaySection: {
    gap: 8,
  },
  soundReplayButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: 15,
    alignSelf: 'flex-end',
  },
  soundReplayText: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 6,
    fontWeight: '500',
    writingDirection: 'rtl',
  },
  actionsSection: {
    gap: 12,
    width: '100%',
  },
  actionButton: {
    width: '100%',
  },
});
