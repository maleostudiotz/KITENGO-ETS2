// USANIDI WA FIREBASE (Msisi Project)
const firebaseConfig = {
  apiKey: "AIzaSyDA0ty5dOoBiPJx5fRdFI_hvddJyUbb6B4",
  authDomain: "msisi-38c20.firebaseapp.com",
  databaseURL: "https://msisi-38c20-default-rtdb.firebaseio.com",
  projectId: "msisi-38c20",
  storageBucket: "msisi-38c20.appspot.com",
  messagingSenderId: "881060609707",
  appId: "1:881060609707:web:bd9028db2b20c75d72c1ee",
  measurementId: "G-NFT0FB6V2T"
};

// Kuanzisha Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const database = firebase.database();

// GLOBAL LOADING ANIMATION HELPER FUNCTIONS
window.showLoading = function(message = "Inapakia, subiri kidogo...") {
    const overlay = document.getElementById("global-loading-overlay");
    if (overlay) {
        const txt = overlay.querySelector(".loader-text");
        if (txt) txt.textContent = message;
        overlay.style.display = "flex";
    }
};

window.hideLoading = function() {
    const overlay = document.getElementById("global-loading-overlay");
    if (overlay) {
        overlay.style.display = "none";
    }
};

window.hideAllSections = function() {
    const sections = ["cat", "bus-view-section", "details-view-section", "log", "reg", "adminSection"];
    sections.forEach(id => {
        let el = document.getElementById(id);
        if (el) el.style.display = "none";
    });
    const nav = document.getElementById("navicon");
    if (nav) nav.style.display = "none";
};

window.showlogin = function() { 
    window.showLoading("Inafungua Login...");
    window.hideAllSections(); 
    document.getElementById("log").style.display = "block"; 
    window.hideLoading();
};

window.showregister = function() { 
    window.showLoading("Inafungua Usajili...");
    window.hideAllSections(); 
    document.getElementById("reg").style.display = "block"; 
    window.hideLoading();
};

window.register = function() {
    let name = document.getElementById("regname").value.trim();
    let email = document.getElementById("regemail").value.trim();
    let password = document.getElementById("regpassword").value.trim();
    if (name === "" || email === "" || password === "") { 
        alert("Jaza nafasi zote!"); 
    } else { 
        window.showLoading("Inasajili akaunti yako...");
        setTimeout(() => {
            localStorage.setItem("name", name); 
            localStorage.setItem("email", email); 
            localStorage.setItem("password", password);
            window.hideLoading();
            alert("Hongera mkuu registration yako imekamilika!"); 
            window.showlogin();
        }, 500);
    }
};

window.login = function() {
    let name = document.getElementById("logname").value.trim();
    let password = document.getElementById("logpassword").value.trim();
    let dbname = localStorage.getItem("name");
    let dbpassword = localStorage.getItem("password");
    
    if (name === "" || password === "") { 
        alert("Jaza nafasi zote!"); 
    } else if (name === dbname && password === dbpassword) {
        window.showLoading("Inaingia Kitengo Gaming...");
        setTimeout(() => {
            window.hideLoading();
            alert("HONGERA SANA KARIBU KITENGO GAMING !"); 
            history.replaceState({ page: "home" }, "Home", "#home"); 
            window.showcat(true); 
        }, 500);
    } else { 
        alert("Taarifa ulizoweka sio sahihi!"); 
    }
};

window.showcat = function(isBackAction = false) {
    window.showLoading("Inapakia Ukurasa wa Nyumbani...");
    let dbname = localStorage.getItem("name");
    if(!dbname) { 
        window.hideLoading();
        window.showregister(); 
        return; 
    }
    window.hideAllSections();
    document.getElementById("cat").style.display = "block";
    document.getElementById("navicon").style.display = "flex"; 
    if (!isBackAction) history.pushState({ page: "home" }, "Home", "#home");
    window.hideLoading();
};

