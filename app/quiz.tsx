
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: "أي من طرق النقل التالية لا تحتاج إلى طاقة؟",
      options: [
        "النقل النشط",
        "الانتشار",
        "البلعمة",
        "الإخراج الخلوي"
      ],
      correct: 1,
      explanation: "الانتشار هو حركة المواد من التركيز العالي إلى المنخفض دون الحاجة لطاقة"
    },
    {
      question: "ما هي المادة الرئيسية التي تنتقل بالخاصية الاسموزية؟",
      options: [
        "الأكسجين",
        "الماء",
        "الصوديوم",
        "الجلوكوز"
      ],
      correct: 1,
      explanation: "الخاصية الاسموزية هي انتقال الماء عبر الغشاء شبه النفاذ"
    },
    {
      question: "في أي اتجاه تتحرك المواد في النقل النشط؟",
      options: [
        "من التركيز العالي إلى المنخفض",
        "من التركيز المنخفض إلى العالي",
        "في جميع الاتجاهات بالتساوي",
        "لا تتحرك"
      ],
      correct: 1,
      explanation: "النقل النشط ينقل المواد ضد التدرج التركيزي باستخدام الطاقة"
    },
    {
      question: "أي مثال يوضح الانتشار؟",
      options: [
        "انكماش الخيار في الماء المالح",
        "انتشار رائحة العطر في الغرفة",
        "ضخ الصوديوم من الخلية",
        "امتصاص الجلوكوز"
      ],
      correct: 1,
      explanation: "انتشار رائحة العطر مثال واضح على الانتشار الطبيعي للجزيئات"
    },
    {
      question: "ما الذي يحدث للخيار عند وضعه في ماء مالح؟",
      options: [
        "ينتفخ",
        "ينكمش",
        "لا يتغير",
        "يذوب"
      ],
      correct: 1,
      explanation: "الخيار ينكمش بسبب خروج الماء منه إلى الماء المالح بالخاصية الاسموزية"
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "#4CAF50";
    if (percentage >= 60) return "#FF9800";
    return "#F44336";
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "ممتاز! لديك فهم جيد للموضوع";
    if (percentage >= 60) return "جيد! يمكنك المراجعة لتحسين النتيجة";
    return "تحتاج للمزيد من المراجعة";
  };

  if (showResults) {
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
          <ScrollView contentContainerStyle={styles.resultsContainer}>
            <View style={styles.scoreSection}>
              <IconSymbol 
                name="checkmark.circle.fill" 
                color={getScoreColor()} 
                size={80} 
              />
              <Text style={[styles.scoreText, { color: getScoreColor() }]}>
                {score} من {questions.length}
              </Text>
              <Text style={styles.percentageText}>
                {Math.round((score / questions.length) * 100)}%
              </Text>
              <Text style={styles.scoreMessage}>
                {getScoreMessage()}
              </Text>
            </View>

            <View style={styles.reviewSection}>
              <Text style={styles.reviewTitle}>مراجعة الإجابات</Text>
              {questions.map((question, index) => (
                <View key={index} style={styles.reviewItem}>
                  <View style={styles.questionHeader}>
                    <Text style={styles.questionNumber}>السؤال {index + 1}</Text>
                    <IconSymbol 
                      name={selectedAnswers[index] === question.correct ? "checkmark.circle" : "xmark.circle"}
                      color={selectedAnswers[index] === question.correct ? "#4CAF50" : "#F44336"}
                      size={24}
                    />
                  </View>
                  <Text style={styles.reviewQuestion}>{question.question}</Text>
                  <Text style={styles.correctAnswer}>
                    الإجابة الصحيحة: {question.options[question.correct]}
                  </Text>
                  <Text style={styles.explanation}>{question.explanation}</Text>
                </View>
              ))}
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
                onPress={() => router.back()}
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
        <ScrollView contentContainerStyle={styles.quizContainer}>
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

          {/* Question */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {questions[currentQuestion].question}
            </Text>
          </View>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {questions[currentQuestion].options.map((option, index) => (
              <Pressable
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswers[currentQuestion] === index && styles.selectedOption
                ]}
                onPress={() => handleAnswerSelect(index)}
              >
                <View style={styles.optionContent}>
                  <View style={[
                    styles.optionCircle,
                    selectedAnswers[currentQuestion] === index && styles.selectedCircle
                  ]}>
                    {selectedAnswers[currentQuestion] === index && (
                      <IconSymbol name="checkmark" color="white" size={16} />
                    )}
                  </View>
                  <Text style={[
                    styles.optionText,
                    selectedAnswers[currentQuestion] === index && styles.selectedOptionText
                  ]}>
                    {option}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Navigation */}
          <View style={styles.navigationContainer}>
            <Button
              variant="outline"
              onPress={handlePrevious}
              disabled={currentQuestion === 0}
              style={[styles.navButton, currentQuestion === 0 && styles.disabledButton]}
            >
              السابق
            </Button>
            <Button
              variant="primary"
              onPress={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
              style={[styles.navButton, selectedAnswers[currentQuestion] === undefined && styles.disabledButton]}
            >
              {currentQuestion === questions.length - 1 ? "إنهاء" : "التالي"}
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
  quizContainer: {
    padding: 20,
    flexGrow: 1,
  },
  resultsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1565C0',
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    writingDirection: 'rtl',
  },
  questionContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1565C0',
    textAlign: 'center',
    lineHeight: 28,
    writingDirection: 'rtl',
  },
  optionsContainer: {
    marginBottom: 30,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  selectedOption: {
    borderColor: '#1565C0',
    backgroundColor: '#E3F2FD',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    backgroundColor: '#1565C0',
    borderColor: '#1565C0',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#424242',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  selectedOptionText: {
    color: '#1565C0',
    fontWeight: '600',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  navButton: {
    flex: 1,
  },
  disabledButton: {
    opacity: 0.5,
  },
  scoreSection: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 30,
    width: '100%',
  },
  scoreText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 16,
  },
  percentageText: {
    fontSize: 24,
    color: '#666',
    marginTop: 8,
  },
  scoreMessage: {
    fontSize: 18,
    color: '#424242',
    textAlign: 'center',
    marginTop: 16,
    writingDirection: 'rtl',
  },
  reviewSection: {
    width: '100%',
    marginBottom: 30,
  },
  reviewTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1565C0',
    textAlign: 'center',
    marginBottom: 20,
    writingDirection: 'rtl',
  },
  reviewItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  questionHeader: {
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
  reviewQuestion: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 8,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  correctAnswer: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  explanation: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  actionsSection: {
    width: '100%',
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
});
