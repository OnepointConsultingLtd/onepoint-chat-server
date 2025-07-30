import { RelatedTopicsBody, Topics } from '../type/types';
import { MAX_RELATED_TOPICS, ONE_TIME_TOKEN } from './constants';
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
  const url = `${getServer()}/project/related_topics?project=onepoint_v1&engine=lightrag`;

  const body: RelatedTopicsBody = {
    samples: 25000,
    path_length: 5,
    restart_prob: 0.15,
    runs: 5,
    limit: MAX_RELATED_TOPICS,
    source: selectedTopic || '',
    text: text.trim() || '',
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ONE_TIME_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  console.log("the url", url);

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


// http://localhost:9999/protected/project/questions?project=onepoint_v1&engine=lightrag&topic_limit=5&format=json

export async function fetchQuestions(
  project: string = 'onepoint_v1',
  engine: string = 'lightrag',
  topicLimit: number = 5,
  format: string = 'json'
) {
  const url = `${getServer()}/project/questions?project=${project}&engine=${engine}&topic_limit=${topicLimit}&format=${format}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ONE_TIME_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}