const commonMedications = [
    { med_en: "Panadol Advance", med_ar: "بنادول أدفانس", price: 15 },
    { med_en: "Amoxicillin 500mg", med_ar: "أموكسيسيلين 500 ملغ", price: 45 },
    { med_en: "Lipitor 20mg", med_ar: "ليبيطور 20 ملغ", price: 120 },
    { med_en: "Nexium 40mg", med_ar: "نيكسيوم 40 ملغ", price: 180 },
    { med_en: "Januvia 100mg", med_ar: "جانوفيا 100 ملغ", price: 210 },
    { med_en: "Glucophage 500mg", med_ar: "جلوكوفاج 500 ملغ", price: 35 },
    { med_en: "Ventolin Inhaler", med_ar: "فنتولين بخاخ", price: 35 },
    { med_en: "Augmentin 1g", med_ar: "أوجمنتين 1 غرام", price: 85 },
    { med_en: "Voltaren Emulgel", med_ar: "فولتارين جل", price: 30 },
    { med_en: "Zyrtec 10mg", med_ar: "زيرتيك 10 ملغ", price: 25 },
    { med_en: "Crestor 10mg", med_ar: "كريستور 10 ملغ", price: 140 },
    { med_en: "Gaviscon Liquid", med_ar: "جافيسكون سائل", price: 40 },
    { med_en: "Solpadeine Soluble", med_ar: "سولبادين فوار", price: 18 },
    { med_en: "Concor 5mg", med_ar: "كونكور 5 ملغ", price: 45 },
    { med_en: "Advil 200mg", med_ar: "أدفل 200 ملغ", price: 25 },
    { med_en: "Brufen 400mg", med_ar: "بروفين 400 ملغ", price: 20 },
    { med_en: "Exforge 5/160", med_ar: "إكسفورج 5/160", price: 155 },
    { med_en: "Plavix 75mg", med_ar: "بلافيكس 75 ملغ", price: 190 },
    { med_en: "Keppra 500mg", med_ar: "كيبرا 500 ملغ", price: 110 },
    { med_en: "Claritin 10mg", med_ar: "كلاريتين 10 ملغ", price: 28 }
];

window.pharmaciesData = [
    {
        id: 1,
        name_en: "Nahdi Pharmacy", name_ar: "صيدلية النهدي",
        region_en: "Riyadh", region_ar: "الرياض",
        city_en: "Riyadh", city_ar: "الرياض",
        address_en: "Olaya St, Al Olaya", address_ar: "شارع العليا، العليا",
        phone: "+966 9200 24688",
        stock: commonMedications.map(m => ({ ...m, available: true }))
    },
    {
        id: 2,
        name_en: "Al-Dawaa Pharmacy", name_ar: "صيدلية الدواء",
        region_en: "Makkah", region_ar: "مكة المكرمة",
        city_en: "Jeddah", city_ar: "جدة",
        address_en: "Tahlia St, Al Rawdah", address_ar: "شارع التحلية، الروضة",
        phone: "+966 9200 00828",
        stock: commonMedications.map(m => ({ ...m, available: true }))
    },
    {
        id: 3,
        name_en: "Whites Pharmacy", name_ar: "صيدلية وايتس",
        region_en: "Eastern", region_ar: "المنطقة الشرقية",
        city_en: "Al Khobar", city_ar: "الخبر",
        address_en: "Prince Faisal Bin Fahd Road", address_ar: "طريق الأمير فيصل بن فهد",
        phone: "+966 13 888 0000",
        stock: commonMedications.map(m => ({ ...m, available: true }))
    },
    {
        id: 4,
        name_en: "Kunooz Pharmacy", name_ar: "صيدلية كنوز",
        region_en: "Riyadh", region_ar: "الرياض",
        city_en: "Riyadh", city_ar: "الرياض",
        address_en: "King Abdullah Rd", address_ar: "طريق الملك عبدالله",
        phone: "+966 11 444 0000",
        stock: commonMedications.map(m => ({ ...m, available: true }))
    }
];