// LOGIC YA KICHUNGI CHA PREMIUM VS FREE + PASSWORD MODAL PREPARATION + TIKTOK SETUP VIDEO BUTTON
window.showDetails = function(title, image, desc, type, targetLinkOrId, currentCatId = '', currentCatName = '', price = 0, busKey = '', setLink = '') {
    window.showLoading("Inapakia maelezo ya Mod...");
    window.hideAllSections();
    document.getElementById("details-view-section").style.display = "block";
    document.getElementById("navicon").style.display = "flex";
    
    document.getElementById("details-title").textContent = title;
    document.getElementById("details-img").src = image;
    document.getElementById("details-desc").textContent = desc ? desc : "Samahani mkuu, hakuna maelezo ya ziada yaliyowekwa kwenye item hii.";
    
    let btnContainer = document.getElementById("details-action-btn");
    btnContainer.innerHTML = "";
    btnContainer.style.cssText = "display: flex; gap: 10px; align-items: center; justify-content: center; margin-top: 15px; width: 100%; flex-wrap: wrap;";
    
    if (type === 'category') {
        let btn = document.createElement("button");
        btn.textContent = "CHAGUA HAPA (FUNGUA MODS)";
        btn.style.cssText = "background: linear-gradient(135deg, #7139e8, #45f3ff); color: white; border: none; padding: 12px 20px; border-radius: 10px; font-weight: bold; cursor: pointer; width: 100%; min-height: 44px;";
        btn.onclick = function() { window.showBusCategory(targetLinkOrId, title); };
        btnContainer.appendChild(btn);
        
        window.currentDetailsBack = function() { window.showcat(); };
    } else {
        let btn = document.createElement("button");
        btn.style.cssText = "background: linear-gradient(135deg, #7139e8, #45f3ff); color: white; border: none; padding: 12px 20px; border-radius: 10px; font-weight: bold; cursor: pointer; flex: 1; min-height: 44px;";
        
        if (price && parseInt(price) > 0) {
            btn.textContent = `DOWNLOAD NOW (Tsh ${price})`;
            btn.onclick = function() {
                window.openPasswordModal(title, price, targetLinkOrId, currentCatId, busKey);
            };
        } else {
            let a = document.createElement("a");
            a.href = targetLinkOrId;
            a.target = "_blank";
            a.textContent = "DOWNLOAD NOW";
            a.style.color = "#ffffff";
            a.style.textDecoration = "none";
            a.style.display = "block";
            a.style.width = "100%";
            btn.appendChild(a);
        }
        
        btnContainer.appendChild(btn);

        // KA-BUTTON KA SETUP VIDEO (TikTok Video Link)
        if (setLink && setLink.trim() !== "") {
            let setBtn = document.createElement("a");
            setBtn.href = setLink;
            setBtn.target = "_blank";
            setBtn.textContent = "SETUP VIDEO";
            setBtn.style.cssText = "background: linear-gradient(135deg, #ff007f, #7139e8); color: white; border: none; padding: 12px 18px; border-radius: 10px; font-weight: bold; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; font-size: 13px; min-height: 44px; font-family: 'Orbitron', sans-serif; box-shadow: 0 0 10px rgba(255,0,127,0.5);";
            btnContainer.appendChild(setBtn);
        }
        
        window.currentDetailsBack = function() { window.showBusCategory(currentCatId, currentCatName); };
    }
    window.hideLoading();
};

window.openPasswordModal = function(itemName, itemPrice, downloadLink, categoryId, busKey) {
    document.getElementById("pay-item-name").textContent = itemName;
    document.getElementById("pay-item-price").textContent = "Tsh " + itemPrice;
    
    const linkInput = document.getElementById("pay-target-link");
    linkInput.value = downloadLink;
    linkInput.dataset.catId = categoryId;
    linkInput.dataset.busKey = busKey;
    
    document.getElementById("payment-modal-screen").style.display = "flex";
    document.getElementById("pay-password").value = "";
    document.getElementById("pay-status-log").style.display = "none";
};

window.closePaymentModal = function() {
    document.getElementById("payment-modal-screen").style.display = "none";
    document.getElementById("pay-password").value = "";
    document.getElementById("pay-status-log").style.display = "none";
};

window.requestPasswordSMS = function() {
    const nambaHalotel = "0615304000";
    const jinaLaBasi = document.getElementById("pay-item-name").textContent;
    const ujumbe = `HELLO KITENGO GAMING, NAHITAJI PASSWORD YA MOD YA: ${jinaLaBasi}`;
    window.location.href = `sms:${nambaHalotel}?body=${encodeURIComponent(ujumbe)}`;
};

window.verifyPasswordAndDownload = function() {
    const passwordInput = document.getElementById("pay-password").value.trim();
    const linkInput = document.getElementById("pay-target-link");
    const link = linkInput.value;
    const catId = linkInput.dataset.catId;
    const busKey = linkInput.dataset.busKey;
    const statusLog = document.getElementById("pay-status-log");
    
    if(passwordInput === "") {
        alert("Tafadhali ingiza password uliyotumiwa!");
        return;
    }
    
    statusLog.style.display = "block";
    statusLog.style.color = "yellow";
    statusLog.textContent = "SUBIRI KWANZA MAANA PASSWORD YAKO INAHAKIKIWA  ...";
    
    window.showLoading("Inahakiki Password...");
    
    database.ref(`buses/${catId}/${busKey}/password`).once('value')
    .then((snapshot) => {
        window.hideLoading();
        const correctPassword = snapshot.val();
        
        if (correctPassword && passwordInput === correctPassword.toString().trim()) {
            statusLog.style.color = "lightgreen";
            statusLog.textContent = "Hongera Password ni sahihi! Mfumo unakupeleka download page ...";
            
            setTimeout(() => {
                window.closePaymentModal();
                window.open(link, "_blank");
            }, 1200);
        } else {
            statusLog.style.color = "red";
            statusLog.textContent = "Oyaaa Password siyo sahihi mkuuu! Tafadhali hakikisha umeandika herufi vizuri au omba mpya kwa SMS.";
        }
    })
    .catch((err) => {
        window.hideLoading();
        statusLog.style.color = "red";
        statusLog.textContent = "CONNECTION ERROR: " + err.message;
    });
};

window.goBackFromDetails = function() {
    if (typeof window.currentDetailsBack === "function") {
        window.currentDetailsBack();
    } else {
        window.showcat();
    }
};

