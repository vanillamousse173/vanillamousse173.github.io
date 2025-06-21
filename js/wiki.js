document.addEventListener("DOMContentLoaded", () => {
  const memeContent = document.querySelector(".content");

  // 建立 loading 訊息，不會覆蓋原本內容
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "loading-message";
  loadingDiv.textContent = "載入迷因中(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧";
  memeContent.appendChild(loadingDiv);

  // 取得 slug：支援 ?slug=xxx 與 ?xxx 兩種格式
  const params = new URLSearchParams(window.location.search);
  let slug = "";
  if (params.has("slug")) {
    slug = params.get("slug");
  } else {
    slug = decodeURIComponent(window.location.search.slice(1));
  }

  // 若無 slug
  if (!slug) {
    showErrorMessageWithLink("請點選一則迷因吧！(*´∀`)~♥");
    return;
  }

  fetch(`https://bxf.fwt.mybluehost.me/wp-json/wp/v2/memewiki?slug=${slug}&_embed`)
    .then((res) => res.json())
    .then((data) => {
      if (!data || data.length === 0) {
        showErrorMessageWithLink("此迷因不存在 ε＝ε＝┌(;ﾟдﾟ)┘<br>▼瀏覽其他已登錄迷因▼");
        return;
      }
    
      loadingDiv.remove();
      
      const post = data[0];
      const acf = post.acf || {};
      const title = post.title.rendered || "";
      const intro = acf.intro || "";

      // 1. 建立文章標題
      const h2 = document.createElement("h2");
      h2.textContent = title;
      document.querySelector(".meme-content").prepend(h2);

      // thead 標題
      const thead = document.createElement("thead");
      thead.innerHTML = `
        <tr>
          <th id="headtitle" colspan="2">${title}</th>
        </tr>
      `;
      document.querySelector(".meme-info table").prepend(thead);
      

      // === 發佈時間與修訂時間 ===
      const publishedDate = post.date;
      const modifiedDate = post.modified;
      const authorName = post._embedded?.author?.[0]?.name || "";

      function formatDate(dateStr) {
        return dateStr.slice(0, 10); 
      }

      const metaHTML = `
        <div class="meta">
          <p>發佈：${formatDate(publishedDate)} - ${authorName}</p>
          <p>修訂：${formatDate(modifiedDate)} - ${authorName}</p>
        </div>
      `;

      document.querySelector(".meme-content h2").insertAdjacentHTML("beforeend", metaHTML);

      // 2. 精選圖片
      const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
      const imageSource = acf.image_source || "";
      const imageSourceText = acf.image_source_text || "";

      if (image) {
        const imgRow = document.createElement("tr");
        imgRow.innerHTML = `
          <th colspan="2">
            ${imageSource ? `
              <a href="${imageSource}" target="_blank" class="imglink">
                <img src="${image}" alt="">
                <p class="imgtext">${imageSourceText || "來源"}</p>
              </a>
            ` : `
              <img src="${image}" alt="">
            `}
          </th>`;
        document.querySelector(".meme-info table").insertBefore(imgRow, document.querySelector(".meme-info table").children[1]);
      }

      // 3. 表格資訊
      const infoTable = document.querySelector(".meme-info table");
      const type = acf.type?.map((term) => term.name).join("、") || "";
      const year = acf.year || "";
      const original_year = acf.original_year || "";
      const viral_year = acf.viral_year || "";
      const origin = acf.origin?.map((term) => term.name).join("、") || "";
      const region = acf.region?.map((term) => term.name).join("、") || "";
      const category = acf.category?.map((term) => term.name).join("、") || "";

      let infoHTML = "";

      if (type) infoHTML += `<tr><th>類型</th><td>${type}</td></tr>`;
      if (acf.year) infoHTML += `<tr><th>年份</th><td>${acf.year}</td></tr>`;
      if (acf.original_year) infoHTML += `<tr><th>起源年份</th><td>${acf.original_year}</td></tr>`;
      if (acf.viral_year) infoHTML += `<tr><th>流行年份</th><td>${acf.viral_year}</td></tr>`;
      if (origin) infoHTML += `<tr><th>起源</th><td>${origin}</td></tr>`;
      if (region) infoHTML += `<tr><th>地區</th><td>${region}</td></tr>`;
      if (category) infoHTML += `<tr><th>分類</th><td>${category}</td></tr>`;

      infoTable.innerHTML += infoHTML;

      // 4. Intro
      document.querySelector(".meme-content").insertAdjacentHTML("beforeend", intro);

      // 5. 段落區塊（accordion）
      for (let i = 1; i <= 10; i++) {
        const title = acf[`title_${i}`];
        const content = acf[`content_${i}`];
        if (title && content) {
          const acc = document.createElement("div");
          acc.className = "accordion";
          acc.innerHTML = `<h3>${title}</h3>`;

          const panel = document.createElement("div");
          panel.className = "panel";
          panel.innerHTML = content;

          document.querySelector(".meme-content").appendChild(acc);
          document.querySelector(".meme-content").appendChild(panel);

          // 延遲一點再觸發轉換，確保 DOM 確實渲染完成
          setTimeout(() => {
            // X / Twitter
            if (window.twttr && twttr.widgets) {
              twttr.widgets.load(panel);
            }

            // Instagram
            if (window.instgrm && instgrm.Embeds) {
              instgrm.Embeds.process();
            }

            // TikTok
            const tikTokScript = document.querySelector('script[src*="tiktok.com/embed.js"]');
            if (window.tiktok && window.tiktok.Embeds) {
              window.tiktok.Embeds.process();
            }

            // Facebook
            if (window.FB && typeof FB.XFBML.parse === "function") {
              FB.XFBML.parse(panel);
            }

            // 等 embed 成功後再次調整 panel 高度
            setTimeout(() => {
              if (acc.classList.contains("active")) {
                panel.style.maxHeight = panel.scrollHeight + "px";
              }
            }, 2000);
          }, 200);

          
        }
      }

      // 6. 外部參考資料區塊
      const referenceList = [];
      for (let i = 1; i <= 10; i++) {
        const refTitle = acf[`ref_title_${i}`];
        const refUrl = acf[`ref_url_${i}`];
        if (refTitle && refUrl) {
          referenceList.push(`
            <li id="ref${i}">
              <sup><a href="#note${i}">[${i}]</a></sup>
              <a href="${refUrl}" target="_blank" rel="noopener">${refTitle}</a>
            </li>`);
        }
      }

      if (referenceList.length > 0) {
        const acc = document.createElement("div");
        acc.className = "accordion";
        acc.innerHTML = `<h3>參考資料</h3>`;

        const panel = document.createElement("div");
        panel.className = "panel";
        panel.innerHTML = `<ul class="external-references">${referenceList.join("")}</ul>`;

        document.querySelector(".meme-content").appendChild(acc);
        document.querySelector(".meme-content").appendChild(panel);
      }


      initAccordion();
      observePanelResize();
      // === ResizeObserver：自動調整展開 panel 高度 ===
      function observePanelResize() {
        const panels = document.querySelectorAll(".panel");

        panels.forEach(panel => {
          const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
              const acc = panel.previousElementSibling;
              if (acc?.classList.contains("active")) {
                panel.style.maxHeight = panel.scrollHeight + "px";
              }
            }
          });
          observer.observe(panel);
        });
      }

      handleHashChange(); // 初次檢查 hash

      // === 處理 hash 變化（包含補償 header 高度與展開區塊）===
      window.addEventListener("hashchange", handleHashChange);

      function handleHashChange() {
        const hash = window.location.hash;
        if (hash.startsWith("#ref") || hash.startsWith("#note")) {
          const accList = document.querySelectorAll(".accordion");
          const panelList = document.querySelectorAll(".panel");

          if (hash.startsWith("#ref") && accList.length > 0 && panelList.length > 0) {
            const lastAcc = accList[accList.length - 1];
            const lastPanel = panelList[panelList.length - 1];

            lastAcc.classList.add("active");
            lastPanel.style.maxHeight = lastPanel.scrollHeight + "px";
            lastPanel.style.overflow = "visible";
          }

          const target = document.querySelector(hash);
          if (target) {
            const yOffset = -105;
            const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
            setTimeout(() => {
              window.scrollTo({ top: y, behavior: "smooth" });
            }, 200);
          }
        }
      }
      
      //回報問題連結
      const reportLink = document.createElement("p");
      reportLink.className = "report-link";
      reportLink.innerHTML = `有錯誤？<a href="#" id="open-report-modal">回報問題</a>`;
      document.querySelector(".meme-info").appendChild(reportLink);

      //建立模態框
      if (!document.getElementById("report-modal")) {
        const modal = document.createElement("div");
        modal.id = "report-modal";
        modal.innerHTML = `
          <div class="modal-overlay"></div>
          <div class="modal-content" id="form">
            <button class="modal-close" title="關閉">×</button>
            <iframe src="https://www.surveycake.com/s/4eBk2"
              width="100%" height="600" frameborder="0"></iframe>
          </div>
        `;
        document.body.appendChild(modal);
      }

      // === 彈出視窗開關邏輯 ===
      document.addEventListener("click", function (e) {
        if (e.target.id === "open-report-modal") {
          e.preventDefault();
          document.getElementById("report-modal").classList.add("show");
        }
        if (e.target.classList.contains("modal-overlay") || e.target.classList.contains("modal-close")) {
          document.getElementById("report-modal").classList.remove("show");
        }
      });

    })
    .catch((err) => {
      console.error("抓取失敗", err);
    });

  // === Accordion 展開功能 ===
  function initAccordion() {
    const acc = document.getElementsByClassName("accordion");

    function setPanelState() {
      for (let i = 0; i < acc.length; i++) {
        const panel = acc[i].nextElementSibling;
        if (window.innerWidth >= 768) {
          acc[i].classList.add("active");
          panel.style.maxHeight = panel.scrollHeight + "px";
          panel.style.overflow = "visible";
        } else {
          acc[i].classList.remove("active");
          panel.style.maxHeight = null;
          panel.style.overflow = "hidden";
        }
      }
    }

    setPanelState();

    for (let i = 0; i < acc.length; i++) {
      const panel = acc[i].nextElementSibling;

      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
          panel.style.overflow = "hidden";
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
          panel.style.overflow = "visible";
        }
      });
    }

    let resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(setPanelState, 200);
    });
  }
  
});

function showErrorMessageWithLink(message) {
  const postWrapper = document.querySelector(".post-wrapper");
  if (postWrapper) postWrapper.style.display = "none";

  const memeContent = document.querySelector(".content");

  const loading = document.querySelector(".loading-message");
  if (loading) loading.remove();

  const tip = document.createElement("div");
  tip.className = "message-block";
  tip.innerHTML = `
    ${message}
    <article>
    <div id="meme-grid" class="grid-container"></div>
    </article>
            `;
    memeContent.appendChild(tip);

    // 加入圖庫容器
    const gridContainer = document.createElement("div");
    gridContainer.id = "meme-grid";
    gridContainer.className = "grid-container";
    memeContent.appendChild(gridContainer);

    // 動態載入 grid.js
    const script = document.createElement("script");
    script.src = "js/grid.js"; 
    script.onload = () => {
      loadRecentMemes("#meme-grid");
    };
    document.body.appendChild(script);
}




