/**
 * Wiaam NoSQL Database Layer
 * Mimics Google Firebase structure (Collections and Documents) using LocalStorage
 * to ensure the app works instantly without requiring cloud API keys.
 */

const DB_KEY = 'wiaam_database';
const DB_VERSION = '2.2'; // Update this to force-refresh all users' data

// Initial Seed Data
const defaultData = {
    users: {
        // Patients (Existing + 7 New)
        "1010101010": {
            password: "password123",
            name: "Ahmed Al-Saud",
            bloodType: "O+",
            age: "32",
            gender: "Male",
            dob: "1994-01-01",
            phone: "+966 50 123 4567",
            email: "ahmed@example.com",
            emContact: "Khalid Al-Saud",
            emPhone: "+966 50 765 4321",
            pcp: "Dr. Faisal Al-Harbi",
            caregiver: "None",
            allergies: "Penicillin",
            chronic: "Asthma",
            surgeries: "Appendectomy (2015)",
            familyHx: "Diabetes (Type 2 - Father)",
            meds: "Albuterol Inhaler (As needed)",
            supplements: "Vitamin D3 1000 IU",
            role: "patient",
            updated_at: new Date().toISOString()
        },
        "2020202020": {
            password: "password123",
            name: "Fatima Al-Rashid",
            bloodType: "A+",
            age: "28",
            gender: "Female",
            dob: "1997-05-15",
            phone: "+966 55 987 6543",
            email: "fatima@example.com",
            emContact: "Ali Al-Rashid",
            emPhone: "+966 55 345 6789",
            pcp: "Dr. Sara Al-Saud",
            caregiver: "None",
            allergies: "None",
            chronic: "None",
            surgeries: "None",
            familyHx: "Hypertension (Mother)",
            meds: "None",
            supplements: "Iron Supplements",
            role: "patient",
            updated_at: new Date().toISOString()
        },
        "3030303030": {
            password: "password123",
            name: "Omar Tariq",
            bloodType: "B-",
            age: "45",
            gender: "Male",
            dob: "1980-11-20",
            phone: "+966 59 111 2222",
            email: "omar@example.com",
            emContact: "Noura Tariq",
            emPhone: "+966 59 333 4444",
            pcp: "Dr. Ahmed Tariq",
            caregiver: "Noura Tariq",
            allergies: "Sulfa Drugs",
            chronic: "Type 2 Diabetes, Hypertension",
            surgeries: "Knee Replacement (2020)",
            familyHx: "Heart Disease",
            meds: "Metformin, Lisinopril",
            supplements: "None",
            role: "patient",
            updated_at: new Date().toISOString()
        },
        "4040404040": { password: "password123", name: "Sara Mansour", role: "patient", bloodType: "AB+", age: "25", phone: "+966 12 345 6789" },
        "4141414141": { password: "password123", name: "Khalid Ibrahim", role: "patient", bloodType: "O-", age: "40", phone: "+966 98 765 4321" },
        "4242424242": { password: "password123", name: "Muna Jaber", role: "patient", bloodType: "A-", age: "35", phone: "+966 54 321 0987" },
        "4343434343": { password: "password123", name: "Zaid Abdullah", role: "patient", bloodType: "B+", age: "50", phone: "+966 67 890 1234" },
        "4444444444": { password: "password123", name: "Hana Sultan", role: "patient", bloodType: "O+", age: "22", phone: "+966 11 222 3333" },
        "4545454545": { password: "password123", name: "Yousef Ali", role: "patient", bloodType: "A+", age: "60", phone: "+966 44 555 6666" },
        "4646464646": { password: "password123", name: "Deema Faisal", role: "patient", bloodType: "B-", age: "29", phone: "+966 77 888 9999" },

        // Medical Staff (15 New)
        "5050505050": { password: "password123", name: "Dr. Faisal Al-Harbi", role: "staff", specialty: "Cardiology" },
        "5151515151": { password: "password123", name: "Dr. Sara Al-Saud", role: "staff", specialty: "Neurology" },
        "5252525252": { password: "password123", name: "Dr. Ahmed Tariq", role: "staff", specialty: "Pediatrics" },
        "5353535353": { password: "password123", name: "Nurse Layla", role: "staff", specialty: "General Care" },
        "5454545454": { password: "password123", name: "Dr. Khaled Bakr", role: "staff", specialty: "Orthopedics" },
        "5555555555": { password: "password123", name: "Nurse Mohammed", role: "staff", specialty: "Emergency" },
        "5656565656": { password: "password123", name: "Dr. Reem Adel", role: "staff", specialty: "Internal Medicine" },
        "5757575757": { password: "password123", name: "Nurse Hanan", role: "staff", specialty: "Pediatrics" },
        "5858585858": { password: "password123", name: "Dr. Yasser Fawzi", role: "staff", specialty: "General Surgery" },
        "5959595959": { password: "password123", name: "Nurse Amal", role: "staff", specialty: "ICU" },
        "6060606060": { password: "password123", name: "Dr. Nora Khalid", role: "staff", specialty: "Dermatology" },
        "6161616161": { password: "password123", name: "Nurse Sultan", role: "staff", specialty: "Oncology" },
        "6262626262": { password: "password123", name: "Dr. Maha Sami", role: "staff", specialty: "Ophthalmology" },
        "6363636363": { password: "password123", name: "Nurse Fahad", role: "staff", specialty: "Radiology" },
        "6464646464": { password: "password123", name: "Dr. Sami Jameel", role: "staff", specialty: "ENT" },

        // Admin
        "9090909090": { password: "password123", name: "System Admin", role: "admin" }
    },
    doctors: [
        {
            id: '5151515151',
            name_en: 'Dr. Sara Al-Saud', name_ar: 'د. سارة آل سعود',
            specialty_en: 'Neurology', specialty_ar: 'أعصاب',
            hospital_id: 1, hospital_name_en: 'King Faisal Specialist Hospital',
            qualifications_en: 'MD from King Saud University, Board Certified in Neurology', qualifications_ar: 'دكتوراه في الطب من جامعة الملك سعود، بورد في الأعصاب',
            about_en: 'Dr. Sara is a dedicated neurologist with over 12 years of experience specializing in neurodegenerative diseases and patient-centered care.',
            about_ar: 'د. سارة طبيبة أعصاب مكرسة بخبرة تزيد عن 12 عاماً متخصصة في الأمراض العصبية والرعاية التي تركز على المريض.',
            available_days: ['Tuesday', 'Thursday'],
            rating: 4.8, reviewCount: 124, price: 500,
            visits: "3.2k", patients: "1.5k", exp: "12 years",
            reviews: [
                { user: "Allison Dorwart", rating: 5, date: "19 May 2024", text: "Dr. Sara was thorough, attentive, and took the time to answer all my questions in detail. I left feeling confident in my health." },
                { user: "Nuraiz Donin", rating: 4, date: "18 May 2024", text: "Very professional and friendly. Highly recommended." }
            ]
        },
        {
            id: '5050505050',
            name_en: 'Dr. Faisal Al-Harbi', name_ar: 'د. فيصل الحربي',
            specialty_en: 'Cardiology', specialty_ar: 'قلب',
            hospital_id: 2, hospital_name_en: 'Johns Hopkins Aramco Healthcare',
            qualifications_en: 'MD from Johns Hopkins, Specialist in Interventional Cardiology', qualifications_ar: 'دكتوراه في الطب من جامعة جونز هوبكينز، أخصائي في أمراض القلب التدخلية',
            about_en: 'Dr. Faisal is a world-class cardiologist with a focus on minimally invasive heart procedures and preventative care.',
            about_ar: 'د. فيصل طبيب قلب من طراز عالمي يركز على إجراءات القلب طفيفة التوغل والرعاية الوقائية.',
            available_days: ['Monday', 'Wednesday'],
            rating: 4.9, reviewCount: 85, price: 650,
            visits: "2.3k", patients: "1.1k", exp: "8 years",
            reviews: [
                { user: "Allison Dorwart", rating: 4.5, date: "19 May 2024", text: "The consultation was great. Dr. Faisal knows his stuff." }
            ]
        },
        {
            id: '5252525252',
            name_en: 'Dr. Ahmed Tariq', name_ar: 'د. أحمد طارق',
            specialty_en: 'Pediatrics', specialty_ar: 'أطفال',
            hospital_id: 4, hospital_name_en: 'Security Forces Hospital',
            qualifications_en: 'MD from University of Manchester, Pediatrician with 10+ years experience', qualifications_ar: 'دكتوراه في الطب من جامعة مانشستر، طبيب أطفال بخبرة تزيد عن 10 سنوات',
            about_en: 'Dr. Ahmed has a passion for pediatric care and has treated thousands of children with a gentle and professional approach.',
            about_ar: 'د. أحمد لديه شغف برعاية الأطفال وقد عالج آلاف الأطفال بأسلوب لطيف ومهني.',
            available_days: ['Sunday', 'Monday', 'Tuesday'],
            rating: 4.7, reviewCount: 210, price: 350,
            visits: "5.1k", patients: "2.8k", exp: "15 years",
            reviews: []
        },
        {
            id: '5353535353',
            name_en: 'Nurse Layla', name_ar: 'الممرضة ليلى',
            specialty_en: 'General Care', specialty_ar: 'رعاية عامة',
            hospital_id: 5, hospital_name_en: 'King Fahad Medical City',
            qualifications_en: 'BSc in Nursing, Specialist in Patient Care', qualifications_ar: 'بكالوريوس في التمريض، أخصائية رعاية مرضى',
            available_days: ['Monday', 'Wednesday', 'Friday'],
            rating: 4.6, reviewCount: 45, price: 200,
            visits: "1.5k", patients: "900", exp: "5 years",
            reviews: []
        },
        {
            id: '5454545454',
            name_en: 'Dr. Khaled Bakr', name_ar: 'د. خالد بكر',
            specialty_en: 'Orthopedics', specialty_ar: 'عظام',
            hospital_id: 1, hospital_name_en: 'Dr. Soliman Fakeeh Hospital',
            qualifications_en: 'MD from King Khalid University, Orthopedic Surgeon', qualifications_ar: 'دكتوراه في الطب من جامعة الملك خالد، جراح عظام',
            available_days: ['Sunday', 'Tuesday'],
            rating: 4.8, reviewCount: 67, price: 450,
            visits: "2.1k", patients: "1.2k", exp: "10 years",
            reviews: []
        },
        {
            id: '5555555555',
            name_en: 'Nurse Mohammed', name_ar: 'الممرض محمد',
            specialty_en: 'Emergency', specialty_ar: 'طوارئ',
            hospital_id: 7, hospital_name_en: 'National Care Hospital',
            qualifications_en: 'BSc in Nursing, ER Specialist', qualifications_ar: 'بكالوريوس في التمريض، أخصائي طوارئ',
            available_days: ['Saturday', 'Sunday', 'Monday'],
            rating: 4.5, reviewCount: 32, price: 150,
            visits: "1.8k", patients: "1.1k", exp: "4 years",
            reviews: []
        },
        {
            id: '5656565656',
            name_en: 'Dr. Reem Adel', name_ar: 'د. ريم عادل',
            specialty_en: 'Internal Medicine', specialty_ar: 'باطنية',
            hospital_id: 6, hospital_name_en: 'Aster Sanad Hospital',
            qualifications_en: 'MD from Imperial College London, Consultant Physician', qualifications_ar: 'دكتوراه في الطب من إمبريال كوليدج لندن، استشاري أمراض باطنية',
            available_days: ['Tuesday', 'Thursday'],
            rating: 4.9, reviewCount: 156, price: 400,
            visits: "4.2k", patients: "2.1k", exp: "14 years",
            reviews: []
        },
        {
            id: '5757575757',
            name_en: 'Nurse Hanan', name_ar: 'الممرضة حنان',
            specialty_en: 'Pediatrics', specialty_ar: 'أطفال',
            hospital_id: 8, hospital_name_en: 'Al Hammadi Hospital',
            qualifications_en: 'BSc in Nursing, Pediatric Care Specialist', qualifications_ar: 'بكالوريوس في التمريض، أخصائية رعاية أطفال',
            available_days: ['Monday', 'Tuesday', 'Thursday'],
            rating: 4.8, reviewCount: 88, price: 250,
            visits: "2.5k", patients: "1.4k", exp: "7 years",
            reviews: []
        },
        {
            id: '5858585858',
            name_en: 'Dr. Yasser Fawzi', name_ar: 'د. ياسر فوزي',
            specialty_en: 'General Surgery', specialty_ar: 'جراحة عامة',
            hospital_id: 15, hospital_name_en: 'Mouwasat Hospital',
            qualifications_en: 'MD from McGill University, General and Laparoscopic Surgeon', qualifications_ar: 'دكتوراه في الطب من جامعة ماكجيل، جراح عام ومناظير',
            available_days: ['Monday', 'Wednesday', 'Friday'],
            rating: 4.7, reviewCount: 94, price: 550,
            visits: "3.2k", patients: "1.8k", exp: "11 years",
            reviews: []
        },
        {
            id: '5959595959',
            name_en: 'Nurse Amal', name_ar: 'الممرضة أمل',
            specialty_en: 'ICU', specialty_ar: 'العناية المركزة',
            hospital_id: 9, hospital_name_en: 'Dallah Hospital',
            qualifications_en: 'BSc in Nursing, ICU Specialist', qualifications_ar: 'بكالوريوس في التمريض، أخصائية عناية مركزة',
            available_days: ['Sunday', 'Tuesday', 'Wednesday'],
            rating: 4.6, reviewCount: 56, price: 180,
            visits: "1.4k", patients: "850", exp: "6 years",
            reviews: []
        },
        {
            id: '6060606060',
            name_en: 'Dr. Nora Khalid', name_ar: 'د. نورة خالد',
            specialty_en: 'Dermatology', specialty_ar: 'جلدية',
            hospital_id: 10, hospital_name_en: 'Dr. Sulaiman Al Habib Hospital',
            qualifications_en: 'MD from Alfaisal University, Specialist in Cosmetic Dermatology', qualifications_ar: 'دكتوراه في الطب من جامعة الفيصل، أخصائية في الأمراض الجلدية التجميلية',
            available_days: ['Wednesday', 'Thursday'],
            rating: 4.9, reviewCount: 142, price: 600,
            visits: "2.8k", patients: "1.6k", exp: "9 years",
            reviews: []
        },
        {
            id: '6161616161',
            name_en: 'Nurse Sultan', name_ar: 'الممرض سلطان',
            specialty_en: 'Oncology', specialty_ar: 'أورام',
            hospital_id: 11, hospital_name_en: 'King Abdulaziz Medical City',
            qualifications_en: 'BSc in Nursing, Oncology Specialist', qualifications_ar: 'بكالوريوس في التمريض، أخصائي أورام',
            available_days: ['Monday', 'Friday'],
            rating: 4.7, reviewCount: 48, price: 300,
            visits: "1.9k", patients: "1.1k", exp: "8 years",
            reviews: []
        },
        {
            id: '6262626262',
            name_en: 'Dr. Maha Sami', name_ar: 'د. مها سامي',
            specialty_en: 'Ophthalmology', specialty_ar: 'عيون',
            hospital_id: 3, hospital_name_en: 'Al Nokhba Clinics',
            qualifications_en: 'MD from King Abdulaziz University, Eye Surgery Specialist', qualifications_ar: 'دكتوراه في الطب من جامعة الملك عبد العزيز، أخصائية جراحة عيون',
            available_days: ['Monday', 'Friday'],
            rating: 4.8, reviewCount: 73, price: 480,
            visits: "2.4k", patients: "1.3k", exp: "13 years",
            reviews: []
        },
        {
            id: '6363636363',
            name_en: 'Nurse Fahad', name_ar: 'الممرض فهد',
            specialty_en: 'Radiology', specialty_ar: 'أشعة',
            hospital_id: 12, hospital_name_en: 'Al-Madar Clinics',
            qualifications_en: 'BSc in Radiology, Technician', qualifications_ar: 'بكالوريوس في الأشعة، فني أشعة',
            available_days: ['Sunday', 'Tuesday', 'Thursday'],
            rating: 4.5, reviewCount: 29, price: 220,
            visits: "1.2k", patients: "750", exp: "4 years",
            reviews: []
        },
        {
            id: '6464646464',
            name_en: 'Dr. Sami Jameel', name_ar: 'د. سامي جميل',
            specialty_en: 'ENT', specialty_ar: 'أنف وأذن وحنجرة',
            hospital_id: 13, hospital_name_en: 'National Care Hospital',
            qualifications_en: 'MD from University of Paris, Consultant ENT Specialist', qualifications_ar: 'دكتوراه في الطب من جامعة باريس، استشاري أنف وأذن وحنجرة',
            available_days: ['Sunday', 'Tuesday', 'Thursday'],
            rating: 4.8, reviewCount: 112, price: 520,
            visits: "3.1k", patients: "1.7k", exp: "16 years",
            reviews: []
        }
    ],
    appointments: [
        {
            id: "_xyz123",
            patientId: "1010101010",
            doctorId: "d1",
            hospitalId: "1",
            date: "2026-03-15",
            time: "10:00",
            status: "confirmed",
            created_at: new Date().toISOString()
        },
        {
            id: "_abc456",
            patientId: "2020202020",
            doctorId: "d2",
            hospitalId: "1",
            date: "2026-03-20",
            time: "14:30",
            status: "confirmed",
            created_at: new Date().toISOString()
        },
        {
            id: "_def789",
            patientId: "3030303030",
            doctorId: "d3",
            hospitalId: "2",
            date: "2026-03-22",
            time: "09:00",
            status: "confirmed",
            created_at: new Date().toISOString()
        }
    ]
};