// ULTRA-FAST COMPRESSION UTILITY (Kutatua tatizo la upload kuwa nzito)
window.compressImage = function(file, maxWidth, maxHeight, quality, callback) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement("canvas");
            let width = img.width;
            let height = img.height;
            
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width = Math.round((width * maxHeight) / height);
                    height = maxHeight;
                }
            }
            
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            
            const compressedBase64 = canvas.toDataURL("image/jpeg", quality || 0.4);
            callback(compressedBase64);
        };
        img.onerror = function() {
            window.hideLoading();
            alert("Hitilafu kwenye picha! Jaribu picha nyingine.");
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
};

// PAKIA PICHA YA CATEGORY
window.addCategory = function() {
    let id = document.getElementById("newCatId").value.trim().toLowerCase().replace(/\s+/g, '-');
    let name = document.getElementById("newCatName").value.trim();
    let desc = document.getElementById("newCatDesc").value.trim();
    let fileInput = document.getElementById("newCatImg");
    
    if (id === "" || name === "") { alert("Jaza ID na Jina!"); return; }
    if (fileInput.files.length === 0) { alert("Chagua picha ya kundi!"); return; }
    
    window.showLoading("Inashindilia na kuongeza Category mpya...");
    
    const file = fileInput.files[0];
    
    window.compressImage(file, 400, 400, 0.4, function(compressedBase64) {
        database.ref('categories/' + id).set({ 
            name: name, 
            image: compressedBase64, 
            desc: desc
        })
        .then(() => {
            window.hideLoading();
            alert("Kundi jipya limeongezwa!");
            document.getElementById("newCatId").value = "";
            document.getElementById("newCatName").value = "";
            document.getElementById("newCatDesc").value = "";
            fileInput.value = "";
        }).catch(err => {
            window.hideLoading();
            alert("Kosa: " + err.message);
        });
    });
};

// RENDER CATEGORIES KWA WAKATI MUPYA (REALTIME LISTENER & KUHARIRI CATEGORY)
window.loadCategories = function() {
    database.ref('categories').on('value', (snapshot) => {
        const categories = snapshot.val() || {};
        let categorySelect = document.getElementById("uploadCategory");
        if(categorySelect) categorySelect.innerHTML = '<option value="">-- Chagua Category --</option>';
        
        let editCatSelect = document.getElementById("editCategorySelect");
        if(editCatSelect) editCatSelect.innerHTML = '<option value="">-- Chagua Category ya Kuhariri --</option>';

        let catContainer = document.getElementById("categories-container");
        if(catContainer) catContainer.innerHTML = "";
        
        let isAdmin = window.location.hash === "#admin";

        for (const [key, cat] of Object.entries(categories)) {
            if(categorySelect) {
                const opt = document.createElement("option");
                opt.value = key;
                opt.textContent = cat.name;
                categorySelect.appendChild(opt);
            }

            if(editCatSelect) {
                const opt = document.createElement("option");
                opt.value = key;
                opt.textContent = cat.name;
                editCatSelect.appendChild(opt);
            }
            
            if(catContainer) {
                const card = document.createElement("div");
                card.className = "card category-card";
                
                if (isAdmin) {
                    card.innerHTML = `
                        <div class="admin-card-wrapper" data-cat="${key}">
                            <div style="position: relative;">
                                <img src="${cat.image}" alt="${cat.name}" class="editable-cat-image" style="width: 100%; height: 160px; object-fit: cover; border-radius: 12px; cursor: pointer;">
                            </div>
                            <h3 style="margin: 10px 0 5px 0; color: #45f3ff; font-size:15px;">${cat.name}</h3>
                            <p class="editable-cat-desc" style="margin: 5px 0; cursor: pointer; color: #a4a6b0; font-size:12px; background: rgba(0,0,0,0.3); padding: 5px; border-radius: 5px;">${cat.desc ? cat.desc : 'Bonyeza hapa sekunde 3 kuedit maelezo ya category'}</p>
                            <p style="color:#00ff88; font-size:11px; margin:2px 0;">(Bonyeza picha au maelezo sekunde 3 kuhariri)</p>
                            <button onclick="window.showBusCategory('${key}', '${cat.name}', true)" style="background: #7139e8; color:white; border:none; padding:8px; border-radius:8px; width:100%; margin-top:8px; font-weight:bold; cursor:pointer;">TAZAMA MABASI YA CATEGORY HII</button>
                        </div>
                    `;
                    window.setupCategoryAdminListeners(card, key, cat);
                } else {
                    card.onclick = function() {
                        window.showBusCategory(key, cat.name, false);
                    };
                    
                    card.innerHTML = `
                        <div class="card-img-wrapper">
                            <img src="${cat.image}" alt="${cat.name}">
                        </div>
                        <div class="card-content">
                            <span class="card-tag">CATEGORY</span>
                            <div class="card-title">${cat.name}</div>
                            <div class="card-footer">
                                <span>${cat.desc || 'Mods available'}</span>
                                <span class="card-action-icon">&rsaquo;</span>
                            </div>
                        </div>
                    `;
                }
                
                catContainer.appendChild(card);
            }
        }
        
        let adminCatSelect = document.getElementById("adminCategorySelect");
        if (adminCatSelect) {
            adminCatSelect.innerHTML = '<option value="">-- Chagua Category ya Kuhariri Mabasi --</option>';
            for (const [key, cat] of Object.entries(categories)) {
                const opt = document.createElement("option");
                opt.value = key;
                opt.textContent = cat.name;
                adminCatSelect.appendChild(opt);
            }
        }
    });
};

