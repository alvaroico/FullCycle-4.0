const express = require("express");
const nunjucks = require("nunjucks");

const server = express();
const videos = require("./data");

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.get("/", function (req, res) {
  const about = {
    avatar_url: "https://avatars0.githubusercontent.com/u/59286021?v=4",
    name: "Eu sou Full Cycle",
    role: "Alvaro Ribeiro Pereira",
    description:
      "Durante toda a Maratona utilizaremos containers como base de desenvolvimento bem como para produção. Logo, ter uma noção básica de Docker é mais do que necessário. \
      Nesse desafio, você terá de criar uma imagem docker que quando executada deverá expor a porta 8080 exibindo a mensagem: Eu sou Full Cycle.\
      Fique na liberdade para utilizar a tecnologia/linguagem de programação de sua escolha. Exemplo: você poderá criar uma simples aplicação usando Node.js com Express para exibir essa mensagem.\
      Gere o build da sua imagem, faça o push para o DockerHub e a informe no formulário abaixo.",
    links: [
      { name: "GitHub", url: "https://github.com/alvaroico" },
      { name: "Twitter", url: "https://twitter.com/alvaroico" },
      { name: "Linkedin", url: "https://www.linkedin.com/in/alvaroico/" },
    ],
  };

  return res.render("about", { about: about });
});

server.get("/portfolio", function (req, res) {
  return res.render("portfolio", { items: videos });
});

server.get("/video", function (req, res) {
  const id = req.query.id;

  const video = videos.find(function (video) {
    return video.id == id;
  });

  if (!video) {
    return res.send("Video not found!");
  }
  return res.render("video", { item: video });
});

server.listen(8080, function () {
  console.log("Server is Running");
});
