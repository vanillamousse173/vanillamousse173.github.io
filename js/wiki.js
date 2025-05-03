document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  if (!slug) return;

  fetch(`https://bxf.fwt.mybluehost.me/wp-json/wp/v2/memewiki?slug=${slug}&_embed`)
    .then((res) => res.json())
    .then((data) => {
      const post = data[0];
      const acf = post.acf || {};
      const title = post.title.rendered || "";
      const intro = acf.intro || "";

      // 1. 文章標題
      document.querySelector(".meme-content h2").innerHTML = title;
      document.querySelector("#headtitle").innerHTML = title;

      // 2. 精選圖片
      const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
      const imageSource = acf.image_source || "";
      const imageSourceText = acf.image_source_text || ""; // 新增的來源顯示文字

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

      // 3. 表格資訊（抓自訂分類法）
      const infoTable = document.querySelector(".meme-info table");

      const type = acf.type?.map((term) => term.name).join("、") || "";
      const year = acf.year || "";
      const origin = acf.origin?.map((term) => term.name).join("、") || "";
      const region = acf.region?.map((term) => term.name).join("、") || "";
      const category = acf.category?.map((term) => term.name).join("、") || "";

      infoTable.innerHTML += `
        <tr><th>類型</th><td>${type}</td></tr>
        <tr><th>年份</th><td>${year}</td></tr>
        <tr><th>起源</th><td>${origin}</td></tr>
        <tr><th>地區</th><td>${region}</td></tr>        
        <tr><th>分類</th><td>${category}</td></tr>        
      `;


      // 4. Intro
      document.querySelector(".meme-content").insertAdjacentHTML("beforeend", intro);

      // 5. 段落區塊（heading + content）
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
        }
      }
      initAccordion();
    })
    .catch((err) => {
      console.error("抓取失敗", err);
    });

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
