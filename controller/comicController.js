const puppeteer = require("puppeteer-extra");
const dotenv = require("dotenv");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");

dotenv.config();
puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const hotComic = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
        "--devtools=false",
      ],
    });
    const page = await browser.newPage();
    await page.goto(process.env.BASE_URL);

    page.waitForSelector(".lepopup-element span").then((e) => e.click());

    let list = await page.evaluate(() => {
      let hot = Array.from(
        document.querySelectorAll(".recommendations .col-xl-2")
      ).map((element) => {
        let title = element.querySelector("h5").innerText;
        let thumbnail = element.querySelector("img").getAttribute("src");
        let url = element.querySelector(".series-link").getAttribute("href");
        let type = element.querySelector(".series-link > span").innerText;
        let newChapter = element.querySelector(
          ".series-chapter-item > span"
        ).innerText;
        let endpoint = url.slice(33, url.length - 1);
        return { title, type, newChapter, thumbnail, url, endpoint };
      });

      return hot;
    });

    return res.json({
      message: "Success Retrive Data",
      data: {
        hot: list,
      },
    });
  } catch (error) {
    res.json({
      status: false,
      message: error,
    });
  }
};

const newComic = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
        "--devtools=false",
      ],
    });
    const page = await browser.newPage();
    await page.goto(process.env.BASE_URL);

    page.waitForSelector(".lepopup-element span").then((e) => e.click());

    let list = await page.evaluate(() => {
      let update = Array.from(
        document.querySelectorAll(".latest .col-xl-3")
      ).map((element) => {
        let title = element.querySelector("h5").innerText;
        let thumbnail = element.querySelector("img").getAttribute("src");
        let url = element.querySelector(".series-link").getAttribute("href");
        let countChildType =
          element.querySelector(".series-link").childElementCount;
        let type = "";
        if (countChildType == 2) {
          type = element.querySelector(".series-link > span").innerText;
        }
        let newChapter = element.querySelector(
          ".series-chapter-item > span"
        ).innerText;
        let endpoint = url.slice(33, url.length - 1);
        return { title, type, newChapter, thumbnail, url, endpoint };
      });

      return update;
    });

    return res.json({
      message: "Success Retrive Data",
      data: {
        update: list,
      },
    });
  } catch (error) {
    res.json({
      status: false,
      message: error,
    });
  }
};

const trendingComic = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
        "--devtools=false",
      ],
    });
    const page = await browser.newPage();
    await page.goto(process.env.BASE_URL);

    page.waitForSelector(".lepopup-element span").then((e) => e.click());

    let list = await page.evaluate(() => {
      let days = Array.from(
        document.querySelectorAll("#nav-home .get-lost-fucker")
      ).map((element) => {
        // let rank = element.querySelector(".posic span").innerText;
        let thumbnail = element.querySelector("img").getAttribute("src");
        let url = element.querySelector(".fotinhofofa a").getAttribute("href");

        let infos = element.querySelector(".title-and-infos");
        let title = infos.querySelector("h2").innerText;
        let rating = infos.querySelector(".numscore").innerText;
        let endpoint = url.slice(33, url.length - 1);
        return { title, rating, thumbnail, url, endpoint };
      });

      let weekly = Array.from(
        document.querySelectorAll("#nav-roi .get-lost-fucker")
      ).map((element) => {
        // let rank = element.querySelector(".posic span").innerText;
        let thumbnail = element.querySelector("img").getAttribute("src");
        let url = element.querySelector(".fotinhofofa a").getAttribute("href");

        let infos = element.querySelector(".title-and-infos");
        let title = infos.querySelector("h2").innerText;
        let rating = infos.querySelector(".numscore").innerText;
        let endpoint = url.slice(33, url.length - 1);
        return { title, rating, thumbnail, url, endpoint };
      });

      let all = Array.from(
        document.querySelectorAll("#nav-contact .get-lost-fucker")
      ).map((element) => {
        // let rank = element.querySelector(".posic span").innerText;
        let thumbnail = element.querySelector("img").getAttribute("src");
        let url = element.querySelector(".fotinhofofa a").getAttribute("href");

        let infos = element.querySelector(".title-and-infos");
        let title = infos.querySelector("h2").innerText;
        let rating = infos.querySelector(".numscore").innerText;
        let endpoint = url.slice(33, url.length - 1);
        return { title, rating, thumbnail, url, endpoint };
      });

      return { days, weekly, all };
    });

    return res.json({
      message: "Success Retrive Data",
      data: {
        daily: list.days,
        weekly: list.weekly,
        all: list.all,
      },
    });
  } catch (error) {
    res.json({
      status: false,
      message: error,
    });
  }
};

const detailComic = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
        "--devtools=false",
      ],
    });
    const page = await browser.newPage();
    await page.goto(`${process.env.BASE_URL}series/${req.params.slug}`);

    page.waitForSelector(".lepopup-element span").then((e) => e.click());

    let details = await page.evaluate(() => {
      let title = document.querySelector(".post-title h1").innerText;
      let type = document.querySelector(".post-title span").innerText;
      let rating = document.querySelector(".post-rating").innerText;
      let author = document.querySelector(".author-content").innerText;
      let artist = document.querySelector(".artist-content").innerText;
      let genres = document.querySelector(".genres-content").innerText;
      let release = document.querySelectorAll(
        ".post-status .summary-content"
      )[0].innerText;
      let status = document.querySelectorAll(".post-status .summary-content")[1]
        .innerText;

      document.querySelector("#nav-profile-tab").click();

      let synopsis = document
        .querySelector(".summary__content")
        .innerText.replaceAll("\n", " ")
        .replaceAll("\t", "");

      return {
        title,
        synopsis,
        type,
        rating,
        author,
        artist,
        genres,
        release,
        status,
      };
    });

    let chapters = await page.evaluate(() => {
      let chapterList = Array.from(
        document.querySelectorAll(".wp-manga-chapter")
      ).map((element) => {
        let chapter = element.querySelector(".chapter-manhwa-title").innerText;
        let thumbnail = element.querySelector(".thumb").getAttribute("src");
        let url = element.querySelector("a").getAttribute("href");
        let release = element.querySelector(".chapter-release-date").innerText;
        let endpoint = url.slice(33, url.length - 1);
        return { chapter, thumbnail, url, release, endpoint };
      });

      return chapterList;
    });

    return res.json({
      message: "Success Retrive Data",
      data: {
        comicDetails: details,
        chapterList: chapters,
      },
    });
  } catch (error) {
    res.json({
      status: false,
      message: error,
    });
  }
};

