import "./global.css";
import style from "./App.module.css";
import { Header } from "./components/Header.tsx";
import { Sidebar } from "./components/Sidebar.tsx";
import { PostType } from "./components/Post";

const posts: PostType[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://github.com/joeseraphy.png",
      name: "Joelson Silva",
      role: "Front-end Developer",
    },
    content: [
      { type: "paragraph", content: " Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fizno NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare🚀",
      },
      { type: "link", content: "joe.design/doctorcare" },
      { type: "link", content: "#novoprojeto #nlw #rocketseata" },
    ],
    publishedAt: new Date("2024-05-24 10:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://github.com/deedee100.png",
      name: "Amanda Tinoco",
      role: "Back-end Developer",
    },
    content: [
      { type: "paragraph", content: " Fala galeraa 👋" },
      {
        type: "paragraph",
        content:
          "Acabei de subir mais um projeto no meu portifa. É um projeto que fizno NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare🚀",
      },
      { type: "link", content: "joe.design/doctorcare" },
      { type: "link", content: "#novoprojeto #nlw #rocketseata" },
    ],
    publishedAt: new Date("2024-05-20 15:00:00"),
  },
];

function App() {
  return (
    <>
      <Header />

      <div className={style.wrapper}>
        <Sidebar />
        <main>
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
                post={post}
              />
            );
          })}
        </main>
      </div>
    </>
  );
}

export default App;
