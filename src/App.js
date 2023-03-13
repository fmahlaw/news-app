import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

let sortCount = 0;
let previousArticle = [];
let newsData = [];
const dummyData = {
  status: "ok",
  totalResults: 47670,
  articles: [
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
  ],
};

const categories = [
  {
    name: "Technology",
    keywords: [
      "tech",
      "smartphone",
      "computer",
      "internet",
      "software",
      "apple",
    ],
  },
  {
    name: "Business",
    keywords: ["economy", "market", "finance", "company", "startup"],
  },
  {
    name: "Health",
    keywords: ["health", "medical", "fitness", "nutrition", "wellness"],
  },
  {
    name: "Deals",
    keywords: ["deal", "gift", "card"],
  },
  // Add more categories and associated keywords as needed
];
const LINK = process.env.REACT_APP_LINK;
(async function GetData() {
  try {
    newsData = dummyData;
    // const resp = await axios.get(LINK);
    // newsData = resp.data;
    await AssignTag();
  } catch (error) {
    // newsData = dummyData;
  }
})();

function AssignTag() {
  newsData.articles.forEach((article) => {
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const { keywords, name } = category;
      const content = article.content.toLowerCase();

      for (let j = 0; j < keywords.length; j++) {
        if (content.includes(keywords[j])) {
          article.category = name;
          break;
        }
      }
      if (article.category) break;
    }
  });
}

function App() {
  const [data, setData] = useState({
    status: "OK",
    titleQuery: "",
    nameQuery: "",
    authorQuery: "",
    articles: [],
  });

  useEffect(() => {
    setData((value) => ({
      ...value,
      articles: newsData.articles,
    }));
  }, []);

  let filteredArticle = [];

  const hanldeChange = (e) => {
    e.preventDefault();
    setData((value) => ({ ...value, [e.target.name]: e.target.value }));
  };

  function filterArticles(queries) {
    for (let i = 0; i < queries.length; i++) {}

    filteredArticle = newsData.articles.filter((news) => {
      for (let i = 0; i < queries.length; i++) {
        const [query, input] = queries[i];
        if (!news[query].toLowerCase().includes(data[input].toLowerCase()))
          return false;
      }
      return true; //
    });
    if (filteredArticle.length > 0) previousArticle = filteredArticle;
    setData((value) => ({ ...value, articles: filteredArticle }));
  }

  const handleCategories = (event, selectedCategory) => {
    event.preventDefault();
    setData((prevState) => ({
      ...prevState,
      articles: newsData.articles.filter(
        (item) => item.category === selectedCategory
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = data.titleQuery;
    const name = data.nameQuery;
    const author = data.authorQuery;

    if (!(title || name || author)) return alert("Enter query");
    if (
      (title && title.length < 4) ||
      (name && name.length < 4) ||
      (author && author.length < 4)
    )
      return alert("query is too Short");

    try {
      if (title && name && author) {
        filterArticles(
          [
            ["title", "titleQuery"],
            ["content", "nameQuery"],
          ],
          ["author", "authorQuery"]
        );
      } else if (author && title) {
        filterArticles([
          ["author", "authorQuery"],
          ["title", "titleQuery"],
        ]);
      } else if (author && name) {
        filterArticles([
          ["author", "authorQuery"],
          ["content", "nameQuery"],
        ]);
      } else if (title && name) {
        filterArticles([
          ["title", "titleQuery"],
          ["content", "nameQuery"],
        ]);
      } else if (title) {
        filterArticles([["title", "titleQuery"]]);
      } else if (name) {
        filterArticles([["content", "nameQuery"]]);
      } else if (author) {
        filterArticles([["author", "authorQuery"]]);
      }
    } catch (error) {
      return alert(error);
    }

    if (filteredArticle.length === 0) {
      alert("not found");
      setData((value) => ({ ...value, articles: previousArticle }));
    }
  };

  const handleSort = (e) => {
    e.preventDefault();
    let sortedData = [];
    if (data.articles.length === 0) return alert("cannot Short");

    sortCount++;

    function Sort(arg) {
      let array = data.articles;
      if (arg === "UP")
        return array.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
      else
        return array.sort(
          (b, a) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
    }

    sortedData = sortCount % 2 === 0 ? Sort("UP") : Sort("DOWN");

    setData((value) => ({ ...value, articles: sortedData }));
  };

  const SetData = () => {
    if (!data.articles) return <p>Halo, ini NULL</p>;

    return data.articles.map((news, index) => (
      <div key={index} className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mb-3">
            <img src={news.urlToImage} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{news.title}</h5>
              <p className="card-text">{news.content}</p>
              <p className="card-text">
                <small className="text-muted">{news.author}</small>
                <small className="text-muted">
                  {news.publishedAt.slice(0, 10)}
                </small>
              </p>
              <p className="card-text">{news.url}</p>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="btn-group mb-3">
              <button
                type="button"
                className="btn btn-outline-secondary active"
              >
                Business
              </button>
              <button
                onClick={(Event) => handleCategories(Event, "Technology")}
                type="button"
                className="btn btn-outline-secondary"
              >
                Technology
              </button>
              <button type="button" className="btn btn-outline-secondary">
                Education
              </button>
              <button
                onClick={(Event) => handleCategories(Event, "Deals")}
                type="button"
                className="btn btn-outline-secondary"
              >
                Deals
              </button>
              <button type="button" className="btn btn-outline-secondary">
                Health
              </button>
              <button type="button" className="btn btn-outline-secondary">
                Otomotif
              </button>
            </div>
            <div className="mt-3">
              <form onSubmit={handleSubmit} className="form-inline mb-3">
                <div className="form-group">
                  <input
                    onChange={hanldeChange}
                    value={data.title}
                    name="titleQuery"
                    placeholder="Title"
                    className="form-control mr-2"
                  />
                  <input
                    onChange={hanldeChange}
                    value={data.name}
                    name="nameQuery"
                    placeholder="Name"
                    className="form-control mr-2"
                  />
                  <input
                    onChange={hanldeChange}
                    value={data.author}
                    name="authorQuery"
                    placeholder="Author"
                    className="form-control mr-2"
                  />
                  <button type="submit" className="btn btn-primary">
                    Search
                  </button>
                </div>
              </form>
              <div className="mb-3">
                <button
                  onClick={handleSort}
                  className="btn btn-outline-secondary"
                >
                  SORT
                </button>
              </div>
            </div>
            <div className="mt-3"></div>
            <div className="mt-3">
              <SetData />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
