import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
dotenv.config();

const dummyData = [
  {
    source: { id: null, name: "Lifehacker.com" },
    author: "Daniel Oropeza",
    title: "Get These Gift Card Deals While You Can",
    description:
      "Sometimes a deal can feel too good to pass up, and that can especially be the case with a gift card deal—particularly since federal law gives you five years from the date a gift card is activated to use it before it expires. If you’ve got a purchase planned i…",
    url: "https://lifehacker.com/get-these-gift-card-deals-while-you-can-1850168858",
    urlToImage:
      "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/d89b0bc74cc33dda3d9dbd480864eaaa.jpg",
    publishedAt: "2023-02-28T22:00:00Z",
    content:
      "Sometimes a deal can feel too good to pass up, and that can especially be the case with a gift card dealparticularly since federal law gives you five years from the date a gift card is activated to u… [+2211 chars]",
  },
  {
    source: { id: null, name: "Lifehacker.com" },
    author: "Pranay Parab",
    title: "This Link-Sharing App Is Better Than AirDrop",
    description:
      "AirDrop is one of the most convincing reasons to go all-in on the Apple ecosystem. When it works, it’s a seamless way to send links and files between your iPhone and your Mac. However, while it’s usually fast, it’s also pretty flaky, and sometimes refuses to …",
    url: "https://lifehacker.com/this-link-sharing-app-is-better-than-airdrop-1850116921",
    urlToImage:
      "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/6722c772d1b23017946f0f766f1bc8ed.jpg",
    publishedAt: "2023-02-15T16:00:00Z",
    content:
      "AirDrop is one of the most convincing reasons to go all-in on the Apple ecosystem. When it works, its a seamless way to send links and files between your iPhone and your Mac. However, while its usual… [+2170 chars]",
  },
];
export const app = express();
export const { PORT, LINK } = process.env;
export let initData = [];
(async function GetData() {
  try {
    const resp = await axios.get(LINK);
    initData = resp.data.articles;
  } catch (error) {
    initData = dummyData;
  }
})();

app.use(express.json());
app.use(cors());
