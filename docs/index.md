<!-- PWA配置 - 使用完整URL -->
<link rel="manifest" href="https://kawaiall.github.io/GaryWebsite/manifest.json">
<meta name="theme-color" content="#3F07E8">

<!-- Favicon -->
<link rel="icon" href="https://kawaiall.github.io/GaryWebsite/images/favicon.png">

<!-- 确保MkDocs不干扰 -->
<script>
// 强制设置manifest
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 初始化PWA...');
    
    // 移除可能存在的旧manifest链接
    const oldManifest = document.querySelector('link[rel="manifest"]');
    if (oldManifest) oldManifest.remove();
    
    // 创建新的manifest链接
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = 'https://kawaiall.github.io/GaryWebsite/manifest.json';
    document.head.appendChild(manifestLink);
    
    console.log('✅ Manifest已设置');
});
</script>


<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<style>
/* 强制全屏重置 */
main .md-main__inner {
    margin: 0 !important;
    padding: 0 !important;
    max-width: 100% !important;
}

main .md-content {
    padding: 0 !important;
    margin: 0 !important;
}

.md-sidebar--primary,
.md-sidebar--secondary {
    display: none !important;
}

.mapwarper-style-container {
    height: 100vh !important;
    margin: 0 !important;
    padding: 0 !important;
}
</style>

<div class="mapwarper-style-container">
    <!-- 工具欄 -->
    <div class="map-toolbar">
        <div class="toolbar-left">
            <button class="tool-btn" onclick="zoomIn()" title="放大">+</button>
            <button class="tool-btn" onclick="zoomOut()" title="縮小">-</button>
            <button class="tool-btn" onclick="resetView()" title="重置視圖">↺</button>
            <span class="zoom-level">Scale: <span id="zoom-level">11</span></span>
        </div>
        <div class="toolbar-right">
            <span class="map-info">Map</span>
        </div>
    </div>
    
<!-- 地圖容器 -->
<div id="mapwarper-style-map" class="map-container"></div>
    
<!-- 圖層控制面板 -->
<div class="layer-control" id="layerControl">
    <div class="control-header">
        <h4>Layers</h4>
        <button class="close-btn" onclick="toggleLayerControl()" title="Hide panel">×</button>
    </div>
    <div class="control-content">
        <label class="layer-item">
            <input type="checkbox" id="historical-layer" checked onchange="toggleHistoricalLayer()">
            <span>Historical Map (1957)</span>
        </label>
        <label class="layer-item">
            <input type="checkbox" id="modern-layer" onchange="toggleModernLayer()">
            <span>Modern Map</span>
        </label>
        <div class="opacity-control">
            <label>Transparency</label>
            <input type="range" id="opacity-slider" min="0" max="100" value="100" oninput="changeOpacity(this.value)">
            <span id="opacity-value">100%</span>
        </div>
    </div>
</div>

<!-- 添加显示按钮 -->
<button class="show-layers-btn" id="showLayersBtn" onclick="toggleLayerControl()" title="Show layers">
    <span>🗂️Layers</span>
</button>



<style>
/* Map Warper 風格容器 */
.mapwarper-style-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 120px);
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    overflow: hidden;
}

/* 工具欄 */
.map-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    background: #fff;
    border-bottom: 1px solid #dee2e6;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    z-index: 1000;
}

.toolbar-left, .toolbar-right {
    display: flex;
    align-items: center;
    gap: 10px;
}

.tool-btn {
    width: 32px;
    height: 32px;
    border: 1px solid #ced4da;
    background: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.tool-btn:hover {
    background: #e9ecef;
    border-color: #6c757d;
}

.zoom-level {
    font-size: 14px;
    color: #495057;
    margin-left: 10px;
}

.map-info {
    font-size: 14px;
    color: #6c757d;
    font-weight: 500;
}

/* 地圖容器 */
.map-container {
    width: 100%;
    height: calc(100% - 49px); /* 減去工具欄高度 */
    background: #e9ecef;
}

/* 圖層控制面板 */
.layer-control {
    position: absolute;
    top: 60px;
    right: 20px;
    width: 250px;
    background: white;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    z-index: 800;
}

.control-header {
    padding: 12px 16px;
    background: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
}

.control-header h4 {
    margin: 0;
    font-size: 14px;
    color: #495057;
    font-weight: 600;
}

.control-content {
    padding: 16px;
}

.layer-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 14px;
}

