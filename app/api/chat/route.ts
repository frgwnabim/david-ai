const covidKnowledgeBase = {
  symptoms: {
    keywords: ["gejala", "symptom", "sakit", "demam", "batuk", "sesak", "fever", "cough", "shortness"],
    response: `COVID-19 symptoms typically appear 2-14 days after exposure to the virus. Common symptoms include:

**Mild to Moderate:**
- Fever or chills (temperature 37.5°C - 38.5°C)
- Cough (usually dry)
- Fatigue or tiredness
- Loss of taste or smell
- Difficulty breathing or shortness of breath

**Severe Symptoms (Seek Medical Help Immediately):**
- Persistent pain or pressure in the chest
- Confusion
- Inability to wake or stay awake
- Bluish lips or face

**Important:** Not everyone with COVID-19 will have all symptoms. Some people are asymptomatic (no symptoms at all).

If you have symptoms, get tested and consult a healthcare professional.`,
  },

  temperature: {
    keywords: ["suhu", "temperature", "demam", "fever", "thermometer", "derajat"],
    response: `**Temperature Guidelines:**

**Normal:** 36.5°C - 37.5°C
- No action needed

**Elevated:** 37.5°C - 38.5°C
- Monitor symptoms
- Rest and stay hydrated
- Take paracetamol or ibuprofen if needed
- Isolate if you have COVID-19 symptoms

**Fever:** 38.5°C - 39.5°C
- Likely sign of infection
- Get tested for COVID-19
- Stay home and isolate
- Consult a doctor if symptoms worsen

**High Fever:** Above 39.5°C
- Seek medical attention
- Go to nearest health facility
- Call emergency services if severe

**Tips:**
- Measure temperature when you feel unwell
- Use a reliable thermometer
- Measure in the morning and evening
- Stay hydrated and rest`,
  },

  vaccination: {
    keywords: ["vaksin", "vaccine", "vaksinasi", "vaccination", "booster", "dosis"],
    response: `**COVID-19 Vaccination Information:**

**Why Vaccinate?**
- Reduces risk of severe illness by 90%+
- Prevents hospitalization
- Protects vulnerable populations
- Helps achieve community immunity

**Vaccine Types:**
- mRNA vaccines (Pfizer, Moderna)
- Viral vector vaccines (AstraZeneca, Johnson & Johnson)
- Protein subunit vaccines (Novavax)
- Inactivated vaccines (Sinovac, Sinopharm)

**Vaccination Schedule:**
- Primary series: 2 doses (4 weeks apart for most vaccines)
- Booster: Recommended 6-12 months after primary series
- Additional boosters: For immunocompromised individuals

**Side Effects (Usually Mild):**
- Arm soreness
- Fatigue
- Headache
- Low-grade fever
- Usually resolve within 24-48 hours

**Consult your healthcare provider for personalized vaccination advice.**`,
  },

  prevention: {
    keywords: ["pencegahan", "prevention", "cara", "how", "hindari", "avoid", "protokol", "protocol"],
    response: `**COVID-19 Prevention Measures:**

**Personal Protection:**
- Wear N95/KN95 masks in crowded areas
- Maintain 1-2 meter distance from others
- Wash hands frequently with soap and water (20 seconds)
- Use hand sanitizer (60%+ alcohol) when soap unavailable
- Avoid touching face, eyes, nose, mouth

**Home & Environment:**
- Ensure good ventilation
- Clean and disinfect frequently touched surfaces
- Isolate if sick (at least 5-10 days)
- Wear mask around others if you must go out

**Lifestyle:**
- Get adequate sleep (7-9 hours)
- Exercise regularly
- Eat nutritious food
- Manage stress
- Stay hydrated

**When to Isolate:**
- Positive COVID-19 test
- Symptoms of COVID-19
- Close contact with confirmed case
- Isolate for at least 5-10 days

**Testing:**
- Get tested if symptomatic
- Rapid antigen test: Results in 15-30 minutes
- PCR test: More accurate, results in 24-48 hours`,
  },

  testing: {
    keywords: ["tes", "test", "rapid", "pcr", "antigen", "swab", "diagnosis"],
    response: `**COVID-19 Testing Guide:**

**Test Types:**

1. **Rapid Antigen Test**
   - Results: 15-30 minutes
   - Accuracy: 80-95%
   - Cost: Affordable
   - Best for: Quick screening

2. **PCR Test (Gold Standard)**
   - Results: 24-48 hours
   - Accuracy: 95-99%
   - Cost: Moderate
   - Best for: Confirmation

3. **Antibody Test**
   - Results: 1-3 days
   - Detects: Past infection
   - Best for: Immunity assessment

**When to Test:**
- Have COVID-19 symptoms
- Close contact with confirmed case
- Before visiting vulnerable people
- After travel
- Workplace/school requirements

**Test Procedure:**
- Nasal or throat swab
- Quick and painless
- Results provided immediately or via email

**Positive Result:**
- Isolate for 5-10 days
- Notify close contacts
- Consult healthcare provider
- Monitor symptoms

**Negative Result:**
- If symptomatic, retest after 24-48 hours
- Continue preventive measures`,
  },

  quarantine: {
    keywords: ["karantina", "quarantine", "isolasi", "isolation", "lockdown"],
    response: `**Quarantine & Isolation Guidelines:**

**Quarantine (After Exposure):**
- Duration: 5-10 days depending on vaccination status
- Monitor for symptoms
- Get tested on day 5-6
- Wear mask around others
- Maintain distance

**Isolation (If Positive/Symptomatic):**
- Duration: Minimum 5 days, up to 10 days
- Stay in separate room if possible
- Use separate bathroom
- Don't share personal items
- Wear mask when around others
- Improve ventilation

**During Isolation:**
- Rest and stay hydrated
- Monitor symptoms
- Take medications as needed
- Avoid strenuous activity
- Stay mentally active (reading, movies, etc.)

**When to Seek Help:**
- Difficulty breathing
- Persistent chest pain
- Confusion
- Inability to wake/stay awake
- Severe symptoms

**Return to Normal:**
- After 5 days: If symptoms improving and fever-free for 24 hours
- Continue precautions for next 5 days
- Wear mask in public
- Maintain distance from others`,
  },

  mental_health: {
    keywords: ["mental", "stress", "anxiety", "depresi", "depression", "kesehatan jiwa", "psychological"],
    response: `**Mental Health During COVID-19:**

**Common Challenges:**
- Anxiety and worry
- Depression and isolation
- Sleep disturbances
- Stress from uncertainty
- Grief and loss

**Coping Strategies:**

1. **Daily Routine:**
   - Maintain regular sleep schedule
   - Exercise regularly (30 min/day)
   - Eat healthy meals
   - Limit news consumption

2. **Social Connection:**
   - Video calls with family/friends
   - Online communities
   - Support groups
   - Stay connected despite isolation

3. **Stress Management:**
   - Meditation and mindfulness
   - Deep breathing exercises
   - Yoga or stretching
   - Hobbies and creative activities

4. **Professional Help:**
   - Consult mental health professional
   - Therapy (online available)
   - Counseling services
   - Crisis hotlines

**Self-Care Tips:**
- Practice gratitude
- Limit social media
- Spend time in nature (safely)
- Engage in enjoyable activities
- Be kind to yourself

**Resources:**
- Mental health hotlines
- Online therapy platforms
- Support groups
- Community services`,
  },

  general: {
    keywords: [],
    response: `Welcome to DAVID AI - COVID-19 Information Assistant!

I can help you with information about:
- **Symptoms**: Learn about COVID-19 symptoms and when to seek help
- **Temperature**: Get guidance based on body temperature readings
- **Vaccination**: Information about vaccines and immunization
- **Prevention**: How to protect yourself and others
- **Testing**: Types of tests and when to get tested
- **Quarantine**: Isolation guidelines and duration
- **Mental Health**: Support for psychological wellbeing

**How to Use:**
1. Ask any question about COVID-19
2. Use the camera button to check your temperature
3. Get personalized guidance based on your situation

**Important:** I'm an information assistant, not a doctor. Always consult healthcare professionals for medical advice.

What would you like to know about COVID-19?`,
  },
}

function generateMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  // Check each knowledge base category
  for (const [category, data] of Object.entries(covidKnowledgeBase)) {
    if (category === "general") continue

    const keywords = (data as any).keywords
    if (keywords.some((keyword: string) => lowerMessage.includes(keyword))) {
      return (data as any).response
    }
  }

  // If no specific match, provide general response
  return covidKnowledgeBase.general.response
}

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json()

    if (!message || typeof message !== "string") {
      return Response.json({ error: "Invalid message format" }, { status: 400 })
    }

    const response = generateMockResponse(message)

    return Response.json({
      response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Chat API error:", error)
    return Response.json({ error: "Failed to process message" }, { status: 500 })
  }
}