// SETUP LONG PRESS LISTENERS KWA KUHARIRI CATEGORY (PICHA NA MAELEZO)
window.setupCategoryAdminListeners = function(card, catKey, catData) {
    const descEl = card.querySelector('.editable-cat-desc');
    const imageEl = card.querySelector('.editable-cat-image');
    let pressTimer;

    const bindLongPress = (element, callback) => {
        if (!element) return;
        
        element.addEventListener('touchstart', (e) => { 
            pressTimer = setTimeout(() => { callback(); }, 3000); 
        });
        element.addEventListener('touchend', () => clearTimeout(pressTimer));
        element.addEventListener('touchmove', () => clearTimeout(pressTimer));
        
        element.addEventListener('mousedown', () => {
            pressTimer = setTimeout(() => { callback(); }, 3000);
        });
        element.addEventListener('mouseup', () => clearTimeout(pressTimer));
        element.addEventListener('mouseleave', () => clearTimeout(pressTimer));
    };
    
    bindLongPress(imageEl, () => window.editCategoryImage(catKey));
    bindLongPress(descEl, () => window.editCategoryDesc(catKey, catData.desc || ''));
};

window.inspectCategoryForEdit = function() {
    let catId = document.getElementById("editCategorySelect").value;
    if(!catId) { alert("Tafadhali chagua category!"); return; }
    database.ref('categories/' + catId).once('value').then(snapshot => {
        let cat = snapshot.val();
        if(cat) {
            window.showcat(true);
        }
    });
};

window.editCategoryDesc = function(catKey, currentDesc) {
    const newDesc = prompt(`Badilisha maelezo ya Category:\n\n(Sasa: ${currentDesc})`, currentDesc);
    if (newDesc !== null && newDesc !== currentDesc) {
        window.showLoading("Inahifadhi maelezo mapya...");
        database.ref(`categories/${catKey}/desc`).set(newDesc)
            .then(() => {
                window.hideLoading();
                alert('Maelezo ya category yamebadilishwa!');
            })
            .catch(err => {
                window.hideLoading();
                alert('Kosa: ' + err.message);
            });
    }
};

window.editCategoryImage = function(catKey) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.onchange = function() {
        if (this.files.length > 0) {
            const file = this.files[0];
            window.showLoading("Inashindilia na kubadilisha picha ya category...");
            window.compressImage(file, 400, 400, 0.4, function(compressedBase64) {
                database.ref(`categories/${catKey}/image`).set(compressedBase64)
                    .then(() => {
                        window.hideLoading();
                        alert('Picha ya category imebadilishwa kikamilifu!');
                    })
                    .catch(err => {
                        window.hideLoading();
                        alert('Kosa: ' + err.message);
                    });
            });
        }
    };
    fileInput.click();
};

// LOGO SLIDESHOW
let slideshowItems = [];
let slideshowIndex = 0;
let slideshowTimer = null;

window.loadSlideshow = function() {
    database.ref('slideshow').on('value', (snapshot) => {
        const data = snapshot.val() || {};
        slideshowItems = Object.entries(data).map(([key, val]) => ({ key, ...val }));

        if (slideshowTimer) { clearTimeout(slideshowTimer); slideshowTimer = null; }

        if (slideshowItems.length > 0) {
            slideshowIndex = 0;
            window.playSlideshowItem();
        } else {
            const imgEl = document.getElementById('slideshow-img');
            const videoEl = document.getElementById('slideshow-video');
            if (videoEl) { videoEl.pause(); videoEl.style.display = 'none'; }
            if (imgEl) { imgEl.src = 'logo.jpg'; imgEl.style.display = 'block'; }
        }
    });
};

window.playSlideshowItem = function() {
    if (slideshowTimer) { clearTimeout(slideshowTimer); slideshowTimer = null; }
    if (slideshowItems.length === 0) return;

    const imgEl = document.getElementById('slideshow-img');
    const videoEl = document.getElementById('slideshow-video');
    if (!imgEl || !videoEl) return;

    const item = slideshowItems[slideshowIndex];

    if (item.type === 'video') {
        imgEl.style.display = 'none';
        videoEl.style.display = 'block';
        videoEl.muted = true;
        videoEl.src = item.src;
        videoEl.currentTime = 0;
        videoEl.play().catch(() => {});
        slideshowTimer = setTimeout(window.nextSlideshowItem, 5000);
    } else {
        videoEl.pause();
        videoEl.style.display = 'none';
        imgEl.style.display = 'block';
        imgEl.src = item.src;
        slideshowTimer = setTimeout(window.nextSlideshowItem, 3000);
    }
};

window.nextSlideshowItem = function() {
    if (slideshowItems.length === 0) return;
    slideshowIndex = (slideshowIndex + 1) % slideshowItems.length;
    window.playSlideshowItem();
};

