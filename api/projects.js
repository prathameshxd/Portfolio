export default function handler(req, res) {
  res.status(200).json({
    projects: [
      {
        id: "pathparcel",
        name: "PathParcel",
        description: "A digital delivery solution focused on secure, tracked data transfers.",
        url: "/projects/pathparcel",
        type: "UX/UI Design"
      },
      {
        id: "bento",
        name: "Bento Components",
        description: "A collection of beautiful bento-grid components for modern web apps.",
        url: "/projects",
        type: "Frontend Design"
      }
    ]
  });
}
