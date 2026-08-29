export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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
