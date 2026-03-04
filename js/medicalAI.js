const wiaamMedicalAI = {
    greetings: ["hello", "hi", "hey", "مرحبا", "هلا", "السلام", "كيف حالك", "مرحباً"],
    greeting_responses_en: [
        "Hello! I am Wiaam's Advanced Medical AI Agent. You can describe your symptoms, ask about diseases, or inquire about medications. How may I help?",
        "Greetings! As your digital health assistant, I can help you understand your health, find a specialist, or assist with daily medical queries. What do you need today?"
    ],
    greeting_responses_ar: [
        "مرحباً! أنا المساعد الطبي المتقدم لوئام. يمكنك وصف أعراضك، السؤال عن الأمراض، أو الاستفسار عن الأدوية. كيف يمكنني مساعدتك؟",
        "أهلاً بك! كمساعدك الصحي الرقمي، يمكنني مساعدتك في فهم حالتك الصحية، العثور على طبيب، أو الإجابة على استفساراتك اليومية."
    ],

    knowledge_base: [
        // NERVOUS SYSTEM & HEAD
        {
            keywords: ["headache", "migraine", "صداع", "شقيقة", "رأسي يوجعني"],
            en: "For a headache, ensure you are well-hydrated and rested. Over-the-counter pain relievers like Paracetamol or Ibuprofen can help. If it's a severe, sudden 'worst-headache-of-your-life', accompanied by vision changes or neck stiffness, seek emergency care immediately.",
            ar: "بالنسبة للصداع، تأكد من شرب السوائل وأخذ قسط من الراحة. المسكنات التي لا تستلزم وصفة طبية مثل الباراسيتامول قد تساعد. إذا كان الصداع شديداً جداً ومفاجئاً، أو مصحوباً بتغيرات في الرؤية وتيبس في الرقبة، يرجى التوجه للطوارئ فوراً.",
            specialty: "Neurology"
        },
        // CARDIOVASCULAR
        {
            keywords: ["heart", "chest", "pain", "palpitations", "قلب", "صدر", "خفقان", "نبض"],
            en: "Chest pain or heart palpitations can be serious. If the pain is crushing, radiating to your left arm or jaw, or accompanied by shortness of breath and sweating, CALL EMERGENCY SERVICES (997) IMMEDIATELY. For minor, non-cardiac palpitations, consult a cardiologist for an ECG.",
            ar: "ألم الصدر أو خفقان القلب قد يكون خطيراً. إذا كان الألم ضاغطاً ويمتد للذراع الأيسر أو الفك، أو مصحوباً بضيق تنفس، اتصل بالطوارئ (997) فوراً. للخفقان البسيط، راجع طبيب قلب لعمل تخطيط.",
            specialty: "Cardiology"
        },
        {
            keywords: ["blood pressure", "hypertension", "طغط", "ضغط الدم"],
            en: "High blood pressure (hypertension) often has no symptoms but increases the risk of heart disease and stroke. It is managed through a low-sodium diet, regular exercise, stress management, and prescribed antihypertensive medications. Have it checked regularly.",
            ar: "ارتفاع ضغط الدم غالباً لا يسبب أعراضاً ولكنه يزيد من خطر أمراض القلب. يتم التحكم فيه عبر نظام غذائي قليل الصوديوم، الرياضة، والأدوية الموصوفة. يجب فحصه بانتظام.",
            specialty: "Cardiology"
        },
        // GASTROINTESTINAL
        {
            keywords: ["stomach", "pain", "nausea", "vomit", "بطن", "مغص", "غثيان", "استفراغ", "إسهال", "diarrhea", "constipation", "إمساك"],
            en: "Gastrointestinal symptoms like stomach pain, nausea, or altered bowel habits can have many causes (food poisoning, IBS, viral infections). Stay hydrated with clear fluids. Avoid heavy or spicy foods. If you experience severe pain, high fever, or blood in your stool, see a doctor urgently.",
            ar: "أعراض الجهاز الهضمي كألم البطن أو الغثيان قد تكون نتيجة لنزلة معوية، قولون عصبي، أو تسمم غذائي. حافظ على رطوبة جسمك. إذا عانيت من ألم حاد جداً، حمى عالية، أو دم في البراز، راجع الطبيب فوراً.",
            specialty: "Gastroenterology"
        },
        {
            keywords: ["acid", "reflux", "heartburn", "حموضة", "ارتجاع", "حرقان"],
            en: "Acid reflux or heartburn is caused by stomach acid irritating the esophagus. Try eating smaller meals, not lying down immediately after eating, and avoiding spicy or fatty foods. Over-the-counter antacids or proton pump inhibitors (PPIs) may provide relief.",
            ar: "الحموضة أو الارتجاع المريئي يسببه حمض المعدة. حاول تناول وجبات أصغر، ولا تستلقِ بعد الأكل مباشرة، وتجنب الأطعمة الحارة أو الدهنية. مضادات الحموضة قد تساعدك.",
            specialty: "Gastroenterology"
        },
        // RESPIRATORY
        {
            keywords: ["cough", "throat", "breath", "سعال", "كحة", "حلق", "تنفس", "asthma", "ربو"],
            en: "Respiratory symptoms like cough or shortness of breath can indicate asthma, infections, or allergies. For a mild viral cough, rest and warm fluids help. For asthma, use your prescribed inhaler. If you struggle to breathe, have chest tightness, or your lips turn blue, seek emergency care.",
            ar: "أعراض الجهاز التنفسي مثل السعال أو ضيق التنفس قد تشير لربو أو عدوى. للسعال الفيروسي البسيط، الراحة والسوائل الدافئة تفيد. لمريض الربو استخدم البخاخ. إذا واجهت صعوبة شديدة في التنفس، توجه للطوارئ.",
            specialty: "Pulmonology"
        },
        // ENDOCRINE / METABOLIC
        {
            keywords: ["diabetes", "sugar", "insulin", "سكري", "سكر", "انسولين", "عطش"],
            en: "Managing diabetes requires balancing diet, exercise, and medication (like Metformin or Insulin). Monitor your blood glucose levels. Symptoms like extreme thirst, frequent urination, and unexplained weight loss warrant an immediate check of your HbA1c levels.",
            ar: "إدارة مرض السكري تتطلب موازنة الغذاء والرياضة والأدوية. راقب مستويات السكر. أعراض مثل العطش الشديد وكثرة التبول تتطلب فحصاً فورياً للدم (السكر التراكمي).",
            specialty: "Endocrinology"
        },
        {
            keywords: ["thyroid", "weight gain", "weight loss", "fatigue", "غدة", "درقية", "وزن", "تعب", "إرهاق"],
            en: "Unexplained weight changes, extreme fatigue, and feeling constantly cold or hot can be signs of a thyroid disorder (hypothyroidism or hyperthyroidism). A simple blood test checking your TSH levels can help diagnose this.",
            ar: "تغيرات الوزن غير المبررة، التعب الشديد، والشعور الدائم بالبرد أو الحر قد تكون علامات لاضطراب الغدة الدرقية. فحص دم بسيط لهرمون TSH يمكن أن يساعد في التشخيص.",
            specialty: "Endocrinology"
        },
        // WOMEN'S HEALTH
        {
            keywords: ["pregnancy", "baby", "pregnant", "حمل", "حامل", "جنين", "دورة", "period", "cramps"],
            en: "For women's health issues, including pregnancy tracking or severe menstrual cramps, consulting a specialist is best. During pregnancy, take prenatal vitamins with folic acid. If you experience severe pelvic pain or abnormal bleeding, contact your doctor promptly.",
            ar: "في قضايا صحة المرأة، بما في ذلك متابعة الحمل أو آلام الدورة الشديدة، يفضل استشارة طبيبة مختصة. أثناء الحمل، تناولي الفيتامينات وحمض الفوليك. عند وجود نزيف غير طبيعي أو ألم حاد، راجعي الطبيبة.",
            specialty: "Obstetrics and Gynecology"
        },
        // MEN'S HEALTH & UROLOGY
        {
            keywords: ["urinate", "urine", "kidney", "prostate", "بول", "كلى", "بروستات", "تبول"],
            en: "Issues like pain during urination, frequent urging, or lower back pain can indicate a Urinary Tract Infection (UTI) or kidney stones. In older men, it may indicate enlarged prostate (BPH). Drink plenty of water and see a urologist for appropriate antibiotics or screening.",
            ar: "حرقة التبول، كثرة الإلحاح، أو ألم أسفل الظهر قد تشير لعدوى في المسالك البولية أو حصى في الكلى. تضخم البروستات شائع عند كبار السن. اشرب الكثير من الماء وراجع طبيب المسالك البولية.",
            specialty: "Urology"
        },
        {
            keywords: ["hair loss", "baldness", "تساقط", "شعر", "صلع"],
            en: "Hair loss, such as male or female pattern baldness (Androgenetic alopecia), is common and often genetic. Medical treatments today include topical Minoxidil, oral medications like Finasteride, or surgical options like hair stem cell transplants. Consult a dermatologist for an evaluation.",
            ar: "تساقط الشعر، مثل الصلع الوراثي، شائع جداً. العلاجات الطبية اليوم تشمل المينوكسيديل الموضعي، الأدوية الفموية مثل الفيناسترايد، أو الخيارات الجراحية كزراعة الشعر. استشر طبيب جلدية للتقييم.",
            specialty: "Dermatology"
        },
        // DERMATOLOGY
        {
            keywords: ["skin", "rash", "itch", "جلد", "طفح", "حكة", "حساسية", "acne", "حب شباب", "eczema", "إكزيما"],
            en: "Skin conditions like acne, eczema, or mysterious rashes are very common. Use gentle, fragrance-free cleansers and moisturizers. For persistent acne, a dermatologist might prescribe retinoids or antibiotics. If a mole changes size or color, get it checked immediately.",
            ar: "الأمراض الجلدية كحب الشباب أو الإكزيما شائعة جداً. استخدم مرطبات خالية من العطور. لحب الشباب المستعصي، قد يصف الطبيب الريتينويد. إذا تغير حجم أو لون شامة، يجب فحصها فوراً.",
            specialty: "Dermatology"
        },
        // ORTHOPEDICS & RHEUMATOLOGY
        {
            keywords: ["bone", "joint", "fracture", "muscle", "back pain", "عظم", "مفصل", "كسر", "عضل", "ظهر", "arthritis"],
            en: "For muscle or joint pain (like back pain or arthritis), gentle stretching and over-the-counter anti-inflammatories are first-line treatments. For acute sprains, remember RICE: Rest, Ice, Compression, Elevation. If severe swelling or inability to bear weight occurs, an X-ray is needed.",
            ar: "لآلام العضلات أو المفاصل (مثل ألم الظهر)، الإطالة الخفيفة ومضادات الالتهاب هي العلاج الأولي. للالتواءات، اتبع: الراحة، الثلج، الضغط، الرفع. إذا كان التورم شديداً، يجب عمل أشعة.",
            specialty: "Orthopedics"
        },
        // PEDIATRICS
        {
            keywords: ["child", "baby", "pediatric", "kid", "طفل", "رضيع", "أطفال"],
            en: "Children have unique medical needs. For a child with a fever, ensure they are drinking fluids. Do not give aspirin to children. If a baby under 3 months has a fever over 38°C (100.4°F), or if any child has a stiff neck, persistent vomiting, or extreme lethargy, see a pediatrician immediately.",
            ar: "للأطفال احتياجات طبية خاصة. إذا كان طفلك يعاني من حمى، تأكد من شربه للسوائل. لا تعطِ الأسبرين للأطفال. إذا كان عمر الرضيع أقل من 3 أشهر وحرارته فوق 38، أو إذا كان الطفل يعاني من خمول شديد، راجع طبيب الأطفال فوراً.",
            specialty: "Pediatrics"
        },
        // OPHTHALMOLOGY & ENT
        {
            keywords: ["eye", "vision", "blurry", "عين", "رؤية", "نظر"],
            en: "Eye issues like redness or dry eyes can often be treated with lubricating eye drops. However, sudden blurry vision, flashes of light, or severe eye pain are medical emergencies that require immediate evaluation by an ophthalmologist.",
            ar: "مشاكل العين كالاحمرار والجفاف يمكن علاجها بقطرات الترطيب. لكن التشوش المفاجئ في الرؤية، أو ومضات الضوء، أو الألم الشديد يتطلب فحصاً عاجلاً لدى طبيب عيون.",
            specialty: "Ophthalmology"
        },
        {
            keywords: ["ear", "nose", "sinus", "hearing", "أذن", "أنف", "جيوب", "سمع"],
            en: "Ear aches, sinus pressure, and sore throats are often linked. Saline nasal sprays and warm compresses can relieve sinus pain. Ear infections may require antibiotics if persistent. Sudden hearing loss should be evaluated immediately by an ENT specialist.",
            ar: "ألم الأذن وضغط الجيوب الأنفية غالباً مرتبطان. بخاخات الأنف الملحية قد تخفف الألم. التهاب الأذن قد يتطلب مضادات حيوية. فقدان السمع المفاجئ يجب تقييمه فوراً.",
            specialty: "ENT"
        },
        // PSYCHIATRY & MENTAL HEALTH
        {
            keywords: ["anxiety", "stress", "depression", "sad", "mental", "قلق", "توتر", "اكتئاب", "حزن", "نفسي"],
            en: "Mental health is just as important as physical health. Symptoms of anxiety or depression (persistent sadness, loss of interest, sleep changes) are common and highly treatable through therapy and/or medication. Please consider speaking with a mental health professional.",
            ar: "الصحة النفسية بأهمية الصحة الجسدية. أعراض القلق والاكتئاب (الحزن المستمر، فقدان الشغف، تغيرات النوم) شائعة وقابلة للعلاج عبر الجلسات النفسية و/أو الأدوية. نرجو منك التحدث مع أخصائي نفسي.",
            specialty: "Psychiatry"
        },
        // INFECTIOUS DISEASES / GENERAL
        {
            keywords: ["fever", "temperature", "infection", "cold", "flu", "حمى", "حرارة", "سخونة", "زكام", "انفلونزا"],
            en: "A fever is usually your body fighting an infection like a cold or the flu. Rest, hydrate, and use Paracetamol to manage temperature. If a fever persists for more than 3-4 days, is very high, or if you have difficulty breathing, consult a physician.",
            ar: "الحمى هي وسيلة الجسم لمحاربة العدوى كالزكام أو الأنفلونزا. ارتح، اشرب سوائل، واستخدم الباراسيتامول لخفض الحرارة. إذا استمرت الحمى لأكثر من 3 أيام أو صاحبها ضيق تنفس، استشر الطبيب.",
            specialty: "Internal Medicine"
        },
        // DENTISTRY
        {
            keywords: ["tooth", "teeth", "dental", "gum", "أسنان", "سن", "لثة", "ضرس"],
            en: "Toothaches or bleeding gums can indicate cavities or periodontal disease. Rinse with warm salt water and use over-the-counter pain relievers to manage pain until you can see a dentist. Good oral hygiene is critical for overall health.",
            ar: "ألم الأسنان أو نزيف اللثة قد يشير إلى تسوس أو التهاب. تمضمض بماء دافئ وملح واستخدم مسكنات الألم حتى تراجع طبيب الأسنان.",
            specialty: "Dentistry"
        },
        {
            // Fallback for medical terms without a specific handler
            keywords: ["doctor", "medicine", "hospital", "sick", "pain", "طبيب", "دواء", "مستشفى", "مريض", "ألم"],
            en: "I understand you have a medical concern. While I provide general guidance, accurate diagnosis and treatment require a professional evaluation. Please book an appointment with a Wiaam specialist.",
            ar: "أتفهم أن لديك استفساراً طبياً. لضمان التشخيص والعلاج الدقيق، يرجى حجز موعد مع طبيب مختص عبر منصة وئام.",
            specialty: "General Practice"
        }
    ],

    // Platform Navigation
    navigation: [
        {
            keywords: ["book", "appointment", "schedule", "حجز", "موعد", "احجز"],
            en: "You can book an appointment easily! Just go to the 'Find a Hospital' section or use the 'Book Appointment' button on your Patient Dashboard calendar.",
            ar: "يمكنك حجز موعد بسهولة! اذهب إلى قسم 'البحث عن مستشفى' أو استخدم زر 'حجز موعد' في تقويم بوابة المريض الخاصة بك."
        },
        {
            keywords: ["pharmacy", "medicine", "drug", "صيدلية", "دواء", "علاج"],
            en: "Most major hospitals in our network, such as KFMC, have 24/7 on-site pharmacies to dispense your medications.",
            ar: "معظم المستشفيات الكبرى في شبكتنا تمتلك صيدليات تعمل على مدار الساعة لصرف أدويتك."
        },
        {
            keywords: ["emergency", "ambulance", "طوارئ", "اسعاف", "عاجل"],
            en: "🚨 MEDICAL EMERGENCY: Please dial 997 (Red Crescent) immediately if you are in Saudi Arabia, or visit the nearest Emergency Department.",
            ar: "🚨 حالة طوارئ طبية: يرجى الاتصال على 997 (الهلال الأحمر) فوراً، أو التوجه لأقرب قسم طوارئ."
        },
        {
            keywords: ["profile", "record", "history", "ملف", "سجل", "تاريخ"],
            en: "Your complete unified medical record is safe and accessible. Log in with your National ID and navigate to the 'My Unified Profile' tab.",
            ar: "سجلك الطبي الموحد كامل وآمن. سجل الدخول بهويتك الوطنية وانتقل إلى علامة التبويب 'ملفي الموحد'."
        }
    ],

    processMessage: function (message, currentLang) {
        const msg = message.toLowerCase();

        // 1. Check Greetings
        for (let word of this.greetings) {
            // we use regex for exact word match to avoid accidental triggers
            let regex = new RegExp("\\b" + word + "\\b", "i");
            if (regex.test(msg) || (msg.length < 15 && msg.includes(word))) {
                return currentLang === 'en'
                    ? this.greeting_responses_en[Math.floor(Math.random() * this.greeting_responses_en.length)]
                    : this.greeting_responses_ar[Math.floor(Math.random() * this.greeting_responses_ar.length)];
            }
        }

        // 2. Check Emergency explicitly first
        if (msg.includes("emergency") || msg.includes("heart attack") || msg.includes("stroke") || msg.includes("bleeding heavily") || msg.includes("طوارئ") || msg.includes("جلطة") || msg.includes("نزيف")) {
            return currentLang === 'en'
                ? "🚨 **MEDICAL EMERGENCY**: Please stop chatting and dial 997 immediately, or go to the nearest Emergency Room. Wiaam AI cannot provide emergency medical care."
                : "🚨 **حالة طوارئ طبية**: يرجى التوقف عن المحادثة والاتصال بـ 997 فوراً، أو التوجه لأقرب قسم طوارئ المساعدة الطبية العاجلة.";
        }

        // 3. Check navigation/platform stuff
        for (let item of this.navigation) {
            for (let kw of item.keywords) {
                if (msg.includes(kw) && msg.length < 40) { // Keep it tight for nav commands
                    return currentLang === 'en' ? item.en : item.ar;
                }
            }
        }

        // 4. Check massive medical knowledge base
        let matchedTopics = [];
        for (let condition of this.knowledge_base) {
            for (let kw of condition.keywords) {
                if (msg.includes(kw)) {
                    matchedTopics.push(condition);
                    break; // Move to next condition to avoid double-counting same condition
                }
            }
        }

        if (matchedTopics.length > 0) {
            // Sort to ensure more specific topics (earlier in array/longer keywords) might win, but simple array order is fine for mock.
            // Just take the first matching topic mapping.
            let primaryMatch = matchedTopics[0];
            let response = currentLang === 'en' ? primaryMatch.en : primaryMatch.ar;

            // Add a recommendation to see a specialist if applicable
            if (primaryMatch.specialty && primaryMatch.specialty !== "General Practice") {
                let rec = currentLang === 'en'
                    ? `\n\n💡 I recommend searching the 'Doctors' tab for a specialist in **${primaryMatch.specialty}** for evaluation and personalized treatment.`
                    : `\n\n💡 أوصي بالبحث في علامة التبويب "الأطباء" عن أخصائي في **${primaryMatch.specialty}** للتقييم الدقيق والحصول على العلاج المناسب.`;
                response += rec;
            }
            return response;
        }

        // 5. LLM Fallback (Simulated dynamic response for unknown complex medical questions)
        if (msg.length > 20) {
            return currentLang === 'en'
                ? "This is a highly specific medical query. As an AI health assistant, I analyze your symptoms against evidence-based medical guidelines. Since your condition requires physical examination, lab work, or a nuanced professional diagnosis, please use the Wiaam portal to book a consultation with one of our licensed physicians immediately."
                : "هذا استفسار طبي دقيق جداً. بصفتي مساعد صحي ذكاء اصطناعي، أرى أن حالتك تتطلب فحصاً سريرياً أو تحاليل لتشخيص دقيق. يرجى استخدام منصة وئام لحجز استشارة مع أحد أطبائنا المرخصين في أقرب وقت.";
        }

        // Absolute fallback for short nonsense
        return currentLang === 'en'
            ? "I am Wiaam's Advanced Medical AI Agent. You can describe your symptoms (e.g. 'I have a fever and cough'), ask medical questions ('what is diabetes?'), or book an appointment."
            : "أنا المساعد الطبي الذكي في وئام. يمكنك وصف أعراضك (مثل 'عندي حمى وسعال')، طرح أسئلة طبية ('ما هو السكري؟')، أو طلب حجز موعد.";
    }
};

window.wiaamMedicalAI = wiaamMedicalAI;
