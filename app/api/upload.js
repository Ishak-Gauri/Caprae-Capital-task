import nextConnect from "next-connect";
import multer from "multer";
import path from "path";

const upload = multer({ dest: "public/uploads/" });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(500).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  },
});

apiRoute.use(upload.single("file"));

apiRoute.post((req, res) => {
  res.status(200).json({ message: "File uploaded successfully!", file: req.file });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
 