window.addSlideshowItem = function() {
    const fileInput = document.getElementById('slideshowFile');
    if (!fileInput || fileInput.files.length === 0) { alert('Chagua picha au video kwanza!'); return; }

    const file = fileInput.files[0];
    const isVideo = file.type.startsWith('video/');

    window.showLoading(isVideo ? "Inapakia video kwenye slideshow..." : "Inashindilia picha ya slideshow...");

    if (isVideo) {
        const reader = new FileReader();
        reader.onload = function(e) {
            database.ref('slideshow').push().set({ type: 'video', src: e.target.result })
            .then(() => {
                window.hideLoading();
                alert('Video imeongezwa kwenye slideshow!');
                fileInput.value = '';
                window.loadSlideshowAdminList();
            }).catch(err => {
                window.hideLoading();
                alert('Kosa: ' + err.message);
            });
        };
        reader.readAsDataURL(file);
    } else {
        window.compressImage(file, 1000, 600, 0.5, function(compressedBase64) {
            database.ref('slideshow').push().set({ type: 'image', src: compressedBase64 })
            .then(() => {
                window.hideLoading();
                alert('Picha imeongezwa kwenye slideshow!');
                fileInput.value = '';
                window.loadSlideshowAdminList();
            }).catch(err => {
                window.hideLoading();
                alert('Kosa: ' + err.message);
            });
        });
    }
};

window.loadSlideshowAdminList = function() {
    const listEl = document.getElementById('slideshow-admin-list');
    if (!listEl) return;

    database.ref('slideshow').once('value', (snapshot) => {
        const data = snapshot.val() || {};
        listEl.innerHTML = '';
        const entries = Object.entries(data);

        if (entries.length === 0) {
            listEl.innerHTML = '<p style="color:#a4a6b0; font-size:13px;">Hakuna picha/video kwenye slideshow bado.</p>';
            return;
        }

        entries.forEach(([key, item]) => {
            const row = document.createElement('div');
            row.style.cssText = 'display:flex; align-items:center; gap:10px; background:rgba(0,0,0,0.3); padding:8px; border-radius:8px;';
            const preview = item.type === 'video'
                ? `<video src="${item.src}" muted style="width:60px; height:45px; object-fit:cover; border-radius:5px;"></video>`
                : `<img src="${item.src}" style="width:60px; height:45px; object-fit:cover; border-radius:5px;">`;
            row.innerHTML = `
                ${preview}
                <span style="flex:1; font-size:12px; color:#45f3ff;">${item.type === 'video' ? 'VIDEO (sek 5)' : 'PICHA (sek 3)'}</span>
                <button onclick="window.deleteSlideshowItem('${key}')" style="background-color:#ff0000; margin:0; padding:6px 12px; font-size:12px; width:auto; min-height:30px;">FUTA</button>
            `;
            listEl.appendChild(row);
        });
    });
};

window.deleteSlideshowItem = function(key) {
    if (confirm('Unataka kufuta hii kwenye slideshow?')) {
        window.showLoading("Inafuta...");
        database.ref('slideshow/' + key).remove()
        .then(() => {
            window.hideLoading();
            window.loadSlideshowAdminList();
        }).catch(err => {
            window.hideLoading();
            alert('Kosa: ' + err.message);
        });
    }
};

