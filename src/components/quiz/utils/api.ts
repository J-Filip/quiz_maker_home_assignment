import { BASE_URL } from '../../../hooks/useFetch';

export interface Question {
  id?: string;
  question: string;
  answer: string;
}

export interface Quiz {
  id: number;
  name: string;
  questions: Question[];
}

export const updateQuiz = async (values: Quiz) => {
  try {
    const response = await fetch(`${BASE_URL}/quizzes/${values.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }
    return { success: true };
  } catch (error) {
    console.error(error);
  }
};

export const deleteQuiz = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/quizzes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const createNewQuiz = async (values: Quiz) => {
  try {
    const response = await fetch(`${BASE_URL}/quizzes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

/*
Creating questions is a demo only operation - in a real app, BE would probably handle this. After updating or creating a quiz, BE would add them to a list of all questions.
*/
export const createQuestion = async (value: Question) => {
  try {
    const response = await fetch(`${BASE_URL}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    });
    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }
    return { success: true };
  } catch (error) {
    console.error(error);
  }
};
