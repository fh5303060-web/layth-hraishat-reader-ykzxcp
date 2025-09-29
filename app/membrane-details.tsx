
import React from "react";
import { IconSymbol } from "@/components/IconSymbol";
import { Stack, router } from "expo-router";
import { Button } from "@/components/button";
import { commonStyles, colors } from "@/styles/commonStyles";
import { ScrollView, StyleSheet, View, Text, Pressable, Image } from "react-native";

export default function MembraneDetailsScreen() {
  const membraneComponents = [
    {
      id: "phospholipids",
      title: "الفوسفوليبيدات",
      description: "تشكل الطبقة المزدوجة الأساسية للغشاء البيلازمي",
      details: "جزيئات لها رأس محب للماء وذيل كاره للماء، تنتظم في طبقتين متقابلتين",
      color: "#4CAF50",
      icon: "circle.grid.2x2"
    },
    {
      id: "proteins",
      title: "البروتينات",
      description: "تؤدي وظائف متنوعة في النقل والتواصل",
      details: "بروتينات غشائية تساعد في النقل النشط والسلبي عبر الغشاء",
      color: "#2196F3",
      icon: "gear.circle"
    },
    {
      id: "cholesterol",
      title: "الكوليسترول",
      description: "ينظم مرونة وسيولة الغشاء",
      details: "يحافظ على التوازن المناسب لمرونة الغشاء في درجات الحرارة المختلفة",
      color: "#FF9800",
      icon: "hexagon"
    },
    {
      id: "carbohydrates",
      title: "الكربوهيدرات",
      description: "تلعب دوراً في التعرف الخلوي",
      details: "ترتبط بالبروتينات والدهون لتكوين علامات تعريف خلوية",
      color: "#9C27B0",
      icon: "star.circle"
    }
  ];

  const renderComponent = (component: typeof membraneComponents[0], index: number) => (
    <View key={component.id} style={[styles.componentCard, { borderLeftColor: component.color }]}>
      <View style={styles.componentHeader}>
        <View style={[styles.componentIcon, { backgroundColor: component.color }]}>
          <IconSymbol name={component.icon as any} color="white" size={24} />
        </View>
        <View style={styles.componentInfo}>
          <Text style={styles.componentTitle}>{component.title}</Text>
          <Text style={styles.componentDescription}>{component.description}</Text>
        </View>
      </View>
      <Text style={styles.componentDetails}>{component.details}</Text>
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "تفاصيل الغشاء البيلازمي",
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
            <Text style={styles.pageTitle}>مكونات الغشاء البيلازمي</Text>
            <Text style={styles.pageDescription}>
              الغشاء البيلازمي هو الحاجز الانتقائي الذي يحيط بالخلية ويتحكم في دخول وخروج المواد
            </Text>
          </View>

          {/* Educational Image */}
          <View style={styles.imageSection}>
            <Image 
              source={require('@/assets/images/1db08fdc-a3c6-4a64-b77a-5b5979192b19.jpeg')}
              style={styles.educationalImage}
              resizeMode="contain"
            />
            <Text style={styles.imageCaption}>
              جدول يوضح طرق انتقال المواد المختلفة عبر الغشاء البيلازمي
            </Text>
          </View>

          {/* Membrane Components */}
          <View style={styles.componentsSection}>
            <Text style={styles.sectionTitle}>المكونات الرئيسية</Text>
            {membraneComponents.map(renderComponent)}
          </View>

          {/* Transport Summary */}
          <View style={styles.summarySection}>
            <Text style={styles.sectionTitle}>ملخص طرق النقل</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>الانتشار:</Text>
                <Text style={styles.summaryText}>لا يحتاج طاقة - من التركيز العالي للمنخفض</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>الخاصية الاسموزية:</Text>
                <Text style={styles.summaryText}>نقل الماء عبر الغشاء شبه النفاذ</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>النقل النشط:</Text>
                <Text style={styles.summaryText}>يحتاج طاقة - ضد التدرج التركيزي</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsSection}>
            <Button
              variant="primary"
              onPress={() => router.push("/interactive-demo")}
              style={styles.actionButton}
            >
              العرض التفاعلي
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
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 16,
  },
  educationalImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  imageCaption: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
    writingDirection: 'rtl',
  },
  componentsSection: {
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
  componentCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  componentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  componentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  componentInfo: {
    flex: 1,
  },
  componentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 4,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  componentDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  componentDetails: {
    fontSize: 15,
    color: '#424242',
    lineHeight: 22,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  summarySection: {
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  summaryRow: {
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 4,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  summaryText: {
    fontSize: 15,
    color: '#424242',
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
