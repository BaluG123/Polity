import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const JudiciaryScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const judiciaryTopics = [
    {
      id: 'supreme_court',
      title: 'Supreme Court',
      subtitle: 'Apex Court of India',
      icon: '🏛️',
      color: '#E91E63',
      content: `The Supreme Court of India is the highest judicial authority and the apex court of the country.

COMPOSITION:
• Chief Justice of India (CJI)
• Maximum 33 other judges (currently 34 total)
• Appointed by President on advice of collegium
• Retirement age: 65 years

QUALIFICATIONS FOR JUDGES:
• Citizen of India
• Judge of High Court for 5+ years, OR
• Advocate of High Court for 10+ years, OR
• Distinguished jurist in President's opinion

JURISDICTION:
1. ORIGINAL JURISDICTION:
• Disputes between Centre and States
• Inter-state disputes
• Fundamental rights enforcement (Article 32)

2. APPELLATE JURISDICTION:
• Appeals from High Courts
• Criminal, civil, and constitutional matters
• Special Leave Petition (Article 136)

3. ADVISORY JURISDICTION:
• President can seek opinion (Article 143)
• Non-binding advice on legal matters

POWERS:
• Judicial Review (Kesavananda Bharati case)
• Guardian of Constitution
• Protector of Fundamental Rights
• Final interpreter of Constitution
• Power to punish for contempt

LANDMARK JUDGMENTS:
• Kesavananda Bharati (1973) - Basic Structure
• Maneka Gandhi (1978) - Article 21 expansion
• Vishaka (1997) - Sexual harassment guidelines
• K.S. Puttaswamy (2017) - Right to Privacy

CURRENT CHALLENGES:
• Pendency of cases
• Judicial appointments delay
• Infrastructure constraints
• Public trust and accountability`
    },
    {
      id: 'high_courts',
      title: 'High Courts',
      subtitle: 'State Level Courts',
      icon: '⚖️',
      color: '#9C27B0',
      content: `High Courts are the principal civil and criminal courts at the state level with supervisory jurisdiction over subordinate courts.

ESTABLISHMENT:
• 25 High Courts in India
• Each state has at least one High Court
• Some High Courts have jurisdiction over multiple states
• Established under Articles 214-231

COMPOSITION:
• Chief Justice and other judges
• Strength varies by High Court
• Appointed by President after consultation with CJI and Governor
• Retirement age: 62 years

QUALIFICATIONS:
• Citizen of India
• Judge of subordinate court for 10+ years, OR
• Advocate for 10+ years, OR
• Distinguished jurist

JURISDICTION:
1. ORIGINAL JURISDICTION:
• Revenue matters
• Company law matters
• Admiralty jurisdiction
• Matrimonial matters
• Testamentary and intestate matters

2. APPELLATE JURISDICTION:
• Appeals from subordinate courts
• Criminal and civil appeals
• Constitutional matters

3. SUPERVISORY JURISDICTION:
• Superintendence over subordinate courts
• Transfer of cases
• Administrative control

4. WRIT JURISDICTION:
• Issue writs like Supreme Court
• Habeas corpus, mandamus, prohibition, certiorari, quo-warranto
• Enforcement of fundamental rights

POWERS:
• Judicial review of state laws
• Administrative supervision
• Rule-making powers
• Contempt powers
• Transfer of cases

IMPORTANT HIGH COURTS:
• Calcutta High Court (1862) - Oldest
• Bombay High Court (1862)
• Madras High Court (1862)
• Delhi High Court (1966)
• Allahabad High Court - Largest bench strength`
    },
    {
      id: 'subordinate_courts',
      title: 'Subordinate Courts',
      subtitle: 'District & Session Courts',
      icon: '🏢',
      color: '#3F51B5',
      content: `Subordinate Courts form the foundation of India's judicial system, handling the majority of cases at the grassroots level.

HIERARCHY:
1. DISTRICT LEVEL:
• District Judge (Civil)
• Sessions Judge (Criminal)
• Additional District/Sessions Judges

2. SUB-DIVISIONAL LEVEL:
• Sub-Divisional Magistrate (SDM)
• Additional Sub-Divisional Magistrate

3. TEHSIL/TALUKA LEVEL:
• Munsif/Sub-Judge (Civil)
• Judicial Magistrate First Class (Criminal)
• Judicial Magistrate Second Class (Criminal)

DISTRICT COURTS:
• Highest court at district level
• Original and appellate jurisdiction
• Civil and criminal matters
• Administrative head of district judiciary

SESSIONS COURTS:
• Try serious criminal offences
• Sessions punishable with death, life imprisonment
• No appellate jurisdiction in criminal matters
• Can award any sentence including death penalty

MAGISTRATE COURTS:
1. JUDICIAL MAGISTRATES:
• First Class: Up to 3 years imprisonment
• Second Class: Up to 1 year imprisonment
• Summary trials for petty offences

2. EXECUTIVE MAGISTRATES:
• District Magistrate (DM)
• Sub-Divisional Magistrate (SDM)
• Administrative functions, law and order

CIVIL COURTS:
• Munsif Courts: Suits up to specified value
• Sub-Judge Courts: Higher value suits
• Senior Civil Judge: Appellate jurisdiction

SPECIAL COURTS:
• Family Courts
• Consumer Courts
• Labour Courts
• Tribunals (Income Tax, Sales Tax, etc.)
• Fast Track Courts
• Lok Adalats

JURISDICTION:
• Original jurisdiction in most civil and criminal matters
• Local jurisdiction within district/sub-division
• Appellate jurisdiction from lower courts
• Revenue and land matters

ADMINISTRATION:
• Under administrative control of High Court
• District Judge is administrative head
• Appointment by Governor in consultation with High Court
• Transfer and posting by High Court`
    },
    {
      id: 'judicial_review',
      title: 'Judicial Review',
      subtitle: 'Constitutional Interpretation',
      icon: '📋',
      color: '#1976D2',
      content: `Judicial Review is the power of courts to examine the constitutionality of laws and government actions.

CONCEPT:
• Power to review legislative and executive actions
• Ensure compliance with Constitution
• Strike down unconstitutional laws
• Borrowed from USA (Marbury vs Madison, 1803)

TYPES OF JUDICIAL REVIEW:
1. LEGISLATIVE REVIEW:
• Review of laws passed by Parliament/State Legislatures
• Check constitutional validity
• Strike down ultra vires laws

2. EXECUTIVE REVIEW:
• Review of executive actions
• Administrative decisions
• Government policies and orders

3. CONSTITUTIONAL REVIEW:
• Review of constitutional amendments
• Basic Structure Doctrine (Kesavananda Bharati)
• Limits on amending power

BASIS IN INDIAN CONSTITUTION:
• Not explicitly mentioned
• Implied power derived from:
  - Article 13: Laws inconsistent with fundamental rights void
  - Article 32: Right to Constitutional Remedies
  - Article 226: High Court writ jurisdiction
  - Article 137: Supreme Court review power

LANDMARK CASES:
1. A.K. GOPALAN vs STATE OF MADRAS (1950):
• Narrow interpretation of judicial review
• Procedure established by law sufficient

2. KESAVANANDA BHARATI vs STATE OF KERALA (1973):
• Basic Structure Doctrine established
• Parliament cannot destroy basic features
• Judicial review of constitutional amendments

3. MINERVA MILLS vs UNION OF INDIA (1980):
• Reaffirmed Basic Structure Doctrine
• Balance between judicial review and parliamentary sovereignty

4. WAMAN RAO vs UNION OF INDIA (1981):
• Pre-Kesavananda amendments immune
• Post-Kesavananda amendments reviewable

BASIC STRUCTURE ELEMENTS:
• Supremacy of Constitution
• Republican and democratic form of government
• Secular character
• Separation of powers
• Federal character
• Unity and integrity of nation
• Welfare state (added later)
• Judicial review itself

LIMITATIONS:
• Cannot review political questions
• Cannot substitute its judgment for executive policy
• Self-imposed restraint
• Doctrine of separation of powers

SIGNIFICANCE:
• Guardian of Constitution
• Protection of fundamental rights
• Check on arbitrary power
• Maintains constitutional balance
• Ensures rule of law`
    },
    {
      id: 'pil',
      title: 'Public Interest Litigation',
      subtitle: 'Social Justice Mechanism',
      icon: '👥',
      color: '#4CAF50',
      content: `Public Interest Litigation (PIL) is a legal mechanism that allows any citizen to approach courts for protection of public interest and fundamental rights.

CONCEPT:
• Litigation for public good
• Relaxed rules of locus standi
• Access to justice for marginalized
• Social action litigation
• Introduced by Justice P.N. Bhagwati

EVOLUTION:
• 1980s: Justice Krishna Iyer and P.N. Bhagwati pioneered
• Relaxation of traditional adversarial system
• Postcard petitions accepted
• Judicial activism for social justice

FEATURES:
1. LOCUS STANDI:
• Any citizen can file
• No personal interest required
• Public-spirited individuals/organizations
• Even court can take suo moto cognizance

2. PROCEDURE:
• Simplified procedure
• Relaxed rules of evidence
• Court can appoint commissioners
• Continuing mandamus
• Monitoring by court

3. SCOPE:
• Violation of fundamental rights
• Environmental protection
• Consumer protection
• Corruption in public offices
• Prison reforms
• Bonded labour

LANDMARK PIL CASES:
1. HUSSAINARA KHATOON vs STATE OF BIHAR (1979):
• Prison reforms
• Speedy trial rights
• Legal aid for poor

2. M.C. MEHTA vs UNION OF INDIA:
• Environmental protection
• Ganga pollution
• Vehicular pollution in Delhi
• Taj Mahal protection

3. BANDHUA MUKTI MORCHA vs UNION OF INDIA (1984):
• Bonded labour rehabilitation
• Child labour issues
• Fundamental rights of workers

4. VISHAKA vs STATE OF RAJASTHAN (1997):
• Sexual harassment at workplace
• Guidelines for prevention
• Women's rights protection

5. COMMON CAUSE vs UNION OF INDIA:
• Right to die with dignity
• Passive euthanasia
• Living will recognition

POSITIVE ASPECTS:
• Access to justice for poor
• Environmental protection
• Human rights enforcement
• Government accountability
• Social reforms
• Judicial activism

CRITICISMS:
• Judicial overreach
• Delay in regular cases
• Misuse by publicity seekers
• Executive functions by judiciary
• Frivolous litigation
• Lack of expertise in policy matters

GUIDELINES FOR PIL:
• Genuine public interest
• Not for personal gain
• Proper investigation required
• Court discretion to entertain
• Costs may be imposed for frivolous cases

CURRENT STATUS:
• Institutionalized mechanism
• Regular feature of Indian judiciary
• Balance between activism and restraint
• Continuing evolution through judicial pronouncements`
    },
    {
      id: 'judicial_appointments',
      title: 'Judicial Appointments',
      subtitle: 'Collegium System',
      icon: '👨‍⚖️',
      color: '#FF9800',
      content: `The Collegium System is the current mechanism for appointing judges to the Supreme Court and High Courts in India.

EVOLUTION:
1. ORIGINAL SYSTEM (1950-1993):
• President appoints judges
• Consultation with CJI and other judges
• Executive had final say
• Led to conflicts during Emergency

2. FIRST JUDGES CASE (1981):
• S.P. Gupta vs Union of India
• Consultation doesn't mean concurrence
• Executive primacy in appointments
• Criticized for political interference

3. SECOND JUDGES CASE (1993):
• Supreme Court Advocates on Record Association vs Union of India
• Established Collegium System
• CJI and 4 senior-most judges
• Primacy of judiciary in appointments

4. THIRD JUDGES CASE (1998):
• Re: Presidential Reference
• Refined collegium system
• Transparency and consultation norms
• High Court collegium: CJ + 2 senior judges

CURRENT COLLEGIUM SYSTEM:

SUPREME COURT COLLEGIUM:
• Chief Justice of India (Chairperson)
• 4 senior-most judges of Supreme Court
• Recommends appointments and transfers
• Decisions by majority

HIGH COURT COLLEGIUM:
• Chief Justice of High Court (Chairperson)
• 2 senior-most judges of that High Court
• Recommends appointments and transfers
• Consultation with SC collegium

APPOINTMENT PROCESS:
1. High Court judges recommendation by HC collegium
2. Consultation with SC collegium
3. Recommendation to Government
4. Government processes and sends to President
5. President appoints (bound by recommendation)

TRANSFER PROCESS:
• Collegium can transfer judges
• Consultation with concerned Chief Justices
• Administrative and judicial reasons
• Maintain independence and efficiency

NJAC ATTEMPT (2014-2015):
• National Judicial Appointments Commission Act
• Replace collegium with NJAC
• Include executive and civil society
• Struck down by Supreme Court (2015)
• Violated judicial independence

ADVANTAGES OF COLLEGIUM:
• Judicial independence
• Merit-based selection
• Insulation from political pressure
• Peer review mechanism
• Constitutional interpretation expertise

CRITICISMS:
• Lack of transparency
• No public scrutiny
• Nepotism allegations
• Delay in appointments
• Accountability issues
• Closed-door decisions

RECENT REFORMS:
• Memorandum of Procedure (MoP)
• Secretariat for collegium
• Reasons for recommendations
• Website for transparency
• Timeline for appointments

CURRENT CHALLENGES:
• Vacancy crisis in courts
• Delayed appointments
• Lack of diversity
• Regional representation
• Gender representation
• Transparency demands

PROPOSED REFORMS:
• National Court of Appeal
• All India Judicial Service
• Judicial Appointments Commission (revised)
• Performance evaluation
• Fixed tenure for CJI`
    }
  ];

  const landmarkCases = [
    {
      title: 'Kesavananda Bharati (1973)',
      description: 'Established Basic Structure Doctrine',
      impact: 'Limited Parliament\'s amending power'
    },
    {
      title: 'Maneka Gandhi (1978)',
      description: 'Expanded Article 21 interpretation',
      impact: 'Right to life includes dignity and fair procedure'
    },
    {
      title: 'Vishaka (1997)',
      description: 'Sexual harassment guidelines',
      impact: 'Workplace safety for women'
    }
  ];

  const handleTopicPress = (topic) => {
    navigation.navigate('ConceptDetail', {
      title: topic.title,
      content: topic.content,
      subtitle: topic.subtitle
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E91E63" />
      
      <LinearGradient
        colors={['#E91E63', '#C2185B']}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Judiciary</Text>
          <View style={{ width: 40 }} />
        </View>
        <Text style={styles.headerSubtitle}>
          Courts & Legal System of India
        </Text>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚖️ Court Hierarchy</Text>
          
          {judiciaryTopics.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={[styles.topicCard, { borderLeftColor: topic.color }]}
              onPress={() => handleTopicPress(topic)}
              activeOpacity={0.7}
            >
              <View style={styles.topicHeader}>
                <View style={[styles.topicIcon, { backgroundColor: topic.color }]}>
                  <Text style={styles.topicIconText}>{topic.icon}</Text>
                </View>
                <View style={styles.topicInfo}>
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                  <Text style={styles.topicSubtitle}>{topic.subtitle}</Text>
                </View>
                <Icon name="arrow-forward-ios" size={16} color="#666" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Landmark Cases</Text>
          
          {landmarkCases.map((case_, index) => (
            <View key={index} style={styles.caseCard}>
              <Text style={styles.caseTitle}>{case_.title}</Text>
              <Text style={styles.caseDescription}>{case_.description}</Text>
              <View style={styles.impactContainer}>
                <Icon name="gavel" size={16} color="#E91E63" />
                <Text style={styles.impactText}>{case_.impact}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔑 Key Principles</Text>
          
          <View style={styles.principleCard}>
            <Text style={styles.principleTitle}>🔹 Independence of Judiciary</Text>
            <Text style={styles.principleText}>
              Judges are independent from executive and legislative interference, ensuring impartial justice.
            </Text>
          </View>

          <View style={styles.principleCard}>
            <Text style={styles.principleTitle}>🔹 Rule of Law</Text>
            <Text style={styles.principleText}>
              All persons, including government officials, are subject to and accountable under the law.
            </Text>
          </View>

          <View style={styles.principleCard}>
            <Text style={styles.principleTitle}>🔹 Access to Justice</Text>
            <Text style={styles.principleText}>
              Legal aid, Lok Adalats, and PIL ensure justice is accessible to all citizens.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 5,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  topicCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topicIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  topicIconText: {
    fontSize: 24,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  topicSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  caseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderLeftWidth: 3,
    borderLeftColor: '#E91E63',
  },
  caseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E91E63',
    marginBottom: 5,
  },
  caseDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  impactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  impactText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
    fontStyle: 'italic',
  },
  principleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  principleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E91E63',
    marginBottom: 8,
  },
  principleText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default JudiciaryScreen;