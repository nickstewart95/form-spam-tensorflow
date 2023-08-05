const express = require('express');
const rateLimit = require('express-rate-limit');
const tf = require('@tensorflow/tfjs-node');
const { tokenize } = require('./distilbert_tokenise.js');

const port = process.env.PORT || 8080;
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // maximum of 100 requests within 15 minutes,
	message: 'Rate limit',
});

async function server() {
	let model = await tf.loadGraphModel('file://model/model.json');

	const app = express();

	app.use(limiter);
	app.use(express.json());

	app.post('/check', limiter, async (req, res) => {
		let data = req.body;

		data = Object.keys(data)
			.map(function (k) {
				return data[k];
			})
			.join(' | ');

		data = tokenize(data, 32);

		let classes = [false, true];
		let prediction = model.execute(
			tf.tensor([new Int32Array(data['input_ids'])])
		);
		let class_scores = await prediction.data();

		let max_score_id = class_scores.indexOf(Math.max(...class_scores));

		res.json({ spam: classes[max_score_id].toString() });
	});

	app.listen(port, () => {
		console.log(`Running on port ${port}`);
	});
}

server();
