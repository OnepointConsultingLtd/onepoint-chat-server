import { RelatedTopicsBody, Topics } from '../type/types';
import { MAX_RELATED_TOPICS, ONE_TIME_TOKEN, PROJECT_CONFIG, QUESTION_PROMPT, TOPICS_PROMPT } from './constants';
import { getServer } from './server';

export function createHeaders() {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ONE_TIME_TOKEN}`,
    },
  };
}

export async function fetchRelatedTopics(selectedTopic: string, text: string): Promise<Topics> {
  const url = `${getServer()}/project/related_topics?project=${PROJECT_CONFIG.PROJECT}&engine=${PROJECT_CONFIG.ENGINE}`;

  const body: RelatedTopicsBody = {
    samples: 25000,
    restart_prob: 0.15,
    limit: MAX_RELATED_TOPICS,
    source: selectedTopic || '',
    text: text.trim() || '',
    topics_prompt: TOPICS_PROMPT,
    deduplicate_topics: false,
    random_walk_parameters: {
      samples: 50000,
      path_length: 5,
      restart_prob: 0.15,
      runs: 10
    },
    similarity_topics_method: 'nearest_neighbors'
  };


  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ONE_TIME_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  if (response.status === 404) {
    console.warn('No related topics found');
    return {
      topics: []
    };
  }

  if (!response.ok) {
    let errorText = `HTTP error! status: ${response.status}`;

    try {
      const errorData = await response.json();
      errorText =
        errorData.description ||
        errorData.error ||
        JSON.stringify(errorData) ||
        errorText;
    } catch (e) {
      console.log('e', e);
    }

    throw new Error(errorText);
  }

  const data = await response.json();
  return data;
}

const DEFAULT_QUESTION = 'Tell me about Onepoint';

export async function fetchRelatedQuestions(
  selectedTopic: string[] = [],
  text: string = DEFAULT_QUESTION
) {
  const project: string = PROJECT_CONFIG.PROJECT;
  const engine: string = PROJECT_CONFIG.ENGINE;

  const body = {
    topics: selectedTopic,
    text: text ? text : DEFAULT_QUESTION,
    topic_limit: 10,
    entity_type_filter: '',
    format: 'json',
    system_prompt: QUESTION_PROMPT
  }

  debugger;

  const url = `${getServer()}/project/questions?project=${project}&engine=${engine}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ONE_TIME_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = `HTTP error! status: ${response.status}`;
      console.error('Failed to fetch questions:', errorText);
      throw new Error(errorText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Catch network errors (CORS, connection issues, etc.)
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      const errorMessage = 'Network error: Unable to reach the server. Please check your connection or try again later.';
      console.error('Network error fetching questions:', errorMessage);
      throw new Error(errorMessage);
    }
    // Re-throw other errors
    console.error('Error fetching questions:', error);
    throw error;
  }
}



//protected/pdf/generate
export async function downloadPdf(
  html: string
) {
  const body = {
    html: html,
  }

  const url = `${getServer()}/pdf/generate`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ONE_TIME_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
    const pdfBlob = await response.blob();
    return pdfBlob;
  } catch (error) {
    console.error('Error fetching PDF:', error);
    throw error;
  }
}

// Get a single file preview
export async function filePreview(
  file: string
) {

  const url = `${getServer()}/project/download/single_file?project=${PROJECT_CONFIG.PROJECT}&engine=${PROJECT_CONFIG.ENGINE}&file=${file}&token=${ONE_TIME_TOKEN}`;

  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
    return response;
  } catch (error) {
    console.error('Error fetching file:', error);
    throw error;
  }
}