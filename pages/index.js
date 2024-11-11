import { useState } from 'react';

    export default function Home() {
      const [company, setCompany] = useState('');
      const [articles, setArticles] = useState([]);
      const [error, setError] = useState(null);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`/api/news?company=${company}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setArticles(data.articles);
          setError(null);
        } catch (err) {
          setError(err.message);
        }
      };

      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">News Sentiment App</h1>
            <form onSubmit={handleSubmit} className="mb-4">
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Enter company name"
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                Get News
              </button>
            </form>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div>
              {articles.map((article, index) => (
                <div key={index} className="mb-4">
                  <h2 className="text-xl font-bold">{article.title}</h2>
                  <p>{article.summary}</p>
                  <p className="text-gray-600">Sentiment: {article.sentiment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