// ONYESHA MABASI YA CATEGORY ILIYOCHAGULIWA
window.showBusCategory = function(catId, catName, isAdminMode = false) {
    window.showLoading(`Inafungua Category: ${catName}...`);
    database.ref('buses/' + catId).once('value', (snapshot) => {
        const buses = snapshot.val() || {};
        
        let isAdmin = window.location.hash === "#admin" || isAdminMode;
        
        window.hideAllSections();
        document.getElementById("bus-view-section").style.display = "block";
        document.getElementById("navicon").style.display = "flex";
        
        if (!isAdmin) {
            history.pushState({ page: catId, catName: catName }, catName, "#" + catId);
        }
        
        document.getElementById("dynamic-bus-title").textContent = catName;
        
        let busList = document.getElementById("dynamic-bus-list");
        busList.innerHTML = "";
        
        for (const [key, bus] of Object.entries(buses)) {
            const card = document.createElement("div");
            card.className = "card bus-card";
            
            if (isAdmin) {
                card.innerHTML = `
                    <div class="admin-card-wrapper" data-cat="${catId}" data-key="${key}">
                        <div style="position: relative;">
                            <img src="${bus.image}" alt="${bus.name}" class="editable-image" style="width: 100%; height: 160px; object-fit: cover; border-radius: 12px; cursor: pointer;">
                        </div>
                        <h3 class="editable-title" style="margin: 10px 0 5px 0; cursor: pointer; color: #45f3ff; font-size:15px;">${bus.name}</h3>
                        <p class="editable-desc" style="margin: 5px 0; cursor: pointer; color: #a4a6b0; font-size:12px; background: rgba(0,0,0,0.3); padding: 5px; border-radius: 5px;">${bus.desc ? bus.desc : 'Bonyeza hapa sekunde 3 kuedit caption/maelezo'}</p>
                        <p class="editable-price" style="margin: 0; color: #ff007f; font-weight: bold; cursor: pointer; font-size:13px;">Tsh ${bus.price || 0}</p>
                        <p class="editable-setlink" style="margin: 5px 0; color: #00ff88; font-weight: bold; cursor: pointer; font-size:11px; word-break: break-all;">TikTok Link: ${bus.setLink ? bus.setLink : 'Haikuwekwa (Bonyeza sekunde 3 kuweka)'}</p>
                        <div style="display: flex; gap: 8px; margin-top:10px;">
                            <button onclick="window.deleteBus('${catId}', '${key}')" style="flex: 1; background-color: #ff0000; padding:6px; font-size:12px; min-height:36px;">FUTA</button>
                            <button onclick="window.reloadCategoryView('${catId}', '${catName}')" style="flex: 1; padding:6px; font-size:12px; min-height:36px;">REFRESH</button>
                        </div>
                    </div>
                `;
            } else {
                card.onclick = function() {
                    window.showDetails(bus.name, bus.image, bus.desc, 'bus', bus.link, catId, catName, bus.price || 0, key, bus.setLink || '');
                };
                
                card.innerHTML = `
                    <div class="card-img-wrapper">
                        <img src="${bus.image}" alt="${bus.name}">
                    </div>
                    <div class="card-content">
                        <span class="card-tag">${bus.price && parseInt(bus.price) > 0 ? `PREMIUM (Tsh ${bus.price})` : 'FREE MOD'}</span>
                        <div class="card-title">${bus.name}</div>
                        <div class="card-footer">
                            <span>1 link</span>
                            <span class="card-action-icon">&rsaquo;</span>
                        </div>
                    </div>
                `;
            }
            
            busList.appendChild(card);
            
            if (isAdmin) {
                window.setupAdminCardListeners(card, catId, key, bus);
            }
        }
        
        let existingBtn = document.getElementById("admin-back-btn");
        if(existingBtn) existingBtn.remove();

        let backBtn = document.createElement("button");
        backBtn.id = "admin-back-btn";
        backBtn.textContent = "Rudi Nyuma";
        backBtn.style.cssText = "display: block; margin: 25px auto; padding: 10px 25px; background: #7139e8; color: white; border: none; border-radius: 8px; cursor: pointer; min-height:44px; font-weight:bold;";
        backBtn.onclick = function() {
            if (isAdmin) {
                window.showAdminPanel();
            } else {
                window.showcat();
            }
        };
        busList.parentElement.insertBefore(backBtn, busList.nextSibling);
        window.hideLoading();
    });
};

window.reloadCategoryView = function(catId, catName) {
    window.showBusCategory(catId, catName, true);
};

// LISTENERS KWA UPANDE WA ADMIN (INAHUSISHA PRESS KWA SEKUNDE 3)
window.setupAdminCardListeners = function(card, catId, key, bus) {
    const titleEl = card.querySelector('.editable-title');
    const descEl = card.querySelector('.editable-desc');
    const priceEl = card.querySelector('.editable-price');
    const setLinkEl = card.querySelector('.editable-setlink');
    const imageEl = card.querySelector('.editable-image');
    let pressTimer;

    const bindLongPress = (element, callback) => {
        if (!element) return;
        
        element.addEventListener('touchstart', (e) => { 
            pressTimer = setTimeout(() => { callback(); }, 3000); 
        });
        element.addEventListener('touchend', () => clearTimeout(pressTimer));
        element.addEventListener('touchmove', () => clearTimeout(pressTimer));
        
        element.addEventListener('mousedown', () => {
            pressTimer = setTimeout(() => { callback(); }, 3000);
        });
        element.addEventListener('mouseup', () => clearTimeout(pressTimer));
        element.addEventListener('mouseleave', () => clearTimeout(pressTimer));
    };
    
    bindLongPress(imageEl, () => window.editBusImage(catId, key, bus));
    bindLongPress(titleEl, () => window.editBusField(catId, key, 'name', bus.name, 'Jina la Mod'));
    bindLongPress(descEl, () => window.editBusField(catId, key, 'desc', bus.desc || '', 'Maelezo / Caption ya Content'));
    bindLongPress(priceEl, () => window.editBusField(catId, key, 'price', bus.price || 0, 'Bei ya Mod'));
    bindLongPress(setLinkEl, () => window.editBusField(catId, key, 'setLink', bus.setLink || '', 'TikTok Video Link (Kama hautaki button ionekane acha wazi)'));
};

window.editBusField = function(catId, key, field, currentValue, label) {
    const newValue = prompt(`Badilisha ${label}:\n\n(Sasa: ${currentValue})`, currentValue);
    if (newValue !== null && newValue !== currentValue) {
        window.showLoading("Inahifadhi mabadiliko...");
        database.ref(`buses/${catId}/${key}/${field}`).set(newValue)
            .then(() => {
                window.hideLoading();
                alert('Imebadilishwa kwa ufanisi!');
                window.reloadCategoryView(catId, '');
            })
            .catch(err => {
                window.hideLoading();
                alert('Kosa: ' + err.message);
            });
    }
};

window.editBusImage = function(catId, key, bus) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.onchange = function() {
        if (this.files.length > 0) {
            const file = this.files[0];
            window.showLoading("Inashindilia na kubadili picha...");
            window.compressImage(file, 500, 500, 0.4, function(compressedBase64) {
                database.ref(`buses/${catId}/${key}/image`).set(compressedBase64)
                    .then(() => {
                        window.hideLoading();
                        alert('Picha imebadilishwa!');
                        window.reloadCategoryView(catId, '');
                    })
                    .catch(err => {
                        window.hideLoading();
                        alert('Kosa: ' + err.message);
                    });
            });
        }
    };
    fileInput.click();
};

