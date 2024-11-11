import request from 'request';

    export default function handler(req, res) {
      const { company } = req.query;
      const apiKey = 'M78F3C058ID2RHGI';
      const url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${company}&apikey=${apiKey}`;

      request.get({
        url: url,
        json: true,
        headers: { 'User-Agent': 'request' }
      }, (err, response, data) => {
        if (err) {
          res.status(500).json({ error: 'Error fetching news' });
        } else if (response.statusCode !== 200) {
          res.status(response.statusCode).json({ error: 'Error fetching news' });
        } else {
          const articles = data.feed.map(item => ({
            title: item.title,
            summary: item.summary,
            sentiment: item.overall_sentiment_score
          }));
          res.status(200).json({ articles });
        }
      });
    }