const readComic = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
        "--devtools=false",
      ],
    });
    const page = await browser.newPage();
    await page.goto(
      `${process.env.BASE_URL}series/${req.params.slug}/${req.params.chapter}`
    );

    async function timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    while (await page.$("[data-index]")) {
      await page.$$("[data-index]").then(async (e) =>
        e.forEach(async (element) => {
          element.scrollIntoView({ block: "nearest", behavior: "smooth" });
        })
      );
    }
    await timeout(1000);

    await page.waitForSelector(".lepopup-element span").then((e) => e.click());

    let read = await page.evaluate(() => {
      let images = Array.from(
        document.querySelectorAll(".image-vertical img")
      ).map((element) => {
        let image = element.getAttribute("src");
        return image;
      });

      return images;
    });

    return res.json({
      message: "Success Retrive Data",
      data: {
        read,
      },
    });
  } catch (error) {
    res.json({
      status: false,
      message: error,
    });
  }
};

const projectComic = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
        "--devtools=false",
      ],
    });
    const page = await browser.newPage();
    await page.goto(`${process.env.BASE_URL}project/page/${req.params.page}`);

    await page.waitForSelector(".lepopup-element span").then((e) => e.click());

    let projects = await page.evaluate(() => {
      let project = Array.from(
        document.querySelectorAll(".row .page-item-detail")
      ).map((element) => {
        let title = element.querySelector("h3").innerText;
        let rating = element.querySelector(".score").innerText;
        let newChapter = element.querySelector(".chapter a").innerText;
        let thumbnail = element.querySelector("img").getAttribute("src");
        let url = element.querySelector("a").getAttribute("href");
        let endpoint = url.slice(33, url.length - 1);

        return { title, rating, newChapter, thumbnail, url, endpoint };
      });

      return project;
    });
    return res.json({
      message: "Success Retrive Data",
      data: {
        page: req.params.page,
        projects,
      },
    });
  } catch (error) {
    res.json({
      status: false,
      message: error,
    });
  }
};

const mirrorComic = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
        "--devtools=false",
      ],
    });
    const page = await browser.newPage();
    await page.goto(`${process.env.BASE_URL}mirror/page/${req.params.page}`);

    await page.waitForSelector(".lepopup-element span").then((e) => e.click());

    let mirrors = await page.evaluate(() => {
      let mirror = Array.from(
        document.querySelectorAll(".row .page-item-detail")
      ).map((element) => {
        let title = element.querySelector("h3").innerText;
        let rating = element.querySelector(".score").innerText;
        let newChapter = element.querySelector(".chapter a").innerText;
        let thumbnail = element.querySelector("img").getAttribute("src");
        let url = element.querySelector("a").getAttribute("href");
        let endpoint = url.slice(33, url.length - 1);

        return { title, rating, newChapter, thumbnail, url, endpoint };
      });

      return mirror;
    });

    return res.json({
      message: "Success Retrive Data",
      data: {
        page: req.params.page,
        mirrors,
      },
    });
  } catch (error) {
    res.json({
      status: false,
      message: error,
    });
  }
};

const searchComic = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--disable-gpu",
        "--devtools=false",
      ],
    });
    const page = await browser.newPage();
    await page.goto(
      `${process.env.BASE_URL}?s=${req.params.query}&post_type=wp-manga`
    );

    async function timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    await page.waitForSelector(".lepopup-element span").then((e) => e.click());

    await timeout(500);

    let loadMore;
    while (true) {
      loadMore = await page.evaluate(() => {
        return document.querySelector(".navigation-ajax").style.display;
      });

      if (loadMore === "") {
        await page.waitForSelector(".navigation-ajax a").then((e) => e.click());
      } else {
        break;
      }
      await timeout(500);
    }

    searches = await page.evaluate(() => {
      let search = Array.from(
        document.querySelectorAll(".c-tabs-item__content")
      ).map((element) => {
        let title = element.querySelector("h3").innerText;
        let rating = element.querySelector(".score").innerText;
        let newChapter = element.querySelector(".tab-meta .chapter").innerText;
        let thumbnail = element.querySelector("img").getAttribute("src");
        let url = element.querySelector("a").getAttribute("href");
        let endpoint = url.slice(33, url.length - 1);

        return { title, rating, newChapter, thumbnail, url, endpoint };
      });

      return search;
    });

    return res.json({
      message: "Success Retrive Data",
      data: {
        data: searches,
      },
    });
  } catch (error) {
    res.json({
      status: false,
      message: error,
    });
  }
};

module.exports = {
  hotComic,
  newComic,
  trendingComic,
  detailComic,
  readComic,
  projectComic,
  mirrorComic,
  searchComic,
};