// UPLOAD BUS FUNCTION - OPTIMIZED FOR MAX UPLOAD SPEED
window.uploadBus = function() {
    let cat = document.getElementById("uploadCategory").value;
    let name = document.getElementById("uploadName").value.trim();
    let link = document.getElementById("uploadLink").value.trim();
    let setLink = document.getElementById("uploadSetLink").value.trim();
    let desc = document.getElementById("uploadDesc").value.trim();
    let price = document.getElementById("uploadPrice").value;
    let password = document.getElementById("uploadPassword").value.trim();
    let fileInput = document.getElementById("uploadImg");

    if (cat === "") { alert("Chagua Category kwanza!"); return; }
    if (name === "" || link === "") { alert("Jaza jina na link!"); return; }
    if (fileInput.files.length === 0) { alert("Tafadhali chagua picha ya basi!"); return; }
    if (price && parseInt(price) > 0 && password === "") { alert("Tafadhali weka password ya mod hii ya kulipia!"); return; }

    window.showLoading("Inashindilia picha kwa kasi na kupakia Firebase...");

    const file = fileInput.files[0];

    window.compressImage(file, 500, 500, 0.4, function(compressedBase64) {
        const newBusRef = database.ref('buses/' + cat).push();
        newBusRef.set({ 
            name: name, 
            image: compressedBase64, 
            link: link, 
            setLink: setLink,
            desc: desc, 
            price: price ? parseInt(price) : 0,
            password: password ? password : "" 
        })
        .then(() => {
            window.hideLoading();
            alert("Basi jipya limeongezwa kwa kasi ya ajabu!");
            document.getElementById("uploadName").value = "";
            document.getElementById("uploadDesc").value = "";
            document.getElementById("uploadLink").value = "";
            document.getElementById("uploadSetLink").value = "";
            document.getElementById("uploadPrice").value = "";
            document.getElementById("uploadPassword").value = "";
            fileInput.value = "";
            window.showBusCategory(cat, "MABASI", true);
        }).catch(err => {
            window.hideLoading();
            alert("Kosa la Firebase: " + err.message);
        });
    });
};

window.deleteCategory = function(categoryId) {
    if (!categoryId) { alert("Weka ID ya category unayotaka kuifuta."); return; }
    if(confirm("Je, una uhakika unataka kufuta GROUP la '" + categoryId + "' na kila kitu chake?")) {
        window.showLoading("Inafuta Category...");
        database.ref('categories/' + categoryId).remove()
        .then(() => { 
            database.ref('buses/' + categoryId).remove(); 
            window.hideLoading();
            alert("Vimefutwa!"); 
        }).catch(err => {
            window.hideLoading();
            alert("Kosa: " + err.message);
        });
    }
};

window.clearEntireDatabase = function() {
    const secret = document.getElementById("adminSecret").value;
    if (secret !== "1234") { alert("Kodi ya siri ya admin siyo sahihi!"); return; }

    let confirmationText = prompt("ONYO KALI: Hii itafuta Categories zote na Mabasi yote!\n\nKama una uhakika, andika neno FUTA:");
    if (confirmationText === "FUTA") {
        window.showLoading("Inasafisha Database yote...");
        database.ref().remove()
        .then(() => { 
            window.hideLoading();
            alert("Database yote imesafishwa!"); 
        })
        .catch(err => {
            window.hideLoading();
            alert("Kosa: " + err.message);
        });
    } else { alert("Zoezi limesitishwa."); }
};

window.deleteBus = function(category, key) {
    if(confirm("Unataka kufuta basi hili?")) {
        window.showLoading("Inafuta Basi...");
        database.ref('buses/' + category + '/' + key).remove()
        .then(() => {
            window.hideLoading();
            alert("Basi limefutwa!");
            window.showBusCategory(category, "MABASI", true);
        })
        .catch(err => {
            window.hideLoading();
            alert("Kosa: " + err.message);
        });
    }
};

window.showAdminPanel = function() {
    window.showLoading("Inafungua Admin Panel...");
    window.hideAllSections();
    document.getElementById("adminSection").style.display = "block";
    window.loadCategories();
    window.loadSlideshowAdminList();
    window.hideLoading();
};

window.checkCurrentLocation = function() {
    let hash = window.location.hash;
    let dbname = localStorage.getItem("name");
    
    if (hash === "#admin") { 
        window.showAdminPanel();
        return; 
    }
    if (!dbname) { 
        window.hideAllSections(); 
        if (hash === "#login") window.showlogin(); 
        else window.showregister(); 
    } else { 
        window.showcat(true); 
    }
};

