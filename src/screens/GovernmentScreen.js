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

const GovernmentScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const governmentTopics = [
    {
      id: 'union_government',
      title: 'Union Government',
      subtitle: 'President, Prime Minister, Parliament',
      icon: '🏛️',
      color: '#1976D2',
      content: `The Union Government of India consists of the President, Prime Minister, Council of Ministers, and Parliament.

EXECUTIVE:
1. PRESIDENT:
• Constitutional Head of State
• Nominal executive (real power with PM)
• Elected by Electoral College
• Term: 5 years
• Powers: Executive, Legislative, Judicial, Emergency

2. PRIME MINISTER:
• Head of Government
• Leader of majority party in Lok Sabha
• Appointed by President
• Real executive power
• Chairman of Cabinet

3. COUNCIL OF MINISTERS:
• Cabinet Ministers (15-20)
• Ministers of State (MoS)
• Deputy Ministers
• Collective responsibility to Lok Sabha

LEGISLATURE - PARLIAMENT:
1. LOK SABHA (House of People):
• Lower House
• Maximum 552 members (543 elected + 2 nominated)
• Direct election by people
• Term: 5 years

2. RAJYA SABHA (Council of States):
• Upper House
• Maximum 250 members (238 elected + 12 nominated)
• Indirect election by State Assemblies
• Term: 6 years (1/3rd retire every 2 years)

POWERS OF PARLIAMENT:
• Legislative powers (Union, Concurrent, Residuary)
• Financial powers (Budget, taxation)
• Executive control (No-confidence, questions)
• Judicial powers (Impeachment)
• Constitutional powers (Amendment)
• Electoral powers (President, Vice-President election)

UNION MINISTRIES:
• Home Affairs
• External Affairs
• Defence
• Finance
• Law and Justice
• Railways
• Communications
• Health and Family Welfare
• Education
• Agriculture

CONSTITUTIONAL PROVISIONS:
• Articles 52-151: Union Executive and Legislature
• Part V: The Union
• Separation of powers with checks and balances
• Parliamentary system of government`
    },
    {
      id: 'state_government',
      title: 'State Government',
      subtitle: 'Governor, Chief Minister, Legislature',
      icon: '🏢',
      color: '#4CAF50',
      content: `State Governments in India follow a similar structure to the Union Government with Governor, Chief Minister, and State Legislature.

EXECUTIVE:
1. GOVERNOR:
• Constitutional Head of State
• Appointed by President for 5 years
• Nominal executive (real power with CM)
• Agent of Centre in states
• Powers similar to President at state level

2. CHIEF MINISTER:
• Head of State Government
• Leader of majority party in Assembly
• Appointed by Governor
• Real executive power in state
• Chairman of State Cabinet

3. COUNCIL OF MINISTERS:
• Cabinet Ministers
• Ministers of State
• Deputy Ministers
• Collective responsibility to Assembly
• Size: 15% of Assembly strength

LEGISLATURE:
1. LEGISLATIVE ASSEMBLY (Vidhan Sabha):
• Lower House (in bicameral states)
• Only House (in unicameral states)
• Maximum 500 members, minimum 60
• Direct election by people
• Term: 5 years

2. LEGISLATIVE COUNCIL (Vidhan Parishad):
• Upper House (only in some states)
• Maximum 1/3rd of Assembly strength
• Minimum 40 members
• Indirect election and nomination
• Term: 6 years (1/3rd retire every 2 years)

STATES WITH LEGISLATIVE COUNCILS:
• Andhra Pradesh
• Bihar
• Karnataka
• Maharashtra
• Telangana
• Uttar Pradesh
• West Bengal (abolished and restored multiple times)

POWERS OF STATE LEGISLATURE:
• Legislative powers (State and Concurrent subjects)
• Financial powers (State budget, local taxes)
• Executive control over State Government
• Electoral powers (Rajya Sabha election)

STATE SUBJECTS (7th Schedule - List II):
• Police and public order
• Agriculture
• Irrigation
• Land revenue
• Local government
• Public health
• Education (school level)
• State taxes

GOVERNOR'S SPECIAL POWERS:
• Discretionary powers in certain situations
• Reservation of bills for President's assent
• Recommendation for President's Rule
• Protection of minorities
• Special responsibility for tribal areas (in some states)

CENTRE-STATE RELATIONS:
• Administrative relations
• Legislative relations
• Financial relations
• Coordination through institutions
• Inter-State Council
• Zonal Councils`
    },
    {
      id: 'local_government',
      title: 'Local Government',
      subtitle: 'Panchayati Raj & Municipalities',
      icon: '🏘️',
      color: '#FF9800',
      content: `Local Government in India operates through Panchayati Raj Institutions (PRIs) in rural areas and Urban Local Bodies (ULBs) in urban areas.

PANCHAYATI RAJ SYSTEM:
Constitutional Status: 73rd Amendment Act, 1992

THREE-TIER STRUCTURE:
1. GRAM PANCHAYAT (Village Level):
• Directly elected by villagers
• Sarpanch as head
• Ward members (Panch)
• Term: 5 years
• Functions: Village development, sanitation, water supply

2. PANCHAYAT SAMITI (Block Level):
• Intermediate tier
• Block Panchayat/Mandal Parishad
• Elected by Gram Panchayat members
• Coordination between village and district

3. ZILLA PANCHAYAT (District Level):
• District-level planning and coordination
• Elected members from Panchayat Samitis
• District Collector as CEO
• Development planning and implementation

CONSTITUTIONAL PROVISIONS (73rd Amendment):
• Article 243: Definitions
• Article 243A: Gram Sabha
• Article 243B: Constitution of Panchayats
• Article 243C: Composition
• Article 243D: Reservation of seats
• Article 243E: Duration
• Article 243F: Disqualifications
• Article 243G: Powers and functions
• Article 243H: Taxation powers
• Article 243I: Finance Commission

URBAN LOCAL BODIES:
Constitutional Status: 74th Amendment Act, 1992

TYPES:
1. MUNICIPAL CORPORATION:
• Large cities (population 10+ lakh)
• Mayor as head
• Municipal Commissioner as CEO
• Ward committees

2. MUNICIPAL COUNCIL:
• Smaller cities and towns
• Chairman/President as head
• Chief Executive Officer

3. NAGAR PANCHAYAT:
• Transitional areas (rural to urban)
• Smaller towns
• Similar to municipal council

FUNCTIONS OF LOCAL BODIES:
11th Schedule (Panchayats):
1. Agriculture and animal husbandry
2. Small scale industries
3. Khadi and village industries
4. Rural housing
5. Drinking water
6. Fuel and fodder
7. Roads and bridges
8. Rural electrification
9. Non-conventional energy
10. Poverty alleviation
11. Education
12. Technical training
13. Adult and non-formal education
14. Libraries
15. Cultural activities
16. Markets and fairs
17. Health and sanitation
18. Family welfare
19. Women and child development
20. Social welfare
21. Public distribution system
22. Community assets

12th Schedule (Municipalities):
1. Urban planning
2. Land use regulation
3. Economic and social development
4. Roads and bridges
5. Water supply
6. Public health and sanitation
7. Fire services
8. Urban forestry
9. Slum improvement
10. Urban poverty alleviation
11. Parks and gardens
12. Cultural and recreational facilities
13. Burials and cremation grounds
14. Cattle pounds
15. Vital statistics
16. Public amenities
17. Slaughter houses
18. Tanneries

RESERVATION PROVISIONS:
• 1/3rd seats for women
• Reservation for SCs/STs in proportion to population
• Reservation for OBCs (as per state policy)
• Rotation of reserved seats

FINANCE:
• Own revenue sources
• Grants from state government
• Finance Commission recommendations
• Central schemes funding
• 14th Finance Commission: 10% of divisible pool to local bodies

CHALLENGES:
• Inadequate devolution of powers
• Financial constraints
• Capacity building needs
• Political interference
• Lack of technical expertise
• Coordination issues

SUCCESS STORIES:
• Kerala: Democratic decentralization
• West Bengal: Panchayati Raj implementation
• Karnataka: Gram Swaraj
• Rajasthan: Social audit and transparency`
    },
    {
      id: 'federalism',
      title: 'Federalism',
      subtitle: 'Centre-State Relations',
      icon: '⚖️',
      color: '#E91E63',
      content: `Indian Federalism is a unique blend of federal and unitary features, often described as 'quasi-federal' or 'cooperative federalism'.

FEDERAL FEATURES:
• Written Constitution
• Division of powers (Union, State, Concurrent Lists)
• Independent Judiciary
• Bicameralism
• Rigid Constitution (for some provisions)

UNITARY FEATURES:
• Strong Centre
• Single Constitution
• Single citizenship
• Integrated judiciary
• All India Services
• Emergency provisions
• Governor appointed by Centre

DIVISION OF POWERS (7th Schedule):
1. UNION LIST (List I): 100 subjects
• Defence
• Foreign affairs
• Currency
• Banking
• Railways
• Posts and telegraphs
• Inter-state trade

2. STATE LIST (List II): 61 subjects
• Police and public order
• Agriculture
• Irrigation
• Land revenue
• Local government
• Public health
• State taxes

3. CONCURRENT LIST (List III): 52 subjects
• Education
• Forest
• Marriage and divorce
• Electricity
• Labour welfare
• Economic planning
• Population control

RESIDUARY POWERS:
• Belong to Union (Article 248)
• Parliament can legislate on subjects not in any list
• Examples: Computer software, internet

CENTRE-STATE ADMINISTRATIVE RELATIONS:
1. NORMAL TIMES:
• Article 256: States comply with Union laws
• Article 257: Centre can give directions
• Article 258: Delegation of functions
• Article 258A: Entrustment of Union functions to states

2. EMERGENCY TIMES:
• Centre can give directions on any matter
• State autonomy suspended
• Union control over state administration

CENTRE-STATE LEGISLATIVE RELATIONS:
• Parliament supremacy in Concurrent List
• Article 254: Repugnancy between Union and State laws
• Union law prevails in case of conflict
• Governor's assent required for certain state bills

CENTRE-STATE FINANCIAL RELATIONS:
1. DISTRIBUTION OF REVENUES:
• Finance Commission recommendations
• Tax devolution formula
• Grants-in-aid to states

2. BORROWING POWERS:
• Union: No restrictions
• States: Need Centre's consent if indebted to Union

3. GOODS AND SERVICES TAX (GST):
• Cooperative federalism in taxation
• GST Council with Centre and states
• Consensus-based decision making

INSTITUTIONS FOR COOPERATION:
1. INTER-STATE COUNCIL (Article 263):
• Investigate disputes
• Coordinate policies
• Make recommendations

2. ZONAL COUNCILS:
• Northern, Central, Eastern, Western, Southern, North-Eastern
• Discuss common problems
• Promote cooperation

3. NATIONAL DEVELOPMENT COUNCIL:
• Planning and development coordination
• Prime Minister as Chairman
• All Chief Ministers as members

DISPUTES AND RESOLUTION:
1. INTER-STATE DISPUTES:
• Water disputes (Article 262)
• Boundary disputes
• River water tribunals

2. CENTRE-STATE DISPUTES:
• Political disputes
• Administrative conflicts
• Financial disagreements

EVOLUTION OF FEDERALISM:
1. NEHRU ERA (1950s-60s):
• Centralized planning
• Strong Centre approach
• National integration priority

2. COALITION ERA (1990s-2000s):
• Regional parties' influence
• Decentralization demands
• Cooperative federalism

3. RECENT TRENDS:
• Competitive federalism
• GST Council model
• Digital governance
• Atmanirbhar Bharat

CHALLENGES:
• Fiscal imbalance
• Political conflicts
• Administrative coordination
• Regional disparities
• Language issues
• Resource sharing

SARKARIA COMMISSION (1983-88):
• Comprehensive review of Centre-State relations
• Recommendations for better coordination
• Emphasis on cooperative federalism

PUNCHI COMMISSION (2007-10):
• Review of working of institutions
• Recommendations for strengthening federalism
• Focus on governance reforms`
    },
    {
      id: 'election_commission',
      title: 'Election Commission',
      subtitle: 'Electoral Process & Management',
      icon: '🗳️',
      color: '#9C27B0',
      content: `The Election Commission of India is a constitutional body responsible for conducting free and fair elections in the country.

CONSTITUTIONAL PROVISIONS:
• Articles 324-329: Elections
• Article 324: Superintendence, direction and control of elections
• Article 325: No person ineligible on grounds of religion, race, caste or sex
• Article 326: Elections to be on basis of adult suffrage

COMPOSITION:
• Chief Election Commissioner (CEC)
• Two Election Commissioners (ECs)
• Originally single-member body (1950-89)
• Multi-member since 1989

APPOINTMENT:
• Appointed by President
• No specific qualifications prescribed
• Term: 6 years or 65 years of age (whichever is earlier)
• Same status and salary as Supreme Court judges

REMOVAL:
• CEC: Same manner as Supreme Court judge (impeachment)
• ECs: Cannot be removed except on recommendation of CEC
• Protection ensures independence

POWERS AND FUNCTIONS:
1. SUPERINTENDENCE AND CONTROL:
• Lok Sabha and Rajya Sabha elections
• State Legislative Assembly elections
• President and Vice-President elections
• Local body elections (if state election commission not established)

2. ADMINISTRATIVE POWERS:
• Preparation of electoral rolls
• Delimitation of constituencies
• Registration of political parties
• Allotment of election symbols
• Model Code of Conduct enforcement

3. QUASI-JUDICIAL POWERS:
• Disqualification of candidates
• Decision on election disputes (subject to court review)
• Cancellation of elections

ELECTORAL PROCESS:
1. PRE-ELECTION:
• Notification of elections
• Filing of nominations
• Scrutiny of nominations
• Withdrawal of candidature
• Allotment of symbols

2. DURING ELECTION:
• Polling arrangements
• Security measures
• Monitoring of expenditure
• Ensuring free and fair polls

3. POST-ELECTION:
• Counting of votes
• Declaration of results
• Election petitions (to courts)

ELECTORAL REFORMS:
1. ELECTRONIC VOTING MACHINES (EVMs):
• Introduced in 1990s
• Faster and accurate counting
• Reduced booth capturing

2. VOTER VERIFIABLE PAPER AUDIT TRAIL (VVPAT):
• Paper trail for verification
• Transparency in electronic voting
• Random verification

3. NONE OF THE ABOVE (NOTA):
• Right to reject all candidates
• Introduced in 2013
• Democratic expression of dissent

4. EXPENDITURE MONITORING:
• Ceiling on election expenditure
• Expenditure observers
• Video surveillance

CHALLENGES:
• Money power in elections
• Criminalization of politics
• Misuse of government machinery
• Communal and caste appeals
• Paid news and social media

RECENT INITIATIVES:
• Digital voter ID cards
• Online voter registration
• Accessible polling stations
• Systematic Voters' Education and Electoral Participation (SVEEP)
• Ethical voting campaigns

LANDMARK DECISIONS:
• Dinesh Goswami Committee (1990)
• Indrajit Gupta Committee (1998)
• Law Commission reports on electoral reforms
• Supreme Court judgments on electoral matters

INTERNATIONAL RECOGNITION:
• Model for other democracies
• Technical assistance to other countries
• Training programs for foreign election officials
• Participation in international election observer missions

STATE ELECTION COMMISSIONS:
• Separate bodies for local elections
• Established under 73rd and 74th Amendments
• Independent of Election Commission of India
• Similar powers for local body elections`
    },
    {
      id: 'civil_services',
      title: 'Civil Services',
      subtitle: 'IAS, IPS, IFS & Other Services',
      icon: '👨‍💼',
      color: '#607D8B',
      content: `Civil Services form the permanent executive of the Indian government, providing continuity and expertise in administration.

CLASSIFICATION:
1. ALL INDIA SERVICES:
• Indian Administrative Service (IAS)
• Indian Police Service (IPS)
• Indian Forest Service (IFoS)

2. CENTRAL SERVICES (Group A):
• Indian Foreign Service (IFS)
• Indian Revenue Service (IRS)
• Indian Audit and Accounts Service (IA&AS)
• Indian Railway Traffic Service (IRTS)
• Indian Defence Accounts Service (IDAS)

3. CENTRAL SERVICES (Group B):
• Central Secretariat Service (CSS)
• Intelligence Bureau (IB)
• Railway Protection Force (RPF)

CONSTITUTIONAL PROVISIONS:
• Articles 308-323: Services under Union and States
• Article 312: All India Services
• Article 315: Public Service Commissions
• Article 320: Functions of PSCs

ALL INDIA SERVICES:
Created by Parliament under Article 312

1. INDIAN ADMINISTRATIVE SERVICE (IAS):
• Successor to Indian Civil Service (ICS)
• Established: 1946
• Cadre strength: ~5000 officers
• Functions: Policy formulation, implementation, district administration

2. INDIAN POLICE SERVICE (IPS):
• Established: 1948
• Cadre strength: ~4500 officers
• Functions: Maintenance of law and order, crime investigation

3. INDIAN FOREST SERVICE (IFoS):
• Established: 1966
• Cadre strength: ~3000 officers
• Functions: Forest conservation, wildlife protection, environmental management

RECRUITMENT:
1. CIVIL SERVICES EXAMINATION:
• Conducted by UPSC
• Three stages: Prelims, Mains, Interview
• Age limit: 21-32 years (relaxation for reserved categories)
• Educational qualification: Graduate degree

2. PROMOTION:
• State civil services officers
• Departmental promotion
• Limited competitive examination

TRAINING:
1. FOUNDATION COURSE:
• Lal Bahadur Shastri National Academy of Administration (LBSNAA), Mussoorie
• Common training for all services
• Duration: 3 months

2. SERVICE-SPECIFIC TRAINING:
• IAS: LBSNAA, Mussoorie (15 months)
• IPS: Sardar Vallabhbhai Patel National Police Academy, Hyderabad
• IFoS: Indira Gandhi National Forest Academy, Dehradun

CADRE SYSTEM:
• State cadre allocation
• Officers serve in allocated state/UT
• Central deputation opportunities
• Inter-cadre transfers (rare)

CAREER PROGRESSION:
• Entry level: Assistant Collector/SP
• Mid-career: Collector/DIG
• Senior level: Secretary/DGP
• Apex level: Cabinet Secretary/Home Secretary

CENTRAL DEPUTATION:
• Ministries and departments
• PSUs and autonomous bodies
• International organizations
• Policy formulation roles

FUNCTIONS:
1. POLICY FORMULATION:
• Advisory role to political executive
• Draft policies and schemes
• Inter-ministerial coordination

2. IMPLEMENTATION:
• Execute government policies
• Monitor program implementation
• Ensure service delivery

3. REGULATORY:
• Licensing and permissions
• Compliance monitoring
• Dispute resolution

4. DEVELOPMENTAL:
• Plan formulation and execution
• Resource mobilization
• Capacity building

CHALLENGES:
• Political interference
• Corruption and rent-seeking
• Lack of specialization
• Resistance to change
• Accountability issues

REFORMS:
1. ADMINISTRATIVE REFORMS COMMISSIONS:
• First ARC (1966-70)
• Second ARC (2005-09)
• Recommendations for modernization

2. RECENT INITIATIVES:
• Lateral entry at joint secretary level
• Performance management system
• Digital governance
• Citizen-centric administration
• Mission Karmayogi (capacity building)

ETHICS AND CONDUCT:
• All India Services (Conduct) Rules
• Code of ethics for civil servants
• Vigilance mechanisms
• RTI compliance
• Conflict of interest guidelines

SIGNIFICANCE:
• Steel frame of administration
• Continuity in governance
• Professional expertise
• National integration
• Democratic governance support`
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
      <StatusBar barStyle="light-content" backgroundColor="#FF9800" />
      
      <LinearGradient
        colors={['#FF9800', '#F57C00']}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Government Structure</Text>
          <View style={{ width: 40 }} />
        </View>
        <Text style={styles.headerSubtitle}>
          Union, State & Local Government Systems
        </Text>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏛️ Government Levels</Text>
          
          {governmentTopics.map((topic) => (
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
          <Text style={styles.sectionTitle}>📊 Key Features</Text>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>🔹 Parliamentary System</Text>
            <Text style={styles.featureText}>
              India follows the Westminster model with a President as Head of State and Prime Minister as Head of Government.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>🔹 Federal Structure</Text>
            <Text style={styles.featureText}>
              Three-tier government system: Union (Centre), State, and Local levels with defined powers and responsibilities.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>🔹 Separation of Powers</Text>
            <Text style={styles.featureText}>
              Executive, Legislative, and Judiciary work independently with checks and balances.
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
  featureCard: {
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
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default GovernmentScreen;