// Initialize DB (Force update if version mismatch or data missing)
const storedData = localStorage.getItem(DB_KEY);
let needsReset = !storedData;

if (storedData) {
    const parsed = JSON.parse(storedData);
    if (parsed.version !== DB_VERSION || !parsed.doctors || parsed.doctors.length < 15) {
        needsReset = true;
    }
}

if (needsReset) {
    const seed = { ...defaultData, version: DB_VERSION };
    localStorage.setItem(DB_KEY, JSON.stringify(seed));
    console.log("WiaamDB: Database initialized/reset to version", DB_VERSION);
}

window.WiaamDB = {
    // Get entire collection
    getCollection: function (collection) {
        const db = JSON.parse(localStorage.getItem(DB_KEY));
        return db[collection] || null;
    },

    // Set entire collection
    setCollection: function (collection, data) {
        const db = JSON.parse(localStorage.getItem(DB_KEY));
        db[collection] = data;
        localStorage.setItem(DB_KEY, JSON.stringify(db));
    },

    // Get a specific document
    getDoc: function (collection, docId) {
        const coll = this.getCollection(collection);
        return coll[docId] || null;
    },

    // Create or Update a specific document
    setDoc: function (collection, docId, data) {
        const db = JSON.parse(localStorage.getItem(DB_KEY));
        if (!db[collection]) db[collection] = {};
        db[collection][docId] = { ...db[collection][docId], ...data, updated_at: new Date().toISOString() };
        localStorage.setItem(DB_KEY, JSON.stringify(db));
    },

    // Add an item to an array collection (e.g. appointments)
    addDoc: function (collection, data) {
        const db = JSON.parse(localStorage.getItem(DB_KEY));
        if (!Array.isArray(db[collection])) db[collection] = [];
        data.id = '_' + Math.random().toString(36).substr(2, 9);
        data.created_at = new Date().toISOString();
        db[collection].push(data);
        localStorage.setItem(DB_KEY, JSON.stringify(db));
        return data;
    }
};
