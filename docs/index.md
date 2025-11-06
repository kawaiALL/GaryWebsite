<div class="map-container">
    <div id="my-custom-map" style="height: 700px; width: 100%;"></div>
</div>


<script>
document.addEventListener('DOMContentLoaded', function() {
    // 初始化地圖
    var map = L.map('my-custom-map').setView([22.3193, 114.1694], 10);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
        // 移除 opacity: 0.5 這行，恢復完全不透明
    }).addTo(map);
    
    // 添加你的自定義歷史地圖
    
    L.tileLayer('https://mapwarper.net/maps/tile/96884/{z}/{x}/{y}.png', {
        attribution: '© Map Warper',
        maxZoom: 18,
        minZoom: 10
    }).addTo(map);
    
    
    var marker1 = L.marker([22.2933, 114.1699]).addTo(map);
    marker1.bindPopup(`
        <h3>Victoria Harbour</h3>
        <p>The harbour has historically been defined by its deep, sheltered waters and strategic location on South China Sea. These factors were also instrumental in Hong Kong's establishment as a British colony in 1841 and its subsequent development as a trading hub.</p>
        <img src="../Tamar.jpg" width="200">
        <br><small><a href="/mysite/map3/more/">閱讀更多</a></small>
    `);
    
    
    var marker2 = L.marker([22.41956114292878, 114.2033541327952]).addTo(map);
    marker2.bindPopup(`
        <h3>Fung King-Hey Building</h3>
        <p>Department of History, The Chinese University of Hong Kong.</p>
        <a href="https://www.history.cuhk.edu.hk/" target="_blank">More information</a>
    `);
    
    var marker3 = L.marker([22.318736891097352, 114.1359911974815]).addTo(map);
    marker3.bindPopup(`
        <h3><strong>Stonecutters Island</strong></h3>
        <p>昂船洲，坐落於香港維多利亞港西側，原為九龍半島西面的獨立島嶼，現屬深水埗區，經填海工程後與九龍半島相連。考諸史料，昂船洲自明清以來便已載入方誌，並非無名之島。</p>
        
        <p>因島嶼原始地形似翻轉的船舶，中文得名「昂（仰）船洲」。明萬曆年間《粵大記》便已以「仰船洲」著錄該島；清嘉慶的《新安縣誌》亦延續此名，明確其為新安縣（今香港及深圳部分區域）管轄下的海上島嶼。鴉片戰爭前，英國人在地圖上採用音譯作“Wong Chun Chow”。由於島上四處亦均見石礦場，採石業發展興旺，後來港英官方便將其稱為“Stonecutters Island” （石匠島），中文則沿用昂船洲一稱。 </p>

        <p>鴉片戰爭後，昂船洲歷史隨香港命運轉折。隨着《北京條約》的簽署，昂船洲亦隨九龍半島割讓英國。英國在取得昂船洲後，最先在該島興建一所監獄，以緩解域多利監獄擁擠問題，後因運營成本高昂廢棄，將其改為火藥儲存點；19 世紀 80 年代後，昂船洲又成為天花、霍亂等流行病的檢疫隔離地，其後更將其打造成永久性隔離檢疫站，承擔入境船舶及人員的檢疫任務。 另外，英軍亦依託其戰略地理在島上修建炮台，逐步將其打造成維多利亞港的軍事要塞。 二戰期間，日軍攻佔昂船洲並擴建設施，使其成為日軍的軍事基地，並將其易名為向島；二戰後，英軍重新接管，維持其軍事用途，並恢復原稱。香港回歸後，昂船洲軍事基地由中國人民解放軍接管，成為駐港部隊海軍基地，至今仍為軍事禁區，僅軍營開放日對市民開放。</p>
        
        <p>如今的昂船洲功能十分多元，北部為八號貨櫃碼頭，承擔航運物流核心任務，其擴建填海區（含昂船洲大橋及貨櫃碼頭部分）屬葵青區；東北面銜接住宅區；南面為駐港部隊軍營，島上還設有政府船塢、污水處理廠等公共設施，在保障香港城市運轉中發揮着關鍵作用。</p>
        
    `);

     var marker4 = L.marker([22.284480, 114.113406]).addTo(map);
    marker4.bindPopup(`
        <h3><strong>Green Islands</strong></h3>
        <p><b>大小青洲（Green Island and Little Green Island）</b>是香港中西區青洲與小青洲的合稱。香港華人多以「大小青洲」為中文通俗稱呼，並非政府認可的官方稱謂；政府則普遍使用Green Island and Little Green Island。兩島坐落於維多利亞港西部海域，無固定居民居住，因地處偏僻且無公共運輸直接抵達，普通民眾亦難以登島。</p>

        <p>大青洲擁有標誌性的燈塔建築群，包括 1875 年 7 月 1 日啟用的舊燈塔 ，是香港的第二座燈塔（首座為鶴咀燈塔），主要為進入維多利亞港西部的船舶導航；1893 年，鶴咀燈塔遷移至青洲，並於舊燈塔旁另起一新燈塔，於1905 年投入運作，與舊燈塔並列保留至今。數十年間，燈塔為無數西向入港船舶提供導航服務，在香港海事史上佔據重要地位。現時島上還留存有前歐籍職員宿舍及前看守員房舍，及天文台的自動氣象站。小青洲僅有一個氣象站，負責觀測維多利亞港以西海域上的天氣，供天文台日常運作及發出警報用。</p>

        <p>19 世紀 60-70年代，香港面對天花、霍亂等流行病威脅時，小青洲成為臨時檢疫站，與昂船洲、九龍灣共同承擔用於存放包括囚犯、爆炸物、隔離船隻和船員以及傳染病患者在內的「異類」。 1998-2004年間，大青洲設有羈押中心，作為越南船民檢疫的地方。</p>

        <p>20 世紀末，香港政府推出「青洲發展計畫」，擬通過填海將大小青洲與香港島連接，打造全新住宅區及公共屋邨，並將此地設為連接大嶼山海底隧道的起點。 但該計畫因遭到環保團體強烈反對而擱置，僅首階段的卑路乍灣填海工程順利完成。2004 年，香港政府將大青洲改用作戒毒所，此後燈塔的保育維修也由職員及戒毒者負責打理。 2008 年，青洲燈塔建築群被列為法定古跡，雖不對外開放，但成為香港海事文化與歷史傳承的重要載體。</p>
    `);
    // 6. 自動打開第一個標記的彈窗
    //marker4.openPopup();
});
</script>

參考資料