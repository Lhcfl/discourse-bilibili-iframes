import { apiInitializer } from "discourse/lib/api";
import { BilibiliPlayer } from "../components/bilibili-player";

export default apiInitializer((api) => {
  /**
   * @arg {HTMLElement} onebox
   */
  function getUrl(onebox) {
    if (onebox.tagName === "A") {
      return onebox.getAttribute("href");
    } else {
      return onebox.dataset?.oneboxSrc;
    }
  }

  /**
   * @arg {HTMLElement} onebox
   */
  function renderBilibili(onebox, helper) {
    const src = getUrl(onebox);
    if (!src) {
      return;
    }
    const bvid = src?.match(
      /https:\/\/www.bilibili.com\/video\/([a-zA-Z0-9]+)/
    );
    const pge = src?.match(
      /https:\/\/www.bilibili.com\/video\/[\s\S]+[\?\&]p=([0-9]+)/
    );
    const title = onebox.querySelector("h3 > a");
    if (bvid && bvid[1]) {
      let link = `//player.bilibili.com/player.html?bvid=${bvid[1]}&autoplay=0`;
      if (pge && pge[1]) {
        link += `&page=${pge[1]}`;
      }
      const container = document.createElement("div");
      onebox.replaceWith(container);
      helper.renderGlimmer(container, BilibiliPlayer, {
        src: link,
        url: src,
        title: title?.innerText ?? src,
      });
      return true;
    }
  }

  /**
   * @arg {HTMLElement} onebox
   */
  function renderMusic163(onebox) {
    const src = onebox?.getAttribute("data-onebox-src");
    const bvid = src?.match(
      /^https:\/\/music.163.com\/[\s\S]*song\?id=([0-9]+)/
    );
    if (bvid && bvid[1]) {
      let link = `//music.163.com/outchain/player?type=2&id=${bvid[1]}&auto=0&height=66`;
      const ifr = document.createElement("iframe");
      ifr.setAttribute("src", link);
      ifr.setAttribute("width", 330);
      ifr.setAttribute("height", 86);
      ifr.setAttribute("allowfullscreen", "false");
      ifr.setAttribute("frameborder", "no");
      onebox.appendChild(ifr);
      return true;
    }
  }

  api.decorateCookedElement(
    /** @arg {HTMLElement} elem */
    (elem, h) => {
      for (const onebox of elem.querySelectorAll(".onebox")) {
        renderBilibili(onebox, h) || renderMusic163(onebox);
      }
    },
    {
      onlyStream: true,
    }
  );
});
