export default function handler(req, res) {
  res.status(404).json({
    error: {
      code: "not_found",
      message: "The requested API endpoint does not exist.",
      resolution: "Please refer to the OpenAPI documentation at /openapi.json for valid endpoints."
    }
  });
}
