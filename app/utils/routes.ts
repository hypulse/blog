type Route = {
  name: string;
  path: string;
};

const routes: Route[] = [
  {
    name: "Blog",
    path: "/blog",
  },
  {
    name: "Snippets",
    path: "/snippets",
  },
  {
    name: "Search",
    path: "/search",
  },
];

export default routes;
