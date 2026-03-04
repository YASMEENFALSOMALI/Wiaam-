document.addEventListener('DOMContentLoaded', () => {
    // Initialization & State
    let currentLang = 'en';
    let isDark = false;
    let appointments = [];
    let currentUser = null; // { role: 'patient' | 'staff' | 'admin', name: string }
    let pendingRole = 'patient';
    let authMode = 'login'; // 'login' | 'signup'
    let selectedHospitalId = null;

    // DOM Elements
    const langToggleBtn = document.getElementById('langToggle');
    const themeToggleBtn = document.getElementById('themeToggle');
    const htmlTag = document.documentElement;

    const hospitalGrid = document.getElementById('hospitalGrid');
    const hospitalSearch = document.getElementById('hospitalSearch');
    const regionFilter = document.getElementById('regionFilter');

    // Auth & Nav
    const loginBtn = document.getElementById('loginBtn');
    const userProfileBtn = document.getElementById('userProfileBtn');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const logoutBtn = document.getElementById('logoutBtn');
    const navProfileLink = document.getElementById('navProfileLink');
    const navStaffLink = document.getElementById('navStaffLink');
    const navAdminLink = document.getElementById('navAdminLink');
    const navCalendarLink = document.getElementById('navCalendarLink');

    // Dashboards
    const publicViews = document.getElementById('public-views');
    const patientDashboard = document.getElementById('patient-dashboard');
    const staffDashboard = document.getElementById('staff-dashboard');
    const adminDashboard = document.getElementById('admin-dashboard');
    const calendarSection = document.getElementById('calendar');

    // Modals
    const authModal = document.getElementById('authModal');
    const closeAuthModal = document.getElementById('closeAuthModal');
    const authStep1 = document.getElementById('authStep1');
    const authStep2 = document.getElementById('authStep2');
    const authForm = document.getElementById('authForm');
    const mfaForm = document.getElementById('mfaForm');
    const backToLoginBtn = document.getElementById('backToLogin');
    const roleTabs = document.querySelectorAll('.role-tab');
    const modeLoginBtn = document.getElementById('modeLoginBtn');
    const modeSignupBtn = document.getElementById('modeSignupBtn');
    const nameGroup = document.getElementById('nameGroup');
    const signupName = document.getElementById('signupName');
    const authSubmitBtn = document.getElementById('authSubmitBtn');

    const apptModal = document.getElementById('apptModal');
    const closeApptModal = document.getElementById('closeApptModal');
    const modalHospitalSelect = document.getElementById('modalHospitalSelect');
    const heroBookBtn = document.getElementById('heroBookBtn');
    const calendarBookBtn = document.getElementById('calendarBookBtn');
    const apptForm = document.getElementById('apptForm');
    const apptDateInput = document.getElementById('apptDateInput');
    const apptTimeInput = document.getElementById('apptTimeInput');
    const appointmentsList = document.getElementById('appointmentsList');

    const toggleChatbotBtn = document.getElementById('toggleChatbot');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeChatbotBtn = document.getElementById('closeChatbot');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');
    const nav = document.querySelector('.sticky-nav');

    // --- 0. Seamless Navbar Scroll ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- 1. Theming ---
    themeToggleBtn.addEventListener('click', () => {
        isDark = !isDark;
        htmlTag.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeToggleBtn.innerHTML = isDark
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>'
            : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>';
    });

    // --- 2. Localization ---
    function updateTranslations() {
        const texts = document.querySelectorAll('[data-i18n]');
        texts.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (window.i18nData[currentLang][key]) {
                el.textContent = window.i18nData[currentLang][key];
            }
        });

        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (window.i18nData[currentLang][key]) {
                el.placeholder = window.i18nData[currentLang][key];
            }
        });

        htmlTag.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        htmlTag.lang = currentLang;
        langToggleBtn.textContent = currentLang === 'ar' ? 'English' : 'عربي';

        renderHospitals();
        renderDoctors();
        renderAppointments();
    }

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        updateTranslations();
    });

    // --- 3. Routing & Dashboards based on Auth State ---
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeEditProfileModal = document.getElementById('closeEditProfileModal');
    const editProfileForm = document.getElementById('editProfileForm');

    // Profile Display Elements
    const displayInitials = document.getElementById('displayInitials');
    const displayName = document.getElementById('displayName');
    const displayId = document.getElementById('displayId');
    const displayBloodType = document.getElementById('displayBloodType');
    const displayAge = document.getElementById('displayAge');
    const displayGender = document.getElementById('displayGender');
    const displayDob = document.getElementById('displayDob');
    const displayPhone = document.getElementById('displayPhone');
    const displayEmail = document.getElementById('displayEmail');
    const displayEmContact = document.getElementById('displayEmContact');
    const displayEmPhone = document.getElementById('displayEmPhone');
    const displayPcp = document.getElementById('displayPcp');
    const displayCaregiver = document.getElementById('displayCaregiver');
    const displayChronic = document.getElementById('displayChronic');
    const displaySurgeries = document.getElementById('displaySurgeries');
    const displayFamilyHx = document.getElementById('displayFamilyHx');
    const displayAllergies = document.getElementById('displayAllergies');
    const displayMeds = document.getElementById('displayMeds');
    const displaySupplements = document.getElementById('displaySupplements');

    function loadUserProfile(userId) {
        let user = window.WiaamDB.getDoc('users', userId);
        if (!user) {
            user = {
                name: currentUser.name,
                id: userId,
                bloodType: 'O+',
                age: 30,
                gender: '---',
                dob: '---',
                phone: '---',
                email: '---',
                emContact: '---',
                emPhone: '---',
                pcp: '---',
                caregiver: 'None',
                allergies: 'None',
                chronic: 'None',
                surgeries: 'None',
                familyHx: 'None',
                meds: 'None',
                supplements: 'None'
            };
            window.WiaamDB.setDoc('users', userId, user);
        }

        if (displayInitials && user.name) {
            displayInitials.textContent = user.name.charAt(0).toUpperCase();
        }
        if (displayName) displayName.textContent = user.name || '---';
        if (displayId) displayId.textContent = `National ID: ${user.id || userId}`;

        if (displayBloodType) displayBloodType.textContent = user.bloodType || '---';
        if (displayAge) displayAge.textContent = user.age || '---';
        if (displayGender) displayGender.textContent = user.gender || '---';
        if (displayDob) displayDob.textContent = user.dob || '---';
        if (displayPhone) displayPhone.textContent = user.phone || '---';
        if (displayEmail) displayEmail.textContent = user.email || '---';
        if (displayEmContact) displayEmContact.textContent = user.emContact || '---';
        if (displayEmPhone) displayEmPhone.textContent = user.emPhone || '---';
        if (displayPcp) displayPcp.textContent = user.pcp || '---';
        if (displayCaregiver) displayCaregiver.textContent = user.caregiver || '---';

        const safeStr = (val) => val || 'None';
        const strToBadges = (str, colorClass) => {
            if (!str || str === 'None') return `<span>None</span>`;
            return str.split(',').map(s => `<span style="background: ${colorClass.bg}; color: ${colorClass.text}; padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.85rem; font-weight: 600; margin-right: 0.5rem;">${s.trim()}</span>`).join('');
        };
        const strToList = (str) => {
            if (!str || str === 'None') return `<li>None</li>`;
            return str.split(',').map(s => `<li>${s.trim()}</li>`).join('');
        };

        if (displayAllergies) displayAllergies.innerHTML = strToBadges(user.allergies, { bg: '#FEE2E2', text: '#EF4444' });
        if (displayChronic) displayChronic.innerHTML = strToBadges(user.chronic, { bg: '#FEF3C7', text: '#D97706' });
        if (displaySurgeries) displaySurgeries.textContent = safeStr(user.surgeries);
        if (displayFamilyHx) displayFamilyHx.textContent = safeStr(user.familyHx);

        if (displayMeds) displayMeds.innerHTML = strToList(user.meds);
        if (displaySupplements) displaySupplements.innerHTML = strToList(user.supplements);
    }

    // Handle Edit Profile Logic
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            if (!currentUser) return;
            const user = window.WiaamDB.getDoc('users', currentUser.loginId) || {};

            document.getElementById('editName').value = user.name || currentUser.name;
            document.getElementById('editBloodType').value = user.bloodType || 'O+';
            document.getElementById('editAge').value = user.age || 30;
            document.getElementById('editGender').value = user.gender || 'Male';
            document.getElementById('editDob').value = user.dob || '';
            document.getElementById('editPhone').value = user.phone || '';
            document.getElementById('editEmail').value = user.email || '';
            document.getElementById('editEmContact').value = user.emContact || '';
            document.getElementById('editEmPhone').value = user.emPhone || '';
            document.getElementById('editPcp').value = user.pcp || '';
            document.getElementById('editCaregiver').value = user.caregiver || '';
            document.getElementById('editAllergies').value = user.allergies || '';
            document.getElementById('editChronic').value = user.chronic || '';
            document.getElementById('editSurgeries').value = user.surgeries || '';
            document.getElementById('editFamilyHx').value = user.familyHx || '';
            document.getElementById('editMeds').value = user.meds || '';
            document.getElementById('editSupplements').value = user.supplements || '';

            editProfileModal.classList.add('active');
        });

        closeEditProfileModal.addEventListener('click', () => {
            editProfileModal.classList.remove('active');
        });

        editProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!currentUser) return;

            const updatedUser = {
                name: document.getElementById('editName').value,
                bloodType: document.getElementById('editBloodType').value,
                age: document.getElementById('editAge').value,
                gender: document.getElementById('editGender').value,
                dob: document.getElementById('editDob').value,
                phone: document.getElementById('editPhone').value,
                email: document.getElementById('editEmail').value,
                emContact: document.getElementById('editEmContact').value,
                emPhone: document.getElementById('editEmPhone').value,
                pcp: document.getElementById('editPcp').value,
                caregiver: document.getElementById('editCaregiver').value,
                allergies: document.getElementById('editAllergies').value,
                chronic: document.getElementById('editChronic').value,
                surgeries: document.getElementById('editSurgeries').value,
                familyHx: document.getElementById('editFamilyHx').value,
                meds: document.getElementById('editMeds').value,
                supplements: document.getElementById('editSupplements').value
            };

            window.WiaamDB.setDoc('users', currentUser.loginId, updatedUser);
            currentUser.name = updatedUser.name;

            loadUserProfile(currentUser.loginId);
            updateRouting(); // To refresh Navbar name

            editProfileModal.classList.remove('active');
        });
    }

    function updateRouting() {
        // Hide all dashboards first
        patientDashboard.style.display = 'none';
        staffDashboard.style.display = 'none';
        adminDashboard.style.display = 'none';
        calendarSection.style.display = 'none';

        navProfileLink.style.display = 'none';
        navStaffLink.style.display = 'none';
        navAdminLink.style.display = 'none';
        navCalendarLink.style.display = 'none';

        // Toggle Login button vs Profile Avatar
        if (currentUser) {
            loginBtn.style.display = 'none';
            userProfileBtn.style.display = 'flex';
            userNameDisplay.textContent = currentUser.name;

            // Show appropriate dashboards
            if (currentUser.role === 'patient') {
                publicViews.style.display = 'block';
                patientDashboard.style.display = 'block';
                calendarSection.style.display = 'block';

                navProfileLink.style.display = 'block';
                navCalendarLink.style.display = 'block';
                window.location.hash = "#patient-dashboard";
                renderAppointments();
            } else if (currentUser.role === 'staff') {
                publicViews.style.display = 'none';
                staffDashboard.style.display = 'block';
                navStaffLink.style.display = 'block';
                window.location.hash = "#staff-dashboard";
                initStaffWorkspace();
            } else if (currentUser.role === 'admin') {
                publicViews.style.display = 'none';
                adminDashboard.style.display = 'block';
                navAdminLink.style.display = 'block';
                window.location.hash = "#admin-dashboard";
                renderAdminStats();
            }

        } else {
            // Logged out state
            publicViews.style.display = 'block';
            loginBtn.style.display = 'block';
            userProfileBtn.style.display = 'none';
            window.location.hash = "#home";
        }
    }

    // --- 3.1 Staff Workspace Logic ---
    const patientSearchInput = document.getElementById('patientSearchInput');
    const searchPatientBtn = document.getElementById('searchPatientBtn');
    const patientRecordContainer = document.getElementById('patientRecordContainer');
    const staffDefaultView = document.getElementById('staffDefaultView');

    function initStaffWorkspace() {
        if (!currentUser || currentUser.role !== 'staff') return;

        patientRecordContainer.classList.add('hidden');
        staffDefaultView.classList.remove('hidden');

        renderStaffProfile();
        renderStaffAppointments();
    }

    function renderStaffProfile() {
        const doctors = window.WiaamDB.getCollection('doctors') || [];
        const d = doctors.find(doc => doc.id === currentUser.loginId);

        if (!d) return;

        if (document.getElementById('staffName')) document.getElementById('staffName').textContent = currentLang === 'en' ? d.name_en : d.name_ar;
        if (document.getElementById('staffSpecialty')) document.getElementById('staffSpecialty').textContent = currentLang === 'en' ? d.specialty_en : d.specialty_ar;
        if (document.getElementById('staffAvatar')) document.getElementById('staffAvatar').textContent = d.name_en.charAt(4); // "Dr. X" -> X
        if (document.getElementById('staffHospital')) document.getElementById('staffHospital').textContent = d.hospital_name_en;
        if (document.getElementById('staffQuals')) document.getElementById('staffQuals').textContent = currentLang === 'en' ? d.qualifications_en : d.qualifications_ar;

        const daysDiv = document.getElementById('staffDays');
        if (daysDiv) {
            daysDiv.innerHTML = '';
            (d.available_days || []).forEach(day => {
                const span = document.createElement('span');
                span.className = 'badge';
                span.style.cssText = "background: var(--color-bg-soft); color: var(--color-primary); padding: 0.25rem 0.75rem; border-radius: var(--radius-full);";
                span.textContent = day;
                daysDiv.appendChild(span);
            });
        }
    }

    function renderStaffAppointments() {
        const allAppts = window.WiaamDB.getCollection('appointments') || [];
        const myAppts = allAppts.filter(a => a.doctorId === currentUser.loginId);

        const list = document.getElementById('staffApptsList');
        const count = document.getElementById('staffApptCount');

        if (count) count.textContent = myAppts.length;
        if (!list) return;

        if (myAppts.length === 0) {
            list.innerHTML = `<p style="color: var(--color-text-muted); text-align: center; padding: 2rem;">No upcoming appointments.</p>`;
            return;
        }

        list.innerHTML = '';
        myAppts.forEach(appt => {
            const patient = window.WiaamDB.getDoc('users', appt.patientId);
            const pName = patient ? patient.name : 'Unknown Patient';

            const card = document.createElement('div');
            card.style.cssText = "padding: 1rem; border: 1px solid var(--color-border); border-radius: var(--radius-md); background: white; display: flex; justify-content: space-between; align-items: center;";
            card.innerHTML = `
                <div>
                    <h4 style="margin-bottom: 0.25rem;">${pName}</h4>
                    <p style="font-size: 0.85rem; color: var(--color-text-muted);">${appt.date} @ ${appt.time}</p>
                </div>
                <button class="btn-secondary btn-sm" onclick="document.getElementById('patientSearchInput').value='${appt.patientId}'; document.getElementById('searchPatientBtn').click();">View Record</button>
            `;
            list.appendChild(card);
        });
    }

    if (searchPatientBtn) {
        searchPatientBtn.addEventListener('click', () => {
            const pid = patientSearchInput.value.trim();
            const user = window.WiaamDB.getDoc('users', pid);

            if (!user || user.role !== 'patient') {
                alert(currentLang === 'en' ? 'Patient not found.' : 'لم يتم العثور على المريض.');
                return;
            }

            staffDefaultView.classList.add('hidden');
            patientRecordContainer.classList.remove('hidden');

            const allergies = (user.allergies || 'None').split(',').map(a => `<span class="badge" style="background:#FEE2E2; color:#EF4444; margin-right:0.5rem;">${a}</span>`).join('');
            const chronic = (user.chronic || 'None').split(',').map(c => `<span class="badge" style="background:#FEF3C7; color:#D97706; margin-right:0.5rem;">${c}</span>`).join('');

            patientRecordContainer.innerHTML = `
                <div class="glass-effect" style="padding: 2rem; border-radius: var(--radius-lg);">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid var(--color-border); padding-bottom: 1rem; margin-bottom: 1.5rem;">
                        <h3 style="color: var(--color-primary);">${user.name}</h3>
                        <span class="badge" style="background: var(--color-bg-soft); color: var(--color-text-muted);">ID: ${pid}</span>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
                        <div><p style="color: var(--color-text-muted);">Age</p><strong>${user.age || 'N/A'}</strong></div>
                        <div><p style="color: var(--color-text-muted);">Blood Type</p><strong>${user.bloodType || 'N/A'}</strong></div>
                        <div><p style="color: var(--color-text-muted);">Gender</p><strong>${user.gender || 'N/A'}</strong></div>
                    </div>

                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.5rem;">Allergies</h4>
                        <div>${allergies}</div>
                    </div>

                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.5rem;">Chronic Conditions</h4>
                        <div>${chronic}</div>
                    </div>

                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.5rem;">Medical History</h4>
                        <p style="color: var(--color-text-muted);">${user.surgeries || 'No surgeries recorded.'}</p>
                    </div>

                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="margin-bottom: 0.5rem;">Active Medications</h4>
                        <p style="color: var(--color-text-muted);">${user.meds || 'None'}</p>
                    </div>

                     <div style="text-align: right;">
                        <button class="btn-primary btn-sm">Add clinical note</button>
                    </div>
                </div>
            `;
        });
    }

    // --- 3.2 Admin Console Logic ---
    function renderAdminStats() {
        const users = window.WiaamDB.getCollection('users') || {};
        const appointments = window.WiaamDB.getCollection('appointments') || [];

        const allUsers = Object.values(users);
        const patients = allUsers.filter(u => u.role === 'patient');
        const staff = allUsers.filter(u => u.role === 'staff');

        document.getElementById('totalPatientsCount').textContent = patients.length;
        document.getElementById('totalStaffCount').textContent = staff.length;
        document.getElementById('totalAppointmentsCount').textContent = appointments.length;

        const tableBody = document.getElementById('adminUserTableBody');
        tableBody.innerHTML = '';

        allUsers.slice(0, 10).forEach(u => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid var(--color-border)';
            tr.innerHTML = `
                <td style="padding: 0.75rem; font-size: 0.9rem;">${Object.keys(users).find(key => users[key] === u) || 'N/A'}</td>
                <td style="padding: 0.75rem; font-size: 0.9rem;">${u.name}</td>
                <td style="padding: 0.75rem; font-size: 0.9rem;"><span class="badge" style="background:var(--color-bg-soft);">${u.role}</span></td>
                <td style="padding: 0.75rem; font-size: 0.9rem;"><span style="color:#10B981;">● Active</span></td>
            `;
            tableBody.appendChild(tr);
        });
    }

    // --- 4. Hospital Discovery ---
    function renderHospitals(filterText = '', filterRegion = 'all') {
        hospitalGrid.innerHTML = '';
        modalHospitalSelect.innerHTML = '<option value="">...</option>';

        const filtered = window.hospitalsData.filter(h => {
            const nameEn = (h.facility_name_en || '').toLowerCase();
            const nameAr = (h.facility_name_ar || '').toLowerCase();
            const cityEn = (h.city_or_locality_en || '').toLowerCase();
            const regionEn = (h.region_en || '').toLowerCase();

            const searchTarget = `${nameEn} ${nameAr} ${cityEn} ${regionEn}`;
            const matchesSearch = searchTarget.includes(filterText.toLowerCase());

            let matchesRegion = filterRegion === 'all';
            if (!matchesRegion) {
                const r = filterRegion.toLowerCase();
                // Check region or city against the filter
                matchesRegion = regionEn.includes(r) || cityEn.includes(r);

                // Special mapping for common regions
                if (filterRegion === 'Makkah' && (cityEn.includes('jeddah') || cityEn.includes('makkah'))) matchesRegion = true;
                if (filterRegion === 'Eastern' && (cityEn.includes('khobar') || cityEn.includes('dammam') || cityEn.includes('jubail') || cityEn.includes('qatif'))) matchesRegion = true;
            }

            return matchesSearch && matchesRegion;
        });

        filtered.slice(0, 60).forEach(h => { // Increased limit for better coverage
            const name = currentLang === 'en' ? h.facility_name_en : h.facility_name_ar;
            const region = currentLang === 'en' ? (h.city_or_locality_en !== 'Saudi Arabia' ? h.city_or_locality_en : h.region_en) : (h.city_or_locality_ar !== 'Saudi Arabia' ? h.city_or_locality_ar : h.region_ar);
            const type = currentLang === 'en' ? h.facility_type_en : h.facility_type_ar;
            const viewDetailsStr = window.i18nData[currentLang].viewDetails;
            const bookBtnStr = window.i18nData[currentLang].bookBtn;
            const bedsStr = window.i18nData[currentLang].facilityBeds;
            const typeStr = window.i18nData[currentLang].facilityType;

            const card = document.createElement('div');
            card.className = 'hospital-card fade-in-up';
            card.innerHTML = `
        <img src="${h.img}" alt="${name}" class="h-card-img">
        <h3 class="h-card-title">${name}</h3>
        <span class="h-card-region">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          ${region}
        </span>
        <div style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.5rem; display: flex; gap: 1rem;">
          <span><strong>${typeStr}</strong> ${type}</span>
          <span><strong>${bedsStr}</strong> ${h.licensed_beds}</span>
        </div>
        <div class="h-card-actions">
          <button class="btn-secondary btn-sm open-details" data-id="${h.id}">${viewDetailsStr}</button>
          <button class="btn-primary btn-sm open-appt" data-id="${h.id}">${bookBtnStr}</button>
        </div>
      `;
            hospitalGrid.appendChild(card);

            const option = document.createElement('option');
            option.value = h.id;
            option.textContent = name;
            modalHospitalSelect.appendChild(option);
        });

        // Use delegated listeners on hospitalGrid to avoid multiple attachments
        if (hospitalGrid && !hospitalGrid.dataset.listenersBound) {
            hospitalGrid.addEventListener('click', (e) => {
                const openDetailsBtn = e.target.closest('.open-details');
                const openApptBtn = e.target.closest('.open-appt');

                if (openDetailsBtn) {
                    const hId = parseInt(openDetailsBtn.getAttribute('data-id'));
                    showHospitalDetails(hId);
                }

                if (openApptBtn) {
                    const hId = parseInt(openApptBtn.getAttribute('data-id'));
                    if (!currentUser || currentUser.role !== 'patient') {
                        alert(currentLang === 'en' ? 'Please login as a patient to book an appointment.' : 'الرجاء تسجيل الدخول كمريض لحجز موعد.');
                        openAuthModal();
                        return;
                    }
                    modalHospitalSelect.value = hId;
                    modalHospitalSelect.dispatchEvent(new Event('change'));
                    apptModal.classList.add('active');
                }
            });
            hospitalGrid.dataset.listenersBound = 'true';
        }
    }

    // Moved out of renderHospitals for efficiency and to avoid repetitive selector calls
    const hospitalModal = document.getElementById('hospitalModal');
    const closeHospitalModal = document.getElementById('closeHospitalModal');
    const hospitalModalImg = document.getElementById('hospitalModalImg');
    const hospitalModalName = document.getElementById('hospitalModalName');
    const hospitalModalRegion = document.getElementById('hospitalModalRegion');
    const hospitalModalDesc = document.getElementById('hospitalModalDesc');
    const hospitalModalType = document.getElementById('hospitalModalType');
    const hospitalModalBeds = document.getElementById('hospitalModalBeds');
    const hospitalModalPhone = document.getElementById('hospitalModalPhone');
    const hospitalModalWebsite = document.getElementById('hospitalModalWebsite');

    function showHospitalDetails(hId) {
        if (!hospitalModal) return;
        selectedHospitalId = hId;
        const hObj = window.hospitalsData.find(h => h.id === hId);
        if (!hObj) return;

        hospitalModalImg.src = hObj.real_image_url || hObj.img || 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80';
        hospitalModalName.textContent = currentLang === 'en' ? hObj.facility_name_en : hObj.facility_name_ar;
        hospitalModalRegion.textContent = currentLang === 'en' ? (hObj.city_or_locality_en !== 'Saudi Arabia' ? hObj.city_or_locality_en : hObj.region_en) : (hObj.city_or_locality_ar !== 'Saudi Arabia' ? hObj.city_or_locality_ar : hObj.region_ar);

        // Fallback description
        const descFallbackEn = "A premier healthcare facility offering advanced medical services and specialized care in the Kingdom.";
        const descFallbackAr = "منشأة رعاية صحية رائدة تقدم خدمات طبية متقدمة ورعاية متخصصة في المملكة.";
        hospitalModalDesc.textContent = hObj.description ?
            (currentLang === 'en' ? hObj.description.en : hObj.description.ar) :
            (currentLang === 'en' ? descFallbackEn : descFallbackAr);

        if (hospitalModalType) hospitalModalType.textContent = currentLang === 'en' ? hObj.facility_type_en : hObj.facility_type_ar;
        if (hospitalModalBeds) hospitalModalBeds.textContent = hObj.licensed_beds + (currentLang === 'en' ? ' Beds' : ' سرير');
        if (hospitalModalPhone) hospitalModalPhone.textContent = hObj.phone || '+966 11 000 0000';

        if (hospitalModalWebsite) {
            hospitalModalWebsite.href = hObj.website || '#';
            hospitalModalWebsite.textContent = hObj.website || (currentLang === 'en' ? 'Visit Website' : 'زيارة الموقع');
        }

        hospitalModal.classList.add('active');
    }

    if (closeHospitalModal) {
        closeHospitalModal.addEventListener('click', () => {
            hospitalModal.classList.remove('active');
            selectedHospitalId = null;
        });
    }

    const bookHospitalModalBtn = document.getElementById('bookHospitalModalBtn');
    const directionsHospitalModalBtn = document.getElementById('directionsHospitalModalBtn');

    if (bookHospitalModalBtn) {
        bookHospitalModalBtn.addEventListener('click', () => {
            if (!currentUser || currentUser.role !== 'patient') {
                alert(currentLang === 'en' ? 'Please login as a patient to book an appointment.' : 'الرجاء تسجيل الدخول كمريض لحجز موعد.');
                openAuthModal();
                return;
            }
            if (selectedHospitalId) {
                modalHospitalSelect.value = selectedHospitalId;
                modalHospitalSelect.dispatchEvent(new Event('change'));
                hospitalModal.classList.remove('active');
                apptModal.classList.add('active');
            }
        });
    }

    if (directionsHospitalModalBtn) {
        directionsHospitalModalBtn.addEventListener('click', () => {
            if (selectedHospitalId) {
                const hObj = window.hospitalsData.find(h => h.id === selectedHospitalId);
                if (hObj) {
                    const query = encodeURIComponent(`${hObj.facility_name_en} ${hObj.city_or_locality_en || 'Saudi Arabia'}`);
                    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                }
            }
        });
    }

    hospitalSearch.addEventListener('input', (e) => {
        renderHospitals(e.target.value, regionFilter.value);
    });

    regionFilter.addEventListener('change', (e) => {
        renderHospitals(hospitalSearch.value, e.target.value);
    });

    // --- 4.1 Doctor Discovery ---
    const doctorGrid = document.getElementById('doctorGrid');
    const doctorSearch = document.getElementById('doctorSearch');
    const specialtyFilter = document.getElementById('specialtyFilter');
    const doctorDetailsModal = document.getElementById('doctorDetailsModal');
    const closeDocDetails = document.getElementById('closeDocDetails');
    const bookFromDetails = document.getElementById('bookFromDetails');

    let selectedDoctorForBooking = null;

    if (specialtyFilter) {
        specialtyFilter.addEventListener('change', (e) => {
            renderDoctors(doctorSearch.value, e.target.value);
        });
    }

    function renderDoctors(filterText = '', filterSpec = 'all') {
        if (!doctorGrid) return;
        doctorGrid.innerHTML = '';
        const doctors = window.WiaamDB.getCollection('doctors') || [];

        const filtered = doctors.filter(d => {
            const nameEn = (d.name_en || '').toLowerCase();
            const nameAr = (d.name_ar || '').toLowerCase();
            const specEn = (d.specialty_en || '').toLowerCase();
            const specAr = (d.specialty_ar || '').toLowerCase();
            const qualsEn = (d.qualifications_en || '').toLowerCase();
            const qualsAr = (d.qualifications_ar || '').toLowerCase();
            const hospEn = (d.hospital_name_en || '').toLowerCase();

            const searchTarget = `${nameEn} ${nameAr} ${specEn} ${specAr} ${qualsEn} ${qualsAr} ${hospEn}`;
            const matchesSearch = searchTarget.includes(filterText.toLowerCase());

            const matchesSpec = filterSpec === 'all' || specEn.includes(filterSpec.toLowerCase()) || specAr.includes(filterSpec.toLowerCase());

            return matchesSearch && matchesSpec;
        });

        if (filtered.length === 0) {
            doctorGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">No doctors found matching your criteria.</div>';
            return;
        }

        filtered.forEach(d => {
            const name = currentLang === 'en' ? d.name_en : d.name_ar;
            const spec = currentLang === 'en' ? d.specialty_en : d.specialty_ar;
            const hosp = currentLang === 'en' ? (d.hospital_name_en || 'Wiaam Partner Hospital') : (d.hospital_name_ar || 'مستشفى شريك وئام');

            const card = document.createElement('div');
            card.className = 'hospital-card fade-in-up doc-card-interactive';
            card.style.cursor = 'pointer';
            card.dataset.id = d.id; // Add data-id for delegation
            card.innerHTML = `
                <div class="doc-card-header" style="height: 150px; background: var(--color-primary); display: flex; align-items: center; justify-content: center; color: white; border-radius: var(--radius-md) var(--radius-md) 0 0;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <div style="padding: 1.5rem;">
                    <h3 class="h-card-title">${name}</h3>
                    <p style="color: var(--color-primary); font-weight: 600; margin-bottom: 0.25rem;">${spec}</p>
                    <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 1rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="vertical-align: middle; margin-right: 4px;">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        ${hosp}
                    </p>
                    <div style="display: flex; gap: 0.5rem;">
                         <button class="btn-secondary btn-sm btn-block view-doc-profile" data-id="${d.id}" style="pointer-events: auto;">View Info</button>
                         <button class="btn-primary btn-sm btn-block open-appt-doc" data-id="${d.id}" data-hid="${d.hospital_id}" style="pointer-events: auto;">Book</button>
                    </div>
                </div>
            `;
            doctorGrid.appendChild(card);

        });
    }

    // --- 4.1 Doctor Discovery - Static Listeners ---
    if (doctorGrid) {
        doctorGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.doc-card-interactive');
            const viewBtn = e.target.closest('.view-doc-profile');
            const bookBtn = e.target.closest('.open-appt-doc');

            if (viewBtn) {
                e.stopPropagation();
                showDoctorProfile(viewBtn.dataset.id);
            } else if (bookBtn) {
                e.stopPropagation();
                initiateBooking(bookBtn.dataset.id, bookBtn.dataset.hid);
            } else if (card) {
                // If the card itself is clicked (and not a button)
                showDoctorProfile(card.dataset.id);
            }
        });
    }

    function showDoctorProfile(docId) {
        const d = (window.WiaamDB.getCollection('doctors') || []).find(doc => doc.id === docId);
        if (!d) return;

        selectedDoctorForBooking = d;

        document.getElementById('docDetailName').textContent = currentLang === 'en' ? d.name_en : d.name_ar;
        document.getElementById('docDetailSpecialty').textContent = currentLang === 'en' ? d.specialty_en : d.specialty_ar;

        // New Premium Fields
        if (document.getElementById('docDetailRateValue')) document.getElementById('docDetailRateValue').textContent = d.rating || '4.5';
        if (document.getElementById('docDetailReviewCount')) document.getElementById('docDetailReviewCount').textContent = d.reviewCount || '85';
        if (document.getElementById('docDetailPrice')) document.getElementById('docDetailPrice').textContent = d.price || '990';
        if (document.getElementById('docDetailVisits')) document.getElementById('docDetailVisits').textContent = d.visits || '2.3k';
        if (document.getElementById('docDetailPatients')) document.getElementById('docDetailPatients').textContent = d.patients || '1.1k';
        if (document.getElementById('docDetailExp')) document.getElementById('docDetailExp').textContent = d.exp || '2 years';

        // Populate New Tab Content
        const qualsPara = document.getElementById('docDetailQuals');
        if (qualsPara) qualsPara.textContent = currentLang === 'en' ? d.qualifications_en : d.qualifications_ar;

        const daysContainer = document.getElementById('docDetailDays');
        if (daysContainer) {
            daysContainer.innerHTML = '';
            (d.available_days || []).forEach(day => {
                const span = document.createElement('span');
                span.className = 'badge';
                span.style.cssText = "background: var(--color-bg-soft); color: var(--color-primary); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.8rem; border: 1px solid var(--color-border);";
                span.textContent = day;
                daysContainer.appendChild(span);
            });
        }

        const aboutPara = document.getElementById('docDetailAbout');
        if (aboutPara) {
            const aboutTxt = currentLang === 'en' ? (d.about_en || `Dr. ${d.name_en} is a highly qualified specialist at ${d.hospital_name_en}.`)
                : (d.about_ar || `د. ${d.name_ar} هو أخصائي مؤهل تأهيلاً عالياً في ${d.hospital_name_ar}.`);
            aboutPara.textContent = aboutTxt;
        }

        // --- Render Reviews Tab (Default) ---
        const reviewsContainer = document.getElementById('docDetailReviews');
        if (reviewsContainer) {
            reviewsContainer.innerHTML = '';
            const reviews = d.reviews || [];
            if (reviews.length === 0) {
                reviewsContainer.innerHTML = '<p style="color: var(--color-text-muted); font-size: 0.9rem;">No reviews yet.</p>';
            } else {
                reviews.forEach(r => {
                    const reviewDiv = document.createElement('div');
                    reviewDiv.style.cssText = "padding: 1rem; border-bottom: 1px solid var(--color-border);";
                    reviewDiv.innerHTML = `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <strong>${r.user}</strong>
                            <span style="color: var(--color-text-muted); font-size: 0.8rem;">${r.date}</span>
                        </div>
                        <div style="color: #ffb800; font-size: 0.8rem; margin-bottom: 0.5rem;">
                            ${'★'.repeat(Math.floor(r.rating))}${'☆'.repeat(5 - Math.floor(r.rating))} 
                        </div>
                        <p style="font-size: 0.9rem; color: var(--color-text-muted);">${r.text}</p>
                    `;
                    reviewsContainer.appendChild(reviewDiv);
                });
            }
        }

        // Reset Tabs to Feedbacks
        if (typeof switchDocTab === 'function') switchDocTab('Feedbacks');

        doctorDetailsModal.classList.add('active');
    }

    function initiateBooking(dId, hId) {
        if (!currentUser) {
            openAuthModal();
            return;
        }
        modalHospitalSelect.value = hId;
        modalHospitalSelect.dispatchEvent(new Event('change'));
        modalDoctorSelect.value = dId;
        apptModal.classList.add('active');
    }

    if (closeDocDetails) {
        closeDocDetails.addEventListener('click', () => {
            doctorDetailsModal.classList.remove('active');
        });
    }

    if (bookFromDetails) {
        bookFromDetails.addEventListener('click', () => {
            if (selectedDoctorForBooking) {
                doctorDetailsModal.classList.remove('active');
                initiateBooking(selectedDoctorForBooking.id, selectedDoctorForBooking.hospital_id);
            }
        });
    }

    if (doctorSearch) {
        doctorSearch.addEventListener('input', (e) => {
            renderDoctors(e.target.value);
        });
    }

    // --- Helper for doctor discovery tabs ---
    function switchDocTab(tabName) {
        const sections = ['Feedbacks', 'Docs', 'About'];
        sections.forEach(s => {
            const btn = document.getElementById(`tab${s}`);
            const sec = document.getElementById(`section${s}`);
            if (btn) btn.classList.toggle('active', s === tabName);
            if (sec) sec.classList.toggle('hidden', s !== tabName);
        });
    }

    // Tab Event Listeners
    if (document.getElementById('tabFeedbacks')) {
        ['Feedbacks', 'Docs', 'About'].forEach(tab => {
            const btn = document.getElementById(`tab${tab}`);
            if (btn) btn.addEventListener('click', (e) => {
                e.preventDefault();
                switchDocTab(tab);
            });
        });
    }

    // --- 5. Modals & MFA Auth flow ---

    function openAuthModal() {
        authStep1.style.display = 'block';
        authStep2.style.display = 'none';
        authModal.classList.add('active');
    }

    loginBtn.addEventListener('click', openAuthModal);
    closeAuthModal.addEventListener('click', () => authModal.classList.remove('active'));

    // Auth Modes: Login vs Sign Up
    const signupPhone = document.getElementById('signupPhone');
    const phoneGroup = document.getElementById('phoneGroup');

    modeLoginBtn.addEventListener('click', () => {
        authMode = 'login';
        modeLoginBtn.style.background = 'var(--color-bg-light)';
        modeLoginBtn.style.color = 'var(--color-primary)';
        modeLoginBtn.style.boxShadow = 'var(--shadow-sm)';
        modeSignupBtn.style.background = 'transparent';
        modeSignupBtn.style.color = 'inherit';
        modeSignupBtn.style.boxShadow = 'none';
        nameGroup.style.display = 'none';
        phoneGroup.style.display = 'none';
        authSubmitBtn.setAttribute('data-i18n', 'modeLogin');
        updateTranslations();
    });

    modeSignupBtn.addEventListener('click', () => {
        authMode = 'signup';
        modeSignupBtn.style.background = 'var(--color-bg-light)';
        modeSignupBtn.style.color = 'var(--color-primary)';
        modeSignupBtn.style.boxShadow = 'var(--shadow-sm)';
        modeLoginBtn.style.background = 'transparent';
        modeLoginBtn.style.color = 'inherit';
        modeLoginBtn.style.boxShadow = 'none';
        nameGroup.style.display = 'block';
        phoneGroup.style.display = 'block';
        authSubmitBtn.setAttribute('data-i18n', 'modeSignup');
        updateTranslations();
    });

    // Roles Tabs Logic
    roleTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            roleTabs.forEach(t => {
                t.classList.remove('active');
                t.style.backgroundColor = 'transparent';
                t.style.color = 'inherit';
                t.style.boxShadow = 'none';
            });
            e.target.classList.add('active');
            e.target.style.backgroundColor = 'var(--color-bg-light)';
            e.target.style.color = 'var(--color-primary)';
            e.target.style.boxShadow = 'var(--shadow-sm)';
            pendingRole = e.target.getAttribute('data-role');
        });
    });

    let generatedOTP = '123456';

    // Login Form Submit -> Show MFA
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const loginIdField = document.getElementById('loginId').value;
        const passwordField = document.getElementById('loginPassword').value;

        if (authMode === 'login') {
            const user = window.WiaamDB.getDoc('users', loginIdField);
            if (!user || user.password !== passwordField) {
                alert(currentLang === 'en' ? 'Invalid ID or Password.' : 'رقم الهوية أو كلمة المرور غير صحيحة.');
                return;
            }
            // Store pending user to complete login after MFA
            window.pendingUser = user;
            window.pendingUserId = loginIdField;
        }

        authStep1.style.display = 'none';
        authStep2.style.display = 'block';

        generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
        // Always show alert for OTP so user can proceed even with fake data
        setTimeout(() => {
            const mfaCodeDisplay = document.getElementById('mfaCodeDisplay');
            const otpValue = document.getElementById('otpValue');
            const otpInput = document.getElementById('otpInput');
            if (mfaCodeDisplay && otpValue) {
                otpValue.textContent = generatedOTP;
                mfaCodeDisplay.style.display = 'block';
                // Auto-fill for convenience in test environments if needed, 
                // but let's just make it visible as requested.
            }
            alert(`[Wiaam OTP] Your verification code is: ${generatedOTP}`);
        }, 500);

        if (authMode === 'signup' && signupPhone.value) {
            try {
                await fetch('https://textbelt.com/text', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        phone: signupPhone.value,
                        message: `Wiaam: Your verification code is ${generatedOTP}`,
                        key: 'textbelt',
                    }),
                });
            } catch (err) {
                console.warn('SMS service unavailable', err);
            }
        }
    });

    backToLoginBtn.addEventListener('click', () => {
        authStep2.style.display = 'none';
        authStep1.style.display = 'block';
        const mfaCodeDisplay = document.getElementById('mfaCodeDisplay');
        if (mfaCodeDisplay) mfaCodeDisplay.style.display = 'none';
    });

    // MFA Form Submit -> Complete Login
    mfaForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const enteredOTP = document.getElementById('otpInput').value;
        if (enteredOTP !== generatedOTP && enteredOTP !== '123456') {
            alert(currentLang === 'en' ? 'Invalid Verification Code.' : 'رمز التحقق غير صحيح.');
            return;
        }

        if (authMode === 'signup' && signupName.value) {
            const loginIdField = document.getElementById('loginId').value;
            const passwordField = document.getElementById('loginPassword').value;
            currentUser = {
                loginId: loginIdField,
                role: pendingRole,
                name: signupName.value
            };
            // Save to DB with ACTUAL password
            window.WiaamDB.setDoc('users', loginIdField, { ...currentUser, password: passwordField });
        } else {
            currentUser = {
                loginId: window.pendingUserId,
                role: window.pendingUser.role,
                name: window.pendingUser.name
            };
        }

        if (currentUser.role === 'patient') {
            loadUserProfile(currentUser.loginId);
        }

        updateRouting();
        authModal.classList.remove('active');
        mfaForm.reset();
        authForm.reset();
    });

    // Logout routine
    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        updateRouting();
    });

    // Appointment Modal
    function openApptModal() {
        if (!currentUser || currentUser.role !== 'patient') {
            alert(currentLang === 'en' ? 'Please login as a patient to book an appointment.' : 'الرجاء تسجيل الدخول كمريض لحجز موعد.');
            openAuthModal();
            return;
        }
        apptModal.classList.add('active');
    }

    heroBookBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openApptModal();
    });

    calendarBookBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openApptModal();
    });

    closeApptModal.addEventListener('click', () => apptModal.classList.remove('active'));

    window.addEventListener('click', (e) => {
        if (e.target === authModal) authModal.classList.remove('active');
        if (e.target === apptModal) apptModal.classList.remove('active');
        const hospitalModal = document.getElementById('hospitalModal');
        if (hospitalModal && e.target === hospitalModal) hospitalModal.classList.remove('active');
    });

    // --- 6. Appointments Calendar Logic ---
    const modalDoctorSelect = document.getElementById('modalDoctorSelect');
    const doctorGroup = document.getElementById('doctorGroup');

    // Fetch doctors when hospital changes
    modalHospitalSelect.addEventListener('change', (e) => {
        const hId = parseInt(e.target.value);
        if (!hId) {
            doctorGroup.style.display = 'none';
            modalDoctorSelect.innerHTML = '<option value="">...</option>';
            return;
        }

        const doctors = window.WiaamDB.getCollection('doctors') || [];
        // Realistically filter doctors that belong to the selected hospital, or just show universally
        // For POC, we'll assign some hospital ids or show all if hospital not specific
        const hDoctors = doctors.filter(d => d.hospital_id === hId || hId % 3 === d.hospital_id % 3);

        modalDoctorSelect.innerHTML = '<option value="">...</option>';
        hDoctors.forEach(d => {
            const docName = currentLang === 'en' ? d.name_en : d.name_ar;
            const docSpec = currentLang === 'en' ? d.specialty_en : d.specialty_ar;
            const opt = document.createElement('option');
            opt.value = d.id;
            opt.textContent = `${docName} - ${docSpec}`;
            modalDoctorSelect.appendChild(opt);
        });

        doctorGroup.style.display = 'block';
    });

    function renderAppointments() {
        const allAppts = window.WiaamDB.getCollection('appointments') || [];
        // Only show logged in user's appointments
        const myAppts = currentUser ? allAppts.filter(a => a.patientId === currentUser.loginId) : [];

        if (myAppts.length === 0) {
            appointmentsList.innerHTML = `<div class="empty-state" style="text-align: center; padding: 2rem; color: var(--color-text-muted);">${window.i18nData[currentLang].noAppts}</div>`;
            return;
        }

        appointmentsList.innerHTML = '';
        myAppts.forEach(appt => {
            const hId = parseInt(appt.hospitalId);
            const hospitalObj = window.hospitalsData.find(h => h.id === hId);
            const hospitalName = hospitalObj ? (currentLang === 'en' ? hospitalObj.facility_name_en : hospitalObj.facility_name_ar) : 'Unknown Facility';

            const doctors = window.WiaamDB.getCollection('doctors') || [];
            const docObj = doctors.find(d => d.id === appt.doctorId);
            const docName = docObj ? (currentLang === 'en' ? docObj.name_en : docObj.name_ar) : '';

            const card = document.createElement('div');
            card.className = 'appt-card fade-in-up';
            card.style.cssText = `
        display: flex; justify-content: space-between; align-items: center; 
        padding: 1rem; border: 1px solid var(--color-border); border-radius: var(--radius-md); 
        margin-bottom: 0.5rem; background: var(--color-bg-light);
      `;
            card.innerHTML = `
        <div>
          <h4 style="margin-bottom: 0.25rem;">${hospitalName}</h4>
          ${docName ? `<p style="font-size: 0.9rem; margin-bottom: 0.25rem; font-weight: 500;">${docName}</p>` : ''}
          <span style="font-size: 0.85rem; color: var(--color-text-muted);">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="vertical-align: middle; margin-right: 0.25rem;">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            ${appt.date} at ${appt.time}
          </span>
        </div>
        <div>
          <span class="badge" style="background: rgba(0, 108, 53, 0.1); color: var(--color-primary); padding: 0.25rem 0.75rem; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600;">
            ${window.i18nData[currentLang].statusConfirmed}
          </span>
        </div>
      `;
            appointmentsList.appendChild(card);
        });
    }

    apptForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const hId = modalHospitalSelect.value;
        const dId = modalDoctorSelect.value;
        const date = apptDateInput.value;
        const time = apptTimeInput.value;

        window.WiaamDB.addDoc('appointments', {
            patientId: currentUser.loginId,
            hospitalId: hId,
            doctorId: dId,
            date: date,
            time: time,
            status: 'confirmed'
        });

        renderAppointments();

        // Jump to calendar section automatically
        window.location.hash = "#calendar";
        apptModal.classList.remove('active');
        apptForm.reset();
        doctorGroup.style.display = 'none';
    });

    // --- 7. Chatbot ---
    toggleChatbotBtn.addEventListener('click', () => {
        chatbotWindow.classList.toggle('hidden');
    });
    closeChatbotBtn.addEventListener('click', () => {
        chatbotWindow.classList.add('hidden');
    });

    function appendChat(text, isUser = false) {
        const msg = document.createElement('div');
        msg.className = `chat-msg ${isUser ? 'user' : 'bot'}`;
        msg.textContent = text;
        chatBody.appendChild(msg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // AI Responses have been moved to medicalAI.js

    sendChatBtn.addEventListener('click', () => {
        const text = chatInput.value.trim().toLowerCase();
        if (!text) return;
        appendChat(chatInput.value, true);
        chatInput.value = '';

        let botReply = window.wiaamMedicalAI
            ? window.wiaamMedicalAI.processMessage(text, currentLang)
            : (currentLang === 'en' ? "AI Agent is offline." : "الذكاء الاصطناعي غير متصل.");

        setTimeout(() => {
            appendChat(botReply);
        }, 800 + Math.random() * 500); // Add a slight random delay to feel like "typing"
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatBtn.click();
    });

    // Navigation & Routing
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash || '#home';

        // Hide all major sections
        publicViews.style.display = 'none';
        patientDashboard.style.display = 'none';
        staffDashboard.style.display = 'none';
        adminDashboard.style.display = 'none';
        calendarSection.style.display = 'none';

        if (hash === '#home' || hash === '#hospitals' || hash === '#doctors') {
            publicViews.style.display = 'block';
            if (hash === '#doctors') renderDoctors();
            if (hash === '#hospitals') renderHospitals();
            // Scroll to section if needed
            const element = document.querySelector(hash);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        } else if (hash === '#patient-dashboard' && currentUser?.role === 'patient') {
            patientDashboard.style.display = 'block';
            calendarSection.style.display = 'block';
            renderAppointments();
        } else if (hash === '#staff-dashboard' && currentUser?.role === 'staff') {
            staffDashboard.style.display = 'block';
            initStaffWorkspace();
        } else if (hash === '#admin-dashboard' && currentUser?.role === 'admin') {
            adminDashboard.style.display = 'block';
            renderAdminStats();
        } else {
            // Default to home
            publicViews.style.display = 'block';
            window.location.hash = '#home';
        }
    });

    // Initial Render Loop
    updateTranslations();
    updateRouting();

    // Pharmacy Availability Logic
    const searchPharmacyBtn = document.getElementById('searchPharmacyBtn');
    const pharmacySearchInput = document.getElementById('pharmacySearchInput');
    const pharmacyResults = document.getElementById('pharmacyResults');

    if (searchPharmacyBtn) {
        searchPharmacyBtn.addEventListener('click', () => {
            const query = (pharmacySearchInput.value || '').trim().toLowerCase();
            if (!query) return;
            performPharmacySearch(query);
        });

        pharmacySearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') searchPharmacyBtn.click();
        });
    }

    function performPharmacySearch(query) {
        if (!pharmacyResults) return;
        pharmacyResults.innerHTML = '';

        const pharmacies = window.pharmaciesData || [];
        let foundAny = false;

        pharmacies.forEach(p => {
            const matches = p.stock.filter(s =>
                s.med_en.toLowerCase().includes(query) ||
                s.med_ar.includes(query)
            );

            if (matches.length > 0) {
                foundAny = true;
                matches.forEach(m => {
                    const card = document.createElement('div');
                    card.className = 'glass-effect';
                    card.style.padding = '1.5rem';
                    card.style.borderRadius = 'var(--radius-lg)';
                    card.style.display = 'flex';
                    card.style.flexDirection = 'column';
                    card.style.justifyContent = 'space-between';

                    const statusText = m.available ?
                        `<span style="color: #10B981; font-weight: 700;">● In Stock</span>` :
                        `<span style="color: #EF4444; font-weight: 700;">○ Out of Stock</span>`;

                    card.innerHTML = `
                        <div style="margin-bottom: 1rem;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                                <h4 style="font-size: 1.1rem; color: var(--color-primary);">${currentLang === 'en' ? p.name_en : p.name_ar}</h4>
                                <span style="font-weight: 700; color: var(--color-text-dark);">${m.price} SAR</span>
                            </div>
                            <p style="font-weight: 600; margin-bottom: 0.25rem;">${currentLang === 'en' ? m.med_en : m.med_ar}</p>
                            <p style="font-size: 0.85rem; color: var(--color-text-muted);">${currentLang === 'en' ? p.address_en : p.address_ar}</p>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border); padding-top: 1rem;">
                            ${statusText}
                            <a href="tel:${p.phone}" class="btn-text" style="font-size: 0.85rem;">Call Pharmacy</a>
                        </div>
                    `;
                    pharmacyResults.appendChild(card);
                });
            }
        });

        if (!foundAny) {
            pharmacyResults.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--color-text-muted);">
                    <p>No pharmacies found with "${query}". Try searching for another medication.</p>
                </div>
            `;
        }
    }

    // Trigger initial hash check
    if (window.location.hash) {
        window.dispatchEvent(new Event('hashchange'));
    }
});
