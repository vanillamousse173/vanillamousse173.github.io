// JavaScript Document

function loadRecentMemes(targetSelector = "#meme-grid", offset = 0, limit = 15, append = false) {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  fetch(`https://bxf.fwt.mybluehost.me/wp-json/wp/v2/memewiki?_embed&per_page=${limit}&offset=${offset}`)
    .then(res => res.json())
    .then(data => {
      let html = "";
      data.forEach(post => {
        const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "https://via.placeholder.com/300x200?text=No+Image";
        let intro = post.acf?.intro || "";
        intro = intro.length > 30 ? intro.substring(0, 30) + " ▶" : intro;
        const slug = post.slug;

        html += `
          <div class="grid-item" onclick="window.open('https://cultivatememe.moe/meme-wiki.html?slug=${slug}', '_blank')">
            <img src="${img}" alt="${post.title.rendered}">
            <div class="grid-overlay">${intro}</div>
          </div>
        `;
      });

      if (append) {
        target.innerHTML += html;
      } else {
        target.innerHTML = html;
      }

      if (data.length < limit) {
        const loadMoreBtn = document.getElementById("load-more-memes");
        if (loadMoreBtn) loadMoreBtn.style.display = "none";
      }
    })
    .catch(err => {
      console.error("memewiki 圖庫載入失敗：", err);
      target.innerHTML = "<p>⚠️ 無法載入圖庫</p>";
    });
}

  