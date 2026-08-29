export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.setHeader('Content-Type', 'application/problem+json');
  res.status(404).json({
    type: "https://prathameshxd.vercel.app/docs/errors/not-found",
    title: "Not Found",
    status: 404,
    detail: "The requested API endpoint does not exist.",
    instance: req.url
  });
}
