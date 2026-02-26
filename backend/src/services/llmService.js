const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getSQLHint = async ({ question, schema, query, errorMessage }) => {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `
      You are a SQL tutor for a platform called CipherSQLStudio. 
      Your goal is to provide helpful hints to a student who is trying to solve a SQL assignment.
      
      CRITICAL: 
      1. DO NOT provide the full SQL solution.
      2. Provide conceptual pointers, step-by-step guidance, or suggest which columns/tables to check.
      3. If there is a syntax error, explain what might be wrong without writing the corrected query.
      4. Limit your response to at most 3 bullet points.
      5. Do NOT output any code blocks containing a full SELECT statement.

      ASSIGNMENT QUESTION:
      ${question}

      RELEVANT SCHEMA:
      ${JSON.stringify(schema, null, 2)}

      STUDENT'S CURRENT QUERY:
      ${query || '-- No query provided yet --'}

      ${errorMessage ? `ERROR MESSAGE RECEIVED: ${errorMessage}` : ''}

      Please provide 1-3 concise hints.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let hint = response.text();

        // Safety check: Redact if it looks like a full query (simple heuristic)
        if (hint.toUpperCase().includes('SELECT') && hint.toUpperCase().includes('FROM')) {
            // If the model ignores instructions and provides a semi-solution, we try to clean it or just replace it.
            // This is a basic guard; more robust parsing could be added.
            if (hint.split('\n').some(line => line.toUpperCase().startsWith('SELECT'))) {
                hint = "The model tried to provide a solution. Here is a conceptual hint instead: Review your JOIN conditions and WHERE clauses carefully.";
            }
        }

        return hint;
    } catch (error) {
        console.error('Gemini API Error Detail:', error);
        throw new Error(`Gemini API Error: ${error.message}`);
    }
};

module.exports = { getSQLHint };