.layer-item input {
    margin-right: 8px;
}

.opacity-control {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #e9ecef;
}

.opacity-control label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
    color: #495057;
}

.opacity-control input[type="range"] {
    width: 100%;
    margin-bottom: 8px;
}

#opacity-value {
    font-size: 12px;
    color: #6c757d;
    float: right;
}

/* Leaflet 地圖自定義樣式 */
.leaflet-container {
    background: #f8f9fa !important;
    font-family: inherit !important;
}

.leaflet-popup-content-wrapper {
    border-radius: 8px !important;
    background: rgba(255, 255, 255, 0.98) !important;
    backdrop-filter: blur(10px) !important;
}
</style>

<script>
// 地圖變量
var map;
var historicalLayer;
var modernLayer;

function createColoredDot(color, size = 20) {
    return L.divIcon({
        className: 'custom-dot',
        html: `<div style="background: ${color}; 
                         width: ${size}px; height: ${size}px; 
                         border-radius: 50%; 
                         border: 3px solid white;
                         box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>`,
        iconSize: [size + 6, size + 6],
        iconAnchor: [(size + 6) / 2, (size + 6) / 2]
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // 初始化地圖
    map = L.map('mapwarper-style-map').setView([22.3193, 114.1694], 11);
    
    // 添加現代地圖底圖（低透明度）
    modernLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        opacity: 0.3
    });
    
    // 添加歷史地圖
    historicalLayer = L.tileLayer('https://www.mapwarper.net/maps/tile/99136/{z}/{x}/{y}.png', {
        attribution: 'Historical Map © Map Warper',
        maxZoom: 18,
        minZoom: 10,
        opacity: 1.0
    }).addTo(map);
    
    // 監聽縮放事件更新顯示
    map.on('zoomend', function() {
        document.getElementById('zoom-level').textContent = map.getZoom();
    });
    
    // 添加標點（保持你原來的標點）
    var marker1 = L.marker([22.320859, 114.140016], {
        icon: createColoredDot('#3F07E8')  // 添加这一行
    }).addTo(map);

    marker1.bindPopup(` 
        <h3><strong>昂船洲 Stonecutters Island</strong></h3>
        <p>昂船洲，坐落於香港維多利亞港西側，原為九龍半島西面的獨立島嶼，現屬深水埗區，經填海工程後與九龍半島相連。考諸史料，昂船洲自明清以來便已載入方誌，並非無名之島。</p>
        
        <p>因島嶼原始地形似翻轉的船舶，中文得名「昂（仰）船洲」。明萬曆年間《粵大記》便已以「仰船洲」著錄該島；清嘉慶的《新安縣誌》亦延續此名，明確其為新安縣（今香港及深圳部分區域）管轄下的海上島嶼。鴉片戰爭前，英國人在地圖上採用音譯作“Wong Chun Chow”。由於島上四處亦均見石礦場，採石業發展興旺，後來港英官方便將其稱為“Stonecutters Island” （石匠島），中文則沿用昂船洲一稱。 </p>

        <p>鴉片戰爭後，昂船洲歷史隨香港命運轉折。隨着《北京條約》的簽署，昂船洲亦隨九龍半島割讓英國。英國在取得昂船洲後，最先在該島興建一所監獄，以緩解域多利監獄擁擠問題，後因運營成本高昂廢棄，將其改為火藥儲存點；19 世紀 80 年代後，昂船洲又成為天花、霍亂等流行病的檢疫隔離地，其後更將其打造成永久性隔離檢疫站，承擔入境船舶及人員的檢疫任務。 另外，英軍亦依託其戰略地理在島上修建炮台，逐步將其打造成維多利亞港的軍事要塞。 二戰期間，日軍攻佔昂船洲並擴建設施，使其成為日軍的軍事基地，並將其易名為向島；二戰後，英軍重新接管，維持其軍事用途，並恢復原稱。香港回歸後，昂船洲軍事基地由中國人民解放軍接管，成為駐港部隊海軍基地，至今仍為軍事禁區，僅軍營開放日對市民開放。</p>
        
        <p>如今的昂船洲功能十分多元，北部為八號貨櫃碼頭，承擔航運物流核心任務，其擴建填海區（含昂船洲大橋及貨櫃碼頭部分）屬葵青區；東北面銜接住宅區；南面為駐港部隊軍營，島上還設有政府船塢、污水處理廠等公共設施，在保障香港城市運轉中發揮着關鍵作用。</p>
        
<div class="historical-video">
    <video controls width="100%">
        <source src="images/20201027_114909.mp4" type="video/mp4">
    </video>
</div>
    `);

    var marker2 = L.marker([22.284480, 114.113406], {
        icon: createColoredDot('#3F07E8')  // 添加这一行
    }).addTo(map);

    marker2.bindPopup(`
        <h3><strong>大小青洲 Green Islands</strong></h3>
        <p><b>大小青洲（Green Island and Little Green Island）</b>是香港中西區青洲與小青洲的合稱。香港華人多以「大小青洲」為中文通俗稱呼，並非政府認可的官方稱謂；政府則普遍使用Green Island and Little Green Island。兩島坐落於維多利亞港西部海域，無固定居民居住，因地處偏僻且無公共運輸直接抵達，普通民眾亦難以登島。</p>

        <p>大青洲擁有標誌性的燈塔建築群，包括 1875 年 7 月 1 日啟用的舊燈塔 ，是香港的第二座燈塔（首座為鶴咀燈塔），主要為進入維多利亞港西部的船舶導航；1893 年，鶴咀燈塔遷移至青洲，並於舊燈塔旁另起一新燈塔，於1905 年投入運作，與舊燈塔並列保留至今。數十年間，燈塔為無數西向入港船舶提供導航服務，在香港海事史上佔據重要地位。現時島上還留存有前歐籍職員宿舍及前看守員房舍，及天文台的自動氣象站。小青洲僅有一個氣象站，負責觀測維多利亞港以西海域上的天氣，供天文台日常運作及發出警報用。</p>

        <p>19 世紀 60-70年代，香港面對天花、霍亂等流行病威脅時，小青洲成為臨時檢疫站，與昂船洲、九龍灣共同承擔用於存放包括囚犯、爆炸物、隔離船隻和船員以及傳染病患者在內的「異類」。 1998-2004年間，大青洲設有羈押中心，作為越南船民檢疫的地方。</p>

        <p>20 世紀末，香港政府推出「青洲發展計畫」，擬通過填海將大小青洲與香港島連接，打造全新住宅區及公共屋邨，並將此地設為連接大嶼山海底隧道的起點。 但該計畫因遭到環保團體強烈反對而擱置，僅首階段的卑路乍灣填海工程順利完成。2004 年，香港政府將大青洲改用作戒毒所，此後燈塔的保育維修也由職員及戒毒者負責打理。 2008 年，青洲燈塔建築群被列為法定古跡，雖不對外開放，但成為香港海事文化與歷史傳承的重要載體。</p>
    `);

    var marker3 = L.marker([22.28429382427193, 114.18273455273413], {
        icon: createColoredDot('#3F07E8')  // 添加这一行
    }).addTo(map);

    marker3.bindPopup(`
        <h3><strong>奇力島 Kellett Island </strong></h3>
        <p>奇力島（Kellett Island）坐落於今香港島灣仔海底隧道入口旁側，這座曾經孤懸於維多利亞港的無人島，因與相鄰的渣甸花園構成形似一對燈籠，故俗稱「燈籠洲」（或塘龍洲）。而「奇力島」則得名自考察香港地理之英國皇家海軍上尉及探險家奇力（Henry Kellett），粵語譯名「基力島」、「嘉烈島」等常見於舊時文獻。</p>

        <p>香港開埠初期，因該島位於港島東角，北面的九龍半島仍屬清朝管轄，清廷在此駐扎官兵，與港島英軍時有摩擦。為防範來自九龍的軍事威脅，英軍選擇在港島北岸中央÷的奇力島興建炮台，置炮三門，與西部昂船洲互相呼應，掌控維多利亞港的水路。</p>

        <p>1860 年《北京條約》簽訂後，九龍半島割讓給英國，奇力島炮台的軍事意義驟然下降，原有火炮被遷移至其他防線。但由於小島遠離岸邊，英軍便將並將炮台改建為火藥庫，繼續維持軍事管制。1898 年，《奇力島條例》的頒佈更明確禁止無關船艇及人員登島，進一步強化了該島作為軍用地的特殊性。此時的奇力島雖不再直面戰爭威脅，卻以另一種形式參與香港軍事中。</p>

        <p>進入 20 世紀，隨着香港城市發展與軍事佈局調整，奇力島的功能迎來轉折。火藥庫在1939年遷移。港英政府其後於該處實施填海工程，使這座孤立小島與港島本土連為一體。日治時期，日軍沿用其軍事用途，仍以該島為軍火庫。1946 年二戰結束後，奇力島的軍事使命正式終結，香港皇家遊艇會（香港帆船會）接管該地，在原有基礎上興建會所及碼頭設施，使用至今。</p>

        <p>如今，奇力島已完全融入灣仔市區，島上的遊艇會建築與毗鄰的海底隧道入口、高樓大廈相映成趣。</p>
    `);
    
    var popupContent = `
        <h3><strong>龍鼓洲（Tongkoo）與沙洲（Sawchow）</strong></h3>
        <p>龍鼓洲（Tongkoo）與沙洲（Sawchow）同屬香港屯門區，坐落於珠江口東側、青山半島以西海域，作為香港早期史前文化的重要遺址。早在20世紀二三十年代，考古學家已在這裏發現史前石器和陶器，龍鼓洲和沙洲均遺留古文化遺址，見證了香港地區從新石器時代至近代海洋文明的發展。 </p>

        <p>龍鼓洲與沙洲現無固定聚落及農耕活動，但其長期為漁民往來頻繁的區域，兼具漁業生產與墓葬安葬功能。兩島所處海域位於鹹淡水交匯帶，漁業資源豐富，且為珠江內河出海航道的必經節點，歷來是漁民開展生產作業的核心區域。因此，兩島不僅是遷徙漁民的臨時作業與補給空間，島上亦留存有相關墓葬遺跡 ：近代龍鼓洲考古工作中，曾在島內發現近代人類骨骼。沙洲方面，19 世紀 40 年代已建有天后廟，其主要朝聖群體為來自對岸大陸地區及大嶼山的漁民群體，反映出該島在沿海漁民信仰體系中的重要地位。</p>
        
        <p>龍鼓洲早在20世紀二三十年代起陸續暴露史前遺址，出土大量文物，包括三角形手鋤、石英巖環等石器，以及粗繩紋陶、帶「眼睛」圖案的軟質陶等，更有宋代至明代的釉陶殘片出土，被學者認定為香港早期史前文化的遺址；沙洲雖未經大規模發掘，但曾發現與龍鼓洲風格一致的軟陶及商代風格匕首斧，其壓印圖案與龍鼓洲共享相同文化源頭，均受北方商代裝飾藝術影響，證明兩島在史前時期同屬一個文化圈。</p>

        <p>殖民時期起，兩島一直處於開發程度較低的狀況，殖民政府亦未對其進行商業開發。如今兩島均無固定居民，保持原始自然地貌，龍鼓洲、沙洲因豐富考古遺存成為學術研究熱點，附近的海洋生態亦同樣備受矚目，成為兼具生態價值與歷史回憶的重要地標。</p>

`;

    var marker4 = L.marker([22.376165165479804, 113.8832624680332], {
        icon: createColoredDot('#B69EFF')
    }).addTo(map);

    var marker5 = L.marker([22.34780149573006, 113.88697594754731], {
        icon: createColoredDot('#B69EFF')  // 相同顏色
    }).addTo(map);

// 兩個標點綁定同一個彈窗內容
    marker4.bindPopup(popupContent);
    marker5.bindPopup(popupContent);

 var marker6 = L.marker([22.351973, 114.059578], {
        icon: createColoredDot('#3F07E8')  // 添加这一行
    }).addTo(map);

    marker6.bindPopup(`
        <h3><strong>馬灣（Ma Wan）</strong></h3>
        <p>馬灣（Ma Wan，古稱馬灣洲、銅錢洲）是位於珠江口東側、大嶼山東北部的島嶼，隸屬香港荃灣區；其與大嶼山之間的海峽即汲水門（古名急水門），為維多利亞港西面入口的重要水道，珠江口東路的關鍵。</p>

        <p>馬灣曾因島形類穿孔銅錢，古稱「銅錢洲」，後因島上主祀天后的「娘媽廟」（粵語「娘媽」讀作「娘馬」）得名「馬灣洲」，衍生出馬灣村、馬角咀等地名。亦有説法馬灣的天后廟為海盜張保仔以大嶼山東涌為巢穴時所修建，並為其哨站；汲水門本名「急水門」，因水道水流湍急得名，後因船舶易被急流捲入，鄉民更名「汲水門」並立佛碑鎮壓，該碑亦留存至今。</p>

        <p>1841 年前，馬灣與汲水門已具軍事與交通價值。明萬曆年間，馬灣隸屬南頭寨參將管轄，設哨船巡守；清初復界後增設急水門汛，強化海防。晚清時，汲水門駐有大鵬協營把總一員及士兵三十五名，軍事地位顯要。考古發現顯示，馬灣東灣仔村存在文化層，涵蓋新石器時代中期至隋唐層序，出土二十座墓葬、先民遺骸及文化遺物，「馬灣人」遺存為研究香港史前文化與種族源流提供了重要實證。</p>

        <p>英國占領香港後，馬灣汛營仍延續至晚清，光緒年間於島上設九龍關汲水門分關，負責檢查往來船隻，關址位於今馬灣鄉事委員會會址，當年「借地七英尺築路」的碑石為其遺證。隨着《展拓香港界址專條》簽訂後，英國取得含馬灣的九龍北部土地，中英邊界北移至深圳河，地處邊界以南的九龍關遂失去功能並關閉。馬灣原本為漁村，馬灣舊村有超過二百年歷。1960-70 年代為馬灣村的漁業繁盛期，居民以耕作、捕魚及曬蝦膏為生。隨着1997 年青馬大橋落成，馬灣迎來發展的新一頁，高檔住宅、主題公園及博覽館在島上相繼開放，成為馬灣轉型的節點。如今的馬灣與汲水門仍兼具交通運輸、歷史遺跡及現代文旅功能，見證了珠江口東側的發展。</p>
    `);



    console.log('🗺️ Map Warper 風格地圖查看器已加載');
});

// 工具欄功能
function zoomIn() {
    map.zoomIn();
}

function zoomOut() {
    map.zoomOut();
}

function resetView() {
    map.setView([22.3193, 114.1694], 11);
}

// 圖層控制功能
function toggleHistoricalLayer() {
    var checkbox = document.getElementById('historical-layer');
    if (checkbox.checked) {
        map.addLayer(historicalLayer);
    } else {
        map.removeLayer(historicalLayer);
    }
}

function toggleModernLayer() {
    var checkbox = document.getElementById('modern-layer');
    if (checkbox.checked) {
        map.addLayer(modernLayer);
    } else {
        map.removeLayer(modernLayer);
    }
}

function changeOpacity(value) {
    historicalLayer.setOpacity(value / 100);
    document.getElementById('opacity-value').textContent = value + '%';
}
</script>