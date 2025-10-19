
const express = require('express');
const axios = require('axios');
const xml2js = require('xml2js');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Configuration
const EU_SOURCES = {
  eurlex: 'https://eur-lex.europa.eu/EN/display-rss.do?resourceType=regulation&language=en'
};

// Main endpoint
app.get('/api/eu-regulations', async (req, res) => {
  try {
    console.log('Fetching EU regulations...');
    
    const since = req.query.since || '7d';
    const minScore = parseInt(req.query.minScore) || 60;
    
    // Fetch RSS feed
    const response = await axios.get(EU_SOURCES.eurlex, {
      timeout: 10000,
      headers: { 'User-Agent': 'AC3-Monitor/1.0' }
    });
    
    // Parse XML
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);
    const items = result.rss?.channel?.[0]?.item || [];
    
    // Process items
    const processed = items.map(item => {
      const title = item.title?.[0] || '';
      const description = item.description?.[0] || '';
      const text = (title + ' ' + description).toLowerCase();
      
      // Calculate score
      let score = 0;
      if (text.includes('article 4') || text.includes('ai literacy')) score += 50;
      if (text.includes('artificial intelligence act')) score += 20;
      if (text.includes('ai system')) score += 10;
      
      return {
        title,
        url: item.link?.[0] || '',
        description,
        pubDate: item.pubDate?.[0] || '',
        relevanceScore: Math.min(score, 100),
        jurisdiction: 'EU',
        priority: score >= 70 ? 'High' : 'Medium'
      };
    });
    
    // Filter by score
    const filtered = processed.filter(item => item.relevanceScore >= minScore);
    
    res.json({
      success: true,
      fetchedAt: new Date().toISOString(),
      totalResults: filtered.length,
      results: filtered
    });
    
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
