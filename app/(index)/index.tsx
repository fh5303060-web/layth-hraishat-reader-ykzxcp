
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable, ImageBackground, Image } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";
import { commonStyles, colors } from "@/styles/commonStyles";

const ICON_COLOR = "#007AFF";

export default function HomeScreen() {
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null);

  // Arabic content for transport methods based on the educational material
  const transportMethods = [
    {
      id: "diffusion",
      title: "الانتشار",
      subtitle: "لا تحتاج للطاقة",
      description: "انتشار قطرات الكبر في كأس ماء، انتشار رائحة العطر في الغرفة",
      direction: "من الوسط الأعلى تركيز إلى الوسط الأقل تركيز",
      materials: "الأكسجين وثاني أكسيد الكربون",
      color: "#4CAF50",
      icon: "arrow.right.circle"
    },
    {
      id: "osmosis",
      title: "الخاصية الاسموزية",
      subtitle: "لا تحتاج للطاقة",
      description: "وضع بعض الخضار كالخيار أو الجزر أو البطاطا في ماء مالح سنلاحظ انكماشها نتيجة خروج الماء منها",
      direction: "من الوسط الأقل تركيز إلى الوسط الأعلى تركيز بالمواد الذائبة",
      materials: "الماء",
      color: "#2196F3",
      icon: "drop.circle"
    },
    {
      id: "active",
      title: "النقل النشط",
      subtitle: "تحتاج للطاقة",
      description: "توجد في خياشيم الأسماك البحرية خلايا تستطيع إزالة الأملاح من أجسام الأسماك يضخها إلى المياه المالحة",
      direction: "من الوسط الأقل تركيز إلى الوسط الأعلى تركيز",
      materials: "بعض الأملاح كالصوديوم",
      color: "#FF9800",
      icon: "bolt.circle"
    }
  ];

  const renderTransportMethod = (method: typeof transportMethods[0]) => (
    <Pressable
      key={method.id}
      style={[styles.methodCard, { borderColor: method.color }]}
      onPress={() => setSelectedTransport(selectedTransport === method.id ? null : method.id)}
    >
      <View style={styles.methodHeader}>
        <View style={[styles.methodIcon, { backgroundColor: method.color }]}>
          <IconSymbol name={method.icon as any} color="white" size={24} />
        </View>
        <View style={styles.methodInfo}>
          <Text style={styles.methodTitle}>{method.title}</Text>
          <Text style={styles.methodSubtitle}>{method.subtitle}</Text>
        </View>
        <IconSymbol 
          name={selectedTransport === method.id ? "chevron.up" : "chevron.down"} 
          color={colors.text} 
          size={20} 
        />
      </View>
      
      {selectedTransport === method.id && (
        <View style={styles.methodDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>اتجاه الانتقال:</Text>
            <Text style={styles.detailText}>{method.direction}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>المواد المنقولة:</Text>
            <Text style={styles.detailText}>{method.materials}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>مثال:</Text>
            <Text style={styles.detailText}>{method.description}</Text>
          </View>
        </View>
      )}
    </Pressable>
  );

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => router.push("/membrane-details")}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="info.circle" color={ICON_COLOR} />
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <Pressable
      onPress={() => router.push("/quiz")}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="questionmark.circle" color={ICON_COLOR} />
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "LAYTH HRAISHAT",
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
        }}
      />
      
      <View style={styles.container}>
        {/* Transparent background overlay */}
        <View style={styles.backgroundOverlay} />

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section with School Logo */}
          <View style={styles.headerSection}>
            <Image 
              source={require('@/assets/images/f4851c23-1bf0-49de-ad7e-231914489d04.png')}
              style={styles.schoolLogo}
              resizeMode="contain"
            />
            <Text style={styles.appTitle}>LAYTH HRAISHAT</Text>
            <Text style={styles.appSubtitle}>طرق انتقال المواد عبر الغشاء البيلازمي</Text>
            <Text style={styles.headerDescription}>
              استكشف عالم آليات النقل عبر الأغشية الخلوية الرائع
            </Text>
          </View>

          {/* Transport Methods */}
          <View style={styles.methodsSection}>
            <Text style={styles.sectionTitle}>طرق النقل</Text>
            {transportMethods.map(renderTransportMethod)}
          </View>

          {/* Quick Actions */}
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
              onPress={() => router.push("/membrane-details")}
              style={styles.actionButton}
            >
              تفاصيل الغشاء
            </Button>
          </View>
        </ScrollView>

        {/* Bottom Educational Image */}
        <View style={styles.bottomImageContainer}>
          <Image 
            source={require('@/assets/images/1db08fdc-a3c6-4a64-b77a-5b5979192b19.jpeg')}
            style={styles.bottomEducationalImage}
            resizeMode="cover"
          />
          <View style={styles.bottomImageOverlay}>
            <Text style={styles.bottomImageText}>جدول طرق النقل عبر الغشاء البيلازمي</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Semi-transparent white background
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Transparent overlay
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 160, // Space for bottom image
  },
  headerSection: {
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
    margin: 16,
  },
  schoolLogo: {
    width: 120,
    height: 80,
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565C0',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1,
  },
  appSubtitle: {
    fontSize: 18,
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '600',
    writingDirection: 'rtl',
  },
  headerDescription: {
    fontSize: 16,
    color: '#424242',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
    writingDirection: 'rtl',
  },
  methodsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 20,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  methodCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    elevation: 6,
  },
  methodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  methodInfo: {
    flex: 1,
  },
  methodTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 4,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  methodSubtitle: {
    fontSize: 14,
    color: '#D32F2F',
    fontWeight: '500',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  methodDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  detailRow: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 4,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  detailText: {
    fontSize: 15,
    color: '#424242',
    lineHeight: 22,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  actionsSection: {
    padding: 20,
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
  bottomImageContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 140,
  },
  bottomEducationalImage: {
    width: '100%',
    height: '100%',
  },
  bottomImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomImageText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    writingDirection: 'rtl',
    paddingHorizontal: 20,
  },
  headerButtonContainer: {
    padding: 8,
  },
});