// SEARCH BAR LOGIC
window.handleSearchInput = function(query) {
    const searchTerm = query.toLowerCase().trim();
    if(searchTerm === "") {
        window.showcat(true);
        return;
    }
    
    database.ref('buses').once('value', (snapshot) => {
        const allCategories = snapshot.val() || {};
        let matchingBuses = [];
        
        for (const [catId, buses] of Object.entries(allCategories)) {
            for (const [busKey, bus] of Object.entries(buses)) {
                if (bus.name && bus.name.toLowerCase().includes(searchTerm)) {
                    matchingBuses.push({ bus, catId, busKey });
                }
            }
        }
        
        if (matchingBuses.length > 0) {
            window.hideAllSections();
            document.getElementById("bus-view-section").style.display = "block";
            document.getElementById("navicon").style.display = "flex";
            document.getElementById("dynamic-bus-title").textContent = `MATOKEO YA: "${query.toUpperCase()}"`;
            
            let busList = document.getElementById("dynamic-bus-list");
            busList.innerHTML = "";
            
            matchingBuses.forEach(item => {
                const bus = item.bus;
                const card = document.createElement("div");
                card.className = "card bus-card";
                card.onclick = function() {
                    window.showDetails(bus.name, bus.image, bus.desc, 'bus', bus.link, item.catId, 'SEARCH', bus.price || 0, item.busKey, bus.setLink || '');
                };
                card.innerHTML = `
                    <div class="card-img-wrapper">
                        <img src="${bus.image}" alt="${bus.name}">
                    </div>
                    <div class="card-content">
                        <span class="card-tag">${bus.price && parseInt(bus.price) > 0 ? `PREMIUM (Tsh ${bus.price})` : 'FREE MOD'}</span>
                        <div class="card-title">${bus.name}</div>
                        <div class="card-footer">
                            <span>1 link</span>
                            <span class="card-action-icon">&rsaquo;</span>
                        </div>
                    </div>
                `;
                busList.appendChild(card);
            });
        }
    });
};

window.addEventListener("popstate", function(event) {
    let hash = window.location.hash;
    if (hash === "#admin") { window.showAdminPanel(); return; }
    let dbname = localStorage.getItem("name");
    if (!dbname) { window.showregister(); return; }
    
    if (event.state && event.state.page) {
        let page = event.state.page;
        if (page === "home") window.showcat(true);
        else window.showBusCategory(page, event.state.catName || page, false);
    } else { window.checkCurrentLocation(); }
});

window.addEventListener("DOMContentLoaded", () => {
    window.loadCategories();
    window.loadSlideshow();
    window.checkCurrentLocation();
});

// AI ASSISTANT CONFIGURATION
const PART_A = "AQ.Ab8RN6LL0VgiZ";
const PART_B = "gSXifpheeDVtaGlQ7V";
const PART_C = "n4-8t42QCcrK885ck8w";
const GEMINI_API_KEY = PART_A + PART_B + PART_C;

window.toggleChat = function() {
    const chatBox = document.getElementById("ai-chat-box");
    if (!chatBox) return;
    if (chatBox.style.display === "none" || chatBox.style.display === "") {
        chatBox.style.display = "flex";
    } else {
        chatBox.style.display = "none";
    }
};

window.checkEnter = function(event) {
    if (event.key === "Enter") {
        window.sendMessage();
    }
};

window.sendMessage = async function() {
    const inputEl = document.getElementById("ai-user-input");
    const messageText = inputEl.value.trim();
    if (messageText === "") return;

    const messagesContainer = document.getElementById("ai-chat-messages");

    const userDiv = document.createElement("div");
    userDiv.className = "message user-message";
    userDiv.textContent = messageText;
    messagesContainer.appendChild(userDiv);

    inputEl.value = "";
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    const loadingDiv = document.createElement("div");
    loadingDiv.className = "message ai-message";
    loadingDiv.id = "ai-loading-msg";
    loadingDiv.textContent = "Kitengo AI inafikiria...";
    messagesContainer.appendChild(loadingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    try {
        const systemPrompt = "Wewe ni Kitengo AI Assistant - msaidizi wa kucheza mahitaji ya watumiaji wa Kitengo Gaming. Jibu kwa Kiswahili kimafupi na kwa maelezo mazuri. Usitumie markdown. Jibu ni karibu 2-3 sentensi tu.";
        const userPrompt = messageText + " (" + systemPrompt + ")";
        
        const askGemini = async (model) => {
            return await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{ 
                        parts: [{ 
                            text: userPrompt
                        }] 
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 150
                    }
                })
            });
        };

        let response = await askGemini("gemini-2.5-flash");
        if (!response.ok) {
            response = await askGemini("gemini-1.5-flash");
        }

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        
        const loader = document.getElementById("ai-loading-msg");
        if(loader) loader.remove();

        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
            const aiResponseText = data.candidates[0].content.parts[0].text;

            const aiDiv = document.createElement("div");
            aiDiv.className = "message ai-message";
            aiDiv.textContent = aiResponseText;
            messagesContainer.appendChild(aiDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } else {
            throw new Error("Invalid response format");
        }

    } catch (error) {
        console.error("AI Error:", error);
        const loader = document.getElementById("ai-loading-msg");
        if(loader) loader.remove();
        
        const aiDiv = document.createElement("div");
        aiDiv.className = "message ai-message";
        aiDiv.textContent = "Samahani mkuu, KITENGO AI NIPO KWENYE MABORESHO KWA SASA. Jaribu tena baadae!";
        messagesContainer.appendChild(aiDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
};
